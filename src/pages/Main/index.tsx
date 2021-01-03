import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import React, { useState } from 'react'
import Instruction from '../../components/Instruction'
import TypedMessage from '../../components/TypedMessage'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import useTypedMessage from '../../hooks/useTypedMessage'
import { MessageKey } from '../../localization'
import styles from './styles.module.css'
import PlacesToPost from '../../components/PlacesToPost'
import Version from '../../components/Version'

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

const Main: React.FC = () => {
  const copyToClipboard = useCopyToClipboard()

  const wallpaperNameLabel = useTypedMessage({ id: 'mainWallpaperName' })
  const wallpaperTypeLabel = useTypedMessage({ id: 'mainWallpaperType' })
  const wallpaperLinkLabel = useTypedMessage({ id: 'mainWallpaperLink' })
  const archiveNumberLabel = useTypedMessage({ id: 'mainArchiveNumber' })
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
      <Typography variant="h5">
        <TypedMessage id="mainHeader" />
      </Typography>
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
              <MenuItem value={type}>
                <TypedMessage id={messageId} />
              </MenuItem>
            ))}
          </Select>
          <TextField
            value={archiveNumber}
            onChange={event =>
              setArchiveNumber(Number.parseInt(event.currentTarget.value, 10))
            }
            label={archiveNumberLabel}
            variant="outlined"
            type="number"
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
