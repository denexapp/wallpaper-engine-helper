declare module '*.css';

declare module 'ffprobe-static-electron' {
  // eslint-disable-next-line import/prefer-default-export
  export const path: string;
}

interface Window {
  electron: any;
}
