import { Typography } from '@material-ui/core'
import React from 'react'
import TypedMessage from '../../components/TypedMessage'
import styles from './styles.module.css'

const Instruction: React.FC = () => {
  return (
    <ul className={styles.list}>
      <li>
        <Typography variant="body1">
          <TypedMessage id="instructionSubscriptions" />
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <TypedMessage id="instructionRecentApproved" />
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <TypedMessage id="instructionMostPopularToday" />
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <TypedMessage id="instructionSubreddit" />
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <TypedMessage id="instructionDiscordChannel" />
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <TypedMessage id="instructionSteamDiscussionsShowcase" />
        </Typography>
      </li>
    </ul>
  )
}

export default Instruction
