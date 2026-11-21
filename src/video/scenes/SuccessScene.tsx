import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Boy } from '../components/Boy';
import { ClassroomBackground, ClassroomForeground } from '../components/Environments';
import { Backpack, Homework } from '../components/Objects';
import { Camera, clamp, SceneFrame } from '../components/SceneFrame';

export function SuccessScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 19, stiffness: 60 } });
  const paperX = interpolate(frame, [0, 34, 60, 100], [1030, 380, 380, 380], clamp);
  const paperY = interpolate(frame, [0, 60, 100], [1280, 1280, 1078], clamp);
  const paperScale = interpolate(frame, [60, 100], [1, 1.12], clamp);
  const handExit = interpolate(frame, [34, 57], [0, 570], clamp);
  const camera = interpolate(frame, [0, 150], [1, 1.07], clamp);

  return (
    <SceneFrame>
      <Camera scale={camera}>
        <ClassroomBackground bright={lift} />
        <path d="M380 1110 Q380 980 540 972 Q700 980 700 1110 L695 1350 L385 1350Z" fill="#9b795b" stroke="#86674e" strokeWidth="8" />
        <Boy x={540} y={659 - lift * 16} scale={1.62} frame={frame} expression="happy" happiness={interpolate(frame, [45, 75], [0, 1], clamp)} pose="sitting" />
        <ClassroomForeground />
        <Backpack x={37} y={1465} scale={0.98} />
        <Homework x={paperX} y={paperY} scale={paperScale} grade="A" rotation={-4} />
        {frame > 75 && <g opacity={interpolate(frame, [75, 100], [0, 1], clamp)} fill="url(#skin)" stroke="#b47e61" strokeWidth="4"><ellipse cx="373" cy={paperY + 165} rx="22" ry="34" transform={`rotate(-15 373 ${paperY + 165})`} /><ellipse cx="742" cy={paperY + 145} rx="22" ry="34" transform={`rotate(15 742 ${paperY + 145})`} /></g>}
        {frame < 58 && <g transform={`translate(${paperX + 248 + handExit} ${paperY - 32})`}><path d="M443-75 Q307-60 230-20 Q176 7 128 32 L76 42 Q48 44 48 63 Q50 78 72 78 L136 67 Q189 63 240 45 L458 30Z" fill="url(#skin)" stroke="#ba896c" strokeWidth="5" /><path d="M427-81 Q367-72 336-57 L364 55 L458 30Z" fill="#eee4d4" stroke="#d2c4af" strokeWidth="6" /></g>}
      </Camera>
    </SceneFrame>
  );
}