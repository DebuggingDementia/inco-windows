
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export interface WindowColor {
  name: string;
  hex: string;
  image?: string;
}

export const windowColors: WindowColor[] = [
  { name: 'Bright White', hex: '#F5F5F5', image: '/images/window-colors/Bright_White_Bay_Window.webp' },
  { name: 'Rainware White', hex: '#E8E5DF', image: '/images/window-colors/Rainware_White_Bay_Window.webp' },
  { name: 'Ice White', hex: '#EDF1F4', image: '/images/window-colors/Ice_White_Bay_Window.webp' },
  { name: 'Almond', hex: '#EFDECD', image: '/images/window-colors/Almond_Bay_Window.webp' },
  { name: 'Pebble', hex: '#C4B6A6', image: '/images/window-colors/Pebble_Bay_Window.webp' },
  { name: 'Sandstone', hex: '#C2B280', image: '/images/window-colors/Sandstone_Bow_Window.webp' },
  { name: 'Monterey Sand', hex: '#BDA87D', image: '/images/window-colors/Monterey_Sand_Bay_Window.webp' },
  { name: 'Sandalwood', hex: '#A68B6B', image: '/images/window-colors/Sandlewood_Bay_Window.webp' },
  { name: 'Cashmere', hex: '#D1B399', image: '/images/window-colors/Cashmere_bay_window_.webp' },
  { name: 'Maize', hex: '#F3CB6F', image: '/images/window-colors/Maize_bay_window.webp' },
  { name: 'Canyon Clay', hex: '#C07A4B', image: '/images/window-colors/Canyon_Clay_Bay_Window.webp' },
  { name: 'Cedar', hex: '#A0522D', image: '/images/window-colors/Cedar_Bow_Window.webp' },
  { name: 'Tan', hex: '#D2B48C', image: '/images/window-colors/Tan_Bay_Window.webp' },
  { name: 'Nutmeg', hex: '#7E5835', image: '/images/window-colors/Nutmeg_Bay_Window.webp' },
  { name: 'Brownstone', hex: '#6B4226', image: '/images/window-colors/Brownstone_bay_window.webp' },
  { name: 'Chestnut Brown', hex: '#633E2E', image: '/images/window-colors/Chestnut_Brown_Bay_Window.webp' },
  { name: 'Antique Brown', hex: '#5C3317', image: '/images/window-colors/Antique_Brown_Bay_Window.webp' },
  { name: 'Espresso', hex: '#3C1F0A', image: '/images/window-colors/Espresso_bay_window.webp' },
  { name: 'Sable', hex: '#4A3728', image: '/images/window-colors/Sable_Bay_Window.webp' },
  { name: 'Commercial Brown', hex: '#4E3629', image: '/images/window-colors/Commercial_Brown_Bay_Window.webp' },
  { name: 'Smoked Timber', hex: '#5E4B3B', image: '/images/window-colors/Smoked_Timber_Bay_Window.webp' },
  { name: 'Dark Drift', hex: '#3B2F2F', image: '/images/window-colors/Dark_Drift_bay_window.webp' },
  { name: 'Window Bronze', hex: '#6B5344', image: '/images/window-colors/Window_Bronze_Bay_Window.webp' },
  { name: 'Bright Red', hex: '#CC2A2A', image: '/images/window-colors/Bright_red_bay_window.webp' },
  { name: 'Venetian Red', hex: '#A42A2A', image: '/images/window-colors/Venetian_Red_Bay_Window.webp' },
  { name: 'Burgundy', hex: '#6D1E2A', image: '/images/window-colors/Deep_Burgundy_Bay_Window.webp' },
  { name: 'Majestic Brick', hex: '#8B3A3A', image: '/images/window-colors/Majestic_Brick_Bay_Window.webp' },
  { name: 'Sage', hex: '#87A878', image: '/images/window-colors/Sage_Bay_Window.webp' },
  { name: 'Meadow Green', hex: '#5B7B4E', image: '/images/window-colors/Meadow_Green_Bay_Window.webp' },
  { name: 'Ivy Green', hex: '#3B5E3B', image: '/images/window-colors/Ivy_Green_Bay_Window.webp' },
  { name: 'Forest Green', hex: '#264D28', image: '/images/window-colors/Deep_forest_green_bay_window.webp' },
  { name: 'Moonlit Moss', hex: '#5E6B4F', image: '/images/window-colors/Moonlit_Moss_Bay_Window.webp' },
  { name: 'Juniper Grove', hex: '#4A5E4A', image: '/images/window-colors/Juniper_Grove_Bay_Window.webp' },
  { name: 'Wedgewood Blue', hex: '#6B8BA4', image: '/images/window-colors/Wedgewood_Blue_Bay_Window.webp' },
  { name: 'Coastal Blue', hex: '#4E7A9B', image: '/images/window-colors/Coastal_Blue_Bay_Window.webp' },
  { name: 'Rockwell Blue', hex: '#3E6080', image: '/images/window-colors/Rockwell_Blue_Bay_Window.webp' },
  { name: 'Old World Blue', hex: '#3B5072', image: '/images/window-colors/Old_World_Blue_bay_window.webp' },
  { name: 'Midnight Surf', hex: '#2C3E5A', image: '/images/window-colors/Midnight_Surf_bay_window.webp' },
  { name: 'Marine Dusk', hex: '#2A3650', image: '/images/window-colors/Marine_Dusk_Bay_Window.webp' },
  { name: 'Hudson Slate', hex: '#5B6B7B', image: '/images/window-colors/Hudson_Slate_Bay_Window.webp' },
  { name: 'Chesapeake Gray', hex: '#6B7B8B', image: '/images/window-colors/Chesapeake_Gray_Bay_Window.webp' },
  { name: 'Slate', hex: '#6E7B8B', image: '/images/window-colors/Slate_bay_window.webp' },
  { name: 'Windswept Smoke', hex: '#7A7D7F', image: '/images/window-colors/Windswept_Smoke_Bay_Window.webp' },
  { name: 'Dover Gray', hex: '#8B8F8E', image: '/images/window-colors/Dover_Gray_bay_window.webp' },
  { name: 'Mountain Harbor', hex: '#5E6B6B', image: '/images/window-colors/Mountain_Harbor_Bay_Window.webp' },
  { name: 'Metallic Gray', hex: '#6C6E70', image: '/images/window-colors/Metallic_gray_bay_window.webp' },
  { name: 'Storm', hex: '#545960', image: '/images/window-colors/Storm_Gray_Bay_Window.webp' },
  { name: 'Iron Ore', hex: '#4A4E54', image: '/images/window-colors/Iron_Ore_bay_window.webp' },
  { name: 'Graphite', hex: '#3C3F41', image: '/images/window-colors/Graphite_bay_window.webp' },
  { name: 'Black', hex: '#1A1A1A', image: '/images/window-colors/Black_Bay_Window.webp' },
  { name: 'Rockport Brown', hex: '#6B5642', image: '/images/window-colors/Rockport_Brown_Bay_Window.webp' },
  { name: 'AluCopper', hex: '#B87A4E', image: '/images/window-colors/AluCopper_bay_window.webp' },
];

