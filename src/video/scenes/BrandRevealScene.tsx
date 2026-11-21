import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Boy } from '../components/Boy';
import { clamp, SceneFrame } from '../components/SceneFrame';

export function BrandRevealScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 22, stiffness: 70 } });
  return (
    <SceneFrame>
      <rect width="1080" height="1920" fill="#fbf4e5" />
      <path d="M0 1530 Q238 1498 439 1546 Q754 1600 1080 1510 L1080 1920 H0Z" fill="#edf0df" />
      <path d="M0 1552 Q245 1527 444 1573 Q752 1624 1080 1538" fill="none" stroke="#d7dfc9" strokeWidth="4" />
      <g fill="none" stroke="#d2a956" strokeWidth="5" opacity=".8">
        <path d="M133 412h60m-30-30v60" strokeLinecap="round" /><circle cx="910" cy="352" r="25" />
        <path d="M166 1327h40m-40 14h40" strokeLinecap="round" />
      </g>
      <g transform={`translate(0 ${(1 - appear) * 30})`} opacity={appear}>
        <text x="112" y="682" fill="#263f42" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="145" letterSpacing="-5">Axiom</text>
        <text x="112" y="814" fill="#263f42" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="118" letterSpacing="-5">Academy</text>
        <path d="M116 867 Q300 876 550 866" fill="none" stroke="#d7b45c" strokeWidth="5" strokeLinecap="round" />
        <text x="540" y="1385" textAnchor="middle" fill="#2f6454" fontFamily="Noto Georgian, sans-serif" fontWeight="600" fontSize="66">„აბა, ვიფიქროთ!“</text>
      </g>
      <g opacity={interpolate(frame, [12, 28], [0, 1], clamp)}>
        <Boy x={805} y={670} scale={1} frame={frame} expression="happy" pose="wave" backpack />
      </g>
      <path d="M114 1650 Q540 1685 968 1650" fill="none" stroke="#dfe6d4" strokeWidth="3" />
    </SceneFrame>
  );
}