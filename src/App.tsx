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
import Trust from '@/components/Trust';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar />
      <Hero />
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
      <Warranty />
      <Trust />
      <FinalCta />
      <Footer />
    </div>
  );
}
