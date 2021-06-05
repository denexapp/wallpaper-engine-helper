import { app, ipcMain } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import _7z from '7zip-min';
import { delimeter } from '../utils/documents';

const tempDirectoryName = 'wallpaper-engine-vk-helper-temp';
const wallpaperDirectoryName = 'wallpaper';
const desktopDirectoryName = 'Wallpaper Engine VK Helper';

export interface MakeArchiveSettings {
  name: string;
  archiveNumber: number;
  folder: string;
}

const makeArchive = async (archiveSettings: MakeArchiveSettings) => {
  const { folder, archiveNumber, name } = archiveSettings;

  const archiveName = `${archiveNumber.toString(10)}${delimeter}${name}.7z`;

  const tempDirectoryPath = path.join(
    app.getPath('temp'),
    tempDirectoryName,
    wallpaperDirectoryName
  );

  const wallpaperDirectoryPath = path.join(
    app.getPath('temp'),
    tempDirectoryName,
    wallpaperDirectoryName,
    name
  );

  const archivePath = path.join(
    app.getPath('desktop'),
    desktopDirectoryName,
    archiveName
  );

  await fs.remove(tempDirectoryPath);
  await fs.copy(folder, wallpaperDirectoryPath);

  await new Promise<void>((resolve, reject) => {
    _7z.pack(wallpaperDirectoryPath, archivePath, (error) => {
      if (error) {
        reject(new Error("Can't pack archive"));
      } else {
        resolve();
      }
    });
  });
};

const archive = () => {
  ipcMain.on(
    'make-archive',
    async (event, archiveSettings: MakeArchiveSettings) => {
      try {
        await makeArchive(archiveSettings);
        event.reply('make-archive-success');
      } catch {
        event.reply('make-archive-fail');
      }
    }
  );
};

export default archive;
