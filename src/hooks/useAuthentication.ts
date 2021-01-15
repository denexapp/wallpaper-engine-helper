import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import useTypedMessage from '../hooks/useTypedMessage'
import { useTypedDispatch } from '../redux'
import { authenticateBySavedToken } from '../redux/reducers/vkAuth'

const useAuthentication = (): void => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const errorMessage = useTypedMessage({ id: 'pagesAuthenticationError' })

  useEffect(() => {
    const promise = dispatch(authenticateBySavedToken())
    promise.then(result => {
      if (
        authenticateBySavedToken.rejected.match(result) &&
        !result.meta.aborted
      ) {
        enqueueSnackbar(errorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
    })
    return () => {
      promise.abort()
    }
  }, [])
}

export default useAuthentication
