import React from 'react';
import { motion } from 'motion/react';
import { Shapes, Database, FileText, BookOpen, AlertCircle } from 'lucide-react';

const PropertyTable = () => {
  const properties = [
    { name: 'NOMBRE', value: 'HVAC-01' },
    { name: 'TIPO', value: 'ESTÁNDAR' },
    { name: 'PESO', value: '150KG' },
    { name: 'VOLTAJE', value: '220V' },
    { name: 'MATERIAL', value: 'ACERO' },
  ];
  return (
    <div className="w-64 p-4 bg-black/40 border border-slate-700 rounded-lg">
      <div className="text-xs text-emerald-400 font-mono font-bold mb-3 border-b border-slate-700 pb-2">DATOS ALFANUMÉRICOS</div>
      {properties.map(p => (
        <div key={p.name} className="text-[10px] text-slate-300 font-mono flex justify-between py-1 border-b border-slate-800 last:border-0">
          <span className="text-slate-500">{p.name}:</span> <span>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const LoinInteractiveCube = () => {
  const [showDoc, setShowDoc] = React.useState(false);
  const [rotation, setRotation] = React.useState({ x: 20, y: 30 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    setRotation({ x: -y, y: x });
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center gap-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 20, y: 30 })}
    >
      <div className="perspective-1000 w-80 h-80 flex items-center justify-center cursor-move">
        <motion.div 
          className="relative w-40 h-40 preserve-3d"
          animate={{ rotateX: rotation.x, rotateY: rotation.y }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Cube Faces (Geometric) */}
          <div className="absolute inset-0 border-2 border-indigo-500/50 bg-indigo-900/20" style={{ transform: 'translateZ(80px)' }} />
          <div className="absolute inset-0 border-2 border-indigo-500/50 bg-indigo-900/20" style={{ transform: 'translateZ(-80px)' }} />
          <div className="absolute inset-0 border-2 border-indigo-500/50 bg-indigo-900/20" style={{ transform: 'rotateY(90deg) translateZ(80px)' }} />
          <div className="absolute inset-0 border-2 border-indigo-500/50 bg-indigo-900/20" style={{ transform: 'rotateY(90deg) translateZ(-80px)' }} />
          
          {/* Documentation icon (Click Triggered) */}
          <button 
            onClick={() => setShowDoc(!showDoc)}
            className="absolute -left-16 bottom-0 p-3 bg-amber-900/40 border border-amber-500/30 rounded-lg hover:bg-amber-900/60"
          >
            <FileText className="w-8 h-8 text-amber-400" />
            <div className="text-[8px] text-amber-200 mt-1 font-mono uppercase">Ficha Tec</div>
          </button>

          {showDoc && (
            <div className="absolute -bottom-40 left-0 w-64 p-4 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50">
              <h4 className="text-xs font-bold text-amber-500 mb-2">FICHA TÉCNICA: HVAC-01</h4>
              <p className="text-[9px] text-slate-400">Especificaciones detalladas de fábrica, certificados de seguridad, garantías de operación y manuales de mantenimiento preventivo.</p>
            </div>
          )}
        </motion.div>
      </div>
      <PropertyTable />
    </div>
  );
};

export const LoinDefinitionSlide = () => {
  const dimensions = [
    {
      title: 'Geométrica (Aspecto Visual)',
      icon: <Shapes className="w-6 h-6 text-indigo-400" />,
      desc: 'Forma, dimensiones físicas, ubicación, límites espaciales y tolerancias del objeto en el modelo 3D.',
      color: 'border-indigo-500/30 bg-indigo-500/5'
    },
    {
      title: 'Alfanumérica (Datos Puros)',
      icon: <Database className="w-6 h-6 text-emerald-400" />,
      desc: 'Propiedades, parámetros de texto o numéricos, y sistemas de clasificación (ej. resistencia al fuego, costos, códigos).',
      color: 'border-emerald-500/30 bg-emerald-500/5'
    },
    {
      title: 'Documentación (Archivos)',
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      desc: 'Archivos externos vinculados: manuales en PDF, certificados de laboratorio, fichas técnicas, garantías.',
      color: 'border-amber-500/30 bg-amber-500/5'
    }
  ];

  return (
    <div className="flex gap-8 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6">
      <div className="flex-1 space-y-8">
        <div className="border-b border-white/5 pb-6">
          <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-[0.2em] block mb-2">
            SESIÓN 8 — LOIN
          </span>
          <h2 className="text-3xl font-mono text-white font-black uppercase tracking-tight">
            2. ¿Qué es el LOIN?
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            El <strong>Level of Information Need</strong> (Nivel de Información Necesaria) es el marco estandarizado de la norma ISO 19650 / EN 17412.
          </p>
        </div>

        <div className="bg-[#050510]/50 p-6 rounded-2xl border border-white/5">
          <p className="text-slate-200 leading-relaxed text-sm mb-8 italic border-l-2 border-purple-500 pl-4">
            "El marco estandarizado que establece la cantidad mínima y estrictamente necesaria de información que debe tener un elemento o modelo en una fase específica del proyecto, según el propósito para el cual se va a utilizar."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dimensions.map((dim, i) => (
              <motion.div
                key={dim.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl border ${dim.color} space-y-4`}
              >
                <div className="p-3 bg-black/20 rounded-lg w-fit">
                  {dim.icon}
                </div>
                <h3 className="text-sm font-black text-white">{dim.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{dim.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 p-5 bg-amber-950/10 rounded-xl border border-amber-500/20 text-left">
          <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest">
              OBJETIVO ESTRATÉGICO
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evitar la <strong>sobreinformación</strong> (overmodeling), garantizando la eficiencia de recursos computacionales y humanos. A diferencia del antiguo LOD, el LOIN es multidimensional e independiente.
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center justify-center w-80">
        <LoinInteractiveCube />
      </div>
    </div>
  );
};
