
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const GRILLS_IMAGE =
  '/images/grills/Window-grills-optimized.webp';

export default function WindowGrills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadImage, setShouldLoadImage] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadImage(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '1000px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-brand-bg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-card to-brand-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative bg-brand-card border border-brand-border rounded-3xl overflow-hidden aspect-[4/3]">
              {shouldLoadImage && (
                <img
                  src={GRILLS_IMAGE}
                  alt="Decorative window grill patterns"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Window{' '}
              <span className="text-brand-orange">
                Grills
              </span>
            </h2>

            <p className="text-brand-muted leading-relaxed mb-4">
              Window grills are decorative bars placed between
              glass panes to add architectural detail.
            </p>

            <p className="text-brand-muted leading-relaxed mb-8">
              INCO offers multiple grill patterns, profiles,
              sizes and colours that can complement modern,
              traditional and classic homes.
            </p>

            <a
              href="#grill-styles"
              className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-hover font-medium transition-colors"
            >
              Learn More
              <ArrowRight size={16} />
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
