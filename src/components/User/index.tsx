import { Button } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { useSnackbar } from 'notistack'
import React from 'react'
import useTypedMessage from '../../hooks/useTypedMessage'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import { authenticate, signOut } from '../../redux/reducers/vkAuth'
import TypedMessage from '../TypedMessage'
import styles from './styles.module.css'

const User: React.FC = () => {
  const vkAuth = useTypedSelector(state => state.vkAuth)
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const signInSuccessMessage = useTypedMessage({ id: 'userSignedIn' })
  const signOutSuccessMessage = useTypedMessage({ id: 'userSignedOut' })
  const signInErrorMessage = useTypedMessage({ id: 'userAuthenticationError' })
  const signOutErrorMessage = useTypedMessage({ id: 'userSigningOutError' })

  const handleSignInButtonClick = async () => {
    const result = await dispatch(authenticate())
    if (authenticate.fulfilled.match(result) && result.payload.accessToken !== null) {
      enqueueSnackbar(signInSuccessMessage, {
        autoHideDuration: 3000,
        variant: 'success'
      })
    } else if (
      result.meta.requestStatus === 'rejected' &&
      !result.meta.aborted
    ) {
      enqueueSnackbar(signInErrorMessage, {
        autoHideDuration: 3000,
        variant: 'error'
      })
    }
  }

  const handleSignOutButtonClick = async () => {
    const result = await dispatch(signOut())
    if (result.meta.requestStatus === 'fulfilled') {
      enqueueSnackbar(signOutSuccessMessage, {
        autoHideDuration: 3000,
        variant: 'success'
      })
    } else if (
      result.meta.requestStatus === 'rejected' &&
      !result.meta.aborted
    ) {
      enqueueSnackbar(signOutErrorMessage, {
        autoHideDuration: 3000,
        variant: 'error'
      })
    }
  }

  let content: React.ReactNode = null

  if (vkAuth.state === 'unauthenticated') {
    content = (
      <Button
        onClick={handleSignInButtonClick}
        variant="contained"
        endIcon={<LaunchIcon />}
      >
        <TypedMessage id="userSignIn" />
      </Button>
    )
  } else if (vkAuth.state === 'signingIn') {
    content = (
      <Button disabled variant="contained" endIcon={<LaunchIcon />}>
        <TypedMessage id="userSigningIn" />
      </Button>
    )
  } else if (vkAuth.state === 'authenticated') {
    content = (
      <Button
        onClick={handleSignOutButtonClick}
        variant="contained"
        endIcon={<ExitToApp />}
      >
        <TypedMessage id="userSignOut" />
      </Button>
    )
  } else if (vkAuth.state === 'signingOut') {
    content = (
      <Button disabled variant="contained" endIcon={<ExitToApp />}>
        <TypedMessage id="userSigningOut" />
      </Button>
    )
  }

  return <div className={styles.user}>{content}</div>
}

export default User
