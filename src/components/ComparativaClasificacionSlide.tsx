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

interface ElementInfo {
  name: string;
  category: string;
  emoji: string;
  omniClassCode: string;
  omniClassPath: string[];
  omniClassExplanation: string;
  uniClassCode: string;
  uniClassPath: string[];
  uniClassExplanation: string;
  masterFormatCode: string;
  masterFormatPath: string[];
  masterFormatExplanation: string;
  uniFormatCode: string;
  uniFormatPath: string[];
  uniFormatExplanation: string;
  studentFocus: string;
}

const elementsData: Record<'wall' | 'footing' | 'door' | 'light', ElementInfo> = {
  wall: {
    name: "Muro Exterior de Hormigón Armado",
    category: "Sistemas de Envolvente y Muros de Carga",
    emoji: "🧱",
    omniClassCode: "21-02 10 20",
    omniClassPath: [
      "Tabla 21: Elements (Elementos de Construcción)",
      "21-02: Superstructure & Shell",
      "21-02 10: Exterior Vertical Enclosures",
      "21-02 10 20: Exterior Walls"
    ],
    omniClassExplanation: "Sitúa el muro como una unidad tridimensional de la estructura del edificio para análisis espacial.",
    uniClassCode: "Ss_25_10_30",
    uniClassPath: [
      "Ss: Systems (Sistemas Coherentes)",
      "Ss_25: Wall and cladding systems",
      "Ss_25_10: Wall systems",
      "Ss_25_10_30: External wall systems"
    ],
    uniClassExplanation: "Inserta la fachada en un framework unificado británico que apoya flujos continuos as-built.",
    masterFormatCode: "03 30 00",
    masterFormatPath: [
      "División 03: Concrete (Hormigón / Concreto)",
      "03 30 00: Cast-in-Place Concrete",
      "03 31 00: Structural Concrete"
    ],
    masterFormatExplanation: "Especifica hormigón vaciado in situ, ideal para compras de agregados de obra, mezcladoras, y subcontratistas.",
    uniFormatCode: "B2010",
    uniFormatPath: [
      "Categoría B: Shell",
      "B20: Exterior Enclosure",
      "B2010: Exterior Walls"
    ],
    uniFormatExplanation: "Asigna el rol del muro como un subsistema contenedor de calor de la fachada antes de comprar especificaciones.",
    studentFocus: "La clasificación automatiza tus cómputos métricos. En lugar de sumar volúmenes seleccionando muros uno por uno en la pantalla, programas como Navisworks o Presto leen el código '03 30 00' o 'B2010' y calculan de inmediato los metros cúbicos exactos, actualizándose solos si cambias el diseño."
  },
  footing: {
    name: "Zapata de Fundación Aislada",
    category: "Sistemas de Cimentación de Soporte",
    emoji: "📐",
    omniClassCode: "21-01 10 10",
    omniClassPath: [
      "Tabla 21: Elements",
      "21-01: Substructure (Subestructura)",
      "21-01 10: Foundations",
      "21-01 10 10: Standard Foundations"
    ],
    omniClassExplanation: "Organiza el soporte de hormigón en la tabla relacional de elementos estructurales coordinados.",
    uniClassCode: "Ef_15_10",
    uniClassPath: [
      "Ef: Elements (Elementos Físicos)",
      "Ef_15: Ground and foundation elements",
      "Ef_15_10: Foundations"
    ],
    uniClassExplanation: "Nombra las bases de fundación de forma neutra y directa para cubicaciones BIM internacionales.",
    masterFormatCode: "03 11 13",
    masterFormatPath: [
      "División 03: Concrete (Hormigón)",
      "03 11 00: Concrete Forming",
      "03 11 13: Structural Cast-in-Place Concrete Forming"
    ],
    masterFormatExplanation: "Especifica los moldes y encofrados temporales de madera o acero necesarios para vaciar la zapata en terreno.",
    uniFormatCode: "A1010",
    uniFormatPath: [
      "Categoría A: Substructure",
      "A10: Foundations",
      "A1010: Standard Foundations"
    ],
    uniFormatExplanation: "Agrupa la zapata bajo el subsistema de cimentación fija que distribuye el peso de la obra al suelo firme.",
    studentFocus: "Para el control de calidad en obra: Puedes crear reglas lógicas automáticas en segundos (ej. 'Pintar de rojo todas las zapatas que no tengan asignado un código de la División 03'). Esto te permite auditar la calidad del modelo BIM antes de entregarlo al cliente."
  },
  door: {
    name: "Puerta Metálica Cortafuego (RF-60)",
    category: "Carpintería y Aperturas Técnicas",
    emoji: "🚪",
    omniClassCode: "23-30 10 10",
    omniClassPath: [
      "Tabla 23: Products",
      "23-30: Openings, Passages & Protective Devices",
      "23-30 10: Openings / Doors",
      "23-30 10 10: Wood/Metal Door Products"
    ],
    omniClassExplanation: "Permite clasificar el producto físico cruzándolo con su resistencia al fuego con parámetros relacionales.",
    uniClassCode: "Pr_30_59_24",
    uniClassPath: [
      "Pr: Products (Productos Terminados)",
      "Pr_30: Structure and enclosure products",
      "Pr_30_59: Door and window products",
      "Pr_30_59_24: Door assemblies"
    ],
    uniClassExplanation: "Define la puerta como un lote de producto ensamblado integral que viene de fábrica.",
    masterFormatCode: "08 11 13",
    masterFormatPath: [
      "División 08: Openings (Puertas y Ventanas)",
      "08 11 00: Metal Doors and Frames",
      "08 11 13: Hollow Metal Doors"
    ],
    masterFormatExplanation: "Especifica las directrices técnicas del material lámina de acero, perfiles y herrajes para la adquisición de compras.",
    uniFormatCode: "B2030",
    uniFormatPath: [
      "Categoría B: Shell",
      "B20: Exterior Enclosure",
      "B2030: Exterior Doors"
    ],
    uniFormatExplanation: "Sienta las bases funcionales de la puerta como un escape de emergencia de fachada exterior del edificio.",
    studentFocus: "No dependas de ponerle descripciones en texto libre como 'puertas contra incendios grandes'. Si utilizas el código estandarizado (como 'B2030' o '08 11 13'), el inspector de seguridad de bomberos puede auditar la resistencia al fuego de miles de puertas en el modelo 3D en milisegundos usando reglas de consulta digital."
  },
  light: {
    name: "Luminaria Embutida LED",
    category: "Equipos Eléctricos y Sistemas",
    emoji: "💡",
    omniClassCode: "23-85 10 10",
    omniClassPath: [
      "Tabla 23: Products",
      "23-85: Electrical & Lighting Products",
      "23-85 10: Luminaires",
      "23-85 10 10: Indoor Luminaires"
    ],
    omniClassExplanation: "Define el artefacto de luz como un producto de suministro eléctrico del proyecto.",
    uniClassCode: "Pr_70_70_47",
    uniClassPath: [
      "Pr: Products (Mecánica y Electricidad)",
      "Pr_70: Services products",
      "Pr_70_70: Electrical and lighting products",
      "Pr_70_70_47: Luminaires"
    ],
    uniClassExplanation: "Registra la luminaria como activo con código duradero útil para Facility Management.",
    masterFormatCode: "26 51 19",
    masterFormatPath: [
      "División 26: Electrical (Sistemas Eléctricos)",
      "26 51 00: Interior Lighting",
      "26 51 19: LED Interior Lighting"
    ],
    masterFormatExplanation: "Se vincula directamente a las cubicaciones de tendido, canalizaciones, interruptores, y pruebas de luminotecnia LED.",
    uniFormatCode: "D5020",
    uniFormatPath: [
      "Categoría D: Services (Instalaciones)",
      "D50: Electrical",
      "D5020: Lighting and Branch Wiring"
    ],
    uniFormatExplanation: "Modela la función de branch de circuito del sistema de alumbrado completo de la planta.",
    studentFocus: "En la fase de operaciones (Facility Management), el cliente final recibe el modelo as-built. Incorporar códigos como '26 51 19' ayuda al equipo de mantenimiento a geolocalizar la ampolleta quemada e identificar al proveedor exacto en la base de datos de activos de forma automática sin buscar carpetas de papel."
  }
};

