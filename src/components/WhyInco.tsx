import { MapPin, Snowflake, Zap, Wrench, Palette, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const reasons = [
  { icon: MapPin, title: 'Canadian-Made Windows', desc: 'Proudly designed and manufactured in Canada.' },
  { icon: Snowflake, title: 'Built for Alberta Weather', desc: 'Engineered to perform in extreme Canadian climates.' },
  { icon: Zap, title: 'Energy-Efficient Solutions', desc: 'Helping reduce energy consumption and utility costs.' },
  { icon: Wrench, title: 'Professional Installation', desc: 'Expert installation by trained professionals.' },
  { icon: Palette, title: 'Custom Styles & Colours', desc: 'A wide range of options to match your home.' },
  { icon: Heart, title: 'Family-Focused Service', desc: 'Dedicated to helping families improve their homes.' },
];

export default function WhyInco() {
  return (
    <section className="py-20 sm:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="text-brand-orange">INCO</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 sm:p-6 bg-brand-card border border-brand-border rounded-2xl group hover:border-brand-orange/15 transition-all duration-500"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/15 transition-colors">
                  <Icon size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text mb-1">{r.title}</h3>
                  <p className="text-sm text-brand-muted">{r.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
