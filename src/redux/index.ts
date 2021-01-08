import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import vkAuth from './reducers/vkAuth'

export const store = configureStore({
  reducer: {
    vkAuth: vkAuth.reducer
  }
})
type State = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector
export const useTypedDispatch = () => useDispatch<Dispatch>()
