const footerLinks = {
  Products: [
    { label: 'Windows', href: '/#windows' },
    { label: 'Doors', href: '/#doors' },
  ],
  Services: [
    { label: 'Installation', href: '/#installation' },
    { label: 'Warranty Info', href: '/warranty' },
  ],
  Contact: [
    { label: '(403) 123-4567', href: 'tel:+14031234567' },
    { label: 'info@incowindows.ca', href: 'mailto:info@incowindows.ca' },
    { label: 'Calgary, Alberta', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img src="/images/INCO-Windows-and-Doors-faithful(1).svg" alt="INCO Windows & Doors" className="h-16 w-auto object-contain" />
            </a>
            <p className="text-sm text-brand-muted leading-relaxed max-w-xs mb-6">
              Premium Canadian-made windows and doors designed for Alberta's demanding
              climate. Built for durability, comfort and energy efficiency.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-card border border-brand-border rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="w-16 h-10 bg-brand-card border border-brand-border rounded-lg flex items-center justify-center">
                <img src="/images/HomeStars-logo-vector.svg" alt="HomeStars" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-10 bg-brand-card border border-brand-border rounded-lg flex items-center justify-center">
                <img src="/images/energystar.png" alt="Energy Star" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm text-brand-text mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-muted hover:text-brand-text transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-border mt-12 pt-8 text-center">
          <p className="text-xs text-brand-muted/60">
            &copy; {new Date().getFullYear()} INCO Windows & Doors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
