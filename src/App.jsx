import { useMemo, useState } from 'react';
import { Shell } from './components/Layout.jsx';
import FallingBalls from './games/FallingBalls.jsx';
import MemoryGame from './games/MemoryGame.jsx';
import QuickMultiply from './games/QuickMultiply.jsx';
import Help from './screens/Help.jsx';
import ModeMenu from './screens/ModeMenu.jsx';
import Ranking from './screens/Ranking.jsx';
import StartScreen from './screens/StartScreen.jsx';
import { clearScores, loadScores, saveScore } from './utils/storage.js';

export default function App() {
  const [nick, setNick] = useState(localStorage.getItem('mnozkolandia-nick') || '');
  const [screen, setScreen] = useState('start');
  const [error, setError] = useState('');
  const [scores, setScores] = useState(() => loadScores());

  const sortedScores = useMemo(() => [...scores].sort((a, b) => b.points - a.points), [scores]);

  function start() {
    if (!nick.trim()) {
      setError('Wpisz nick przed rozpoczęciem gry.');
      return;
    }
    localStorage.setItem('mnozkolandia-nick', nick.trim());
    setNick(nick.trim());
    setError('');
    setScreen('menu');
  }

  function handleSave(score) {
    setScores(saveScore(score));
  }

  function handleClear() {
    clearScores();
    setScores([]);
  }

  function changeStudent() {
    localStorage.removeItem('mnozkolandia-nick');
    setNick('');
    setError('');
    setScreen('start');
  }

  return (
    <Shell>
      {screen === 'start' && <StartScreen nick={nick} setNick={setNick} error={error} onStart={start} onRanking={() => setScreen('ranking')} onHelp={() => setScreen('help')} />}
      {screen === 'menu' && <ModeMenu nick={nick} onSelect={(id) => setScreen(id)} onChangeStudent={changeStudent} />}
      {screen === 'ranking' && <Ranking scores={sortedScores} onBack={() => setScreen(nick.trim() ? 'menu' : 'start')} onClear={handleClear} />}
      {screen === 'help' && <Help onBack={() => setScreen('start')} />}
      {screen === 'quick' && <QuickMultiply nick={nick} onMenu={() => setScreen('menu')} onSave={handleSave} onChangeStudent={changeStudent} />}
      {screen === 'memory' && <MemoryGame nick={nick} onMenu={() => setScreen('menu')} onSave={handleSave} onChangeStudent={changeStudent} />}
      {screen === 'falling' && <FallingBalls nick={nick} onMenu={() => setScreen('menu')} onSave={handleSave} onChangeStudent={changeStudent} />}
    </Shell>
  );
}