const FALLBACK_IMAGE =
  '/images/window-colors/Bright_White_Bay_Window.webp';

export default function ColorCollection() {
  const [selected, setSelected] = useState('Bright White');

  const selectedColor =
    windowColors.find((color) => color.name === selected) ??
    windowColors[0];

  const previewImage =
    selectedColor.image || FALLBACK_IMAGE;

  const preloadImage = (src?: string) => {
    if (!src) return;

    const image = new Image();
    image.src = src;
  };

  return (
    <section className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Windows{' '}
              <span className="text-brand-orange">
                Color Collection
              </span>
            </h2>

            <p className="text-brand-muted">
              Choose from a wide range of premium colors to
              match your home's style.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 mb-12">
            <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[550px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={previewImage}
                  src={previewImage}
                  alt={`${selectedColor.name} window frame`}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>

            <p className="text-center mt-6 text-brand-text font-medium text-lg">
              {selectedColor.name}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-[repeat(13,minmax(0,1fr))] gap-3 sm:gap-4">
          {windowColors.map((color, i) => (
            <motion.button
              key={color.name}
              type="button"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.01,
              }}
              onMouseEnter={() =>
                preloadImage(color.image)
              }
              onFocus={() =>
                preloadImage(color.image)
              }
              onClick={() =>
                setSelected(color.name)
              }
              className="group flex flex-col items-center gap-2"
            >
              <div
                className={`w-full aspect-square rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  selected === color.name
                    ? 'border-brand-orange scale-110 shadow-lg'
                    : 'border-brand-border hover:border-white/20'
                }`}
                style={{
                  backgroundColor: color.hex,
                }}
              />

              <span
                className={`text-[10px] sm:text-xs leading-tight text-center transition-colors ${
                  selected === color.name
                    ? 'text-brand-text'
                    : 'text-brand-muted'
                }`}
              >
                {color.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
