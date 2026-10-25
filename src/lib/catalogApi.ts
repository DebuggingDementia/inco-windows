export type ProductType = 'window' | 'door';

export interface CatalogProduct {
  id: number;
  slug: string;
  title: string;
  product_type: ProductType;

  short: string;
  explanation: string;

  image?: string | null;
  gallery: string[];

  benefits: string[];

  faq: Array<[string, string]>;
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://127.0.0.1:8000';


export async function getCatalogProducts(
  type?: ProductType
): Promise<CatalogProduct[]> {
  const url = type
    ? `${API_URL}/api/catalog/products/?type=${type}`
    : `${API_URL}/api/catalog/products/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      'Failed to load catalog products.'
    );
  }

  return response.json();
}


export async function getCatalogProduct(
  slug: string
): Promise<CatalogProduct> {
  const response = await fetch(
    `${API_URL}/api/catalog/products/${slug}/`
  );

  if (!response.ok) {
    throw new Error(
      'Product not found.'
    );
  }

  return response.json();
}