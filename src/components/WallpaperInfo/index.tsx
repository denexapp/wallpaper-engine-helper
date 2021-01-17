import { IconButton, MenuItem, TextField } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import React from 'react'
import useGetWallpaperInfo from '../../hooks/useGetWallpaperInfo'
import useTypedMessage from '../../hooks/useTypedMessage'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import { setLink, setName, setType } from '../../redux/reducers/wallpaperInfo'
import {
  WallpaperType,
  wallpaperTypeDescriptions
} from '../../utils/wallpaperTypes'
import Subheader from '../Subheader'
import TypedMessage from '../TypedMessage'
import styles from './styles.module.css'

const WallpaperInfo: React.FC = () => {
  const dispatch = useTypedDispatch()
  const getWallpaperInfo = useGetWallpaperInfo()

  const link = useTypedSelector(state => state.wallpaperInfo.link)
  const name = useTypedSelector(state => state.wallpaperInfo.name)
  const type = useTypedSelector(state => state.wallpaperInfo.type)
  const wallpaperEngineFolder = useTypedSelector(
    state => state.settings.settings?.wallpaperEngineFolder
  )

  const onLinkChange = (value: string) => dispatch(setLink(value))
  const onNameChange = (value: string) => dispatch(setName(value))
  const onTypeChange = (value: WallpaperType) => dispatch(setType(value))
  const onRefreshClick =
    wallpaperEngineFolder === undefined
      ? undefined
      : () => getWallpaperInfo(wallpaperEngineFolder)

  const linkLabel = useTypedMessage({ id: 'wallpaperInfoLink' })
  const nameLabel = useTypedMessage({ id: 'wallpaperInfoName' })
  const typeLabel = useTypedMessage({ id: 'wallpaperInfoType' })
  const hint = useTypedMessage({ id: 'wallpaperInfoHint' })

  const helperText =
    name !== '' && wallpaperEngineFolder === undefined ? hint : null

  return (
    <div className={styles.wallpaperInfo}>
      <Subheader
        icon={
          <IconButton
            size="small"
            disabled={wallpaperEngineFolder === undefined}
            onClick={onRefreshClick}
            edge="end"
          >
            <Refresh />
          </IconButton>
        }
      >
        <TypedMessage id="wallpaperInfoHeader" />
      </Subheader>
      <TextField
        value={name}
        onChange={event => onNameChange(event.target.value)}
        label={nameLabel}
        variant="outlined"
        helperText={helperText}
      />
      <TextField
        value={link}
        onChange={event => onLinkChange(event.target.value)}
        label={linkLabel}
        variant="outlined"
      />
      <TextField
        select
        value={type}
        onChange={event => onTypeChange(event.target.value as WallpaperType)}
        label={typeLabel}
        variant="outlined"
      >
        {Object.entries(wallpaperTypeDescriptions).map(
          ([type, { messageId }]) => (
            <MenuItem key={type} value={type}>
              <TypedMessage id={messageId} />
            </MenuItem>
          )
        )}
      </TextField>
    </div>
  )
}

export default WallpaperInfo
