import { useEffect, useState } from 'react';

import ProductStylesSection from './ProductStylesSection';

import {
  getCatalogProducts,
  type CatalogProduct,
} from '@/lib/catalogApi';


const HOME_WINDOW_SLUGS = [
  'awning',
  'fixed-picture',
  'single-slider',
  'single-hung',
  'architectural-specialty-shape',
  'bay',
  'tilt-turn',
  'casement',
];


export default function WindowStyles() {
  const [products, setProducts] = useState<
    CatalogProduct[]
  >([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    getCatalogProducts('window')
      .then((data) => {
        if (cancelled) {
          return;
        }

        const orderedProducts =
          HOME_WINDOW_SLUGS
            .map((slug) =>
              data.find(
                (product) =>
                  product.slug === slug
              )
            )
            .filter(
              (
                product
              ): product is CatalogProduct =>
                Boolean(product)
            );

        setProducts(orderedProducts);
      })
      .catch((error) => {
        console.error(
          'Failed to load window styles:',
          error
        );
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);


  const windowTypes = products.map(
    (product) => ({
      name: product.title,

      href: `/windows/${product.slug}`,

      desc: product.short,

      image: product.image,
    })
  );


  return (
    <ProductStylesSection
      id="windows"
      label="Window"
      description="At INCO, we believe every family deserves a home filled with warmth, comfort, and natural light. That's why we offer a wide selection of custom-made window styles designed to complement your home and the way your family lives."
      styles={windowTypes}
      loading={loading}
      skeletonCount={8}
    />
  );
}