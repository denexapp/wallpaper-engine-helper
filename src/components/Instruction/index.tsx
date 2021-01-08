import { Typography, Link } from '@material-ui/core'
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
        <Link href="https://www.reddit.com/r/wallpaperengine/" target="_blank">
          <Typography variant="body1">
            <TypedMessage id="instructionSubreddit" />
          </Typography>
        </Link>
      </li>
      <li>
        <Link href="https://discord.gg/zMW2rnSZ4h" target="_blank">
          <Typography variant="body1">
            <TypedMessage id="instructionDiscordChannel" />
          </Typography>
        </Link>
      </li>
      <li>
        <Link
          href="https://steamcommunity.com/app/431960/discussions/9/"
          target="_blank"
        >
          <Typography variant="body1">
            <TypedMessage id="instructionSteamDiscussionsShowcase" />
          </Typography>
        </Link>
      </li>
    </ul>
  )
}

export default Instruction
