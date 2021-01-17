import { Button } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import SettingsIcon from '@material-ui/icons/Settings'
import React, { useState } from 'react'
import Instruction from '../../components/Instruction'
import PlacesToPost from '../../components/PlacesToPost'
import Post from '../../components/Post'
import Subheader from '../../components/Subheader'
import Title from '../../components/Title'
import TypedMessage from '../../components/TypedMessage'
import User from '../../components/User'
import Version from '../../components/Version'
import WallpaperInfo from '../../components/WallpaperInfo'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import useTypedMessage from '../../hooks/useTypedMessage'
import { useTypedSelector } from '../../redux'
import { wallpaperTypeDescriptions } from '../../utils/wallpaperTypes'
import styles from './styles.module.css'

interface MainProps {
  onShowSettings: () => void
}

const Main: React.FC<MainProps> = props => {
  const { onShowSettings } = props

  const copyToClipboard = useCopyToClipboard()

  const link = useTypedSelector(state => state.wallpaperInfo.link)
  const name = useTypedSelector(state => state.wallpaperInfo.name)
  const type = useTypedSelector(state => state.wallpaperInfo.type)
  const archiveNumber = useTypedSelector(state => state.documents.archiveNumber)
  const description = useTypedSelector(state => state.post.description)

  const handleFolderNameClick = async () => {
    await copyToClipboard(name)
  }

  const handleVideoNameClick = async () => {
    await copyToClipboard(name)
  }

  const handleArchiveNameClick = async () => {
    await copyToClipboard(`${archiveNumber} - ${name}`)
  }

  const handlePostTextClick = async () => {
    const text = `Рубрика #тема_дня@wp.engine:
${name} (тип темы - ${wallpaperTypeDescriptions[type].postText})
${description}`
    await copyToClipboard(text)
  }

  const handleVideoDescriptionClick = async () => {
    const text = `Мастерская Steam: ${link}
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
          <WallpaperInfo />
          <Post />
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
          <Subheader>
            <TypedMessage id="mainHowTo" />
          </Subheader>
          <Instruction />
          <Subheader>
            <TypedMessage id="mainStepsToPost" />
          </Subheader>
          <PlacesToPost />
          <Subheader>
            <TypedMessage id="mainAbout" />
          </Subheader>
          <Version />
        </div>
      </div>
    </div>
  )
}

export default Main
