import { useEffect } from 'react';
import { useTypedDispatch } from '../redux';
import { authenticateBySavedToken } from '../redux/reducers/vkAuth';
import usePushToast from './usePushToast';

const useAuthentication = (): void => {
  const dispatch = useTypedDispatch();
  const pushToast = usePushToast();

  useEffect(() => {
    const promise = dispatch(authenticateBySavedToken());
    promise
      .then((result) => {
        if (
          authenticateBySavedToken.rejected.match(result) &&
          !result.meta.aborted
        ) {
          pushToast('pagesAuthenticationError', 'error');
        }
        return undefined;
      })
      .catch(() => {
        pushToast('pagesAuthenticationError', 'error');
      });
    return () => {
      promise.abort();
    };
  }, [dispatch, pushToast]);
};

export default useAuthentication;
