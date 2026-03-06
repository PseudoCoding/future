import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { parseISO, getYear } from 'date-fns';
import type { Prediction } from '../types';
import PredictionCard from './PredictionCard';

interface Props {
  predictions: Prediction[];
}

interface YearGroup {
  year: number;
  predictions: Prediction[];
}

const STATUS_COLORS: Record<string, string> = {
  accurate: 'var(--color-accurate)',
  inaccurate: 'var(--color-inaccurate)',
  pending: 'var(--color-pending)',
};

export default function Timeline({ predictions }: Props) {
  const yearGroups: YearGroup[] = useMemo(() => {
    const sorted = [...predictions].sort(
      (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );
    const map = new Map<number, Prediction[]>();
    for (const p of sorted) {
      const y = getYear(parseISO(p.date));
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(p);
    }
    return Array.from(map.entries()).map(([year, preds]) => ({ year, predictions: preds }));
  }, [predictions]);

  let cardIndex = 0;

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-32">
      <div className="relative">
        {/* Center spine */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 timeline-spine"
          style={{ width: 'var(--effect-timeline-glow-width)' }}
        />

        {yearGroups.map((group) => (
          <div key={group.year} className="mb-4">
            {/* Year node */}
            <div className="relative flex items-center justify-center mb-8">
              {/* Spine connector line for mobile */}
              <div
                className="md:hidden absolute left-6 top-0 bottom-0 w-px"
                style={{
                  background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)',
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex items-center justify-center"
              >
                {/* Year pill */}
                <div
                  className="px-6 py-2 rounded-full font-mono font-black text-sm tracking-widest node-pulse"
                  style={{
                    color: 'var(--color-primary)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border-strong)',
                    boxShadow: '0 0 20px var(--color-primary-glow)',
                    letterSpacing: '0.2em',
                  }}
                >
                  {group.year}
                </div>

                {/* Year glow halo */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'var(--color-primary-glow)',
                    filter: 'blur(20px)',
                    transform: 'scale(1.8)',
                  }}
                />
              </motion.div>
            </div>

            {/* Predictions for this year */}
            <div className="space-y-6">
              {group.predictions.map((prediction) => {
                const idx = cardIndex++;
                const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';

                return (
                  <div key={prediction.id} className="relative flex items-start gap-0">
                    {/* Mobile: left spine dot */}
                    <div className="md:hidden flex flex-col items-center mr-4 mt-6">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 node-pulse"
                        style={{
                          background: STATUS_COLORS[prediction.status],
                          boxShadow: `0 0 8px ${STATUS_COLORS[prediction.status]}`,
                        }}
                      />
                    </div>

                    {/* Desktop two-column layout */}
                    <div className="hidden md:grid md:grid-cols-2 w-full gap-0">
                      {/* Left side */}
                      <div className={`pr-8 ${side === 'left' ? 'flex justify-end' : ''}`}>
                        {side === 'left' && (
                          <div className="w-full max-w-md">
                            <PredictionCard prediction={prediction} index={idx} side="left" />
                          </div>
                        )}
                      </div>

                      {/* Timeline node (center) */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 mt-6 w-4 h-4 rounded-full node-pulse z-10"
                        style={{
                          background: STATUS_COLORS[prediction.status],
                          boxShadow: `0 0 12px ${STATUS_COLORS[prediction.status]}, 0 0 30px ${STATUS_COLORS[prediction.status]}66`,
                          border: `2px solid var(--color-bg)`,
                        }}
                      />

                      {/* Right side */}
                      <div className={`pl-8 ${side === 'right' ? 'flex justify-start' : ''}`}>
                        {side === 'right' && (
                          <div className="w-full max-w-md">
                            <PredictionCard prediction={prediction} index={idx} side="right" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile full-width card */}
                    <div className="md:hidden flex-1">
                      <PredictionCard prediction={prediction} index={idx} side="left" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Timeline end cap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-1 h-16"
              style={{
                background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
                filter: 'drop-shadow(0 0 4px var(--color-primary))',
              }}
            />
            <div
              className="text-xs font-mono tracking-widest px-4 py-2 rounded-full border"
              style={{
                color: 'var(--color-text-dim)',
                borderColor: 'var(--color-border)',
                letterSpacing: '0.2em',
              }}
            >
              BEYOND THE HORIZON
            </div>
            <div
              className="w-1 h-8"
              style={{
                background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
                opacity: 0.3,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
