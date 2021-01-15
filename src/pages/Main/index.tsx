import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import SettingsIcon from '@material-ui/icons/Settings'
import React, { useState } from 'react'
import Instruction from '../../components/Instruction'
import TypedMessage from '../../components/TypedMessage'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import useTypedMessage from '../../hooks/useTypedMessage'
import { MessageKey } from '../../localization'
import styles from './styles.module.css'
import PlacesToPost from '../../components/PlacesToPost'
import Version from '../../components/Version'
import User from '../../components/User'
import Documents from '../../components/Documents'
import Title from '../../components/Title'

interface MainProps {
  onShowSettings: () => void
}

type WallpaperTypeName = 'scene' | 'web' | 'application' | 'video'

type WallpaperType = {
  messageId: MessageKey
  postText: string
  resolutions: boolean
}

const wallpaperTypes: { [key in WallpaperTypeName]: WallpaperType } = {
  application: {
    messageId: 'wallpaperTypeApplication',
    postText: 'приложение',
    resolutions: false
  },
  scene: {
    messageId: 'wallpaperTypeScene',
    postText: 'сцена',
    resolutions: false
  },
  video: {
    messageId: 'wallpaperTypeVideo',
    postText: 'видео',
    resolutions: true
  },
  web: {
    messageId: 'wallpaperTypeWeb',
    postText: 'веб',
    resolutions: false
  }
}

const Main: React.FC<MainProps> = props => {
  const { onShowSettings } = props

  const copyToClipboard = useCopyToClipboard()

  const wallpaperNameLabel = useTypedMessage({ id: 'mainWallpaperName' })
  const wallpaperTypeLabel = useTypedMessage({ id: 'mainWallpaperType' })
  const wallpaperLinkLabel = useTypedMessage({ id: 'mainWallpaperLink' })
  const descriptionLabel = useTypedMessage({ id: 'mainDescription' })

  const [wallpaperName, setWallpaperName] = useState('')
  const [wallpaperType, setWallpaperType] = useState<WallpaperTypeName>('scene')
  const [wallpaperLink, setWallpaperLink] = useState('')
  const [archiveNumber, setArchiveNumber] = useState(0)
  const [description, setDescription] = useState('')

  const handleFolderNameClick = async () => {
    await copyToClipboard(wallpaperName)
  }

  const handleVideoNameClick = async () => {
    await copyToClipboard(wallpaperName)
  }

  const handleArchiveNameClick = async () => {
    await copyToClipboard(`${archiveNumber} - ${wallpaperName}`)
  }

  const handlePostTextClick = async () => {
    const text = `Рубрика #тема_дня@wp.engine:
${wallpaperName} (тип темы - ${wallpaperTypes[wallpaperType].postText})
${description}`
    await copyToClipboard(text)
  }

  const handleVideoDescriptionClick = async () => {
    const text = `Мастерская Steam: ${wallpaperLink}
Скачать архив здесь: 
Сообщество ВКонтакте: https://vk.com/wp.engine`
    await copyToClipboard(text)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Title>
          <TypedMessage id="mainHeader" />
        </Title>
        <div>
          <Button
            onClick={onShowSettings}
            variant="text"
            endIcon={<SettingsIcon />}
          >
            <TypedMessage id="mainSettings" />
          </Button>
        </div>
        <User />
      </div>
      <div className={styles.columns}>
        <div className={styles.mainColumn}>
          <Typography variant="h6">
            <TypedMessage id="mainPostBundling" />
          </Typography>
          <TextField
            value={wallpaperName}
            onChange={event => setWallpaperName(event.target.value)}
            label={wallpaperNameLabel}
            variant="outlined"
          />
          <TextField
            value={wallpaperLink}
            onChange={event => setWallpaperLink(event.target.value)}
            label={wallpaperLinkLabel}
            variant="outlined"
          />
          <Select
            value={wallpaperType}
            onChange={event =>
              setWallpaperType(event.target.value as WallpaperTypeName)
            }
            renderValue={value => (
              <TypedMessage
                id={wallpaperTypes[value as WallpaperTypeName].messageId}
              />
            )}
            label={wallpaperTypeLabel}
            variant="outlined"
          >
            {Object.entries(wallpaperTypes).map(([type, { messageId }]) => (
              <MenuItem key={type} value={type}>
                <TypedMessage id={messageId} />
              </MenuItem>
            ))}
          </Select>
          <Documents
            value={archiveNumber}
            onChange={value => setArchiveNumber(value)}
          />
          <TextField
            value={description}
            onChange={event => setDescription(event.target.value)}
            label={descriptionLabel}
            variant="outlined"
            multiline
          />
          <div className={styles.buttons}>
            <Button
              onClick={handleFolderNameClick}
              variant="contained"
              startIcon={<FileCopyIcon />}
            >
              <TypedMessage id="mainFolderName" />
            </Button>
            <Button
              onClick={handleVideoNameClick}
              variant="contained"
              startIcon={<FileCopyIcon />}
            >
              <TypedMessage id="mainVideoName" />
            </Button>
            <Button
              onClick={handleVideoDescriptionClick}
              variant="contained"
              startIcon={<FileCopyIcon />}
            >
              <TypedMessage id="mainVideoDescription" />
            </Button>
            <Button
              onClick={handleArchiveNameClick}
              variant="contained"
              startIcon={<FileCopyIcon />}
            >
              <TypedMessage id="mainArchiveName" />
            </Button>
            <Button
              onClick={handlePostTextClick}
              variant="contained"
              startIcon={<FileCopyIcon />}
            >
              <TypedMessage id="mainPostText" />
            </Button>
          </div>
        </div>
        <div className={styles.secondaryColumn}>
          <Typography variant="h6">
            <TypedMessage id="mainHowTo" />
          </Typography>
          <Instruction />
          <Typography variant="h6">
            <TypedMessage id="mainStepsToPost" />
          </Typography>
          <PlacesToPost />
          <Typography variant="h6">
            <TypedMessage id="mainAbout" />
          </Typography>
          <Version />
        </div>
      </div>
    </div>
  )
}

export default Main
