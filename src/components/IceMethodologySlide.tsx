import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Clock, Zap, ArrowRight, CheckCircle2, ShieldAlert, MessageSquare, RefreshCw, Sparkles, AlertCircle, Play, DollarSign } from 'lucide-react';

interface Specialist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  borderClr: string;
  bgClr: string;
  impactScore: number; // 0-100
  costPerHour: number;
}

const ALL_SPECIALISTS: Specialist[] = [
  {
    id: 'manager',
    name: 'Ing. Elena Rivas',
    role: 'BIM Manager / Moderador',
    avatar: '👩‍💼',
    color: 'text-amber-400',
    borderClr: 'border-amber-500/30',
    bgClr: 'bg-amber-950/20',
    impactScore: 90,
    costPerHour: 60,
  },
  {
    id: 'structural',
    name: 'Ing. Carlos Ortiz',
    role: 'Calculista Estructural',
    avatar: '👷‍♂️',
    color: 'text-red-400',
    borderClr: 'border-red-500/30',
    bgClr: 'bg-red-950/20',
    impactScore: 85,
    costPerHour: 50,
  },
  {
    id: 'mep',
    name: 'Ing. Marcos Soto',
    role: 'Coordinador Instalaciones (MEP)',
    avatar: '👨‍🔧',
    color: 'text-blue-400',
    borderClr: 'border-blue-500/30',
    bgClr: 'bg-blue-950/20',
    impactScore: 80,
    costPerHour: 45,
  },
  {
    id: 'architecture',
    name: 'Arq. Sofía Soler',
    role: 'Líder de Arquitectura',
    avatar: '👩‍🎨',
    color: 'text-purple-400',
    borderClr: 'border-purple-500/30',
    bgClr: 'bg-purple-950/20',
    impactScore: 75,
    costPerHour: 45,
  },
  {
    id: 'client',
    name: 'Sr. Roberto Peña',
    role: 'Representante del Cliente',
    avatar: '👨‍💼',
    color: 'text-emerald-400',
    borderClr: 'border-emerald-500/30',
    bgClr: 'bg-emerald-950/20',
    impactScore: 60,
    costPerHour: 40,
  },
];

interface ChatMessage {
  sender: string;
  role: string;
  text: string;
  time: string;
  color: string;
}

const CONVERSATION_STEPS: ChatMessage[] = [
  {
    sender: 'Ing. Elena Rivas (BIM Manager)',
    role: 'Moderador',
    text: 'Bienvenidos a la sesión ICE #14. Analicemos el conflicto ID-802: Colector cloacal interseca la viga de refuerzo principal del pórtico 4.',
    time: '10:00 AM',
    color: 'text-amber-400'
  },
  {
    sender: 'Ing. Carlos Ortiz (Estructuras)',
    role: 'Calculista',
    text: 'Esa viga soporta el núcleo del ascensor. Reducir su altura o perforarla en el centro es inviable estructuralmente. El hormigón fallaría por cortante.',
    time: '10:02 AM',
    color: 'text-red-400'
  },
  {
    sender: 'Ing. Marcos Soto (MEP)',
    role: 'Instalaciones',
    text: 'Por gravedad necesito un 1.5% de pendiente. No puedo desviar el colector por encima porque invado el cielorraso del vestíbulo. Pero sí puedo pasarlo 30cm al este.',
    time: '10:04 AM',
    color: 'text-blue-400'
  },
  {
    sender: 'Arq. Sofía Soler (Arquitectura)',
    role: 'Líder',
    text: 'Si lo pasas 30cm al este, ¿cruzas por el pleno vertical proyectado o invades el corredor público?',
    time: '10:05 AM',
    color: 'text-purple-400'
  },
  {
    sender: 'Ing. Marcos Soto (MEP)',
    role: 'Instalaciones',
    text: 'Cruzo exactamente por el shaft técnico secundario de corrientes débiles. Hay espacio físico suficiente y no altera la pendiente hidráulica.',
    time: '10:07 AM',
    color: 'text-blue-400'
  },
  {
    sender: 'Ing. Elena Rivas (BIM Manager)',
    role: 'Moderador',
    text: 'Perfecto. Acabo de mover el elemento en el modelo federado compartido en vivo. Visualicemos... ¡Conflicto despejado! Sr. Roberto, ¿aprueba el cambio en vivo?',
    time: '10:09 AM',
    color: 'text-amber-400'
  },
  {
    sender: 'Sr. Roberto Peña (Cliente)',
    role: 'Propietario',
    text: 'Excelente. No afecta la estética ni el costo. Aprobado de inmediato. Procedan con la modificación oficial en el modelo.',
    time: '10:10 AM',
    color: 'text-emerald-400'
  },
  {
    sender: 'Ing. Elena Rivas (BIM Manager)',
    role: 'Moderador',
    text: '¡Trámite de aprobación completado en 10 minutos! Siguiente conflicto, por favor...',
    time: '10:11 AM',
    color: 'text-amber-400'
  }
];

