import { Backpack } from './Objects';

type Expression = 'sad' | 'curious' | 'thinking' | 'happy';
type Pose = 'standing' | 'walking' | 'sitting' | 'wave';

/** A replaceable, consistently proportioned character rig used in every scene. */
export function Boy({
  x, y, scale = 1, frame, expression = 'thinking', pose = 'standing', backpack = false, sadness = 1, happiness = 1,
}: {
  x: number; y: number; scale?: number; frame: number; expression?: Expression; pose?: Pose; backpack?: boolean; sadness?: number; happiness?: number;
}) {
  const walking = pose === 'walking';
  const legSwing = walking ? Math.sin(frame * 0.16) * 17 : 0;
  const bob = walking ? Math.abs(Math.sin(frame * 0.16)) * -7 : Math.sin(frame * 0.045) * 1.8;
  const sad = expression === 'sad' ? sadness : 0;
  const happy = expression === 'happy' ? happiness : 0;
  const headTilt = expression === 'sad' ? 2 + sad * 5 : expression === 'curious' ? -5 : expression === 'happy' ? 2 - happy * 4 : 2;
  const eyeY = 99 + sad * 6;
  const blink = frame % 109 >= 105;
  const waveAngle = Math.sin(frame * 0.13) * 12;

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${scale})`}>
      <ellipse cx="0" cy="544" rx="133" ry="20" fill="#5e5543" opacity=".16" />
      {backpack && <Backpack x={-161} y={188} scale={0.94} />}
      <g transform={`rotate(${legSwing} -48 354)`}>
        <path d="M-91 339 Q-92 401-82 478 L-23 478 Q-17 408-11 349Z" fill="#3e5860" stroke="#344d54" strokeWidth="4" />
        <path d="M-82 472 Q-96 490-100 515 Q-99 530-78 531 L-18 530 Q-4 527-9 511 L-23 474Z" fill="#6c554a" stroke="#58483f" strokeWidth="4" />
        <path d="M-92 516q35 8 77 0" fill="none" stroke="#b49a83" strokeWidth="5" />
      </g>
      <g transform={`rotate(${-legSwing} 45 354)`}>
        <path d="M10 346 Q14 408 23 478 L82 478 Q91 404 90 338Z" fill="#4c6770" stroke="#344d54" strokeWidth="4" />
        <path d="M22 474 L9 509 Q4 527 20 530 L85 531 Q103 528 100 515 Q96 488 81 472Z" fill="#745b4b" stroke="#58483f" strokeWidth="4" />
        <path d="M16 516q36 8 78 0" fill="none" stroke="#b49a83" strokeWidth="5" />
      </g>
      <g transform={`rotate(${walking ? -legSwing * 0.7 : -3} -78 226)`}>
        <path d="M-70 200 Q-112 203-125 247 L-147 323 Q-151 344-135 351 Q-119 356-110 337 L-76 274Z" fill="#467861" stroke="#315e50" strokeWidth="4" />
        <path d="M-147 324 Q-158 339-152 354 Q-146 369-133 364 Q-122 361-119 345 L-122 333Z" fill="url(#skin)" stroke="#b47e61" strokeWidth="3" />
      </g>
      {pose !== 'wave' && (
        <g transform={`rotate(${walking ? legSwing * 0.7 : 3} 78 226)`}>
          <path d="M70 200 Q111 202 125 245 L147 321 Q152 344 136 350 Q120 355 111 336 L76 274Z" fill="#467861" stroke="#315e50" strokeWidth="4" />
          <path d="M147 323 Q158 338 152 353 Q147 368 134 364 Q122 360 119 345 L123 333Z" fill="url(#skin)" stroke="#b47e61" strokeWidth="3" />
        </g>
      )}
      <path d="M-69 186 Q-103 195-104 230 L-97 361 Q-59 380 0 381 Q59 380 97 361 L104 230 Q103 195 69 186Z" fill="url(#sweater)" stroke="#315e50" strokeWidth="5" />
      <path d="M-94 332 Q0 351 95 332 L97 361 Q0 383-97 361Z" fill="#315e50" opacity=".45" />
      <path d="M-85 222 Q-63 237-53 269 M85 222 Q63 237 53 269" fill="none" stroke="#83a995" strokeWidth="4" opacity=".55" />
      <path d="M-35 173 L-33 202 Q0 222 33 202 L35 173Z" fill="url(#skin)" stroke="#b47e61" strokeWidth="3" />
      <path d="M-48 191 L-10 221 L0 205 L10 221 L48 191 L30 185 Q0 198-30 185Z" fill="#f3e6c6" stroke="#d1bd9b" strokeWidth="3" />
      <path d="M-8 218l8 9 8-9" fill="none" stroke="#d8ad55" strokeWidth="5" strokeLinecap="round" />
      {backpack && <path d="M-73 201 Q-101 253-84 327 M73 201 Q98 251 84 327" fill="none" stroke="#87b3c3" strokeWidth="11" opacity=".9" />}
      <g transform={`rotate(${headTilt} 0 176)`}>
        <ellipse cx="-98" cy="102" rx="19" ry="29" fill="#e4aa83" stroke="#b47e61" strokeWidth="3" />
        <ellipse cx="98" cy="102" rx="19" ry="29" fill="#e4aa83" stroke="#b47e61" strokeWidth="3" />
        <path d="M-97 54 Q-101-18-43-37 Q6-55 55-31 Q103-12 98 54 L92 117 Q86 160 48 177 Q3 196-46 176 Q-86 158-92 118Z" fill="url(#skin)" stroke="#b47e61" strokeWidth="4" />
        <path d="M-99 67 Q-115 10-82-24 Q-57-58-13-51 Q28-65 63-39 Q102-23 101 35 L95 64 Q82 43 77 24 Q59 43 30 42 Q8 42-5 24 Q-23 46-57 42 Q-76 41-88 31 L-92 68Z" fill="#624536" stroke="#563d31" strokeWidth="5" />
        <path d="M-78 4 Q-58-28-27-26 M-10-35 Q17-45 43-25 M54-17 Q77-5 84 13" fill="none" stroke="#96705a" strokeWidth="6" strokeLinecap="round" opacity=".6" />
        <path d={`M-61 ${76 + sad * 3} Q-45 ${68 + sad * 2}-28 ${74 + sad * 5} M27 ${74 + sad * 5} Q44 ${68 + sad * 2} 60 ${76 + sad * 3}`} fill="none" stroke="#76513e" strokeWidth="5" strokeLinecap="round" />
        {blink ? (
          <path d={`M-52 ${eyeY}q12 5 23 0 M28 ${eyeY}q12 5 23 0`} fill="none" stroke="#3f3933" strokeWidth="5" strokeLinecap="round" />
        ) : (
          <g fill="#3c3934"><ellipse cx="-40" cy={eyeY} rx="7" ry="11" /><ellipse cx="40" cy={eyeY} rx="7" ry="11" /><circle cx="-38" cy={eyeY - 3} r="2" fill="#fff9e8" /><circle cx="42" cy={eyeY - 3} r="2" fill="#fff9e8" /></g>
        )}
        <path d="M0 103q-5 15 5 16" fill="none" stroke="#bd8368" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="-62" cy="126" rx="16" ry="8" fill="#d98576" opacity=".25" /><ellipse cx="62" cy="126" rx="16" ry="8" fill="#d98576" opacity=".25" />
        {expression === 'curious' ? <ellipse cx="4" cy="143" rx="6" ry="7" fill="#966453" /> : (
          <path d={`M${-18 - 8 * happy} ${143 - 5 * happy + 7 * sad} Q0 ${149 + 12 * happy - 11 * sad} ${19 + 8 * happy} ${143 - 5 * happy + 7 * sad}`} fill="none" stroke="#885746" strokeWidth="5" strokeLinecap="round" />
        )}
      </g>
      {pose === 'wave' && (
        <g transform={`rotate(${waveAngle} 86 231)`}>
          <path d="M78 206 Q111 195 127 168 L152 111 Q158 97 171 104 Q182 111 177 124 L154 197 Q143 229 104 249Z" fill="#477a62" stroke="#315e50" strokeWidth="4" />
          <path d="M151 111 Q144 91 149 73 Q151 65 157 72 L162 82 L164 57 Q165 50 171 54 L173 78 L179 57 Q181 50 187 55 L185 82 L192 66 Q195 60 200 65 Q203 72 196 94 Q190 112 176 120Z" fill="url(#skin)" stroke="#b47e61" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
    </g>
  );
}