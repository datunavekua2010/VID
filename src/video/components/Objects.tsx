import { interpolate } from 'remotion';
import { clamp } from './SceneFrame';

export function Backpack({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M45 62 Q44 9 99 12 Q155 9 155 62" fill="none" stroke="#315b70" strokeWidth="17" strokeLinecap="round" />
      <path d="M29 90 Q30 49 69 44 L137 44 Q176 48 180 91 L185 215 Q185 244 154 249 L51 249 Q19 245 20 214Z" fill="url(#bag)" stroke="#365f76" strokeWidth="5" />
      <path d="M42 84 Q43 59 69 58 L134 58 Q156 62 163 83" fill="none" stroke="#a1c2ce" strokeWidth="7" opacity=".6" />
      <path d="M48 165 Q51 148 68 146 L140 146 Q157 148 160 166 L160 213 Q157 230 139 231 L69 231 Q49 228 48 213Z" fill="#6091aa" stroke="#365f76" strokeWidth="4" />
      <path d="M57 169 Q100 160 151 169" fill="none" stroke="#b8d1d8" strokeWidth="3" opacity=".8" />
      <path d="M95 74v22" stroke="#f5d27e" strokeWidth="7" strokeLinecap="round" />
      <path d="M33 111l-8 67M174 111l8 67" stroke="#315b70" strokeWidth="7" opacity=".65" />
    </g>
  );
}

export function Homework({ x, y, scale = 1, grade = 'C', rotation = -5 }: { x: number; y: number; scale?: number; grade?: 'C' | 'A'; rotation?: number }) {
  const color = grade === 'A' ? '#37765a' : '#b85f51';
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
      <path d="M6 9 L317 0 L325 229 L0 237Z" fill="#846846" opacity=".16" transform="translate(8 10)" />
      <path d="M6 9 L317 0 L325 229 L0 237Z" fill="#fff8e8" stroke="#d8c9ad" strokeWidth="3" />
      <path d="M28 48l136-4M28 78l113-3M28 109l158-4M28 140l118-3M28 172l151-5" stroke="#b0bdba" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      <path d="M27 26l94-3" stroke="#dcbd8a" strokeWidth="5" strokeLinecap="round" />
      <text x="232" y="99" fill={color} fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="92" textAnchor="middle">{grade}</text>
      {grade === 'C' && <path d="M267 64h23" stroke={color} strokeWidth="6" strokeLinecap="round" />}
      {grade === 'A' && <path d="M206 113q27 14 57-2" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />}
    </g>
  );
}

export function ClassroomDesk() {
  return (
    <g>
      <path d="M100 1282 L944 1273 L1084 1356 L12 1371Z" fill="#dcaa76" stroke="#9b704d" strokeWidth="7" />
      <path d="M12 1369 L1084 1355 L1084 1455 L12 1468Z" fill="#b27a4d" stroke="#986a48" strokeWidth="6" />
      <path d="M76 1467 L1003 1454 L1001 1920 L76 1920Z" fill="url(#wood)" />
      <path d="M92 1508 Q474 1491 997 1498 M93 1580 Q525 1559 995 1573 M93 1753 Q545 1736 1001 1745" fill="none" stroke="#8d6142" strokeWidth="4" opacity=".22" />
      <path d="M47 1398 Q525 1380 1044 1390" fill="none" stroke="#f5cea0" strokeWidth="6" opacity=".35" />
      <path d="M730 1331l151-6" stroke="#f8d5a6" strokeWidth="4" strokeLinecap="round" opacity=".65" />
      <g transform="translate(745 1289) rotate(-6)">
        <path d="M0 12L168 12" stroke="#d3a44f" strokeWidth="13" strokeLinecap="round" />
        <path d="M167 6l21 6-21 6" fill="#e6c28e" /><path d="M183 10l5 2-5 2" fill="#5b5149" />
      </g>
    </g>
  );
}

