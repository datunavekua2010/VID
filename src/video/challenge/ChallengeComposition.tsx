import { loadFont } from '@remotion/fonts';
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { ReactNode } from 'react';
import { Mascot } from './Mascot';
import { CHALLENGE_DURATION } from './constants';

loadFont({ family: 'Noto Georgian', url: staticFile('fonts/georgian-600.woff2'), weight: '600' });
loadFont({ family: 'Fraunces', url: staticFile('fonts/fraunces-600.woff2'), weight: '600' });
loadFont({ family: 'DM Sans', url: staticFile('fonts/dm-sans-600.woff2'), weight: '600' });

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const GREEN = '#2f6f5e';
const DEEP = '#24463d';
const CREAM = '#fffaf0';
const GOLD = '#e6b34b';

function Shell({ children }: { children: ReactNode }) {
  const frame = useCurrentFrame();
  const opacity = frame === 0 ? 1 : interpolate(frame, [0, 10], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity, backgroundColor: CREAM, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="challengeBg" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#fffaf0" /><stop offset="0.55" stopColor="#f8f3e4" /><stop offset="1" stopColor="#edf4e9" />
          </linearGradient>
          <pattern id="challengeDots" width="72" height="72" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="14" r="2" fill="#2f6f5e" opacity="0.08" />
            <circle cx="48" cy="48" r="1.5" fill="#e07b24" opacity="0.08" />
          </pattern>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#24463d" floodOpacity="0.14" />
          </filter>
        </defs>
        <rect width="1080" height="1920" fill="url(#challengeBg)" />
        <rect width="1080" height="1920" fill="url(#challengeDots)" />
        <circle cx="930" cy="250" r="210" fill="#dcead9" opacity="0.55" />
        <circle cx="120" cy="1680" r="260" fill="#dcead9" opacity="0.45" />
        <path d="M90 1760 Q540 1715 990 1760" fill="none" stroke="#c9dcc9" strokeWidth="5" opacity="0.7" />
        {children}
      </svg>
    </AbsoluteFill>
  );
}

function GeorgianText({ x, y, lines, size = 58, fill = DEEP, anchor = 'middle', weight = 600 }: { x: number; y: number; lines: string[]; size?: number; fill?: string; anchor?: 'middle' | 'start'; weight?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={fill} fontFamily="Noto Georgian, sans-serif" fontSize={size} fontWeight={weight} letterSpacing="-1">
      {lines.map((line, i) => <tspan key={line} x={x} dy={i === 0 ? 0 : size * 1.18}>{line}</tspan>)}
    </text>
  );
}

function MathCard({ y = 700, scale = 1 }: { y?: number; scale?: number }) {
  const frame = useCurrentFrame();
  const pop = spring({ frame, fps: 30, config: { damping: 18, stiffness: 120 } });
  return (
    <g transform={`translate(540 ${y}) scale(${scale * (0.92 + pop * 0.08)})`} filter="url(#softShadow)">
      <rect x="-450" y="-190" width="900" height="380" rx="42" fill="#ffffff" stroke="#d9e6d5" strokeWidth="5" />
      <path d="M-450 -118 Q0 -138 450 -118" fill="none" stroke="#eef3e7" strokeWidth="4" />
      <text x="0" y="42" textAnchor="middle" fill={DEEP} fontFamily="Fraunces, DM Sans, sans-serif" fontSize="96" fontWeight="600" letterSpacing="-1" textLength="760" lengthAdjust="spacingAndGlyphs">48 ÷ 6 × 2 + 5 = ?</text>
      <path d="M-250 118 H250" stroke={GOLD} strokeWidth="7" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function HookScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 20, stiffness: 85 } });
  const x = 540 + (1 - enter) * 120;
  const y = 1120 + (1 - enter) * 90;
  const scale = 0.78 + enter * 0.22;
  const textOpacity = interpolate(frame, [4, 18], [0, 1], clamp);
  const textY = 285 + (1 - textOpacity) * 18;
  return (
    <Shell>
      <g opacity={textOpacity}>
        <rect x="90" y="150" width="900" height="430" rx="38" fill="#ffffff" opacity="0.72" stroke="#d9e6d5" strokeWidth="4" />
        <GeorgianText x={540} y={textY} lines={['„10 წამი გაქვს, რომ', 'დაამტკიცო, რომ მე-4', 'კლასელზე ჭკვიანი ხარ!“']} size={54} />
      </g>
      <Mascot x={x} y={y} scale={scale} frame={frame} expression="challenge" pose="point" />
      <path d="M145 1575 H935" stroke="#d9e6d5" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    </Shell>
  );
}

