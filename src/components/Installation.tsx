import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const retrofit = [
  'Old window sash is replaced with a new vinyl window',
  'Existing interior/exterior trim remains',
  'Faster and more affordable installation',
  'Recommended when the existing frame is solid and properly insulated',
  'Allows glass upgrades for improved comfort and energy efficiency',
];

const fullFrame = [
  'Complete window and old frame are removed',
  'Opening is inspected and insulated',
  'Interior jambs and casing can be replaced',
  'Exterior is properly sealed and finished',
  'Provides superior insulation and long-term performance',
];

function InstallCard({
  title,
  desc,
  points,
  accent,
  delay,
}: {
  title: string;
  desc: string;
  points: string[];
  accent: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-3xl p-6 sm:p-8 border ${
        accent
          ? 'bg-brand-orange/5 border-brand-orange/15'
          : 'bg-brand-card border-brand-border'
      }`}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-brand-muted leading-relaxed mb-6">{desc}</p>
      <ul className="space-y-3">
        {points.map((pt) => (
          <li key={pt} className="flex gap-3 text-sm">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5">
              <Check size={12} className="text-brand-orange" />
            </div>
            <span className="text-brand-muted">{pt}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Installation() {
  return (
    <section id="installation" className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Window Installation:{' '}
              <span className="text-brand-orange">Retrofit vs. Full Frame</span>
            </h2>
            <p className="text-brand-muted leading-relaxed">
              Proper installation is essential to your windows' performance, energy
              efficiency, and lifespan.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          <InstallCard
            title="Retrofit Installation"
            desc="A retrofit installation upgrades the windows while keeping the existing frame and surrounding trim intact."
            points={retrofit}
            accent={false}
            delay={0}
          />
          <InstallCard
            title="Full-Frame Replacement"
            desc="Removes the entire existing window down to the home's rough opening."
            points={fullFrame}
            accent={true}
            delay={0.12}
          />
        </div>
      </div>
    </section>
  );
}
