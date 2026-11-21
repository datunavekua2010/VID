import { loadFont } from '@remotion/fonts';
import { AbsoluteFill, Html5Audio, Sequence, staticFile } from 'remotion';
import { ClassroomScene } from './scenes/ClassroomScene';
import { WalkHomeScene } from './scenes/WalkHomeScene';
import { PortalScene } from './scenes/PortalScene';
import { LearningScene } from './scenes/LearningScene';
import { SuccessScene } from './scenes/SuccessScene';
import { BrandRevealScene } from './scenes/BrandRevealScene';

loadFont({ family: 'Noto Georgian', url: staticFile('fonts/georgian-600.woff2'), weight: '600' });
loadFont({ family: 'Fraunces', url: staticFile('fonts/fraunces-600.woff2'), weight: '600' });
loadFont({ family: 'DM Sans', url: staticFile('fonts/dm-sans-600.woff2'), weight: '600' });

export function AdComposition() {
  return (
    <AbsoluteFill style={{ backgroundColor: '#fbf2df' }}>
      <Sequence from={0} durationInFrames={164} name="01 The disappointment"><ClassroomScene /></Sequence>
      <Sequence from={150} durationInFrames={134} name="02 The walk home"><WalkHomeScene /></Sequence>
      <Sequence from={270} durationInFrames={194} name="03 The Axi portal"><PortalScene /></Sequence>
      <Sequence from={450} durationInFrames={194} name="04 Learning and breakthrough"><LearningScene /></Sequence>
      <Sequence from={630} durationInFrames={164} name="05 The new result"><SuccessScene /></Sequence>
      <Sequence from={780} durationInFrames={120} name="06 Brand reveal"><BrandRevealScene /></Sequence>
      <Html5Audio src={staticFile('audio/second-chance-original.wav')} volume={0.9} />
    </AbsoluteFill>
  );
}