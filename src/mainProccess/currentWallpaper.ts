import { ipcMain } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getPublishedFileDetails } from '../utils/steam';
import { WallpaperType } from '../utils/wallpaperTypes';
import { configDecoder, packageDecoder } from '../utils/weConfigs';

export interface WallpaperInfo {
  workshopId: number;
  name: string;
  type: WallpaperType;
  link: string;
  folder: string;
}

const getWallpaperInfo = async (folderPath: string): Promise<WallpaperInfo> => {
  const configFileName = 'config.json';
  const projectFileName = 'project.json';

  const configPath = path.join(folderPath, configFileName);
  const config = await fs.promises.readFile(configPath, { encoding: 'utf8' });
  const { username } = os.userInfo();
  const json = JSON.parse(config);
  const decodedConfig = await configDecoder.decodePromise(json);
  const { lastselectedmonitor } = decodedConfig[username].general.browser;
  const { file } = decodedConfig[
    username
  ].general.wallpaperconfig.selectedwallpapers[lastselectedmonitor];

  const folder = path.normalize(path.parse(file).dir);
  const projectPath = path.join(folder, projectFileName);
  const project = await fs.promises.readFile(projectPath, { encoding: 'utf8' });
  const projectJson = JSON.parse(project);
  const decodedProject = await packageDecoder.decodePromise(projectJson);

  if (
    decodedProject.dependency !== undefined ||
    decodedProject.preset !== undefined
  ) {
    throw new Error();
  }

  let workshopId: number;
  if (decodedProject.workshopId !== undefined) {
    workshopId = decodedProject.workshopId;
  } else {
    workshopId = Number.parseInt(folder.split(path.sep).slice(-1)[0], 10);
  }
  if (Number.isNaN(workshopId)) {
    throw new Error();
  }

  const url = new URL('https://steamcommunity.com/sharedfiles/filedetails/');
  url.searchParams.append('id', workshopId.toString(10));
  const link = url.toString();

  const { type } = decodedProject;
  if (type === undefined) {
    throw new Error();
  }

  const name = (await getPublishedFileDetails(workshopId)).title;

  return {
    link,
    name,
    type,
    workshopId,
    folder,
  };
};

const currentWallpaper = () => {
  ipcMain.on('current-wallpaper', async (event, folderPath: string) => {
    try {
      const wallpaperInfo = await getWallpaperInfo(folderPath);
      event.reply('current-wallpaper-success', wallpaperInfo);
    } catch {
      event.reply('current-wallpaper-fail');
    }
  });
};

export default currentWallpaper;
