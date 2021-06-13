import { OptionsObject, useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { MessageKey } from '../localization';
import { TypedMessageValues } from './useTypedMessage';

type Variant = 'success' | 'error' | 'progress';

const variants: { [key in Variant]: OptionsObject } = {
  error: {
    autoHideDuration: 3000,
    variant: 'error',
  },
  success: {
    autoHideDuration: 1000,
    variant: 'success',
  },
  progress: {
    variant: 'info',
    persist: true,
  },
};

type Dismiss = () => void;

const usePushToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();

  const pushToast = useCallback(
    (
      id: MessageKey,
      variant: Variant,
      values?: TypedMessageValues
    ): Dismiss => {
      const message = intl.formatMessage({ id }, values);
      const key = enqueueSnackbar(message, variants[variant]);
      const dismiss: Dismiss = () => closeSnackbar(key);
      return dismiss;
    },
    [enqueueSnackbar, intl]
  );

  return pushToast;
};

export default usePushToast;
