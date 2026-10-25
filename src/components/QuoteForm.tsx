import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { ArrowRight, Check } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

type QuoteFormData = {
  full_name: string;
  phone: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof QuoteFormData, string>>;

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formData, setFormData] = useState<QuoteFormData>({
    full_name: '',
    phone: '',
    email: '',
    message: '',
  });

  const API_URL =
    import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setFieldErrors({});

    try {
      const response = await fetch(`${API_URL}/api/quotes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data) {
          const validationErrors: FieldErrors = {};

          Object.entries(data).forEach(([field, messages]) => {
            if (
              field in formData &&
              Array.isArray(messages) &&
              messages.length > 0
            ) {
              validationErrors[field as keyof QuoteFormData] =
                String(messages[0]);
            }
          });

          if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
          }
        }

        throw new Error('Server rejected the request.');
      }

      setSubmitted(true);

      setFormData({
        full_name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (err) {
      console.error('Quote submission error:', err);

      setError(
        'We could not send your request right now. Please try again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field: keyof QuoteFormData) =>
    `w-full px-4 py-3 bg-brand-surface border rounded-xl text-brand-text placeholder-brand-muted/50 focus:outline-none focus:ring-1 transition-all ${
      fieldErrors[field]
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        : 'border-brand-border focus:border-brand-orange/50 focus:ring-brand-orange/20'
    }`;

  return (
    <section id="quote" className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get a{' '}
              <span className="text-brand-orange">
                Free Quote
              </span>
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

                <h3 className="text-xl font-semibold mb-2">
                  Thank You!
                </h3>

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
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className={inputClasses('full_name')}
                      placeholder="Your name"
                    />

                    {fieldErrors.full_name && (
                      <p className="mt-2 text-sm text-red-400">
                        {fieldErrors.full_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-muted">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputClasses('phone')}
                      placeholder="(403) 000-0000"
                    />

                    {fieldErrors.phone && (
                      <p className="mt-2 text-sm text-red-400">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-muted">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses('email')}
                    placeholder="you@email.com"
                  />

                  {fieldErrors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-muted">
                    Tell Us About Your Project
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClasses('message')} resize-none`}
                    placeholder="Number of windows, type of project, any specific requirements..."
                  />

                  {fieldErrors.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-400 text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Get My Free Quote'}

                  {!loading && <ArrowRight size={16} />}
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