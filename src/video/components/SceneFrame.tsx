import type { ReactNode } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export function SceneFrame({ children, first = false }: { children: ReactNode; first?: boolean }) {
  const frame = useCurrentFrame();
  const opacity = first ? 1 : interpolate(frame, [0, 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity, overflow: 'hidden', backgroundColor: '#eadbbf' }}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wall" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#f7e7c9" /><stop offset="1" stopColor="#d5b994" />
          </linearGradient>
          <linearGradient id="wood" x1="0" x2="0.8" y1="0" y2="1">
            <stop stopColor="#d7a671" /><stop offset="0.5" stopColor="#b67e4f" /><stop offset="1" stopColor="#95633f" />
          </linearGradient>
          <linearGradient id="skin" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#f5c69b" /><stop offset="1" stopColor="#d99572" />
          </linearGradient>
          <linearGradient id="sweater" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#56836d" /><stop offset="1" stopColor="#2e5e50" />
          </linearGradient>
          <linearGradient id="bag" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#719fba" /><stop offset="1" stopColor="#356783" />
          </linearGradient>
          <linearGradient id="night" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#425e70" /><stop offset="1" stopColor="#dba583" />
          </linearGradient>
          <radialGradient id="portalGlow">
            <stop stopColor="#ffedac" stopOpacity="0.9" /><stop offset="0.35" stopColor="#a9dbcc" stopOpacity="0.58" />
            <stop offset="0.72" stopColor="#79b9ac" stopOpacity="0.22" /><stop offset="1" stopColor="#79b9ac" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lampGlow">
            <stop stopColor="#fff3b7" stopOpacity="0.72" /><stop offset="1" stopColor="#fff3b7" stopOpacity="0" />
          </radialGradient>
          <pattern id="paperGrain" width="106" height="106" patternUnits="userSpaceOnUse">
            <path d="M8 23l5-1m54 8l4-1M25 78l4-1m54 9l5-1M91 7l3-1" stroke="#785d3e" strokeWidth="1.3" opacity=".28" />
            <circle cx="42" cy="12" r="1.2" fill="#785d3e" opacity=".25" />
            <circle cx="79" cy="59" r="1.1" fill="#fff" opacity=".7" />
            <circle cx="8" cy="96" r="1" fill="#fff" opacity=".6" />
            <circle cx="49" cy="57" r=".8" fill="#785d3e" opacity=".3" />
          </pattern>
        </defs>
        {children}
        <rect width="1080" height="1920" fill="url(#paperGrain)" opacity=".55" pointerEvents="none" />
      </svg>
    </AbsoluteFill>
  );
}

export function Camera({ children, scale = 1, x = 0, y = 0 }: { children: ReactNode; scale?: number; x?: number; y?: number }) {
  return <g transform={`translate(540 960) scale(${scale}) translate(-540 -960) translate(${x} ${y})`}>{children}</g>;
}