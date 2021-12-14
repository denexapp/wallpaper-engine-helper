import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import useTypedMessage from '../../hooks/useTypedMessage';
import { useTypedDispatch, useTypedSelector } from '../../redux';
import {
  setHeight,
  setResolutionType,
  setWidth,
} from '../../redux/reducers/wallpaperInfo';
import {
  ResolutionType,
  resolutionTypeDescriptions,
} from '../../utils/resolutionTypes';
import TypedMessage from '../TypedMessage';
import styles from './styles.module.css';

const Resolution: React.FC = () => {
  const dispatch = useTypedDispatch();

  const type = useTypedSelector((state) => state.wallpaperInfo.type);
  const resolutionType = useTypedSelector(
    (state) => state.wallpaperInfo.resolution.type
  );
  const width = useTypedSelector(
    (state) => state.wallpaperInfo.resolution.width
  );
  const height = useTypedSelector(
    (state) => state.wallpaperInfo.resolution.height
  );

  const onResolutionTypeChange = (value: ResolutionType) =>
    dispatch(setResolutionType(value));
  const onWidthChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const result = Number.parseInt(event.currentTarget.value, 10);
    if (Number.isNaN(result)) {
      dispatch(setWidth(0));
    } else {
      dispatch(setWidth(result));
    }
  };
  const onHeightChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const result = Number.parseInt(event.currentTarget.value, 10);
    if (Number.isNaN(result)) {
      dispatch(setHeight(0));
    } else {
      dispatch(setHeight(result));
    }
  };

  const resolutionLabel = useTypedMessage({ id: 'resolutionResolution' });
  const widthLabel = useTypedMessage({ id: 'resolutionWidth' });
  const heightLabel = useTypedMessage({ id: 'resolutionHeight' });

  if (type !== 'video') return null;

  return (
    <div className={styles.resolution}>
      <TextField
        select
        fullWidth
        value={resolutionType}
        onChange={(event) =>
          onResolutionTypeChange(event.target.value as ResolutionType)
        }
        label={resolutionLabel}
        variant="outlined"
      >
        {Object.entries(resolutionTypeDescriptions).map(
          ([value, { messageId }]) => (
            <MenuItem key={value} value={value}>
              <TypedMessage id={messageId} />
            </MenuItem>
          )
        )}
      </TextField>
      <TextField
        value={width}
        onChange={onWidthChange}
        label={widthLabel}
        variant="outlined"
        type="number"
      />
      <TextField
        value={height}
        onChange={onHeightChange}
        label={heightLabel}
        variant="outlined"
        type="number"
      />
    </div>
  );
};

export default Resolution;
