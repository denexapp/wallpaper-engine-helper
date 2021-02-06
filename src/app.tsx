import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { hot } from 'react-hot-loader'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import useLocaleMessages from './hooks/useLocaleMessages'
import { defaultLocale } from './localization'
import Pages from './pages'
import { store, useTypedSelector } from './redux'

const ConnectedApp: React.FC = () => {
  const locale = useTypedSelector(state => state.settings.settings?.locale ?? defaultLocale)
  const messages = useLocaleMessages(locale)

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SnackbarProvider>
        <Pages />
      </SnackbarProvider>
    </IntlProvider>
  )
}

const AppComponent: React.FC = () => (
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </React.StrictMode>
)

const App = hot(module)(AppComponent)

export default App
