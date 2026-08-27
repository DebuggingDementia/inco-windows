import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg to-brand-surface" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-card/50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <span className="text-xs font-medium tracking-widest uppercase text-brand-muted">
                Windows Made for Canadian Homes
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance mb-6">
              Windows Crafted for{' '}
              <span className="text-brand-orange">Canadian Homes</span>
            </h1>

            <p className="text-lg text-brand-muted leading-relaxed max-w-xl mb-8">
              Discover high-quality Canadian-made windows designed for Calgary homes and
              Alberta's demanding climate. Built for lasting durability and exceptional
              energy efficiency, our windows provide superior insulation to help keep your
              home warm during cold winters and comfortably cool throughout the summer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/20 hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight size={16} />
              </a>
              <a
                href="#windows"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-brand-border hover:border-brand-muted/30 text-brand-text font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Windows
                <ChevronRight size={16} />
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-brand-muted">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-orange" />
                Canadian-made
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-orange" />
                Energy efficient
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-orange" />
                Built for Alberta
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 -m-16">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[100px]" />
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-brand-border w-[90%] mx-auto">
              <img
                src="/images/hero/3ac9455c-beca-49eb-9f9e-378658fcbfba.png"
                alt="INCO premium vinyl windows installed in a Canadian home"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
