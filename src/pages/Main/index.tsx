import { TextField, Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useTypedMessage from '../../hooks/useTypedMessage'
import styles from './styles.module.css'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import TypedMessage from '../../components/TypedMessage'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'

const Main: React.FC = () => {
  const copyToClipboard = useCopyToClipboard()

  const wallpaperNameLabel = useTypedMessage({ id: 'mainWallpaperName' })
  const wallpaperLinkLabel = useTypedMessage({ id: 'mainWallpaperLink' })
  const archiveNumberLabel = useTypedMessage({ id: 'mainArchiveNumber' })
  const descriptionLabel = useTypedMessage({ id: 'mainDescription' })

  const [wallpaperName, setWallpaperName] = useState('')
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
${wallpaperName} (тип темы - сцена)
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
      <Typography variant="h6">
        <TypedMessage id="mainHeader" />
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
        <Button
          onClick={handleVideoDescriptionClick}
          variant="contained"
          startIcon={<FileCopyIcon />}
        >
          <TypedMessage id="mainVideoDescription" />
        </Button>
      </div>
    </div>
  )
}

export default Main
