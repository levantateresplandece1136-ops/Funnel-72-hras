import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Printer, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  FileText,
  Heart,
  Share2,
  Check
} from 'lucide-react';
import { LeadInfo, TestAnswers } from '../types';
import { TEST_QUESTIONS, TEST_SCORES, GUIDE_METADATA } from '../data/guideContent';

interface GuideReaderProps {
  lead: LeadInfo;
  onBackToOptin: () => void;
}

export const GuideReader: React.FC<GuideReaderProps> = ({ lead, onBackToOptin }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [testAnswers, setTestAnswers] = useState<TestAnswers>({});
  const [planText24, setPlanText24] = useState<string>('');
  const [planText48, setPlanText48] = useState<string>('');
  const [planText72, setPlanText72] = useState<string>('');
  const [checklist, setChecklist] = useState<{ [key: number]: boolean }>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const totalPages = 23;

  // Handle test answers
  const handleAnswerSelect = (qIdx: number, score: number) => {
    setTestAnswers(prev => ({ ...prev, [qIdx]: score }));
  };

  const calculateScore = () => {
    return (Object.values(testAnswers) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
  };

  const scoreTotal = calculateScore();
  const answeredCount = Object.keys(testAnswers).length;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    // Generate simple print/download dialog
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans print:bg-white print:text-black">
      {/* Top Header / Navigation Ribbon (Hidden in Print) */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToOptin}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>LAS PRIMERAS 72 HORAS</span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Lector Oficial · Bienvenido/a <strong className="text-amber-300">{lead.name}</strong>
              </p>
            </div>
          </div>

          {/* Controls: Page selector & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Page Jump */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300">
              <span>Pág</span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p} className="bg-slate-900 text-white">
                    {p} / {totalPages}
                  </option>
                ))}
              </select>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg transition-colors"
                title="Página Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg transition-colors"
                title="Siguiente Página"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Download / Print */}
            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descargar / Imprimir PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              title="Compartir enlace"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Viewer */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[750px] relative flex flex-col justify-between print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
          
          {/* Page Top Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs text-slate-400 print:border-slate-300">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {GUIDE_METADATA.brand} · Lead Magnet
            </span>
            <span className="font-mono text-slate-500 print:text-black">
              PÁGINA {currentPage < 10 ? `0${currentPage}` : currentPage} DE {totalPages}
            </span>
          </div>

          {/* PAGE CONTENT SWITCH */}
          <div className="flex-1 space-y-6">

            {/* PAGE 1: PORTADA */}
            {currentPage === 1 && (
              <div className="text-center py-8 space-y-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                  Guía Oficial de Acompañamiento
                </div>

                <div className="space-y-4 max-w-2xl mx-auto">
                  <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                    LAS PRIMERAS 72 HORAS
                  </h2>
                  <p className="text-lg sm:text-xl font-medium text-amber-200/90 leading-snug">
                    Qué hacer —y qué evitar— cuando descubres que algo anda mal con tu hijo
                  </p>
                </div>

                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto rounded-full" />

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl max-w-xl mx-auto text-left space-y-3">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Esta guía incluye:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {GUIDE_METADATA.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 text-xs text-slate-500">
                  <p>Autoría: Levántate Resplandece · Método C.O.N.E.C.T.A.</p>
                  <p className="mt-1">Navega utilizando los botones inferiores o las flechas de tu teclado.</p>
                </div>
              </div>
            )}

            {/* PAGE 2: CARTA AL PADRE */}
            {currentPage === 2 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Antes de empezar...
                </h3>
                <p className="text-sm leading-relaxed">
                  Hay momentos como padre que se sienten como un golpe en el pecho.
                </p>
                <p className="text-sm leading-relaxed">
                  Descubres algo que no esperabas: una mentira grave, una conversación preocupante en su teléfono, una baja dramática en sus calificaciones, o peor aún... señales de algo que te hiela la sangre.
                </p>
                <div className="bg-slate-950 p-4 border-l-4 border-amber-500 rounded-r-xl text-sm font-medium text-amber-200">
                  En ese instante, el mundo se detiene. Tu mente empieza a girar a mil kilómetros por hora:
                  <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-xs">
                    <li>"¿En qué fallé?"</li>
                    <li>"¿Cómo no me di cuenta antes?"</li>
                    <li>"¿Con quién está hablando?"</li>
                    <li>"¿Qué van a decir los demás?"</li>
                  </ul>
                </div>
                <p className="text-sm leading-relaxed">
                  Y luego llega el impulso: la urgencia de confrontar, de gritar, de castigar, de revisar todo, de arreglarlo inmediatamente. Es comprensible. Es el instinto de protección mezclado con miedo.
                </p>
              </div>
            )}

            {/* PAGE 3: CARTA AL PADRE (CONT.) */}
            {currentPage === 3 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Lo que debes saber hoy
                </h3>
                <p className="text-sm leading-relaxed">
                  Pero quiero decirte algo antes de que des el siguiente paso:
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl text-amber-200 font-semibold text-base text-center">
                  "Las primeras 72 horas después de descubrir que algo anda mal determinarán si tu hijo se acerca a ti o se aleja para siempre."
                </div>
                <p className="text-sm leading-relaxed">
                  Esta guía no es para juzgarte. No es para decirte qué tan buen o mal padre has sido. Es un mapa de navegación de emergencia para cuando el mar se pone picado.
                </p>
                <p className="text-sm leading-relaxed">
                  Respira profundo. Tu hijo no necesita un juez en este momento. Necesita a su padre. Necesita a su madre.
                </p>
              </div>
            )}

            {/* PAGE 4: CUANDO DESCUBRES QUE ALGO CAMBIÓ */}
            {currentPage === 4 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Cuando descubres que algo cambió
                </h3>
                <p className="text-sm leading-relaxed">
                  Los cambios en los hijos rara vez ocurren de la noche a la mañana. Lo que suele suceder es que nos damos cuenta de golpe.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-amber-400 uppercase mb-2">Señales Físicas & Actitud</h4>
                    <p className="text-xs text-slate-300">Aislamiento en su habitación, cambios drásticos en el sueño, irritabilidad defensiva, abandono de pasatiempos que antes le apasionaban.</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-amber-400 uppercase mb-2">Señales Digitales & Sociales</h4>
                    <p className="text-xs text-slate-300">Nuevas amistades desconocidas, comportamiento secreto con dispositivos, modificación del lenguaje o respuestas cortantes.</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  El primer error es asumir que el síntoma es el problema. La mentira o la rebeldía no son el problema principal: son el humo que indica que hay un fuego encendido por dentro.
                </p>
              </div>
            )}

            {/* PAGE 5: EL PADRE TAMBIÉN NECESITA ACOMPAÑAMIENTO */}
            {currentPage === 5 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Antes de reaccionar: Cuidado del Padre
                </h3>
                <p className="text-sm leading-relaxed">
                  Un piloto de avión en turbulencia no puede transmitir calma a sus pasajeros si él mismo está hiperventilando. Como padre, tu estado emocional regula el ambiente del hogar.
                </p>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase">3 Reglas de Oro para ti antes de hablar:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300">
                    <li><strong className="text-white">No hables en caliente:</strong> Si sientes ira o desesperación, posterga la conversación 1 hora.</li>
                    <li><strong className="text-white">No prometas lo que no cumplirás:</strong> Evita amenazas de castigos extremos motivados por el miedo.</li>
                    <li><strong className="text-white">Busca a tu cónyuge o mentor de confianza:</strong> Descarga la frustración primero con un adulto maduro.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* PAGE 6: SEMÁFORO DE REACCIÓN */}
            {currentPage === 6 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  El Semáforo de Reacción
                </h3>
                <div className="space-y-4">
                  <div className="bg-rose-950/40 border border-rose-800/60 p-4 rounded-2xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-600 font-black text-white flex items-center justify-center shrink-0">01</div>
                    <div>
                      <h4 className="font-bold text-rose-300 text-sm">DETENTE (Luz Roja)</h4>
                      <p className="text-xs text-slate-300 mt-1">Pausa los reclamos directos. Guarda tu teléfono. No entres irrumpiendo a su habitación.</p>
                    </div>
                  </div>

                  <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-2xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500 font-black text-slate-950 flex items-center justify-center shrink-0">02</div>
                    <div>
                      <h4 className="font-bold text-amber-300 text-sm">OBSERVA (Luz Amarilla)</h4>
                      <p className="text-xs text-slate-300 mt-1">Escribe lo que has notado objetivamente sin adjetivos descalificativos.</p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-2xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 font-black text-slate-950 flex items-center justify-center shrink-0">03</div>
                    <div>
                      <h4 className="font-bold text-emerald-300 text-sm">ACÉRCATE (Luz Verde)</h4>
                      <p className="text-xs text-slate-300 mt-1">Inicia la aproximación desde la curiosidad y el amor, jamás desde la acusación.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 7: PLAN DE LAS 72 HORAS */}
            {currentPage === 7 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Tu Plan de Acción: Las 72 Horas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase">Horas 0 a 24</span>
                    <h4 className="font-extrabold text-white text-sm my-1">Contención & Estabilidad</h4>
                    <p className="text-xs text-slate-400">Asegura que tu hijo sepa que es amado incondicionalmente, independientemente del problema.</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase">Horas 24 a 48</span>
                    <h4 className="font-extrabold text-white text-sm my-1">Diálogo Abierto</h4>
                    <p className="text-xs text-slate-400">Aplica la regla 70/30: escucha el 70% del tiempo y habla solo el 30%.</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase">Horas 48 a 72</span>
                    <h4 className="font-extrabold text-white text-sm my-1">Acuerdos & Apoyo</h4>
                    <p className="text-xs text-slate-400">Establezcan límites claros juntos y busquen ayuda especializada si la situación lo exige.</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 8: REGLA 70/30 */}
            {currentPage === 8 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Escucha antes de interpretar: La Regla 70/30
                </h3>
                <p className="text-sm leading-relaxed">
                  El error más frecuente en los padres es dar sermones de 45 minutos esperando que el hijo reaccione con una revelación. En la práctica, los sermones solo generan desconexión y aislamiento.
                </p>
                <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 text-center space-y-3">
                  <div className="text-3xl font-black text-amber-400">70% / 30%</div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">70% Escuchar con empatía:</strong> Permite silencios sin interrumpir.<br />
                    <strong className="text-white">30% Hacer preguntas reflexivas:</strong> Sin juzgar ni sermonear.
                  </p>
                </div>
              </div>
            )}

            {/* PAGE 9: PREGUNTAS QUE ABREN VS CIERRAN */}
            {currentPage === 9 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Preguntas que Abren vs. Preguntas que Cierran
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-rose-950/30 border border-rose-900/50 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-rose-400 uppercase mb-2">❌ Preguntas que CIERRAN puertas:</h4>
                    <ul className="text-xs text-slate-300 space-y-2">
                      <li>• "¿Por qué eres tan desobediente?"</li>
                      <li>• "¿En qué estabas pensando?"</li>
                      <li>• "¿Acaso no te importa tu futuro?"</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">✅ Preguntas que ABREN la conversación:</h4>
                    <ul className="text-xs text-slate-300 space-y-2">
                      <li>• "¿Qué estabas sintiendo en ese momento?"</li>
                      <li>• "¿Cómo puedo ayudarte a solucionar esto?"</li>
                      <li>• "¿Qué necesitas de mí hoy?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 10: 12 PREGUNTAS CLAVE */}
            {currentPage === 10 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  12 Preguntas cuando no sabes qué decir
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    "1. ¿Cómo te sientes respecto a lo que pasó?",
                    "2. ¿Hay algo que sientas que no he comprendido?",
                    "3. ¿Sientes que puedes contarme tus temores?",
                    "4. ¿Qué es lo más difícil para ti ahora mismo?",
                    "5. ¿Cómo te gustaría que reaccione cuando te equivocas?",
                    "6. ¿Qué esperas de mí en este momento?",
                    "7. ¿Hay alguien presionándote fuera de casa?",
                    "8. ¿Qué podemos hacer juntos para corregir esto?",
                    "9. ¿Te has sentido solo o incomprendido últimamente?",
                    "10. ¿Cómo podemos mejorar nuestra confianza mutua?",
                    "11. ¿Quieres un consejo o solo necesitas que te escuche?",
                    "12. ¿Sabes lo mucho que te amo pase lo que pase?"
                  ].map((q, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200 font-medium">
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 11: EL SILENCIO NO ES RECHAZO */}
            {currentPage === 11 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  El silencio no siempre significa rechazo
                </h3>
                <p className="text-sm leading-relaxed">
                  Cuando un hijo responde con encogimiento de hombros, "no sé" o silencio prolongado, a menudo no es rebeldía, sino sobrecarga emocional.
                </p>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs sm:text-sm">
                  <p className="font-bold text-amber-300">Respuesta recomendada ante el silencio:</p>
                  <p className="italic text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                    "Entiendo que no quieras hablar ahora. No te voy a presionar. Solo quiero que sepas que aquí estaré en el momento en que quieras hablar, sin gritos ni reclamos."
                  </p>
                </div>
              </div>
            )}

            {/* PAGE 12: BARRERAS Y SANTIAGO 1:19 */}
            {currentPage === 12 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Fe y Sabiduría en la Corrección
                </h3>
                <p className="text-sm leading-relaxed">
                  A veces usamos versículos o frases espirituales como armas de condenación en lugar de bálsamo de restauración.
                </p>

                <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl text-center space-y-2">
                  <p className="text-sm font-bold text-amber-300">Santiago 1:19</p>
                  <p className="text-xs sm:text-sm italic text-slate-200">
                    "Por esto, mis amados hermanos, todo hombre sea pronto para oír, tardo para hablar, tardo para airarse."
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  La verdadera fe se demuestra en la paciencia, el perdón activo y el acompañamiento constante durante la tormenta.
                </p>
              </div>
            )}

            {/* PAGE 13: QUÉ DECIR CUANDO NO SABES QUÉ DECIR */}
            {currentPage === 13 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Guión de Emergencia: Qué Decir
                </h3>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-amber-400 uppercase">Guión para iniciar la conversación:</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900 p-4 rounded-xl border border-slate-800">
                    "[Nombre de tu hijo], me me enteré de lo sucedido. No te voy a mentir: me preocupa mucho y me dolió. Pero quiero que tengas bien claro algo: mi amor por ti no ha cambiado ni un milímetro. Vamos a resolver esto juntos como familia."
                  </p>
                </div>
              </div>
            )}

            {/* PAGE 14: AYUDA PROFESIONAL */}
            {currentPage === 14 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-rose-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  Cuándo buscar ayuda profesional de inmediato
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Hay situaciones que sobrepasan la orientación familiar básica y requieren intervención médica, psicológica o pastoral especializada inmediata:
                </p>
                <div className="bg-rose-950/20 border border-rose-900/50 p-5 rounded-2xl space-y-2 text-xs sm:text-sm text-slate-200">
                  <p className="flex items-center gap-2 text-rose-300 font-bold">
                    <span>⚠️ Alerta Roja:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                    <li>Menciones o conductas de autolesión o ideación suicida.</li>
                    <li>Consumo compulsivo de sustancias destructivas.</li>
                    <li>Víctima de abuso físico, sexual o acoso severo (cyberbullying).</li>
                    <li>Episodios de desconexión completa con la realidad o violencia extrema.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* PAGE 15: MI PLAN DE 72 HORAS (INTERACTIVO) */}
            {currentPage === 15 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Mi Plan de 72 Horas (Hoja de Trabajo)
                </h3>
                <p className="text-xs text-slate-400">
                  Escribe y planifica tus compromisos concretos para las próximas horas:
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-amber-300 mb-1">
                      DÍA 1 (Horas 0-24) · Mi objetivo de contención emocional:
                    </label>
                    <textarea
                      rows={2}
                      value={planText24}
                      onChange={(e) => setPlanText24(e.target.value)}
                      placeholder="Ej. Hoy no le reclamaré sobre sus notas. Le prepararé su cena favorita y le diré que lo amo."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-300 mb-1">
                      DÍA 2 (Horas 24-48) · Pregunta abierta que le haré:
                    </label>
                    <textarea
                      rows={2}
                      value={planText48}
                      onChange={(e) => setPlanText48(e.target.value)}
                      placeholder="Ej. Le preguntaré: '¿Qué puedo hacer para que sientas más apoyo de mi parte?'"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-300 mb-1">
                      DÍA 3 (Horas 48-72) · Compromiso o acuerdo mutuo:
                    </label>
                    <textarea
                      rows={2}
                      value={planText72}
                      onChange={(e) => setPlanText72(e.target.value)}
                      placeholder="Ej. Estableceremos el horario libre de pantallas por la noche juntos."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 16: TEST DE CONEXIÓN (INTERACTIVO) */}
            {currentPage === 16 && (
              <div className="space-y-6 text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-2xl font-black text-amber-400">
                    Test: ¿Qué tan conectado estás con tu hijo?
                  </h3>
                  <span className="text-xs bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                    Responde 10 preguntas
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Selecciona la opción que mejor describa la realidad de tu hogar (0 = Nunca/No sé, 3 = Totalmente):
                </p>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                  {TEST_QUESTIONS.map((q, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-medium text-slate-200">{idx + 1}. {q}</p>
                      <div className="flex items-center gap-2">
                        {[0, 1, 2, 3].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleAnswerSelect(idx, val)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              testAnswers[idx] === val
                                ? 'bg-amber-500 text-slate-950 shadow'
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {val === 0 ? 'Nunca' : val === 1 ? 'Rara vez' : val === 2 ? 'Frecuente' : 'Siempre'} ({val}pt)
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">
                    Preguntas respondidas: <strong className="text-white">{answeredCount} / 10</strong>
                  </span>
                  <button
                    onClick={() => setCurrentPage(17)}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-amber-400 transition-colors"
                  >
                    <span>Ver Resultado ({scoreTotal} pts)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 17: INTERPRETACIÓN DEL TEST */}
            {currentPage === 17 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Interpretación del Resultado del Test
                </h3>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tu Puntaje Actual</p>
                  <p className="text-5xl font-black text-amber-400">{scoreTotal} / 30 pts</p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className={`p-4 rounded-2xl border ${scoreTotal >= 21 ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-slate-950 border-slate-800'}`}>
                    <h4 className="font-bold text-emerald-400">{TEST_SCORES.high.range}: {TEST_SCORES.high.label}</h4>
                    <p className="text-slate-300 text-xs mt-1">{TEST_SCORES.high.desc}</p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${scoreTotal >= 11 && scoreTotal <= 20 ? 'bg-amber-950/40 border-amber-500/50' : 'bg-slate-950 border-slate-800'}`}>
                    <h4 className="font-bold text-amber-400">{TEST_SCORES.medium.range}: {TEST_SCORES.medium.label}</h4>
                    <p className="text-slate-300 text-xs mt-1">{TEST_SCORES.medium.desc}</p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${scoreTotal <= 10 ? 'bg-rose-950/40 border-rose-500/50' : 'bg-slate-950 border-slate-800'}`}>
                    <h4 className="font-bold text-rose-400">{TEST_SCORES.low.range}: {TEST_SCORES.low.label}</h4>
                    <p className="text-slate-300 text-xs mt-1">{TEST_SCORES.low.desc}</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 18: ELIGE UNA PUERTA */}
            {currentPage === 18 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Elige una puerta
                </h3>
                <p className="text-sm leading-relaxed">
                  Hoy tienes ante ti dos caminos claros como padre:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-rose-800/40 space-y-2">
                    <h4 className="font-bold text-rose-400 text-sm">Puerta 1: Mantener la distancia</h4>
                    <p className="text-xs text-slate-400">Reaccionar con castigos viscerales, exigir obediencia sin conexión y esperar que el tiempo arregle mágicamente las heridas.</p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-800/40 space-y-2">
                    <h4 className="font-bold text-emerald-400 text-sm">Puerta 2: Reconstruir el puente</h4>
                    <p className="text-xs text-slate-400">Aplicar el Método C.O.N.E.C.T.A., priorizar la relación sobre la razón inmediata y ser el refugio seguro que tu hijo necesita.</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 19: CHECKLIST FINAL (INTERACTIVO) */}
            {currentPage === 19 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Checklist: Antes de cerrar esta guía
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  {[
                    "Escribí mis 3 compromisos para las próximas 72 horas.",
                    "Realicé el Test de Conexión y conozco mi punto de partida.",
                    "Elegí 2 preguntas de la lista de 12 para hacerle a mi hijo.",
                    "Decidí no responder con gritos ni sermones impulsivos.",
                    "Tengo a la mano los datos de contacto en caso de requerir ayuda profesional."
                  ].map((item, i) => (
                    <label
                      key={i}
                      onClick={() => setChecklist(prev => ({ ...prev, [i]: !prev[i] }))}
                      className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        checklist[i] ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'
                      }`}>
                        {checklist[i] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={checklist[i] ? 'line-through text-slate-500' : 'text-slate-200'}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 20: UNA ÚLTIMA REFLEXIÓN */}
            {currentPage === 20 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Una última reflexión
                </h3>
                <p className="text-sm leading-relaxed">
                  Los errores de nuestros hijos no definen el destino final de sus vidas. Lo que marca la diferencia eterna es la forma en que los acompañamos a levantarse cuando caen.
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl text-center font-serif text-lg italic text-amber-200">
                  "Un hijo que sabe que es amado en sus peores momentos nunca tendrá miedo de regresar a casa."
                </div>
              </div>
            )}

            {/* PAGE 21: ESTO APENAS COMIENZA */}
            {currentPage === 21 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Y esto apenas comienza...
                </h3>
                <p className="text-sm leading-relaxed">
                  Las primeras 72 horas son el primer auxilio emocional. Luego comienza el trabajo continuo de nutrición de la relación.
                </p>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm space-y-2">
                  <p className="font-bold text-amber-400">Próximos Pasos Recomendados:</p>
                  <p className="text-slate-300">• Únete a la comunidad de padres de Levántate Resplandece.</p>
                  <p className="text-slate-300">• Profundiza en los talleres del Método C.O.N.E.C.T.A.</p>
                </div>
              </div>
            )}

            {/* PAGE 22: MÉTODO C.O.N.E.C.T.A. */}
            {currentPage === 22 && (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-2xl font-black text-amber-400 border-b border-slate-800 pb-2">
                  Método C.O.N.E.C.T.A.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 text-sm">C</strong> - Comprender la causa raíz.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 text-sm">O</strong> - Observar sin juzgar prematuramente.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 text-sm">N</strong> - Nutrir la confianza diariamente.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 text-sm">E</strong> - Escuchar el 70% del tiempo.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 text-sm">C</strong> - Comunicar con claridad y amor.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 text-sm">T</strong> - Trabajar en acuerdos en equipo.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 sm:col-span-2">
                    <strong className="text-amber-400 text-sm">A</strong> - Acompañar de forma incondicional.
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 23: CIERRE */}
            {currentPage === 23 && (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Heart className="w-8 h-8 fill-amber-400/20" />
                </div>

                <h3 className="text-2xl font-black text-white">
                  ¡Gracias por tu dedicación como padre!
                </h3>

                <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  No necesitas ser el padre perfecto que jamás comete errores. Necesitas ser el padre presente que aprende a reparar el vínculo con amor y sabiduría.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Guardar / Imprimir este PDF</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>Volver a la Portada</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Page Bottom Controls & Pagination (Hidden in Print) */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6 text-xs text-slate-400 print:hidden">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-[400px] py-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    currentPage === p
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold disabled:opacity-40 rounded-xl flex items-center gap-1 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};
