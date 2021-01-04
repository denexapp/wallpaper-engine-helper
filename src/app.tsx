import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { hot } from 'react-hot-loader'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { prepareMessages } from './localization'
import ruRuMessages from './localization/messages/ru-RU'
import Main from './pages/Main'
import { store } from './redux'

const AppComponent: React.FC = () => (
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <IntlProvider locale="ru-RU" messages={prepareMessages(ruRuMessages)}>
        <SnackbarProvider>
          <Main />
        </SnackbarProvider>
      </IntlProvider>
    </Provider>
  </React.StrictMode>
)

const App = hot(module)(AppComponent)

export default App
