import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, FileText, ShieldAlert, BadgeCheck, AlertTriangle, CheckCircle2, 
  HelpCircle, Lightbulb, MapPin, Copy, Landmark, FileSignature, RefreshCw, EyeOff
} from 'lucide-react';

export const PropiedadIntelectualSlide = () => {
  // Scenario 1 State: Explotación de Derechos
  const [replicationSim, setReplicationSim] = useState<'kennedy' | 'suba'>('kennedy');
  
  // Scenario 2 State: Responsabilidad Civil Chain of Custody
  const [selectedChainStep, setSelectedChainStep] = useState<number>(0);
  const [customLawClauseGlow, setCustomLawClauseGlow] = useState<boolean>(false);

  const chainSteps = [
    {
      title: "1. Diseño de Arquitectura (WIP)",
      actor: "Calculista/Modelador Tedi",
      state: "Diseño Original Protegido",
      desc: "El estructural diseña y calcula las columnas y vigas para el lote específico en Kennedy, registrando su firma digital nativa.",
      status: "safe",
      color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
    },
    {
      title: "2. Fase de Coordinación (SHARED)",
      actor: "Contratista Externo",
      state: "Modificación no Supervisada",
      desc: "Un tercero alteró las cotas o removió un tensor estructural en el CDE para calzar un ducto de ventilación sin consentimiento previo de Tedi.",
      status: "warning",
      color: "border-amber-500/20 bg-amber-500/5 text-amber-400"
    },
    {
      title: "3. Entrega de Obra (PUBLISHED)",
      actor: "Inmobiliaria",
      state: "Construcción Registrada",
      desc: "El modelo alterado se toma como correcto. Se construye la cimentación con las modificaciones negligentes incorporadas en el CDE.",
      status: "danger",
      color: "border-red-500/20 bg-red-500/5 text-red-400"
    },
    {
      title: "4. Auditoría Forense (SINIESTRO)",
      actor: "Peritaje Judicial",
      state: "Fallo Estructural",
      desc: "Un sismo de baja intensidad revela grietas por deficiencia estructural. El seguro exige deslindar responsabilidades civiles.",
      status: "critical",
      color: "border-rose-500/30 bg-rose-500/10 text-rose-400"
    }
  ];

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header section with branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-[0.2em] block mb-1">
            CLASE 5 — SECCIÓN 3: MARCO CONTRACTUAL INTEGRADO
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-500 shrink-0" />
            Propiedad Intelectual y Responsabilidad de la Data Viva
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Blindaje Contractual en el BEP ante Derechos de Autor y Alteración de Entornos de Datos Compartidos (CDE)
          </p>
        </div>
        <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 self-start md:self-auto font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>ESTADO JURÍDICO: <strong>INTEGRIDAD EXTRÍNSECA</strong></span>
        </div>
      </div>

      {/* Introducción / Contexto */}
      <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
        En entornos BIM colaborativos, el modelo arquitectónico y estructural no es un simple conjunto estático de planos PDF; es un <strong className="text-amber-400">fichero vivo</strong> expuesto a continuas manipulaciones. El BIM Manager debe dictaminar salvaguardas legales dentro del contrato principal y el BEP para proteger la propiedad y delimitar la responsabilidad de la empresa.
      </p>

      {/* Two core interactive sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Column 1: Derechos de Explotación Section */}
        <div className="bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Landmark className="w-4 h-4 text-amber-500" />
              </span>
              <div>
                <h3 className="font-mono font-black text-white text-xs uppercase tracking-wider block">1. Derechos de Explotación y Límites de Uso</h3>
                <p className="text-[10px] text-zinc-400">Cláusula de Protección de Réplica del Diseño</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              El cliente o mandante adquiere la licencia de uso del gemelo digital <strong className="text-amber-400">únicamente para un lote y alcance acordados en el contrato</strong> (por ejemplo, las Torres del Horizonte en Kennedy). Copiar, reproducir o revender dicho diseño en un lote alternativo sin consentimiento explícito constituye una violación de derechos de autor y propiedad intelectual.
            </p>

            {/* Simulation controller */}
            <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3">
              <span className="text-[9px] font-mono text-zinc-500 uppercase font-black block tracking-widest">PROBAR COMPORTAMIENTO CONTRACTUAL:</span>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setReplicationSim('kennedy')}
                  className={`p-2.5 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${replicationSim === 'kennedy' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5'}`}
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Kennedy (Lote Autorizado)
                </button>
                <button
                  onClick={() => setReplicationSim('suba')}
                  className={`p-2.5 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${replicationSim === 'suba' ? 'bg-red-500/15 border-red-500/40 text-red-300' : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5'}`}
                >
                  <Copy className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  Suba (Lote Réplica)
                </button>
              </div>

              {/* Simulation Result Area */}
              <div className="p-3 bg-zinc-950/60 rounded-lg min-h-[105px] border border-white/5 flex gap-2.5 items-start">
                <div className="mt-0.5 shrink-0">
                  {replicationSim === 'kennedy' ? (
                    <span className="p-1 px-1.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[8px] font-bold border border-emerald-500/20">VALIDO</span>
                  ) : (
                    <span className="p-1 px-1.5 rounded bg-red-500/15 text-red-400 font-mono text-[8px] font-bold border border-red-500/20 animate-pulse">BLOQUEO</span>
                  )}
                </div>
                
                <div className="text-[11px] leading-relaxed text-slate-300">
                  {replicationSim === 'kennedy' ? (
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Uso Autorizado (Torres del Horizonte в Kennedy):</strong>
                      El modelo BIM se ejecuta conforme al contrato establecido. Se cubren todos los estudios de suelo, cálculos de sismo-resistencia locales y licencias municipales de edificación correspondientes a esta parcela específica. No hay riesgos legales.
                    </div>
                  ) : (
                    <div>
                      <strong className="text-white block font-semibold mb-0.5 text-red-400">Infracción Legal Detectada — Réplica en Suba:</strong>
                      El cliente intentó clonar el fichero nativo para edificarlo en Suba sin pagar regalías al calculista. El contrato estipula protección de derechos intelectuales. <strong className="text-red-400">Sanción contractual aplicable: Multa comercial de resarcimiento e invalidez de toda la garantía técnica de diseño.</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>Matriz jurídica contractual</span>
            <span className="text-amber-500">Módulo Derechos de Autor</span>
          </div>

        </div>

        {/* Column 2: Exoneración Legal de la Data Viva */}
        <div className="bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <FileSignature className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <h3 className="font-mono font-black text-white text-xs uppercase tracking-wider block">2. Exoneración Legal por Modificación Externa</h3>
                <p className="text-[10px] text-zinc-400">Blindaje de Responsabilidad Civil de la Data Viva</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              Dado que los modelos BIM son vulnerables a alteraciones por subcontratistas en el CDE, el contrato debe asentar un blindaje perentorio: <strong className="text-amber-400">Si un tercero modifica un modelo nativo fuera de la supervisión formal de su creador, el autor original se exonera de toda responsabilidad técnica o de seguro.</strong>
            </p>

            {/* Flow selector */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase font-black block tracking-widest">TRAZABILIDAD DE SEGURIDAD CONTRACTUAL EN EL CDE:</span>
              
              <div className="flex flex-wrap gap-1 bg-black/40 p-1 rounded-lg border border-white/5 justify-between">
                {chainSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedChainStep(i)}
                    className={`flex-1 py-1 text-[9px] font-mono font-bold uppercase rounded-md transition-all cursor-pointer ${selectedChainStep === i ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20' : 'text-slate-500 hover:text-slate-350'}`}
                  >
                    Fase {i+1}
                  </button>
                ))}
              </div>

              {/* Dynamic step detail card with high-performance styling */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedChainStep}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`p-3 rounded-xl border flex flex-col justify-between min-h-[140px] text-left transition-all ${chainSteps[selectedChainStep].color}`}
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-2">
                      <span className="text-[10px] font-semibold tracking-wider font-mono uppercase">{chainSteps[selectedChainStep].title}</span>
                      <span className="text-[9px] text-zinc-400 font-mono italic">Actor: {chainSteps[selectedChainStep].actor}</span>
                    </div>
                    <span className="text-[10px] font-bold block mb-1 font-mono uppercase text-white tracking-wide">
                      ⚡ {chainSteps[selectedChainStep].state}
                    </span>
                    <p className="text-[11px] leading-relaxed text-slate-350 font-sans">
                      {chainSteps[selectedChainStep].desc}
                    </p>
                  </div>

                  {selectedChainStep === 3 && (
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex justify-between items-center">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setCustomLawClauseGlow(true);
                            setTimeout(() => setCustomLawClauseGlow(false), 2000);
                          }}
                          className="px-2 py-0.5 rounded bg-[#deb887]/15 hover:bg-[#deb887]/25 text-[#deb887] font-mono text-[9px] border border-[#deb887]/30 transition-all font-bold uppercase cursor-pointer"
                        >
                          ⚖️ Ver Veredicto del CDE
                        </button>
                      </div>
                      <span className="text-[9.5px] font-mono font-bold text-red-400 uppercase">Litigio Evitado con Éxito</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>Cadena de Custodia (Inmutabilidad Log)</span>
            <span className="text-emerald-400">Habilitado ISO 19650</span>
          </div>

        </div>

      </div>

      {/* Dynamic Glow Banner based on Legal Verdict Action */}
      <AnimatePresence>
        {customLawClauseGlow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl flex items-start gap-3 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-left"
          >
            <BadgeCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">
                SENTENCIA TÉCNICA REFRENDADA POR LOGS DEL CDE: EXONERACIÓN CONFIRMADA
              </h4>
              <p className="text-xs text-emerald-100 font-sans leading-relaxed">
                Gracias a que el BIM Manager de la corporación redactó en el BEP el <strong>Principio de Autoría Exclusiva</strong> y el CDE registró de forma inalterable las credenciales del contratista externo en los commits de la Fase 2, la fiscalía e inspectores técnicos de seguros eximen a la empresa de cualquier responsabilidad civil sobre el colapso del tensor. La fianza de diseño queda intacta.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Box Pedagógico */}
      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded text-left shadow-md">
        <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          TIPS PEDAGÓGICOS: REDACCIÓN DE CLÁUSULAS DE INTEGRIDAD
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px] leading-relaxed text-slate-300 font-sans">
          <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
            <h5 className="font-bold text-amber-500 uppercase mb-1">PROTECCIÓN DEL MODELO NATIVO (.RVT / .DGN)</h5>
            <p>
              Explique en las asambleas generales que los nativos constituyen el cerebro técnico del diseñador. El contrato debe estipular que el mandante solo adquiere el derecho a usar la data del modelo exclusivamente para la construcción acordada, prohibiéndose expresamente réplicas de fachada, estructuras o layouts mecánicos en otros proyectos sin liquidar derechos adicionales.
            </p>
          </div>
          <div className="bg-[#040c1c]/40 p-3 rounded border border-white/[0.03]">
            <h5 className="font-bold text-emerald-400 uppercase mb-1">AUDITORÍA DIGITAL LEGAL</h5>
            <p>
              Haga énfasis en que la seguridad legal no es reactiva. Utilice plataformas de CDE donde cada acción deje una huella digital criptográfica inalterable. Si un subcontratista altera el grosor de un muro y causa fisuras, el log del CDE es el jurado imparcial que evita costosas reclamaciones contra la aseguradora corporativa y salva de litigios a Tedi.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
