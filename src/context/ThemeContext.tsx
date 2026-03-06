import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { Theme } from '../types';
import themeData from '../theme/evolution.json';

const theme = themeData as Theme;

// Apply CSS custom properties from theme
function applyThemeToCSSVars(t: Theme) {
  const root = document.documentElement;
  const c = t.colors;
  const e = t.effects;
  const a = t.animations;

  root.style.setProperty('--color-bg', c.background);
  root.style.setProperty('--color-bg-secondary', c.backgroundSecondary);
  root.style.setProperty('--color-bg-tertiary', c.backgroundTertiary);
  root.style.setProperty('--color-primary', c.primary);
  root.style.setProperty('--color-primary-glow', c.primaryGlow);
  root.style.setProperty('--color-primary-dim', c.primaryDim);
  root.style.setProperty('--color-secondary', c.secondary);
  root.style.setProperty('--color-secondary-glow', c.secondaryGlow);
  root.style.setProperty('--color-accent', c.accent);
  root.style.setProperty('--color-accent-glow', c.accentGlow);
  root.style.setProperty('--color-accurate', c.accurate);
  root.style.setProperty('--color-accurate-glow', c.accurateGlow);
  root.style.setProperty('--color-inaccurate', c.inaccurate);
  root.style.setProperty('--color-inaccurate-glow', c.inaccurateGlow);
  root.style.setProperty('--color-pending', c.pending);
  root.style.setProperty('--color-pending-glow', c.pendingGlow);
  root.style.setProperty('--color-text-primary', c.textPrimary);
  root.style.setProperty('--color-text-secondary', c.textSecondary);
  root.style.setProperty('--color-text-dim', c.textDim);
  root.style.setProperty('--color-border', c.border);
  root.style.setProperty('--color-border-strong', c.borderStrong);
  root.style.setProperty('--color-scanline', c.scanline);

  root.style.setProperty('--font-display', t.typography.fontDisplay);
  root.style.setProperty('--font-mono', t.typography.fontMono);

  root.style.setProperty('--effect-card-blur', e.cardBlur);
  root.style.setProperty('--effect-card-opacity', e.cardOpacity);
  root.style.setProperty('--effect-border-radius', e.borderRadius);
  root.style.setProperty('--effect-timeline-glow-width', e.timelineGlowWidth);
  root.style.setProperty('--effect-glow-intensity', String(e.glowIntensity));

  root.style.setProperty('--anim-transition', a.transitionSpeed);
  root.style.setProperty('--anim-float', a.floatDuration);
  root.style.setProperty('--anim-pulse', a.pulseDuration);
  root.style.setProperty('--anim-scan', a.scanDuration);
  root.style.setProperty('--anim-particle', a.particleDuration);
}

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyThemeToCSSVars(theme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
