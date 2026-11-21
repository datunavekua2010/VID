import { Player, type PlayerRef } from '@remotion/player';
import { ArrowDownToLine, ArrowUpRight, Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ChallengeComposition } from './video/challenge/ChallengeComposition';
import { CHALLENGE_DURATION, CHALLENGE_FPS, CHALLENGE_HEIGHT, CHALLENGE_SCENES, CHALLENGE_WIDTH } from './video/challenge/constants';

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none"><path d="M7 27.5 17.8 7l11 20.5M11.4 19.3h13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="27.8" cy="9" r="2.2" fill="currentColor" /></svg>
    </span>
  );
}

const formatTime = (frame: number) => `00:${String(Math.floor(frame / CHALLENGE_FPS)).padStart(2, '0')}`;

export default function App() {
  const playerRef = useRef<PlayerRef>(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const currentScene = [...CHALLENGE_SCENES].reverse().find((scene) => frame >= scene.start) ?? CHALLENGE_SCENES[0];

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const update = () => setFrame(player.getCurrentFrame());
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    player.addEventListener('frameupdate', update);
    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('ended', onPause);
    return () => {
      player.removeEventListener('frameupdate', update);
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('ended', onPause);
    };
  }, []);

  const togglePlayback = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (frame >= CHALLENGE_DURATION - 1) playerRef.current?.seekTo(0);
    playerRef.current?.toggle(event);
  };

  const selectScene = (start: number, event: React.MouseEvent<HTMLButtonElement>) => {
    playerRef.current?.seekTo(start);
    playerRef.current?.play(event);
  };

  const toggleSound = () => {
    if (muted) playerRef.current?.unmute();
    else playerRef.current?.mute();
    setMuted(!muted);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Axiom Academy, back to top">
          <BrandMark />
          <span className="brand-name">axiom<span>academy</span></span>
        </a>
        <div className="topbar-center"><span className="status-dot" /> A 10-SECOND MATH CHALLENGE</div>
        <a className="header-download" href="/axiom-challenge.mp4" download>
          <ArrowDownToLine size={16} strokeWidth={1.8} /> <span>Download film</span>
        </a>
      </header>

      <main className="workspace" id="top">
        <section className="intro" aria-labelledby="film-title">
          <div className="eyebrow"><span className="eyebrow-line" /> AN AXIOM ACADEMY CHALLENGE</div>
          <h1 id="film-title">10 seconds.<br /><em>Prove it.</em></h1>
          <p className="intro-copy">The mascot is calling you out. Solve the problem before the timer runs out — then drop your answer in the comments.</p>
          <div className="intro-actions">
            <button className="watch-button" onClick={togglePlayback}>
              {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              {playing ? 'Pause the film' : frame > 0 ? 'Continue the film' : 'Watch the film'}
              <ArrowUpRight className="watch-arrow" size={17} />
            </button>
            <span className="watch-meta">17 SECONDS<br />BEST WITH SOUND</span>
          </div>
        </section>

        <section className="chapters" aria-labelledby="chapters-title">
          <div className="chapter-heading"><h2 id="chapters-title">Four beats, one challenge</h2><span>00:17</span></div>
          <div className="chapter-list">
            {CHALLENGE_SCENES.map((scene) => (
              <button key={scene.number} className={`chapter ${currentScene.number === scene.number ? 'chapter-active' : ''}`} onClick={(event) => selectScene(scene.start, event)} aria-label={`Play ${scene.title}, starting at ${scene.time}`} aria-current={currentScene.number === scene.number ? 'true' : undefined}>
                <span className="chapter-number">{scene.number}</span>
                <span className="chapter-title">{scene.title}</span>
                <span className="chapter-time">{scene.time}</span>
                <span className="chapter-arrow"><ArrowUpRight size={14} /></span>
              </button>
            ))}
          </div>
          <div className="chapter-note"><span className="note-star">✳</span> Think fast. Comment faster.</div>
        </section>

        <section className="preview-stage" aria-label="Interactive film preview">
          <div className="stage-heading">
            <div><span className="stage-live-dot" /> THE CHALLENGE <span className="stage-divider">/</span> <span className="stage-scene">{currentScene.title.toUpperCase()}</span></div>
            <span>9:16 <span className="stage-divider">/</span> 1080 × 1920</span>
          </div>
          <div className="stage-center">
            <div className="stage-side-label left-label">A LITTLE MORE UNDERSTANDING</div>
            <div className="film-frame">
              <Player
                ref={playerRef}
                component={ChallengeComposition}
                durationInFrames={CHALLENGE_DURATION}
                compositionWidth={CHALLENGE_WIDTH}
                compositionHeight={CHALLENGE_HEIGHT}
                fps={CHALLENGE_FPS}
                style={{ width: '100%', height: '100%' }}
                clickToPlay
                spaceKeyToPlayOrPause
                aria-label="Axiom Academy 10 second math challenge preview"
              />
            </div>
            <div className="stage-side-label right-label">A LITTLE MORE CONFIDENCE</div>
          </div>
          <div className="controls">
            <button className="control-button main-play" onClick={togglePlayback} aria-label={playing ? 'Pause film' : 'Play film'}>
              {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
            </button>
            <span className="timecode">{formatTime(frame)}</span>
            <div className="scrubber-wrap">
              <div className="scrubber-track"><div className="scrubber-fill" style={{ width: `${(frame / (CHALLENGE_DURATION - 1)) * 100}%` }} /></div>
              <input type="range" min="0" max={CHALLENGE_DURATION - 1} value={frame} onChange={(event) => playerRef.current?.seekTo(Number(event.target.value))} aria-label="Seek through the film" />
            </div>
            <span className="timecode duration">00:17</span>
            <button className="control-button" onClick={() => playerRef.current?.seekTo(0)} aria-label="Restart film"><RotateCcw size={16} /></button>
            <button className="control-button" onClick={toggleSound} aria-label={muted ? 'Unmute film' : 'Mute film'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
            <button className="control-button fullscreen" onClick={() => playerRef.current?.getContainerNode()?.requestFullscreen()} aria-label="View film fullscreen"><Maximize2 size={17} /></button>
          </div>
        </section>
      </main>

      <footer className="footer"><span>MADE FOR THE MOMENTS THAT MATTER.</span><span>ILLUSTRATED IN CODE <span className="footer-separator">✳</span> MADE TO BE FELT</span></footer>
    </div>
  );
}
