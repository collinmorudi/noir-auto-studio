import { Route, Routes } from 'react-router'
import { SiteLayout } from '../components/layout/SiteLayout'
import { AboutPage } from '../pages/AboutPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OurWorkPage } from '../pages/OurWorkPage'
import { QuotePage } from '../pages/QuotePage'
import { ServicesPage } from '../pages/ServicesPage'

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="our-work" element={<OurWorkPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="quote" element={<QuotePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
