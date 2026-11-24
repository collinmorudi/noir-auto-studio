import { Button } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'

export function NotFoundPage() {
  return (
    <PageHero label="404" title="Page not found" description="The page you’re looking for could not be found.">
      <Button variant="dark" to="/">Back to home</Button>
    </PageHero>
  )
}
