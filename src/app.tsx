import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { hot } from 'react-hot-loader'
import { IntlProvider } from 'react-intl'
import { prepareMessages } from './localization'
import ruRuMessages from './localization/messages/ru-RU'
import Main from './pages/Main'

const AppComponent: React.FC = () => (
  <React.StrictMode>
    <CssBaseline />
    <IntlProvider locale="ru-RU" messages={prepareMessages(ruRuMessages)}>
      <SnackbarProvider>
        <Main />
      </SnackbarProvider>
    </IntlProvider>
  </React.StrictMode>
)

const App = hot(module)(AppComponent)

export default App
