export interface PremiumStatus {
  isActive: boolean;
  activatedAt?: number;
  expiresAt?: number;
  daysRemaining?: number;
  hasUsedFreeTrial?: boolean;
}

export interface PremiumFeatures {
  premiumEmojis: boolean;
  largerFileUpload: boolean;
  prioritySupport: boolean;
  customThemes: boolean;
  advancedSearch: boolean;
  chatExport: boolean;
  customNotifications: boolean;
  noAds: boolean;
}
