import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Boy } from '../components/Boy';
import { ClassroomBackground, ClassroomForeground } from '../components/Environments';
import { Backpack, Homework } from '../components/Objects';
import { Camera, clamp, SceneFrame } from '../components/SceneFrame';

export function ClassroomScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const disappointment = Math.min(1, spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 22, stiffness: 75 } }));
  const paperX = interpolate(frame, [0, 10, 39, 104, 145], [1030, 1030, 380, 380, 93], clamp);
  const paperY = interpolate(frame, [0, 105, 145], [1280, 1280, 1457], clamp);
  const paperScale = interpolate(frame, [105, 145], [1, 0.45], clamp);
  const handExit = interpolate(frame, [36, 61], [0, 570], clamp);
  const camera = interpolate(frame, [0, 150], [1, 1.055], clamp);

  return (
    <SceneFrame first>
      <Camera scale={camera}>
        <ClassroomBackground />
        <path d="M380 1110 Q380 980 540 972 Q700 980 700 1110 L695 1350 L385 1350Z" fill="#9b795b" stroke="#86674e" strokeWidth="8" />
        <Boy x={540} y={650 + disappointment * 9} scale={1.62} frame={frame} expression="sad" sadness={disappointment} pose="sitting" />
        <ClassroomForeground />
        <Backpack x={37} y={1465} scale={0.98} />
        <Homework x={paperX} y={paperY} scale={paperScale} grade="C" rotation={-6} />
        {frame > 102 && <ellipse cx={paperX + 15} cy={paperY + 95 * paperScale} rx={20 * paperScale} ry={29 * paperScale} fill="url(#skin)" stroke="#b47e61" strokeWidth="3" opacity={interpolate(frame, [102, 112, 140, 148], [0, 1, 1, 0], clamp)} />}
        {frame < 62 && (
          <g transform={`translate(${paperX + 248 + handExit} ${paperY - 32})`}>
            <path d="M443-75 Q307-60 230-20 Q176 7 128 32 L76 42 Q48 44 48 63 Q50 78 72 78 L136 67 Q189 63 240 45 L458 30Z" fill="url(#skin)" stroke="#ba896c" strokeWidth="5" />
            <path d="M427-81 Q367-72 336-57 L364 55 L458 30Z" fill="#eee4d4" stroke="#d2c4af" strokeWidth="6" />
            <path d="M79 42q-25-11-33-3 M80 53q-23-7-32-1" fill="none" stroke="#c19072" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </Camera>
    </SceneFrame>
  );
}