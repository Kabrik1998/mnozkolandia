import { sampleScores } from './game.js';

const KEY = 'mnozkolandia-ranking';
const USERS_KEY = 'mnozkolandia-users';

export function loadScores() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    return saved.length ? saved : sampleScores;
  } catch {
    return sampleScores;
  }
}

export function saveScore(score, user = null) {
  const scores = loadScores().filter((entry) => !String(entry.id).startsWith('sample-'));
  let nextScores = scores;

  if (user?.login) {
    const users = loadUsers();
    const current = users[user.login] || { login: user.login, password: user.password, records: {} };
    const previous = current.records?.[score.mode];
    if (!previous || score.points > previous.points) {
      current.records = { ...(current.records || {}), [score.mode]: score };
      users[user.login] = current;
      saveUsers(users);
      nextScores = scores.filter((entry) => !(entry.userLogin === user.login && entry.mode === score.mode));
      nextScores.push({ ...score, userLogin: user.login });
    }
  } else {
    nextScores = [...scores, score];
  }

  const next = nextScores.sort((a, b) => b.points - a.points).slice(0, 30);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearScores() {
  localStorage.setItem(KEY, JSON.stringify([]));
}

export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(login, password) {
  const users = loadUsers();
  if (users[login]) return { ok: false, error: 'exists' };
  const user = { login, password, records: {} };
  users[login] = user;
  saveUsers(users);
  return { ok: true, user };
}

export function loginUser(login, password) {
  const users = loadUsers();
  const user = users[login];
  if (!user || user.password !== password) return { ok: false, error: 'wrong' };
  return { ok: true, user };
}
