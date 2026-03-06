import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ChevronDown, Tag, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { Prediction, PredictionStatus } from '../types';
import clsx from 'clsx';

interface Props {
  prediction: Prediction;
  index: number;
  side: 'left' | 'right';
}

const STATUS_CONFIG: Record<PredictionStatus, {
  label: string;
  icon: typeof CheckCircle2;
  colorVar: string;
  glowVar: string;
  bgVar: string;
  className: string;
}> = {
  accurate: {
    label: 'Accurate',
    icon: CheckCircle2,
    colorVar: 'var(--color-accurate)',
    glowVar: 'var(--color-accurate-glow)',
    bgVar: 'rgba(16, 185, 129, 0.08)',
    className: 'status-accurate',
  },
  inaccurate: {
    label: 'Inaccurate',
    icon: XCircle,
    colorVar: 'var(--color-inaccurate)',
    glowVar: 'var(--color-inaccurate-glow)',
    bgVar: 'rgba(239, 68, 68, 0.08)',
    className: 'status-inaccurate',
  },
  pending: {
    label: 'Prediction Pending',
    icon: Clock,
    colorVar: 'var(--color-pending)',
    glowVar: 'var(--color-pending-glow)',
    bgVar: 'rgba(99, 102, 241, 0.08)',
    className: 'status-pending',
  },
};

export default function PredictionCard({ prediction, index, side }: Props) {
  const [expanded, setExpanded] = useState(false);
  const config = STATUS_CONFIG[prediction.status];
  const StatusIcon = config.icon;

  const predDate = parseISO(prediction.date);
  const validDate = parseISO(prediction.validationDate);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={clsx('w-full cursor-pointer', config.className)}
      style={{
        background: config.bgVar,
        backdropFilter: 'blur(var(--effect-card-blur))',
        WebkitBackdropFilter: 'blur(var(--effect-card-blur))',
        borderRadius: 'var(--effect-border-radius)',
        border: `1px solid ${config.colorVar}33`,
        transition: 'all var(--anim-transition) ease',
      }}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.01 }}
    >
      <div className="p-5 md:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Category + status */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full border"
              style={{
                color: config.colorVar,
                borderColor: config.colorVar + '44',
                background: config.colorVar + '11',
              }}
            >
              {prediction.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs font-mono"
              style={{ color: config.colorVar }}
            >
              <StatusIcon size={13} />
              {config.label}
            </span>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
            style={{ color: 'var(--color-text-dim)' }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>

        {/* Prediction text */}
        <p
          className="text-base md:text-lg font-semibold leading-relaxed mb-4"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {prediction.prediction}
        </p>

        {/* Confidence bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-dim)' }}>
              AI Confidence
            </span>
            <span
              className="text-xs font-mono font-semibold"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {prediction.confidence}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              className="h-full rounded-full confidence-bar-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${prediction.confidence}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Dates row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--color-text-dim)' }}>
            <Calendar size={11} />
            Predicted: <span style={{ color: 'var(--color-text-secondary)' }}>{format(predDate, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--color-text-dim)' }}>
            <Calendar size={11} />
            Validates: <span style={{ color: config.colorVar }}>{format(validDate, 'MMM d, yyyy')}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {prediction.tags.map(tag => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded"
              style={{
                color: 'var(--color-text-dim)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable outcome */}
      <AnimatePresence>
        {expanded && prediction.outcome && (
          <motion.div
            key="outcome"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-5 md:px-6 pb-5 md:pb-6 pt-0"
              style={{ borderTop: `1px solid ${config.colorVar}22` }}
            >
              <div
                className="mt-4 p-4 rounded-lg"
                style={{
                  background: config.colorVar + '0d',
                  border: `1px solid ${config.colorVar}22`,
                }}
              >
                <div
                  className="text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-2"
                  style={{ color: config.colorVar }}
                >
                  <StatusIcon size={12} />
                  Outcome
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {prediction.outcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {expanded && prediction.status === 'pending' && (
          <motion.div
            key="pending-message"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <div
                className="mt-4 p-4 rounded-lg"
                style={{
                  background: 'var(--color-pending-glow)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                }}
              >
                <p
                  className="text-sm font-mono italic"
                  style={{ color: 'var(--color-text-dim)' }}
                >
                  ⏳ Awaiting validation. This prediction will be resolved on {format(validDate, 'MMMM d, yyyy')}.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
