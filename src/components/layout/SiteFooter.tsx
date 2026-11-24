import { Container } from '../ui/Container'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate/20 bg-ivory py-8 text-slate">
      <Container className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="font-heading font-extrabold text-obsidian">NOIR Auto Studio</p>
        <p className="text-sm">Fictional portfolio concept</p>
      </Container>
    </footer>
  )
}
