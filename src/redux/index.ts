import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import settings from './reducers/settings'
import vkAuth from './reducers/vkAuth'
import vkDocuments from './reducers/vkDocuments'

export const store = configureStore({
  reducer: {
    settings: settings.reducer,
    vkAuth: vkAuth.reducer,
    vkDocuments: vkDocuments.reducer
  }
})
type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector
export const useTypedDispatch = () => useDispatch<Dispatch>()
