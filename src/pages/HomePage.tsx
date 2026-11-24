import { Button } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'

export function HomePage() {
  return (
    <PageHero
      variant="dark"
      label="NOIR Auto Studio"
      title="Every detail matters."
      description="Premium automotive detailing in Gauteng, South Africa."
    >
      <Button to="/quote">Request a Quote</Button>
    </PageHero>
  )
}
