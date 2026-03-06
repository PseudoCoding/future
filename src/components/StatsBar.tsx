import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, TrendingUp, BarChart2 } from 'lucide-react';
import type { Prediction } from '../types';

interface Props {
  predictions: Prediction[];
}

export default function StatsBar({ predictions }: Props) {
  const accurate = predictions.filter(p => p.status === 'accurate').length;
  const inaccurate = predictions.filter(p => p.status === 'inaccurate').length;
  const pending = predictions.filter(p => p.status === 'pending').length;
  const validated = accurate + inaccurate;
  const accuracy = validated > 0 ? Math.round((accurate / validated) * 100) : 0;
  const avgConfidence = Math.round(
    predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length
  );

  const stats = [
    {
      icon: <CheckCircle2 size={18} />,
      label: 'Accurate',
      value: accurate,
      color: 'var(--color-accurate)',
      glow: 'var(--color-accurate-glow)',
    },
    {
      icon: <XCircle size={18} />,
      label: 'Inaccurate',
      value: inaccurate,
      color: 'var(--color-inaccurate)',
      glow: 'var(--color-inaccurate-glow)',
    },
    {
      icon: <Clock size={18} />,
      label: 'Pending',
      value: pending,
      color: 'var(--color-pending)',
      glow: 'var(--color-pending-glow)',
    },
    {
      icon: <TrendingUp size={18} />,
      label: 'Prediction Accuracy',
      value: `${accuracy}%`,
      color: 'var(--color-primary)',
      glow: 'var(--color-primary-glow)',
    },
    {
      icon: <BarChart2 size={18} />,
      label: 'Avg. AI Confidence',
      value: `${avgConfidence}%`,
      color: 'var(--color-accent)',
      glow: 'var(--color-accent-glow)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-10 max-w-5xl mx-auto px-6 mb-16"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            className="glass-card p-4 flex flex-col items-center text-center gap-2"
            style={{ borderColor: stat.color + '33' }}
          >
            <span style={{ color: stat.color }}>{stat.icon}</span>
            <span
              className="text-2xl font-black font-mono"
              style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}` }}
            >
              {stat.value}
            </span>
            <span
              className="text-xs font-mono leading-tight"
              style={{ color: 'var(--color-text-dim)' }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Accuracy progress bar */}
      {validated > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 p-3 rounded-xl border"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-dim)' }}>
              Validation record ({validated} resolved)
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
              {accurate} correct · {inaccurate} incorrect
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--color-inaccurate-glow)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--color-accurate)' }}
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
