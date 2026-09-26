import type { WindowProduct } from '@/data/windowProducts';
import ProductDetailPage from './ProductDetailPage';

const infoItems = ['Double Pane', 'Triple Pane', 'Low-E', 'Argon'].map(title => ({ title, description: 'Content to be finalized.' }));
const featureItems = ['Profile & construction', 'Glazing & sealing', 'Hardware & durability', 'Installation & warranty'].map(title => ({ title, description: 'Product-specific details to be finalized.' }));
const additionalItems = ['Sill / Seat Options', 'Grills', 'Installation Type', 'Casing'].map(title => ({ title, description: 'Availability and product-specific details to be confirmed.' }));

export default function WindowProductPage({ product }: { product: WindowProduct }) {
  return <ProductDetailPage product={product} kind="window" infoTitle="Glass Type / Glazing Options" infoItems={infoItems} featureItems={featureItems} additionalItems={additionalItems} />;
}
