import type { ReactNode } from 'react'

type SectionHeadingProps = {
  as?: 'h1' | 'h2'
  children: ReactNode
  className?: string
}

export function SectionHeading({ as: Heading = 'h2', children, className = '' }: SectionHeadingProps) {
  return (
    <Heading
      className={`text-balance font-heading text-display font-extrabold tracking-tight ${className}`}
      tabIndex={Heading === 'h1' ? -1 : undefined}
    >
      {children}
    </Heading>
  )
}
