import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarcodeScannedProduct, ProductCategory, ProductItem } from '../types';
import { lookupBarcode, generateGenericScannedProduct, SAMPLE_BARCODES } from '../data/barcodeDatabase';
import { playScanBeep, triggerScanConfetti } from '../utils/scannerUtils';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { 
  X, 
  Camera, 
  Upload, 
  Zap, 
  ZapOff, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Store, 
  ExternalLink, 
  Barcode, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Share2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductForRating: (prefillData: Partial<ProductItem>, scannedInfo?: BarcodeScannedProduct) => void;
  onQuickAddProduct?: (product: ProductItem) => void;
  onOpenShareDurability?: (product: BarcodeScannedProduct) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onSelectProductForRating,
  onQuickAddProduct,
  onOpenShareDurability
}) => {
  const [activeMode, setActiveMode] = useState<'camera' | 'upload' | 'samples' | 'manual'>('camera');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Scanned match state
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [matchedProduct, setMatchedProduct] = useState<BarcodeScannedProduct | null>(null);
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [manualSearchError, setManualSearchError] = useState<string | null>(null);
  const [imageScanning, setImageScanning] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle scanned barcode resolution
  const handleBarcodeFound = useCallback((code: string, format = 'UPC / EAN') => {
    if (!code || !isScanning) return;
    setIsScanning(false);
    setScannedCode(code);
    playScanBeep();
    triggerScanConfetti();

    const result = lookupBarcode(code);
    if (result) {
      setMatchedProduct(result);
    } else {
      // Create generic auto-cataloged product
      const generic = generateGenericScannedProduct(code, format);
      setMatchedProduct(generic);
    }
  }, [isScanning]);

  // Initialize camera stream
  const startCamera = useCallback(async () => {
    setCameraError(null);
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      // Check for torch/flashlight capability
      const track = stream.getVideoTracks()[0];
      if (track) {
        const capabilities = (track.getCapabilities?.() as { torch?: boolean }) || {};
        setTorchSupported(!!capabilities.torch);
      }
    } catch (err: unknown) {
      console.warn('Camera access error:', err);
      const errMsg = err instanceof Error ? err.message : 'Could not access camera.';
      setCameraError(
        `${errMsg} You can switch to Upload Image, Sample Barcodes, or Manual Entry.`
      );
    }
  }, [facingMode]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
    }
    setTorchOn(false);
  }, [cameraStream]);

  // Toggle flashlight
  const toggleTorch = async () => {
    if (!cameraStream) return;
    const track = cameraStream.getVideoTracks()[0];
    if (track && torchSupported) {
      try {
        const next = !torchOn;
        await (track as MediaStreamTrack & { applyConstraints: (c: unknown) => Promise<void> }).applyConstraints({
          advanced: [{ torch: next }]
        });
        setTorchOn(next);
      } catch (err) {
        console.warn('Torch toggle failed:', err);
      }
    }
  };

  // Flip camera between back/front
  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Run barcode detection loop using Native BarcodeDetector + ZXing fallback
  useEffect(() => {
    if (!isOpen || activeMode !== 'camera' || !isScanning || !cameraStream) {
      return;
    }

    let isSubscribed = true;
    let detector: { detect: (src: ImageBitmapSource) => Promise<Array<{ rawValue: string; format?: string }>> } | null = null;

    // Check if BarcodeDetector API exists in browser
    const BarcodeDetectorClass = (window as unknown as { 
      BarcodeDetector?: new (options?: { formats?: string[] }) => typeof detector 
    }).BarcodeDetector;

    if (BarcodeDetectorClass) {
      try {
        detector = new BarcodeDetectorClass({
          formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code', 'data_matrix']
        });
      } catch {
        detector = null;
      }
    }

    if (!readerRef.current) {
      readerRef.current = new BrowserMultiFormatReader();
    }

    const scanFrame = async () => {
      if (!isSubscribed || !videoRef.current || videoRef.current.readyState < 2) {
        animationFrameRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      const video = videoRef.current;

      // Method 1: Hardware-accelerated native BarcodeDetector
      if (detector) {
        try {
          const barcodes = await detector.detect(video);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            handleBarcodeFound(barcodes[0].rawValue, barcodes[0].format || 'UPC / EAN');
            return;
          }
        } catch {
          // fallback to ZXing canvas below
        }
      }

      // Method 2: ZXing canvas decoder
      if (canvasRef.current && readerRef.current) {
        try {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const result = await readerRef.current.decodeFromCanvas(canvas).catch(() => null);
            if (result && result.getText()) {
              handleBarcodeFound(result.getText(), result.getBarcodeFormat()?.toString() || 'UPC / EAN');
              return;
            }
          }
        } catch {
          // continue loop
        }
      }

      // Next frame
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };

    animationFrameRef.current = requestAnimationFrame(scanFrame);

    return () => {
      isSubscribed = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, activeMode, isScanning, cameraStream, handleBarcodeFound]);

  // Start camera on modal open in camera mode
  useEffect(() => {
    if (isOpen && activeMode === 'camera' && !matchedProduct) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeMode, facingMode, matchedProduct]);

  // Handle image upload scanning
  const handleImageFile = async (file: File) => {
    if (!file) return;
    setImageScanning(true);
    setCameraError(null);

    try {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Try Native BarcodeDetector first
      const BarcodeDetectorClass = (window as unknown as { 
        BarcodeDetector?: new (options?: { formats?: string[] }) => { detect: (src: ImageBitmapSource) => Promise<Array<{ rawValue: string }>> } 
      }).BarcodeDetector;

      if (BarcodeDetectorClass) {
        try {
          const detector = new BarcodeDetectorClass();
          const barcodes = await detector.detect(img);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            handleBarcodeFound(barcodes[0].rawValue);
            setImageScanning(false);
            return;
          }
        } catch {
          // try ZXing next
        }
      }

      // Try ZXing
      if (!readerRef.current) {
        readerRef.current = new BrowserMultiFormatReader();
      }
      const result = await readerRef.current.decodeFromImageUrl(imageUrl).catch(() => null);
      if (result && result.getText()) {
        handleBarcodeFound(result.getText());
      } else {
        setCameraError('No recognizable barcode detected in this image. Please try another photo or enter code manually.');
      }
    } catch {
      setCameraError('Failed to read image. Please ensure the barcode is clearly visible.');
    } finally {
      setImageScanning(false);
    }
  };

  // Handle manual code lookup
  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCodeInput.trim()) return;
    setManualSearchError(null);

    const clean = manualCodeInput.trim();
    handleBarcodeFound(clean, 'Manual Barcode');
  };

  // Reset and scan again
  const handleScanAgain = () => {
    setMatchedProduct(null);
    setScannedCode(null);
    setIsScanning(true);
    setManualSearchError(null);
    if (activeMode === 'camera') {
      startCamera();
    }
  };

  // Add & Rate workflow
  const handleProceedToRate = () => {
    if (!matchedProduct) return;

    const prefill: Partial<ProductItem> = {
      barcode: matchedProduct.barcode,
      name: matchedProduct.name,
      brand: matchedProduct.brand,
      category: matchedProduct.category,
      subCategory: matchedProduct.subCategory,
      price: matchedProduct.price,
      currency: matchedProduct.currency || 'USD',
      imageUrl: matchedProduct.imageUrl,
      sourceUrl: matchedProduct.sourceUrl,
      primaryRetailer: matchedProduct.primaryRetailer,
      tags: matchedProduct.tags,
      durabilityProfile: matchedProduct.durabilityProfile,
      storeLocations: matchedProduct.storeLocations,
      reviewText: `Scanned from physical barcode (${matchedProduct.barcode}). Exceptional build quality and verified durability.`,
      overallRating: matchedProduct.defaultRating?.overall || 4.8,
      repurchase: matchedProduct.defaultRating?.repurchase || 'definitely',
      dimensions: {
        quality: matchedProduct.defaultRating?.quality || 5,
        value: matchedProduct.defaultRating?.value || 4,
        longevity: matchedProduct.defaultRating?.longevity || 5,
        aesthetic: matchedProduct.defaultRating?.aesthetic || 5,
        performance: matchedProduct.defaultRating?.performance || 5
      },
      pros: [
        'High durability and verified long-lasting build',
        'Easy to find in stores with aisle mapping'
      ],
      cons: []
    };

    onSelectProductForRating(prefill, matchedProduct);
    onClose();
  };

  // Instant Quick Add workflow
  const handleInstantQuickAdd = () => {
    if (!matchedProduct) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      barcode: matchedProduct.barcode,
      name: matchedProduct.name,
      brand: matchedProduct.brand,
      category: matchedProduct.category,
      subCategory: matchedProduct.subCategory,
      price: matchedProduct.price,
      currency: matchedProduct.currency || 'USD',
      imageUrl: matchedProduct.imageUrl,
      sourceUrl: matchedProduct.sourceUrl,
      primaryRetailer: matchedProduct.primaryRetailer,
      durabilityProfile: matchedProduct.durabilityProfile,
      storeLocations: matchedProduct.storeLocations,
      overallRating: matchedProduct.defaultRating?.overall || 4.8,
      repurchase: matchedProduct.defaultRating?.repurchase || 'definitely',
      usageDuration: '6+ months',
      reviewText: matchedProduct.description,
      dimensions: {
        quality: matchedProduct.defaultRating?.quality || 5,
        value: matchedProduct.defaultRating?.value || 4,
        longevity: matchedProduct.defaultRating?.longevity || 5,
        aesthetic: matchedProduct.defaultRating?.aesthetic || 5,
        performance: matchedProduct.defaultRating?.performance || 5
      },
      pros: [
        `Lifespan: ${matchedProduct.durabilityProfile?.expectedLifespan || 'Multi-year'}`,
        'Convenient physical store availability'
      ],
      cons: [],
      tags: matchedProduct.tags,
      dateRated: todayStr,
      isFavorite: true
    };

    if (onQuickAddProduct) {
      onQuickAddProduct(newProduct);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-purple-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Hidden off-screen canvas for ZXing frame extraction */}
      <canvas ref={canvasRef} className="hidden" />

      <div 
        id="barcode-scanner-modal-card"
        className="bg-white rounded-3xl max-w-xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-purple-200/80 flex flex-col"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#180A28] via-purple-950 to-[#280A3A] text-white flex items-center justify-between border-b border-purple-800/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                <span>Barcode Scanner</span>
                <span className="text-3xs font-mono font-semibold bg-pink-500/30 text-pink-200 border border-pink-400/40 px-2 py-0.5 rounded-full">
                  Instant Shelf Add
                </span>
              </h2>
              <p className="text-2xs text-purple-300">
                Scan makeup, skincare, or kitchen barcodes to rate, check durability & locate stores
              </p>
            </div>
          </div>

          <button
            id="close-barcode-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanner Mode Tabs (Camera / Upload / Samples / Manual) */}
        {!matchedProduct && (
          <div className="flex items-center justify-between bg-purple-950/95 p-1.5 border-b border-purple-800/40 text-xs shrink-0">
            <div className="grid grid-cols-4 w-full gap-1">
              <button
                id="tab-scanner-camera"
                onClick={() => setActiveMode('camera')}
                className={`py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  activeMode === 'camera'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Camera</span>
              </button>

              <button
                id="tab-scanner-upload"
                onClick={() => setActiveMode('upload')}
                className={`py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  activeMode === 'upload'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Photo</span>
              </button>

              <button
                id="tab-scanner-samples"
                onClick={() => setActiveMode('samples')}
                className={`py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  activeMode === 'samples'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Test Items</span>
              </button>

              <button
                id="tab-scanner-manual"
                onClick={() => setActiveMode('manual')}
                className={`py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  activeMode === 'manual'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
                }`}
              >
                <Barcode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Manual</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* STATE 1: MATCH FOUND */}
          {matchedProduct ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              
              {/* Success Badge */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Barcode Verified & Matched</p>
                    <p className="text-3xs font-mono text-emerald-700">UPC/EAN: {matchedProduct.barcode}</p>
                  </div>
                </div>
                <button
                  id="scan-another-barcode-btn"
                  onClick={handleScanAgain}
                  className="text-2xs font-bold text-purple-700 bg-white hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-xl transition-colors shrink-0"
                >
                  Scan Next
                </button>
              </div>

              {/* Product Match Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50/40 border border-purple-200/90 shadow-sm">
                <div className="flex items-start gap-4">
                  <img 
                    src={matchedProduct.imageUrl} 
                    alt={matchedProduct.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-purple-100 shadow-sm shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="text-3xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">
                        {matchedProduct.category}
                      </span>
                      <span className="text-3xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {matchedProduct.subCategory}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                      {matchedProduct.brand}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {matchedProduct.name}
                    </h3>
                    <p className="text-sm font-extrabold text-pink-600 mt-1">
                      ${matchedProduct.price} {matchedProduct.currency || 'USD'}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5">
                      {matchedProduct.description}
                    </p>
                  </div>
                </div>

                {/* Durability Highlights */}
                {matchedProduct.durabilityProfile && (
                  <div className="mt-4 pt-4 border-t border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-pink-500" />
                        <span>Durability & Build Profile</span>
                      </h4>
                      <span className="text-2xs font-extrabold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                        Score: {matchedProduct.durabilityProfile.durabilityScore.toFixed(1)} / 5.0
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-purple-100/80">
                        <p className="text-3xs font-bold text-slate-400 uppercase">Expected Lifespan</p>
                        <p className="font-bold text-slate-800 mt-0.5">{matchedProduct.durabilityProfile.expectedLifespan}</p>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-purple-100/80">
                        <p className="text-3xs font-bold text-slate-400 uppercase">Wear Resistance</p>
                        <p className="font-bold text-emerald-600 mt-0.5">{matchedProduct.durabilityProfile.wearResistance || 'High'} Resistance</p>
                      </div>
                    </div>

                    {matchedProduct.durabilityProfile.maintenanceTips && (
                      <p className="text-2xs text-slate-600 mt-2 bg-purple-50/60 p-2 rounded-lg border border-purple-100/60">
                        <span className="font-bold text-purple-900">Care Guide: </span>
                        {matchedProduct.durabilityProfile.maintenanceTips}
                      </p>
                    )}
                  </div>
                )}

                {/* Available Store Locations & Aisles */}
                {matchedProduct.storeLocations && matchedProduct.storeLocations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-purple-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5 mb-2">
                      <MapPin className="w-4 h-4 text-purple-700" />
                      <span>In-Store Locations & Aisles</span>
                    </h4>

                    <div className="space-y-1.5">
                      {matchedProduct.storeLocations.map((loc, idx) => (
                        <div 
                          key={idx}
                          className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <Store className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                              <span className="font-bold text-slate-900">{loc.storeName}</span>
                              <span className="text-3xs font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                {loc.stockStatus}
                              </span>
                            </div>
                            <p className="text-2xs text-slate-500 mt-0.5">
                              <span className="font-semibold text-purple-900">{loc.aisle}</span> • {loc.department} {loc.bayOrSection ? `(${loc.bayOrSection})` : ''}
                            </p>
                          </div>

                          {loc.localFinderUrl && (
                            <a
                              href={loc.localFinderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg text-3xs font-bold flex items-center gap-1 transition-colors shrink-0"
                            >
                              <span>Locate</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    id="add-and-rate-scanned-btn"
                    onClick={handleProceedToRate}
                    className="py-3 px-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-900/30 transition-all hover:scale-[1.01]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Rate & Customize Scores</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id="instant-quick-add-btn"
                    onClick={handleInstantQuickAdd}
                    className="py-3 px-4 rounded-2xl bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant Quick Add to Shelf</span>
                  </button>
                </div>

                {onOpenShareDurability && (
                  <button
                    id="share-durability-from-scanner-btn"
                    onClick={() => onOpenShareDurability(matchedProduct)}
                    className="w-full py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold text-xs flex items-center justify-center gap-2 border border-purple-200 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Share Durability & Store Location Card</span>
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* STATE 2: ACTIVE SCANNING MODES */
            <div>
              {/* MODE A: LIVE CAMERA FEED */}
              {activeMode === 'camera' && (
                <div className="space-y-3">
                  <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-black rounded-3xl overflow-hidden shadow-inner border border-purple-900">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      autoPlay
                      className="w-full h-full object-cover"
                    />

                    {/* Camera Targeting Reticle Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                      <div className="relative w-64 sm:w-72 h-44 sm:h-48 border-2 border-pink-400/80 rounded-2xl shadow-2xl bg-pink-500/5 backdrop-blur-[0.5px]">
                        {/* Animated Laser Scanning Line */}
                        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-bounce" />

                        {/* Corner Target Markers */}
                        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-white rounded-tl-lg" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-white rounded-tr-lg" />
                        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-white rounded-bl-lg" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-white rounded-br-lg" />

                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <span className="text-3xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Align Barcode in Frame
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* In-Camera Floating Controls */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      {torchSupported && (
                        <button
                          id="toggle-torch-btn"
                          onClick={toggleTorch}
                          className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                            torchOn ? 'bg-amber-400 text-purple-950 font-bold' : 'bg-black/60 text-white hover:bg-black/80'
                          }`}
                          title="Toggle Flashlight / Torch"
                        >
                          {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
                        </button>
                      )}

                      <button
                        id="flip-camera-btn"
                        onClick={toggleCameraFacing}
                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                        title="Flip Camera (Front/Back)"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {cameraError && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold">{cameraError}</p>
                        <p className="text-2xs text-amber-800 mt-1">
                          Try testing using the <strong>Test Items</strong> tab or <strong>Photo Upload</strong>.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-2xs text-purple-900 font-medium">
                    <span>💡 Point camera steadily at any product barcode or UPC box label.</span>
                  </div>
                </div>
              )}

              {/* MODE B: UPLOAD IMAGE */}
              {activeMode === 'upload' && (
                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.[0]) {
                        handleImageFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className="border-2 border-dashed border-purple-300 hover:border-pink-500 bg-purple-50/50 hover:bg-purple-50 rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white flex items-center justify-center shadow-md">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-purple-950">
                        {imageScanning ? 'Scanning barcode in photo...' : 'Click to Upload or Drag Barcode Photo'}
                      </p>
                      <p className="text-2xs text-purple-700 mt-1">
                        PNG, JPG, or WEBP photo showing the barcode
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-xs font-bold bg-white text-purple-900 px-4 py-2 rounded-xl border border-purple-200 shadow-2xs hover:bg-purple-100 transition-colors"
                    >
                      Browse Files
                    </button>
                  </div>

                  {cameraError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-800">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{cameraError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* MODE C: SAMPLE BARCODES */}
              {activeMode === 'samples' && (
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      <span>One-Click Test Barcodes (Instant Simulation)</span>
                    </p>
                    <span className="text-3xs font-mono text-purple-700">Click any item</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SAMPLE_BARCODES.map((item, idx) => (
                      <button
                        key={idx}
                        id={`test-barcode-${item.barcode}`}
                        onClick={() => handleBarcodeFound(item.barcode)}
                        className="p-3 bg-white hover:bg-purple-50/80 border border-purple-200 hover:border-pink-400 rounded-2xl text-left transition-all hover:shadow-xs group flex flex-col justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-3xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <span className="text-2xs font-bold text-pink-600">
                              ${item.price}
                            </span>
                          </div>
                          <p className="text-3xs font-semibold text-purple-700 uppercase">
                            {item.brand}
                          </p>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-950 line-clamp-1">
                            {item.name}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-3xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            {item.durability}
                          </span>
                          <span className="font-mono text-purple-700 group-hover:underline">
                            {item.barcode} →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MODE D: MANUAL INPUT */}
              {activeMode === 'manual' && (
                <form onSubmit={handleManualSearch} className="space-y-4">
                  <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-950">
                      Enter Barcode / UPC Number
                    </label>
                    <div className="relative">
                      <Barcode className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                      <input
                        id="manual-barcode-input"
                        type="text"
                        value={manualCodeInput}
                        onChange={(e) => setManualCodeInput(e.target.value)}
                        placeholder="e.g. 024147276555, 840122900012, 9312345678901..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-200 text-sm font-mono text-purple-950 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                        autoFocus
                      />
                    </div>
                    <p className="text-2xs text-slate-500">
                      Supports EAN-13, UPC-A, Code-128, and retail packaging codes.
                    </p>
                  </div>

                  {manualSearchError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{manualSearchError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-900/20"
                  >
                    <Search className="w-4 h-4" />
                    <span>Lookup Product by Barcode</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Bottom Hint Strip */}
        <div className="p-3 bg-purple-50/80 border-t border-purple-100 flex items-center justify-between text-2xs text-purple-800 shrink-0">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Automatic Durability & Store Location Matching
          </span>
          <button
            onClick={onClose}
            className="text-purple-600 hover:text-purple-950 font-semibold"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
