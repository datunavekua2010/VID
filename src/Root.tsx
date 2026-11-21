import { Composition } from 'remotion';
import { AdComposition } from './video/AdComposition';
import { ChallengeComposition } from './video/challenge/ChallengeComposition';
import { CHALLENGE_DURATION, CHALLENGE_FPS, CHALLENGE_HEIGHT, CHALLENGE_WIDTH } from './video/challenge/constants';
import { DURATION, FPS, HEIGHT, WIDTH } from './video/constants';

export function Root() {
  return (
    <>
      <Composition id="AxiomAd" component={AdComposition} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="AxiomChallenge" component={ChallengeComposition} durationInFrames={CHALLENGE_DURATION} fps={CHALLENGE_FPS} width={CHALLENGE_WIDTH} height={CHALLENGE_HEIGHT} />
    </>
  );
}