import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, User, Star, Briefcase, Award, ArrowRight, CheckCircle2, 
  HelpCircle, Sparkles, RefreshCw, Layers, Shield, FileText, 
  ChevronRight, Info, Heart, BookOpen, AlertTriangle, Key, Network, Flame
} from 'lucide-react';

interface TeamConcept {
  id: string; // "A" | "B" | "C" | "1" | "2" | "3"
  type: "node" | "group";
  label: string;
  englishLabel: string;
  badge: string;
  colorClass: string;
  fillColorClass: string;
  borderColorClass: string;
  accentColor: string;
  mantra: string;
  description: string;
  participants: string;
  keyResponsibilities: string[];
  realWorldExample: string;
  isoReference: string;
}

const CONCEPTS: Record<string, TeamConcept> = {
  A: {
    id: "A",
    type: "node",
    label: "Adjudicador",
    englishLabel: "Appointer / Client",
    badge: "Originador del Proyecto",
    colorClass: "text-[#14b8a6]", // cyan
    fillColorClass: "bg-[#14b8a6]/5",
    borderColorClass: "border-[#14b8a6]/30",
    accentColor: "#14b8a6",
    mantra: "Inicia la necesidad, define los requisitos (EIR) y contrata al Adjudicatario Principal.",
    description: "Es la parte que ordena la ejecución del proyecto o la provisión de servicios (típicamente el Promotor, Cliente, Dueño del activo o la Administración Pública). En la jerga de la ISO 19650, el Adjudicador es quien ostenta la propiedad de la información y lidera la definición de los requisitos contractuales de intercambio (EIR).",
    participants: "Promotor Inmobiliario, Entidades Estatales, Gerencia de Activos, Director de Proyecto Representante del Cliente.",
    keyResponsibilities: [
      "Redactar y difundir el Pliego de Requisitos de Información (EIR) antes de la licitación.",
      "Asegurar la provisión e infraestructura del Entorno Común de Datos (CDE) del proyecto.",
      "Evaluar las capacidades técnicas de los Adjudicatarios Principales pre-seleccionados.",
      "Autorizar las entregas formales e hitos aprobados en el estado 'Publicado' del CDE."
    ],
    realWorldExample: "Un grupo hospitalario público que contrata la ampliación de una sala de emergencias de alta complejidad, emitiendo especificaciones paramétricas obligatorias para el modelo.",
    isoReference: "ISO 19650-2 Cláusula 5.1 / 5.2"
  },
  B: {
    id: "B",
    type: "node",
    label: "Adjudicatario Principal",
    englishLabel: "Lead Appointed Party",
    badge: "Líder de Entrega y Coordinación",
    colorClass: "text-[#38bdf8]", // light blue
    fillColorClass: "bg-[#38bdf8]/5",
    borderColorClass: "border-[#38bdf8]/30",
    accentColor: "#38bdf8",
    mantra: "Firma el contrato directo con A y coordina a todos los sub-especialistas para asegurar la consistencia federal.",
    description: "Es el proveedor principal contratado directamente por el Adjudicador (por ejemplo, el Estudio de Arquitectura Principal, la Constructora General o la Consultora de Ingeniería Líder). Su rol metodológico es de máxima relevancia: actúa como el único enlace técnico ante el cliente y es responsable directo de unificar («federar») las tareas del equipo de entrega.",
    participants: "Estudio de Arquitectura Líder, Empresa Constructora General, Consorcio de Diseño Integral.",
    keyResponsibilities: [
      "Presentar el Plan de Ejecución BIM (BEP/PEP) definitivo post-adjudicación.",
      "Establecer e integrar la matriz de distribución de información (MIDP / TIDP).",
      "Garantizar la coordinación espacial multidisciplinar (Clash Detection) antes de cada hito.",
      "Coordinar y validar técnicamente las sub-entregas de los consultores especialistas."
    ],
    realWorldExample: "La constructora líder del consorcio que responde por toda la ingeniería de detalle y distribuye tareas específicas a subcontratistas hidráulicos, sanitarios y de aire HVAC.",
    isoReference: "ISO 19650-2 Cláusula 5.3"
  },
  C: {
    id: "C",
    type: "node",
    label: "Otros Adjudicatarios",
    englishLabel: "Appointed Parties / Task Members",
    badge: "Especialistas y Generadores de Datos",
    colorClass: "text-[#a855f7]", // purple
    fillColorClass: "bg-[#a855f7]/5",
    borderColorClass: "border-[#a855f7]/30",
    accentColor: "#a855f7",
    mantra: "Especialistas disciplinares que modelan y alimentan el repositorio con información geométrica y paramétrica.",
    description: "Cualquier proveedor o especialista contratado por el Adjudicatario Principal para ejecutar partes específicas del trabajo de diseño o construcción (por ejemplo, ingenieros de estructuras, modeladores de redes MEP o instaladores de sub-sistemas). Producen la información detallada que terminará consolidada en el modelo global.",
    participants: "Diseñador Estructural, Especialista Eléctrico, Diseñador de Redes contra Incendio, Proveedores de Equipos Especializados.",
    keyResponsibilities: [
      "Modelar los componentes propios de su especialidad con apego estricto a las pautas de nomenclatura.",
      "Redactar su propio plan de producción disciplinar de tareas (TIDP).",
      "Resolver interferencias espaciales inmediatas en base a los tiquets BCF enviados por el Coordinador BIM.",
      "Subir y registrar sus entregables en el estado WIP (Trabajo en curso) disciplinar asignado."
    ],
    realWorldExample: "El taller de ingeniería hidráulica subcontratado encargado exclusivamente de proyectar el tendido tridimensional de tuberías y bombas dentro del cuarto de máquinas del sótano.",
    isoReference: "ISO 19650-2 Cláusula 5.4"
  },
  "1": {
    id: "1",
    type: "group",
    label: "Equipo de Proyecto",
    englishLabel: "Project Team",
    badge: "Contenedor Global del Proyecto",
    colorClass: "text-[#ffffff]", // white/slate
    fillColorClass: "bg-white/5",
    borderColorClass: "border-white/20",
    accentColor: "#ffffff",
    mantra: "Toda la red de colaboración integrada para un activo común, unificada bajo el mismo CDE.",
    description: "Es el conjunto total de actores que participan en el ciclo de vida del proyecto constructivo. Abarca al Adjudicador (A), a todos los Adjudicatarios Principales (B) vigentes y a cada uno de sus sub-proveedores o Adjudicatarios (C). Es la organización virtual unificada por la misma plataforma tecnológica y por los mismos estándares comunes acordados.",
    participants: "Absolutamente todas las personas y empresas involucradas que tienen credenciales en la plataforma CDE común.",
    keyResponsibilities: [
      "Co-habitar de manera ordenada el Entorno Común de Datos (CDE).",
      "Acatar el Estándar de Coordinación, Protocolo BIM y directrices legales acordadas en contrato.",
      "Promover la transparencia y la trazabilidad de datos para mitigar imprevistos técnicos en obra.",
      "Alinear la entrega con la visión holística de un modelo final libre de inconsistencias para el mantenimiento."
    ],
    realWorldExample: "El ecosistema completo de la obra: el Ministerio promotor, la constructora general, el estudio de arquitectura, los 8 subcontratistas MEP y la oficina de supervisión técnica.",
    isoReference: "ISO 19650-1 Sección 3.2.1"
  },
  "2": {
    id: "2",
    type: "group",
    label: "Equipo de Entrega",
    englishLabel: "Delivery Team",
    badge: "Consorcio de Trabajo y Resolución",
    colorClass: "text-[#ec4899]", // pink
    fillColorClass: "bg-[#ec4899]/5",
    borderColorClass: "border-[#ec4899]/30",
    accentColor: "#ec4899",
    mantra: "Una célula independiente liderada por un Lead Partner (B) encargado de integrar una fase o disciplina.",
    description: "Es un sub-grupo coordinado de producción de información que opera bajo el liderazgo de un único Adjudicatario Principal (B). Agrupa a dicho actor y a todos los sub-especialistas contratados por él para cumplir un fin de entrega. En proyectos medianos o grandes, es frecuente la co-existencia de múltiples Equipos de Entrega independientes dialogando entre sí.",
    participants: "Un Adjudicatario Principal (B) y su red directa de contratados (C) asociados a una disciplina o fase de obra.",
    keyResponsibilities: [
      "Planificar autónomamente las entregas de su grupo aplicando control local de calidad.",
      "Federar internamente los modelos mecánicos, eléctricos y de plomería antes de enviarlos a revisión externa.",
      "Cumplir con las fechas límite estipuladas en el cronograma maestro de entrega de información (MIDP).",
      "Validar de manera centralizada la inyección paramétrica antes del cambio de etapa WIP a Compartido."
    ],
    realWorldExample: "El Equipo de Entrega MEP (Climatización, Plomería, Electricidad) liderado por una gran empresa instaladora integrando en un modelo el avance de 4 talleres disciplinares.",
    isoReference: "ISO 19650-1 Sección 3.2.2"
  },
  "3": {
    id: "3",
    type: "group",
    label: "Equipo de Tareas",
    englishLabel: "Task Team",
    badge: "Foco Disciplinar",
    colorClass: "text-[#fbbf24]", // yellow/amber
    fillColorClass: "bg-[#fbbf24]/5",
    borderColorClass: "border-[#fbbf24]/30",
    accentColor: "#fbbf24",
    mantra: "La célula de modelado pura que ejecuta la inyección directa de geometría y parámetros.",
    description: "Es el nivel de ejecución específico. Representa a una micro-organización, taller, oficina de diseño o equipo interno especializado que genera una parte única y bien definida de un modelo o conjunto de planos documentales (por ejemplo, el equipo de ingenieros estructurales modelando armaduras de acero).",
    participants: "Ingenieros especialistas, arquitectos sectoriales, dibujantes técnicos y modeladores dedicados a un elemento.",
    keyResponsibilities: [
      "Garantizar la precisión local geométrica y matemática de los entregables individuales asignados.",
      "Producir, autolimpiares de advertencias internas y estructurar el TIDP específico.",
      "Mantener la comunicación fluida inmediata a nivel de micro-coordinación con los analistas de choque.",
      "Exportar en formato IFC y cargar los archivos en el repositorio local WIP según la nomenclatura estándar."
    ],
    realWorldExample: "El taller de estructuras de la empresa de ingeniería encargado de diseñar el cálculo estructural de fundaciones de pilotes mecánicos y pedestales.",
    isoReference: "ISO 19650-1 Sección 3.2.3"
  }
};

