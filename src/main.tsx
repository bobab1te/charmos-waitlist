import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WaitlistPage } from '#/components/WaitlistPage'
import './styles.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <WaitlistPage />
  </StrictMode>,
)
