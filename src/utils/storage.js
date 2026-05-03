import { sampleScores } from './game.js';

const KEY = 'mnozkolandia-ranking';

export function loadScores() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    return saved.length ? saved : sampleScores;
  } catch {
    return sampleScores;
  }
}

export function saveScore(score) {
  const scores = loadScores().filter((entry) => !String(entry.id).startsWith('sample-'));
  const next = [...scores, score].sort((a, b) => b.points - a.points).slice(0, 30);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearScores() {
  localStorage.setItem(KEY, JSON.stringify([]));
}

