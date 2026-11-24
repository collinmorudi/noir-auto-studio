import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname

    const main = mainRef.current
    const focusTarget = main?.querySelector('h1') ?? main
    focusTarget?.focus()
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:rounded-control focus:bg-ivory focus:px-4 focus:py-3 focus:text-obsidian"
      >
        Skip to content
      </a>
      <SiteHeader key={pathname} />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
