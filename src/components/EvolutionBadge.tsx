import { motion } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';

export default function EvolutionBadge() {
  const theme = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-4xl mx-auto px-6 mb-20"
    >
      <div
        className="rounded-2xl p-6 md:p-8 border"
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary-glow), var(--color-primary-glow))',
          borderColor: 'var(--color-border-strong)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--color-secondary-glow)', border: '1px solid rgba(124,58,237,0.3)' }}
          >
            <Cpu size={20} style={{ color: 'var(--color-secondary)' }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3
                className="text-base font-semibold font-mono"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Aesthetic Evolution Log
              </h3>
              <span
                className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{
                  color: 'var(--color-secondary)',
                  borderColor: 'rgba(124,58,237,0.3)',
                  background: 'rgba(124,58,237,0.1)',
                }}
              >
                <Sparkles size={10} />
                Copilot-Driven
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              Every 24 hours, GitHub Copilot analyzes emerging UI/UX trends and evolves this site's
              visual design — colors, typography, animations, and layout — reflecting its predictions
              about the future of interface design. The evolution is committed directly to the repository.
            </p>

            <div
              className="p-4 rounded-xl border font-mono text-sm"
              style={{
                background: 'rgba(0,0,0,0.3)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: 'var(--color-primary)' }}>Latest:</span>
                <span style={{ color: 'var(--color-text-dim)' }}>
                  {format(new Date(theme._lastEvolvedAt), 'yyyy-MM-dd HH:mm:ss')} UTC
                </span>
              </div>
              <div
                className="text-sm italic"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                "{theme._evolutionNote}"
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span style={{ color: 'var(--color-text-dim)' }}>evolved-by:</span>
                <span style={{ color: 'var(--color-accent)' }}>{theme._lastEvolvedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
