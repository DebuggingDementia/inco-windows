import { doorProducts } from '@/data/doorProducts';
import ProductStylesSection from './ProductStylesSection';

const doorTypes = doorProducts.map(product => ({
  name: product.title,
  href: `/doors/${product.slug}`,
  desc: product.short,
  image: product.image,
}));

export default function Doors() {
  return <ProductStylesSection id="doors" label="Door" description="Explore exterior door styles designed around how Canadian homeowners enter, connect, and live." styles={doorTypes} stoneBackground />;
}
