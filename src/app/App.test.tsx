import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from './App'

function renderRoute(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it.each([
    ['/', 'Every detail matters.'],
    ['/services', 'Services'],
    ['/our-work', 'Our Work'],
    ['/about', 'About NOIR'],
    ['/quote', 'Request a Quote'],
    ['/unrecognised', 'Page not found'],
  ])('renders the shared layout and page heading for %s', (path, heading) => {
    renderRoute(path)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(within(screen.getByRole('main')).getByRole('heading', { level: 1, name: heading })).toBeVisible()
  })

  it('opens the quote page from the homepage hero', async () => {
    renderRoute('/')
    const user = userEvent.setup()
    const main = within(screen.getByRole('main'))

    await user.click(main.getByRole('link', { name: 'Request a Quote' }))
    const heading = main.getByRole('heading', { name: 'Request a Quote' })
    expect(heading).toBeVisible()
    expect(heading).toHaveFocus()
  })

  it('returns home from a missing page', async () => {
    renderRoute('/unrecognised')
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: 'Back to home' }))
    expect(screen.getByRole('heading', { name: 'Every detail matters.' })).toBeVisible()
  })
})