export const EquiposBimSlide = () => {
  const [activeId, setActiveId] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<"detail" | "summary">("detail");
  const [showIntroduction, setShowIntroduction] = useState<boolean>(true);

  const activeConcept = CONCEPTS[activeId];

  return (
    <div className="relative h-full w-full bg-artis-black text-white p-6 md:p-12 overflow-y-auto flex flex-col justify-between">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 immersive-grid opacity-15 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {showIntroduction ? (
          /* INTRODUCTION WELCOME SCREEN */
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 flex flex-col justify-center max-w-4xl mx-auto space-y-6 text-left relative z-10"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#38bdf8] font-mono text-[9px] uppercase tracking-[0.4em] font-black">
                  CLASE 4: ADMINISTRACIÓN DE RECURSOS
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black italic tracking-wide uppercase font-mono text-white leading-tight">
                Los Equipos de Trabajo <span className="text-artis-orange">BIM</span> en la ISO 19650
              </h1>
              <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed max-w-3xl">
                BIM no es simplemente adquirir un software de modelado tridimensional. Representa un cambio profundo de <strong className="text-white">estratificación relacional y contractual</strong> en los proyectos de ingeniería y arquitectura. Esta sesión profundiza en la estructura operativa estipulada por la norma internacional <strong>ISO 19650-2</strong>, definiendo cómo interactúan el Adjudicador, los Adjudicatarios Generales y los Especialistas bajo un marco común.
              </p>
            </div>

            {/* Structured Card Grid showing quick highlights of the class */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-[#040810]/85 border border-[#14b8a6]/20 rounded-md flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded bg-[#14b8a6]/10 text-[#14b8a6] flex items-center justify-center font-mono font-black border border-[#14b8a6]/20">
                    A
                  </div>
                  <span className="text-[8px] font-mono font-bold text-[#14b8a6] bg-[#14b8a6]/5 px-2 py-0.5 rounded uppercase">Estratégico</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-white tracking-wide uppercase">Gobernanza Contratante</h4>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Cómo el Adjudicador (Cliente) estipula las reglas presupuestales de intercambio (EIR) desde las primeras etapas.</p>
                </div>
              </div>

              <div className="p-4 bg-[#040810]/85 border border-[#38bdf8]/20 rounded-md flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center font-mono font-black border border-[#38bdf8]/20">
                    B
                  </div>
                  <span className="text-[8px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/5 px-2 py-0.5 rounded uppercase">Integrador</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-white tracking-wide uppercase">Consolidación Federada</h4>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">El rol crítico del Adjudicatario Principal como puente técnico y de compliance de toda la red de subcontratistas.</p>
                </div>
              </div>

              <div className="p-4 bg-[#040810]/85 border border-[#a855f7]/20 rounded-md flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded bg-[#a855f7]/10 text-[#a855f7] flex items-center justify-center font-mono font-black border border-[#a855f7]/20">
                    C
                  </div>
                  <span className="text-[8px] font-mono font-bold text-[#a855f7] bg-[#a855f7]/5 px-2 py-0.5 rounded uppercase">Operativo</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-white tracking-wide uppercase">Células de Tareas</h4>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Sistemas dinámicos de producción donde los equipos de tareas generan la inyección de metadatos precisos.</p>
                </div>
              </div>
            </div>

            {/* Prompt Action bar to enter interface */}
            <div className="pt-4 flex justify-start">
              <button 
                onClick={() => setShowIntroduction(false)}
                className="px-6 py-2.5 bg-artis-orange text-artis-black hover:bg-white hover:text-artis-black font-mono font-black text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(255,164,0,0.35)] flex items-center gap-2 group-hover:scale-105 active:scale-95"
              >
                <span>Acceder a la Estructura Organizativa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* WORKSPACE MAIN INTERACTIVE DIAGRAM SECTION */
          <motion.div 
            key="interactive"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 flex flex-col space-y-6 text-left relative z-10"
          >
            {/* Header with back button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[#38bdf8] font-mono text-[8.5px] uppercase tracking-[0.4em] font-black">
                    Clase 4: Introducción / Equipos de Trabajo BIM (ISO 19650-2 Fig 2)
                  </span>
                  <div className="w-1.5 h-1.5 rounded bg-emerald-400 animate-pulse" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase italic font-mono">
                  Interactividad de los <span className="text-artis-orange">Equipos de Trabajo</span>
                </h2>
              </div>

              <button 
                onClick={() => setShowIntroduction(true)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-mono text-[9px] rounded uppercase border border-white/10 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Volver a Portada</span>
              </button>
            </div>

            {/* Quick Helper Banner */}
            <div className="bg-[#0b101c] border border-[#38bdf8]/10 p-3 rounded flex gap-2.5 items-center justify-start text-[10px] leading-relaxed select-none">
              <Sparkles className="w-4 h-4 text-artis-orange shrink-0 animate-bounce" />
              <p className="text-slate-300 font-sans">
                <strong className="text-white">Instrucción:</strong> En la sección izquierda se despliega el mapa relacional ISO oficial. Haz <strong className="text-[#38bdf8]">clic en los nodos (A, B, C)</strong> o en las <strong className="text-pink-400">áreas concéntricas (1, 2, 3)</strong> para profundizar en la estructura organizativa de los equipos.
              </p>
            </div>

            {/* Horizontal tab selection for mobile/easy view */}
            <div className="flex flex-wrap gap-1.5 font-mono">
              <div className="w-full sm:w-auto text-[7.5px] font-black uppercase text-slate-500 flex items-center mr-2 self-center tracking-wider px-1">
                Jerarquía de Actores (Nodos):
              </div>
              {["A", "B", "C"].map((key) => {
                const item = CONCEPTS[key];
                const isActive = activeId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveId(key)}
                    className={`px-3 py-1 text-[9px] font-black rounded-sm border uppercase transition-all cursor-pointer ${
                      isActive 
                        ? `border-${item.id} text-white` 
                        : "bg-white/2 border-white/5 text-slate-400 hover:text-[#38bdf8]"
                    }`}
                    style={{
                      borderColor: isActive ? item.accentColor : undefined,
                      backgroundColor: isActive ? `${item.accentColor}18` : undefined
                    }}
                  >
                    🚀 {key}. {item.label}
                  </button>
                );
              })}

              <div className="w-full sm:w-auto text-[7.5px] font-black uppercase text-slate-500 flex items-center mx-2 self-center tracking-wider px-1">
                Estructuras de Grupos:
              </div>
              {["1", "2", "3"].map((key) => {
                const item = CONCEPTS[key];
                const isActive = activeId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveId(key)}
                    className={`px-3 py-1 text-[9px] font-black rounded-sm border uppercase transition-all cursor-pointer ${
                      isActive 
                        ? `border-${item.id} text-white` 
                        : "bg-white/2 border-white/5 text-slate-400 hover:text-zinc-200"
                    }`}
                    style={{
                      borderColor: isActive ? item.accentColor : undefined,
                      backgroundColor: isActive ? `${item.accentColor}15` : undefined
                    }}
                  >
                    📦 {key}. {item.label}
                  </button>
                );
              })}
            </div>

            {/* Main grid splitter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Interactive SVG Map (Col-span 6/12) */}
              <div className="lg:col-span-6 bg-[#03060d]/90 border border-white/5 rounded-xl p-5 shadow-lg relative flex flex-col justify-center items-center min-h-[380px] sm:min-h-[440px] select-none">
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[7px] text-slate-500 font-mono tracking-widest uppercase">
                  <Network className="w-3.5 h-3.5" />
                  <span>Interactive Map - ISO 19650-2 Fig 2</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 text-[7px] text-[#fbbf24] bg-[#fbbf24]/5 border border-[#fbbf24]/20 px-1.5 py-0.5 font-mono rounded">
                  <span>Módulo de Simulación Activo</span>
                </div>

                {/* SVG RENDERING OF ISO DIAGRAM */}
                <svg className="w-full max-w-[420px] aspect-square transition-all duration-300" viewBox="0 0 100 100">
                  <g transform="translate(50, 50)">
                    {/* Big Group: 1. EQUIPO DE PROYECTO (Outer circle) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("1"); }}
                      className="cursor-pointer group"
                    >
                      <circle 
                        cx="0" cy="0" r="46" 
                        fill="rgba(255,255,255,0.01)" 
                        stroke={activeId === "1" ? "#ffffff" : "rgba(255,255,255,0.15)"}
                        strokeWidth={activeId === "1" ? "1.6" : "0.7"} 
                        strokeDasharray={activeId === "1" ? "" : "3 2"} 
                        className="transition-all duration-300"
                      />
                      {/* Interactive hover halo */}
                      <circle 
                        cx="0" cy="0" r="48" 
                        fill="transparent" 
                        stroke={activeId === "1" ? "rgba(255,255,255,0.08)" : "transparent"} 
                        strokeWidth="3.5"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Delivery Teams Area (Shaded lobes / Group 2) */}
                    {/* Lobe Left */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("2"); }}
                      className="cursor-pointer group"
                    >
                      <ellipse 
                        cx="-16" cy="-10" rx="18" ry="24" 
                        transform="rotate(-25 -16 -10)"
                        fill="rgba(236,72,153, 0.03)" 
                        stroke={activeId === "2" ? "#ec4899" : "rgba(236,72,153, 0.15)"} 
                        strokeWidth={activeId === "2" ? "1.8" : "0.7"}
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Lobe Right */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("2"); }}
                      className="cursor-pointer group"
                    >
                      <ellipse 
                        cx="22" cy="-14" rx="20" ry="21" 
                        transform="rotate(35 22 -14)"
                        fill="rgba(236,72,153, 0.03)" 
                        stroke={activeId === "2" ? "#ec4899" : "rgba(236,72,153, 0.12)"} 
                        strokeWidth={activeId === "2" ? "1.8" : "0.7"}
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Lobe Bottom */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("2"); }}
                      className="cursor-pointer group"
                    >
                      <ellipse 
                        cx="5" cy="24" rx="19" ry="20" 
                        transform="rotate(-5 5 24)"
                        fill="rgba(236,72,153, 0.03)" 
                        stroke={activeId === "2" ? "#ec4899" : "rgba(236,72,153, 0.12)"} 
                        strokeWidth={activeId === "2" ? "1.8" : "0.7"}
                        className="transition-all duration-300"
                      />
                    </g>


                    {/* Group 3: Equipos de Tarea (micro rings inside) */}
                    {/* Ring for C1-Left */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("3"); }} 
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="-22" cy="-21" r="10" 
                        fill="rgba(251,191,36,0.02)" 
                        stroke={activeId === "3" ? "#fbbf24" : "rgba(251,191,36,0.12)"} 
                        strokeWidth={activeId === "3" ? "1.6" : "0.6"} 
                        strokeDasharray="2 1"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Ring for C2-Right-A */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("3"); }} 
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="28" cy="-26" r="9" 
                        fill="rgba(251,191,36,0.02)" 
                        stroke={activeId === "3" ? "#fbbf24" : "rgba(251,191,36,0.12)"} 
                        strokeWidth={activeId === "3" ? "1.6" : "0.6"} 
                        strokeDasharray="2 1"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Ring for C2-Right-B */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("3"); }} 
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="38" cy="-12" r="8" 
                        fill="rgba(251,191,36,0.02)" 
                        stroke={activeId === "3" ? "#fbbf24" : "rgba(251,191,36,0.12)"} 
                        strokeWidth={activeId === "3" ? "1.6" : "0.6"} 
                        strokeDasharray="2 1"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Ring for C3-Bottom */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("3"); }} 
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="8" cy="30" r="10" 
                        fill="rgba(251,191,36,0.02)" 
                        stroke={activeId === "3" ? "#fbbf24" : "rgba(251,191,36,0.12)"} 
                        strokeWidth={activeId === "3" ? "1.6" : "0.6"} 
                        strokeDasharray="2 1"
                        className="transition-all duration-300"
                      />
                    </g>


                    {/* CONNECTIVE ARROWS AND CORRESPONDENCE LINES */}
                    {/* Cyan center relationships (A to B's) */}
                    <g stroke="rgba(20,184,166,0.4)" strokeWidth="1" strokeDasharray="3 3">
                      <line x1="0" y1="0" x2="-14" y2="-6" />
                      <line x1="0" y1="0" x2="16" y2="-9" />
                      <line x1="0" y1="0" x2="3" y2="13" />
                    </g>

                    {/* Double-headed client arrows (Central B's mapping to C's) */}
                    <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.8">
                      {/* Left Block: B1 to C's */}
                      <line x1="-14" y1="-6" x2="-22" y2="-21" />
                      <line x1="-14" y1="-6" x2="-28" y2="-1" strokeDasharray="1.5 1.5" />
                      {/* Right Block: B2 to C's */}
                      <line x1="16" y1="-9" x2="28" y2="-26" />
                      <line x1="16" y1="-9" x2="38" y2="-12" />
                      {/* Bottom Block B3 to C3 */}
                      <line x1="3" y1="13" x2="8" y2="30" />
                    </g>

                    {/* Dashed outer team ring connecting B nodes (Representing delivery network interface) */}
                    <circle 
                      cx="0" cy="-2" r="17" 
                      fill="transparent" 
                      stroke="rgba(255,255,255,0.12)" 
                      strokeWidth="1" 
                      strokeDasharray="4 4"
                    />

                    {/* NODES GENERATION */}

                    {/* Center Node: A (Adjudicador) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("A"); }}
                      className="cursor-pointer group"
                    >
                      <circle 
                        cx="0" cy="0" r="6" 
                        fill="#0b2420" 
                        stroke={activeId === "A" ? "#14b8a6" : "rgba(20,184,166,0.7)"} 
                        strokeWidth={activeId === "A" ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                      {/* Pulsing ring around active node A */}
                      {activeId === "A" && (
                        <circle cx="0" cy="0" r="9" fill="none" stroke="#14b8a6" strokeWidth="0.5" className="animate-ping" style={{ transformOrigin: "0 0" }} />
                      )}
                      <text x="0" y="2" fill="#14b8a6" fontSize="5.5px" fontWeight="black" textAnchor="middle" className="font-mono">A</text>
                    </g>

                    {/* Left Lead Appointed Party (B) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("B"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="-14" cy="-6" r="5" 
                        fill="#051928" 
                        stroke={activeId === "B" ? "#38bdf8" : "rgba(56,189,248,0.7)"} 
                        strokeWidth={activeId === "B" ? "2" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="-14" y="-4" fill="#38bdf8" fontSize="4.5px" fontWeight="black" textAnchor="middle" className="font-mono">B</text>
                    </g>

                    {/* Right Lead Appointed Party (B) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("B"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="16" cy="-9" r="5" 
                        fill="#051928" 
                        stroke={activeId === "B" ? "#38bdf8" : "rgba(56,189,248,0.7)"} 
                        strokeWidth={activeId === "B" ? "2" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="16" y="-7" fill="#38bdf8" fontSize="4.5px" fontWeight="black" textAnchor="middle" className="font-mono">B</text>
                    </g>

                    {/* Bottom Lead Appointed Party (B) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("B"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="3" cy="13" r="5" 
                        fill="#051928" 
                        stroke={activeId === "B" ? "#38bdf8" : "rgba(56,189,248,0.7)"} 
                        strokeWidth={activeId === "B" ? "2" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="3" y="15" fill="#38bdf8" fontSize="4.5px" fontWeight="black" textAnchor="middle" className="font-mono">B</text>
                    </g>


                    {/* Other Appointed Parties (C - Specialists) */}
                    {/* C1 (Top-Left) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("C"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="-22" cy="-21" r="4.5" 
                        fill="#160824" 
                        stroke={activeId === "C" ? "#a855f7" : "rgba(168,85,247,0.7)"} 
                        strokeWidth={activeId === "C" ? "1.8" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="-22" y="-19.2" fill="#a855f7" fontSize="4px" fontWeight="black" textAnchor="middle" className="font-mono">C</text>
                    </g>

                    {/* C2 (Far-Left-Middle) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("C"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="-28" cy="-1" r="4" 
                        fill="#160824" 
                        stroke={activeId === "C" ? "#a855f7" : "rgba(168,85,247,0.5)"} 
                        strokeWidth={activeId === "C" ? "1.5" : "0.8"}
                        className="transition-all duration-300"
                      />
                      <text x="-28" y="0.5" fill="#a855f7" fontSize="3.5px" fontWeight="black" textAnchor="middle" className="font-mono">...</text>
                    </g>

                    {/* C3 (Top-Right) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("C"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="28" cy="-26" r="4.5" 
                        fill="#160824" 
                        stroke={activeId === "C" ? "#a855f7" : "rgba(168,85,247,0.7)"} 
                        strokeWidth={activeId === "C" ? "1.8" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="28" y="-24.2" fill="#a855f7" fontSize="4px" fontWeight="black" textAnchor="middle" className="font-mono">C</text>
                    </g>

                    {/* C4 (Middle-Right) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("C"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="38" cy="-12" r="4.5" 
                        fill="#160824" 
                        stroke={activeId === "C" ? "#a855f7" : "rgba(168,85,247,0.7)"} 
                        strokeWidth={activeId === "C" ? "1.8" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="38" y="-10.2" fill="#a855f7" fontSize="4px" fontWeight="black" textAnchor="middle" className="font-mono">C</text>
                    </g>

                    {/* C5 (Bottom) */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); setActiveId("C"); }}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx="8" cy="30" r="4.5" 
                        fill="#160824" 
                        stroke={activeId === "C" ? "#a855f7" : "rgba(168,85,247,0.7)"} 
                        strokeWidth={activeId === "C" ? "1.8" : "1"}
                        className="transition-all duration-300"
                      />
                      <text x="8" y="31.8" fill="#a855f7" fontSize="4px" fontWeight="black" textAnchor="middle" className="font-mono">C</text>
                    </g>

                  </g>
                </svg>

                {/* Map quick annotations */}
                <div className="w-full flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-3 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-[#14b8a6]" />
                    <span>A: Adjudicador</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-[#38bdf8]" />
                    <span>B: Adjudicatario Principal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-[#a855f7]" />
                    <span>C: Especialistas</span>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center text-[8.5px] font-mono text-slate-500 pt-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 border border-white opacity-40 inline-block" />
                    <span>1: Eq. Proyecto</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 border border-[#ec4899] opacity-45 inline-block" />
                    <span>2: Eq. Entrega</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 border border-[#fbbf24] opacity-45 inline-block" />
                    <span>3: Eq. Tareas</span>
                  </div>
                </div>

              </div>

              {/* Right Column: High Fidelity Information Board (Col-span 6/12) */}
              <div 
                className={`lg:col-span-6 bg-[#040810]/95 border rounded-xl p-5 md:p-6 shadow-xl relative min-h-[440px] flex flex-col justify-between transition-all duration-300`}
                style={{ borderColor: `${activeConcept.accentColor}30` }}
              >
                
                {/* Board header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-white/5 pb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-7 h-7 rounded flex items-center justify-center font-mono font-black text-xs border"
                          style={{ 
                            backgroundColor: `${activeConcept.accentColor}12`, 
                            borderColor: `${activeConcept.accentColor}35`,
                            color: activeConcept.accentColor 
                          }}
                        >
                          {activeConcept.id}
                        </span>
                        <div>
                          <span className={`text-[8.5px] font-black font-mono uppercase tracking-wider block ${activeConcept.colorClass}`}>
                            {activeConcept.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-tight mt-0.5">
                            {activeConcept.label}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[8px] text-slate-500">
                      <span>REF ESTÁNDAR:</span>
                      <span className="text-white block font-bold">{activeConcept.isoReference}</span>
                    </div>
                  </div>

                  {/* Mantra */}
                  <div className="p-3 bg-[#080d19]/90 border-l-2 rounded-r flex items-start gap-2.5" style={{ borderColor: activeConcept.accentColor }}>
                    <Flame className="w-4 h-4 text-artis-orange shrink-0 mt-0.5" />
                    <p className="text-[10px] sm:text-[10.5px] text-slate-300 font-mono font-bold leading-relaxed italic">
                      &ldquo;{activeConcept.mantra}&rdquo;
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase text-slate-500 font-mono tracking-widest block">
                      Definición Metodológica:
                    </span>
                    <p className="text-[11px] sm:text-[12px] text-slate-300 leading-normal font-sans">
                      {activeConcept.description}
                    </p>
                  </div>

                  {/* Participants / Who is it? */}
                  <div className="bg-[#060b13] p-3 rounded border border-white/5 space-y-1 select-none">
                    <span className="text-[7.5px] font-mono font-black uppercase tracking-widest text-[#fbbf24] block leading-none">
                      👤 Actores / Empresas habituales:
                    </span>
                    <p className="text-[10.5px] text-white font-mono font-semibold tracking-wide">
                      {activeConcept.participants}
                    </p>
                  </div>

                  {/* Responsabilidades Clave */}
                  <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase text-slate-500 font-mono tracking-widest block">
                      Responsabilidades Críticas (ISO 19650):
                    </span>
                    <div className="grid grid-cols-1 gap-1.5 font-sans">
                      {activeConcept.keyResponsibilities.map((resp, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-[10.5px] leading-relaxed text-slate-300 bg-white/2 p-2 rounded-sm border border-white/2">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-artis-orange" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real World Example box */}
                <div className="bg-white/2 border border-white/5 p-3 rounded-md text-[10px] leading-relaxed mt-4">
                  <strong className="text-[#38bdf8] font-mono uppercase tracking-widest text-[8px] block mb-1">
                    Ejemplo en el mundo real:
                  </strong>
                  <p className="text-slate-300 font-sans">
                    {activeConcept.realWorldExample}
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide ISO integration note (Small margin spacing at very bottom) */}
      <div className="relative mt-6 pt-3 border-t border-white/5 flex justify-between items-center text-[7.5px] font-mono text-slate-500 tracking-wider uppercase select-none">
        <span>Artis Business School © BIM Management</span>
        <div className="flex gap-4">
          <span>Clase 4: Introducción</span>
          <span className="text-white">Cláusula 1.3 / Estructura de Proyectos</span>
        </div>
      </div>
    </div>
  );
};