function ChallengeScene() {
  const frame = useCurrentFrame();
  const bubble = interpolate(frame, [8, 24], [0, 1], clamp);
  return (
    <Shell>
      <MathCard y={700} />
      <g opacity={bubble} transform={`translate(0 ${(1 - bubble) * 18})`}>
        <rect x="120" y="430" width="380" height="128" rx="32" fill="#ffffff" stroke="#d9e6d5" strokeWidth="4" filter="url(#softShadow)" />
        <path d="M430 558 L500 610 L455 558Z" fill="#ffffff" stroke="#d9e6d5" strokeWidth="4" strokeLinejoin="round" />
        <GeorgianText x={310} y={510} lines={['აბა, ეს ამოხსენი!']} size={42} fill={GREEN} />
      </g>
      <Mascot x={250} y={1280} scale={0.88} frame={frame} expression="challenge" pose="point" />
    </Shell>
  );
}

function CountdownScene() {
  const frame = useCurrentFrame();
  const progress = Math.min(1, frame / 239);
  const value = Math.max(0, Math.ceil(10 - progress * 10));
  const pulse = 1 + Math.sin(frame * 0.35) * 0.012;
  const pointing = frame % 72 < 20;
  const circumference = 2 * Math.PI * 132;
  return (
    <Shell>
      <g transform={`translate(540 360) scale(${pulse})`} filter="url(#softShadow)">
        <circle r="150" fill="#ffffff" stroke="#d9e6d5" strokeWidth="5" />
        <circle r="132" fill="none" stroke="#eef3e7" strokeWidth="16" />
        <circle r="132" fill="none" stroke={GREEN} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * progress} transform="rotate(-90)" />
        <text x="0" y="58" textAnchor="middle" fill={DEEP} fontFamily="Fraunces, DM Sans, sans-serif" fontSize="150" fontWeight="600">{value}</text>
      </g>
      <MathCard y={700} scale={0.94} />
      <Mascot x={250} y={1280} scale={0.88} frame={frame} expression={pointing ? 'challenge' : 'thinking'} pose={pointing ? 'point' : 'watch'} />
    </Shell>
  );
}

function CtaScene() {
  const frame = useCurrentFrame();
  const surprised = frame < 34;
  const textOpacity = interpolate(frame, [0, 14], [0, 1], clamp);
  const brandOpacity = interpolate(frame, [28, 52], [0, 1], clamp);
  return (
    <Shell>
      <g opacity={textOpacity}>
        <rect x="90" y="180" width="900" height="330" rx="38" fill="#ffffff" opacity="0.78" stroke="#d9e6d5" strokeWidth="4" />
        <GeorgianText x={540} y={300} lines={['„შენი პასუხი კომენტარებში', 'დაწერე!“']} size={56} fill={GREEN} />
        <g transform="translate(540 455)">
          <circle r="42" fill={GREEN} />
          <path d="M-18 -12 L0 10 L18 -12" fill="none" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <Mascot x={540} y={990} scale={1} frame={frame} expression={surprised ? 'surprised' : 'happy'} pose="down" />
      <g opacity={brandOpacity} transform={`translate(0 ${(1 - brandOpacity) * 18})`} filter="url(#softShadow)">
        <rect x="235" y="1450" width="610" height="140" rx="70" fill={GREEN} />
        <circle cx="330" cy="1520" r="42" fill="#ffffff" />
        <path d="M310 1542 L330 1498 L350 1542 M318 1528 H342" fill="none" stroke={GREEN} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <text x="590" y="1540" textAnchor="middle" fill="#ffffff" fontFamily="Fraunces, Georgia, serif" fontSize="52" fontWeight="600" letterSpacing="-1">Axiom Academy</text>
      </g>
    </Shell>
  );
}

export function ChallengeComposition() {
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <Audio src={staticFile('audio/challenge-bed.wav')} volume={0.5} />
      <Sequence from={0} durationInFrames={98} name="01 The hook"><HookScene /></Sequence>
      <Sequence from={90} durationInFrames={98} name="02 The challenge"><ChallengeScene /></Sequence>
      <Sequence from={180} durationInFrames={248} name="03 The countdown"><CountdownScene /></Sequence>
      <Sequence from={420} durationInFrames={90} name="04 Comment your answer"><CtaScene /></Sequence>
      <Sequence from={0} durationInFrames={90}><Audio src={staticFile('audio/voice-hook.mp3')} volume={1} /></Sequence>
      <Sequence from={96} durationInFrames={72}><Audio src={staticFile('audio/voice-challenge.mp3')} volume={1} /></Sequence>
      <Sequence from={424} durationInFrames={84}><Audio src={staticFile('audio/voice-cta.mp3')} volume={1} /></Sequence>
      <Sequence from={0} durationInFrames={CHALLENGE_DURATION} />
    </AbsoluteFill>
  );
}
