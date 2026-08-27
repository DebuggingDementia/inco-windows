import { Check } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const benefits = [
  {
    title: 'Energy Efficient',
    desc: 'Quality vinyl frames provide excellent insulation, helping reduce heat loss and energy consumption.',
  },
  {
    title: 'Built for Canadian Weather',
    desc: 'Designed to withstand extreme temperature changes without rotting, rusting, warping or corroding.',
  },
  {
    title: 'Quiet and Comfortable',
    desc: 'High-performance glass and vinyl frames help reduce outdoor noise.',
  },
  {
    title: 'Low Maintenance',
    desc: 'Vinyl does not require painting, staining or refinishing.',
  },
  {
    title: 'Eco-Conscious Choice',
    desc: 'Long-lasting components help reduce waste, and many components can be recycled.',
  },
];

export default function VinylBenefits() {
  return (
    <section className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection>
            <div className="bg-brand-card border border-brand-border rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3] flex items-center justify-center">
              <img
                src="/images/technical/2026-08-15_22.41.54.jpg"
                alt="Vinyl window construction and insulation detail"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Benefits of <span className="text-brand-orange">Vinyl Windows</span>
            </h2>
            <div className="space-y-6">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text mb-1">{b.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
