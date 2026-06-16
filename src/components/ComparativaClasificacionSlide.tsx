import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Compass, Info, HelpCircle, ChevronRight, CheckCircle2,
  ListCollapse, MessageSquare, Award, BookOpen, Layers2,
  TableProperties, RefreshCw, Check, ArrowRight, Tag,
  Globe, LayoutGrid, FileCheck, Hammer
} from 'lucide-react';

interface SystemDetail {
  id: 'uniclass' | 'uniformat' | 'omniclass' | 'masterformat';
  name: string;
  fullName: string;
  origin: string;
  originFlag: string;
  scope: string;
  detailLevel: string;
  colorClass: string;
  textAccent: string;
  bgAccent: string;
  borderAccent: string;
  classifiesList: string[];
  examplesList: string[];
  mainAdvantage: string;
  quickQuestion: string;
}

export const ComparativaClasificacionSlide = () => {
  const [selectedSystem, setSelectedSystem] = useState<'uniclass' | 'uniformat' | 'omniclass' | 'masterformat'>('uniclass');
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Door classification comparison state
  const [activeDoorClass, setActiveDoorClass] = useState<'uniformat' | 'masterformat' | 'omniclass' | 'uniclass'>('uniclass');

  const systems: Record<'uniclass' | 'uniformat' | 'omniclass' | 'masterformat', SystemDetail> = {
    uniclass: {
      id: 'uniclass',
      name: "UniClass",
      fullName: "Uniclass 2015",
      origin: "Reino Unido",
      originFlag: "🇬🇧",
      scope: "Todo el entorno construido (activos, espacios, sistemas, elementos, productos, actividades)",
      detailLevel: "Muy amplio",
      colorClass: "from-sky-500/20 to-sky-700/5",
      textAccent: "text-sky-400",
      bgAccent: "bg-sky-500/10",
      borderAccent: "border-sky-500/30",
      classifiesList: [
        "Complejos & Entidades",
        "Actividades & Roles",
        "Espacios & Ubicaciones",
        "Sistemas & Elementos",
        "Productos & Materiales",
        "Herramientas & Recursos"
      ],
      examplesList: [
        "Sistema de fachada general",
        "Puerta metálica instalada",
        "Espacio físico de oficina",
        "Sistema de climatización HVAC"
      ],
      mainAdvantage: "Permite clasificar prácticamente cualquier información generada durante el ciclo de vida completo del proyecto de forma unificada.",
      quickQuestion: "¿Cómo clasifico todo el entorno construido dentro de un ecosistema BIM?"
    },
    uniformat: {
      id: 'uniformat',
      name: "UniFormat",
      fullName: "UniFormat Standard",
      origin: "Estados Unidos",
      originFlag: "🇺🇸",
      scope: "Elementos funcionales de una edificación (qué rol cumple cada parte)",
      detailLevel: "Intermedio",
      colorClass: "from-emerald-500/20 to-emerald-700/5",
      textAccent: "text-emerald-400",
      bgAccent: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/30",
      classifiesList: [
        "A: Subestructura (cimentación)",
        "B: Envolvente / Superestructura",
        "C: Interiores y Acabados",
        "D: Servicios e Instalaciones",
        "E: Equipamiento y Mobiliario"
      ],
      examplesList: [
        "B2010 – Muros exteriores completos",
        "A1010 – Cimentaciones estándar",
        "C1010 – Particiones interiores"
      ],
      mainAdvantage: "Organiza los proyectos según elementos funcionales completos y no según sus materiales constructivos particulares, ideal para presupuestos tempranos.",
      quickQuestion: "¿Qué función cumple este elemento o sistema en el edificio?"
    },
    omniclass: {
      id: 'omniclass',
      name: "OmniClass",
      fullName: "OmniClass Classification System",
      origin: "Estados Unidos",
      originFlag: "🇺🇸",
      scope: "Toda la información de la edificación mediante múltiples tablas relacionales",
      detailLevel: "Muy amplio",
      colorClass: "from-pink-500/20 to-pink-700/5",
      textAccent: "text-pink-400",
      bgAccent: "bg-pink-500/10",
      borderAccent: "border-pink-500/30",
      classifiesList: [
        "Tabla 11: Entidades de construcción",
        "Tabla 21: Elementos estructurales",
        "Tabla 22: Resultados del trabajo",
        "Tabla 23: Productos de obra",
        "Tabla 31: Fases de proyecto",
        "Tabla 33: Disciplinas de diseño"
      ],
      examplesList: [
        "Mismo elemento con códigos de tabla cruzados",
        "Consistencia de base de datos relacional",
        "Integración plena con parámetros IFC estándar"
      ],
      mainAdvantage: "Es el sistema norteamericano más completo. Funciona como una base de datos relacional que mapea un mismo elemento desde múltiples aristas.",
      quickQuestion: "¿Cómo clasifico de forma relacional toda la información posible del proyecto?"
    },
    masterformat: {
      id: 'masterformat',
      name: "MasterFormat",
      fullName: "MasterFormat (CSI)",
      origin: "Estados Unidos",
      originFlag: "🇺🇸",
      scope: "Especificaciones técnicas directas, partidas de construcción y materiales",
      detailLevel: "Muy detallado",
      colorClass: "from-amber-500/20 to-amber-700/5",
      textAccent: "text-amber-400",
      bgAccent: "bg-amber-500/10",
      borderAccent: "border-amber-500/30",
      classifiesList: [
        "División 03: Concreto / Hormigón",
        "División 05: Metales y Perfiles",
        "División 08: Puertas y Ventanas",
        "División 09: Acabados y Pinturas",
        "División 23: Climatización HVAC"
      ],
      examplesList: [
        "08 11 13 – Puertas metálicas huecas",
        "03 30 00 – Hormigón moldeado in situ",
        "09 90 00 – Pinturas y revestimientos"
      ],
      mainAdvantage: "Es el estándar industrial por excelencia para elaborar especificaciones técnicas de licitación, contratos, compras y presupuestos ultra detallados.",
      quickQuestion: "¿Qué material u oficio específico construye esta solución?"
    }
  };

  const comparisonRows = [
    {
      system: "UniClass",
      origin: "Reino Unido 🇬🇧",
      focus: "Todo el entorno construido (activos, espacios, sistemas, productos, roles)",
      detail: "Muy amplio",
      color: "border-sky-500/20 text-sky-400 hover:bg-sky-500/5",
      id: 'uniclass'
    },
    {
      system: "UniFormat",
      origin: "Estados Unidos 🇺🇸",
      focus: "Elementos funcionales de la edificación (macro-sistemas integrales)",
      detail: "Intermedio",
      color: "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5",
      id: 'uniformat'
    },
    {
      system: "OmniClass",
      origin: "Estados Unidos 🇺🇸",
      focus: "Información transversal de construcción organizada en 15 tablas lógicas",
      detail: "Muy amplio",
      color: "border-pink-500/20 text-pink-400 hover:bg-pink-500/5",
      id: 'omniclass'
    },
    {
      system: "MasterFormat",
      origin: "Estados Unidos 🇺🇸",
      focus: "Especificaciones técnicas detalladas y partidas de obra por oficios",
      detail: "Muy detallado",
      color: "border-amber-500/20 text-amber-400 hover:bg-amber-500/5",
      id: 'masterformat'
    }
  ];

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header Slide Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-[0.2em] block mb-1">
            CLASE 6 — ENTORNO DE DATOS COMUNES
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-pink-500 shrink-0" />
            2. Tipos de Sistemas y Tabla Comparativa
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Entiende los propósitos, alcances y diferencias entre los 4 grandes modelos reguladores globales
          </p>
        </div>
        
        {/* Quick info badge for students */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-[9px] font-mono text-pink-400 font-bold self-center">
          <BookOpen className="w-3.5 h-3.5" />
          GUÍA PARA EXAMEN TÉCNICO
        </div>
      </div>

      {/* Introducción - Student Oriented */}
      <div className="bg-[#030712]/50 p-4 rounded-xl border border-white/5 text-left space-y-2">
        <p className="text-xs md:text-sm text-slate-350 leading-relaxed font-sans font-medium">
          Aunque los cuatro son sistemas estandarizados para la industria de la construcción, <strong>no compiten entre sí</strong>. Fueron diseñados bajo puntos de vista y necesidades operativas distintas del ciclo de vida del edificio, lo que permite que un mismo elemento sea clasificado bajo diferentes códigos para cumplir propósitos variados.
        </p>
      </div>

      {/* Interactive Section 1: Comparison Matrix Table */}
      <div className="bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 relative overflow-hidden text-left">
        <div className="absolute inset-0 immersive-grid opacity-[0.02] pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9.5px] font-mono text-pink-400 font-black uppercase tracking-widest block">
            MATRIZ SINOPSIS DE ENFOQUE (TABLA COMPARATIVA)
          </span>
          <span className="text-[9px] text-zinc-550 font-mono hidden md:block">
            Presiona cualquier fila para enfocar sus detalles interactivos abajo
          </span>
        </div>

        {/* Real HTML Table styled cleanly */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Sistema</th>
                <th className="py-3 px-4 font-bold">País de Origen</th>
                <th className="py-3 px-4 font-bold">¿Qué Clasifica? (Propósito de Uso)</th>
                <th className="py-3 px-4 font-bold text-center">Nivel de Detalle</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rIdx) => {
                const isSelected = selectedSystem === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedSystem(row.id as any)}
                    onMouseEnter={() => setHoveredCell({ row: rIdx, col: -1 })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`border-b border-white/5 cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-pink-500/10 text-white font-semibold' 
                        : 'hover:bg-white/[0.02] text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        row.id === 'uniclass' ? 'bg-sky-400' :
                        row.id === 'uniformat' ? 'bg-emerald-450' :
                        row.id === 'omniclass' ? 'bg-pink-400' :
                        'bg-amber-450'
                      }`} />
                      {row.system}
                    </td>
                    <td className="py-3.5 px-4 font-medium">{row.origin}</td>
                    <td className="py-3.5 px-4 text-slate-300 leading-normal">{row.focus}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        row.detail === 'Muy amplio' ? 'bg-[#38bdf8]/10 text-[#38bdf8]' :
                        row.detail === 'Muy detallado' ? 'bg-amber-400/10 text-amber-400' :
                        'bg-emerald-400/10 text-emerald-400'
                      }`}>
                        {row.detail}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Section 2: Detailed inspection tab view of the 4 systems */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Selector of Systems */}
        <div className="lg:col-span-4 flex flex-col gap-2 text-left">
          <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-black pl-1">
            EXPLORA CADA ESTÁNDAR
          </span>
          
          <div className="space-y-1.5 flex flex-col h-full justify-between">
            {Object.values(systems).map((sys) => {
              const active = selectedSystem === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    active 
                      ? `${sys.borderAccent} bg-white/[0.02] shadow-[0_0_15px_rgba(236,72,153,0.03)]` 
                      : 'border-white/5 bg-black/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-mono text-xs font-black uppercase ${active ? sys.textAccent : 'text-slate-400'}`}>
                      {sys.name}
                    </span>
                    <span className="text-[10px] font-mono opacity-80">{sys.originFlag} {sys.origin}</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 line-clamp-1 leading-snug">{sys.fullName}</p>
                </button>
              );
            })}

            <div className="bg-black/55 p-3 rounded-xl border border-white/5 mt-4 text-[10.5px] leading-relaxed text-slate-450 font-sans hidden lg:block">
              <strong>Tip de memoria rápida:</strong> Recuerda que <strong>OmniClass</strong> y <strong>UniClass</strong> son completos porque abordan bases del modelo BIM entero.
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Cards displaying detail of Selected System */}
        <div className="lg:col-span-8 bg-[#040a17]/40 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSystem}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* Header inside detailing system */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-3 gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl leading-none">{systems[selectedSystem].originFlag}</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{systems[selectedSystem].origin}</span>
                  </div>
                  <h3 className={`text-lg font-sans font-black uppercase text-white tracking-tight`}>
                    {systems[selectedSystem].fullName}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-zinc-500">NIVEL:</span>
                  <span className={`text-[10px] uppercase font-mono font-extrabold px-2 py-0.5 rounded border ${systems[selectedSystem].borderAccent} ${systems[selectedSystem].textAccent}`}>
                    {systems[selectedSystem].detailLevel}
                  </span>
                </div>
              </div>

              {/* What It Classifies - visual labels */}
              <div className="space-y-2">
                <span className="text-[9.5px] font-mono text-zinc-500 uppercase tracking-wider block">Categorías Principales que Clasifica:</span>
                <div className="flex flex-wrap gap-1.5 font-sans">
                  {systems[selectedSystem].classifiesList.map((item, index) => (
                    <span key={index} className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[10.5px] font-medium text-slate-300">
                      📄 {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scope & Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5 bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-mono text-pink-400 font-extrabold uppercase tracking-wide block">PROCESO / ALCANCE</span>
                  <p className="text-[11px] leading-relaxed text-slate-300 font-sans">
                    {systems[selectedSystem].scope}
                  </p>
                </div>
                
                <div className="space-y-1.5 bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-mono text-sky-400 font-extrabold uppercase tracking-wide block">EJEMPLOS DE REPRESENTACIÓN</span>
                  <ul className="text-[11px] space-y-1 text-slate-300 pl-1.5 font-sans">
                    {systems[selectedSystem].examplesList.map((ex, index) => (
                      <li key={index} className="flex gap-1 items-center">
                        <span className="text-zinc-650">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main Advantage */}
              <div className={`p-4 rounded-xl border ${systems[selectedSystem].borderAccent} ${systems[selectedSystem].bgAccent} leading-relaxed text-[11px] text-slate-350 font-sans`}>
                💡 <strong>Ventaja Clave para tu aprendizaje:</strong> {systems[selectedSystem].mainAdvantage}
              </div>

            </motion.div>
          </AnimatePresence>
          
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap justify-between items-center text-[9.5px] text-zinc-500 font-mono gap-2">
            <span>Enfoque ISO 19650-2 (Caché de activos interoperables)</span>
            <span className="text-zinc-400 capitalize">Propósito: {selectedSystem}</span>
          </div>
        </div>

      </div>

      {/* Interactive Section 3: The Door Sandbox "Un mismo objeto, múltiples códigos" */}
      <div className="bg-[#040a17]/60 border border-white/5 rounded-2xl p-5 md:p-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 font-sans text-9xl font-black select-none pointer-events-none">
          🚪
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-white/5 pb-3.5 mb-4">
          <div>
            <span className="text-[9px] font-mono text-[#38bdf8] font-black uppercase tracking-widest block">CASO DE ESTUDIO VISUAL PRÁCTICO</span>
            <h4 className="text-sm font-sans font-black text-white uppercase">Múltiple Codificación en un Objeto BIM Real</h4>
            <p className="text-[10.5px] text-slate-450 font-sans leading-normal">
              Entiende de forma gráfica cómo un mismo componente (Puerta Metálica Cortafuego) tiene identidades distintas según el estándar.
            </p>
          </div>
          
          {/* Selector of door mappings */}
          <div className="flex p-0.5 bg-black/65 border border-white/5 rounded-lg shrink-0 overflow-hidden font-mono shadow-md text-[9.5px]">
            <button
              onClick={() => setActiveDoorClass('uniclass')}
              className={`px-2 py-1 rounded transition-all cursor-pointer font-extrabold ${activeDoorClass === 'uniclass' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              UniClass
            </button>
            <button
              onClick={() => setActiveDoorClass('uniformat')}
              className={`px-2 py-1 rounded transition-all cursor-pointer font-extrabold ${activeDoorClass === 'uniformat' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              UniFormat
            </button>
            <button
              onClick={() => setActiveDoorClass('omniclass')}
              className={`px-2 py-1 rounded transition-all cursor-pointer font-extrabold ${activeDoorClass === 'omniclass' ? 'bg-pink-500/20 text-pink-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              OmniClass
            </button>
            <button
              onClick={() => setActiveDoorClass('masterformat')}
              className={`px-2 py-1 rounded transition-all cursor-pointer font-extrabold ${activeDoorClass === 'masterformat' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              MasterFormat
            </button>
          </div>
        </div>

        {/* Dynamic Canvas Container for the door study case */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Visual Door Section */}
          <div className="md:col-span-5 bg-black/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between align-center items-center text-center relative">
            <div className="my-auto py-5 relative">
              {/* Drawing a simple schematic Door using Tailwind & vectors */}
              <div className="relative w-24 h-40 border-4 border-slate-700 bg-zinc-900 rounded-md flex items-center justify-center p-1.5 shadow-2xl transition-all hover:scale-103 duration-300">
                <div className="w-full h-full bg-slate-800 border-2 border-slate-600 rounded flex flex-col justify-between p-3 relative">
                  {/* Fire resistance text */}
                  <div className="w-6 h-1 w-full bg-red-600/35 border border-red-500/50 rounded text-[6px] font-mono text-red-200 flex items-center justify-center font-bold">
                    FIRE RESIST (60m)
                  </div>
                  {/* Door knob */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-yellow-500/80 rounded-sm"></div>
                  {/* Glass pane inside */}
                  <div className="w-4 h-12 bg-sky-400/20 border border-sky-400/40 rounded mx-auto"></div>
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-white/5 pt-2">
              <span className="text-[10px] font-sans font-black tracking-wide text-white block">Puerta Metálica Cortafuego</span>
              <span className="text-[8px] font-mono text-zinc-550 block">Ubicada en Módulo de Salida de Emergencia Exterior</span>
            </div>
          </div>

          {/* Text/Definition mapping explanation container */}
          <div className="md:col-span-7 flex flex-col justify-between bg-black/30 p-4 border border-zinc-900 rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDoorClass}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {/* Specific details */}
                {activeDoorClass === 'uniclass' && (
                  <>
                    <span className="text-[9px] font-mono text-sky-400 font-extrabold uppercase tracking-widest pl-1 border-l-2 border-sky-500 block">UNICLASS 2015 PRODUCTO</span>
                    <h5 className="text-[14px] font-sans font-black text-white">Código Estándar: Pr_30_59_24_25</h5>
                    <p className="text-[11.5px] leading-relaxed text-slate-300 font-sans">
                      Se enfoca en la puerta como un <strong>producto fabricado de forma específica</strong>. Indica que cumple con las propiedades de paso, estanqueidad y resguardo con valor numérico en el ecosistema de diseño BIM nativo del Reino Unido.
                    </p>
                    <div className="bg-sky-500/[0.03] p-2.5 rounded border border-sky-500/10 text-[10px] font-mono text-sky-305">
                      Ruta jerárquica: Pr (Productos) → Pr_30 (Productos Estructurales) → Pr_30_59 (Puertas, Ventanas) → Pr_30_59_24_25 (Producto Puerta Cortafuego)
                    </div>
                  </>
                )}

                {activeDoorClass === 'uniformat' && (
                  <>
                    <span className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest pl-1 border-l-2 border-emerald-500 block">UNIFORMAT ELEMENTO FUNCIONAL</span>
                    <h5 className="text-[14px] font-sans font-black text-white">Código Estándar: B2030 – Exterior Doors</h5>
                    <p className="text-[11.5px] leading-relaxed text-slate-300 font-sans">
                      Clasifica por su <strong>función constructiva</strong>. Al analista financiero o estimador temprano de costos le basta saber que en la envoltura exterior (B20) hay una puerta técnica externa (B2030), sin entrar a debatir si es metálica o de aluminio.
                    </p>
                    <div className="bg-emerald-500/[0.03] p-2.5 rounded border border-emerald-500/10 text-[10px] font-mono text-emerald-305">
                      Ruta jerárquica: B (Shell / Envoltura) → B20 (Exterior Enclosure) → B2030 (Exterior Doors)
                    </div>
                  </>
                )}

                {activeDoorClass === 'omniclass' && (
                  <>
                    <span className="text-[9px] font-mono text-pink-400 font-extrabold uppercase tracking-widest pl-1 border-l-2 border-pink-500 block">OMNICLASS TABLA 23 PRODUCTOS</span>
                    <h5 className="text-[14px] font-sans font-black text-white">Código Estándar: 23-30 10 10 10</h5>
                    <p className="text-[11.5px] leading-relaxed text-slate-300 font-sans">
                      Mapea el objeto cruzando la información por <strong>múltiples tablas estructuradas</strong>. Puedes identificar la puerta física (Tabla 23) coordinándola con las actividades de instalación mecánica correspondientes (Tabla 22).
                    </p>
                    <div className="bg-pink-500/[0.03] p-2.5 rounded border border-pink-500/10 text-[10px] font-mono text-pink-305">
                      Ruta jerárquica: Tabla 23 (Products) → 23-30 (Openings) → 23-30 10 (Doors & Gates)
                    </div>
                  </>
                )}

                {activeDoorClass === 'masterformat' && (
                  <>
                    <span className="text-[9px] font-mono text-amber-400 font-extrabold uppercase tracking-widest pl-1 border-l-2 border-amber-500 block">MASTERFORMAT ESPECIFICACIÓN DETALLADA</span>
                    <h5 className="text-[14px] font-sans font-black text-white">Código Estándar: 08 11 13 – Hollow Metal Doors</h5>
                    <p className="text-[11.5px] leading-relaxed text-slate-300 font-sans">
                      Determina los <strong>materiales, el oficio calificado que la instala y la cláusula del contrato</strong>. Al comprador de materiales u operador de obra técnica le indica que debe remitirse a las características de puertas metálicas huecas de la división 08.
                    </p>
                    <div className="bg-amber-500/[0.03] p-2.5 rounded border border-amber-500/10 text-[10px] font-mono text-amber-305">
                      Ruta jerárquica: División 08 (Openings) → 08 11 00 (Metal Doors and Frames) → 08 11 13 (Hollow Metal Doors)
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-white/5 pt-2.5 mt-4 text-[10px] italic text-zinc-500 font-sans">
              📍 <strong>Conclusión:</strong> Al cambiar el selector compruebas que el objeto en el modelo 3D sigue siendo el mismo, pero su código responde a un flujo de trabajo y formato de exportación diferente.
            </div>
          </div>

        </div>

      </div>

      {/* Regla rápida para recordarlos (Beautiful visual card) */}
      <div className="bg-[#030712]/75 border border-white/5 rounded-2xl p-5 text-left">
        <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block mb-1">REGLAS CLAVE MENTALES</span>
        <h4 className="text-sm font-sans font-black text-white uppercase mb-3">Tu Guía Veloz Para Recordar Cada Sistema de Forma Práctica</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-black/40 border border-sky-500/20 p-3.5 rounded-xl flex flex-col justify-between min-h-[90px]">
            <div>
              <span className="text-[9px] font-mono text-sky-450 font-black block mb-1">UNICLASS 2015</span>
              <p className="text-[11.5px] text-white font-mono leading-snug">
                ¿Cómo clasifico todo el entorno construido dentro del ecosistema BIM moderno?
              </p>
            </div>
          </div>
          
          <div className="bg-black/40 border border-emerald-500/20 p-3.5 rounded-xl flex flex-col justify-between min-h-[90px]">
            <div>
              <span className="text-[9px] font-mono text-emerald-450 font-black block mb-1">UNIFORMAT</span>
              <p className="text-[11.5px] text-white font-mono leading-snug">
                ¿Qué función constructiva o rol estructural principal cumple esto en el edificio completo?
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-pink-500/20 p-3.5 rounded-xl flex flex-col justify-between min-h-[90px]">
            <div>
              <span className="text-[9px] font-mono text-pink-450 font-black block mb-1">OMNICLASS</span>
              <p className="text-[11.5px] text-white font-mono leading-snug">
                ¿Cómo ubico y correlaciono toda la información cruzada y multidimensional del proyecto?
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-amber-500/20 p-3.5 rounded-xl flex flex-col justify-between min-h-[90px]">
            <div>
              <span className="text-[9px] font-mono text-amber-450 font-black block mb-1">MASTERFORMAT</span>
              <p className="text-[11.5px] text-white font-mono leading-snug">
                ¿Qué material específico u oficio constructivo interviene en la edificación detallada?
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
