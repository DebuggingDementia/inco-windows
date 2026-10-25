import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WindowStyles from '@/components/WindowStyles';
import Doors from '@/components/Doors';
import QuoteForm from '@/components/QuoteForm';
import ColorCollection from '@/components/ColorCollection';
import VinylBenefits from '@/components/VinylBenefits';
import WindowGrilleOptions from '@/components/WindowGrilleOptions';
import WindowGrills from '@/components/WindowGrills';
import InteriorCasing from '@/components/InteriorCasing';
import Installation from '@/components/Installation';
import WhyInco from '@/components/WhyInco';
import Warranty from '@/components/Warranty';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

import AllWindowsPage from '@/components/AllWindowsPage';
import GlassEnergyPage from '@/components/GlassEnergyPage';
import AllDoorsPage from '@/components/AllDoorsPage';

import CatalogProductRoute from '@/components/CatalogProductRoute';


export default function App() {
  const path = window.location.pathname;

  const isWarrantyPage = path === '/warranty';

  const windowSlug =
    path.startsWith('/windows/') &&
    path !== '/windows/glass-energy'
      ? path.split('/')[2]
      : null;

  const doorSlug =
    path.startsWith('/doors/')
      ? path.split('/')[2]
      : null;


  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar />

      {isWarrantyPage ? (
        <Warranty />
      ) : path === '/windows' ? (
        <AllWindowsPage />
      ) : path === '/windows/glass-energy' ? (
        <GlassEnergyPage />
      ) : windowSlug ? (
        <CatalogProductRoute
          kind="window"
          slug={windowSlug}
        />
      ) : path === '/doors' ? (
        <AllDoorsPage />
      ) : doorSlug ? (
        <CatalogProductRoute
          kind="door"
          slug={doorSlug}
        />
      ) : (
        <>
          <Hero />

          <WindowStyles />

          <Doors />

          <QuoteForm />

          <ColorCollection />

          <VinylBenefits />

          <WindowGrills />

          <WindowGrilleOptions />

          <InteriorCasing />

          <Installation />

          <WhyInco />

          <FinalCta />
        </>
      )}

      <Footer />
    </div>
  );
}