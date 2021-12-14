import { useCallback } from 'react';
import { useTypedDispatch } from '../redux';
import { getCurrentWallpaper } from '../redux/reducers/wallpaperInfo';
import usePushToast from './usePushToast';

const useGetWallpaperInfo = (): ((wallpaperEngineFolder: string) => void) => {
  const dispatch = useTypedDispatch();
  const pushToast = usePushToast();

  const action = useCallback(
    async (wallpaperEngineFolder: string) => {
      const result = await dispatch(getCurrentWallpaper(wallpaperEngineFolder));

      if (getCurrentWallpaper.fulfilled.match(result)) {
        if (
          result.payload.type === 'video' &&
          result.payload.resolution === null
        ) {
          pushToast('wallpaperInfoWithoutResolution', 'warning');
        } else {
          pushToast('wallpaperInfoGotten', 'success');
        }
      }

      if (getCurrentWallpaper.rejected.match(result)) {
        pushToast('wallpaperInfoGettingError', 'error');
      }
    },
    [dispatch, pushToast]
  );

  const calledAction = useCallback(
    (wallpaperEngineFolder: string) => action(wallpaperEngineFolder),
    [action]
  );

  return calledAction;
};

export default useGetWallpaperInfo;
