import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';

import {
  getCatalogProducts,
  type CatalogProduct,
} from '@/lib/catalogApi';


export default function AllDoorsPage() {
  const [products, setProducts] =
    useState<CatalogProduct[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');


  useEffect(() => {
    getCatalogProducts('door')
      .then(setProducts)
      .catch((err) => {
        console.error(err);

        setError(
          'Unable to load doors right now.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <main className="py-14 sm:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-brand-orange text-sm font-semibold mb-3">
          All Doors
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Find Your Door Style
        </h1>

        <p className="text-brand-muted max-w-2xl mb-12">
          Explore each door type and choose the entry,
          operation, and architectural character that fits
          your home.
        </p>


        {loading && (
          <p className="text-brand-muted">
            Loading doors...
          </p>
        )}


        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}


        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {products.map((product) => (
              <a
                key={product.slug}
                href={`/doors/${product.slug}`}
                className="group bg-brand-card border border-brand-border rounded-3xl p-5 hover:border-brand-orange/30"
              >

                <div className="aspect-[4/3] rounded-2xl bg-brand-surface flex items-center justify-center overflow-hidden">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-brand-muted text-center">

                      <ImageIcon className="mx-auto mb-2" />

                      <span className="text-sm">
                        Image to be added
                      </span>

                    </div>
                  )}

                </div>


                <h2 className="text-xl font-semibold mt-5">
                  {product.title}
                </h2>

                <p className="text-sm text-brand-muted mt-2">
                  {product.short}
                </p>

                <span className="inline-flex gap-2 items-center text-brand-orange text-sm mt-4">
                  Explore
                  <ArrowRight size={14} />
                </span>

              </a>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}