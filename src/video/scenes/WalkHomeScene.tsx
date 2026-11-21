import { interpolate, useCurrentFrame } from 'remotion';
import { Boy } from '../components/Boy';
import { Camera, clamp, SceneFrame } from '../components/SceneFrame';

function House({ x, y, color = '#e5ba99', roof = '#a46f5c', scale = 1 }: { x: number; y: number; color?: string; roof?: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 145 L190 0 L380 145 L380 420 L0 420Z" fill={color} stroke="#b3886e" strokeWidth="6" />
      <path d="M-24 150 L190-18 L405 150 L380 166 L190 20 L0 166Z" fill={roof} stroke="#906552" strokeWidth="6" />
      <path d="M270 70V-15h48v126" fill={roof} stroke="#906552" strokeWidth="5" />
      <path d="M55 207h95v108H55Z M231 207h95v108h-95Z" fill="#dce1cb" stroke="#9e7960" strokeWidth="8" />
      <path d="M102 207v108 M55 260h95 M278 207v108 M231 260h95" stroke="#a4846b" strokeWidth="6" />
      <path d="M163 420V306 Q163 275 192 275 Q222 275 222 306 V420Z" fill="#7b8d7d" stroke="#8b715a" strokeWidth="6" />
      <circle cx="207" cy="352" r="5" fill="#eed49e" />
      <path d="M-10 420h400" stroke="#aa896d" strokeWidth="12" strokeLinecap="round" />
    </g>
  );
}

export function WalkHomeScene() {
  const frame = useCurrentFrame();
  const travel = interpolate(frame, [0, 120], [0, -155], clamp);
  return (
    <SceneFrame>
      <Camera scale={1.035}>
        <defs>
          <linearGradient id="sunsetSky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#f3d9b6" /><stop offset="1" stopColor="#e9b990" /></linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#sunsetSky)" />
        <circle cx="863" cy="330" r="144" fill="#fff0c6" opacity=".78" />
        <path d="M0 850 Q250 666 510 821 Q769 657 1080 803 L1080 1320 L0 1320Z" fill="#bbbea0" />
        <path d="M0 965 Q250 815 508 932 Q790 824 1080 910 L1080 1360 L0 1360Z" fill="#9eae93" />
        <g transform={`translate(${travel * 0.62} 0)`}>
          <House x={-100} y={610} scale={1.04} />
          <House x={395} y={694} color="#e6c49f" roof="#9d7763" scale={0.82} />
          <House x={827} y={590} color="#dfb398" roof="#a46d61" scale={1.02} />
          <House x={1290} y={690} color="#e8caa2" scale={0.84} />
          <path d="M0 1131 Q55 1056 111 1125 Q161 1044 227 1118 Q289 1051 351 1135 L351 1300 H0Z" fill="#7b9b81" />
          <path d="M756 1136 Q804 1057 859 1119 Q919 1050 977 1118 Q1044 1047 1125 1129 L1125 1300 H756Z" fill="#78977c" />
          <path d="M-50 1205h1490" stroke="#d5c19b" strokeWidth="18" />
          {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${i * 82} 1167v100`} stroke="#e8d4ae" strokeWidth="12" strokeLinecap="round" />)}
        </g>
        <path d="M0 1320 Q370 1247 1080 1316 L1080 1920 L0 1920Z" fill="#c5aa83" />
        <path d="M0 1450 Q535 1338 1080 1432 L1080 1920 L0 1920Z" fill="#dfc59e" />
        <path d="M0 1581 Q453 1465 1080 1560 M-30 1740 Q550 1614 1110 1710" fill="none" stroke="#c9ad88" strokeWidth="8" opacity=".5" />
        <Boy x={500 + frame * 0.18} y={795} scale={1.55} frame={frame} expression="sad" pose="walking" backpack />
        <g transform={`translate(${travel * 2.1} 0)`}>
          <path d="M1190 1920 Q1121 1585 1167 1065 Q1172 826 1228 578 L1352 570 Q1277 919 1282 1173 Q1303 1569 1379 1920Z" fill="#785c47" />
          <path d="M1204 771 Q1094 659 1031 544 M1260 714 Q1365 592 1441 534" fill="none" stroke="#785c47" strokeWidth="39" strokeLinecap="round" />
          <path d="M1008 567 Q967 493 1045 455 Q1039 387 1113 369 Q1142 302 1212 345 Q1282 277 1342 339 Q1432 321 1452 411 Q1531 440 1482 522 Q1514 604 1438 626 Q1385 682 1321 631 Q1249 698 1192 640 Q1114 678 1084 615 Q1029 626 1008 567Z" fill="#6d8c72" />
          <path d="M1050 528 Q1100 478 1140 514 M1240 397 Q1300 374 1340 417 M1350 542 Q1400 505 1451 533" fill="none" stroke="#a7b793" strokeWidth="12" strokeLinecap="round" opacity=".65" />
        </g>
        <g fill="#aa8c62" opacity=".8">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = ((i * 183 + 90 + frame * (0.8 + i * 0.07)) % 1150) - 35;
            const y = 1180 + i * 75 + Math.sin(frame * 0.06 + i) * 22;
            return <path key={i} d={`M${x} ${y}q18-17 33 0q-18 17-33 0Z`} transform={`rotate(${frame * 0.7 + i * 40} ${x} ${y})`} />;
          })}
        </g>
        <path d="M0 1842 Q90 1740 153 1842 Q228 1731 307 1842 L307 1920 H0Z M858 1872 Q947 1727 1080 1817 V1920 H858Z" fill="#6f8e71" opacity=".86" />
      </Camera>
    </SceneFrame>
  );
}