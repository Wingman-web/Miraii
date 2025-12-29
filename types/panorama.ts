export type HotspotIcon = 
  | 'sports'
  | 'cycling'
  | 'park'
  | 'kids'
  | 'golf'
  | 'cafe'
  | 'restaurant'
  | 'bar'
  | 'building'
  | 'road'
  | 'school'
  | 'university'
  | 'convention'
  | 'tech'
  | 'government'
  | 'shopping'
  | 'lake'
  | 'airport'
  | 'hotel'
  | 'hospital'
  | 'default';

export interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  title: string;
  distance: string;
  link?: string;
  highlight?: boolean;
  icon?: HotspotIcon;
}

export interface PanoramaViewerProps {
  panoramaUrl: string;
  masterPlanUrl?: string;
  preloaderGifUrl?: string;
  label?: string;
  hotspots?: HotspotData[];
  autoRotate?: boolean;
  rotationDuration?: number;
  initialPitch?: number;
  initialYaw?: number;
  initialHfov?: number;
  className?: string;
}

export interface PannellumViewer {
  getPitch: () => number;
  setPitch: (pitch: number) => void;
  getYaw: () => number;
  setYaw: (yaw: number) => void;
  getHfov: () => number;
  setHfov: (hfov: number) => void;
  lookAt: (
    pitch: number,
    yaw: number,
    hfov?: number,
    animated?: number | boolean
  ) => void;
  on: (event: string, callback: (arg?: unknown) => void) => void;
  off: (event: string, callback?: (arg?: unknown) => void) => void;
  destroy: () => void;
  isLoaded: () => boolean;
}

declare global {
  interface Window {
    pannellum: {
      viewer: (
        container: string | HTMLElement,
        config: Record<string, unknown>
      ) => PannellumViewer;
    };
  }
}