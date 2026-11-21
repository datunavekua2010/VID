import { spawnSync } from 'node:child_process';
import { mkdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const cli = resolve('node_modules/@remotion/cli/remotion-cli.js');
const intermediate = resolve('out/axiom-second-chance-untrimmed.mp4');
const output = resolve('public/axiom-second-chance.mp4');
mkdirSync(resolve('out'), { recursive: true });
mkdirSync(resolve('public'), { recursive: true });

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run([
  'render', 'src/remotion.ts', 'AxiomAd', intermediate,
  '--codec=h264', '--concurrency=2', '--image-format=jpeg', '--jpeg-quality=90', '--crf=18',
  ...process.argv.slice(2),
]);

// AAC encoders may pad the final packet; re-encode only audio to end at exactly 30 seconds.
run([
  'ffmpeg', '-y', '-i', intermediate, '-t', '30', '-c:v', 'copy',
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', output,
]);
unlinkSync(intermediate);
console.log(`Finished: ${output}`);