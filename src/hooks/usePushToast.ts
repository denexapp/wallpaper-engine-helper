import { OptionsObject, useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'
import { MessageKey } from '../localization'
import {
  TypedMessageValues
} from './useTypedMessage'

type Variant = 'success' | 'error'

const variants: { [key in Variant]: OptionsObject } = {
  error: {
    autoHideDuration: 3000,
    variant: 'error'
  },
  success: {
    autoHideDuration: 1000,
    variant: 'success'
  }
}

const usePushToast = () => {
  const { enqueueSnackbar } = useSnackbar()
  const intl = useIntl()

  const pushToast = (
    id: MessageKey,
    variant: Variant,
    values?: TypedMessageValues
  ) => {
    const message = intl.formatMessage({ id }, values)
    enqueueSnackbar(message, variants[variant])
  }

  return pushToast
}

export default usePushToast
