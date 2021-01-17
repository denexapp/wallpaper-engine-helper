import { Button } from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp'
import LaunchIcon from '@material-ui/icons/Launch'
import React from 'react'
import usePushToast from '../../hooks/usePushToast'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import { authenticate, signOut } from '../../redux/reducers/vkAuth'
import TypedMessage from '../TypedMessage'

const User: React.FC = () => {
  const vkAuth = useTypedSelector(state => state.vkAuth)
  const dispatch = useTypedDispatch()
  const pushToast = usePushToast()

  const handleSignInButtonClick = async () => {
    const result = await dispatch(authenticate())
    if (authenticate.fulfilled.match(result) && result.payload.completed) {
      pushToast('userSignedIn', 'success')
    } else if (
      result.meta.requestStatus === 'rejected' &&
      !result.meta.aborted
    ) {
      pushToast('userAuthenticationError', 'error')
    }
  }

  const handleSignOutButtonClick = async () => {
    const result = await dispatch(signOut())
    if (result.meta.requestStatus === 'fulfilled') {
      pushToast('userSignedOut', 'success')
    } else if (
      result.meta.requestStatus === 'rejected' &&
      !result.meta.aborted
    ) {
      pushToast('userSigningOutError', 'error')
    }
  }

  let content: React.ReactNode = null

  if (vkAuth.state === 'unauthenticated') {
    content = (
      <Button
        onClick={handleSignInButtonClick}
        variant="text"
        endIcon={<LaunchIcon />}
      >
        <TypedMessage id="userSignIn" />
      </Button>
    )
  } else if (vkAuth.state === 'signingIn') {
    content = (
      <Button disabled variant="text" endIcon={<LaunchIcon />}>
        <TypedMessage id="userSigningIn" />
      </Button>
    )
  } else if (vkAuth.state === 'authenticated') {
    content = (
      <Button
        onClick={handleSignOutButtonClick}
        variant="text"
        endIcon={<ExitToApp />}
      >
        <TypedMessage id="userSignOut" />
      </Button>
    )
  } else if (vkAuth.state === 'signingOut') {
    content = (
      <Button disabled variant="text" endIcon={<ExitToApp />}>
        <TypedMessage id="userSigningOut" />
      </Button>
    )
  }

  return <div>{content}</div>
}

export default User
