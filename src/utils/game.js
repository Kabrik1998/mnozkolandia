export const MODES = {
  quick: 'Szybkie mnożenie',
  memory: 'Memory',
  falling: 'Spadające kulki'
};

export const MOTIVATION = {
  good: ['Brawo!', 'Super!', 'Ale tempo!', 'Jesteś mistrzem mnożenia!', 'Świetna passa!'],
  soft: ['Spróbuj jeszcze raz!', 'Prawie dobrze!', 'To nic, próbujemy dalej!']
};

export const sampleScores = [
  { id: 'sample-1', nick: 'Lena', points: 245, mode: MODES.quick, date: '2026-05-01 17:10' },
  { id: 'sample-2', nick: 'Olek', points: 210, mode: MODES.falling, date: '2026-05-02 18:42' },
  { id: 'sample-3', nick: 'Maja', points: 185, mode: MODES.memory, date: '2026-05-02 16:05' }
];

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function newProblem() {
  const a = randomInt(2, 10);
  const b = randomInt(2, 10);
  return { a, b, answer: a * b };
}

export function pickMessage(type = 'good') {
  const list = MOTIVATION[type];
  return list[randomInt(0, list.length - 1)];
}

export function scoreWithStreak(points, streak) {
  let bonus = 0;
  if (streak + 1 >= 5) bonus = 10;
  else if (streak + 1 >= 3) bonus = 5;
  return points + 10 + bonus;
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString();
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function nowLabel() {
  return new Date().toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

