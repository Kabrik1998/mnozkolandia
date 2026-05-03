import { ArrowLeft, RotateCcw } from 'lucide-react';
import Mascot from './Mascot.jsx';

export function Shell({ children }) {
  return <main className="min-h-screen overflow-hidden bg-game px-4 py-5 text-ink sm:px-6 lg:px-8">{children}</main>;
}

export function GameHeader({ title, nick, mascotMood, onMenu, onRestart, stats }) {
  return (
    <header className="mx-auto mb-4 flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-[28px] bg-white/72 p-3 shadow-soft backdrop-blur">
      <div className="flex items-center gap-3">
        <Mascot mood={mascotMood} size="small" />
        <div>
          <p className="text-sm font-black text-teal-700">MnożkoLandia</p>
          <h1 className="text-2xl font-black sm:text-3xl">{title}</h1>
          <p className="text-sm font-bold text-slate-500">Gracz: {nick}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        {stats}
        <button className="btn secondary" onClick={onRestart}><RotateCcw size={20} /> Restart</button>
        <button className="btn ghost" onClick={onMenu}><ArrowLeft size={20} /> Menu</button>
      </div>
    </header>
  );
}

export function Stat({ label, value, tone = 'white' }) {
  return <div className={`stat stat-${tone}`}><span>{label}</span><strong>{value}</strong></div>;
}

export function Toast({ children, tone = 'good' }) {
  if (!children) return null;
  return <div className={`toast ${tone === 'bad' ? 'toast-bad' : 'toast-good'}`}>{children}</div>;
}

