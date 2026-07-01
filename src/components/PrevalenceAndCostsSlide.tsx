import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, AlertCircle, TrendingUp, Info, HelpCircle, Check, ArrowRight, ShieldAlert, Award, AlertTriangle, Layers, DollarSign } from 'lucide-react';

interface SystemType {
  id: string;
  name: string;
  category: 'gravity' | 'large_hvac' | 'pressurized' | 'electrical';
  priority: number; // 1 to 5 (5 is highest priority / moves last)
  priorityLabel: string;
  icon: string;
  description: string;
  physicsReason: string;
  costImpact: string;
  flexibility: 'Nula (Crítica)' | 'Baja' | 'Alta' | 'Total (Fácil)';
  color: string;
  borderClr: string;
  bgClr: string;
}

const systems: Record<string, SystemType> = {
  gravity: {
    id: 'gravity',
    name: 'Sistemas por Gravedad (Desagües)',
    category: 'gravity',
    priority: 5,
    priorityLabel: 'MÁXIMA PRIORIDAD (Inamovible)',
    icon: '💧',
    description: 'Redes de desagüe sanitario o pluvial que requieren pendientes fijas y constantes para funcionar.',
    physicsReason: 'Modificar su trayectoria altera la hidráulica y pendiente, provocando estancamiento o forzando a bajar los cielos rasos.',
    costImpact: 'Extremadamente alto. Puede requerir rediseño estructural o demolición de losas.',
    flexibility: 'Nula (Crítica)',
    color: 'text-red-400',
    borderClr: 'border-red-500/30',
    bgClr: 'bg-red-950/20'
  },
  large_hvac: {
    id: 'large_hvac',
    name: 'Ductos de Gran Sección (HVAC)',
    category: 'large_hvac',
    priority: 4,
    priorityLabel: 'ALTA PRIORIDAD',
    icon: '💨',
    description: 'Ductos metálicos de inyección o extracción de aire acondicionado de gran tamaño (ej. 1.00m x 0.50m).',
    physicsReason: 'Los quiebres y codos adicionales aumentan drásticamente la pérdida de presión hidrodinámica (caída de carga) y el ruido.',
    costImpact: 'Alto costo de fabricación a medida, piezas especiales y mayor consumo energético de ventiladores.',
    flexibility: 'Baja',
    color: 'text-orange-400',
    borderClr: 'border-orange-500/30',
    bgClr: 'bg-orange-950/20'
  },
  pressurized: {
    id: 'pressurized',
    name: 'Redes Presurizadas (Agua/Gas/Incendio)',
    category: 'pressurized',
    priority: 2,
    priorityLabel: 'BAJA PRIORIDAD (Flexible)',
    icon: '🔥',
    description: 'Tuberías de agua potable, gas o sistemas contra incendios que funcionan bajo presión hidráulica.',
    physicsReason: 'Al operar a presión, las tuberías pueden subir, bajar o rodear obstáculos libremente mediante codos sin perder funcionalidad.',
    costImpact: 'Bajo. El PVC, cobre o acero roscado se corta y desvía en campo con facilidad.',
    flexibility: 'Alta',
    color: 'text-amber-400',
    borderClr: 'border-amber-500/30',
    bgClr: 'bg-amber-950/20'
  },
  electrical: {
    id: 'electrical',
    name: 'Bandejas Eléctricas y Datos',
    category: 'electrical',
    priority: 1,
    priorityLabel: 'PRIORIDAD MÍNIMA (Se mueve primero)',
    icon: '⚡',
    description: 'Bandejas portacables, tuberías conduit para electricidad, fibra óptica o corrientes débiles.',
    physicsReason: 'El cableado es flexible por naturaleza. Las bandejas se pueden desviar o segmentar con gran libertad geométrica.',
    costImpact: 'Mínimo. Desviar una bandeja requiere soportes estándar y accesorios de catálogo de bajo costo.',
    flexibility: 'Total (Fácil)',
    color: 'text-blue-400',
    borderClr: 'border-blue-500/30',
    bgClr: 'bg-blue-950/20'
  }
};

