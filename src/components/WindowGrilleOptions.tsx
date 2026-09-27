import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const grilleOptions = [
  { name: 'Colonial', file: 'Grills type (Colonial).png', description: 'A traditional and symmetrical pattern that complements classic architectural styles.' },
  { name: 'Diamond', file: 'Grills type (Dimond).png', description: 'A timeless, elegant pattern that adds a distinctive touch to both traditional and modern homes.' },
  { name: 'Double Prairie', file: 'Grills type (Double Prairie).png', description: 'A refined variation of the Prairie style, featuring additional horizontal and vertical lines for a more intricate look.' },
  { name: 'Georgian', file: 'Grills type (Georgian).png', description: 'A classic, symmetrical style that evokes a sense of heritage and refinement.' },
  { name: 'Ladder', file: 'Grills type (Lader).png', description: 'A contemporary style with horizontal bars that add a modern touch to your windows.' },
  { name: 'Prairie', file: 'Grills type (Prairie).png', description: 'A subtle yet sophisticated design featuring perimeter grids that create an open and airy feel.' },
  { name: 'Single Diamond', file: 'Grills type (Single Diamond).png', description: 'A simplified version of the Diamond design, offering a subtle yet stylish effect.' },
].map(({ name, file, description }) => ({ name, image: `/images/grille-options/${encodeURIComponent(file)}`, description }));

const grilleProfiles = [
  { name: '5/16"', options: [
    { label: 'White', color: '#F5F5F2' },
    { label: 'Pewter', color: '#8A8F98' },
    { label: 'Brass', color: '#C7A44B' },
  ] },
  { name: 'Georgian', options: [
    { label: 'White', color: '#F5F5F2' },
    { label: 'Brass', color: '#C7A44B' },
  ] },
  { name: 'Pencil', options: [
    { label: 'White', color: '#F5F5F2' },
    { label: 'Pewter', color: '#8A8F98' },
    { label: 'Brass', color: '#C7A44B' },
  ] },
  { name: '5/8"', options: [
    { label: 'White', color: '#F5F5F2' },
    { label: 'SDL Shadow-Bar' },
    { label: 'Brass', color: '#C7A44B' },
    { label: 'Sandalwood', color: '#C8B59B' },
    { label: 'Pewter', color: '#8A8F98' },
  ] },
  { name: '1"', options: [
    { label: 'Georgian' },
    { label: 'Regular' },
  ] },
];

export default function WindowGrilleOptions() {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    const slide = slideRefs.current[index];
    if (!scroller || !slide) return;
    scroller.scrollTo({
      left: slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2,
      behavior: 'smooth',
    });
    setActive(index);
  };

  const updateActiveOnScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const nextDistance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center);
      if (nextDistance < distance) {
        distance = nextDistance;
        closest = index;
      }
    });
    setActive(closest);
  };

  return (
    <section className="py-20 sm:py-28 bg-brand-bg" aria-labelledby="window-grille-options-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 id="window-grille-options-title" className="text-3xl sm:text-4xl font-bold mb-4">
            Window Grille <span className="text-brand-orange">Options</span>
          </h2>
          <p className="text-brand-muted leading-relaxed">
            Explore grille patterns designed to add detail and architectural character to your windows.
          </p>
        </div>

        <div
          id="window-grille-carousel"
          ref={scrollerRef}
          onScroll={updateActiveOnScroll}
          className="relative flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Window grille styles"
        >
          <div aria-hidden="true" className="shrink-0 basis-[calc(11%-1rem)] sm:basis-[calc(22%-1.25rem)] lg:basis-[calc(29%-1.25rem)]" />
          {grilleOptions.map((option, index) => (
            <button
              key={option.name}
              ref={(element) => { slideRefs.current[index] = element; }}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${option.name}, ${index + 1} of ${grilleOptions.length}`}
              aria-current={active === index ? 'true' : undefined}
              className={`shrink-0 basis-[78%] sm:basis-[56%] lg:basis-[42%] snap-center text-left bg-brand-card border rounded-3xl p-5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange ${
                active === index ? 'border-brand-orange/50' : 'border-brand-border hover:border-brand-orange/20'
              }`}
            >
              <span className="h-60 sm:h-72 lg:h-80 flex items-center justify-center mb-4 rounded-2xl overflow-hidden bg-white/5">
                <img src={option.image} alt="" className="w-full h-full object-contain" loading="lazy" />
              </span>
              <span className="block font-semibold text-brand-text">{option.name}</span>
              <span className="block mt-2 text-sm text-brand-muted leading-relaxed">{option.description}</span>
            </button>
          ))}
          <div aria-hidden="true" className="shrink-0 basis-[calc(11%-1rem)] sm:basis-[calc(22%-1.25rem)] lg:basis-[calc(29%-1.25rem)]" />
        </div>

        <div className="flex items-center justify-center gap-5 mt-7">
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous grille" aria-controls="window-grille-carousel" className="w-11 h-11 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-orange/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
            <ArrowLeft size={18} />
          </button>
          <span className="text-sm text-brand-muted tabular-nums" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(grilleOptions.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === grilleOptions.length - 1} aria-label="Next grille" aria-controls="window-grille-carousel" className="w-11 h-11 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-orange/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-12 pt-10 border-t border-brand-border" aria-labelledby="grille-profiles-title">
          <h3 id="grille-profiles-title" className="text-2xl font-semibold text-brand-text">
            Grille Profiles &amp; Colours
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Available grille profiles, finishes and configurations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
            {grilleProfiles.map((profile) => (
              <div key={profile.name} className="min-w-0 rounded-2xl border border-brand-border bg-brand-card p-5">
                <h4 className="font-semibold text-brand-text">{profile.name}</h4>
                <div className="flex flex-wrap gap-2 mt-4">
                  {profile.options.map((option) => (
                    <span key={option.label} className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-border bg-white/5 px-3 py-1 text-sm leading-relaxed text-brand-muted break-words">
                      {'color' in option && <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-[3px] border border-white/20" style={{ backgroundColor: option.color }} />}
                      <span>{option.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
