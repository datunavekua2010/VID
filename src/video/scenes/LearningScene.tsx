import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Boy } from '../components/Boy';
import { Laptop } from '../components/Objects';
import { StudyDesk } from '../components/Environments';
import { Camera, clamp, SceneFrame } from '../components/SceneFrame';

export function LearningScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 22, stiffness: 70 } });
  const choicesOpacity = interpolate(frame, [72, 92], [1, 0], clamp);
  const modelOpacity = interpolate(frame, [78, 100], [0, 1], clamp);
  const group = interpolate(frame, [102, 138], [0, 1], clamp);
  const success = spring({ frame: Math.max(0, frame - 139), fps, config: { damping: 18, stiffness: 90 } });
  const wrong = interpolate(frame, [30, 36, 67, 78], [0, 1, 1, 0], clamp);

  return (
    <SceneFrame>
      <Camera scale={1.025}>
        <defs>
          <linearGradient id="learningSky" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3d7167" /><stop offset="1" stopColor="#233f45" /></linearGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#learningSky)" />
        <circle cx="540" cy="900" r="620" fill="url(#portalGlow)" opacity=".32" />
        <ellipse cx="530" cy="955" rx="490" ry="670" fill="none" stroke="#9fc8ad" strokeWidth="4" opacity=".3" transform={`rotate(${frame * 0.08} 530 955)`} />
        <ellipse cx="530" cy="955" rx="440" ry="590" fill="none" stroke="#e4cd88" strokeWidth="3" strokeDasharray="8 20" opacity=".35" transform={`rotate(${-frame * 0.06} 530 955)`} />
        <g fill="#f3d48b" opacity=".8">
          <circle cx="133" cy="451" r="6" /><circle cx="922" cy="340" r="7" /><circle cx="949" cy="1280" r="5" /><circle cx="89" cy="1121" r="5" />
          <path d="M875 494l8 19 19 8-19 8-8 19-8-19-19-8 19-8Z" /><path d="M164 1318l6 14 14 6-14 6-6 14-6-14-14-6 14-6Z" />
        </g>
        <g opacity={interpolate(frame, [8, 25], [0, 1], clamp)}>
          <text x="540" y="216" textAnchor="middle" fill="#fff5de" fontFamily="Noto Georgian, sans-serif" fontSize="55" fontWeight="600">„შეცდომა დასასრული</text>
          <text x="540" y="295" textAnchor="middle" fill="#fff5de" fontFamily="Noto Georgian, sans-serif" fontSize="55" fontWeight="600">არ არის.“</text>
        </g>
        <g transform={`translate(0 ${(1 - entrance) * 35})`} opacity={entrance}>
          <path d="M122 429 Q537 410 958 429 L962 1212 Q540 1233 118 1212Z" fill="#162f32" opacity=".18" transform="translate(8 16)" />
          <path d="M122 429 Q537 410 958 429 L962 1212 Q540 1233 118 1212Z" fill="#fff5dc" stroke="#dfd0af" strokeWidth="5" />
          <path d="M165 478 Q535 469 914 478" fill="none" stroke="#e9dbbd" strokeWidth="4" />
          <text x="540" y="625" textAnchor="middle" fill="#294e45" fontFamily="Fraunces, Georgia, serif" fontSize="108" fontWeight="600">2 + 3 = ?</text>
          <g opacity={choicesOpacity}>
            {[4, 6, 5].map((answer, i) => {
              const x = 290 + i * 250;
              return <g key={answer}><circle cx={x} cy="835" r="86" fill={answer === 6 && wrong > 0 ? '#f7e0d1' : '#f8eed6'} stroke={answer === 6 && wrong > 0 ? '#bd7665' : '#d5c8a8'} strokeWidth="6" /><text x={x} y="863" textAnchor="middle" fill="#47655a" fontFamily="DM Sans, sans-serif" fontSize="75" fontWeight="600">{answer}</text></g>;
            })}
            <g opacity={wrong} transform="translate(616 742)"><circle r="28" fill="#ba7666" /><path d="M-10-10l20 20m0-20l-20 20" stroke="#fff5df" strokeWidth="6" strokeLinecap="round" /></g>
            <path d="M253 1046h574" stroke="#e0d5bd" strokeWidth="5" strokeLinecap="round" />
          </g>
          <g opacity={modelOpacity}>
            <g opacity={1 - group} fill="#658177" fontFamily="DM Sans, sans-serif" fontSize="48" fontWeight="600" textAnchor="middle"><text x="335" y="751">2</text><text x="553" y="765">+</text><text x="744" y="751">3</text></g>
            {[0, 1, 2, 3, 4].map((i) => {
              const start = [280, 390, 650, 760, 870][i];
              const end = 300 + i * 120;
              const x = start + (end - start) * group;
              return <g key={i}><circle cx={x} cy="864" r="42" fill={i < 2 ? '#dfb65f' : '#83b3a9'} stroke={i < 2 ? '#c89f50' : '#6c9d92'} strokeWidth="4" /><circle cx={x - 12} cy="850" r="8" fill="#fff8df" opacity=".45" /></g>;
            })}
            <g opacity={Math.min(1, success)}>
              <text x="516" y="1067" textAnchor="middle" fill="#376e58" fontFamily="Fraunces, Georgia, serif" fontSize="92" fontWeight="600">= 5</text>
              <g transform={`translate(686 1030) scale(${Math.min(1, success)})`}><circle r="34" fill="#6a9e79" /><path d="M-16 0l11 11 23-25" fill="none" stroke="#fff9e8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></g>
            </g>
          </g>
        </g>
        <Boy x={252} y={1282} scale={1.04} frame={frame} expression="happy" happiness={interpolate(frame, [138, 165], [0, 1], clamp)} pose="sitting" />
        <g transform="translate(0 230)"><StudyDesk /></g>
        <Laptop x={483} y={1588} scale={1.03} open={1} glow={0.8} />
      </Camera>
    </SceneFrame>
  );
}