import { Refresh } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import usePushToast from '../../hooks/usePushToast';
import useTypedMessage from '../../hooks/useTypedMessage';
import { useTypedDispatch, useTypedSelector } from '../../redux';
import { getLastRecordedVideoPath } from '../../redux/reducers/video';

const Video: React.FC = () => {
  const dispatch = useTypedDispatch();
  const pushToast = usePushToast();
  const lastRecordedVideoPath = useTypedSelector(
    (state) => state.video.lastRecordedVideoPath
  );
  const lastRecordedVideoName =
    lastRecordedVideoPath?.split('\\').slice(-1)[0] ?? '';
  const recordedVideosFolder = useTypedSelector(
    (state) => state.settings.settings?.recordedVideosFolder
  );
  const recordedVideoLabel = useTypedMessage({
    id: 'videoRecordedVideoLabel',
  });
  const hint = useTypedMessage({ id: 'videoHint' });
  const recordedVideosFolderSpecified = recordedVideosFolder !== undefined;
  const helperText =
    !recordedVideosFolderSpecified && lastRecordedVideoPath !== null
      ? hint
      : null;

  // const onChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   dispatch(setLastRecordedVideoPath(event.currentTarget.value))
  // };

  const makeRequest = useCallback(() => {
    if (recordedVideosFolder === undefined) {
      pushToast('videoRecordedVideoGettingError', 'error');
      return () => {};
    }
    const promise = dispatch(getLastRecordedVideoPath(recordedVideosFolder));
    promise
      .then((result) => {
        if (
          getLastRecordedVideoPath.rejected.match(result) &&
          !result.meta.aborted
        ) {
          pushToast('videoRecordedVideoGettingError', 'error');
        }
        if (getLastRecordedVideoPath.fulfilled.match(result)) {
          pushToast('videoRecordedVideoGettingSuccess', 'success');
        }
        return undefined;
      })
      .catch(() => {
        pushToast('videoRecordedVideoGettingError', 'error');
      });
    return promise.abort;
  }, [dispatch, pushToast, recordedVideosFolder]);

  useEffect(() => {
    if (!recordedVideosFolderSpecified) return () => undefined;
    const abort = makeRequest();
    return () => {
      abort();
    };
  }, [recordedVideosFolderSpecified, makeRequest]);

  return (
    <TextField
      disabled
      value={lastRecordedVideoName}
      label={recordedVideoLabel}
      variant="outlined"
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!recordedVideosFolderSpecified}
              onClick={recordedVideosFolderSpecified ? makeRequest : undefined}
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

export default Video;
