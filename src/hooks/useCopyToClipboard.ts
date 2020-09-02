import { useSnackbar } from 'notistack'
import useTypedMessage from './useTypedMessage'


const useCopyToClipboard = () => {
  const { enqueueSnackbar } = useSnackbar()
  const successMessage = useTypedMessage({ id: 'copySuccess' })
  const failMessage = useTypedMessage({ id: 'copyFail' })

  const copyToClipboard = async (text: string) => {
    let message = failMessage
  
    try {
      await navigator.clipboard.writeText(text)
      message = successMessage
    } catch { }
  
    enqueueSnackbar(message, { autoHideDuration: 1000, variant: 'success' })
  }
  
  return copyToClipboard
}

export default useCopyToClipboard
