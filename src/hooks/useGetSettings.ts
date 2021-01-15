import { useSnackbar } from 'notistack'
import { useTypedDispatch } from '../redux'
import { getSettings } from '../redux/reducers/settings'
import useTypedMessage from './useTypedMessage'

const useGetSettings = (initial: boolean): (() => void) => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const errorMessage = useTypedMessage({ id: 'settingsGettingError' })
  const successMessage = useTypedMessage({ id: 'settingsGotten' })

  return () => {
    const promise = dispatch(getSettings(initial))
    promise.then(result => {
      if (
        !initial &&
        getSettings.rejected.match(result) &&
        !result.meta.aborted
      ) {
        enqueueSnackbar(errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
      if (
        !initial &&
        getSettings.fulfilled.match(result)
      ) {
        enqueueSnackbar(successMessage, {
          autoHideDuration: 1000,
          variant: 'success'
        })
      }
    })
  }
}

export default useGetSettings
