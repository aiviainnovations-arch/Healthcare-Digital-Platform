import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Marks that JS is running, so [data-reveal] elements only start hidden
// when GSAP is actually there to reveal them.
document.documentElement.classList.add('js-motion')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
