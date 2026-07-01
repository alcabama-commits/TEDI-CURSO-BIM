import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, ShieldCheck, HardHat, FileSearch } from 'lucide-react';

const AuditPoint = ({ number, title, desc, icon: Icon, details }: { number: string, title: string, desc: string, icon: any, details: { example: string, method: string }, [key: string]: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.div layout className="rounded-xl bg-slate-900/50 border border-white/5 overflow-hidden hover:border-purple-500/30 transition-colors">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-4 p-4 cursor-pointer"
      >
        <div className="mt-1 p-2 bg-purple-500/10 rounded-lg text-purple-400">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1">
            <span className="text-purple-400 mr-2">{number}.</span> {title}
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{desc}</p>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 pt-0 text-[10px] space-y-2 border-t border-white/5 bg-black/20"
          >
            <div className="pt-3">
              <span className="font-bold text-slate-500 uppercase">Ejemplo:</span>
              <p className="text-slate-300 italic">{details.example}</p>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase">Método de Control:</span>
              <p className="text-slate-300">{details.method}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const LoinAuditSlide = () => {
  const group1 = [
    { number: '1', title: 'Control de Omisión', desc: 'Que no existan parámetros obligatorios vacíos (Null).', icon: FileSearch, details: { example: 'Puertas sin código RF.', method: 'Aislamiento visual de elementos (Null) mediante esquemas de color.' } },
    { number: '2', title: 'Control de Sintaxis', desc: 'Que la información cumpla el formato exigido.', icon: ClipboardCheck, details: { example: 'Uso de "Piso 1" en lugar de "P-01".', method: 'Parámetros con valores predefinidos (listas desplegables).' } },
    { number: '3', title: 'Control de Redundancia', desc: 'Asegurar que no existan parámetros duplicados.', icon: ClipboardCheck, details: { example: 'Dos parámetros de nivel.', method: 'Auditoría de lista de parámetros.' } },
    { number: '4', title: 'Control de Duplicación Geométrica', desc: 'Detectar elementos clonados.', icon: ShieldCheck, details: { example: 'Dos muros iguales en la misma posición.', method: 'Comprobación de interferencias (Categoría contra sí misma).' } },
    { number: '5', title: 'Control de Jerarquías', desc: 'Estructura de niveles y anclajes coherente.', icon: ShieldCheck, details: { example: 'Muro anclado a nivel temporal.', method: 'Revisión de alzados y secciones.' } },
  ];

  const group2 = [
    { number: '6', title: 'Consistencia Cruzada', desc: 'Coherencia geometría vs función.', icon: HardHat, details: { example: 'Muro estructural de 10cm.', method: 'Cruzar datos geométricos contra metadata.' } },
    { number: '7', title: 'Viabilidad de Perforaciones', desc: 'Redes MEP no debilitan estructura.', icon: HardHat, details: { example: 'Desagüe de 4" en viga.', method: 'Revisión visual de puntos de interferencia.' } },
    { number: '8', title: 'Coherencia de Materiales', desc: 'Materiales cumplen normativa (ej. fuego).', icon: ShieldCheck, details: { example: 'Puerta combustible en ruta evacuación.', method: 'Tablas de diseño con filtros de propiedad.' } },
    { number: '9', title: 'Tolerancias de Mantenimiento', desc: 'Áreas libres para acceso técnico.', icon: HardHat, details: { example: 'Muro invade zona de mantenimiento de bomba.', method: 'Volumen invisible de mantenimiento.' } },
    { number: '10', title: 'Conectividad de Redes', desc: 'Continuidad lógica de sistemas.', icon: FileSearch, details: { example: 'Tubería desconectada.', method: 'Inspectores visuales nativos (ej. "Mostrar desconexiones").' } },
  ];

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-[0.2em] block mb-1">
          SESIÓN 8 — LOIN
        </span>
        <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-3">
          <ClipboardCheck className="w-7 h-7 text-purple-500" />
          4. Auditoría y Control (Model Check)
        </h2>
        <p className="text-xs text-slate-400 mt-2 max-w-3xl">
          Protocolos de revisión obligatorios antes de promover archivos a estados SHARED o PUBLISHED.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Grupo 1: Calidad y Gobernanza
          </h3>
          {group1.map((p) => <AuditPoint key={p.number} {...p} />)}
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <HardHat className="w-4 h-4" />
            Grupo 2: Apoyo Técnico y Constructibilidad
          </h3>
          {group2.map((p) => <AuditPoint key={p.number} {...p} />)}
        </div>
      </div>
    </div>
  );
};
