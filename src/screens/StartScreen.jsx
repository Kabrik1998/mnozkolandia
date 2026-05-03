import { BookOpen, Play, Trophy } from 'lucide-react';
import Mascot from '../components/Mascot.jsx';

export default function StartScreen({ nick, setNick, onStart, onRanking, onHelp, error }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-40px)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
      <div className="text-center lg:text-left">
        <p className="mb-2 text-lg font-black text-teal-700">Gra edukacyjna</p>
        <h1 className="logo-title">MnożkoLandia</h1>
        <p className="mx-auto mt-4 max-w-xl text-xl font-bold leading-relaxed text-slate-600 lg:mx-0">
          Ćwicz tabliczkę mnożenia z Mnożkiem, zbieraj punkty i bij swoje rekordy.
        </p>
        <div className="mt-7 rounded-[30px] bg-white/78 p-4 shadow-soft backdrop-blur sm:p-6">
          <label className="mb-2 block text-left text-lg font-black" htmlFor="nick">Nick dziecka</label>
          <input
            id="nick"
            className="input"
            value={nick}
            maxLength={18}
            placeholder="np. Tosia"
            onChange={(event) => setNick(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && onStart()}
          />
          {error && <p className="mt-2 text-left font-extrabold text-coral">{error}</p>}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button className="btn primary" onClick={onStart}><Play size={22} /> Start</button>
            <button className="btn secondary" onClick={onRanking}><Trophy size={22} /> Ranking</button>
            <button className="btn ghost" onClick={onHelp}><BookOpen size={22} /> Jak grać?</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Mascot mood="neutral" />
      </div>
    </section>
  );
}

