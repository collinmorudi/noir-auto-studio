import type { ReactNode } from 'react'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

type PageHeroProps = {
  title: string
  description: string
  label?: string
  variant?: 'light' | 'dark'
  children?: ReactNode
}

export function PageHero({ title, description, label, variant = 'light', children }: PageHeroProps) {
  const isDark = variant === 'dark'

  return (
    <section className={isDark ? 'home-hero flex flex-1 items-center bg-obsidian py-hero text-ivory' : 'flex-1 bg-ivory py-section text-obsidian'}>
      <Container className="relative">
        {label && <p className={`mb-5 text-sm font-semibold tracking-[0.16em] uppercase ${isDark ? 'text-champagne' : 'text-slate'}`}>{label}</p>}
        <SectionHeading as="h1" className={isDark ? 'max-w-[10ch]' : 'max-w-[18ch]'}>{title}</SectionHeading>
        <p className={`mt-6 max-w-prose text-lg leading-relaxed ${isDark ? 'text-ivory/85' : 'text-slate'}`}>{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  )
}
