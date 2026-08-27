import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote" className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get a <span className="text-brand-orange">Free Quote</span>
            </h2>
            <p className="text-brand-muted max-w-md mx-auto">
              Tell us about your project and we'll provide a personalized estimate.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="bg-brand-card border border-brand-border rounded-4xl p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-brand-muted">
                  We'll contact you within one hour to discuss your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-muted">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-muted">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20 transition-all"
                      placeholder="(403) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-muted">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20 transition-all resize-none"
                    placeholder="Number of windows, type of project, any specific requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/20"
                >
                  Get My Free Quote
                  <ArrowRight size={16} />
                </button>
                <p className="text-center text-sm text-brand-muted/70">
                  We'll contact you within one hour to discuss your project.
                </p>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
