import confetti from 'canvas-confetti';
import { BarcodeScannedProduct, ProductItem } from '../types';

/**
 * Synthesizes a crisp electronic confirmation beep using Web Audio API
 */
export function playScanBeep(frequency = 1200, duration = 0.08) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);

    if (navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }
  } catch {
    // Audio contexts may be silenced or blocked by user gesture restrictions
  }
}

/**
 * Fires celebration confetti on scan discovery
 */
export function triggerScanConfetti() {
  try {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#8b5cf6', '#f43f5e', '#3b82f6']
    });
  } catch {
    // fallback if confetti fails
  }
}

/**
 * Builds a clean, shareable text summary of a product's Durability and Store details
 */
export function generateDurabilityShareText(product: ProductItem | BarcodeScannedProduct): string {
  const durability = product.durabilityProfile;
  const store = product.storeLocations && product.storeLocations.length > 0 ? product.storeLocations[0] : null;

  const lines: string[] = [
    `✨ MAKEITHUP Durability Report: ${product.name} by ${product.brand}`,
    `⭐ Rating: ${('overallRating' in product ? product.overallRating : product.defaultRating?.overall || 5.0).toFixed(1)} / 5.0`,
    `🔁 Repurchase Verdict: ${('repurchase' in product ? product.repurchase : product.defaultRating?.repurchase || 'definitely').toUpperCase()}`
  ];

  if (durability) {
    lines.push(`🛡️ Durability Score: ${durability.durabilityScore.toFixed(1)} / 5.0 (${durability.wearResistance || 'High'} Wear Resistance)`);
    lines.push(`⏳ Expected Lifespan: ${durability.expectedLifespan}`);
    if (durability.materialComposition) {
      lines.push(`🧱 Material Build: ${durability.materialComposition}`);
    }
    if (durability.maintenanceTips) {
      lines.push(`💡 Care Tip: ${durability.maintenanceTips}`);
    }
  }

  if (store) {
    lines.push(`📍 Found In-Store: ${store.storeName} (${store.department}, ${store.aisle})`);
    if (store.stockStatus) {
      lines.push(`📦 Stock Status: ${store.stockStatus}`);
    }
  }

  if (product.sourceUrl) {
    lines.push(`🔗 Store Link: ${product.sourceUrl}`);
  }

  if (product.barcode) {
    lines.push(`🏷️ Barcode / UPC: ${product.barcode}`);
  }

  lines.push(`\nLogged on MAKEITHUP — Minimalist Product & Durability Ratings`);

  return lines.join('\n');
}
