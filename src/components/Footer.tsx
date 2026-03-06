import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t py-8 px-6"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-mono" style={{ color: 'var(--color-text-dim)' }}>
            <span style={{ color: 'var(--color-primary)' }}>FUTURE //</span> AI Timeline
          </p>
          <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-dim)' }}>
            Aesthetics evolved daily by GitHub Copilot · Predictions curated by AI
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono transition-colors"
            style={{ color: 'var(--color-text-dim)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
          >
            <Github size={14} />
            Source
          </a>
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono transition-colors"
            style={{ color: 'var(--color-text-dim)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
          >
            <ExternalLink size={14} />
            GitHub Copilot
          </a>
        </div>
      </div>
    </footer>
  );
}
