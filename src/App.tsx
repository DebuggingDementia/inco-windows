import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WindowStyles from '@/components/WindowStyles';
import Doors from '@/components/Doors';
import QuoteForm from '@/components/QuoteForm';
import ColorCollection from '@/components/ColorCollection';
import EnergyEfficiency from '@/components/EnergyEfficiency';
import VinylBenefits from '@/components/VinylBenefits';
import WindowGrills from '@/components/WindowGrills';
import GrillStyles from '@/components/GrillStyles';
import InteriorCasing from '@/components/InteriorCasing';
import Installation from '@/components/Installation';
import WhyInco from '@/components/WhyInco';
import Warranty from '@/components/Warranty';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import AllWindowsPage from '@/components/AllWindowsPage';
import GlassEnergyPage from '@/components/GlassEnergyPage';
import WindowProductPage from '@/components/WindowProductPage';
import { windowProducts } from '@/data/windowProducts';
import AllDoorsPage from '@/components/AllDoorsPage';
import DoorProductPage from '@/components/DoorProductPage';
import { doorProducts } from '@/data/doorProducts';

export default function App() {
  const isWarrantyPage = window.location.pathname === '/warranty';
  const path = window.location.pathname;
  const product = path.startsWith('/windows/') ? windowProducts.find(p => `/windows/${p.slug}` === path) : undefined;
  const doorProduct = path.startsWith('/doors/') ? doorProducts.find(p => `/doors/${p.slug}` === path) : undefined;
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar />
      {isWarrantyPage ? <Warranty /> : path === '/windows' ? <AllWindowsPage /> : path === '/windows/glass-energy' ? <GlassEnergyPage /> : product ? <WindowProductPage product={product} /> : path === '/doors' ? <AllDoorsPage /> : doorProduct ? <DoorProductPage product={doorProduct} /> : <><Hero />
      <WindowStyles />
      <Doors />
      <QuoteForm />
      <ColorCollection />
      <EnergyEfficiency />
      <VinylBenefits />
      <WindowGrills />
      <GrillStyles />
      <InteriorCasing />
      <Installation />
      <WhyInco />
      <FinalCta />
      </>}
      <Footer />
    </div>
  );
}
