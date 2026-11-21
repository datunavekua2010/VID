import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Boy } from '../components/Boy';
import { StudyBackground, StudyDesk } from '../components/Environments';
import { Backpack, Homework, Laptop, Portal } from '../components/Objects';
import { Camera, clamp, SceneFrame } from '../components/SceneFrame';

export function PortalScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = interpolate(frame, [26, 64], [0.02, 1], clamp);
  const portal = Math.min(1, spring({ frame: Math.max(0, frame - 54), fps, config: { damping: 24, stiffness: 52 } }));
  const camera = interpolate(frame, [0, 180], [1, 1.06], clamp);
  const noteX = interpolate(frame, [0, 26, 48], [70, 155, 145], clamp);
  const noteY = interpolate(frame, [0, 26, 48], [1517, 1280, 1290], clamp);
  const noteScale = interpolate(frame, [0, 30], [0.4, 0.62], clamp);

  return (
    <SceneFrame>
      <Camera scale={camera}>
        <StudyBackground />
        <Portal x={740} y={873} frame={frame} progress={portal} scale={1.03} />
        <path d="M122 1238 Q111 1040 273 1030 Q435 1040 423 1238 L413 1497 L133 1497Z" fill="#9a775a" stroke="#80634d" strokeWidth="8" />
        <Boy x={286} y={720} scale={1.38} frame={frame} expression={frame < 64 ? 'sad' : 'curious'} pose="sitting" />
        <ellipse cx="346" cy="915" rx="175" ry="222" fill="#c3e8c9" opacity={portal * 0.15} />
        <StudyDesk />
        <Backpack x={36} y={1520} scale={0.8} />
        <Homework x={noteX} y={noteY} scale={noteScale} rotation={-8} />
        {frame < 55 && <ellipse cx={noteX + 14} cy={noteY + 78 * noteScale} rx="14" ry="19" fill="url(#skin)" stroke="#b47e61" strokeWidth="3" opacity={interpolate(frame, [0, 9, 42, 55], [0, 1, 1, 0], clamp)} />}
        <Laptop x={522} y={1353} scale={1.05} open={open} glow={portal} />
      </Camera>
    </SceneFrame>
  );
}