import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Fraunces with weight + SOFT axes only (about half the bytes of the all-axes files).
import '@fontsource-variable/fraunces/soft.css'
import '@fontsource-variable/fraunces/soft-italic.css'
import '@fontsource-variable/instrument-sans/wght.css'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// Production builds ship prerendered HTML (scripts/prerender.mjs); dev renders from scratch.
// Inside a transition React time-slices the work, so hydration doesn't block the main thread.
startTransition(() => {
  if (container.hasChildNodes()) hydrateRoot(container, app)
  else createRoot(container).render(app)
})
