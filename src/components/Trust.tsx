import { Star, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const trustItems = [
  {
    name: 'Google Reviews',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'HomeStars',
    icon: (
      <div className="w-8 h-8 bg-[#00A651] rounded-lg flex items-center justify-center">
        <Star size={16} className="text-white fill-white" />
      </div>
    ),
  },
  {
    name: 'Energy Star',
    icon: (
      <div className="w-8 h-8 bg-[#0073B7] rounded-lg flex items-center justify-center">
        <Star size={16} className="text-white fill-white" />
      </div>
    ),
  },
];

export default function Trust() {
  return (
    <section className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Homeowners Across{' '}
              <span className="text-brand-orange">Alberta</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {trustItems.map((item) => (
              <div
                key={item.name}
                className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center group hover:border-brand-orange/15 transition-all duration-500"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-semibold text-brand-text mb-2">{item.name}</h3>
                <div className="flex items-center gap-1 text-sm text-brand-muted">
                  <span>View Profile</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
