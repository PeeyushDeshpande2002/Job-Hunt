import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SnackbarProvider>
    </Provider>
  </StrictMode>,
)
