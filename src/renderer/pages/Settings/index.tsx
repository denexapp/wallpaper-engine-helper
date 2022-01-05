import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { useEffect } from 'react';
import Title from '../../components/Title';
import TypedMessage from '../../components/TypedMessage';
import useGetSettings from '../../hooks/useGetSettings';
import usePushToast from '../../hooks/usePushToast';
import useTypedMessage from '../../hooks/useTypedMessage';
import { LocaleCode, locales } from '../../../common/localization';
import { useTypedDispatch, useTypedSelector } from '../../redux';
import {
  settingsLocale,
  settingsRecordedVideosFolder,
  settingsWallpaperEngineFolder,
} from '../../redux/reducers/settings';
import styles from './styles.module.css';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = (props) => {
  const { onClose } = props;

  const getSettings = useGetSettings(false);
  const dispatch = useTypedDispatch();
  const pushToast = usePushToast();

  const wallpaperEngineFolder = useTypedSelector(
    (state) => state.settings.settings?.wallpaperEngineFolder
  );
  const recordedVideosFolder = useTypedSelector(
    (state) => state.settings.settings?.recordedVideosFolder
  );
  const locale = useTypedSelector((state) => state.settings.settings?.locale);

  const wallpaperEngineFolderLabel = useTypedMessage({
    id: 'settingsWallpaperEngineFolderLabel',
  });
  const recordedVideosFolderLabel = useTypedMessage({
    id: 'settingsRecordedVideosFolderLabel',
  });
  const localeLabel = useTypedMessage({
    id: 'settingsLocaleLabel',
  });

  useEffect(getSettings, [getSettings]);

  const handleWallpaperEngineFolderChange = async () => {
    const result = await dispatch(settingsWallpaperEngineFolder());
    if (
      settingsWallpaperEngineFolder.fulfilled.match(result) &&
      result.payload
    ) {
      pushToast('settingsFolderSelected', 'success');
      getSettings();
    }
    if (settingsWallpaperEngineFolder.rejected.match(result)) {
      pushToast('settingsFolderSelectionError', 'error');
    }
  };

  const handleRecordedVideosFolderChange = async () => {
    const result = await dispatch(settingsRecordedVideosFolder());
    if (
      settingsRecordedVideosFolder.fulfilled.match(result) &&
      result.payload
    ) {
      pushToast('settingsFolderSelected', 'success');
      getSettings();
    }
    if (settingsRecordedVideosFolder.rejected.match(result)) {
      pushToast('settingsFolderSelectionError', 'error');
    }
  };

  const handleLocaleChange = (localeCode: LocaleCode) => {
    const promise = dispatch(settingsLocale(localeCode));
    promise
      .then((result) => {
        if (settingsLocale.rejected.match(result) && !result.meta.aborted) {
          pushToast('settingsLocaleSelectionError', 'error');
        }
        return undefined;
      })
      .catch(() => {
        pushToast('settingsLocaleSelectionError', 'error');
      });
    return promise.abort;
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Title>
          <TypedMessage id="settingsTitle" />
        </Title>
        <Button onClick={onClose}>
          <TypedMessage id="settingsClose" />
        </Button>
      </div>
      <TextField
        disabled
        value={wallpaperEngineFolder}
        label={wallpaperEngineFolderLabel}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleWallpaperEngineFolderChange}
                edge="end"
              >
                <FolderIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        disabled
        value={recordedVideosFolder}
        label={recordedVideosFolderLabel}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleRecordedVideosFolderChange} edge="end">
                <FolderIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        select
        value={locale}
        onChange={(event) =>
          handleLocaleChange(event.target.value as LocaleCode)
        }
        label={localeLabel}
        variant="outlined"
      >
        {Object.entries(locales).map(([localeCode, { name }]) => (
          <MenuItem key={localeCode} value={localeCode}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default Settings;
