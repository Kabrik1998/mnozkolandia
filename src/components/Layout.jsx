import { ArrowLeft, RotateCcw, UserRound } from 'lucide-react';
import Mascot from './Mascot.jsx';

export function Shell({ children }) {
  return <main className="min-h-screen overflow-hidden bg-game px-3 py-3 text-ink sm:px-6 sm:py-5 lg:px-8">{children}</main>;
}

export function GameHeader({ title, nick, mascotMood, onMenu, onRestart, onChangeStudent, stats, t }) {
  return (
    <header className="mx-auto mb-3 flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-[24px] bg-white/72 p-2 shadow-soft backdrop-blur sm:mb-4 sm:rounded-[28px] sm:p-3">
      <div className="flex items-center gap-3">
        <Mascot mood={mascotMood} size="small" />
        <div>
          <p className="text-sm font-black text-teal-700">{t?.appName || 'MnożkoLandia'}</p>
          <h1 className="text-2xl font-black sm:text-3xl">{title}</h1>
          <p className="text-sm font-bold text-slate-500">{t?.nickname || 'Nick'}: {nick}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        {stats}
        {onChangeStudent && <button className="btn compact ghost" onClick={onChangeStudent}><UserRound size={18} /> {t?.changePlayer || 'Zmień ucznia'}</button>}
        <button className="btn secondary" onClick={onRestart}><RotateCcw size={20} /> {t?.restart || 'Restart'}</button>
        <button className="btn ghost" onClick={onMenu}><ArrowLeft size={20} /> {t?.menu || 'Menu'}</button>
      </div>
    </header>
  );
}

export function Stat({ label, value, tone = 'white' }) {
  return <div className={`stat stat-${tone}`}><span>{label}</span><strong>{value}</strong></div>;
}

export function Toast({ children, tone = 'good' }) {
  if (!children) return <div className="toast toast-empty" aria-hidden="true">&nbsp;</div>;
  return <div className={`toast ${tone === 'bad' ? 'toast-bad' : 'toast-good'}`}>{children}</div>;
}
