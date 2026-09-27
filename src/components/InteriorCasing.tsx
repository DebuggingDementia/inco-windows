import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface CasingOption {
  name: string;
  image: string;
}

const vinylOptions: CasingOption[] = [
  {
    name: 'Casing Profile',
    image: '/images/window-styles/2026-08-15_22.41.17.jpg',
  },
  {
    name: 'Colonial Rosettes',
    image: '/images/interior-casing/2026-08-15_22.42.20.jpg',
  },
  {
    name: 'Colonial 45-degree',
    image: '/images/interior-casing/2026-08-15_22.42.41.jpg',
  },
];

const mdfOptions: CasingOption[] = [
  {
    name: 'Casing Profile',
    image: '/images/window-styles/2026-08-15_22.41.44.jpg',
  },
  {
    name: 'Colonial 45-degree',
    image: '/images/interior-casing/2026-08-15_22.43.15.jpg',
  },
  {
    name: 'Flat',
    image: '/images/interior-casing/2026-08-15_22.43.04.jpg',
  },
];

function CasingCard({ option, index }: { option: CasingOption; index: number }) {
  const featured = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`${featured ? 'col-span-2' : ''} min-w-0 bg-brand-card border border-brand-border rounded-2xl p-5 group hover:border-brand-orange/15 transition-all duration-500`}
    >
      <div className={`${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'} mb-4 rounded-xl overflow-hidden bg-white/5`}>
        <img
          src={option.image}
          alt={option.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <p className="text-sm font-medium text-center text-brand-text">{option.name}</p>
    </motion.div>
  );
}

function MaterialGroup({ name, options }: { name: string; options: CasingOption[] }) {
  return (
    <div className="min-w-0">
      <AnimatedSection>
        <h3 className="text-lg font-semibold mb-5 flex items-center gap-3">
          <span className="w-8 h-px bg-brand-orange" />
          {name}
        </h3>
      </AnimatedSection>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <CasingCard key={option.image} option={option} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function InteriorCasing() {
  return (
    <section className="py-20 sm:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Interior <span className="text-brand-orange">Casing</span>
            </h2>
            <p className="text-brand-muted">
              Choose from vinyl and MDF casing options to complete your window's interior
              finish.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <MaterialGroup name="Vinyl" options={vinylOptions} />
          <MaterialGroup name="MDF" options={mdfOptions} />
        </div>
      </div>
    </section>
  );
}
