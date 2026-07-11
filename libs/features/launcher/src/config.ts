export type SupportedPlatform = {
  id: 'spotify' | 'youtube' | 'soundcloud';
  name: string;
  launchMode: 'pending-integration-story';
};

export type LauncherConfig = {
  productName: string;
  localDataStore: 'sqlite';
  supportedPlatforms: SupportedPlatform[];
};

const configuredProductName = import.meta.env.VITE_PRODUCT_NAME;

export const LAUNCHER_CONFIG: LauncherConfig = {
  productName: configuredProductName?.trim() || 'Sonar Room',
  localDataStore: 'sqlite',
  supportedPlatforms: [
    { id: 'spotify', name: 'Spotify', launchMode: 'pending-integration-story' },
    { id: 'youtube', name: 'YouTube', launchMode: 'pending-integration-story' },
    { id: 'soundcloud', name: 'SoundCloud', launchMode: 'pending-integration-story' },
  ],
};