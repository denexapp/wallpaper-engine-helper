import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import useLocaleMessages from './hooks/useLocaleMessages';
import { defaultLocale } from '../common/localization';
import Pages from './pages';
import { store, useTypedSelector } from './redux';

const ConnectedApp: React.FC = () => {
  const locale = useTypedSelector(
    (state) => state.settings.settings?.locale ?? defaultLocale
  );
  const messages = useLocaleMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SnackbarProvider>
        <Pages />
      </SnackbarProvider>
    </IntlProvider>
  );
};

const AppComponent: React.FC = () => (
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={ConnectedApp} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>
);

export default AppComponent;