interface ConflictScenario {
  id: string;
  title: string;
  sysA: SystemType;
  sysB: SystemType;
  clashDescription: string;
  consequenceIfWrong: string;
  reworkCostWrong: number; // in USD
  reworkCostCorrect: number; // in USD
  winner: string; // id of the system that STAYS (has priority)
  loser: string; // id of the system that MOVES
  solutionText: string;
}

const conflicts: ConflictScenario[] = [
  {
    id: 'drain_vs_water',
    title: 'Tubo Desagüe 4" (Gravedad) vs. Agua Potable 1" (Presurizado)',
    sysA: systems.gravity,
    sysB: systems.pressurized,
    clashDescription: 'Un tubo de drenaje sanitario con pendiente del 1% choca a la misma altura con un tubo de agua fría presurizada.',
    consequenceIfWrong: 'Si se desvía el desagüe haciendo un "sifón" para esquivar el agua potable, se producirán atascos y colapso de la red sanitaria.',
    reworkCostWrong: 4500,
    reworkCostCorrect: 150,
    winner: 'gravity',
    loser: 'pressurized',
    solutionText: 'Se mantiene el desagüe con su pendiente intacta. El tubo de agua potable de 1" se desvía fácilmente con 4 codos de 90° pasando por encima del desagüe.'
  },
  {
    id: 'hvac_vs_electrical',
    title: 'Ducto Inyección HVAC (1.2m) vs. Bandeja Eléctrica Principal',
    sysA: systems.large_hvac,
    sysB: systems.electrical,
    clashDescription: 'Un gran ducto metálico de aire acondicionado interseca el trayecto horizontal de una bandeja de cables de fuerza.',
    consequenceIfWrong: 'Si se intenta quebrar el ducto de HVAC, se requiere fabricar piezas de transición costosas, alterando el flujo de aire y aumentando el ruido del sistema.',
    reworkCostWrong: 6800,
    reworkCostCorrect: 420,
    winner: 'large_hvac',
    loser: 'electrical',
    solutionText: 'El ducto de aire acondicionado mantiene su trayectoria recta óptima. La bandeja eléctrica desciende 30 cm mediante un desfase en "Z" estándar.'
  },
  {
    id: 'hvac_vs_drain',
    title: 'Ducto Retorno HVAC (0.8m) vs. Montante Sanitaria (Gravedad)',
    sysA: systems.large_hvac,
    sysB: systems.gravity,
    clashDescription: 'Un ducto de aire acondicionado choca contra la bajante principal de aguas servidas del edificio.',
    consequenceIfWrong: 'Si se desvía la montante sanitaria, se pierde la verticalidad necesaria por gravedad, requiriendo un rediseño que puede invadir el cielorraso del vecino inferior.',
    reworkCostWrong: 12500,
    reworkCostCorrect: 1100,
    winner: 'gravity',
    loser: 'large_hvac',
    solutionText: 'La gravedad impera. La montante sanitaria se mantiene totalmente vertical. El ducto de HVAC se bifurca o desvía rodeando la tubería (ej. con manga pasante o reduciendo sección temporalmente con cálculo hidráulico).'
  }
];

