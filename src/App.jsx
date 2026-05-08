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
import { translations } from './utils/i18n.js';

export default function App() {
  const [nick, setNick] = useState(localStorage.getItem('mnozkolandia-nick') || '');
  const [screen, setScreen] = useState('start');
  const [error, setError] = useState('');
  const [scores, setScores] = useState(() => loadScores());
  const [lang, setLang] = useState(localStorage.getItem('mnozkolandia-lang') || 'pl');

  const sortedScores = useMemo(() => [...scores].sort((a, b) => b.points - a.points), [scores]);
  const t = translations[lang] || translations.pl;

  function start() {
    if (!nick.trim()) {
      setError(t.enterNickError);
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

  function changeLang(nextLang) {
    setLang(nextLang);
    localStorage.setItem('mnozkolandia-lang', nextLang);
    setError('');
  }

  return (
    <Shell>
      {screen === 'start' && <StartScreen t={t} lang={lang} onLangChange={changeLang} nick={nick} setNick={setNick} error={error} onStart={start} onRanking={() => setScreen('ranking')} onHelp={() => setScreen('help')} />}
      {screen === 'menu' && <ModeMenu t={t} nick={nick} onSelect={(id) => setScreen(id)} onChangeStudent={changeStudent} />}
      {screen === 'ranking' && <Ranking t={t} scores={sortedScores} onBack={() => setScreen(nick.trim() ? 'menu' : 'start')} onClear={handleClear} />}
      {screen === 'help' && <Help t={t} onBack={() => setScreen('start')} />}
      {screen === 'quick' && <QuickMultiply t={t} nick={nick} onMenu={() => setScreen('menu')} onSave={handleSave} onChangeStudent={changeStudent} />}
      {screen === 'memory' && <MemoryGame t={t} nick={nick} onMenu={() => setScreen('menu')} onSave={handleSave} onChangeStudent={changeStudent} />}
      {screen === 'falling' && <FallingBalls t={t} nick={nick} onMenu={() => setScreen('menu')} onSave={handleSave} onChangeStudent={changeStudent} />}
    </Shell>
  );
}
