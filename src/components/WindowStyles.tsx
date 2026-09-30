import ProductStylesSection from './ProductStylesSection';

const windowTypes = [
  {
    name: 'Awning Windows',
    href: '/windows/awning',
    desc: 'Hinged at the top and opening outward from the bottom, allowing fresh air while helping keep rain outside.',
    image: '/images/window-styles/Awning Window.png',
  },
  {
    name: 'Fixed / Picture Windows',
    href: '/windows/fixed-picture',
    desc: 'Non-opening windows with large unobstructed glass areas for natural light and outdoor views.',
    image: '/images/window-styles/Picture Window 1.png',
  },
  {
    name: 'Slider Windows',
    href: '/windows/single-slider',
    desc: 'Smooth side-to-side operation, ideal for wide openings and modern homes.',
    image: '/images/window-styles/Single Slider.png',
  },
  {
    name: 'Hung Windows',
    href: '/windows/single-hung',
    desc: 'Classic vertical operation with easy maintenance and timeless styling.',
    image: '/images/window-styles/Single Hung.png',
  },
  {
    name: 'Shaped Windows',
    href: '/windows/architectural-specialty-shape',
    desc: 'Custom windows available in arches, circles, triangles and other geometric configurations.',
    image: '/images/window-products/Sahpe Window (Mix).png',
  },
  {
    name: 'Bay & Bow Windows',
    href: '/windows/bay',
    desc: 'Windows extending outward from the home to create additional interior space and panoramic views.',
    image: '/images/window-styles/Bay Window.png',
  },
  {
    name: 'Turn & Tilt Windows',
    href: '/windows/tilt-turn',
    desc: 'Two opening options: tilt inward from the top or swing inward from the side.',
    image: '/images/window-styles/Turn and Tilt 1.png',
  },
  {
    name: 'Casement Windows',
    href: '/windows/casement',
    desc: 'Side-hinged windows opening outward using a crank.',
    image: '/images/window-styles/Casement Window .png',
  },
];

export default function WindowStyles() {
  return <ProductStylesSection id="windows" label="Window" description={"At INCO, we believe every family deserves a home filled with warmth, comfort, and natural light. That's why we offer a wide selection of custom-made window styles designed to complement your home and the way your family lives."} styles={windowTypes} />;
}
