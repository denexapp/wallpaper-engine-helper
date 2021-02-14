import { app, ipcMain } from 'electron';
import fs from 'fs-extra';
import path from 'path';

const tempDirectoryName = 'archive';

export interface MakeArchiveSettings {
  name: string;
  archiveNumber: number;
  folder: string;
}

const makeArchive = async (archiveSettings: MakeArchiveSettings) => {
  const { folder } = archiveSettings;
  const tempDirectory = path.join(app.getPath('temp'), tempDirectoryName);

  await fs.remove(tempDirectory);
  await fs.copy(folder, tempDirectory);
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
