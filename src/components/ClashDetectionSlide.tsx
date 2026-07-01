import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Maximize, Clock, Info, ArrowRight, X, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const clashData = [
  {
    id: 'hard',
    title: 'Hard Clash',
    subtitle: '(Colisión Dura)',
    icon: ShieldAlert,
    color: 'from-red-900/40 to-red-950/20 border-red-500/30',
    desc: 'Intersección geométrica pura en el espacio tridimensional. Ocurre cuando dos elementos físicos intentan ocupar el mismo volumen de coordenadas vectoriales.',
    example: 'El clásico tubo de desagüe que atraviesa una viga estructural perimetral.',
    severity: 95,
    protocol: '1. Identificar elementos implicados (Guid).\n2. Analizar jerarquía técnica (¿Qué elemento debe ceder?).\n3. Modificar modelo nativo y resincronizar.'
  },
  {
    id: 'soft',
    title: 'Soft / Clearance Clash',
    subtitle: '(Colisión por Tolerancia)',
    icon: Maximize,
    color: 'from-amber-900/40 to-amber-950/20 border-amber-500/30',
    desc: 'Los elementos no se tocan físicamente en el modelo, pero un objeto invade el espacio libre necesario para la instalación, aislamiento, seguridad o mantenimiento futuro.',
    example: 'Un muro de mampostería bloqueando la apertura del panel de un tablero eléctrico, o la falta de espacio para el recubrimiento térmico de un ducto.',
    severity: 70,
    protocol: '1. Verificar requerimientos de fabricante (hoja técnica).\n2. Validar norma de seguridad (ej. NFPA).\n3. Ajustar posición del muro o requerir panel de acceso técnico.'
  },
  {
    id: '4d',
    title: '4D / Workflow Clash',
    subtitle: '(Colisión Temporal)',
    icon: Clock,
    color: 'from-blue-900/40 to-blue-950/20 border-blue-500/30',
    desc: 'Conflictos lógicos vinculados directamente al cronograma de ejecución de la obra. Ocurre cuando la secuencia constructiva obliga a instalar un componente antes de que el elemento que lo soporta haya sido construido.',
    example: 'Instalar ductos antes de tener la estructura que los soporta.',
    severity: 50,
    protocol: '1. Revisar cronograma (Línea base vs. Ejecución).\n2. Reorganizar secuencia de tareas (Lógica constructiva).\n3. Actualizar modelo 4D y comunicar a obra.'
  }
];

export const ClashDetectionSlide = () => {
  const [selected, setSelected] = useState(clashData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-[0.2em] block mb-1">
          SESIÓN 9 — COORDINACIÓN 3D
        </span>
        <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight">
          1. Tipos de Colisiones (Clashes)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[450px]">
        {/* Selection List */}
        <div className="md:col-span-4 space-y-3">
          {clashData.map((clash) => (
            <button
              key={clash.id}
              onClick={() => setSelected(clash)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected.id === clash.id 
                  ? `bg-slate-800 ${clash.color.split(' ')[1]} shadow-[0_0_15px_rgba(0,0,0,0.3)] border-l-4 border-l-purple-500` 
                  : 'bg-slate-900/30 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <clash.icon className={`w-5 h-5 ${selected.id === clash.id ? 'text-white' : 'text-slate-500'}`} />
                <span className="text-xs font-bold uppercase tracking-tight">{clash.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Detail Panel */}
        <div className="md:col-span-8 relative">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`h-full p-8 rounded-2xl border bg-gradient-to-br ${selected.color} flex flex-col justify-between`}
          >
            <div>
              <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">{selected.title}</span>
                  <div className="text-right">
                    <span className="text-[9px] text-white/50 uppercase">Severidad</span>
                    <div className="w-24 h-1 bg-black/40 rounded-full mt-1 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.severity}%` }} className={`h-full ${selected.id === 'hard' ? 'bg-red-500' : selected.id === 'soft' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    </div>
                  </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{selected.subtitle}</h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-6">{selected.desc}</p>
              
              <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-2">Ejemplo práctico:</span>
                  <p className="text-xs text-slate-300 italic">{selected.example}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-white bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition shadow-lg"
              >
                  Ver protocolo de resolución <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Protocol Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          >
            <motion.div 
                initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-lg relative"
            >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X /></button>
                <FileText className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-black text-white mb-4">Protocolo: {selected.title}</h3>
                <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5">{selected.protocol}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
