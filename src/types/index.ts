export type PredictionStatus = 'accurate' | 'inaccurate' | 'pending';

export interface Prediction {
  id: string;
  date: string;
  validationDate: string;
  category: string;
  confidence: number;
  prediction: string;
  outcome: string | null;
  status: PredictionStatus;
  tags: string[];
}

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  primary: string;
  primaryGlow: string;
  primaryDim: string;
  secondary: string;
  secondaryGlow: string;
  accent: string;
  accentGlow: string;
  accurate: string;
  accurateGlow: string;
  inaccurate: string;
  inaccurateGlow: string;
  pending: string;
  pendingGlow: string;
  textPrimary: string;
  textSecondary: string;
  textDim: string;
  border: string;
  borderStrong: string;
  scanline: string;
}

export interface ThemeTypography {
  fontDisplay: string;
  fontMono: string;
  displayWeight: string;
  headingWeight: string;
}

export interface ThemeEffects {
  particleCount: number;
  particleSpeed: number;
  glowIntensity: number;
  scanlineVisible: boolean;
  noiseVisible: boolean;
  bloomEnabled: boolean;
  cardBlur: string;
  cardOpacity: string;
  borderRadius: string;
  timelineGlowWidth: string;
}

export interface ThemeAnimations {
  transitionSpeed: string;
  floatDuration: string;
  pulseDuration: string;
  scanDuration: string;
  particleDuration: string;
}

export interface ThemeLayout {
  timelineStyle: string;
  cardStyle: string;
  backgroundPattern: string;
}

export interface Theme {
  _comment: string;
  _lastEvolvedBy: string;
  _lastEvolvedAt: string;
  _evolutionNote: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
  animations: ThemeAnimations;
  layout: ThemeLayout;
}
