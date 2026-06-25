import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Lightbulb } from 'lucide-react';

export const LoinComparisonSlide = () => {
  const data = [
    { criterion: 'Origen / Estándar', lod: 'AIA (Estados Unidos) - Enfoque tradicional.', loin: 'ISO 19650 / EN 17412 (Internacional / Europa).' },
    { criterion: 'Estructura del requisito', lod: 'Un único número indexado (LOD 100, 200, 300, 400, 500).', loin: 'Tres vectores independientes (Geometría + Alfanumérico + Documentación).' },
    { criterion: 'Enfoque principal', lod: 'Basado en el objeto (Qué tan desarrollado está el elemento gráfico).', loin: 'Basado en el propósito (Para qué se va a usar la información en esa fase).' },
    { criterion: 'Manejo del desperdicio', lod: 'Genera archivos pesados e innecesarios por meter datos antes de tiempo.', loin: 'Optimiza el rendimiento informático al eliminar la sobreinformación (Overmodeling).' },
  ];

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-slate-100 font-sans p-6">
      <div className="border-b border-white/5 pb-6">
        <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-[0.2em] block mb-2">
          SESIÓN 8 — LOIN
        </span>
        <h2 className="text-3xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-purple-500" />
          3. Tabla Comparativa Directa
        </h2>
      </div>

      <div className="bg-[#050510]/50 p-6 rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-wider">
              <th className="pb-6 pr-4 w-1/4">Criterio Técnico</th>
              <th className="pb-6 pr-4 w-3/8 text-orange-400">LOD (Level of Development)</th>
              <th className="pb-6 w-3/8 text-emerald-400">LOIN (Level of Information Need)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="hover:bg-white/5"
              >
                <td className="py-6 pr-4 text-sm font-bold text-slate-200">{row.criterion}</td>
                <td className="py-6 pr-4 text-xs text-slate-400 leading-relaxed">{row.lod}</td>
                <td className="py-6 text-xs text-slate-300 leading-relaxed font-medium">{row.loin}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lección Gerencial */}
      <div className="flex gap-4 p-5 bg-purple-950/10 rounded-xl border border-purple-500/20 text-left">
        <Lightbulb className="w-8 h-8 text-purple-500 shrink-0" />
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-purple-500 font-extrabold uppercase tracking-widest">
            💡 Lección Gerencial
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            En fase de diseño conceptual, una viga puede requerir alta definición geométrica (para verificar pasos de tuberías), pero nula información alfanumérica (aún no se compra). En fase de mantenimiento, una bomba hidráulica puede requerir una geometría simplificada (un cilindro), pero una altísima densidad de datos alfanuméricos y documentación (garantía, manuales). Eso es aplicar LOIN.
          </p>
        </div>
      </div>
    </div>
  );
};
