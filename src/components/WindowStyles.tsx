import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const windowTypes = [
  {
    name: 'Awning Windows',
    desc: 'Hinged at the top and opening outward from the bottom, allowing fresh air while helping keep rain outside.',
    image: '/images/window-styles/2026-08-15_22.41.01.jpg',
  },
  {
    name: 'Fixed / Picture Windows',
    desc: 'Non-opening windows with large unobstructed glass areas for natural light and outdoor views.',
    image: '/images/window-styles/2026-08-15_22.41.11.jpg',
  },
  {
    name: 'Slider Windows',
    desc: 'Smooth side-to-side operation, ideal for wide openings and modern homes.',
    image: '/images/window-styles/2026-08-15_22.41.17.jpg',
  },
  {
    name: 'Hung Windows',
    desc: 'Classic vertical operation with easy maintenance and timeless styling.',
    image: '/images/window-styles/2026-08-15_22.41.24.jpg',
  },
  {
    name: 'Shaped Windows',
    desc: 'Custom windows available in arches, circles, triangles and other geometric configurations.',
    image: '/images/window-styles/2026-08-15_22.41.30.jpg',
  },
  {
    name: 'Bay & Bow Windows',
    desc: 'Windows extending outward from the home to create additional interior space and panoramic views.',
    image: '/images/window-styles/2026-08-15_22.41.37.jpg',
  },
  {
    name: 'Turn & Tilt Windows',
    desc: 'Two opening options: tilt inward from the top or swing inward from the side.',
    image: '/images/window-styles/2026-08-15_22.41.44.jpg',
  },
  {
    name: 'Casement Windows',
    desc: 'Side-hinged windows opening outward using a crank.',
    image: '/images/window-styles/2026-08-15_22.41.49.jpg',
  },
];

export default function WindowStyles() {
  return (
    <section id="windows" className="py-20 sm:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Window Styles & <span className="text-brand-orange">Types</span>
            </h2>
            <p className="text-brand-muted leading-relaxed">
              At INCO, we believe every family deserves a home filled with warmth, comfort,
              and natural light. That's why we offer a wide selection of custom-made window
              styles designed to complement your home and the way your family lives.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {windowTypes.map((type, i) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-brand-card border border-brand-border rounded-3xl p-5 hover:border-brand-orange/20 transition-all duration-500"
            >
              <div className="flex items-center justify-center mb-4 rounded-2xl overflow-hidden bg-white/5">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full aspect-[4/3] object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-brand-text mb-1.5">{type.name}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{type.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
