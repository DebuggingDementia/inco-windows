import { ArrowRight, Phone } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function FinalCta() {
  return (
    <section className="py-20 sm:py-28 bg-brand-orange relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-orange/4 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance text-brand-bg">
            Ready to Upgrade Your{' '}
            <span className="text-white">Windows</span>?
          </h2>
          <p className="text-lg text-brand-bg max-w-xl mx-auto mb-10 leading-relaxed">
            Improve your home's comfort, efficiency and appearance with windows designed
            for Canadian homes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-bg hover:bg-brand-card text-white font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+14031234567"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-bg/70 hover:bg-brand-bg/10 text-brand-bg font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={16} />
              Call Us
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
