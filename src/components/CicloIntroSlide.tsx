import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Database, Shield, FileText, ArrowRight, Info, CheckCircle2, 
  HelpCircle, Sparkles, RefreshCw, Layers, Zap, ClipboardList, Settings, Lock
} from 'lucide-react';

interface DetailItem {
  id: string; // "organizacion", "activo", "informacion", "nodeA", "nodeB", "nodeC", "puzzleLock"
  type: 'layer' | 'node' | 'special';
  title: string;
  subtitle: string;
  example: string;
  badgeText: string;
  textColorClass: string;
  borderColorClass: string;
  bgLightClass: string;
  description: string;
  keyAspects: string[];
}

const DETAIL_ITEMS: Record<string, DetailItem> = {
  organizacion: {
    id: "organizacion",
    type: "layer",
    title: "Gestión de la Organización",
    subtitle: "Marco Estratégico de Calidad Global",
    example: "Por ejemplo: ISO 9001 (Sistemas de Gestión de Calidad)",
    badgeText: "Capa Externa - Organización",
    textColorClass: "text-amber-400",
    borderColorClass: "border-amber-500/30",
    bgLightClass: "bg-amber-500/5",
    description: "La capa más externa y fundamental. Gobierna la visión a largo plazo, las políticas comerciales, financieras y comerciales sostenibles de la corporación. Sienta las bases de calidad global bajo las cuales operan todos los proyectos y activos físicos de la empresa.",
    keyAspects: [
      "Define los objetivos estratégicos y comerciales de alto nivel",
      "Sistemas de gestión de calidad aplicados a todas las divisiones",
      "Control de procesos y auditorías corporativas globales"
    ]
  },
  activo: {
    id: "activo",
    type: "layer",
    title: "Gestión del Activo y del Proyecto",
    subtitle: "Gobernanza Física de la Infraestructura",
    example: "Por ejemplo: ISO 55000 (Activos) e ISO 21500 (Proyectos)",
    badgeText: "Capa Media - Gestión Física",
    textColorClass: "text-yellow-400",
    borderColorClass: "border-yellow-400/30",
    bgLightClass: "bg-yellow-400/5",
    description: "Determina cómo la organización planifica, financia, ejecuta y mantiene sus activos tangibles reales (edificios, carreteras, plantas) en concordancia con un estándar sólido de dirección de proyectos. Es la capa táctica.",
    keyAspects: [
      "Optimización de costos del ciclo de vida total del activo (CAPEX a OPEX)",
      "Políticas de confiabilidad, mantenimiento preventivo y de operación",
      "Dirección técnica y financiera de proyectos de infraestructura"
    ]
  },
  informacion: {
    id: "informacion",
    type: "layer",
    title: "Gestión de la Información",
    subtitle: "Metodología de Trabajo y Gobernanza Digital (BIM)",
    example: "Por ejemplo: ISO 19650 (Gobernanza de Datos)",
    badgeText: "Capa Interna - Hub de Datos",
    textColorClass: "text-sky-400",
    borderColorClass: "border-sky-500/30",
    bgLightClass: "bg-sky-500/5",
    description: "El núcleo digital. Gobierna la creación, intercambio, federación y preservación limpia de los datos numéricos y geométricos de la edificación. Asegura un lenguaje común que de soporte lógico tanto al proyecto como al activo físico.",
    keyAspects: [
      "Estructuración del Entorno Común de Datos (CDE)",
      "Adonación de formatos de modelado e intercambio abiertos (openBIM, IFC)",
      "Definición y control de flujos de aprobación de datos"
    ]
  },
  nodeA: {
    id: "nodeA",
    type: "node",
    title: "A. Inicio y Requisitos de Información",
    subtitle: "Fase de Entrega (PIM) - Establecer los Mandatos",
    example: "Traducción Contractual: Hito inicial para licitación (EIR)",
    badgeText: "Hito de Acople Inicial",
    textColorClass: "text-sky-400",
    borderColorClass: "border-sky-500/30",
    bgLightClass: "bg-sky-500/5",
    description: "Se ubica en el primer enclavamiento del rompecabezas. Aquí el cliente final define con absoluta claridad sus metas operativas, determinando exactamente qué información necesitará recibir antes de que empiece a construirse nada.",
    keyAspects: [
      "Definición técnica del EIR (Exchange Information Requirements)",
      "Especificación técnica del CDE y protocolos de entrega",
      "Planificación del retorno de inversión en base a la captura útil de datos"
    ]
  },
  nodeB: {
    id: "nodeB",
    type: "node",
    title: "B. Desarrollo del Modelo Digital",
    subtitle: "Fase de Entrega (PIM) - Diseño y Construcción",
    example: "Traducción Contractual: Producción del PIM (Project Information Model)",
    badgeText: "Hito de Desarrollo",
    textColorClass: "text-pink-400",
    borderColorClass: "border-pink-500/30",
    bgLightClass: "bg-pink-500/5",
    description: "El consorcio adjudicado modela en 3D, simula la planificación temporal en 4D y computa los presupuestos en 5D. Es el periodo de máxima producción e ingeniería colaborativa.",
    keyAspects: [
      "Modelado federado multidisciplinar libre de colisiones",
      "Auditorías automatizadas de consistencia de datos",
      "Optimización constructiva simulada antes de la obra real"
    ]
  },
  nodeC: {
    id: "nodeC",
    type: "node",
    title: "C. Traspaso y Recepción Operativa",
    subtitle: "Fase de Operación (AIM) - Conexión al Negocio",
    example: "Traducción Contractual: Transferencia Limpia de Datos para FM (PIM a AIM)",
    badgeText: "Hito de Acople Operativo",
    textColorClass: "text-emerald-400",
    borderColorClass: "border-emerald-500/30",
    bgLightClass: "bg-emerald-500/5",
    description: "El segundo acople clave. El modelo digital de entrega (PIM) se purga del ruido de construcción y se convierte en el modelo de información del activo (AIM), alimentando directamente el Facility Management, los GMAO y sensores.",
    keyAspects: [
      "Entrega unificada sin pérdidas de datos (COBie / openBIM)",
      "Interconexión con sistemas ERP, GMAO o gemelos digitales vivos",
      "Puesta en marcha del mantenimiento predictivo del activo real"
    ]
  },
  puzzleLock: {
    id: "puzzleLock",
    type: "special",
    title: "La Ficha Rompecabezas PIM ⇆ AIM",
    subtitle: "El Enclave Mecánico del Flujo de Datos ISO 19650",
    example: "Hito Conceptualmente Crítico: Acoplamiento Hermético (Machihembrado)",
    badgeText: "Concepto Central ISO 19650",
    textColorClass: "text-pink-500",
    borderColorClass: "border-pink-500/40",
    bgLightClass: "bg-pink-500/5",
    description: "En el estándar ISO 19650, la frontera entre la Fase de Proyecto (PIM) y la Fase de Operación (AIM) no se representa con una línea recta o divisoria plana; tiene forma de fichas de rompecabezas en los extremos. Esto simboliza un acoplamiento mecánico indisoluble: la fase de operación dicta cómo debe nacer el proyecto (Hito A), y el proyecto entrega los datos limpios para que encajen exactamente en la operación (Hito C). Ignorar este acople destruye el valor de la información en el handover.",
    keyAspects: [
      "Evita el clásico 'Abismo de Datos' (Pérdida al entregar la obra física)",
      "Obliga al contratista a estructurar los modelos para el usuario final",
      "Garantiza un ciclo infinito y autoalimentado del dato BIM"
    ]
  }
};

