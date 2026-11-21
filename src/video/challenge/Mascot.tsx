type Expression = 'challenge' | 'thinking' | 'surprised' | 'happy';
type Pose = 'point' | 'watch' | 'down' | 'wave';

const ORANGE = '#e07b24';
const DARK = '#b85a12';
const PAPER = '#fffdf8';
const CREAM = '#fff7ec';

function Eye({ cx, cy, blink, scale = 1 }: { cx: number; cy: number; blink: boolean; scale?: number }) {
  if (blink) return <path d={`M${cx - 24} ${cy} Q${cx} ${cy + 12} ${cx + 24} ${cy}`} fill="none" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle r="34" fill="#ffffff" stroke={ORANGE} strokeWidth="8" />
      <circle r="21" fill={ORANGE} />
      <circle cx="-7" cy="-8" r="7" fill="#ffffff" opacity="0.95" />
      <circle cx="8" cy="9" r="4" fill={DARK} opacity="0.55" />
    </g>
  );
}

export function Mascot({
  x,
  y,
  scale = 1,
  frame,
  expression = 'challenge',
  pose = 'watch',
}: {
  x: number;
  y: number;
  scale?: number;
  frame: number;
  expression?: Expression;
  pose?: Pose;
}) {
  const blink = frame % 104 >= 100;
  const bob = Math.sin(frame * 0.075) * 4;
  const tilt = expression === 'thinking' ? -3 : expression === 'surprised' ? 2 : expression === 'happy' ? -2 : 1;
  const eyeScale = expression === 'surprised' ? 1.16 : 1;
  const wave = Math.sin(frame * 0.16) * 10;

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${scale}) translate(-360 -390)`}>
      <ellipse cx="360" cy="742" rx="205" ry="24" fill="#2f6f5e" opacity="0.12" />

      {/* Tail, kept behind the body exactly as in the reference pose. */}
      <g>
        <path d="M465 625 C590 615 665 540 645 450 C630 382 560 355 508 402 C475 432 482 485 520 505 C548 520 575 502 568 472" fill={PAPER} stroke={ORANGE} strokeWidth="10" strokeLinejoin="round" />
        <path d="M585 470 C610 440 610 410 590 385 M625 520 C650 490 650 455 630 425" fill="none" stroke={ORANGE} strokeWidth="9" strokeLinecap="round" opacity="0.85" />
      </g>

      {/* Body */}
      <path d="M360 360 C260 360 195 440 205 555 C215 665 285 725 360 725 C435 725 505 665 515 555 C525 440 460 360 360 360Z" fill={PAPER} stroke={ORANGE} strokeWidth="10" />
      <ellipse cx="360" cy="600" rx="118" ry="102" fill={CREAM} stroke={ORANGE} strokeWidth="5" opacity="0.55" />
      <path d="M255 650 C285 675 435 675 465 650" fill="none" stroke={ORANGE} strokeWidth="5" opacity="0.35" />

      {/* Feet */}
      <g fill={PAPER} stroke={ORANGE} strokeWidth="9">
        <ellipse cx="285" cy="705" rx="64" ry="29" />
        <ellipse cx="435" cy="705" rx="64" ry="29" />
      </g>
      <path d="M250 700 q12 12 26 0 M265 690 q12 12 26 0 M430 700 q12 12 26 0 M445 690 q12 12 26 0" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" />

      {/* Arms: base paws stay in the reference position unless the scene needs a gesture. */}
      {pose !== 'point' && pose !== 'down' && pose !== 'wave' && (
        <g fill={PAPER} stroke={ORANGE} strokeWidth="9">
          <path d="M238 455 C205 505 212 575 252 628 C268 648 298 638 298 612 C298 560 288 500 268 462Z" />
          <path d="M482 455 C515 505 508 575 468 628 C452 648 422 638 422 612 C422 560 432 500 452 462Z" />
          <path d="M252 628 q10 18 28 8 M468 628 q-10 18-28 8" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {pose === 'point' && (
        <g>
          <path d="M482 455 C540 500 535 590 470 640 C445 660 412 650 410 625 C408 590 455 540 455 485Z" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
          <circle cx="438" cy="642" r="34" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
          <path d="M438 642 L500 642" stroke={ORANGE} strokeWidth="10" strokeLinecap="round" />
          <path d="M500 642 l26 0" stroke={ORANGE} strokeWidth="10" strokeLinecap="round" />
          <path d="M238 455 C205 505 212 575 252 628 C268 648 298 638 298 612 C298 560 288 500 268 462Z" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
        </g>
      )}
      {pose === 'down' && (
        <g>
          <path d="M482 455 C520 520 515 610 470 665 C450 690 420 675 425 645 C430 600 455 540 455 485Z" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
          <path d="M455 665 L455 715" stroke={ORANGE} strokeWidth="10" strokeLinecap="round" />
          <path d="M438 700 L455 722 L472 700" fill="none" stroke={ORANGE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M238 455 C205 505 212 575 252 628 C268 648 298 638 298 612 C298 560 288 500 268 462Z" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
        </g>
      )}
      {pose === 'wave' && (
        <g transform={`rotate(${wave} 482 455)`}>
          <path d="M482 455 C535 420 560 360 545 300 C540 280 515 280 508 300 C495 345 470 400 455 430Z" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
          <circle cx="532" cy="292" r="30" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
          <path d="M238 455 C205 505 212 575 252 628 C268 648 298 638 298 612 C298 560 288 500 268 462Z" fill={PAPER} stroke={ORANGE} strokeWidth="9" />
        </g>
      )}

      {/* Head and headphones */}
      <g transform={`rotate(${tilt} 360 300)`}>
        <path d="M205 155 C165 80 190 25 250 35 C295 43 310 95 285 140 C260 165 225 170 205 155Z" fill={PAPER} stroke={ORANGE} strokeWidth="10" />
        <path d="M515 155 C555 80 530 25 470 35 C425 43 410 95 435 140 C460 165 495 170 515 155Z" fill={PAPER} stroke={ORANGE} strokeWidth="10" />
        <path d="M220 130 C205 95 215 65 240 58 C260 70 265 100 255 125Z" fill={ORANGE} opacity="0.9" />
        <path d="M500 130 C515 95 505 65 480 58 C460 70 455 100 465 125Z" fill={ORANGE} opacity="0.9" />
        <path d="M360 70 C235 70 155 160 155 285 C155 410 245 505 360 505 C475 505 565 410 565 285 C565 160 485 70 360 70Z" fill={PAPER} stroke={ORANGE} strokeWidth="10" />
        <path d="M185 225 C195 105 525 105 535 225" fill="none" stroke={ORANGE} strokeWidth="20" strokeLinecap="round" />
        <path d="M330 95 l18 22 18-24 18 24 18-22" fill="none" stroke={ORANGE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <g fill={PAPER} stroke={ORANGE} strokeWidth="10">
          <rect x="105" y="205" width="95" height="165" rx="48" />
          <rect x="520" y="205" width="95" height="165" rx="48" />
        </g>
        <g fill={CREAM} stroke={ORANGE} strokeWidth="6">
          <rect x="125" y="230" width="55" height="115" rx="28" />
          <rect x="540" y="230" width="55" height="115" rx="28" />
        </g>
        <circle cx="152" cy="288" r="18" fill={ORANGE} />
        <circle cx="568" cy="288" r="18" fill={ORANGE} />
        <path d="M600 360 C620 430 590 500 620 570" fill="none" stroke={ORANGE} strokeWidth="7" strokeLinecap="round" />

        {/* Raccoon mask and face */}
        <path d="M205 250 C230 215 285 210 305 250 C320 285 300 330 260 340 C225 348 195 320 198 285 C199 270 201 258 205 250Z" fill={ORANGE} />
        <path d="M515 250 C490 215 435 210 415 250 C400 285 420 330 460 340 C495 348 525 320 522 285 C521 270 519 258 515 250Z" fill={ORANGE} />
        <path d="M185 320 l-22 14 24 8 M535 320 l22 14-24 8" fill="none" stroke={ORANGE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <Eye cx={260} cy={285} blink={blink} scale={eyeScale} />
        <Eye cx={460} cy={285} blink={blink} scale={eyeScale} />
        {expression === 'challenge' && <g fill="none" stroke={ORANGE} strokeWidth="10" strokeLinecap="round"><path d="M215 222 Q260 200 305 222" /><path d="M415 238 Q460 224 505 238" /></g>}
        {expression === 'thinking' && <g fill="none" stroke={ORANGE} strokeWidth="10" strokeLinecap="round"><path d="M218 232 L302 218" /><path d="M502 232 L418 218" /></g>}
        {expression === 'surprised' && <g fill="none" stroke={ORANGE} strokeWidth="10" strokeLinecap="round"><path d="M218 210 Q260 192 302 210" /><path d="M418 210 Q460 192 502 210" /></g>}
        {expression === 'happy' && <g fill="none" stroke={ORANGE} strokeWidth="9" strokeLinecap="round"><path d="M222 228 Q260 214 298 228" /><path d="M422 228 Q460 214 498 228" /></g>}
        <ellipse cx="360" cy="365" rx="28" ry="20" fill={ORANGE} stroke={DARK} strokeWidth="5" />
        {expression === 'surprised' ? <ellipse cx="360" cy="410" rx="22" ry="26" fill={ORANGE} stroke={DARK} strokeWidth="5" /> : <path d={expression === 'happy' ? 'M325 402 Q360 430 395 402' : expression === 'thinking' ? 'M335 410 Q360 416 385 410' : 'M330 405 Q360 424 390 405'} fill="none" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />}
        <path d="M275 385 L205 375 M275 400 L210 405 M445 385 L515 375 M445 400 L510 405" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      </g>
    </g>
  );
}
