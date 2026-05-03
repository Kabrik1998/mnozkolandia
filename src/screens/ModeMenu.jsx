import { Brain, CircleDot, Keyboard, Trophy } from 'lucide-react';
import Mascot from '../components/Mascot.jsx';

const modes = [
  { id: 'quick', title: 'Szybkie mnożenie', icon: Keyboard, color: 'tile-teal', desc: 'Wpisuj wyniki, buduj passę i zdobywaj bonusy.' },
  { id: 'memory', title: 'Memory', icon: Brain, color: 'tile-yellow', desc: 'Dopasuj działanie do wyniku i odkryj wszystkie pary.' },
  { id: 'falling', title: 'Spadające kulki', icon: CircleDot, color: 'tile-coral', desc: 'Klikaj kulkę z poprawnym wynikiem, zanim opadnie.' },
  { id: 'ranking', title: 'Ranking', icon: Trophy, color: 'tile-lilac', desc: 'Zobacz najlepsze wyniki zapisane w tej przeglądarce.' }
];

export default function ModeMenu({ nick, onSelect }) {
  return (
    <section className="mx-auto max-w-6xl py-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="text-lg font-black text-teal-700">Witaj, {nick}!</p>
          <h1 className="text-4xl font-black sm:text-6xl">Wybierz przygodę z mnożeniem</h1>
        </div>
        <Mascot mood="happy" size="small" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
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

