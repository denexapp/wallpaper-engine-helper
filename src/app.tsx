import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { hot } from 'react-hot-loader'
import Main from './pages/Main'

const AppComponent: React.FC = () => (
  <React.StrictMode>
    <CssBaseline />
    <Main />
  </React.StrictMode>
);

const App = hot(module)(AppComponent)

export default App;