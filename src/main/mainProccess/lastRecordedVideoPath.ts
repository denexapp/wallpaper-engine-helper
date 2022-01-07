import { ipcMain } from 'electron';
import klaw from 'klaw';

const findLastRecordedVideoPath = async (
  recordedVideosFolder: string
): Promise<string | null> => {
  let latestModifiedFilePath: string | null = null;
  let latestModificationTimeMs: number | null = null;

  // eslint-disable-next-line no-restricted-syntax
  for await (const file of klaw(recordedVideosFolder)) {
    if (
      file.stats.isFile() &&
      file.path.endsWith('.mp4') &&
      (latestModificationTimeMs === null ||
        latestModificationTimeMs < file.stats.mtimeMs)
    ) {
      latestModificationTimeMs = file.stats.mtimeMs;
      latestModifiedFilePath = file.path;
    }
  }

  return latestModifiedFilePath;
};

const lastRecordedVideoPath = () => {
  ipcMain.on(
    'last-recorded-video-path',
    async (event, recordedVideosFolder: string) => {
      try {
        const result = await findLastRecordedVideoPath(recordedVideosFolder);
        if (result === null) {
          event.reply('last-recorded-video-path-fail');
        } else {
          event.reply('last-recorded-video-path-success', {
            lastRecordedVideoPath: result,
          });
        }
      } catch {
        event.reply('last-recorded-video-path-fail');
      }
    }
  );
};

export default lastRecordedVideoPath;
