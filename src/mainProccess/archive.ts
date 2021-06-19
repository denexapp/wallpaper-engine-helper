import _7z from '7zip-min';
import { app, ipcMain } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import VK from 'vk-ts';
import { groupId } from '../utils/consts';
import { delimeter } from '../utils/documents';
import state from './state';

const tempDirectoryName = 'wallpaper-engine-vk-helper-temp';
const wallpaperDirectoryName = 'wallpaper';

export interface MakeArchiveSettings {
  name: string;
  archiveNumber: number;
  folder: string;
}

const makeArchive = async (archiveSettings: MakeArchiveSettings, vk: VK) => {
  const { folder, archiveNumber, name } = archiveSettings;

  const safeName = name.replace(/[*|?:"<>{}[\]\\/]/gi, '');
  const archiveName = `${archiveNumber.toString(10)}${delimeter}${safeName}.7z`;

  const tempDirectoryPath = path.join(
    app.getPath('temp'),
    tempDirectoryName,
    wallpaperDirectoryName
  );

  const wallpaperDirectoryPath = path.join(
    app.getPath('temp'),
    tempDirectoryName,
    wallpaperDirectoryName,
    safeName
  );

  const archivePath = path.join(
    app.getPath('temp'),
    tempDirectoryName,
    wallpaperDirectoryName,
    archiveName
  );

  await fs.remove(tempDirectoryPath);

  let stream: fs.ReadStream | undefined;

  try {
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

    const { upload_url: uploadUrl } = await vk.docsGetUploadServer(groupId);

    stream = fs.createReadStream(archivePath);
    const { file } = await vk.docsUpload(uploadUrl, stream);

    await vk.docsSave(file);
  } finally {
    if (stream !== undefined) {
      stream.close();
    }
    await fs.remove(tempDirectoryPath);
  }
};

const archive = () => {
  ipcMain.on(
    'make-archive',
    async (event, archiveSettings: MakeArchiveSettings) => {
      const { vk } = state;
      if (vk === null) {
        event.reply('make-archive-fail');
        return;
      }
      try {
        await makeArchive(archiveSettings, vk);
        event.reply('make-archive-success');
      } catch {
        event.reply('make-archive-fail');
      }
    }
  );
};

export default archive;
