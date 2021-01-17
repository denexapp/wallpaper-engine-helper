import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import React, { useEffect } from 'react'
import usePushToast from '../../hooks/usePushToast'
import useTypedMessage from '../../hooks/useTypedMessage'
import { useTypedDispatch, useTypedSelector } from '../../redux'
import {
  nextArchiveNumber,
  setArchiveNumber
} from '../../redux/reducers/documents'

const Documents: React.FC = () => {
  const dispatch = useTypedDispatch()
  const pushToast = usePushToast()
  const archiveNumber = useTypedSelector(state => state.documents.archiveNumber)
  const authState = useTypedSelector(state => state.vkAuth.state)
  const archiveNumberLabel = useTypedMessage({
    id: 'documentsArchiveNumberLabel'
  })
  const hint = useTypedMessage({ id: 'documentsHint' })
  const signedIn = authState === 'authenticated' || authState === 'signingOut'
  const helperText = !signedIn && archiveNumber !== 0 ? hint : null

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const result = Number.parseInt(event.currentTarget.value, 10)
    if (Number.isNaN(result)) {
      dispatch(setArchiveNumber(0))
    } else {
      dispatch(setArchiveNumber(result))
    }
  }

  const makeRequest = () => {
    const promise = dispatch(nextArchiveNumber())
    promise.then(result => {
      if (nextArchiveNumber.rejected.match(result) && !result.meta.aborted) {
        pushToast('documentsRequestError', 'error')
      }
      if (nextArchiveNumber.fulfilled.match(result)) {
        pushToast('documentsRequestSuccess', 'success')
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
      value={archiveNumber}
      onChange={onChange}
      label={archiveNumberLabel}
      variant="outlined"
      type="number"
      helperText={helperText}
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