export const ComparativaClasificacionSlide = () => {
  const [selectedSystem, setSelectedSystem] = useState<'uniclass' | 'uniformat' | 'omniclass' | 'masterformat'>('uniclass');
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // States for the integrated Case Study Element Sandbox
  const [selectedElement, setSelectedElement] = useState<'wall' | 'footing' | 'door' | 'light'>('door');
  const [selectedStandard, setSelectedStandard] = useState<'uniclass' | 'uniformat' | 'omniclass' | 'masterformat'>('uniclass');

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

      {/* Interactive Section 3: BIM Element & Classification Explorer (Caso de Estudio Integrado) */}
      <div className="bg-[#040a17]/60 border border-white/5 rounded-2xl p-5 md:p-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 font-sans text-9xl font-black select-none pointer-events-none">
          ⚙️
        </div>

        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 border-b border-white/5 pb-3.5 mb-4">
          <div>
            <span className="text-[9px] font-mono text-[#38bdf8] font-black uppercase tracking-widest block">CASO DE ESTUDIO INTEGRADO Y MULTIELEMENTO</span>
            <h4 className="text-sm font-sans font-black text-white uppercase">Explorador de Clasificaciones y Objetos Reales</h4>
            <p className="text-[10.5px] text-slate-450 font-sans leading-normal">
              Selecciona un componente estructural y alterna el estándar para comprender cómo su identidad digital cambia según la fase de construcción y el propósito de modelado.
            </p>
          </div>
          
          {/* Selector of Active Element */}
          <div className="flex flex-wrap p-0.5 bg-black/65 border border-white/5 rounded-lg shrink-0 font-mono shadow-md text-[9.5px]">
            <button
              onClick={() => setSelectedElement('door')}
              className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-extrabold ${selectedElement === 'door' ? 'bg-pink-500/15 text-pink-400' : 'text-slate-505 hover:text-slate-300'}`}
            >
              🚪 Puerta (RF-60)
            </button>
            <button
              onClick={() => setSelectedElement('wall')}
              className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-extrabold ${selectedElement === 'wall' ? 'bg-pink-500/15 text-pink-400' : 'text-slate-505 hover:text-slate-300'}`}
            >
              🧱 Muro Exterior
            </button>
            <button
              onClick={() => setSelectedElement('footing')}
              className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-extrabold ${selectedElement === 'footing' ? 'bg-pink-500/15 text-pink-400' : 'text-slate-505 hover:text-slate-300'}`}
            >
              📐 Zapata Cimiento
            </button>
            <button
              onClick={() => setSelectedElement('light')}
              className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-extrabold ${selectedElement === 'light' ? 'bg-pink-500/15 text-pink-400' : 'text-slate-505 hover:text-slate-300'}`}
            >
              💡 Luminaria LED
            </button>
          </div>
        </div>

        {/* Dynamic Canvas Container for the unified study case */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Column: Visual Asset Display */}
          <div className="md:col-span-5 bg-black/50 border border-white/5 rounded-xl p-5 flex flex-col justify-between align-center items-center text-center relative">
            <div className="my-auto py-4 flex items-center justify-center select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedElement}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Drawing door */}
                  {selectedElement === 'door' && (
                    <div className="relative w-28 h-40 border-4 border-slate-705 bg-zinc-900 rounded flex items-center justify-center p-1.5 shadow-2xl">
                      <div className="w-full h-full bg-slate-800 border-2 border-slate-650 rounded flex flex-col justify-between p-3 relative">
                        <div className="w-full bg-red-650/40 border border-red-500/50 rounded text-[5px] font-mono text-red-200 py-0.5 font-bold">
                          FIRE RESIST (RF-60)
                        </div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-yellow-501/70 rounded-xs"></div>
                        <div className="w-4 h-12 bg-sky-400/10 border border-sky-400/3 overlay rounded mx-auto"></div>
                      </div>
                    </div>
                  )}

                  {/* Drawing wall section */}
                  {selectedElement === 'wall' && (
                    <div className="relative w-36 h-36 flex border border-white/10 rounded overflow-hidden bg-zinc-950 shadow-2xl">
                      <div className="w-1/3 bg-slate-700/50 flex items-center justify-center border-r border-dashed border-white/10 px-1">
                        <span className="text-[7.5px] text-zinc-400 uppercase font-mono font-black [writing-mode:vertical-lr] rotate-180">Acabado Revestido</span>
                      </div>
                      <div className="w-2/3 bg-slate-600 flex flex-col justify-between p-3.5 relative">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,#475569_25%,transparent_25%,transparent_50%,#475569_50%,#475569_75%,transparent_75%,transparent)] bg-[size:10px_10px] opacity-15"></div>
                        <div className="text-[9px] text-[#38bdf8] font-mono font-black tracking-wide z-10">CORE STRUCTURAL</div>
                        <div className="text-[9px] text-zinc-350 font-mono font-semibold z-10">CONCRETO H30</div>
                        <div className="text-[8px] text-zinc-500 font-mono z-10 text-right">LOD 300</div>
                      </div>
                    </div>
                  )}

                  {/* Drawing footing */}
                  {selectedElement === 'footing' && (
                    <div className="relative w-36 h-36 flex flex-col items-center justify-end">
                      <div className="w-12 h-16 bg-slate-600 border-x border-t border-white/10 relative">
                        <div className="absolute inset-x-3.5 top-0 bottom-0 border-x border-red-500/40"></div>
                      </div>
                      <div className="w-32 h-14 bg-slate-500 border border-white/10 relative rounded-sm flex flex-col justify-center items-center shadow-2xl">
                        <div className="absolute inset-x-2 bottom-3.5 h-0.5 bg-red-650/40"></div>
                        <div className="absolute inset-x-2 bottom-2 h-0.5 bg-red-650/40"></div>
                        <span className="text-[7.5px] font-mono font-bold text-zinc-300">ZAPATA AISLADA</span>
                        <span className="text-[6.5px] font-mono text-zinc-450 uppercase">Anclaje con Acero</span>
                      </div>
                    </div>
                  )}

                  {/* Drawing light */}
                  {selectedElement === 'light' && (
                    <div className="relative w-36 h-36 flex flex-col items-center justify-start">
                      <div className="w-full h-3 bg-zinc-700/80 border-b border-white/5"></div>
                      <div className="w-16 h-3.5 bg-zinc-900 border-x border-b border-zinc-500/40 rounded-b flex items-center justify-center relative shadow-lg">
                        <div className="w-12 h-1 bg-amber-250 animate-pulse rounded"></div>
                      </div>
                      <div className="w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-t-[80px] border-t-amber-400/[0.06] mt-0.5 blur-[1px]"></div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full text-center border-t border-white/5 pt-2">
              <span className="text-xs font-sans font-black tracking-wide text-white block">
                {elementsData[selectedElement].name}
              </span>
              <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest block mt-0.5">
                {elementsData[selectedElement].category}
              </span>
            </div>
          </div>

          {/* Right Column: Code and Standard Detail Selector */}
          <div className="md:col-span-7 flex flex-col justify-between bg-black/30 p-4 border border-zinc-900 rounded-xl">
            
            <div className="space-y-4">
              {/* Internal standard switcher tabs */}
              <div className="flex border-b border-white/5 pb-2.5 flex-wrap gap-1.5 font-mono text-[9px]">
                <button
                  onClick={() => setSelectedStandard('uniclass')}
                  className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-black uppercase ${selectedStandard === 'uniclass' ? 'bg-sky-505/15 border border-sky-505/25 text-sky-400' : 'text-slate-500 hover:text-slate-350'}`}
                >
                  UniClass (UK / Entorno)
                </button>
                <button
                  onClick={() => setSelectedStandard('uniformat')}
                  className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-black uppercase ${selectedStandard === 'uniformat' ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-400' : 'text-slate-500 hover:text-slate-350'}`}
                >
                  UniFormat (Fase Diseño)
                </button>
                <button
                  onClick={() => setSelectedStandard('omniclass')}
                  className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-black uppercase ${selectedStandard === 'omniclass' ? 'bg-pink-500/15 border border-pink-500/25 text-pink-405' : 'text-slate-500 hover:text-slate-350'}`}
                >
                  OmniClass (BBDD Estructural)
                </button>
                <button
                  onClick={() => setSelectedStandard('masterformat')}
                  className={`px-2.5 py-1.5 rounded transition-all cursor-pointer font-black uppercase ${selectedStandard === 'masterformat' ? 'bg-amber-505/15 border border-amber-505/25 text-amber-500' : 'text-slate-505 hover:text-slate-350'}`}
                >
                  MasterFormat (Costos)
                </button>
              </div>

              {/* Detail display panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedElement}-${selectedStandard}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3.5"
                >
                  {/* Dynamic Code Output Banner */}
                  <div className="flex justify-between items-center bg-black/45 p-3 rounded-lg border border-white/[0.03]">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 block uppercase tracking-wider">CÓDIGO DE CLASIFICACIÓN ACTIVO</span>
                      <span className="text-xs font-mono font-bold text-white uppercase">{selectedStandard.toUpperCase()} STANDARD ID</span>
                    </div>
                    <span className={`text-[12px] px-3 py-1.5 rounded font-mono font-black tracking-wide border bg-black/60 ${
                      selectedStandard === 'omniclass' ? 'border-pink-500/30 text-pink-400' :
                      selectedStandard === 'uniclass' ? 'border-sky-500/30 text-sky-400' :
                      selectedStandard === 'uniformat' ? 'border-emerald-500/30 text-emerald-400' :
                      'border-amber-500/30 text-amber-500'
                    }`}>
                      {selectedStandard === 'omniclass' && elementsData[selectedElement].omniClassCode}
                      {selectedStandard === 'uniclass' && elementsData[selectedElement].uniClassCode}
                      {selectedStandard === 'masterformat' && elementsData[selectedElement].masterFormatCode}
                      {selectedStandard === 'uniformat' && elementsData[selectedElement].uniFormatCode}
                    </span>
                  </div>

                  {/* Hierarchical Tree node list */}
                  <div className="space-y-1.5 pl-2.5 border-l border-zinc-700/60 font-sans text-xs">
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Ruta Jerárquica del Código:</span>
                    {(
                      selectedStandard === 'omniclass' ? elementsData[selectedElement].omniClassPath : 
                      selectedStandard === 'uniclass' ? elementsData[selectedElement].uniClassPath : 
                      selectedStandard === 'uniformat' ? elementsData[selectedElement].uniFormatPath :
                      elementsData[selectedElement].masterFormatPath
                    ).map((pathNode, idx, arr) => (
                      <div key={idx} className="flex flex-wrap items-center gap-1.5 text-zinc-300">
                        <span className="text-[9px] font-mono text-zinc-550 shrink-0">Nivel {idx + 1}:</span>
                        <span className={`font-semibold ${
                          idx === arr.length - 1 ? (
                            selectedStandard === 'omniclass' ? 'text-pink-400' :
                            selectedStandard === 'uniclass' ? 'text-sky-450' :
                            selectedStandard === 'uniformat' ? 'text-emerald-450' :
                            'text-amber-450'
                          ) : "text-zinc-300"
                        }`}>
                          {pathNode}
                        </span>
                        {idx !== arr.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-700 shrink-0" />}
                      </div>
                    ))}
                  </div>

                  {/* Explanation text */}
                  <div className="text-xs text-slate-350 leading-relaxed pl-1">
                    📖 <strong>Propósito de Clasificación:</strong> {
                      selectedStandard === 'uniclass' ? elementsData[selectedElement].uniClassExplanation :
                      selectedStandard === 'uniformat' ? elementsData[selectedElement].uniFormatExplanation :
                      selectedStandard === 'omniclass' ? elementsData[selectedElement].omniClassExplanation :
                      elementsData[selectedElement].masterFormatExplanation
                    }
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Special Pedagogic Target Lesson (STUDENT-LED feedback, as requested) */}
            <div className="mt-4 pt-3.5 border-t border-white/5">
              <div className="p-3 bg-pink-500/[0.04] border border-pink-500/25 rounded-xl text-left text-slate-300 font-sans leading-relaxed text-[11px] shadow-inner">
                <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block mb-1">
                  💡 IMPACTO PROFESIONAL (PARA TI COMO ESTUDIANTE / MODELADOR)
                </span>
                <p className="opacity-95 leading-normal">
                  {elementsData[selectedElement].studentFocus}
                </p>
              </div>
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
