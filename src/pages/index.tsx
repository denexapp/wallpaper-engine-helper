import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import useTypedMessage from '../hooks/useTypedMessage'
import { useTypedDispatch } from '../redux'
import { authenticateBySavedToken } from '../redux/reducers/vkAuth'
import Main from './Main'

const Pages: React.FC = () => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const errorMessage = useTypedMessage({ id: 'pagesAuthenticationError' })

  useEffect(() => {
    const promise = dispatch(authenticateBySavedToken())
    promise.then(result => {
      if (result.meta.requestStatus === 'rejected' && !result.meta.aborted) {
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

  return <Main />
}

export default Pages
