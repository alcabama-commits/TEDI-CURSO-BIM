import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, ShieldAlert, CheckCircle, AlertTriangle, Gauge, ArrowRight } from 'lucide-react';

interface Preset {
  name: string;
  value: number; // in mm
  label: string;
  status: 'error' | 'warning' | 'optimal' | 'danger';
  statusText: string;
  workload: string;
  color: string;
}

const presets: Preset[] = [
  {
    name: 'Tolerancia Cero (0 mm)',
    value: 0,
    label: '0.00 m',
    status: 'error',
    statusText: '⚠️ ERROR DE JUNIOR: Colapso por ruido irrelevante',
    workload: '180 Horas de revisión manual (Inviable por falsos positivos)',
    color: 'border-red-500/50 bg-red-950/25 text-red-400'
  },
  {
    name: 'Tolerancia Baja (5 mm)',
    value: 5,
    label: '0.005 m',
    status: 'warning',
    statusText: '⚠️ RUIDO ELEVADO: Exceso de milímetros irrelevantes',
    workload: '45 Horas de revisión manual (Lento e ineficiente)',
    color: 'border-amber-500/40 bg-amber-950/20 text-amber-400'
  },
  {
    name: 'Rango Ideal (15 mm)',
    value: 15,
    label: '0.015 m',
    status: 'optimal',
    statusText: '🏆 REGLA DE ORO: Enfoque 100% en colisiones críticas',
    workload: '2.5 Horas de revisión (Filtra tornillos, preserva lo grave)',
    color: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400'
  },
  {
    name: 'Tolerancia Excesiva (40 mm)',
    value: 40,
    label: '0.040 m',
    status: 'danger',
    statusText: '🚨 OMISIÓN CRÍTICA: Se pierden interferencias reales',
    workload: '0.5 Horas (Se omiten tubos reales atravesando vigas)',
    color: 'border-rose-500/50 bg-rose-950/25 text-rose-400'
  }
];