export const CicloIntroSlide = () => {
  const [selectedId, setSelectedId] = useState<string>("puzzleLock");
  const currentItem = DETAIL_ITEMS[selectedId] || DETAIL_ITEMS.puzzleLock;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10 font-sans"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div>
          <span className="text-pink-500 font-mono text-[9px] uppercase tracking-[0.4em] font-black">Clase 2: Introducción al Ciclo</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1 italic">
            El Ciclo de la Información <span className="text-white">ISO 19650</span>
          </h2>
          <p className="text-slate-400 text-xs">
            La gestión de datos BIM no es un silo técnico aislado; reside dentro de las capas de control de activos y gobernanza corporativa.
          </p>
        </div>
        <div className="bg-artis-black px-4 py-2 border border-white/5 rounded-full flex items-center gap-3 shrink-0">
          <RefreshCw className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">Bucle Metodológico v1.8</span>
        </div>
      </div>

      {/* Main Unified Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 items-stretch">
        
        {/* Left Side: Consolidated Interactive Graphic (7 columns) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-panel p-5 rounded-sm border border-white/10 bg-[#070b13] relative overflow-hidden shadow-2xl flex-1 flex flex-col justify-between min-h-[490px]">
            {/* Background decorative layout */}
            <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

            <div className="w-full flex items-center justify-between mb-4 relative z-10">
              <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest uppercase">
                ⚙️ DIAGRAMA INTEGRADO CONCÉNTRICO DE GOBERNANZA
              </span>
              <span className="text-[8.5px] font-black font-mono text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-xs">
                INTERACTIVO
              </span>
            </div>

            {/* The High-fidelity Interactive SVG */}
            <div className="relative w-full flex-1 flex items-center justify-center select-none py-1 h-[400px]">
              <svg 
                viewBox="0 0 500 500" 
                className="w-full h-full max-h-[380px] overflow-visible"
              >
                {/* SVG Definitions for Glows & Gradients */}
                <defs>
                  <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. OUTER RING: Gestión de la Organización (ISO 9001) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("organizacion")}
                >
                  <rect 
                    x="15" y="15" width="470" height="470" rx="55"
                    fill="rgba(245,158,11,0.015)" 
                    stroke={selectedId === "organizacion" ? "#fb923c" : "#b45309"}
                    strokeWidth={selectedId === "organizacion" ? "8" : "4.5"}
                    strokeDasharray={selectedId === "organizacion" ? "none" : "8, 3"}
                    className="transition-all duration-300 group-hover:fill-amber-500/5"
                    style={{ filter: selectedId === "organizacion" ? "url(#glow-orange)" : "none" }}
                  />
                  {/* Top Text label inside Orange block */}
                  <text 
                    x="250" y="38" 
                    textAnchor="middle" 
                    fill="#fdba74" 
                    className="text-[12.5px] font-black tracking-[0.25em] pointer-events-none uppercase font-sans"
                  >
                    GESTIÓN DE LA ORGANIZACIÓN
                  </text>
                  {/* Bottom Text label inside Orange block */}
                  <text 
                    x="250" y="468" 
                    textAnchor="middle" 
                    fill="#fb923c" 
                    className="text-[10px] font-bold tracking-[0.15em] pointer-events-none uppercase font-mono"
                  >
                    Por ejemplo ISO 9001 (Calidad Corporativa)
                  </text>
                </g>

                {/* 2. MIDDLE RING: Gestión del Activo y del Proyecto (ISO 55000 / 21500) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("activo")}
                >
                  <rect 
                    x="50" y="50" width="400" height="400" rx="42"
                    fill="rgba(250,204,21,0.015)" 
                    stroke={selectedId === "activo" ? "#facc15" : "#a16207"}
                    strokeWidth={selectedId === "activo" ? "7" : "3.5"}
                    strokeDasharray={selectedId === "activo" ? "none" : "6, 2"}
                    className="transition-all duration-300 group-hover:fill-yellow-500/5"
                    style={{ filter: selectedId === "activo" ? "url(#glow-yellow)" : "none" }}
                  />
                  {/* Top Text label inside Yellow block */}
                  <text 
                    x="250" y="70" 
                    textAnchor="middle" 
                    fill="#fef08a" 
                    className="text-[10.5px] font-black tracking-[0.2em] pointer-events-none uppercase font-sans"
                  >
                    GESTIÓN DEL ACTIVO Y DEL PROYECTO
                  </text>
                  {/* Bottom Text label inside Yellow block */}
                  <text 
                    x="250" y="433" 
                    textAnchor="middle" 
                    fill="#facc15" 
                    className="text-[8.5px] font-bold tracking-[0.12em] pointer-events-none uppercase font-mono"
                  >
                    Por ejemplo ISO 55000 e ISO 21500
                  </text>
                </g>

                {/* 3. INNER RING: Gestión de la Información (ISO 19650) */}
                {/* Thick Blue boundaries that encapsulate the cycle inside */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("informacion")}
                >
                  <rect 
                    x="85" y="85" width="330" height="330" rx="30"
                    fill="#030712" 
                    stroke={selectedId === "informacion" ? "#38bdf8" : "#1d4ed8"}
                    strokeWidth={selectedId === "informacion" ? "10" : "7.5"}
                    className="transition-all duration-300 group-hover:stroke-blue-500"
                    style={{ filter: selectedId === "informacion" ? "url(#glow-blue)" : "none" }}
                  />
                  {/* Top Text label inside Blue block */}
                  <text 
                    x="250" y="105" 
                    textAnchor="middle" 
                    fill="#e0f2fe" 
                    className="text-[10px] font-black tracking-[0.18em] pointer-events-none uppercase font-sans"
                  >
                    GESTIÓN DE LA INFORMACIÓN
                  </text>
                  {/* Bottom Text label inside Blue block */}
                  <text 
                    x="250" y="401" 
                    textAnchor="middle" 
                    fill="#38bdf8" 
                    className="text-[9px] font-black tracking-[0.15em] pointer-events-none uppercase font-mono"
                  >
                    Por ejemplo ISO 19650
                  </text>
                </g>

                {/* === CYCLICAL AND PARTITION CONTENT INSIDE GESTIÓN DE LA INFORMACIÓN === */}
                {/* Pink Shading for PIM (top-left) inside information block */}
                <path 
                  d="M 92,250 A 8,8 0 0,1 100,242 H 130 C 130 275, 120 290, 145 290 C 170 290, 160 275, 160 250 H 250 V 170 C 275 170, 290 160, 290 185 C 290 210, 275 200, 250 200 V 92 A 8,8 0 0,1 242,100 H 100 A 8,8 0 0,1 92,92 Z" 
                  fill="rgba(222,27,125,0.04)" 
                  className="pointer-events-none"
                />

                {/* Emerald Shading for AIM (bottom-right) inside information block */}
                <path 
                  d="M 408,250 A 8,8 0 0,1 400,258 H 160 C 160 275, 170 290, 145 290 C 120 290, 130 275, 130 250 H 92 V 400 A 8,8 0 0,0 100,408 H 400 A 8,8 0 0,0 408,400 Z" 
                  fill="rgba(16,185,129,0.02)" 
                  className="pointer-events-none"
                />

                {/* PIM Label */}
                <text x="120" y="145" fill="#f43f5e" className="text-[10px] font-black tracking-wider uppercase font-sans pointer-events-none italic">
                  FASE DE ENTREGA (PIM)
                </text>

                {/* AIM Label */}
                <text x="380" y="365" textAnchor="end" fill="#10b981" className="text-[10px] font-black tracking-wider uppercase font-sans pointer-events-none italic">
                  FASE DE OPERACIÓN (AIM)
                </text>

                {/* Green circular continuous lifecycle loop (dashed track behind points) */}
                <circle 
                  cx="250" cy="250" r="75" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeDasharray="6,4" 
                  className="opacity-75"
                />

                {/* Draw arrows on the track to express clockwise cycle */}
                <path d="M 245,175 L 255,175 L 250,170 Z" fill="#10b981" stroke="#10b981" strokeWidth="2" />
                <path d="M 325,245 L 325,255 L 330,250 Z" fill="#10b981" stroke="#10b981" strokeWidth="2" />
                <path d="M 255,325 L 245,325 L 250,330 Z" fill="#10b981" stroke="#10b981" strokeWidth="2" />

                {/* Elegant Machihembrado Divider (Jigsaw Puzzle Path) */}
                <path
                  d="M 85 250 H 130 C 130 275, 120 290, 145 290 C 170 290, 160 275, 160 250 H 250 V 170 C 275 170, 290 160, 290 185 C 290 210, 275 200, 250 200 V 85"
                  fill="none"
                  stroke="#fb7185"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_6px_rgba(244,63,94,0.3)] opacity-80 pointer-events-none"
                />

                {/* Interactive Node Point A (On the bottom-left puzzle notch) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => setSelectedId("nodeA")}
                >
                  <circle 
                    cx="145" cy="275" r="14" 
                    fill={selectedId === "nodeA" ? "#38bdf8" : "#1e293b"} 
                    stroke="#38bdf8" strokeWidth="2.5" 
                  />
                  <text 
                    x="145" y="279" 
                    textAnchor="middle" 
                    fill={selectedId === "nodeA" ? "#0f172a" : "#38bdf8"} 
                    className="text-[11px] font-black font-mono pointer-events-none"
                  >
                    A
                  </text>
                  <circle cx="145" cy="275" r="20" fill="none" stroke="#38bdf8" strokeWidth="0.8" className="animate-ping opacity-25" />
                </g>

                {/* Interactive Node Point B (Between A and C on the lifecycle circle) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => setSelectedId("nodeB")}
                >
                  <circle 
                    cx="185" cy="185" r="14" 
                    fill={selectedId === "nodeB" ? "#f43f5e" : "#1e293b"} 
                    stroke="#f43f5e" strokeWidth="2.5" 
                  />
                  <text 
                    x="185" y="189" 
                    textAnchor="middle" 
                    fill={selectedId === "nodeB" ? "#0f172a" : "#f43f5e"} 
                    className="text-[11px] font-black font-mono pointer-events-none"
                  >
                    B
                  </text>
                  <circle cx="185" cy="185" r="20" fill="none" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping opacity-25" />
                </g>

                {/* Interactive Node Point C (On the top-right puzzle notch) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => setSelectedId("nodeC")}
                >
                  <circle 
                    cx="270" cy="185" r="14" 
                    fill={selectedId === "nodeC" ? "#10b981" : "#1e293b"} 
                    stroke="#10b981" strokeWidth="2.5" 
                  />
                  <text 
                    x="270" y="189" 
                    textAnchor="middle" 
                    fill={selectedId === "nodeC" ? "#0f172a" : "#10b981"} 
                    className="text-[11px] font-black font-mono pointer-events-none"
                  >
                    C
                  </text>
                  <circle cx="270" cy="185" r="20" fill="none" stroke="#10b981" strokeWidth="0.8" className="animate-ping opacity-25" />
                </g>

                {/* Central Interactive Jigsaw Puzzle Lock Zone */}
                <g 
                  className="cursor-pointer"
                  onClick={() => setSelectedId("puzzleLock")}
                >
                  <rect 
                    x="202" y="235" width="96" height="30" rx="6"
                    fill={selectedId === "puzzleLock" ? "#ec4899" : "rgba(15,23,42,0.95)"}
                    stroke="#ec4899" strokeWidth="2"
                    className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                  />
                  <text 
                    x="250" y="254" textAnchor="middle"
                    fill={selectedId === "puzzleLock" ? "#0f172a" : "#ec4899"} 
                    className="text-[9px] font-black uppercase tracking-[0.18em] font-mono select-none pointer-events-none"
                  >
                    🧩 ACOPLE
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick Interactive Legend Footer */}
            <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-[9px] font-mono uppercase tracking-widest text-center select-none relative z-10">
              <button 
                onClick={() => setSelectedId("organizacion")} 
                className={`py-1.5 rounded-xs transition-all ${selectedId === "organizacion" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"}`}
              >
                ● 9001 (ORG)
              </button>
              <button 
                onClick={() => setSelectedId("activo")} 
                className={`py-1.5 rounded-xs transition-all ${selectedId === "activo" ? "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30" : "text-slate-500 hover:text-slate-300"}`}
              >
                ● 55000 (ACT)
              </button>
              <button 
                onClick={() => setSelectedId("informacion")} 
                className={`py-1.5 rounded-xs transition-all ${selectedId === "informacion" ? "bg-sky-500/15 text-sky-300 border border-sky-300/30" : "text-slate-500 hover:text-slate-300"}`}
              >
                ● 19650 (DAT)
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-500 font-mono select-none uppercase tracking-wider relative z-10">
              💡 Pulse cualquier anillo periférico o hito central (A, B, C, Acople) para auditar sus bases técnicas contractuales.
            </div>

          </div>
        </div>

        {/* Right Side: Deep-Dive Details Panel (5 columns) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="glass-panel p-6 rounded-sm border border-white/5 bg-[#090d16]/30 shadow-xl h-full flex flex-col justify-between min-h-[490px]">
            <div className="space-y-6 text-left flex flex-col justify-between h-full">
              
              <div className="space-y-5">
                {/* Badge Header Row */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className={`text-[9.5px] font-mono font-black tracking-widest bg-white/5 border border-white/10 px-2.5 py-0.5 uppercase ${currentItem.textColorClass}`}>
                    {currentItem.badgeText}
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono uppercase font-bold">
                    METODIC
                  </span>
                </div>

                {/* Subtitle / Standard Label */}
                <div>
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-wider block ${currentItem.textColorClass}`}>
                    {currentItem.example}
                  </span>
                  <h3 className="text-2.5xl font-black text-white uppercase italic leading-none tracking-tight mt-1.5">
                    {currentItem.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono uppercase tracking-wider mt-1">
                    {currentItem.subtitle}
                  </p>
                </div>

                {/* Body Description */}
                <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                  {currentItem.description}
                </p>

                {/* Crucial Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[8px] font-black uppercase text-slate-500 block font-mono tracking-wider">
                    Aspectos y Entregables Críticos:
                  </span>
                  {currentItem.keyAspects.map((aspect, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-[10.5px]">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${currentItem.textColorClass}`} />
                      <span className="text-slate-300 leading-tight font-sans">{aspect}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Brand Footer */}
              <div className="pt-6 border-t border-white/5 text-[9px] text-slate-500 uppercase tracking-widest select-none font-mono flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-pink-500" /> 
                <span>ISO 19650-1: Fundamentos y Conceptos</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
