import type { PremiumStatus, PremiumFeatures } from '../../types/premium';

const PREMIUM_STORAGE_KEY = 'housegramx_premium_status';
const TRIAL_DURATION_DAYS = 5;
const TRIAL_DURATION_MS = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000;

export function getPremiumStatus(): PremiumStatus {
  try {
    const stored = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!stored) {
      return {
        isActive: false,
        hasUsedFreeTrial: false,
      };
    }

    const status: PremiumStatus = JSON.parse(stored);
    
    // Check if premium has expired
    if (status.expiresAt && status.expiresAt < Date.now()) {
      status.isActive = false;
    }

    // Calculate days remaining
    if (status.isActive && status.expiresAt) {
      const daysRemaining = Math.ceil((status.expiresAt - Date.now()) / (24 * 60 * 60 * 1000));
      status.daysRemaining = Math.max(0, daysRemaining);
    }

    return status;
  } catch (error) {
    console.error('Error reading premium status:', error);
    return {
      isActive: false,
      hasUsedFreeTrial: false,
    };
  }
}

export function activateFreeTrial(): boolean {
  try {
    const status = getPremiumStatus();
    
    // Check if user already used free trial
    if (status.hasUsedFreeTrial) {
      return false;
    }

    const now = Date.now();
    const expiresAt = now + TRIAL_DURATION_MS;

    const newStatus: PremiumStatus = {
      isActive: true,
      activatedAt: now,
      expiresAt,
      daysRemaining: TRIAL_DURATION_DAYS,
      hasUsedFreeTrial: true,
    };

    localStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(newStatus));
    return true;
  } catch (error) {
    console.error('Error activating free trial:', error);
    return false;
  }
}

export function getPremiumFeatures(): PremiumFeatures {
  const status = getPremiumStatus();
  
  return {
    premiumEmojis: status.isActive,
    largerFileUpload: status.isActive,
    prioritySupport: status.isActive,
    customThemes: status.isActive,
    advancedSearch: status.isActive,
    chatExport: status.isActive,
    customNotifications: status.isActive,
    noAds: status.isActive,
  };
}

export function getTrialDaysRemaining(): number {
  const status = getPremiumStatus();
  return status.daysRemaining || 0;
}

export function isPremiumActive(): boolean {
  const status = getPremiumStatus();
  return status.isActive;
}
