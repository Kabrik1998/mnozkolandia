import { BookOpen, Play, Trophy } from 'lucide-react';
import Mascot from '../components/Mascot.jsx';

export default function StartScreen({ t, lang, onLangChange, nick, setNick, onStart, onRanking, onHelp, error }) {
  return (
    <section className="start-shell mx-auto grid min-h-[calc(100vh-40px)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
      <div className="start-content min-w-0 text-center lg:text-left">
        <div className="start-topbar mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          <div className="language-switch">
            <button className={lang === 'pl' ? 'is-active' : ''} onClick={() => onLangChange('pl')}>Polski</button>
            <button className={lang === 'en' ? 'is-active' : ''} onClick={() => onLangChange('en')}>English</button>
          </div>
        </div>
        <p className="start-eyebrow mb-2 text-lg font-black text-teal-700">{t.educationalGame}</p>
        <h1 className="logo-title">{t.appName}</h1>
        <p className="start-copy mx-auto mt-4 max-w-xl text-xl font-bold leading-relaxed text-slate-600 lg:mx-0">
          {t.startCopy}
        </p>
        <div className="start-card mt-7 rounded-[30px] bg-white/78 p-4 shadow-soft backdrop-blur sm:p-6">
          <label className="mb-2 block text-left text-lg font-black" htmlFor="nick">{t.nick}</label>
          <input
            id="nick"
            className="input"
            value={nick}
            maxLength={18}
            placeholder={lang === 'en' ? 'e.g. Tina' : 'np. Tosia'}
            onChange={(event) => setNick(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && onStart()}
          />
          {error && <p className="start-error mt-2 text-left font-extrabold text-coral">{error}</p>}
          <div className="start-actions mt-5 grid gap-3 sm:grid-cols-3">
            <button className="btn primary" onClick={onStart}><Play size={22} /> {t.start}</button>
            <button className="btn secondary" onClick={onRanking}><Trophy size={22} /> {t.ranking}</button>
            <button className="btn ghost" onClick={onHelp}><BookOpen size={22} /> {t.howToPlay}</button>
          </div>
        </div>
      </div>
      <div className="mascot-stage flex min-w-0 justify-center">
        <Mascot mood="neutral" />
      </div>
    </section>
  );
}
