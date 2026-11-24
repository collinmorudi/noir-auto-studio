import { expect, test } from '@playwright/test'

test('navigates the primary routes and recovers from an unknown URL', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Every detail matters.' })).toBeVisible()

  const nav = page.getByRole('navigation', { name: 'Primary' })
  for (const [link, path, heading] of [
    ['Services', '/services', 'Services'],
    ['Our Work', '/our-work', 'Our Work'],
    ['About', '/about', 'About NOIR'],
    ['Request a Quote', '/quote', 'Request a Quote'],
    ['Home', '/', 'Every detail matters.'],
  ] as const) {
    await nav.getByRole('link', { name: link }).click()
    await expect(page).toHaveURL(path)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }

  await page.goto('/missing/example')
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await page.getByRole('link', { name: 'Back to home' }).click()
  await expect(page).toHaveURL('/')
})

for (const width of [360, 768, 1440]) {
  test(`fits a ${width}px viewport and supports keyboard navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const assertFits = async () => {
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    }

    await assertFits()
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toHaveCSS('outline-style', 'solid')
    await expect(skip).toHaveCSS('outline-width', '2px')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()

    const header = page.getByRole('banner')
    if (width < 1024) {
      const toggle = header.getByRole('button', { name: 'Open menu' })
      await expect(header.getByRole('link', { name: 'Request a Quote' })).toBeVisible()
      await expect(header.getByRole('navigation', { name: 'Primary' })).toBeHidden()
      await toggle.focus()
      await page.keyboard.press('Space')
      await expect(header.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
      const nav = header.getByRole('navigation', { name: 'Mobile' })
      const quote = nav.getByRole('link', { name: 'Request a Quote' })
      const bounds = await quote.boundingBox()
      expect(bounds?.height).toBeGreaterThanOrEqual(44)
      await assertFits()
      await nav.getByRole('link', { name: 'Services' }).click()
      await expect(nav).toBeHidden()
      await expect(header.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    } else {
      await expect(header.getByRole('button', { name: 'Open menu' })).toBeHidden()
      await header.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Services' }).click()
    }
    const servicesHeading = page.getByRole('heading', { name: 'Services' })
    await expect(servicesHeading).toBeVisible()
    await expect(servicesHeading).toBeFocused()
    await assertFits()
  })
}
