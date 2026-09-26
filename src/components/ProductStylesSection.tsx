import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

type Style = { name: string; href: string; desc: string; image?: string };

export default function ProductStylesSection({ id, label, description, styles }: { id: string; label: string; description: string; styles: Style[] }) {
  return <section id={id} className="py-20 sm:py-28 bg-brand-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{label} Styles & <span className="text-brand-orange">Types</span></h2>
          <p className="text-brand-muted leading-relaxed">{description}</p>
        </div>
      </AnimatedSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {styles.map((type, i) => <motion.a
          key={type.name}
          href={type.href}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="group bg-brand-card border border-brand-border rounded-3xl p-5 hover:border-brand-orange/20 transition-all duration-500"
        >
          <div className="flex items-center justify-center mb-4 rounded-2xl overflow-hidden bg-white/5">
            {type.image ? <img src={type.image} alt={type.name} className="w-full aspect-[4/3] object-contain" loading="lazy" /> : <div className="w-full aspect-[4/3] flex flex-col items-center justify-center text-brand-muted"><ImageIcon className="mb-2"/><span className="text-sm">Image to be added</span></div>}
          </div>
          <h3 className="font-semibold text-brand-text mb-1.5">{type.name}</h3>
          <p className="text-sm text-brand-muted leading-relaxed">{type.desc}</p>
        </motion.a>)}
      </div>
    </div>
  </section>;
}
