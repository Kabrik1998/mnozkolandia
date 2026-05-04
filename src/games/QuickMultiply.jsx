import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { GameHeader, Stat, Toast } from '../components/Layout.jsx';
import Mascot from '../components/Mascot.jsx';
import { MODES, formatTime, newProblem, nowLabel, randomInt, scoreWithStreak } from '../utils/game.js';

const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

const DIFFICULTIES = {
  easy: { label: 'łatwy', titleKey: 'easy' },
  medium: { label: 'średni', titleKey: 'medium' },
  hard: { label: 'trudny', titleKey: 'hard' }
};

const mediumPool = [2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];
const hardPool = [6, 6, 7, 7, 8, 8, 9, 9, 2, 3, 4, 5, 10];

function goodMessage(t) {
  const messages = [t.wellDone, t.super, t.fast, t.master, t.greatStreak];
  return messages[randomInt(0, messages.length - 1)];
}

function softMessage(t) {
  const messages = [t.tryAgain, t.almost];
  return messages[randomInt(0, messages.length - 1)];
}

function pickFrom(pool) {
  return pool[randomInt(0, pool.length - 1)];
}

function makeProblem(level) {
  if (level === 'easy') {
    const problem = newProblem();
    return { ...problem, operator: '×', promptA: problem.a, promptB: problem.b };
  }

  if (level === 'medium') {
    const a = pickFrom(mediumPool);
    const b = pickFrom(mediumPool);
    return { a, b, promptA: a, promptB: b, operator: '×', answer: a * b };
  }

  const useDivision = Math.random() < 0.45;
  const a = pickFrom(hardPool);
  const b = pickFrom(hardPool);

  if (!useDivision) {
    return { a, b, promptA: a, promptB: b, operator: '×', answer: a * b };
  }

  const answer = a;
  const divisor = b;
  return { a: answer * divisor, b: divisor, promptA: answer * divisor, promptB: divisor, operator: '÷', answer };
}

export default function QuickMultiply({ t, nick, onMenu, onSave, onChangeStudent }) {
  const [difficulty, setDifficulty] = useState(null);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('neutral');

  useEffect(() => {
    if (!difficulty) return undefined;
    const timer = setInterval(() => setSeconds((time) => time + 1), 1000);
    return () => clearInterval(timer);
  }, [difficulty]);

  function startDifficulty(level) {
    setDifficulty(level);
    setProblem(makeProblem(level));
    setAnswer('');
    setPoints(0);
    setStreak(0);
    setCorrect(0);
    setWrong(0);
    setSeconds(0);
    setMessage('');
    setMood('neutral');
  }

  function submit() {
    if (!answer || !problem) return;
    const value = Number(answer);
    if (value === problem.answer) {
      const nextStreak = streak + 1;
      setPoints((current) => scoreWithStreak(current, streak));
      setStreak(nextStreak);
      setCorrect((count) => count + 1);
      setMessage(nextStreak >= 5 ? t.greatStreak : goodMessage(t));
      setMood(nextStreak >= 5 ? 'excited' : 'happy');
    } else {
      setPoints((current) => Math.max(0, current - 5));
      setStreak(0);
      setWrong((count) => count + 1);
      setMessage(softMessage(t));
      setMood('sad');
    }
    setAnswer('');
    setProblem(makeProblem(difficulty));
  }

  function finish() {
    const mode = `${MODES.quick} — ${DIFFICULTIES[difficulty].label}`;
    onSave({ id: crypto.randomUUID(), nick, points, mode, date: nowLabel(), meta: { seconds, correct, wrong, difficulty } });
    onMenu();
  }

  function restart() {
    if (!difficulty) return;
    setProblem(makeProblem(difficulty));
    setAnswer('');
    setPoints(0);
    setStreak(0);
    setCorrect(0);
    setWrong(0);
    setSeconds(0);
    setMessage('');
    setMood('neutral');
  }

  return (
    <>
      <GameHeader
        title={difficulty ? `${t.quick} — ${t[DIFFICULTIES[difficulty].titleKey]}` : t.quick}
        nick={nick}
        mascotMood={mood}
        onMenu={onMenu}
        onRestart={restart}
        onChangeStudent={onChangeStudent}
        t={t}
        stats={<><Stat label={t.points} value={points} tone="yellow" /><Stat label={t.streak} value={`🔥 x${streak}`} /><Stat label={t.time} value={formatTime(seconds)} /></>}
      />
      {!difficulty ? (
        <section className="mx-auto max-w-6xl">
          <div className="game-panel text-center">
            <Toast>{t.chooseLevel}</Toast>
            <div className="grid gap-3 md:grid-cols-3 md:gap-5">
              {Object.entries(DIFFICULTIES).map(([level, item]) => (
                <button key={level} className="level-card tile-teal" onClick={() => startDifficulty(level)}>
                  <strong>{t[item.titleKey]}</strong>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_360px]">
          <div className="game-panel text-center">
            <Toast tone={mood === 'sad' ? 'bad' : 'good'}>{message}</Toast>
            <div className="problem">{problem.promptA} {problem.operator} {problem.promptB} = ?</div>
            <input
              className="answer-input"
              inputMode="numeric"
              value={answer}
              autoFocus
              onChange={(event) => setAnswer(event.target.value.replace(/\D/g, '').slice(0, 3))}
              onKeyDown={(event) => event.key === 'Enter' && submit()}
            />
            <div className="keypad">
              {keys.map((key) => <button key={key} onClick={() => setAnswer((value) => (value + key).slice(0, 3))}>{key}</button>)}
              <button onClick={() => setAnswer((value) => value.slice(0, -1))}>⌫</button>
              <button className="ok" onClick={submit}><Check size={26} /></button>
            </div>
            <button className="btn danger mt-6" onClick={finish}>{t.finishGame}</button>
          </div>
          <aside className="side-panel">
            <Mascot mood={mood} />
            <div className="grid grid-cols-2 gap-3">
              <Stat label={t.correct} value={correct} tone="teal" />
              <Stat label={t.mistakes} value={wrong} tone="coral" />
            </div>
          </aside>
        </section>
      )}
    </>
  );
}
