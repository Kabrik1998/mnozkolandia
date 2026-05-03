import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { GameHeader, Stat, Toast } from '../components/Layout.jsx';
import Mascot from '../components/Mascot.jsx';
import { MODES, formatTime, newProblem, nowLabel, pickMessage, scoreWithStreak } from '../utils/game.js';

const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

export default function QuickMultiply({ nick, onMenu, onSave }) {
  const [problem, setProblem] = useState(() => newProblem());
  const [answer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('neutral');

  useEffect(() => {
    const timer = setInterval(() => setSeconds((time) => time + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  function submit() {
    if (!answer) return;
    const value = Number(answer);
    if (value === problem.answer) {
      const nextStreak = streak + 1;
      setPoints((current) => scoreWithStreak(current, streak));
      setStreak(nextStreak);
      setCorrect((count) => count + 1);
      setMessage(nextStreak >= 5 ? 'Świetna passa!' : pickMessage('good'));
      setMood(nextStreak >= 5 ? 'excited' : 'happy');
    } else {
      setPoints((current) => Math.max(0, current - 5));
      setStreak(0);
      setWrong((count) => count + 1);
      setMessage(pickMessage('soft'));
      setMood('sad');
    }
    setAnswer('');
    setProblem(newProblem());
  }

  function finish() {
    onSave({ id: crypto.randomUUID(), nick, points, mode: MODES.quick, date: nowLabel(), meta: { seconds, correct, wrong } });
    onMenu();
  }

  function restart() {
    setProblem(newProblem());
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
        title="Szybkie mnożenie"
        nick={nick}
        mascotMood={mood}
        onMenu={onMenu}
        onRestart={restart}
        stats={<><Stat label="Punkty" value={points} tone="yellow" /><Stat label="Passa" value={`🔥 x${streak}`} /><Stat label="Czas" value={formatTime(seconds)} /></>}
      />
      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_360px]">
        <div className="game-panel text-center">
          <Toast tone={mood === 'sad' ? 'bad' : 'good'}>{message}</Toast>
          <div className="problem">{problem.a} × {problem.b} = ?</div>
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
          <button className="btn danger mt-6" onClick={finish}>Zakończ grę</button>
        </div>
        <aside className="side-panel">
          <Mascot mood={mood} />
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Poprawne" value={correct} tone="teal" />
            <Stat label="Błędy" value={wrong} tone="coral" />
          </div>
        </aside>
      </section>
    </>
  );
}

