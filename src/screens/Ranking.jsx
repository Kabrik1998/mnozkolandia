import { ArrowLeft, Trash2 } from 'lucide-react';

export default function Ranking({ t, scores, onBack, onClear }) {
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <section className="mx-auto max-w-5xl py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-black text-teal-700">{t.leaderboard}</p>
          <h1 className="text-4xl font-black sm:text-6xl">{t.ranking}</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn ghost" onClick={onBack}><ArrowLeft size={20} /> {t.back}</button>
          <button className="btn danger" onClick={onClear}><Trash2 size={20} /> {t.clear}</button>
        </div>
      </div>
      <div className="overflow-hidden rounded-[28px] bg-white/82 shadow-soft backdrop-blur">
        <div className="grid grid-cols-[70px_1fr_90px_1fr_140px] gap-2 bg-tealpop/20 px-5 py-4 text-sm font-black uppercase text-slate-600 max-md:hidden">
          <span>{t.place}</span><span>{t.nick}</span><span>{t.points}</span><span>{t.mode}</span><span>{t.date}</span>
        </div>
        {scores.length === 0 ? (
          <p className="p-8 text-center text-xl font-black">{t.emptyRanking}</p>
        ) : scores.map((score, index) => (
          <div key={score.id} className="ranking-row">
            <span className="text-2xl">{medals[index] || index + 1}</span>
            <strong>{score.nick}</strong>
            <span className="font-black text-teal-700">{score.points}</span>
            <span>{t.modeDisplay(score.mode)}</span>
            <span className="text-sm text-slate-500">{score.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
