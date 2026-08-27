import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function Doors() {
  return (
    <section id="doors" className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-card/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span className="text-xs font-medium tracking-widest uppercase text-brand-muted">
                  Coming Soon
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Premium <span className="text-brand-orange">Doors</span>
              </h2>
              <p className="text-brand-muted leading-relaxed mb-8">
                INCO also offers a selection of high-quality doors designed with the same
                attention to energy efficiency, durability and style as our windows. Contact
                us to learn more about our door options.
              </p>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-hover font-medium transition-colors"
              >
                Inquire About Doors
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="bg-brand-card border border-brand-border rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <img
                src="/images/doors/2026-08-15_22.43.10.jpg"
                alt="INCO premium door"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
