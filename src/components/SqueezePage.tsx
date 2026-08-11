import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  FileText, 
  ArrowRight, 
  HeartHandshake,
  Award
} from 'lucide-react';
import { GUIDE_METADATA } from '../data/guideContent';
import { LeadInfo } from '../types';

interface SqueezePageProps {
  onAccessGuide: (lead: LeadInfo) => void;
}

export const SqueezePage: React.FC<SqueezePageProps> = ({ onAccessGuide }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const lead: LeadInfo = {
        name,
        email,
        phone,
        capturedAt: new Date().toISOString()
      };
      onAccessGuide(lead);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Background Subtle Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Brand Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-6 mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              LR
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Levántate Resplandece</h1>
              <p className="text-xs text-amber-400 font-medium">Guía Práctica & Acompañamiento para Padres</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Documento Gratuito · PDF de 23 Páginas</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Book Presentation & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lead Magnet Oficial · Descarga Inmediata</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
              {GUIDE_METADATA.title}
            </h2>

            <p className="text-lg sm:text-xl font-medium text-amber-200/90 leading-relaxed">
              "{GUIDE_METADATA.subtitle}"
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Hay momentos como padre que se sienten como un golpe en el pecho. Descubres algo que no esperabas: una mentira grave, una conversación preocupante o un comportamiento extraño. <strong className="text-white">Lo que hagas en las primeras 72 horas definirá si tu hijo se acerca o se aleja para siempre.</strong>
            </p>

            {/* Included Highlights */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                ¿Qué encontrarás dentro de esta guía completa?
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                {GUIDE_METADATA.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-2 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>Método C.O.N.E.C.T.A.</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Formato PDF Interactivo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Download Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* PDF Mockup Preview Badge */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 flex items-center gap-4">
                <div className="w-14 h-18 bg-gradient-to-b from-amber-500 to-amber-700 rounded-lg flex flex-col justify-between p-2 shadow-md shrink-0 text-slate-950">
                  <span className="text-[9px] font-black uppercase">Guía PDF</span>
                  <BookOpen className="w-6 h-6 self-center my-1" />
                  <span className="text-[8px] font-bold text-center">23 Págs</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Acceso Instantáneo</p>
                  <p className="text-xs text-slate-400 mt-0.5">Lee en pantalla, completa el test interactivo o descarga el archivo PDF original.</p>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Descarga la Guía en PDF
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Ingresa tus datos para desbloquear el visor interactivo y descargar el documento completo de 23 páginas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. María González"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tu Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp (Opcional - Para recordatorios)
                  </label>
                  <input
                    type="tel"
                    placeholder="+52 55 0000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Abriendo Guía PDF...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Descargar Guía & Leer Ahora</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Confidencial. Cero Spam.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 relative z-10">
        <p>© {new Date().getFullYear()} Levántate Resplandece · Todos los derechos reservados.</p>
        <p className="mt-1">Guía "Las Primeras 72 Horas" · Método C.O.N.E.C.T.A.</p>
      </footer>
    </div>
  );
};