export function Laptop({ x, y, scale = 1, open = 1, glow = 0 }: { x: number; y: number; scale?: number; open?: number; glow?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="220" cy="18" rx="242" ry="34" fill="#6b5948" opacity=".2" />
      <g transform={`scale(1 ${Math.max(0.02, open)})`}>
        <path d="M20 -12 L27 -312 Q29 -330 47 -330 L394 -330 Q412 -329 414 -309 L423 -12Z" fill="#344a4b" stroke="#293f41" strokeWidth="8" />
        <path d="M45 -36 L50 -298 L390 -298 L397 -36Z" fill="#f5f1df" />
        <path d="M50 -298h340l1 51H49Z" fill="#e0eadb" />
        <text x="70" y="-263" fill="#2f6255" fontFamily="DM Sans, sans-serif" fontSize="29" fontWeight="700">axi</text>
        <path d="M181 -272h124 M181 -255h82" stroke="#a2bcae" strokeWidth="6" strokeLinecap="round" />
        <rect x="72" y="-219" width="291" height="132" rx="12" fill="#fffdf3" stroke="#dbe5d9" strokeWidth="3" />
        <text x="97" y="-164" fill="#4e6f60" fontFamily="DM Sans, sans-serif" fontSize="35" fontWeight="600">2 + 3 = ?</text>
        <circle cx="103" cy="-118" r="10" fill="#e4bd64" /><circle cx="140" cy="-118" r="10" fill="#e4bd64" />
        <circle cx="192" cy="-118" r="10" fill="#8cbcb4" /><circle cx="229" cy="-118" r="10" fill="#8cbcb4" /><circle cx="266" cy="-118" r="10" fill="#8cbcb4" />
        <path d="M45 -36 L50 -298 L390 -298 L397 -36Z" fill="#a5e2cf" opacity={glow * 0.2} />
      </g>
      <path d="M18 -12 L423 -12 L465 27 Q465 37 447 40 L-4 40 Q-20 37-19 27Z" fill="#a4b6ae" stroke="#526e68" strokeWidth="6" />
      <path d="M165 10h118l13 15H153Z" fill="#7f9991" />
      <path d="M-7 31q220 11 459 0" fill="none" stroke="#d2ddd1" strokeWidth="4" />
    </g>
  );
}

export function Portal({ x, y, frame, progress = 1, scale = 1 }: { x: number; y: number; frame: number; progress?: number; scale?: number }) {
  const p = Math.max(0.001, progress);
  const symbols = ['+', '3', '△', '=', '5', '×', '○', '2'];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * p})`} opacity={interpolate(p, [0, 0.4, 1], [0, 0.8, 1], clamp)}>
      <circle r="450" fill="url(#portalGlow)" />
      <circle r="236" fill="#d8ead0" opacity=".18" />
      <ellipse rx="261" ry="210" fill="none" stroke="#f4d47d" strokeWidth="8" opacity=".8" transform={`rotate(${frame * 0.13})`} />
      <ellipse rx="224" ry="265" fill="none" stroke="#94d1bf" strokeWidth="7" opacity=".8" transform={`rotate(${-frame * 0.16})`} />
      <ellipse rx="195" ry="235" fill="none" stroke="#f7e1a9" strokeWidth="3" strokeDasharray="8 19" opacity=".9" transform={`rotate(${frame * 0.27})`} />
      <path d="M-118 64 Q-66-106 53-79 Q137-62 104 29 Q83 86 23 68 Q-16 56-4 19" fill="none" stroke="#eff4d3" strokeWidth="8" strokeLinecap="round" opacity=".75" />
      {symbols.map((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2 + frame * 0.007 * (i % 2 === 0 ? 1 : -1);
        const radius = 260 + (i % 3) * 28;
        return <text key={symbol + i} x={Math.cos(angle) * radius} y={Math.sin(angle) * radius} textAnchor="middle" dominantBaseline="middle" fill={i % 2 ? '#f4d27b' : '#e9f5de'} fontFamily="DM Sans, sans-serif" fontSize={i % 3 === 0 ? 63 : 49} fontWeight="600">{symbol}</text>;
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = i * 1.3 + frame * 0.012;
        return <circle key={i} cx={Math.cos(angle) * 180} cy={Math.sin(angle) * 155} r={4 + i % 3} fill="#fff3c9" opacity=".85" />;
      })}
    </g>
  );
}