import { Brain, CircleDot, Keyboard, Trophy, UserRound } from 'lucide-react';
import Mascot from '../components/Mascot.jsx';

export default function ModeMenu({ t, nick, onSelect, onChangeStudent }) {
  const modes = [
    { id: 'quick', title: t.quick, icon: Keyboard, color: 'tile-teal', desc: t.quickDesc },
    { id: 'memory', title: t.memory, icon: Brain, color: 'tile-yellow', desc: t.memoryDesc },
    { id: 'falling', title: t.falling, icon: CircleDot, color: 'tile-coral', desc: t.fallingDesc },
    { id: 'ranking', title: t.ranking, icon: Trophy, color: 'tile-lilac', desc: t.rankingDesc }
  ];

  return (
    <section className="mx-auto max-w-6xl py-3 sm:py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-5">
        <div>
          <p className="text-lg font-black text-teal-700">{t.welcome}, {nick}!</p>
          <h1 className="text-4xl font-black sm:text-6xl">{t.chooseAdventure}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn compact ghost" onClick={onChangeStudent}><UserRound size={18} /> {t.changePlayer}</button>
          <Mascot mood="happy" size="small" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-5">
        {modes.map(({ id, title, icon: Icon, color, desc }) => (
          <button key={id} className={`mode-card ${color}`} onClick={() => onSelect(id)}>
            <span className="mode-icon"><Icon size={40} /></span>
            <span className="text-left">
              <strong>{title}</strong>
              <small>{desc}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
