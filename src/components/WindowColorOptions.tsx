import { useState } from 'react';
import { motion } from 'framer-motion';
import { windowColors } from './ColorCollection';

const DEFAULT_VISIBLE_COUNT = 10;

export default function WindowColorOptions() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(windowColors[0].name);
  const visibleColors = expanded ? windowColors : windowColors.slice(0, DEFAULT_VISIBLE_COUNT);

  return (
    <section className="py-16 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Window Colours</h2>
        <p className="text-brand-muted mt-3">
          Explore available colours for your window configuration.
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4 mt-8">
          {visibleColors.map((color, index) => (
            <motion.button
              key={color.name}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: Math.min(index, DEFAULT_VISIBLE_COUNT) * 0.015 }}
              onClick={() => setSelected(color.name)}
              className="group flex flex-col items-center gap-2"
              aria-pressed={selected === color.name}
            >
              <span
                className={`w-full aspect-square rounded-xl border-2 transition-all duration-300 group-hover:scale-105 ${
                  selected === color.name
                    ? 'border-brand-orange scale-105 shadow-lg'
                    : 'border-brand-border group-hover:border-white/20'
                }`}
                style={{ backgroundColor: color.hex }}
              />
              <span className={`text-[10px] sm:text-xs leading-tight text-center ${selected === color.name ? 'text-brand-text' : 'text-brand-muted'}`}>
                {color.name}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="self-start px-6 py-3 rounded-full border border-brand-border hover:border-brand-orange text-sm font-medium transition-colors"
          >
            {expanded ? 'Show Less' : 'View All Colours'}
          </button>
          <p className="text-sm text-brand-muted">Selected: <span className="text-brand-text">{selected}</span></p>
        </div>
      </div>
    </section>
  );
}
