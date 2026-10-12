import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { allPaths, matchRoute, routeMeta } from './lib/routes'

/** Used at build time by scripts/prerender.mjs to ship real HTML for every page. */
export function render(path: string) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
}

export function pages() {
  return allPaths().map((path) => ({ path, ...routeMeta(matchRoute(path)) }))
}
