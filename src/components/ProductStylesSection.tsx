import { motion } from 'framer-motion';

import AnimatedSection from './AnimatedSection';
import ImageWithSkeleton from './ImageWithSkeleton';

type Style = {
  name: string;
  href: string;
  desc: string;
  image?: string | null;
};

type Props = {
  id: string;
  label: string;
  description: string;
  styles: Style[];
  stoneBackground?: boolean;
  loading?: boolean;
  skeletonCount?: number;
};

export default function ProductStylesSection({
  id,
  label,
  description,
  styles,
  stoneBackground = false,
  loading = false,
  skeletonCount = 8,
}: Props) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${
        stoneBackground
          ? 'bg-[#EAE8E4]'
          : 'bg-brand-bg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                stoneBackground
                  ? 'text-brand-bg'
                  : ''
              }`}
            >
              {label} Styles &{' '}

              <span
                className={
                  stoneBackground
                    ? 'text-[#A95129]'
                    : 'text-brand-orange'
                }
              >
                Types
              </span>
            </h2>

            <p
              className={`leading-relaxed ${
                stoneBackground
                  ? 'text-brand-card/80'
                  : 'text-brand-muted'
              }`}
            >
              {description}
            </p>
          </div>
        </AnimatedSection>


        {/* PRODUCTS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

          {loading
            ? Array.from({
                length: skeletonCount,
              }).map((_, index) => (
                <ProductCardSkeleton
                  key={index}
                />
              ))
            : styles.map((type, index) => (
                <motion.a
                  key={type.href}
                  href={type.href}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-40px',
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="group bg-brand-card border border-brand-border rounded-3xl p-5 hover:border-brand-orange/20 transition-all duration-500"
                >

                  <ImageWithSkeleton
                    src={type.image}
                    alt={type.name}
                    containerClassName="w-full aspect-[4/3] mb-4 rounded-2xl bg-white/5"
                    className="w-full h-full object-contain"
                  />

                  <h3 className="font-semibold text-brand-text mb-1.5">
                    {type.name}
                  </h3>

                  <p className="text-sm text-brand-muted leading-relaxed">
                    {type.desc}
                  </p>

                </motion.a>
              ))}

        </div>
      </div>
    </section>
  );
}


function ProductCardSkeleton() {
  return (
    <div className="bg-brand-card border border-brand-border rounded-3xl p-5 overflow-hidden">
      <div className="w-full aspect-[4/3] rounded-2xl bg-white/[0.06] animate-pulse mb-4" />

      <div className="h-5 w-2/3 rounded-md bg-white/[0.08] animate-pulse mb-3" />

      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.05] animate-pulse" />

        <div className="h-3 w-[90%] rounded bg-white/[0.05] animate-pulse" />

        <div className="h-3 w-[65%] rounded bg-white/[0.05] animate-pulse" />
      </div>
    </div>
  );
}