import AnimatedSection from './AnimatedSection';

interface CasingOption {
  name: string;
  image: string;
}

const vinylOptions: CasingOption[] = [
  {
    name: 'Colonial Rosettes',
    image: '/images/interior-casing/Colonial Vinyl with Rosette..png',
  },
  {
    name: 'Colonial 45-degree',
    image: '/images/interior-casing/Colonial 45 Vinyl.png',
  },
  {
    name: 'Flat',
    image: '/images/interior-casing/Flat Vinyl.png',
  },
];

const mdfOptions: CasingOption[] = [
  {
    name: 'Colonial',
    image: '/images/interior-casing/Colonial MDF.png',
  },
  {
    name: 'Flat',
    image: '/images/interior-casing/Flat MDF.png',
  },
];

function CasingCard({ option }: { option: CasingOption }) {
  return (
    <div className="shrink-0 basis-[82%] md:basis-[calc((100%-2rem)/3)] snap-start min-w-0 bg-brand-card border border-brand-border rounded-2xl p-5 group hover:border-brand-orange/15 transition-colors duration-300">
      <div className="aspect-[16/10] mb-4 rounded-xl overflow-hidden bg-white/5">
        <img
          src={option.image}
          alt={option.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <p className="text-sm font-medium text-center text-brand-text">{option.name}</p>
    </div>
  );
}

function CasingCarousel({ title, options }: { title: string; options: CasingOption[] }) {
  return (
    <div>
      <AnimatedSection>
        <h3 className="text-lg font-semibold mb-5 flex items-center gap-3 text-brand-bg">
          <span className="w-8 h-px bg-brand-bg" />
          {title}
        </h3>
      </AnimatedSection>
      <div
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange ${options.length < 3 ? 'md:justify-center' : ''}`}
        role="region"
        aria-label={`${title} casing options`}
        tabIndex={0}
      >
        {options.map((option) => (
          <CasingCard key={option.image} option={option} />
        ))}
      </div>
    </div>
  );
}

export default function InteriorCasing() {
  return (
    <section className="py-20 sm:py-28 bg-[#B6653F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-bg">
              Interior <span className="text-brand-bg">Casing</span>
            </h2>
            <p className="text-brand-bg">
              Choose from vinyl and MDF casing options to complete your window's interior
              finish.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-10 sm:space-y-12">
          <CasingCarousel title="Vinyl" options={vinylOptions} />
          <CasingCarousel title="MDF" options={mdfOptions} />
        </div>
      </div>
    </section>
  );
}
