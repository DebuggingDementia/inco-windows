import { useEffect, useState } from 'react';

import ProductStylesSection from './ProductStylesSection';

import {
  getCatalogProducts,
  type CatalogProduct,
} from '@/lib/catalogApi';


export default function Doors() {
  const [products, setProducts] = useState<
    CatalogProduct[]
  >([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    getCatalogProducts('door')
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(
          'Failed to load door styles:',
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


  const doorTypes = products.map(
    (product) => ({
      name: product.title,

      href: `/doors/${product.slug}`,

      desc: product.short,

      image: product.image,
    })
  );


  return (
    <ProductStylesSection
      id="doors"
      label="Door"
      description="Explore exterior door styles designed around how Canadian homeowners enter, connect, and live."
      styles={doorTypes}
      stoneBackground
      loading={loading}
      skeletonCount={6}
    />
  );
}