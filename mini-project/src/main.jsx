import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Doctors from './components/DoctorsPage.jsx'
import { appStore } from '../src/redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Doctors />
    </Provider>
  </StrictMode>,
)
