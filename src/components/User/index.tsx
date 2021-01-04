import { Button } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import React from 'react'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import { authenticate } from '../../redux/reducers/vk'

const User: React.FC = () => {
  const vk = useTypedSelector(state => state.vk)
  const dispatch = useTypedDispatch()

  let content: React.ReactNode = null

  if (vk.state === 'unauthenticated') {
    content = (
      <Button
        onClick={() => dispatch(authenticate())}
        variant="contained"
        endIcon={<LaunchIcon />}
      >
        Sign in
      </Button>
    )
  } else if (vk.state === 'loading') {
    content = (
      <Button
        disabled
        variant="contained"
        endIcon={<LaunchIcon />}
      >
        Signing in...
      </Button>
    )
  } else if (vk.state === 'authenticated') {
    content = vk.userId.toString(10)
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default User
