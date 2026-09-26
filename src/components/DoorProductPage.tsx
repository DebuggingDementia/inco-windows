import type { DoorProduct } from '@/data/doorProducts';
import ProductDetailPage from './ProductDetailPage';

const patioColours = [
  { name: 'White', hex: '#eee' },
  { name: 'Black', hex: '#151515' },
  { name: 'Bronze', hex: '#70513a' },
];

export default function DoorProductPage({ product }: { product: DoorProduct }) {
  const patio = product.slug === 'sliding-patio';
  const infoItems = patio ? [
    { title: 'Sliding operation', description: 'A panel moves horizontally along a track, without a door swing into the room.' },
    { title: 'Glazing', description: 'The glazed panels help connect living areas with the outdoors. Confirm the glass package for your project.' },
    { title: 'Frame & sizes', description: 'Frame configuration and available dimensions depend on the selected patio door.' },
    { title: 'Locks & hardware', description: 'Ask about the compatible lock and handle options for your configuration.' },
  ] : [
    { title: 'Door configuration', description: product.short },
    { title: 'Glazing options', description: 'Ask which glass configurations are available for this door.' },
    { title: 'Weather performance', description: 'Construction, seals, and installation affect comfort and energy performance.' },
    { title: 'Hardware', description: 'Confirm compatible handles, locks, and hinges for your selected configuration.' },
  ];
  const featureItems = [
    { title: 'Construction quality', description: 'The selected door system determines its panel and frame construction.' },
    { title: 'Insulation & sealing', description: 'Ask about insulated cores, glazing, and weather seals for this model.' },
    { title: 'Hardware & durability', description: 'Choose compatible hardware suited to the entrance and daily use.' },
    { title: 'Installation & warranty', description: 'Confirm installation details and warranty coverage with the INCO team.' },
  ];
  const additionalItems = patio ? [
    { title: 'Glazing', description: 'Review available glass packages for the selected patio door.' },
    { title: 'Frame & sizes', description: 'Confirm opening dimensions and frame options for your project.' },
    { title: 'Locks & hardware', description: 'Choose from the hardware supported by the selected system.' },
    { title: 'Installation Type', description: 'Discuss the opening and installation requirements with the INCO team.' },
  ] : [
    { title: 'Glazing options', description: 'Available glass designs depend on the door configuration.' },
    { title: 'Hardware', description: 'Ask about compatible handles, hinges, and locks.' },
    { title: 'Installation Type', description: 'Review the entrance opening and installation requirements.' },
    { title: 'Finishes', description: 'Confirm the finish choices for the selected door system.' },
  ];

  return <ProductDetailPage product={product} kind="door" infoTitle={patio ? 'Sliding Patio Door Options' : 'Door Options / Performance'} infoItems={infoItems} featureItems={featureItems} additionalItems={additionalItems} colors={patio ? patioColours : undefined} colorDescription="Confirm colour availability for the selected patio door configuration." />;
}
