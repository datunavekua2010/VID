export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION = 900;

export const SCENES = [
  { number: '01', title: 'The disappointment', time: '00:00', start: 0, duration: 150 },
  { number: '02', title: 'The walk home', time: '00:05', start: 150, duration: 120 },
  { number: '03', title: 'A new world opens', time: '00:09', start: 270, duration: 180 },
  { number: '04', title: 'A little breakthrough', time: '00:15', start: 450, duration: 180 },
  { number: '05', title: 'A second chance', time: '00:21', start: 630, duration: 150 },
  { number: '06', title: 'Keep thinking', time: '00:26', start: 780, duration: 120 },
] as const;

export const COLORS = {
  cream: '#fbf2df',
  paper: '#fff6e2',
  forest: '#255347',
  navy: '#253b43',
  gold: '#e6b34b',
  blue: '#477a9b',
  ink: '#584b3b',
};