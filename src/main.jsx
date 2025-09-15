import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/components/header.css'
import './styles/components/footer.css'
import './styles/components/hero.css'
import './styles/components/sections.css'
import './styles/components/forms.css'
import './styles/components/projectrequest.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
