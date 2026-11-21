import { ClassroomDesk } from './Objects';

export function ClassroomBackground({ bright = 0 }: { bright?: number }) {
  return (
    <g>
      <rect width="1080" height="1920" fill="url(#wall)" />
      <path d="M0 1110 Q350 1098 1080 1116 L1080 1450 L0 1450Z" fill="#cbb28c" />
      <path d="M0 1390 Q460 1358 1080 1386 L1080 1920 L0 1920Z" fill="#b99470" />
      <path d="M0 1377h1080" stroke="#9f805f" strokeWidth="16" opacity=".5" />
      <g transform="translate(80 245) rotate(-1)">
        <rect x="-13" y="-13" width="509" height="367" rx="9" fill="#9d7653" />
        <rect width="483" height="341" rx="4" fill="#527166" stroke="#e3c59c" strokeWidth="10" />
        <path d="M36 66 Q145 60 230 65 M36 85 Q111 82 167 85" fill="none" stroke="#e2e6ce" strokeWidth="5" strokeLinecap="round" opacity=".43" />
        <text x="45" y="163" fill="#e4e9d1" opacity=".6" fontFamily="Georgia, serif" fontSize="49">2 + 3 =</text>
        <path d="M65 224h97m32 0h74M330 98l53 62-77 0Z" fill="none" stroke="#dfe8d1" strokeWidth="5" strokeLinecap="round" opacity=".43" />
        <path d="M-10 351h505" stroke="#815f45" strokeWidth="12" strokeLinecap="round" />
      </g>
      <g transform="translate(660 124)">
        <rect x="0" y="0" width="376" height="792" rx="8" fill="#aa8360" />
        <rect x="19" y="18" width="338" height="746" fill="#edc996" stroke="#f5e4c6" strokeWidth="12" />
        <rect x="31" y="30" width="314" height="720" fill="#b8ced0" />
        <circle cx="260" cy="153" r="85" fill="#f8e3ae" opacity=".84" />
        <path d="M31 552 Q93 476 144 533 Q195 465 249 515 Q302 460 345 502 L345 750 L31 750Z" fill="#8faa9b" opacity=".75" />
        <path d="M31 647 Q95 601 140 637 Q189 588 244 628 Q297 590 345 621 L345 750 L31 750Z" fill="#789988" opacity=".8" />
        <path d="M185 30v720 M31 370h314" stroke="#f9e8cc" strokeWidth="17" />
        <path d="M15 769h346" stroke="#f6e2c3" strokeWidth="28" strokeLinecap="round" />
      </g>
      <path d="M1005 891 L696 1360 L102 1360 L818 891Z" fill="#fff1c5" opacity={0.12 + bright * 0.13} />
      <path d="M1000 910 L862 1315 L700 1315 L862 910Z" fill="#fff7d8" opacity={0.1 + bright * 0.1} />
      <g opacity=".75">
        <path d="M0 1002 L270 996 L331 1034 L0 1041Z" fill="#b4855f" /><path d="M0 1040h311v25H0Z" fill="#926c4f" />
        <path d="M36 1063v194 M274 1063v197" stroke="#906a4e" strokeWidth="16" />
        <path d="M56 987l97-4 2 14-99 4Z" fill="#78988b" /><path d="M65 974l85-4 4 13-89 4Z" fill="#e5c487" />
      </g>
      <path d="M45 761 Q89 733 137 756 M80 781 Q138 755 196 781" fill="none" stroke="#b9a482" strokeWidth="4" opacity=".4" />
    </g>
  );
}

export function ClassroomForeground() {
  return <ClassroomDesk />;
}

export function StudyBackground() {
  return (
    <g>
      <rect width="1080" height="1920" fill="url(#wall)" />
      <path d="M0 1232 Q500 1216 1080 1229 L1080 1920 L0 1920Z" fill="#b28a6a" />
      <path d="M0 1222h1080" stroke="#9b7859" strokeWidth="16" />
      <g transform="translate(78 165)">
        <rect width="387" height="570" rx="8" fill="#9f795b" />
        <rect x="18" y="18" width="351" height="534" fill="url(#night)" stroke="#f2d9b8" strokeWidth="12" />
        <circle cx="273" cy="130" r="49" fill="#fae5b4" opacity=".85" />
        <path d="M25 409 Q110 328 183 401 Q261 326 361 393 L361 545 L25 545Z" fill="#6b867a" />
        <path d="M25 475 Q110 413 189 475 Q280 408 361 460 L361 545 L25 545Z" fill="#4e7369" />
        <path d="M193 20v524 M19 272h347" stroke="#f6e0bf" strokeWidth="15" />
        <path d="M5 565h376" stroke="#f0d2aa" strokeWidth="23" strokeLinecap="round" />
      </g>
      <path d="M545 263h462" stroke="#ab805c" strokeWidth="21" strokeLinecap="round" />
      <g transform="translate(602 101)">
        <path d="M0 160V40h42v120 M49 160V8h47v152 M104 160V50h36v110 M149 160V23h48v137 M205 160V62h38v98" fill="#749085" stroke="#5d786d" strokeWidth="4" />
        <path d="M53 20h39 M152 38h40 M4 58h35" stroke="#e4c68f" strokeWidth="5" opacity=".8" />
        <path d="M259 158 Q260 100 289 94 Q317 101 318 158Z" fill="#c17f60" /><path d="M288 98 Q262 72 268 38 M290 97 Q310 64 324 51" fill="none" stroke="#66836a" strokeWidth="8" strokeLinecap="round" />
      </g>
      <circle cx="906" cy="687" r="300" fill="url(#lampGlow)" />
      <g transform="translate(849 715)">
        <path d="M0 433h153" stroke="#7a6650" strokeWidth="22" strokeLinecap="round" />
        <path d="M72 428 L114 189 L42 58" fill="none" stroke="#7a6650" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="114" cy="189" r="15" fill="#d3b078" stroke="#7a6650" strokeWidth="5" />
        <path d="M-23 43 Q17-10 71 36 L87 71 L-38 80Z" fill="#d4b36f" stroke="#80694f" strokeWidth="6" />
        <path d="M-35 80 Q20 98 85 71" fill="none" stroke="#f5dfab" strokeWidth="7" />
      </g>
      <path d="M0 1363 Q548 1336 1080 1352 L1080 1920 L0 1920Z" fill="#a97f5f" opacity=".45" />
    </g>
  );
}

export function StudyDesk() {
  return (
    <g>
      <path d="M0 1360 L1080 1344 L1080 1441 L0 1460Z" fill="url(#wood)" stroke="#936845" strokeWidth="7" />
      <path d="M0 1374 Q470 1363 1080 1362" fill="none" stroke="#f2c38f" strokeWidth="6" opacity=".55" />
      <path d="M74 1459 L1010 1444 L1010 1920 L74 1920Z" fill="#b58762" />
      <path d="M80 1520 Q530 1500 1006 1511 M80 1690 Q530 1672 1006 1681" fill="none" stroke="#8d684d" strokeWidth="4" opacity=".2" />
      <path d="M63 1322l210-5 16 35-214 5Z" fill="#f7efd9" stroke="#c9b694" strokeWidth="4" />
      <path d="M87 1326l114-2m-114 12l145-3" stroke="#b8c3b3" strokeWidth="3" />
      <path d="M85 1308l174-9" stroke="#e0ad57" strokeWidth="10" strokeLinecap="round" />
    </g>
  );
}