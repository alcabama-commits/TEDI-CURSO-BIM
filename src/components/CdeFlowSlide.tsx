import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderLock, Share2, ShieldCheck, Archive, ArrowRight, ArrowDown, CheckCircle2, 
  Info, Users, RefreshCw, Send, Lock, ChevronRight, FileText, Check, AlertCircle
} from 'lucide-react';

interface CdeStateDetail {
  id: string; // 'wip' | 'compartido' | 'publicado' | 'archivado' | 'm01' | 'm02' | 'm03'
  title: string;
  subtitle: string;
  badge: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
  purpose: string;
  auditor: string;
  guidelines: string[];
}

const STATE_DETAILS: Record<string, CdeStateDetail> = {
  wip: {
    id: "wip",
    title: "WIP (Trabajo en Curso)",
    subtitle: "Entorno de desarrollo local/disciplinar",
    badge: "Estado 01 - WIP",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20",
    description: "El estado de Trabajo en Curso se destina a la información que está desarrollando activamente un equipo de trabajo específico (p. ej., ingeniería estructural, instalaciones sanitarias). Ningún otro equipo de trabajo tiene acceso a esta información mientras permanezca aquí.",
    purpose: "Evitar el uso de borradores o ingeniería no coordinada por parte de otras especialidades.",
    auditor: "Coordinador BIM de la especialidad / Líder de Disciplina",
    guidelines: [
      "Espacio cerrado para el modelado libre y resolución de problemas internos",
      "La información no está garantizada; puede cambiar a diario sin previo aviso",
      "Garantiza la independencia y concentración de cada equipo técnico de diseño"
    ]
  },
  compartido: {
    id: "compartido",
    title: "COMPARTIDO",
    subtitle: "Colaboración interconfederada e inter-disciplinas",
    badge: "Estado 02 - Compartido",
    textColor: "text-pink-400",
    bgColor: "bg-pink-500/5",
    borderColor: "border-pink-500/20",
    description: "La finalidad del estado 'Compartido' es permitir el desarrollo cooperativo y coordinado de los modelos. Los equipos de trabajo publican hitos estables para que otras disciplinas puedan modelar encima con seguridad referencial.",
    purpose: "Servir de base unificada para la coordinación multidisciplinar, la detección de interferencias y simulaciones constructivas.",
    auditor: "BIM Manager / Coordinador BIM General",
    guidelines: [
      "La información es apta para coordinarse, pero aún no tiene aprobación para construir",
      "Representa la suma de los modelos disciplinares en un entorno común seguro",
      "Base crítica para las reuniones semanales de coordinación (ICE Sessions)"
    ]
  },
  publicado: {
    id: "publicado",
    title: "PUBLICADO",
    subtitle: "Aprobación contractual y uso general",
    badge: "Estado 03 - Publicado",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/5",
    borderColor: "border-emerald-500/20",
    description: "El estado 'Publicado' se utiliza para información plenamente autorizada para su aplicación en fases específicas como licitación, fabricación o fase constructiva de obra física.",
    purpose: "Brindar certeza documental y geométrica de que el entregable cumple al 100% con los requerimientos contractuales.",
    auditor: "Cliente Final / Supervisor de Obra (EIRT / Inspección Técnica)",
    guidelines: [
      "Modelos y planos congelados, listos para firmarse contractualmente",
      "Cuentan con verificación geométrica completa y auditoría de metrados",
      "Cada archivo publicado recibe una codificación de revisión estricta e inmutable"
    ]
  },
  archivado: {
    id: "archivado",
    title: "ARCHIVADO",
    subtitle: "Repasitorio de trazabilidad e histórico",
    badge: "Estado 04 - Archivado",
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/5",
    borderColor: "border-slate-500/20",
    description: "El estado 'Archivado' mantiene un registro histórico inmutable de toda la información que fue compartida o publicada a lo largo de las etapas del activo digital. También incluye el modelo As-Built final entregado.",
    purpose: "Soportar la trazabilidad legal del proyecto ante cualquier reclamo posterior y servir de registro de auditoría técnica.",
    auditor: "Oficina de Gestión de Proyectos (PMO)",
    guidelines: [
      "Incorruptible: no se puede eliminar ni editar ningún archivo archivado",
      "Contiene las versiones obsoletas que ya fueron superadas por nuevos envíos",
      "Permite restaurar y revisar qué diseño exacto se discutía en una fecha específica"
    ]
  },
  m01: {
    id: "m01",
    title: "M01: Puerta de Aprobación",
    subtitle: "Transición WIP ➔ COMPARTIDO",
    badge: "Comprobación del Equipo Técnico",
    textColor: "text-[#deb887]",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20",
    description: "El paso técnico donde el coordinador local autoriza que el borradores del modelo de su disciplina sea visible por las demás áreas coordinadoras en el entorno común.",
    purpose: "Asegurar que los entregables cumplan con la sintaxis de modelado básica antes de compartirse.",
    auditor: "Coordinador BIM Disciplinar",
    guidelines: [
      "Verificación de que el archivo no tiene interferencias groseras internas",
      "Cumplimiento estricto con el protocolo de nomenclatura y versionamiento",
      "Control de que los archivos han sido purgados de líneas vacías o advertencias fatales"
    ]
  },
  m02: {
    id: "m02",
    title: "M02: Puerta de Autorización",
    subtitle: "Transición COMPARTIDO ➔ PUBLICADO",
    badge: "Aprobación del Cliente / Dirección",
    textColor: "text-indigo-400",
    bgColor: "bg-indigo-500/5",
    borderColor: "border-indigo-500/20",
    description: "Hito de carácter contractual. Una vez que las disciplinas se han coordinado y resuelto colisiones, el conjunto es presentado a la inspección corporativa para su validación general.",
    purpose: "Formalizar el modelo digital de información agregada para su ejecución técnica real.",
    auditor: "Dirección de Proyectos / Representante del Cliente",
    guidelines: [
      "Detección final de colisiones (Clash Detection) con reporte limpio",
      "Aprobación de la madurez y nivel de información (LOD / LOIN) prometidos",
      "Asignación de estatus inmutable para emisión oficial (p. ej., Apto para Construir)"
    ]
  },
  m03: {
    id: "m03",
    title: "M03: Puerta de Archivo",
    subtitle: "Transición ➔ ARCHIVADO",
    badge: "Registro de Trazabilidad Histórica",
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/5",
    borderColor: "border-slate-500/20",
    description: "La archivación automática de la información compartida obsoleta que ha sido reemplazada por revisiones superiores u oficiales.",
    purpose: "Mantener el historial íntegro sin generar desorden o confusiones operativas en los usuarios.",
    auditor: "Soporte CDE / Gestor Documental",
    guidelines: [
      "Archivado automático de la versión previa coincidiendo con un nuevo envío M01/M02",
      "Mantenimiento estricto de metadatos de usuario, fecha, hora e hitos",
      "Mantenimiento de acceso de consulta restringida para el auditor legal"
    ]
  }
};

