import { Sun, Thermometer, Zap, Award, TrendingDown, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const benefits = [
  {
    icon: Sun,
    title: 'UV Protection',
    desc: 'Helps minimize fading of furniture, flooring and interior finishes.',
  },
  {
    icon: Thermometer,
    title: 'Improved Insulation',
    desc: 'Designed for year-round comfort.',
  },
  {
    icon: Zap,
    title: 'Energy Savings',
    desc: 'Helps reduce the load on the home\'s HVAC system.',
  },
  {
    icon: Award,
    title: 'Energy Star Compliance',
    desc: 'Designed to meet applicable Canadian window energy standards.',
  },
  {
    icon: TrendingDown,
    title: 'Lower Heating & Cooling Costs',
    desc: 'Helps reduce heat loss in winter and heat gain in summer.',
  },
  {
    icon: Leaf,
    title: 'Reduced Carbon Footprint',
    desc: 'Helps lower household energy consumption.',
  },
];

export default function EnergyEfficiency() {
  return (
    <section className="py-20 sm:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Energy <span className="text-brand-orange">Efficiency</span>
            </h2>
            <p className="text-brand-muted">
              Our windows are engineered to deliver superior performance and help reduce
              your home's energy consumption.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 group hover:border-brand-orange/15 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-5 group-hover:bg-brand-orange/15 transition-colors">
                  <Icon size={22} className="text-brand-orange" />
                </div>
                <h3 className="font-semibold text-lg text-brand-text mb-2">{b.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
