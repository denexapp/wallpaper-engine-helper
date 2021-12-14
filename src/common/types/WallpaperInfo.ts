import { WallpaperType } from '../utils/wallpaperTypes';

export interface Resolution {
  width: number;
  height: number;
}

export interface WallpaperInfo {
  workshopId: number;
  name: string;
  type: WallpaperType;
  link: string;
  folder: string;
  resolution: Resolution | null;
}
