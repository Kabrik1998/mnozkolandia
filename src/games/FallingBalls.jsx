import { useEffect, useMemo, useState } from 'react';
import { GameHeader, Stat, Toast } from '../components/Layout.jsx';
import Mascot from '../components/Mascot.jsx';
import { MODES, newProblem, nowLabel, randomInt, shuffle } from '../utils/game.js';

const GAME_TIME = 120;

function fallDuration(elapsedSeconds, speedOffset = 0) {
  if (elapsedSeconds <= 30) return 12 + speedOffset;
  const progress = Math.min(1, (elapsedSeconds - 30) / 90);
  return Math.max(4.6, 12 - progress * 7.2 + speedOffset * 0.7);
}

function makeBalls(problem) {
  const answers = new Set([problem.answer]);
  while (answers.size < 6) answers.add(Math.max(1, problem.answer + randomInt(-18, 18)));
  return shuffle([...answers]).map((value, index) => ({
    id: `${problem.a}-${problem.b}-${index}-${value}`,
    value,
    correct: value === problem.answer,
    left: 8 + index * 15 + randomInt(-4, 4),
    delay: index * 0.25,
    speedOffset: (index % 3) * 0.7,
    color: ['ball-teal', 'ball-yellow', 'ball-coral', 'ball-lilac', 'ball-blue', 'ball-mint'][index]
  }));
}

function goodMessage(t) {
  const messages = [t.wellDone, t.super, t.fast, t.master, t.greatStreak];
  return messages[randomInt(0, messages.length - 1)];
}

export default function FallingBalls({ t, nick, onMenu, onSave, onChangeStudent }) {
  const [problem, setProblem] = useState(() => newProblem());
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('neutral');
  const [finished, setFinished] = useState(false);
  const elapsedSeconds = GAME_TIME - timeLeft;
  const balls = useMemo(() => makeBalls(problem), [problem]);

  useEffect(() => {
    if (finished) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setFinished(true);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  useEffect(() => {
    if (!finished) return;
    onSave({ id: crypto.randomUUID(), nick, points, mode: MODES.falling, date: nowLabel(), meta: { timeLeft } });
    setMood('excited');
    setMessage(points > 80 ? t.master : t.super);
  }, [finished]);

  function choose(ball) {
    if (finished) return;
    if (ball.correct) {
      const nextStreak = streak + 1;
      setPoints((score) => score + 10 + (nextStreak >= 5 ? 10 : nextStreak >= 3 ? 5 : 0));
      setStreak(nextStreak);
      setMessage(nextStreak >= 3 ? t.greatStreak : goodMessage(t));
      setMood(nextStreak >= 5 ? 'excited' : 'happy');
      setProblem(newProblem());
    } else {
      setPoints((score) => Math.max(0, score - 5));
      setStreak(0);
      setMessage(t.notThisBall);
      setMood('sad');
    }
  }

  function restart() {
    setProblem(newProblem());
    setPoints(0);
    setStreak(0);
    setTimeLeft(GAME_TIME);
    setMessage('');
    setMood('neutral');
    setFinished(false);
  }

  return (
    <>
      <GameHeader
        title={t.falling}
        nick={nick}
        mascotMood={mood}
        onMenu={onMenu}
        onRestart={restart}
        onChangeStudent={onChangeStudent}
        t={t}
        stats={<><Stat label={t.points} value={points} tone="yellow" /><Stat label={t.streak} value={`🔥 x${streak}`} /><Stat label={t.time} value={`${timeLeft}s`} /></>}
      />
      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_330px]">
        <div className="falling-panel">
          <Toast tone={mood === 'sad' ? 'bad' : 'good'}>{message}</Toast>
          <div className="falling-question">{problem.a} × {problem.b}</div>
          <div className="sky-area">
            {balls.map((ball) => (
              <button
                key={ball.id}
                className={`falling-ball ${ball.color}`}
                style={{ left: `${ball.left}%`, animationDelay: `${ball.delay}s`, animationDuration: `${fallDuration(elapsedSeconds, ball.speedOffset)}s` }}
                onClick={() => choose(ball)}
              >
                {ball.value}
              </button>
            ))}
            {finished && (
              <div className="finish-overlay">
                <h2>{t.gameOver}</h2>
                <p>{t.yourScore}: {points} {t.points.toLowerCase()}</p>
                <button className="btn primary" onClick={restart}>{t.playAgain}</button>
              </div>
            )}
          </div>
        </div>
        <aside className="side-panel">
          <Mascot mood={mood} />
          <p className="rounded-3xl bg-white/70 p-4 text-center text-lg font-black text-slate-600">
            {t.clickCorrectBall}
          </p>
        </aside>
      </section>
    </>
  );
}
