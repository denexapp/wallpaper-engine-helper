const { contextBridge, ipcRenderer } = require('electron');

const validChannels = [
  'vk-next-archive-number',
  'vk-next-archive-number-fail',
  'vk-next-archive-number-success',
  'settings-get-success',
  'settings-get-fail',
  'settings-window-show-success',
  'settings-window-show-fail',
  'settings-set-wallpaper-engine-folder-success',
  'settings-set-wallpaper-engine-folder-fail',
  'settings-set-recorded-videos-folder-success',
  'settings-set-recorded-videos-folder-fail',
  'settings-set-locale-success',
  'settings-set-locale-fail',
  'vk-authenticate-success',
  'vk-authenticate-fail',
  'vk-sign-out-success',
  'vk-sign-out-fail',
  'vk-get-token-success',
  'vk-get-token-fail',
  'current-wallpaper-success',
  'current-wallpaper-fail',
  'make-archive-fail',
  'make-archive-success',
  'last-recorded-video-path-success',
  'last-recorded-video-path-fail',
];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    settingsGet: (payload) => {
      ipcRenderer.send('settings-get', payload);
    },
    currentWallpaper: (payload) => {
      ipcRenderer.send('current-wallpaper', payload);
    },
    settingsSetWallpaperEngineFolder: () => {
      ipcRenderer.send('settings-set-wallpaper-engine-folder');
    },
    settingsSetRecordedVideosFolder: () => {
      ipcRenderer.send('settings-set-recorded-videos-folder');
    },
    settingsSetLocale: (payload) => {
      ipcRenderer.send('settings-set-locale', payload);
    },
    settingsWindowShow: () => {
      ipcRenderer.send('settings-window-show');
    },
    vkAuthenticate: () => {
      ipcRenderer.send('vk-authenticate');
    },
    vkGetToken: () => {
      ipcRenderer.send('vk-get-token');
    },
    vkSignOut: () => {
      ipcRenderer.send('vk-sign-out');
    },
    vkNextArchiveNumber: () => {
      ipcRenderer.send('vk-next-archive-number');
    },
    makeArchive: (payload) => {
      ipcRenderer.send('make-archive', payload);
    },
    lastRecordedVideoPath: (payload) => {
      ipcRenderer.send('last-recorded-video-path', payload);
    },
    // myPing() {
    //   ipcRenderer.send('ipc-example', 'ping');
    // },
    // on(channel, func) {
    //   if (validChannels.includes(channel)) {
    //     // Deliberately strip event as it includes `sender`
    //     ipcRenderer.on(channel, (event, ...args) => func(...args));
    //   }
    // },
    once(channel, func) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
