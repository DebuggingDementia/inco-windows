import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const grillPatterns = [
  {
    name: 'Diamond',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="0" y1="50" x2="40" y2="2" strokeOpacity="0.15" />
        <line x1="40" y1="2" x2="80" y2="50" strokeOpacity="0.15" />
        <line x1="0" y1="50" x2="40" y2="98" strokeOpacity="0.15" />
        <line x1="40" y1="98" x2="80" y2="50" strokeOpacity="0.15" />
        <line x1="20" y1="26" x2="60" y2="26" strokeOpacity="0.1" />
        <line x1="20" y1="74" x2="60" y2="74" strokeOpacity="0.1" />
      </svg>
    ),
  },
  {
    name: 'Single Diamond',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="40" y1="10" x2="70" y2="50" strokeOpacity="0.15" />
        <line x1="70" y1="50" x2="40" y2="90" strokeOpacity="0.15" />
        <line x1="40" y1="90" x2="10" y2="50" strokeOpacity="0.15" />
        <line x1="10" y1="50" x2="40" y2="10" strokeOpacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Prairie',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="20" y1="2" x2="20" y2="25" strokeOpacity="0.15" />
        <line x1="60" y1="2" x2="60" y2="25" strokeOpacity="0.15" />
        <line x1="2" y1="25" x2="78" y2="25" strokeOpacity="0.15" />
        <line x1="20" y1="75" x2="20" y2="98" strokeOpacity="0.15" />
        <line x1="60" y1="75" x2="60" y2="98" strokeOpacity="0.15" />
        <line x1="2" y1="75" x2="78" y2="75" strokeOpacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Georgian',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="27" y1="2" x2="27" y2="98" strokeOpacity="0.15" />
        <line x1="53" y1="2" x2="53" y2="98" strokeOpacity="0.15" />
        <line x1="2" y1="34" x2="78" y2="34" strokeOpacity="0.15" />
        <line x1="2" y1="66" x2="78" y2="66" strokeOpacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Colonial',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="40" y1="2" x2="40" y2="98" strokeOpacity="0.15" />
        <line x1="2" y1="50" x2="78" y2="50" strokeOpacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Ladder',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="2" y1="25" x2="78" y2="25" strokeOpacity="0.15" />
        <line x1="2" y1="50" x2="78" y2="50" strokeOpacity="0.15" />
        <line x1="2" y1="75" x2="78" y2="75" strokeOpacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Double Prairie',
    render: (
      <svg viewBox="0 0 80 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="76" height="96" rx="4" strokeOpacity="0.2" />
        <line x1="2" y1="20" x2="78" y2="20" strokeOpacity="0.15" />
        <line x1="2" y1="80" x2="78" y2="80" strokeOpacity="0.15" />
        <line x1="15" y1="2" x2="15" y2="20" strokeOpacity="0.15" />
        <line x1="65" y1="2" x2="65" y2="20" strokeOpacity="0.15" />
        <line x1="15" y1="80" x2="15" y2="98" strokeOpacity="0.15" />
        <line x1="65" y1="80" x2="65" y2="98" strokeOpacity="0.15" />
        <line x1="40" y1="2" x2="40" y2="20" strokeOpacity="0.15" />
        <line x1="40" y1="80" x2="40" y2="98" strokeOpacity="0.15" />
      </svg>
    ),
  },
];

const grillProfiles = ['5/16"', 'Georgian', 'Pencil', '5/8"', '1"'];

export default function GrillStyles() {
  return (
    <section id="grill-styles" className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Decorative <span className="text-brand-orange">Grill Styles</span>
            </h2>
            <p className="text-brand-muted">
              Choose from a variety of grill patterns to complement your home's
              architectural style.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-5 mb-16">
          {grillPatterns.map((pattern, i) => (
            <motion.div
              key={pattern.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-brand-card border border-brand-border rounded-2xl p-4 sm:p-5 group hover:border-brand-orange/20 transition-all duration-500"
            >
              <div className="text-brand-muted/60 group-hover:text-brand-muted transition-colors w-full aspect-[4/5] mb-3">
                {pattern.render}
              </div>
              <p className="text-sm font-medium text-center text-brand-text">
                {pattern.name}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-10">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Grill Profiles & Colours
            </h3>
            <div className="rounded-2xl overflow-hidden mb-6">
              <img
                src="/images/grills/2026-08-15_22.42.14.jpg"
                alt="Grill profiles and colour options"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {grillProfiles.map((profile) => (
                <div
                  key={profile}
                  className="px-5 py-3 bg-brand-surface border border-brand-border rounded-xl text-sm text-brand-muted hover:text-brand-text hover:border-brand-orange/20 transition-all cursor-default"
                >
                  {profile}
                </div>
              ))}
            </div>
            <p className="text-sm text-brand-muted/60 text-center mt-6">
              Available in a variety of colours to match your window frame selection.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
