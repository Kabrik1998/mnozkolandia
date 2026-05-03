import { useEffect, useMemo, useState } from 'react';
import { GameHeader, Stat, Toast } from '../components/Layout.jsx';
import Mascot from '../components/Mascot.jsx';
import { MODES, formatTime, newProblem, nowLabel, pickMessage, shuffle } from '../utils/game.js';

function makeDeck() {
  const unique = [];
  while (unique.length < 8) {
    const problem = newProblem();
    if (!unique.some((item) => item.answer === problem.answer)) unique.push(problem);
  }

  return shuffle(unique.flatMap((problem, index) => [
    {
      id: `q-${index}`,
      pairId: index,
      value: `${problem.a} × ${problem.b}`,
      type: 'question',
      answer: problem.answer,
      isFlipped: false,
      isMatched: false
    },
    {
      id: `a-${index}`,
      pairId: index,
      value: String(problem.answer),
      type: 'answer',
      answer: problem.answer,
      isFlipped: false,
      isMatched: false
    }
  ]));
}

export default function MemoryGame({ nick, onMenu, onSave }) {
  const initialDeck = useMemo(makeDeck, []);
  const [deck, setDeck] = useState(initialDeck);
  const [isChecking, setIsChecking] = useState(false);
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('neutral');
  const [saved, setSaved] = useState(false);
  const matchedCount = deck.filter((card) => card.isMatched).length;
  const done = matchedCount === deck.length;

  useEffect(() => {
    const timer = setInterval(() => setSeconds((time) => time + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!done || saved) return;

    const finalPoints = Math.max(0, points + Math.max(0, 120 - seconds) + Math.max(0, 40 - moves));
    onSave({ id: crypto.randomUUID(), nick, points: finalPoints, mode: MODES.memory, date: nowLabel(), meta: { seconds, moves } });
    setSaved(true);
    setPoints(finalPoints);
    setMessage('Brawo! Ukończyłeś Memory!');
    setMood('excited');
  }, [done, saved, points, seconds, moves, nick, onSave]);

  function flip(card) {
    if (isChecking || done || card.isMatched || card.isFlipped) return;

    const flippedCards = deck.filter((item) => item.isFlipped && !item.isMatched);
    const nextDeck = deck.map((item) => item.id === card.id ? { ...item, isFlipped: true } : item);
    setDeck(nextDeck);

    if (flippedCards.length !== 1) return;

    const first = flippedCards[0];
    const second = nextDeck.find((item) => item.id === card.id);
    const isMatch = first.answer === second.answer && first.type !== second.type;
    setMoves((count) => count + 1);
    setIsChecking(true);

    if (isMatch) {
      setTimeout(() => {
        setDeck((cards) => cards.map((item) => item.id === first.id || item.id === second.id ? { ...item, isMatched: true } : item));
        setPoints((score) => score + 15);
        setMessage(pickMessage('good'));
        setMood('happy');
        setIsChecking(false);
      }, 360);
      return;
    }

    setMessage('Prawie dobrze!');
    setMood('sad');
    setTimeout(() => {
      setDeck((cards) => cards.map((item) => item.id === first.id || item.id === second.id ? { ...item, isFlipped: false } : item));
      setIsChecking(false);
    }, 900);
  }

  function restart() {
    setDeck(makeDeck());
    setIsChecking(false);
    setPoints(0);
    setMoves(0);
    setSeconds(0);
    setMessage('');
    setMood('neutral');
    setSaved(false);
  }

  return (
    <>
      <GameHeader
        title="Memory"
        nick={nick}
        mascotMood={mood}
        onMenu={onMenu}
        onRestart={restart}
        stats={<><Stat label="Punkty" value={points} tone="yellow" /><Stat label="Ruchy" value={moves} /><Stat label="Czas" value={formatTime(seconds)} /></>}
      />
      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_330px]">
        <div className="game-panel memory-panel">
          <Toast tone={mood === 'sad' ? 'bad' : 'good'}>{message}</Toast>
          <MemoryBoard cards={deck} isChecking={isChecking} onFlip={flip} />
          {done && (
            <div className="memory-finish">
              <h2>Brawo! Ukończyłeś Memory!</h2>
              <p>Czas: {formatTime(seconds)}</p>
              <p>Ruchy: {moves}</p>
              <p>Punkty: {points}</p>
              <button className="btn primary" onClick={restart}>Zagraj ponownie</button>
            </div>
          )}
        </div>
        <aside className="side-panel">
          <Mascot mood={mood} />
          <p className="rounded-3xl bg-white/70 p-4 text-center text-lg font-black text-slate-600">
            Odkryto {matchedCount / 2} z {deck.length / 2} par
          </p>
        </aside>
      </section>
    </>
  );
}

function MemoryBoard({ cards, isChecking, onFlip }) {
  return (
    <div className="memory-grid">
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} disabled={isChecking} onClick={() => onFlip(card)} />
      ))}
    </div>
  );
}

function MemoryCard({ card, disabled, onClick }) {
  const canClick = !disabled && !card.isMatched && !card.isFlipped;

  return (
    <button
      className={`memory-card ${card.isFlipped ? 'is-open' : ''} ${card.isMatched ? 'is-matched' : ''}`}
      disabled={!canClick}
      onClick={onClick}
      aria-label={card.isFlipped ? `Karta ${card.value}` : 'Zakryta karta'}
    >
      <span>{card.isFlipped || card.isMatched ? card.value : '?'}</span>
    </button>
  );
}