export const IceMethodologySlide = () => {
  const [selectedSpecialists, setSelectedSpecialists] = useState<string[]>(['manager', 'structural', 'mep']);
  const [chatStep, setChatStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<ChatMessage[]>([]);

  const toggleSpecialist = (id: string) => {
    if (id === 'manager') return; // The moderator is always present
    if (selectedSpecialists.includes(id)) {
      setSelectedSpecialists(selectedSpecialists.filter(x => x !== id));
    } else {
      setSelectedSpecialists([...selectedSpecialists, id]);
    }
  };

  // Calculations based on active specialists
  const totalSpecialists = selectedSpecialists.length;
  
  // Consensus increases as more key specialists are present in the room
  const baseConsensus = 20; // baseline with just moderator
  const specialistContributions: Record<string, number> = {
    manager: 10,
    structural: 25,
    mep: 25,
    architecture: 15,
    client: 20
  };
  const averageConsensus = Math.min(100, selectedSpecialists.reduce((acc, curr) => {
    return acc + (specialistContributions[curr] || 0);
  }, baseConsensus));

  const rawResolutionTimeMinutes = Math.max(10, Math.round(120 - (totalSpecialists * 18))); 
  const totalCostOfSessionUSD = Math.round(
    selectedSpecialists.reduce((acc, curr) => {
      const spec = ALL_SPECIALISTS.find(s => s.id === curr);
      return acc + (spec ? spec.costPerHour : 0);
    }, 0) * (rawResolutionTimeMinutes / 60)
  );

  // Traditional process requires approx 40 hours of fragmented emails and waiting
  const traditionalProcessHours = 72; // 3 days response loops
  const traditionalCostUSD = 2400; // includes delay, rework, and coordination email overhead

  // Rework savings: is substantial if we have structural and MEP and Architect together
  const hasKeyTrio = selectedSpecialists.includes('structural') && selectedSpecialists.includes('mep') && selectedSpecialists.includes('architecture');
  const potentialSavingsUSD = hasKeyTrio ? 8500 : (selectedSpecialists.includes('structural') && selectedSpecialists.includes('mep') ? 4500 : 1200);

  useEffect(() => {
    if (isSimulating && chatStep < CONVERSATION_STEPS.length - 1) {
      const timer = setTimeout(() => {
        const nextStep = chatStep + 1;
        setChatStep(nextStep);
        setSimulationLog(prev => [...prev, CONVERSATION_STEPS[nextStep]]);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (chatStep === CONVERSATION_STEPS.length - 1) {
      setIsSimulating(false);
    }
  }, [isSimulating, chatStep]);

  const startSimulation = () => {
    // Reset conversation
    setChatStep(-1);
    setSimulationLog([]);
    setIsSimulating(true);
    
    // Add the structural, mep, and architect to active list to show the full potential
    const defaultFullTrio = ['manager', 'structural', 'mep', 'architecture', 'client'];
    setSelectedSpecialists(defaultFullTrio);
  };

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6" id="ice-slide">
      {/* Header */}
      <div className="border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-[0.2em] block mb-1">
            SESIÓN 10 — AUDITORÍA, ASEGURAMIENTO DE CALIDAD Y MÉTRICAS
          </span>
          <h2 className="text-xl md:text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <Users className="text-purple-400 w-6 h-6 shrink-0" /> BLOQUE 1: Apoyo en Auditorías para Ejecución de Proyectos (Metodología ICE)
          </h2>
        </div>
      </div>

      {/* Theoretical Block */}
      <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider">La Destrucción de la Burocracia en Coordinación</h4>
          <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed">
            Las reuniones de coordinación tradicionales son lentas y burocráticas (se detecta un error, se envía por correo, se responde a la semana y el proyecto se detiene). La metodología <span className="text-white font-bold">ICE (Integrated Concurrent Engineering)</span>, pilar fundamental del marco <span className="text-white font-bold">VDC (Virtual Design and Construction)</span> de la Universidad de Stanford, destruye la burocracia reuniendo en sesiones de alta intensidad a los tomadores de decisiones con un solo objetivo: <span className="font-bold text-emerald-400">resolver problemas en tiempo real</span>.
          </p>
        </div>
      </div>

      {/* A. Factores de Éxito of ICE Session */}
      <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="border-b border-white/5 pb-2">
          <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="text-purple-400 w-4 h-4" /> A. Factores de Éxito de una Sesión ICE (La estrategia del Manager)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-purple-400">
              <div className="p-1.5 bg-purple-500/10 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase text-white">Preparación Previa</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <span className="text-purple-300 font-bold">Filtro de Datos:</span> A las sesiones ICE no se va a buscar errores ni a pescar Clashes. Las colisiones y omisiones debieron ser detectadas, indexadas en Excel/BCF y distribuidas antes de la sesión.
            </p>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400">
              <div className="p-1.5 bg-amber-500/10 rounded-lg">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase text-white">Agendas Acotadas</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <span className="text-amber-300 font-bold">Enfoque Quirúrgico:</span> No se revisa "el proyecto en general". La sesión inicia con un objetivo quirúrgico. Ejemplo: <span className="italic text-slate-300">"Hoy tenemos 60 minutos para resolver los 3 conflictos que bloquean la fundición de la losa del Piso 3"</span>.
            </p>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase text-white">Modelado y Decisión</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <span className="text-emerald-300 font-bold">Decisión en Vivo:</span> Si el ingeniero mecánico propone desviar un ducto, se evalúa el impacto espacial y de costos en la pantalla principal. Al aceptarse, la decisión queda firmada en el CDE y se asigna la tarea de rediseño de inmediato.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Toggles & Interactive Simulator */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left column: Specialist management */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Conformación de la Mesa de Trabajo (Sesión ICE)
            </h3>
            <p className="text-[10px] text-slate-500">
              Activa o desactiva especialistas para analizar cómo cambia el rendimiento de la reunión y el grado de consenso inmediato.
            </p>
          </div>

          <div className="space-y-2">
            {ALL_SPECIALISTS.map((spec) => {
              const isActive = selectedSpecialists.includes(spec.id);
              const isManager = spec.id === 'manager';
              return (
                <button
                  key={spec.id}
                  disabled={isManager}
                  onClick={() => toggleSpecialist(spec.id)}
                  className={`w-full p-3 rounded-xl border transition-all text-left flex justify-between items-center ${
                    isActive
                      ? 'bg-purple-500/15 border-purple-500/40 text-white'
                      : 'bg-slate-950/40 border-white/5 text-slate-500 hover:bg-slate-900/20 hover:text-slate-300'
                  } ${isManager ? 'cursor-default opacity-90' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{spec.avatar}</span>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1">
                        {spec.name}
                        {isManager && <span className="bg-amber-500/20 text-amber-400 text-[7px] px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">MODERADOR</span>}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono">{spec.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-mono font-bold">{spec.costPerHour} USD/h</div>
                    <div className="text-[7px] text-slate-500 uppercase font-bold">Imp. {spec.impactScore}%</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic calculations result */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-3">
            <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Métricas Estimadas de la Sesión</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 text-center">
                <span className="text-[7px] font-mono text-slate-500 uppercase block">Consenso General</span>
                <span className="text-sm font-mono font-black text-purple-400">{averageConsensus}%</span>
                <span className="text-[7px] block text-slate-400 mt-0.5">
                  {averageConsensus >= 80 ? 'Decisión Técnica Robusta' : averageConsensus >= 65 ? 'Incertidumbre Media' : 'Alto Riesgo de Coordinación'}
                </span>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 text-center">
                <span className="text-[7px] font-mono text-slate-500 uppercase block">Tiempo Promedio / Conflicto</span>
                <span className="text-sm font-mono font-black text-amber-400">{rawResolutionTimeMinutes} minutos</span>
                <span className="text-[7px] block text-slate-400 mt-0.5">con {totalSpecialists} expertos</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 flex justify-between items-center">
              <div className="text-left">
                <span className="text-[7px] font-mono text-slate-500 uppercase block">Ahorro Estimado en Obra</span>
                <span className="text-xs font-mono font-black text-emerald-400">+${potentialSavingsUSD.toLocaleString()} USD</span>
              </div>
              <div className="text-right">
                <span className="text-[7px] font-mono text-slate-500 uppercase block">Costo Operativo Sesión</span>
                <span className="text-xs font-mono font-bold text-slate-300">${totalCostOfSessionUSD} USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Simulation Screen */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-[#050510] border border-white/10 rounded-2xl p-5 h-full flex flex-col justify-between min-h-[460px]">
            {/* Simulation Viewport Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
                <div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">MÓDULO SIMULACIÓN ICE #14</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Sala de Reunión Concurrente Activa</h4>
                </div>
              </div>
              <button
                onClick={startSimulation}
                disabled={isSimulating}
                className="px-3 py-1.5 bg-purple-500 hover:bg-purple-400 text-black font-mono font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center gap-1 disabled:opacity-50 transition"
              >
                <Play className="w-3 h-3 fill-black" /> {isSimulating ? 'Corriendo...' : 'Iniciar Demo Conversación'}
              </button>
            </div>

            {/* Simulated Live Scene */}
            <div className="flex-1 flex flex-col bg-[#020208]/90 rounded-xl my-4 border border-white/5 p-4 overflow-hidden relative min-h-[250px]">
              {/* If no simulation running or empty */}
              {simulationLog.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-purple-950/40 border border-purple-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                  </div>
                  <h5 className="text-[11px] font-bold text-white uppercase">Historial de Discusión Técnico</h5>
                  <p className="text-[10px] text-slate-500 max-w-sm leading-relaxed">
                    Haz clic en el botón de arriba para presenciar cómo interactúan los profesionales de forma simultánea en la pantalla en vivo de 10 minutos para liquidar la interferencia de inmediato.
                  </p>
                </div>
              )}

              {/* Chat Feed */}
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {simulationLog.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/[0.02] border border-white/5 p-2 rounded-lg text-[10px] space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-black uppercase tracking-wider ${msg.color}`}>{msg.sender}</span>
                        <span className="text-[7px] text-slate-500 font-mono">{msg.time}</span>
                      </div>
                      <p className="text-slate-300 leading-normal">{msg.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Live interactive visual clash panel at the bottom of the simulator */}
              {chatStep >= 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-auto bg-emerald-950/25 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">CONFLICTO RESUELTO</span>
                      <p className="text-[9px] text-slate-300">Colector MEP desplazado 30cm al este sin pérdida de presión ni alteración estética.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-mono text-slate-500 uppercase block">Aprobado por Cliente</span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase">100% CONSENSO</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Metodología Tradicional vs Concurrente COMPARISON BLOCK */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="space-y-1">
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Coordinación Tradicional (Asíncrona)</div>
                <div className="space-y-1 bg-red-950/10 border border-red-500/10 rounded-lg p-2.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Iteración de correos:</span>
                    <span className="text-red-400 font-bold">12-15 días</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Consenso inicial:</span>
                    <span className="text-red-400 font-bold">Bajo (fragmentado)</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Costo indirecto retraso:</span>
                    <span className="text-red-400 font-mono font-bold">$2,400+ USD</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[8px] font-mono text-purple-400 uppercase tracking-widest">Coordinación ICE (Concurrente)</div>
                <div className="space-y-1 bg-purple-950/10 border border-purple-500/10 rounded-lg p-2.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Resolución conflicto:</span>
                    <span className="text-emerald-400 font-bold">10 minutos</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Consenso inmediato:</span>
                    <span className="text-emerald-400 font-bold">100% (Aprobado)</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Costo operativo real:</span>
                    <span className="text-purple-300 font-mono font-bold">${totalCostOfSessionUSD} USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
