import { ThemeProvider } from './context/ThemeContext';
import ParticleField from './components/ParticleField';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import EvolutionBadge from './components/EvolutionBadge';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import predictionsData from './data/predictions.json';
import type { Prediction } from './types';

const predictions = predictionsData as Prediction[];

export default function App() {
  return (
    <ThemeProvider>
      {/* Animated particle background */}
      <ParticleField />

      {/* CRT scanline effect */}
      <div className="scanlines" />

      {/* Radial glow bg */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-primary-glow) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 40% at 100% 100%, var(--color-secondary-glow) 0%, transparent 60%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        <Header />
        <StatsBar predictions={predictions} />
        <EvolutionBadge />
        <Timeline predictions={predictions} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
