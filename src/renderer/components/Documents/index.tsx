import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import React, { useCallback, useEffect } from 'react';
import usePushToast from '../../hooks/usePushToast';
import useTypedMessage from '../../hooks/useTypedMessage';
import { useTypedDispatch, useTypedSelector } from '../../redux';
import {
  nextArchiveNumber,
  setArchiveNumber,
} from '../../redux/reducers/documents';

const Documents: React.FC = () => {
  const dispatch = useTypedDispatch();
  const pushToast = usePushToast();
  const archiveNumber = useTypedSelector(
    (state) => state.documents.archiveNumber
  );
  const authState = useTypedSelector((state) => state.vkAuth.state);
  const archiveNumberLabel = useTypedMessage({
    id: 'documentsArchiveNumberLabel',
  });
  const hint = useTypedMessage({ id: 'documentsHint' });
  const signedIn = authState === 'authenticated' || authState === 'signingOut';
  const helperText = !signedIn && archiveNumber !== 0 ? hint : null;

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const result = Number.parseInt(event.currentTarget.value, 10);
    if (Number.isNaN(result)) {
      dispatch(setArchiveNumber(0));
    } else {
      dispatch(setArchiveNumber(result));
    }
  };

  const makeRequest = useCallback(() => {
    const promise = dispatch(nextArchiveNumber());
    promise
      .then((result) => {
        if (nextArchiveNumber.rejected.match(result) && !result.meta.aborted) {
          pushToast('documentsRequestError', 'error');
        }
        if (nextArchiveNumber.fulfilled.match(result)) {
          pushToast('documentsRequestSuccess', 'success');
        }
        return undefined;
      })
      .catch(() => {
        pushToast('documentsRequestError', 'error');
      });
    return promise.abort;
  }, [dispatch, pushToast]);

  useEffect(() => {
    if (!signedIn) return () => undefined;
    const abort = makeRequest();
    return () => {
      abort();
    };
  }, [signedIn, makeRequest]);

  return (
    <TextField
      value={archiveNumber}
      onChange={onChange}
      label={archiveNumberLabel}
      variant="outlined"
      type="number"
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!signedIn}
              onClick={signedIn ? makeRequest : undefined}
              edge="end"
            >
              <Refresh />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Documents;
