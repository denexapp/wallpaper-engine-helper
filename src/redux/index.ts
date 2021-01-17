import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import documents from './reducers/documents'
import post from './reducers/post'
import settings from './reducers/settings'
import vkAuth from './reducers/vkAuth'
import wallpaperInfo from './reducers/wallpaperInfo'

export const store = configureStore({
  reducer: {
    documents: documents.reducer,
    post: post.reducer,
    settings: settings.reducer,
    vkAuth: vkAuth.reducer,
    wallpaperInfo: wallpaperInfo.reducer
  }
})
type State = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector
export const useTypedDispatch = () => useDispatch<Dispatch>()
