import { motion } from 'framer-motion';
import { Brain, Github, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';

export default function Header() {
  const theme = useTheme();
  const lastEvolved = new Date(theme._lastEvolvedAt);

  return (
    <header className="relative z-10 pt-16 pb-12 px-6 text-center">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border"
          style={{
            color: 'var(--color-primary)',
            borderColor: 'var(--color-border-strong)',
            background: 'var(--color-primary-glow)',
            letterSpacing: '0.15em',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: 'var(--color-primary)' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: 'var(--color-primary)' }}
            />
          </span>
          LIVE — AI PREDICTS THE FUTURE
        </span>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Brain
            size={40}
            style={{ color: 'var(--color-primary)', filter: 'drop-shadow(0 0 12px var(--color-primary))' }}
          />
          <h1
            className="text-6xl md:text-8xl font-black tracking-tight gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            FUTURE
          </h1>
          <Brain
            size={40}
            style={{
              color: 'var(--color-secondary)',
              filter: 'drop-shadow(0 0 12px var(--color-secondary))',
              transform: 'scaleX(-1)',
            }}
          />
        </div>

        <p
          className="text-lg md:text-xl font-mono max-w-2xl mx-auto mb-2"
          style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}
        >
          A self-evolving timeline of AI predictions.
          <br />
          Validated in real-time as the future becomes the present.
        </p>
      </motion.div>

      {/* Evolution badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      >
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-mono"
          style={{
            background: 'var(--color-secondary-glow)',
            borderColor: 'rgba(124, 58, 237, 0.3)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Zap size={14} style={{ color: 'var(--color-secondary)' }} />
          <span>Aesthetics last evolved by</span>
          <span style={{ color: 'var(--color-secondary)' }}>GitHub Copilot</span>
          <span>on {format(lastEvolved, 'MMM d, yyyy')}</span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-mono transition-all"
          style={{
            background: 'var(--color-primary-glow)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-strong)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
          }}
        >
          <Github size={14} />
          View Source & Actions
        </a>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 h-px max-w-4xl mx-auto"
        style={{
          background: 'linear-gradient(to right, transparent, var(--color-primary), transparent)',
          filter: 'drop-shadow(0 0 4px var(--color-primary))',
        }}
      />
    </header>
  );
}
