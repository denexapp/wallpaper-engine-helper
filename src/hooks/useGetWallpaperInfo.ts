import { useTypedDispatch } from '../redux'
import { getCurrentWallpaper } from '../redux/reducers/wallpaperInfo'
import usePushToast from './usePushToast'

const useGetWallpaperInfo = (): ((wallpaperEngineFolder: string) => void) => {
  const dispatch = useTypedDispatch()
  const pushToast = usePushToast()

  const action = async (wallpaperEngineFolder: string) => {
    const result = await dispatch(getCurrentWallpaper(wallpaperEngineFolder))

    if (getCurrentWallpaper.fulfilled.match(result)) {
      pushToast('wallpaperInfoGotten', 'success')
    }

    if (getCurrentWallpaper.rejected.match(result)) {
      pushToast('wallpaperInfoGettingError', 'error')
    }
  }

  return (wallpaperEngineFolder: string) => {
    action(wallpaperEngineFolder)
  }
}

export default useGetWallpaperInfo
