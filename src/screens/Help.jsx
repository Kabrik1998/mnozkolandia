import { ArrowLeft } from 'lucide-react';
import Mascot from '../components/Mascot.jsx';

export default function Help({ t, onBack }) {
  return (
    <section className="mx-auto max-w-4xl py-6">
      <button className="btn ghost mb-5" onClick={onBack}><ArrowLeft size={20} /> {t.back}</button>
      <div className="rounded-[32px] bg-white/80 p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center gap-5">
          <Mascot mood="excited" size="small" />
          <div>
            <h1 className="text-4xl font-black">{t.howToPlay}</h1>
            <p className="mt-2 text-lg font-bold text-slate-600">{t.chooseModeHelp}</p>
          </div>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <Info title={t.quick} text={t.quickHelp} />
          <Info title={t.memory} text={t.memoryHelp} />
          <Info title={t.falling} text={t.fallingHelp} />
        </div>
      </div>
    </section>
  );
}

function Info({ title, text }) {
  return <div className="info-box"><h2>{title}</h2><p>{text}</p></div>;
}
