import type { ComponentPropsWithoutRef } from 'react'
import { NavLink } from 'react-router'
import type { NavLinkProps } from 'react-router'

type ButtonStyle = {
  className?: string
  variant?: 'primary' | 'dark'
}

type ButtonProps = ButtonStyle & (
  | (ComponentPropsWithoutRef<'button'> & { to?: never })
  | (Pick<NavLinkProps, 'to' | 'children' | 'onClick' | 'end'> & { to: NavLinkProps['to'] })
)

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles = `studio-button studio-button--${variant} ${className}`

  if (props.to !== undefined) {
    return <NavLink className={styles} {...props} />
  }

  return <button type="button" className={styles} {...props} />
}
