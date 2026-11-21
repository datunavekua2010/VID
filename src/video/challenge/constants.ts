export const CHALLENGE_WIDTH = 1080;
export const CHALLENGE_HEIGHT = 1920;
export const CHALLENGE_FPS = 30;
export const CHALLENGE_DURATION = 510;

export const CHALLENGE_SCENES = [
  { number: '01', title: 'The hook', time: '00:00', start: 0, duration: 90 },
  { number: '02', title: 'The challenge', time: '00:03', start: 90, duration: 90 },
  { number: '03', title: 'The countdown', time: '00:06', start: 180, duration: 240 },
  { number: '04', title: 'Comment your answer', time: '00:14', start: 420, duration: 90 },
] as const;

export const HOOK_TEXT = '„10 წამი გაქვს, რომ დაამტკიცო, რომ მე-4 კლასელზე ჭკვიანი ხარ!“';
export const QUESTION_TEXT = '48 ÷ 6 × 2 + 5 = ?';
export const CHALLENGE_SPEECH = 'აბა, ეს ამოხსენი!';
export const CTA_TEXT = '„შენი პასუხი კომენტარებში დაწერე! 👇“';
