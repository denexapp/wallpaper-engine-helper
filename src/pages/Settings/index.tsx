import {
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import React, { useEffect } from 'react'
import Title from '../../components/Title'
import TypedMessage from '../../components/TypedMessage'
import useGetSettings from '../../hooks/useGetSettings'
import usePushToast from '../../hooks/usePushToast'
import useTypedMessage from '../../hooks/useTypedMessage'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import { settingsWallpaperEngineFolder } from '../../redux/reducers/settings'
import styles from './styles.module.css'

interface SettingsProps {
  onClose: () => void
}

const Settings: React.FC<SettingsProps> = props => {
  const { onClose } = props

  const getSettings = useGetSettings(false)
  const dispatch = useTypedDispatch()
  const pushToast = usePushToast()
  const wallpaperEngineFolder = useTypedSelector(
    state => state.settings.settings?.wallpaperEngineFolder
  )
  const wallpaperEngineFolderLabel = useTypedMessage({
    id: 'settingsWallpaperEngineFolderLabel'
  })

  useEffect(getSettings, [])

  const handleFolderNameClick = async () => {
    const result = await dispatch(settingsWallpaperEngineFolder())
    if (
      settingsWallpaperEngineFolder.fulfilled.match(result) &&
      result.payload
    ) {
      pushToast('settingsWallpaperEngineFolderSelected', 'success')
      getSettings()
    }
    if (settingsWallpaperEngineFolder.rejected.match(result)) {
      pushToast('settingsWallpaperEngineFolderSelectionError', 'error')
    }
  }

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
              <IconButton onClick={handleFolderNameClick} edge="end">
                <FolderIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default Settings
