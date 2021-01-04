import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import vk from './reducers/vk'

export const store = configureStore({
  reducer: {
    vk: vk.reducer
  }
})
type State = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector
export const useTypedDispatch = () => useDispatch<Dispatch>()
