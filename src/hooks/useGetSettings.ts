import { useCallback } from 'react';
import { useTypedDispatch } from '../redux';
import { getSettings } from '../redux/reducers/settings';
import useGetWallpaperInfo from './useGetWallpaperInfo';
import usePushToast from './usePushToast';

const useGetSettings = (initial: boolean): (() => void) => {
  const dispatch = useTypedDispatch();
  const pushToast = usePushToast();
  const getWallpaperInfo = useGetWallpaperInfo();

  const action = useCallback(async () => {
    const result = await dispatch(getSettings(initial));

    if (
      !initial &&
      getSettings.rejected.match(result) &&
      !result.meta.aborted
    ) {
      pushToast('settingsGettingError', 'error');
    }

    if (!initial && getSettings.fulfilled.match(result)) {
      pushToast('settingsGotten', 'success');
    }

    if (
      initial &&
      getSettings.fulfilled.match(result) &&
      result.payload.wallpaperEngineFolder
    ) {
      getWallpaperInfo(result.payload.wallpaperEngineFolder);
    }
  }, [dispatch, getWallpaperInfo, initial, pushToast]);

  const calledAction = useCallback(() => action(), [action]);

  return calledAction;
};

export default useGetSettings;