export const NoiseToleranceSlide = () => {
  const [tolerance, setTolerance] = useState<number>(15);
  const [overlap, setOverlap] = useState<number>(25); // physical penetration inside wall in mm

  // Find nearest preset
  const currentPreset = presets.reduce((prev, curr) => {
    return Math.abs(curr.value - tolerance) < Math.abs(prev.value - tolerance) ? curr : prev;
  });

  // Calculate dynamic outcomes based on tolerance value
  const noiseClashes = Math.max(0, Math.round(1150 * Math.exp(-0.18 * tolerance)));
  const missedClashes = Math.max(0, Math.round(tolerance > 20 ? (tolerance - 20) * 1.8 : 0));
  const realClashes = Math.max(0, Math.round(42 - missedClashes));

  // Determine state of clash based on tolerance vs physical overlap
  const isHardClash = overlap > 0;
  const isClashFlaggedBySoftware = overlap > tolerance;
  const isIgnoredByTolerance = isHardClash && overlap <= tolerance;

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6">
      {/* Header */}
      <div className="border-b border-white/5 pb-4">
        <span className="text-[10px] font-mono text-red-400 font-extrabold uppercase tracking-[0.2em] block mb-1">
          SESIÓN 9 — COORDINACIÓN 3D
        </span>
        <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight">
          2. La Estrategia del Ruido y Tolerancias
        </h2>
      </div>

      {/* Regla de oro alert */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
        <span className="text-2xl mt-1">⚠️</span>
        <div>
          <h4 className="text-xs font-black uppercase text-red-400 tracking-wider">Regla de Oro del Manager</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
            Establecer tolerancias realistas en el <span className="font-bold text-white">BEP (BIM Execution Plan)</span> según la fase del proyecto. Para coordinar <span className="font-bold text-white">Estructuras de concreto vs. Redes MEP</span>, una tolerancia de <span className="text-red-400 font-mono font-bold">10 mm a 20 mm</span> (0.01 m a 0.02 m) es ideal para limpiar el "ruido" inicial y enfocarse únicamente en interferencias que detendrían la obra.
          </p>
        </div>
      </div>

      {/* Interactive Arena */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: Controls & Sliders */}
        <div className="col-span-12 lg:col-span-5 space-y-6 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-red-500" /> Tolerancia del Software
              </label>
              <span className="text-xs font-mono font-bold text-red-400 bg-red-950/30 px-3 py-1 rounded-md border border-red-500/30">
                {tolerance} mm ({ (tolerance / 1000).toFixed(3) } m)
              </span>
            </div>
            
            {/* Range Slider */}
            <input 
              type="range" 
              min="0" 
              max="45" 
              value={tolerance}
              onChange={(e) => setTolerance(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setTolerance(preset.value)}
                  className={`py-2 px-1 rounded-lg text-[9px] font-bold text-center border transition ${
                    Math.abs(tolerance - preset.value) < 3
                      ? 'bg-red-500 text-white border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.25)]'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>{preset.name.split(' (')[0]}</div>
                  <div className="font-mono text-[8px] opacity-70 mt-0.5">{preset.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Penetration Control */}
          <div className="border-t border-white/5 pt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Gauge className="w-3.5 h-3.5 text-purple-500" /> Penetración Física del Tubo (MEP)
              </label>
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/30 px-3 py-1 rounded-md border border-purple-500/30">
                {overlap} mm
              </span>
            </div>
            <input 
              type="range" 
              min="-15" 
              max="45" 
              value={overlap}
              onChange={(e) => setOverlap(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-[9px] text-slate-500 mt-2 italic">
              Controla el traslape o invasión física real del volumen del tubo dentro de la viga de hormigón. Valores negativos indican separación.
            </p>
          </div>

          {/* Feedback Status */}
          <div className={`p-4 rounded-xl border transition-all ${currentPreset.color}`}>
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider mb-1">
              {currentPreset.status === 'optimal' ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 shrink-0" />
              )}
              {currentPreset.statusText}
            </div>
            <p className="text-[10px] opacity-90 leading-relaxed font-mono">
              Carga de trabajo: <span className="font-bold">{currentPreset.workload}</span>
            </p>
          </div>
        </div>

        {/* RIGHT: Live Visual Simulation */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {/* SIMULATION VISUAL BOX */}
          <div className="bg-[#050510] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[260px]">
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Simulador de Algoritmo</span>
              <span className="text-xs font-black text-white uppercase tracking-wider">Intersección vs. Tolerancia</span>
            </div>

            {/* LIVE GRAPHIC */}
            <div className="flex-1 flex items-center justify-center relative min-h-[180px] border-b border-white/5 bg-[#020208]/85 rounded-xl overflow-hidden p-4">
              <div className="relative w-[320px] h-[130px] flex items-center">
                {/* Concrete Slab/Wall */}
                <div className="absolute left-0 top-0 bottom-0 w-[130px] bg-slate-700/80 rounded-l-lg border-r-2 border-white/40 flex items-center justify-center shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5)] z-10">
                  <span className="text-[10px] font-black text-slate-400 rotate-90 uppercase tracking-[0.2em]">
                    VIGA
                  </span>
                  <span className="absolute bottom-1 left-2 text-[7px] font-mono text-slate-500 uppercase tracking-wider">
                    Adentro
                  </span>
                </div>

                {/* Outside wall label */}
                <span className="absolute bottom-1 right-2 text-[7px] font-mono text-slate-500 uppercase tracking-wider">
                  Espacio Libre (Afuera)
                </span>

                {/* Dynamic Tolerance visual line inside the concrete wall */}
                {/* Drawn to the left of the face at 130px */}
                {tolerance > 0 && (
                  <motion.div 
                    animate={{ left: `${130 - (tolerance * 2)}px`, width: `${tolerance * 2}px` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="absolute top-0 bottom-0 bg-yellow-500/5 border-l-2 border-dashed border-amber-500/50 flex items-center justify-center z-20"
                  >
                    <span className="text-[7px] font-mono text-amber-400/80 uppercase font-black tracking-wider whitespace-nowrap rotate-90">
                      ZONA TOLERANCIA ({tolerance} mm)
                    </span>
                  </motion.div>
                )}

                {/* Dynamic MEP Pipe */}
                {/* Positioned based on left=130px - overlap*2 */}
                <motion.div 
                  animate={{ left: `${130 - (overlap * 2)}px` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className={`absolute w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold border shadow-2xl z-30 transition-colors ${
                    isClashFlaggedBySoftware 
                      ? 'bg-red-500 border-red-300 text-white shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse'
                      : isIgnoredByTolerance 
                        ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                        : 'bg-emerald-500 border-emerald-400 text-white'
                  }`}
                >
                  <span className="text-[8px] font-mono tracking-widest font-black">MEP</span>
                  <span className="text-[7px] font-mono opacity-90">
                    {overlap > 0 ? `+${overlap}` : overlap}mm
                  </span>
                </motion.div>
              </div>

              {/* Current state readout */}
              <div className="absolute bottom-4 right-4 text-right">
                <span className="text-[8px] font-mono text-slate-500 uppercase block">Respuesta del Software</span>
                <div className={`text-xs font-black uppercase tracking-widest ${
                  isClashFlaggedBySoftware ? 'text-red-500' : isIgnoredByTolerance ? 'text-amber-500 animate-pulse' : 'text-emerald-400'
                }`}>
                  {isClashFlaggedBySoftware 
                    ? '🔴 COLISIÓN DETECTADA' 
                    : isIgnoredByTolerance 
                      ? '🟡 Ruido Ignorado (Bajo Tolerancia)' 
                      : '🟢 Despejado (Sin Contacto)'}
                </div>
              </div>
            </div>

            {/* REAL-TIME SIMULATED OUTCOMES DASHBOARD */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">Falsas Colisiones (Ruido)</span>
                <span className="text-xl font-mono font-black text-amber-500">{noiseClashes}</span>
                <span className="text-[8px] block text-slate-400">(A revisar por Coordinador)</span>
              </div>
              <div className="text-center border-x border-white/5">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">Colisiones Críticas Detectadas</span>
                <span className="text-xl font-mono font-black text-emerald-400">{realClashes}</span>
                <span className="text-[8px] block text-slate-400">(Listas para Obra)</span>
              </div>
              <div className="text-center">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">Falsos Negativos (Omitidos)</span>
                <span className="text-xl font-mono font-black text-red-500">{missedClashes}</span>
                <span className="text-[8px] block text-slate-400">(Peligro de Falla en Obra)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

