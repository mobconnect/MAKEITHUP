import React, { useState, useRef } from 'react';
import { ProductItem, ProductTutorial, TutorialStep, ProductCategory } from '../types';
import { 
  X, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Sparkles, 
  Plus, 
  Trash2, 
  Lightbulb, 
  Camera, 
  Check, 
  Film, 
  Clock, 
  Play, 
  AlertCircle,
  Wrench
} from 'lucide-react';

interface CreateTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTutorial: (tutorial: ProductTutorial) => void;
  products: ProductItem[];
  preselectedProduct?: ProductItem | null;
}

export const CreateTutorialModal: React.FC<CreateTutorialModalProps> = ({
  isOpen,
  onClose,
  onSaveTutorial,
  products,
  preselectedProduct
}) => {
  // Main form fields
  const [selectedProductId, setSelectedProductId] = useState<string>(preselectedProduct?.id || (products[0]?.id || ''));
  const [customProductName, setCustomProductName] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [category, setCategory] = useState<ProductCategory>(preselectedProduct?.category || 'makeup');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('Beauty & Home Enthusiast');
  const [authorBadge, setAuthorBadge] = useState('Verified Owner');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [durationMinutes, setDurationMinutes] = useState(5);
  
  // Media states
  const [videoFileUrl, setVideoFileUrl] = useState<string>('');
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>('');
  const [afterImageUrl, setAfterImageUrl] = useState<string>('');
  const [beforeAfterDesc, setBeforeAfterDesc] = useState('');

  // Steps state
  const [steps, setSteps] = useState<TutorialStep[]>([
    {
      stepNumber: 1,
      title: 'Prep & Measure',
      instruction: 'Ensure product area is clean and dispense the recommended portion onto applicator.',
      timecode: '0:15',
      proTip: 'Less is more—begin with a sheer base.'
    },
    {
      stepNumber: 2,
      title: 'Technique Application',
      instruction: 'Apply with gentle even strokes, blending out edges towards perimeter.',
      timecode: '1:20',
      proTip: 'Work in thin layers for maximum longevity.'
    }
  ]);

  // Tools & pro tips
  const [toolsInput, setToolsInput] = useState('');
  const [tipsInput, setTipsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const beforeInputRef = useRef<HTMLInputElement | null>(null);
  const afterInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const currentProduct = products.find(p => p.id === selectedProductId) || preselectedProduct;

  // Handle Video file upload
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFileUrl(url);
      setVideoFileName(file.name);
      if (!coverImageUrl) {
        setCoverImageUrl('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800');
      }
    }
  };

  // Handle Cover Image file upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Before & After image file uploads
  const handleBeforeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setBeforeImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAfterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setAfterImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick preset sample video for preview
  const handleUseSampleVideo = () => {
    setVideoFileUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    setVideoFileName('sample_application_demonstration.mp4');
    if (!coverImageUrl) {
      setCoverImageUrl('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800');
    }
  };

  // Steps management
  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        title: '',
        instruction: '',
        timecode: `0:${steps.length * 30}`,
        proTip: ''
      }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    const newSteps = steps.filter((_, i) => i !== index).map((s, i) => ({
      ...s,
      stepNumber: i + 1
    }));
    setSteps(newSteps);
  };

  const handleStepChange = (index: number, field: keyof TutorialStep, value: any) => {
    const updated = [...steps];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setSteps(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a tutorial title.');
      return;
    }

    const prodName = currentProduct ? currentProduct.name : (customProductName.trim() || 'Featured Product');
    const prodBrand = currentProduct ? currentProduct.brand : (customBrand.trim() || 'Curated Brand');
    const prodCategory = currentProduct ? currentProduct.category : category;
    const prodImage = currentProduct?.imageUrl || coverImageUrl || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800';

    const toolsList = toolsInput.split(',').map(t => t.trim()).filter(Boolean);
    const tipsList = tipsInput.split('\n').map(t => t.trim()).filter(Boolean);
    const tagsList = tagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    const newTutorial: ProductTutorial = {
      id: `tut-${Date.now()}`,
      productId: currentProduct ? currentProduct.id : `custom-prod-${Date.now()}`,
      productName: prodName,
      productBrand: prodBrand,
      productCategory: prodCategory,
      productImageUrl: prodImage,
      title: title.trim(),
      description: description.trim() || `Step-by-step in-use demonstration for ${prodName}.`,
      authorName: authorName.trim() || 'User Demonstration',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      authorBadge: authorBadge.trim() || 'Verified Owner',
      difficulty,
      durationMinutes: Number(durationMinutes) || 5,
      videoUrl: videoFileUrl || undefined,
      coverImageUrl: coverImageUrl || prodImage,
      steps: steps.map((s, i) => ({
        stepNumber: i + 1,
        title: s.title.trim() || `Step ${i + 1}`,
        instruction: s.instruction.trim() || 'Follow the technique as demonstrated in video.',
        timecode: s.timecode || undefined,
        proTip: s.proTip?.trim() || undefined
      })),
      proTips: tipsList.length > 0 ? tipsList : ['Store product upright in cool dry environment after usage.'],
      toolsRequired: toolsList.length > 0 ? toolsList : undefined,
      beforeAfter: (beforeImageUrl && afterImageUrl) ? {
        beforeImageUrl,
        afterImageUrl,
        beforeLabel: 'Before Application',
        afterLabel: 'After In-Use Result',
        description: beforeAfterDesc.trim() || 'Demonstrates real-world finish and wear longevity.'
      } : undefined,
      likesCount: 1,
      userLiked: true,
      savesCount: 0,
      viewsCount: 1,
      datePosted: new Date().toISOString().split('T')[0],
      tags: tagsList.length > 0 ? tagsList : ['InUseTutorial', prodCategory]
    };

    onSaveTutorial(newTutorial);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Create In-Use Product Tutorial</h2>
              <p className="text-3xs text-purple-200">Share video demonstrations, routines, and wear-test guides</p>
            </div>
          </div>
          <button
            id="close-create-tutorial-btn"
            onClick={onClose}
            className="p-1.5 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 md:p-6 space-y-6">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Product Selection */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4">
            <label className="block text-2xs font-bold uppercase tracking-wider text-purple-950 mb-2">
              Featured Product
            </label>
            
            {products.length > 0 ? (
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.brand} — {p.name} ({p.category})
                  </option>
                ))}
              </select>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Product Name (e.g. Soft Pinch Liquid Blush)"
                  value={customProductName}
                  onChange={(e) => setCustomProductName(e.target.value)}
                  className="bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="Brand (e.g. Rare Beauty)"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  className="bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            )}
          </div>

          {/* Video & Photo Media Upload Section */}
          <div className="bg-slate-50 border border-purple-100 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-pink-600" />
                <label className="text-2xs font-bold uppercase tracking-wider text-purple-950">
                  Upload Demonstration Video (MP4 / WebM)
                </label>
              </div>
              <button
                type="button"
                onClick={handleUseSampleVideo}
                className="text-3xs text-pink-600 hover:text-pink-700 font-bold underline"
              >
                Use Sample Demo Clip
              </button>
            </div>

            {/* Video preview / dropzone */}
            <div className="border-2 border-dashed border-purple-200 hover:border-pink-400 rounded-2xl p-4 bg-white text-center transition-colors">
              {videoFileUrl ? (
                <div className="space-y-3">
                  <div className="relative aspect-video max-h-48 mx-auto rounded-xl overflow-hidden bg-slate-950 shadow-xs">
                    <video
                      src={videoFileUrl}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xs font-mono text-slate-600 truncate max-w-xs">{videoFileName || 'Uploaded Video File'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFileUrl('');
                        setVideoFileName('');
                      }}
                      className="text-3xs text-rose-600 hover:underline font-bold"
                    >
                      Remove Video
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => videoInputRef.current?.click()}
                  className="cursor-pointer py-4 flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Click to upload product-in-use video</p>
                    <p className="text-3xs text-slate-500">MP4, WebM, MOV up to 100MB</p>
                  </div>
                </div>
              )}
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="hidden"
              />
            </div>

            {/* Cover photo or image upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-3xs font-semibold text-purple-900 mb-1">
                  Tutorial Cover Image Photo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="https://... or upload photo"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    className="flex-1 bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl transition-colors shrink-0"
                    title="Upload photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-3xs font-semibold text-purple-900 mb-1">
                  Difficulty & Estimated Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="bg-white border border-purple-200 rounded-xl px-2 py-2 text-xs font-medium"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-medium"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-3xs text-slate-400">min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Overview */}
          <div className="space-y-3">
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-950 mb-1">
                Tutorial Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Dewy Under-Painting Routine & Cloud Blending"
                className="w-full bg-white border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-950 mb-1">
                Overview & Technique Explanation
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe why this method works and what result viewers will achieve..."
                className="w-full bg-white border border-purple-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-2xs font-bold uppercase tracking-wider text-purple-950">
                Step-by-Step Instructions ({steps.length})
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1 text-3xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200"
              >
                <Plus className="w-3 h-3" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-purple-50/50 border border-purple-200/80 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-5 h-5 rounded-full bg-purple-900 text-white text-3xs font-bold flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                        placeholder={`Step ${step.stepNumber} Title (e.g. Dotting placement)`}
                        className="flex-1 bg-white border border-purple-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                      />
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={step.timecode || ''}
                        onChange={(e) => handleStepChange(idx, 'timecode', e.target.value)}
                        placeholder="0:45"
                        className="w-16 bg-white border border-purple-200 rounded-lg px-2 py-1.5 text-3xs font-mono text-center font-bold"
                        title="Video timestamp"
                      />
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={step.instruction}
                    onChange={(e) => handleStepChange(idx, 'instruction', e.target.value)}
                    placeholder="Step details and instructions..."
                    className="w-full bg-white border border-purple-200 rounded-lg p-2.5 text-xs text-slate-700"
                  />

                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <input
                      type="text"
                      value={step.proTip || ''}
                      onChange={(e) => handleStepChange(idx, 'proTip', e.target.value)}
                      placeholder="Optional pro tip for this step..."
                      className="flex-1 bg-white border border-amber-200 rounded-lg px-2.5 py-1 text-3xs text-amber-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Before & After Wear Test Photos Upload */}
          <div className="bg-pink-50/40 border border-pink-200/70 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-pink-700" />
              <label className="text-2xs font-bold uppercase tracking-wider text-pink-950">
                Before & After Wear Test Photos (Optional)
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Before photo */}
              <div className="space-y-1.5">
                <label className="block text-3xs font-bold text-pink-900">Before Application Photo</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Photo URL or pick file"
                    value={beforeImageUrl}
                    onChange={(e) => setBeforeImageUrl(e.target.value)}
                    className="flex-1 bg-white border border-pink-200 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => beforeInputRef.current?.click()}
                    className="p-2 bg-pink-100 text-pink-800 rounded-xl hover:bg-pink-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                  <input
                    ref={beforeInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBeforeFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* After photo */}
              <div className="space-y-1.5">
                <label className="block text-3xs font-bold text-pink-900">After In-Use Result Photo</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Photo URL or pick file"
                    value={afterImageUrl}
                    onChange={(e) => setAfterImageUrl(e.target.value)}
                    className="flex-1 bg-white border border-pink-200 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => afterInputRef.current?.click()}
                    className="p-2 bg-pink-100 text-pink-800 rounded-xl hover:bg-pink-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                  <input
                    ref={afterInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAfterFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <input
              type="text"
              value={beforeAfterDesc}
              onChange={(e) => setBeforeAfterDesc(e.target.value)}
              placeholder="Short note on before/after comparison (e.g. 14-hour crease-proof wear test)..."
              className="w-full bg-white border border-pink-200 rounded-xl px-3 py-1.5 text-xs"
            />
          </div>

          {/* Tools & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-3xs font-bold text-purple-900 mb-1">
                Tools & Equipment (Comma-separated)
              </label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="e.g. Angled buffing brush, Damp microfiber sponge"
                className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-3xs font-bold text-purple-900 mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. Under-painting, Dewy Cheeks, Longwear"
                className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

        </form>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-purple-100 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            id="submit-tutorial-btn"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-md transition-all hover:scale-[1.02]"
          >
            <Check className="w-4 h-4" />
            <span>Publish In-Use Tutorial</span>
          </button>
        </div>

      </div>
    </div>
  );
};
