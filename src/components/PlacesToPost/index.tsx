import { Typography, Link } from '@material-ui/core'
import React from 'react'
import TypedMessage from '../TypedMessage'
import styles from './styles.module.css'

const PlacesToPost: React.FC = () => {
  return (
    <ul className={styles.list}>
      <li>
        <Link href="https://vk.com/docs-140359831" target="_blank">
          <Typography variant="body1">
            <TypedMessage id="stepsToPostArchive" />
          </Typography>
        </Link>
      </li>
      <li>
        <Link href="https://vk.com/videos-140359831" target="_blank">
          <Typography variant="body1">
            <TypedMessage id="stepsToPostVideo" />
          </Typography>
        </Link>
      </li>
      <li>
        <Link href="https://vk.com/club140359831" target="_blank">
          <Typography variant="body1">
            <TypedMessage id="stepsToPostPost" />
          </Typography>
        </Link>
      </li>
    </ul>
  )
}

export default PlacesToPost
