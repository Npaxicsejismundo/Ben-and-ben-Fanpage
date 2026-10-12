// Build-time prerender: renders every page (home + one per member) to HTML, so
// the first paint doesn't wait for JavaScript. The client then hydrates it.
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir .ssr`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, '.ssr')

const { render, pages } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found')

// Every page is fully rendered HTML, so the app bundle is an enhancement:
// request it once the browser reports the first contentful paint, so it never
// competes with first paint on slow connections. A timer covers browsers
// without paint timing and hidden tabs.
const entry = template.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)
if (!entry) throw new Error('prerender: entry <script> not found')
const loader = `<script>
      ;(function () {
        var done = false
        function go() {
          if (done) return
          done = true
          var s = document.createElement('script')
          s.type = 'module'
          s.crossOrigin = ''
          s.src = ${JSON.stringify(entry[1])}
          document.head.appendChild(s)
        }
        try {
          new PerformanceObserver(function (list) {
            if (list.getEntriesByName('first-contentful-paint').length) go()
          }).observe({ type: 'paint', buffered: true })
        } catch (e) {}
        setTimeout(go, 1500)
      })()
    </script>`

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

for (const page of pages()) {
  const appHtml = render(page.path)
  let html = template
    .replace(entry[0], '')
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('</body>', `${loader}\n  </body>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(page.title)}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`)

  // "/" -> dist/index.html; "/members/paolo" -> dist/members/paolo.html and
  // dist/members/paolo/index.html, so the clean URL works on any static host
  // (and in `vite preview`) with or without a trailing slash.
  if (page.path === '/') {
    await writeFile(resolve(dist, 'index.html'), html)
  } else {
    const outDir = resolve(dist, page.path.slice(1))
    await mkdir(outDir, { recursive: true })
    await writeFile(resolve(outDir, 'index.html'), html)
    await writeFile(`${outDir}.html`, html)
  }
  console.log(`prerender: ${page.path} (${(appHtml.length / 1024).toFixed(1)} kB)`)
}

await rm(ssrDir, { recursive: true, force: true })
