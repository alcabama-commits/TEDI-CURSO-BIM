import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Building, Box, Layers, Settings, CheckCircle2, Clock, Info } from 'lucide-react';

const lodLevels = [
  { level: 100, title: 'LOD 100: Conceptual', description: 'Representación de masas. El objeto se define mediante volúmenes genéricos que indican posición, orientación y tamaño general. Útil para análisis de alternativas y estudios de viabilidad.', color: 'bg-slate-400' },
  { level: 200, title: 'LOD 200: Esquema', description: 'Elementos definidos de forma general con cantidades, tamaño, forma, ubicación y orientación aproximadas. Se empieza a reconocer el tipo de objeto (ej. ventana, muro).', color: 'bg-blue-400' },
  { level: 300, title: 'LOD 300: Definido', description: 'Geometría precisa, con dimensiones y ubicación correctas dentro del modelo. El elemento es identificable y contiene información constructiva básica.', color: 'bg-emerald-400' },
  { level: 400, title: 'LOD 400: Fabricación', description: 'Información específica para la fabricación, montaje y detalles constructivos completos. Incluye despieces, conexiones y especificaciones técnicas exactas.', color: 'bg-amber-400' },
  { level: 500, title: 'LOD 500: As-Built', description: 'Representación verificada del objeto tal cual fue construido o instalado en obra. Es el estado final necesario para la operación y mantenimiento.', color: 'bg-purple-400' },
];

// Helper to simulate a high-tech interactive 3D HVAC unit
const CssHvacUnit = ({ lod }: { lod: number }) => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center perspective-1000">
      <motion.div 
        className="relative w-32 h-48 preserve-3d cursor-pointer"
        animate={{ rotateY: 360, rotateX: 10 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.1, rotateY: 0, rotateX: 0 }}
      >
        {/* Wireframe Faces */}
        <div className={`absolute inset-0 border border-slate-600 bg-slate-900/40 ${lod >= 100 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translateZ(40px)' }} />
        <div className={`absolute inset-0 border border-slate-600 bg-slate-900/40 ${lod >= 100 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translateZ(-40px)' }} />
        <div className={`absolute inset-0 border border-slate-600 bg-slate-900/40 ${lod >= 100 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'rotateY(90deg) translateZ(40px)' }} />
        <div className={`absolute inset-0 border border-slate-600 bg-slate-900/40 ${lod >= 100 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'rotateY(90deg) translateZ(-40px)' }} />
        
        {/* Accent Panel (LOD 300+) */}
        <div className={`absolute top-10 left-4 w-24 h-12 border-2 border-orange-500 bg-orange-950/40 ${lod >= 300 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translateZ(41px)' }} />
        
        {/* Metadata Overlay (LOD 400+, appears on hover) */}
        <motion.div 
          className={`absolute -top-16 -right-20 w-48 p-4 bg-black/90 border border-slate-700 shadow-2xl opacity-0 hover:opacity-100 ${lod >= 400 ? 'block' : 'hidden'}`}
        >
          <div className="text-[10px] text-orange-500 font-mono font-bold mb-2">METADATO OPERATIVO</div>
          <div className="text-[10px] text-slate-300 font-mono flex justify-between"><span>COD:</span> <span>HVAC-ST-402</span></div>
          <div className="text-[10px] text-slate-300 font-mono flex justify-between"><span>MAT:</span> <span>ACERO GALV.</span></div>
          <div className="text-[10px] text-slate-300 font-mono flex justify-between"><span>CAP:</span> <span>400 CFM</span></div>
        </motion.div>

        {/* As-Built Wireframe Overlay (LOD 500+) */}
        <div className={`absolute -inset-2 border-2 border-dashed border-slate-500 ${lod >= 500 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translateZ(0px)' }} />
        
        {/* Interaction Hint */}
        <div className="absolute -bottom-16 left-0 w-full text-center text-[8px] text-slate-500 font-mono uppercase">
          Interactuar para rotar activo digital
        </div>
      </motion.div>
    </div>
  );
};

export const LoinLodSlide = () => {
  const [activeLod, setActiveLod] = useState(0);

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-[0.2em] block mb-1">
            SESIÓN 8 — NIVEL DE INFORMACIÓN NECESARIA (LOIN)
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <Building className="w-6 h-6 text-purple-500 shrink-0" />
            1. LOD: El Espectro del Desarrollo
          </h2>
          <p className="text-xs text-slate-400 font-medium font-sans">
            Comprendiendo la madurez geométrica y de datos desde la concepción hasta el as-built
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] font-mono text-purple-400 font-bold self-center">
          <Clock className="w-3.5 h-3.5" />
          ESTRATEGIA AVANZADA DE MADUREZ BIM
        </div>
      </div>

      <div className="bg-[#050510]/50 p-6 rounded-2xl border border-white/5 space-y-6">
        <div className="grid grid-cols-5 gap-2">
          {lodLevels.map((lod, idx) => (
            <button
              key={lod.level}
              onClick={() => setActiveLod(idx)}
              className={`p-3 rounded-xl border transition-all ${
                activeLod === idx
                  ? 'border-purple-500/50 bg-purple-500/10'
                  : 'border-white/5 bg-black/25 hover:bg-white/5'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${lod.color} mx-auto mb-2 flex items-center justify-center font-bold text-black`}>
                {lod.level / 100}
              </div>
              <div className="text-[10px] font-mono font-black uppercase text-center">{lod.title}</div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeLod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-black/40 border border-white/5 rounded-2xl flex gap-6 items-center"
          >
            <CssHvacUnit lod={lodLevels[activeLod].level} />
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-black text-white">{lodLevels[activeLod].title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{lodLevels[activeLod].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-purple-950/10 p-5 rounded-xl border-l-4 border-purple-500 text-left">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-purple-500" />
          <span className="text-[10px] font-mono text-purple-500 font-extrabold uppercase tracking-widest">
            NOTA METODOLÓGICA
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          El <strong>LOD</strong> (Level of Development) no es una medida absoluta, sino un marco de referencia que define cuánto se puede confiar en la información (geométrica y no geométrica) en un momento dado. A mayor LOD, mayor es la inversión en diseño y mayor la precisión del activo para la fase constructiva u operativa.
        </p>
      </div>
    </div>
  );
};
