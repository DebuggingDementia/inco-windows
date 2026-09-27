import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { windowMenu } from '@/data/windowProducts';
import { doorMenu } from '@/data/doorProducts';

const navLinks = [
  { label: 'Windows', href: '/#windows' },
  { label: 'Doors', href: '/#doors' },
  { label: 'Glass & Energy Performance', href: '/windows/glass-energy' },
  { label: 'Warranty Info', href: '/warranty' },
];

const windowNavMenu = windowMenu.filter(([label]) => label !== 'Glass & Energy Performance');

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-brand-bg/95 backdrop-blur-xl shadow-lg shadow-black/30 border-[rgba(255,255,255,0.06)]'
            : 'bg-brand-bg border-brand-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 sm:h-[88px]">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img
                src="/images/INCO-Windows-and-Doors-faithful(1).svg"
                alt="INCO Windows & Doors"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </a>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center ml-12 gap-1">
              {navLinks.map((link) => link.label === 'Windows' ? (
                <div key={link.label} className="relative group/nav">
                  <a href="/windows" className="relative px-4 py-2 text-sm font-medium text-[#AAA7A2] hover:text-white flex items-center gap-1">Windows <ChevronDown size={14}/></a>
                  <div className="invisible opacity-0 group-hover/nav:visible group-hover/nav:opacity-100 absolute top-full left-0 pt-3 transition-all">
                    <div className="w-[720px] max-w-[calc(100vw-2rem)] bg-brand-card border border-brand-border rounded-2xl p-3 shadow-2xl">
                      <a href={windowNavMenu[0][1]} className="block px-4 py-2 text-sm text-brand-muted hover:text-white hover:bg-white/5 rounded-lg">{windowNavMenu[0][0]}</a>
                      <div className="grid grid-cols-2 gap-x-4 border-t border-brand-border pt-2">
                        <div>{windowNavMenu.slice(1, 8).map(([label,href])=><a key={href} href={href} className="block px-4 py-2 text-sm text-brand-muted hover:text-white hover:bg-white/5 rounded-lg whitespace-nowrap">{label}</a>)}</div>
                        <div>{windowNavMenu.slice(8).map(([label,href])=><a key={href} href={href} className="block px-4 py-2 text-sm text-brand-muted hover:text-white hover:bg-white/5 rounded-lg whitespace-nowrap">{label}</a>)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : link.label === 'Doors' ? (
                <div key={link.label} className="relative group/doors">
                  <a href="/doors" className="relative px-4 py-2 text-sm font-medium text-[#AAA7A2] hover:text-white flex items-center gap-1">Doors <ChevronDown size={14}/></a>
                  <div className="invisible opacity-0 group-hover/doors:visible group-hover/doors:opacity-100 absolute top-full left-0 pt-3 transition-all">
                    <div className="w-64 bg-brand-card border border-brand-border rounded-2xl p-2 shadow-2xl">{doorMenu.map(([label,href])=><a key={href} href={href} className="block px-4 py-2 text-sm text-brand-muted hover:text-white hover:bg-white/5 rounded-lg">{label}</a>)}</div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-[#AAA7A2] hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right side */}
            <a
              href="/#quote"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/20"
            >
              Free Quote
              <ArrowRight size={14} />
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden ml-3 p-2 text-brand-muted hover:text-brand-text transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-brand-bg/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-12">
                <a href="/" className="flex-shrink-0">
                  <img
                    src="/images/INCO-Windows-and-Doors-faithful(1).svg"
                    alt="INCO Windows & Doors"
                    className="h-14 w-auto object-contain"
                  />
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-brand-muted hover:text-brand-text"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-widest text-brand-orange mt-1">Windows</p>
                <div className="max-h-[42vh] overflow-y-auto border-b border-brand-border pb-3">{windowNavMenu.map(([label,href])=><a key={href} href={href} onClick={()=>setMobileOpen(false)} className="block py-1.5 text-sm text-brand-muted">{label}</a>)}</div>
                <p className="text-xs uppercase tracking-widest text-brand-orange mt-3">Doors</p>
                <div className="border-b border-brand-border pb-3">{doorMenu.map(([label,href])=><a key={href} href={href} onClick={()=>setMobileOpen(false)} className="block py-1.5 text-sm text-brand-muted">{label}</a>)}</div>
                {navLinks.map((link, i) => (
                  link.label === 'Windows' || link.label === 'Doors' ? null :
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-2xl font-medium text-brand-text py-3 border-b border-brand-border hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <a
                  href="tel:+14036173082"
                  className="flex items-center justify-center gap-2 text-brand-muted hover:text-brand-text transition-colors py-3"
                >
                  <Phone size={18} />
                  403-617-3082
                </a>
                <a
                  href="/#quote"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-medium rounded-full transition-all"
                >
                  Get a Free Quote
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
