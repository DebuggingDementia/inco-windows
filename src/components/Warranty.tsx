import { Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function Warranty() {
  return (
    <section id="warranty" className="py-20 sm:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-brand-card border border-brand-border rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-6">
              <Shield size={26} className="text-brand-orange" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Warranty <span className="text-brand-orange">Information</span>
            </h2>
            <p className="text-brand-muted leading-relaxed max-w-xl mx-auto mb-8">
              INCO stands behind the quality of our products. Our windows are backed by
              comprehensive warranty coverage for your peace of mind. Contact us for
              detailed warranty information specific to your products.
            </p>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/20"
            >
              Contact Us for Details
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
