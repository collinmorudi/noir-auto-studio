import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from './SiteHeader'

function renderHeader(path = '/') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
    </MemoryRouter>,
  )
  return userEvent.setup()
}

describe('SiteHeader', () => {
  it('renders the brand and the primary links with their destinations', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'NOIR Auto Studio' })).toHaveAttribute('href', '/')
    const nav = within(screen.getByRole('navigation', { name: 'Primary' }))
    for (const [name, path] of [
      ['Home', '/'],
      ['Services', '/services'],
      ['Our Work', '/our-work'],
      ['About', '/about'],
      ['Request a Quote', '/quote'],
    ] as const) {
      expect(nav.getByRole('link', { name })).toHaveAttribute('href', path)
    }
  })

  it('identifies the active page', () => {
    renderHeader('/our-work')
    const nav = within(screen.getByRole('navigation', { name: 'Primary' }))
    expect(nav.getByRole('link', { name: 'Our Work' })).toHaveAttribute('aria-current', 'page')
    expect(nav.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('toggles the mobile navigation with the keyboard and restores focus on Escape', async () => {
    const user = renderHeader()
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()

    await user.tab()
    await user.tab()
    await user.tab()
    expect(toggle).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')

    await user.tab()
    expect(within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'Home' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('closes the mobile menu after selecting a link and updates the current page', async () => {
    const user = renderHeader()
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const mobile = within(screen.getByRole('navigation', { name: 'Mobile' }))
    await user.click(mobile.getByRole('link', { name: 'Services' }))

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()
    const primary = within(screen.getByRole('navigation', { name: 'Primary' }))
    expect(primary.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page')
  })
})
