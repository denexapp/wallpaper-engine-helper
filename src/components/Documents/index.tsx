import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import useTypedMessage from '../../hooks/useTypedMessage'
import { Dispatch, useTypedDispatch, useTypedSelector } from '../../redux'
import { nextArchiveNumber } from '../../redux/reducers/vkDocuments'

interface DocumentsProps {
  value: number
  onChange: (value: number) => void
}

const Documents: React.FC<DocumentsProps> = props => {
  const { value, onChange } = props

  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const authState = useTypedSelector(state => state.vkAuth.state)
  const archiveNumberLabel = useTypedMessage({
    id: 'documentsArchiveNumberLabel'
  })
  const requestErrorMessage = useTypedMessage({ id: 'documentsRequestError' })
  const requestSuccessMessage = useTypedMessage({
    id: 'documentsRequestSuccess'
  })

  const signedIn = authState === 'authenticated' || authState === 'signingOut'

  const makeRequest = () => {
    const promise = dispatch(nextArchiveNumber())
    promise.then(result => {
      if (nextArchiveNumber.rejected.match(result) && !result.meta.aborted) {
        enqueueSnackbar(requestErrorMessage, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
      if (nextArchiveNumber.fulfilled.match(result)) {
        onChange(result.payload.nextArchiveNumber)
        enqueueSnackbar(requestSuccessMessage, {
          autoHideDuration: 1000,
          variant: 'success'
        })
      }
    })
    return promise.abort
  }

  useEffect(() => {
    if (!signedIn) return
    const abort = makeRequest()
    return () => {
      abort()
    }
  }, [signedIn])

  return (
    <TextField
      value={value}
      onChange={event =>
        onChange(Number.parseInt(event.currentTarget.value, 10))
      }
      label={archiveNumberLabel}
      variant="outlined"
      type="number"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!signedIn}
              onClick={signedIn ? makeRequest : undefined}
              edge="end"
            >
              <Refresh />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default Documents