export const CdeFlowSlide = () => {
  const [selectedId, setSelectedId] = useState<string>("wip");
  const [activeStepInSim, setActiveStepInSim] = useState<number>(0);
  const [simulationLog, setSimulationLog] = useState<string[]>([
    "CDE Inicializado. Esperando archivos en WIP."
  ]);
  const [fileSimState, setFileSimState] = useState<string>("Borrador 3D - MEP (V1)");

  const currentItem = STATE_DETAILS[selectedId] || STATE_DETAILS.wip;

  const runNextSimulationStep = () => {
    if (activeStepInSim === 0) {
      setActiveStepInSim(1);
      setFileSimState("Borrador 3D - MEP (V1.1) - Aprobado por MEP Coordinator");
      setSimulationLog(prev => [
        ...prev, 
        "👉 REVISIÓN M01: Coordinador MEP ejecuta control de calidad local.",
        "✅ Archivo verificado libre de colisiones críticas internas."
      ]);
      setSelectedId("m01");
    } else if (activeStepInSim === 1) {
      setActiveStepInSim(2);
      setFileSimState("MEP_ARQ_EST_Coordinado (V1)");
      setSimulationLog(prev => [
        ...prev,
        "👉 ESTADO COMPARTIDO (V1): El modelo MEP es visible para ARQ y EST.",
        "🔗 Colisiones resueltas en sesión ICE semanal con el BIM Manager."
      ]);
      setSelectedId("compartido");
    } else if (activeStepInSim === 2) {
      setActiveStepInSim(3);
      setFileSimState("MEP_ARQ_EST_Coordinado (V1) - Aprobado y Firmado por Cliente");
      setSimulationLog(prev => [
        ...prev,
        "👉 REVISIÓN M02 - AUTORIZACIÓN: Dirección técnica valida el modelo integrado.",
        "✨ El cliente otorga el sello 'Apto para Construcción'."
      ]);
      setSelectedId("m02");
    } else if (activeStepInSim === 3) {
      setActiveStepInSim(4);
      setFileSimState("MEP-PLAN-001_Apto_Construcción (A)");
      setSimulationLog(prev => [
        ...prev,
        "👉 ESTADO PUBLICADO: Entregable congelado oficial emitido a terreno.",
        "📦 REVISIÓN M03 - AUTO-ARCHIVO: El borrador versión 1 es enviado al histórico."
      ]);
      setSelectedId("publicado");
    } else {
      // Reset
      setActiveStepInSim(0);
      setFileSimState("Borrador 3D - MEP (V2)");
      setSimulationLog([
        "CDE Reinicializado. Iniciando nueva iteración técnica MEP (V2)."
      ]);
      setSelectedId("wip");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10 font-sans"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div>
          <span className="text-pink-500 font-mono text-[9px] uppercase tracking-[0.4em] font-black">Clase 2: ISO 19650</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1 italic">
            El Flujo de la Información <span className="text-white">en el CDE</span>
          </h2>
          <p className="text-slate-400 text-xs">
            El CDE no es un Dropbox desordenado; es un ecosistema técnico regulado bajo cuatro estados inmutables para resguardar la gobernanza.
          </p>
        </div>
        <div className="bg-artis-black px-4 py-2 border border-white/5 rounded-full flex items-center gap-3 shrink-0">
          <FolderLock className="w-4 h-4 text-pink-500" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">Entorno Común de Datos (ISO 19650)</span>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 items-stretch">
        
        {/* Left Side: Visual Interactive Flow Chart (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-sm border border-white/10 bg-[#070b13] relative overflow-hidden shadow-2xl flex-1 flex flex-col justify-between min-h-[490px]">
            {/* Background design accents */}
            <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

            <div className="w-full flex items-center justify-between mb-4 relative z-10">
              <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest uppercase">
                📂 MAQUETA DE RUTEO REGLADO (ISO 19650)
              </span>
              <span className="text-[8.5px] font-black font-mono text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-xs">
                SISTEMA INDEXADO
              </span>
            </div>

            {/* Simulated Interactive Vector Diagram mapping the user's diagram */}
            <div className="relative w-full flex-1 flex items-center justify-center select-none py-2 h-[410px]">
              <svg 
                viewBox="0 0 540 500" 
                className="w-full h-full max-h-[400px] overflow-visible"
              >
                {/* SVG Definitions for drop shadows */}
                <defs>
                  <filter id="shadow-glow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ec4899" floodOpacity="0.15" />
                  </filter>
                  <filter id="active-emerald" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#10b981" floodOpacity="0.2" />
                  </filter>
                  <filter id="active-amber" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.2" />
                  </filter>
                  <filter id="active-blue" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* === WIP (TRABAJO EN CURSO) REGION (Top-Right) === */}
                {/* Stacked Panels to represent EQUIPO 01, EQUIPO 02, EQUIPO 03 */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("wip")}
                >
                  {/* Stack 3 (Back) - Team 03 */}
                  <path 
                    d="M 370 45 H 480 V 55 A 15,15 0 0 0 495 70 H 510 V 165 H 370 Z" 
                    fill="#030712" stroke="#4a5568" strokeWidth="1.5" className="opacity-40"
                  />
                  <text x="495" y="152" fill="#718096" className="text-[7.5px] font-black font-sans uppercase text-right" textAnchor="end">EQUIPO 03</text>

                  {/* Stack 2 (Middle) - Team 02 */}
                  <path 
                    d="M 345 30 H 455 V 40 A 15,15 0 0 0 470 55 H 485 V 150 H 345 Z" 
                    fill="#030712" stroke="#718096" strokeWidth="1.5" className="opacity-60"
                  />
                  <text x="470" y="137" fill="#a0aec0" className="text-[7.5px] font-black font-sans uppercase text-right" textAnchor="end">EQUIPO 02</text>

                  {/* Stack 1 (Front/Interactive) - WIP Card with exact geometry lock shape */}
                  <path 
                    d="M 315 15 H 425 V 25 A 15,15 0 0 0 440 40 H 455 V 135 H 315 Z" 
                    fill={selectedId === 'wip' ? "rgba(245,158,11,0.06)" : "#070c14"} 
                    stroke={selectedId === 'wip' ? "#f59e0b" : "#4b5563"} 
                    strokeWidth={selectedId === 'wip' ? "3.5" : "2.5"}
                    style={{ filter: selectedId === 'wip' ? 'url(#active-amber)' : 'none' }}
                    className="transition-all duration-300"
                  />
                  {/* WIP Text Elements */}
                  <text x="330" y="42" fill="#fff" className="text-[17px] font-black tracking-wider uppercase font-sans">WIP</text>
                  <text x="330" y="62" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">El estado &ldquo;Trabajo en</text>
                  <text x="330" y="74" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">Curso&rdquo; se usa para la in-</text>
                  <text x="330" y="86" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">formación que está de-</text>
                  <text x="330" y="98" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">sarrollando un equipo de</text>
                  <text x="330" y="110" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">trabajo</text>
                  
                  <text x="440" y="122" fill="#f59e0b" className="text-[8px] font-black font-sans uppercase text-right" textAnchor="end">EQUIPO 01</text>
                </g>


                {/* === TRANSITION M01 (APROBACIÓN) CENTRAL CONNECTOR === */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("m01")}
                >
                  <line 
                    x1="315" y1="75" x2="215" y2="75" 
                    stroke={selectedId === "m01" ? "#f59e0b" : "#4b5563"} 
                    strokeWidth={selectedId === "m01" ? "3" : "1.8"} 
                  />
                  <line 
                    x1="215" y1="65" x2="215" y2="85" 
                    stroke={selectedId === "m01" ? "#f59e0b" : "#4b5563"} 
                    strokeWidth={selectedId === "m01" ? "3" : "1.8"} 
                  />
                  {/* Rotated text element: APROBACION (M01) */}
                  <g transform="translate(255, 75)">
                    <rect 
                      x="-55" y="-13" width="110" height="26" rx="4"
                      fill={selectedId === "m01" ? "#d97706" : "#111827"}
                      stroke={selectedId === "m01" ? "#fbbf24" : "#374151"}
                      strokeWidth="1.5"
                    />
                    <text 
                      x="0" y="-1" textAnchor="middle" 
                      fill={selectedId === "m01" ? "#fff" : "#fbbf24"} 
                      className="text-[8px] font-black font-sans uppercase tracking-[0.1em]"
                    >
                      APROBACIÓN
                    </text>
                    <text 
                      x="0" y="8" textAnchor="middle" 
                      fill={selectedId === "m01" ? "#fff" : "#9ca3af"} 
                      className="text-[7.5px] font-bold font-mono uppercase"
                    >
                      (M01)
                    </text>
                  </g>
                </g>


                {/* === COMPARTIDO STATE (Top-Left) === */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("compartido")}
                >
                  {/* COMPARTIDO Card Geometry */}
                  <path 
                    d="M 15 15 H 125 V 25 A 15,15 0 0 0 140 40 H 155 V 135 H 15 Z" 
                    fill={selectedId === 'compartido' ? "rgba(236,72,153,0.06)" : "#070c14"} 
                    stroke={selectedId === 'compartido' ? "#ec4899" : "#4b5563"} 
                    strokeWidth={selectedId === 'compartido' ? "3.5" : "2.5"}
                    style={{ filter: selectedId === 'compartido' ? 'url(#shadow-glow)' : 'none' }}
                    className="transition-all duration-300"
                  />
                  {/* Compartido Text Elements */}
                  <text x="30" y="42" fill="#fff" className="text-[17px] font-black tracking-wider uppercase font-sans">COMPARTIDO</text>
                  <text x="30" y="62" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">La finalidad del estado</text>
                  <text x="30" y="74" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">&ldquo;Compartido&rdquo; es permi-</text>
                  <text x="30" y="86" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">tir el desarrollo colabo-</text>
                  <text x="30" y="98" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">rativo del modelo de in-</text>
                  <text x="30" y="110" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">formación</text>
                </g>


                {/* === TRANSITION M02 (AUTORIZACIÓN) CONECTOR VERTICAL (Left) === */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("m02")}
                >
                  <line 
                    x1="85" y1="135" x2="85" y2="285" 
                    stroke={selectedId === "m02" ? "#6366f1" : "#4b5563"} 
                    strokeWidth={selectedId === "m02" ? "3" : "1.8"} 
                  />
                  <line 
                    x1="75" y1="285" x2="95" y2="285" 
                    stroke={selectedId === "m02" ? "#6366f1" : "#4b5563"} 
                    strokeWidth={selectedId === "m02" ? "3" : "1.8"} 
                  />
                  {/* Central Overlay for M02 */}
                  <g transform="translate(85, 205)">
                    <rect 
                      x="-55" y="-13" width="110" height="26" rx="4"
                      fill={selectedId === "m02" ? "#4f46e5" : "#111827"}
                      stroke={selectedId === "m02" ? "#818cf8" : "#374151"}
                      strokeWidth="1.5"
                    />
                    <text 
                      x="0" y="-1" textAnchor="middle" 
                      fill={selectedId === "m02" ? "#fff" : "#818cf8"} 
                      className="text-[8px] font-black font-sans uppercase tracking-[0.05em]"
                    >
                      AUTORIZACION
                    </text>
                    <text 
                      x="0" y="8" textAnchor="middle" 
                      fill={selectedId === "m02" ? "#fff" : "#9ca3af"} 
                      className="text-[7.5px] font-bold font-mono"
                    >
                      (M02)
                    </text>
                  </g>
                </g>


                {/* === PUBLICADO STATE (Bottom-Left) === */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("publicado")}
                >
                  {/* PUBLICADO Card Geometry */}
                  <path 
                    d="M 15 285 H 125 V 295 A 15,15 0 0 0 140 310 H 155 V 405 H 15 Z" 
                    fill={selectedId === 'publicado' ? "rgba(16,185,129,0.06)" : "#070c14"} 
                    stroke={selectedId === 'publicado' ? "#10b981" : "#4b5563"} 
                    strokeWidth={selectedId === 'publicado' ? "3.5" : "2.5"}
                    style={{ filter: selectedId === 'publicado' ? 'url(#active-emerald)' : 'none' }}
                    className="transition-all duration-300"
                  />
                  {/* Publicado Text Elements */}
                  <text x="30" y="312" fill="#fff" className="text-[17px] font-black tracking-wider uppercase font-sans">PUBLICADO</text>
                  <text x="30" y="332" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">El estado &ldquo;Publicado&rdquo; se</text>
                  <text x="30" y="344" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">utiliza para información</text>
                  <text x="30" y="356" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">autorizada para su uso</text>
                </g>


                {/* === TRANSITION M03 CONNECTOR CENTRAL BOTTOM === */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("m03")}
                >
                  <line 
                    x1="155" y1="345" x2="315" y2="345" 
                    stroke={selectedId === "m03" ? "#94a3b8" : "#4b5563"} 
                    strokeWidth={selectedId === "m03" ? "3" : "1.8"} 
                  />
                  <line 
                    x1="315" y1="335" x2="315" y2="355" 
                    stroke={selectedId === "m03" ? "#94a3b8" : "#4b5563"} 
                    strokeWidth={selectedId === "m03" ? "3" : "1.8"} 
                  />
                  {/* overlay M03 */}
                  <g transform="translate(235, 345)">
                    <rect 
                      x="-35" y="-12" width="70" height="24" rx="4"
                      fill={selectedId === "m03" ? "#475569" : "#111827"}
                      stroke={selectedId === "m03" ? "#cbd5e1" : "#374151"}
                      strokeWidth="1.5"
                    />
                    <text 
                      x="0" y="4" textAnchor="middle" 
                      fill={selectedId === "m03" ? "#fff" : "#94a3b8"} 
                      className="text-[10px] font-black font-mono tracking-wider"
                    >
                      (M03)
                    </text>
                  </g>
                </g>


                {/* === ARCHIVADO STATE (Bottom-Right) === */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedId("archivado")}
                >
                  {/* ARCHIVADO Card Geometry */}
                  <path 
                    d="M 315 285 H 425 V 295 A 15,15 0 0 0 440 310 H 455 V 405 H 315 Z" 
                    fill={selectedId === 'archivado' ? "rgba(148,163,184,0.06)" : "#070c14"} 
                    stroke={selectedId === 'archivado' ? "#94a3b8" : "#4b5563"} 
                    strokeWidth={selectedId === 'archivado' ? "3.5" : "2.5"}
                    style={{ filter: selectedId === 'archivado' ? 'url(#active-blue)' : 'none' }}
                    className="transition-all duration-300"
                  />
                  {/* Archivado Text Elements */}
                  <text x="330" y="312" fill="#fff" className="text-[17px] font-black tracking-wider uppercase font-sans">ARCHIVADO</text>
                  <text x="330" y="332" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">El estado &ldquo;Archivado&rdquo; se</text>
                  <text x="330" y="344" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">usa para mantener un</text>
                  <text x="330" y="356" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">registro de la informa-</text>
                  <text x="330" y="368" fill="#9ca3af" className="text-[8.5px] font-sans font-medium">ción compartida</text>
                </g>

                {/* Simulated File Walker Node to animate transitions */}
                {activeStepInSim > 0 && (
                  <motion.circle 
                    cx={
                      activeStepInSim === 1 ? 255 : // M01 gate
                      activeStepInSim === 2 ? 85  : // COMPARTIDO
                      activeStepInSim === 3 ? 85  : // M02 gate
                      activeStepInSim === 4 ? 85  : // PUBLICADO
                      15
                    }
                    cy={
                      activeStepInSim === 1 ? 75  :
                      activeStepInSim === 2 ? 75  :
                      activeStepInSim === 3 ? 205 :
                      activeStepInSim === 4 ? 345 :
                      15
                    }
                    r="8" 
                    fill="#ff007f" 
                    className="shadow-[0_0_10px_#ff007f]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}

              </svg>
            </div>

            {/* Simulated Live CDE File Simulator */}
            <div className="bg-[#0e1624] border border-white/5 p-4 rounded-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                  <span className="text-[8.5px] font-bold text-slate-300 font-mono uppercase tracking-wider">
                    SIMULADOR DE DOCUMENTACIÓN (MEP INTERACTIVO)
                  </span>
                </div>
                <span className="bg-white/5 border border-white/10 text-[7px] text-pink-400 font-mono px-2 py-0.5 rounded-xs uppercase">
                  PIM ⇆ CDE Engine
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-8 flex flex-col gap-1.5 bg-[#0b0f19] p-3 rounded-xs border border-white/5 text-left">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-pink-400" />
                    <div>
                      <span className="text-[7.5px] font-mono text-slate-500 uppercase block tracking-wider leading-none">Nombre del Archivo en CDE:</span>
                      <span className="text-[11px] font-black text-white font-mono break-all">{fileSimState}</span>
                    </div>
                  </div>
                  <div className="h-px bg-white/5 my-0.5" />
                  <div className="text-[9.5px] text-slate-400 italic font-medium">
                    {simulationLog[simulationLog.length - 1]}
                  </div>
                </div>

                <div className="md:col-span-4 w-full">
                  <button
                    onClick={runNextSimulationStep}
                    className="w-full h-11 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white font-black text-[9px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {activeStepInSim === 0 && "Enviar a M01"}
                      {activeStepInSim === 1 && "Verificar M01"}
                      {activeStepInSim === 2 && "Solicitar M02"}
                      {activeStepInSim === 3 && "Autorizar M02"}
                      {activeStepInSim === 4 && "Reiniciar Envío"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Detail Workspace Panel (5 columns) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="glass-panel p-6 rounded-sm border border-white/5 bg-[#090d16]/30 shadow-xl h-full flex flex-col justify-between min-h-[490px]">
            <div className="space-y-6 text-left flex flex-col justify-between h-full">
              
              <div className="space-y-5">
                {/* Badge Header Row */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className={`text-[9.5px] font-mono font-black tracking-widest bg-white/5 border border-white/10 px-2.5 py-0.5 uppercase ${currentItem.textColor}`}>
                    {currentItem.badge}
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono uppercase font-bold">
                    REPORTE ISO 19650
                  </span>
                </div>

                {/* State Titles */}
                <div>
                  <span className="text-[9.5px] font-mono text-pink-500 uppercase font-black tracking-widest block leading-none mb-1.5">
                    ESTADO INDEXADO DEL CDE
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase italic leading-none tracking-tight">
                    {currentItem.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono uppercase tracking-wider mt-1.5">
                    {currentItem.subtitle}
                  </p>
                </div>

                {/* State Auditor */}
                <div className="bg-[#0c121e] border border-white/5 p-3 rounded-xs flex items-center gap-3">
                  <Users className={`w-5 h-5 shrink-0 ${currentItem.textColor}`} />
                  <div>
                    <span className="text-[7.5px] font-mono text-slate-500 uppercase block tracking-wider leading-none">Responsable del Control / Aprobación:</span>
                    <span className="text-xs font-black text-white uppercase tracking-tight">{currentItem.auditor}</span>
                  </div>
                </div>

                {/* Description Body */}
                <div className="space-y-1">
                  <span className="text-[8px] font-black uppercase text-slate-500 block font-mono tracking-wider">Definición de Protocolo:</span>
                  <p className="text-[11.5px] text-slate-200 leading-relaxed font-sans font-normal">
                    {currentItem.description}
                  </p>
                </div>

                {/* Key Aspects & Guidelines */}
                <div className="space-y-2 pt-2">
                  <span className="text-[8px] font-black uppercase text-slate-500 block font-mono tracking-wider">Transiciones y Requisitos de Entrega:</span>
                  <div className="space-y-2.5">
                    {currentItem.guidelines.map((aspect, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-[10.5px]">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${currentItem.textColor}`} />
                        <span className="text-slate-300 leading-snug font-sans">{aspect}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Technical Rule Reference Block */}
              <div className="pt-4 border-t border-white/5 text-[9px] text-slate-500 uppercase tracking-widest select-none font-mono flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-pink-500" />
                <span>Requisito M01 a M03 de Acuerdo a ISO 19650-2</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