export const PrevalenceAndCostsSlide = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('drain_vs_water');
  const [isResolved, setIsResolved] = useState<boolean>(false);

  const scenario = conflicts.find(c => c.id === selectedScenarioId) || conflicts[0];

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setIsResolved(false);
  };

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6">
      {/* Header */}
      <div className="border-b border-white/5 pb-4">
        <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-[0.2em] block mb-1">
          SESIÓN 9 — COORDINACIÓN 3D
        </span>
        <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
          <Scale className="text-amber-500 w-6 h-6" /> 3. Criterios de Prevalencia e Ingeniería de Costos
        </h2>
      </div>

      {/* Intro box */}
      <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="space-y-1 md:max-w-2xl">
          <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">¿Quién se mueve cuando todo choca?</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Cuando aparece un conflicto de interferencias, <span className="text-white font-bold">el software no lo resuelve</span>. El BIM Manager aplica la <span className="font-bold text-white">Regla de la Prevalencia</span>, basada en las leyes de la física y el costo financiero del reproceso en obra.
          </p>
        </div>
        <div className="flex gap-3 bg-black/40 px-4 py-3 rounded-xl border border-white/10 shrink-0 text-center">
          <div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Ley Fundamental</div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mt-0.5">La Gravedad Domina</div>
          </div>
        </div>
      </div>

      {/* Grid of Priorities */}
      <div>
        <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
          Jerarquía de Prevalencia BIM (De Mayor a Menor Prioridad de Posición)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.values(systems).map((sys) => (
            <div 
              key={sys.id} 
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${sys.borderClr} ${sys.bgClr}`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{sys.icon}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-3 rounded-sm ${i < sys.priority ? 'bg-amber-400' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white mt-3">{sys.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {sys.description}
                </p>
              </div>

              <div className="border-t border-white/5 mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-[8px] font-mono">
                  <span className="text-slate-500 uppercase">Flexibilidad:</span>
                  <span className="text-white font-bold">{sys.flexibility}</span>
                </div>
                <div className="flex justify-between text-[8px] font-mono">
                  <span className="text-slate-500 uppercase">Impacto Costo:</span>
                  <span className="text-amber-400 font-bold">{sys.priority >= 4 ? 'Altísimo' : 'Bajo'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Arena */}
      <div className="grid grid-cols-12 gap-6 pt-2">
        {/* Scenario Selector & Consequence */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Casos de Estudio de Colisiones
          </h3>

          {/* Selector buttons */}
          <div className="space-y-2">
            {conflicts.map((conf) => (
              <button
                key={conf.id}
                onClick={() => handleScenarioChange(conf.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex justify-between items-center ${
                  selectedScenarioId === conf.id
                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-1 pr-2">
                  <h4 className="text-xs font-bold leading-snug">{conf.title}</h4>
                  <p className="text-[10px] opacity-70 truncate max-w-[280px]">{conf.clashDescription}</p>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${selectedScenarioId === conf.id ? 'translate-x-1 text-amber-400' : 'opacity-40'}`} />
              </button>
            ))}
          </div>

          {/* Technical and Economic Impact Box */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> Error Típico en Obra
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {scenario.consequenceIfWrong}
            </p>
            <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-4">
              <div className="bg-red-950/20 border border-red-500/10 rounded-lg p-2 text-center">
                <span className="text-[8px] font-mono text-red-400 uppercase tracking-wider block">Error en Coordinación</span>
                <span className="text-xs font-mono font-bold text-red-400">Rework: ~${scenario.reworkCostWrong.toLocaleString()} USD</span>
                <span className="text-[7px] block text-slate-500 mt-0.5">Demolición y rediseño</span>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-lg p-2 text-center">
                <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider block">BIM Manager Decisión</span>
                <span className="text-xs font-mono font-bold text-emerald-400">Costo: ~${scenario.reworkCostCorrect.toLocaleString()} USD</span>
                <span className="text-[7px] block text-slate-500 mt-0.5">Modificación digital</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulation Graphic */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-[#050510] border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between min-h-[380px]">
            {/* Simulation Header */}
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Simulador de Prevalencia</span>
                <h4 className="text-xs font-black text-white uppercase tracking-wider mt-0.5">Visor de Conflicto en 2D</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold ${isResolved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400 animate-pulse'}`}>
                  {isResolved ? 'CONFIRMADO' : 'PENDIENTE'}
                </span>
              </div>
            </div>

            {/* Simulated Stage Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px] bg-[#020208]/90 rounded-xl my-4 overflow-hidden p-6 border border-white/5">
              {/* Scenario graphics based on ID */}
              <div className="relative w-full h-[180px] flex items-center justify-center">
                {/* DRAIN VS WATER POTABLE */}
                {scenario.id === 'drain_vs_water' && (
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* Drainage Pipe (Gravity) - Static Horizontal Line */}
                    <div className="absolute left-0 right-0 h-10 bg-gradient-to-r from-red-600 to-red-500/80 rounded border-y border-red-400 flex items-center justify-between px-6 shadow-[0_0_15px_rgba(239,68,68,0.2)] z-10">
                      <span className="text-[9px] font-mono font-black text-white uppercase tracking-wider">
                        DESAGÜE SANITARIO 4" (PENDIENTE 1%)
                      </span>
                      <span className="text-[8px] font-mono bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30 text-red-300">
                        Inamovible
                      </span>
                    </div>

                    {/* Water Potable Pipe (Pressurized) - Vertically crossing */}
                    <AnimatePresence mode="wait">
                      {!isResolved ? (
                        /* Clashing state */
                        <motion.div 
                          key="unresolved"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute w-6 h-40 bg-amber-400 border-x border-amber-300 z-20 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
                          onClick={() => setIsResolved(true)}
                        >
                          <div className="w-10 h-10 rounded-full bg-red-600 border border-white flex items-center justify-center animate-pulse text-[12px]">
                            💥
                          </div>
                          <span className="text-[7px] font-mono text-amber-950 font-black uppercase tracking-wider rotate-90 whitespace-nowrap mt-4">
                            AGUA POTABLE 1"
                          </span>
                        </motion.div>
                      ) : (
                        /* Resolved state - pipe loops around */
                        <motion.div 
                          key="resolved"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 z-20 pointer-events-none"
                        >
                          {/* Top portion */}
                          <div className="absolute left-[50%] -translate-x-1/2 top-0 h-[40px] w-6 bg-amber-400 border-x border-amber-300" />
                          {/* Loop bypass */}
                          <motion.div 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            className="absolute left-[50%] -translate-x-1/2 top-[38px] w-28 h-[65px] border-t-8 border-x-8 border-amber-400 rounded-t-xl"
                            style={{ top: '6px', height: '42px' }}
                          />
                          {/* Bottom portion */}
                          <div className="absolute left-[50%] -translate-x-1/2 bottom-0 h-[130px] w-6 bg-amber-400 border-x border-amber-300" />
                          
                          <div className="absolute left-[50%] -translate-x-1/2 top-[55px] bg-emerald-500 text-white font-mono text-[8px] px-2 py-0.5 rounded shadow-lg font-black tracking-widest uppercase z-30">
                            DESVÍO OK
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* HVAC VS ELECTRICAL */}
                {scenario.id === 'hvac_vs_electrical' && (
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* HVAC Duct - Huge square */}
                    <div className="absolute w-52 h-24 bg-slate-500 border-2 border-slate-300 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10 rounded">
                      <div className="text-center">
                        <span className="text-2xl">💨</span>
                        <h5 className="text-[9px] font-black text-white uppercase tracking-wider block">DUCTO HVAC 1.2m</h5>
                        <span className="text-[8px] font-mono text-slate-300 block">Pérdida de carga crítica</span>
                      </div>
                    </div>

                    {/* Electrical Tray crossing */}
                    <AnimatePresence mode="wait">
                      {!isResolved ? (
                        /* Clashing state */
                        <motion.div 
                          key="unresolved-hvac"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-0 right-0 h-6 bg-blue-500/90 border-y border-blue-300 z-20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] cursor-pointer"
                          onClick={() => setIsResolved(true)}
                        >
                          <div className="bg-red-600 text-white font-mono font-black px-3 py-1 rounded text-[9px] tracking-widest animate-pulse flex items-center gap-1">
                            <span>💥 INTERSECCIÓN</span>
                          </div>
                        </motion.div>
                      ) : (
                        /* Resolved state - cable tray desvía en "Z" por debajo */
                        <motion.div 
                          key="resolved-hvac"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 z-20 pointer-events-none"
                        >
                          {/* Segment Left */}
                          <div className="absolute left-0 top-[50%] -translate-y-1/2 w-14 h-6 bg-blue-500 border-y border-blue-300" />
                          {/* Descent Z */}
                          <div className="absolute left-14 top-[50%] w-6 h-12 border-l-8 border-b-8 border-blue-500" style={{ transform: 'translateY(-10px)' }} />
                          {/* Bottom bypass */}
                          <div className="absolute left-20 bottom-1 w-64 h-6 bg-blue-500 border-y border-blue-300" />
                          {/* Ascent Z */}
                          <div className="absolute right-14 top-[50%] w-6 h-12 border-r-8 border-b-8 border-blue-500" style={{ transform: 'translateY(-10px)' }} />
                          {/* Segment Right */}
                          <div className="absolute right-0 top-[50%] -translate-y-1/2 w-14 h-6 bg-blue-500 border-y border-blue-300" />

                          <div className="absolute left-[50%] -translate-x-1/2 bottom-10 bg-emerald-500 text-white font-mono text-[8px] px-2 py-0.5 rounded shadow-lg font-black tracking-widest uppercase z-30">
                            DESVÍO EN "Z" COMPLETADO
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* HVAC VS DRAIN */}
                {scenario.id === 'hvac_vs_drain' && (
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* Vertical Drainage stack - Static */}
                    <div className="absolute left-28 top-0 bottom-0 w-8 bg-gradient-to-b from-red-600 to-red-500 border-x border-red-300 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.2)] z-10">
                      <span className="text-[8px] font-mono font-black text-white rotate-90 uppercase tracking-widest whitespace-nowrap">
                        MONTANTE SANITARIA 4"
                      </span>
                    </div>

                    {/* HVAC Duct horizontal */}
                    <AnimatePresence mode="wait">
                      {!isResolved ? (
                        /* Clashing state */
                        <motion.div 
                          key="unresolved-hvac-drain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-0 right-0 h-16 bg-slate-500/90 border-y border-slate-300 z-20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer"
                          onClick={() => setIsResolved(true)}
                        >
                          <div className="bg-red-600 text-white font-mono font-black px-3 py-1 rounded text-[9px] tracking-widest animate-pulse flex items-center gap-1">
                            <span>💥 INTERSECCIÓN DE AGUAS</span>
                          </div>
                        </motion.div>
                      ) : (
                        /* Resolved state - HVAC duct splits around the pipe */
                        <motion.div 
                          key="resolved-hvac-drain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 z-20 pointer-events-none flex items-center"
                        >
                          {/* HVAC Duct on left */}
                          <div className="absolute left-0 w-24 h-16 bg-slate-500 border-y border-slate-300" />
                          {/* Split Upper Bypass */}
                          <div className="absolute left-24 top-6 w-[70px] h-6 bg-slate-500 border-y border-slate-300" style={{ transform: 'skewX(15deg)' }} />
                          {/* Split Lower Bypass */}
                          <div className="absolute left-24 bottom-6 w-[70px] h-6 bg-slate-500 border-y border-slate-300" style={{ transform: 'skewX(-15deg)' }} />
                          {/* HVAC Duct on right */}
                          <div className="absolute right-0 w-[240px] h-16 bg-slate-500 border-y border-slate-300" />

                          <div className="absolute right-4 top-2 bg-emerald-500 text-white font-mono text-[8px] px-2 py-0.5 rounded shadow-lg font-black tracking-widest uppercase z-30">
                            DUCTO REDISEÑADO CON DERIVACIÓN
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Simulation Footer Control */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Acción de Coordinación</span>
                <p className="text-[10px] text-slate-300 leading-normal max-w-sm">
                  {!isResolved 
                    ? `Haz clic en 'Aplicar Criterio' para que el algoritmo decida quién se desvía basándose en la regla de prevalencia.`
                    : scenario.solutionText}
                </p>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => setIsResolved(!isResolved)}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition ${
                    isResolved
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                      : 'bg-amber-500 text-black border-amber-500 hover:bg-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  {isResolved ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Reestablecer Conflicto
                    </>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5" /> Aplicar Criterio
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
