import { useEffect, useState } from 'react';

import WindowProductPage from './WindowProductPage';
import DoorProductPage from './DoorProductPage';
import ProductPageSkeleton from './ProductPageSkeleton';

import {
  getCatalogProduct,
  type CatalogProduct,
  type ProductType,
} from '@/lib/catalogApi';

type Props = {
  slug: string;
  kind: ProductType;
};

export default function CatalogProductRoute({
  slug,
  kind,
}: Props) {
  const [product, setProduct] =
    useState<CatalogProduct | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError('');
    setProduct(null);

    getCatalogProduct(slug)
      .then((data) => {
        if (cancelled) {
          return;
        }

        if (data.product_type !== kind) {
          throw new Error(
            'Product type does not match.'
          );
        }

        setProduct(data);
      })
      .catch((err) => {
        console.error(err);

        if (!cancelled) {
          setError('Product not found.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, kind]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (error || !product) {
    return (
      <main className="py-20 text-center">
        <h1 className="text-3xl font-bold">
          Product not found
        </h1>

        <a
          href={
            kind === 'window'
              ? '/windows'
              : '/doors'
          }
          className="inline-block mt-6 text-brand-orange"
        >
          Back to catalog
        </a>
      </main>
    );
  }

  if (kind === 'window') {
    return (
      <WindowProductPage
        product={product}
      />
    );
  }

  return (
    <DoorProductPage
      product={product}
    />
  );
}