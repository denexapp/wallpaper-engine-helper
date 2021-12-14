declare module '*.css';

declare module '@ffprobe-installer/ffprobe' {
  export const path: string;
}

// declare global {
  interface Window {
    electron: any;
  }
// }
