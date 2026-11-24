import { Menu, X } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { Link, NavLink } from 'react-router'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'About', to: '/about' },
] as const

type NavigationLinksProps = {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void
}

function NavigationLinks({ onNavigate }: NavigationLinksProps) {
  return (
    <>
      {links.map(({ label, to }) => (
        <li key={to}>
          <NavLink className="nav-link" end onClick={onNavigate} to={to}>{label}</NavLink>
        </li>
      ))}
      <li>
        <Button className="w-full" end onClick={onNavigate} to="/quote">Request a Quote</Button>
      </li>
    </>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  function closeOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (!isOpen || event.key !== 'Escape') return
    setIsOpen(false)
    toggleRef.current?.focus()
  }

  function closeOnNavigate(event: MouseEvent<HTMLAnchorElement>) {
    if (!isOpen || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    setIsOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <header className="border-b border-ivory/12 bg-obsidian text-ivory" onKeyDown={closeOnEscape}>
      <Container className="grid grid-cols-[auto_1fr] items-center gap-x-3">
        <Link
          aria-label="NOIR Auto Studio"
          className="col-start-1 row-start-1 inline-flex min-h-11 flex-col justify-center"
          to="/"
          onClick={closeOnNavigate}
        >
          <span className="font-heading text-3xl leading-none font-extrabold tracking-[-0.08em]">NOIR</span>
          <span className="mt-1 text-[0.625rem] leading-none font-semibold tracking-[0.19em] uppercase">Auto Studio</span>
        </Link>

        <div className="col-start-2 row-start-1 flex min-h-20 items-center justify-self-end gap-2 sm:gap-4 lg:hidden">
          <Button end to="/quote" onClick={closeOnNavigate}>Request a Quote</Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-grid size-11 cursor-pointer place-items-center rounded-control border border-ivory/25 hover:bg-ivory/10"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls={menuId}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>

        <nav id={menuId} aria-label="Mobile" hidden={!isOpen} className="col-span-2 border-t border-ivory/12 pt-2 pb-4 lg:hidden">
          <ul className="grid gap-1">
            <NavigationLinks onNavigate={closeOnNavigate} />
          </ul>
        </nav>

        <nav aria-label="Primary" className="col-start-2 row-start-1 hidden min-h-20 items-center justify-self-end lg:flex">
          <ul className="flex items-center gap-5 xl:gap-8">
            <NavigationLinks />
          </ul>
        </nav>
      </Container>
    </header>
  )
}
