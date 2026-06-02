import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Settings, Users, Box, HardHat, ArrowRight, CheckCircle2, 
  HelpCircle, Sparkles, Info, FileSpreadsheet, Layers, ShieldCheck, 
  FileText, Hammer, Sparkle, UserCheck, RefreshCw, X, ChevronRight, Activity, Cpu
} from 'lucide-react';

interface BimRole {
  id: string; // "client" | "manager" | "coordinator" | "modeler" | "resident"
  title: string;
  subtitle: string;
  badge: string;
  mantra: string;
  actionLevel: "Estratégico" | "Táctico / Dirección" | "Coordinación" | "Operativo" | "Ejecución de Obra";
  mainIcon: any;
  colorClass: string;
  borderColorClass: string;
  bgLightClass: string;
  accentColor: string;
  description: string;
  deliverables: string[];
  tools: string[];
  cdeInteraction: string;
  responsibilities: string[];
}

const ROLES_DATA: BimRole[] = [
  {
    id: "client",
    title: "Promotor / Cliente (Owner)",
    subtitle: "Inversionista, Mandante o Gestor del Activo",
    badge: "Definición Estratégica",
    mantra: "Quien define la necesidad del inmueble, el presupuesto y las pautas contractuales EIR.",
    actionLevel: "Estratégico",
    mainIcon: Building2,
    colorClass: "text-[#deb887]",
    borderColorClass: "border-[#deb887]/30",
    bgLightClass: "bg-[#deb887]/5",
    accentColor: "#deb887",
    description: "Es el dueño del activo y el punto inicial del ciclo ISO 19650. Define los Requisitos de Información Organizacional (OIR) y los Requisitos de Información de Intercambio (EIR) que regirán el concurso. Su meta es recibir un modelo digital As-Built limpio de errores, con volumetría coherente que alimente un sistema de Facility Management (GMAO / ERP) sin pérdida de información.",
    deliverables: [
      "EIR (Exchange Information Requirements)",
      "OIR / AIR (Organizational & Asset Information Requirements)",
      "Términos de Referencia de la Licitación BIM",
      "Criterios de Aceptación de los Modelos y Entregables"
    ],
    tools: [
      "Visores en web (Dalux, Speckle, Autodesk Viewer)",
      "Sistemas ERP / GMAO (Archibus, IBM Maximo, SAP)",
      "Plataformas para Toma de Decisiones y Presupuestos"
    ],
    cdeInteraction: "Aprueba las transiciones de modelo al estado 'PUBLICADO' (Estado 03). No modela activamente, pero ejerce la potestad contractual de aceptación de hitos de pagos según el éxito del Compliance.",
    responsibilities: [
      "Establece las directrices comerciales y financieras de alto nivel.",
      "Asegura la provisión adecuada del Entorno Común de Datos (CDE) del proyecto.",
      "Revisa la calidad de la información entregada al final de cada etapa constructiva."
    ]
  },
  {
    id: "manager",
    title: "BIM Manager",
    subtitle: "Director del Estándar y Estratega del Proyecto",
    badge: "Gestión Corporativa",
    mantra: "El director metodológico que garantiza que los requisitos del cliente se traduzcan en procesos exitosos.",
    actionLevel: "Táctico / Dirección",
    mainIcon: Settings,
    colorClass: "text-[#db2777]",
    borderColorClass: "border-[#db2777]/30",
    bgLightClass: "bg-[#db2777]/5",
    accentColor: "#db2777",
    description: "Diseña el mapa de ruta de la modelación digital del proyecto. Lidera la redacción del Plan de Ejecución BIM (BEP), asigna los flujos de trabajo del CDE, establece convenciones de nombres, familias parametricas, especificaciones openBIM y coordina las comunicaciones metodológicas entre la supervisión técnica y las empresas constructoras intervinientes.",
    deliverables: [
      "BEP (BIM Execution Plan - Versión Pre y Post Adjudicación)",
      "Matriz de Responsabilidades y Roles del Proyecto (TIDP / MIDP)",
      "Protocolos y Guías de Codificación y Nomenclatura Estándar",
      "Plantillas Base de Modelado Federado y Clasificaciones de Costo"
    ],
    tools: [
      "Entornos CDE (Autodesk Construction Cloud, Trimble Connect, Speckle)",
      "Software de Auditoría Avanzada (Solibri, Navisworks Manage)",
      "Generadores de Parámetros y Schemas (IfcDoc, BIMcollab Zoom)"
    ],
    cdeInteraction: "Es el administrador supremo del CDE. Configura la plataforma, gestiona roles de acceso de carpetas, y define los disparadores de flujos automáticos para las aprobaciones de transición compartida.",
    responsibilities: [
      "Traduce los requerimientos del EIR del cliente en una estrategia real de producción (BEP).",
      "Resuelve disputas de interferencias severas multidisciplinares que amenazan el presupuesto.",
      "Lidera la sesión inicial de coordinación (Kick-off) y dictamina la idoneidad metodológica del equipo."
    ]
  },
  {
    id: "coordinator",
    title: "Coordinador BIM",
    subtitle: "Supervisor de Clashes y Enlace de Especialidades",
    badge: "Calidad Técnica",
    mantra: "El puente de unión táctico que integra los aportes disciplinares para un modelo libre de interferencias.",
    actionLevel: "Coordinación",
    mainIcon: Users,
    colorClass: "text-[#38bdf8]",
    borderColorClass: "border-[#38bdf8]/30",
    bgLightClass: "bg-[#38bdf8]/5",
    accentColor: "#38bdf8",
    description: "Es el responsable directo de la integración y federación de los modelos disciplinares individuales (Arquitectura, Estructuras, MEP, Instalaciones Especiales). Su tarea angular es detectar, priorizar, reportar, documentar y asignar a resolución técnica los choques (clashes) o inconsistencias espaciales que afecten críticamente la constructibilidad del activo físico real.",
    deliverables: [
      "Modelos Federados y Consolidados de Coordinación (IFC)",
      "Informes Ejecutivos de Detección de Interferencias Físicas",
      "Tickets de Incidencia en Formato Estándar Común (BCF)",
      "Matriz de Resolución de Conflictos Espaciales de Obra"
    ],
    tools: [
      "Software de Coordinación y Clash (Navisworks Manage, Solibri, Revizto)",
      "Gestores de Incidencias en la Nube (BIMcollab, BIM Track, ACC)",
      "Interfaces de Modelado de Apoyo Directo (Revit, Tekla)"
    ],
    cdeInteraction: "Revisa y firma digitalmente las entradas y salidas de la puerta de aprobación técnica 'M01', transitando los modelos de Trabajo en Curso (WIP) de cada especialista al área central de 'COMPARTIDO'.",
    responsibilities: [
      "Federar modelos de subcontratistas y ejecutar auditorías de colisión espacial.",
      "Liderar las ICE Sessions (Ingeniería Concurrente Integrada) semanales enfocadas en obra.",
      "Asegurar la consistencia relacional y geométrica del modelo antes de enviarlos a terreno."
    ]
  },
  {
    id: "modeler",
    title: "Modelador BIM",
    subtitle: "Artífice Digital de Geometría y Parámetros",
    badge: "Desarrollo y Producción",
    mantra: "Quien inyecta geometría con absoluta precisión matemática y enriquece los metadatos de clasificación IFC.",
    actionLevel: "Operativo",
    mainIcon: Box,
    colorClass: "text-[#ec4899]",
    borderColorClass: "border-[#ec4899]/30",
    bgLightClass: "bg-[#ec4899]/5",
    accentColor: "#ec4899",
    description: "Produce de forma directa los componentes tridimensionales del activo bajo las guías metodológicas del BEP y las especificaciones arquitectónicas o estructurales. Introduce metadatos cruciales de volumetría, clasificación del material de concreto o acero (Cláusula 1.5) y asocia las conexiones lógicas funcionales de los elementos mecánicos, estructurales u arquitectónicos del proyecto.",
    deliverables: [
      "Modelo de Información del Diseño Disciplinar (PIM)",
      "Set de Planillas Automáticas de Cantidades Extraídas de Revit",
      "Modelos Paramétricos de Detalle Constructivo (Familias LOD 350-400)",
      "Planos 2D totalmente automatizados provenientes del modelo"
    ],
    tools: [
      "Plataformas de Diseño (Autodesk Revit, Tekla Structures, Archicad)",
      "Inyecciones Paramétricas y Dynamo para automatización de metadatos",
      "Plugins de exportación openBIM IFC nativos"
    ],
    cdeInteraction: "Trabaja y actualiza la información constantemente dentro del estado exclusivo 'WIP' (Trabajo en Curso) propio de su disciplina, garantizando la confidencialidad de borradores hasta que se apruebe su exportación.",
    responsibilities: [
      "Modelar en estricto cumplimiento con las tolerancias y alcances del LOD.",
      "Aplicar con rigurosidad las clasificaciones normalizadas exigidas en el contrato (OmniClass / Uniformat).",
      "Resolver de manera reactiva e inmediata las colisiones de diseño asignadas en tickets BCF."
    ]
  },
  {
    id: "resident",
    title: "Residente BIM / Coordinador de Campo",
    subtitle: "Controlador de Geometría y Construcción Real",
    badge: "Ejecución de Obra",
    mantra: "La mente operativa que usa el modelo tridimensional en sitio para fiscalizar el montaje y certificar avances.",
    actionLevel: "Ejecución de Obra",
    mainIcon: HardHat,
    colorClass: "text-[#fbbf24]",
    borderColorClass: "border-[#fbbf24]/30",
    bgLightClass: "bg-[#fbbf24]/5",
    accentColor: "#fbbf24",
    description: "Alinea el gemelo digital en la nube con la realidad tangible que levantan las cuadrillas de construcción. Verifica coordenadas correctas de replanteo en terreno (Cláusula 1.4), contrasta la llegada del material exigido versus lo modelado, extrae cantidades geométricas del modelo para auditar las planillas de pago presentadas por los subcontratistas, y documenta modificaciones físicas reales.",
    deliverables: [
      "Modelo Conforme a Obra Auténtico (Modelo As-Built)",
      "Informes de Avance Físico Contrastado contra Modelo Virtual (4D)",
      "Reportes Fotográficos de Sitio vinculados a Coordenadas GIS",
      "Punto de Inspección y Liberación de Volúmenes para Certificación de Pagos"
    ],
    tools: [
      "Visores Móviles Robustos para Terreno (Dalux Mobile, ACC Field, Field 3D)",
      "Estación Total Digital y Escáner Láser de Nube de Puntos",
      "Gestión de Avances de Construcción Integrada (Navisworks, Synchro 4D)"
    ],
    cdeInteraction: "Consume de manera rigurosa la base de datos compartida en el estado 'PUBLICADO' (Estado 03) para evitar construcciones con planos desactualizados, y asienta modificaciones en sitio en el repositorio 'ARCHIVADO'.",
    responsibilities: [
      "Asegurar que los oficiales de obra construyan basándose única y exclusivamente en modelos con versión aprobada.",
      "Levantar desviaciones geométricas físicas en sitio y alertar al modelador para ajustes técnicos en plano.",
      "Certificar avance físico real de obra vinculando cantidades del modelo con planillas de control presupuestal."
    ]
  }
];

// RACI Simulation Tasks
interface RaciTask {
  task: string;
  desc: string;
  client: "A" | "R" | "C" | "I";
  manager: "A" | "R" | "C" | "I";
  coordinator: "A" | "R" | "C" | "I";
  modeler: "A" | "R" | "C" | "I";
  resident: "A" | "R" | "C" | "I";
}

const RACI_TASKS: RaciTask[] = [
  {
    task: "Formulación de Requisitos de Información (EIR)",
    desc: "Redactar las exigencias de modelación, plazos, formatos e inyección paramétrica inicial para la licitación fiscal.",
    client: "A", manager: "R", coordinator: "C", modeler: "I", resident: "I"
  },
  {
    task: "Plan de Ejecución BIM (BEP)",
    desc: "Plano de abordaje técnico propuesto para dar respuesta metodológica y operativa a los requisitos del EIR del cliente.",
    client: "A", manager: "R", coordinator: "C", modeler: "I", resident: "I"
  },
  {
    task: "Federación y Auditoría de Interferencias",
    desc: "Unificación de los modelos disciplinares e identificación computarizada de choques geométricos graves en infraestructura.",
    client: "I", manager: "A", coordinator: "R", modeler: "C", resident: "C"
  },
  {
    task: "Modelación Geométrica de Especialidad",
    desc: "Creación detallada tridimensional de vigas, muros, suelos y tuberías en software nativo con metadatos asociados.",
    client: "I", manager: "C", coordinator: "A", modeler: "R", resident: "I"
  },
  {
    task: "Fiscalización y Validación de Obra (As-Built)",
    desc: "Contraste en sitio del montaje final contra el modelo virtual aprobado de construcción y levantamiento de discrepancias físicas.",
    client: "A", manager: "C", coordinator: "C", modeler: "C", resident: "R"
  }
];

export const RolesBimSlide = () => {
  const [activeRoleId, setActiveRoleId] = useState<string>("client");
  const [showRaci, setShowRaci] = useState<boolean>(false);
  const [clickedRaciTask, setClickedRaciTask] = useState<number>(0);
  const [showRaciExplanation, setShowRaciExplanation] = useState<boolean>(false);

  const activeRole = ROLES_DATA.find((r) => r.id === activeRoleId) || ROLES_DATA[0];

  return (
    <div className="relative h-full w-full bg-artis-black text-white p-6 md:p-12 overflow-y-auto flex flex-col justify-between">
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 immersive-grid opacity-15 pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Navigation Indicator & Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-artis-orange font-mono text-[9px] uppercase tracking-[0.4em] font-black">
              Especial: Recursos Humanos y Roles de Proyecto
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-artis-orange animate-pulse shadow-[0_0_10px_#FFA400]"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight leading-none text-white font-mono">
              Ecosistema de <span className="text-artis-orange">Roles BIM</span> bajo ISO 19650
            </h2>
            <div className="relative flex items-center gap-2">
              {/* RACI Explanation Dropdown Button */}
              <button 
                onClick={() => setShowRaciExplanation(!showRaciExplanation)}
                className={`px-3 py-1 text-[8px] font-mono rounded font-black tracking-widest uppercase border transition-all cursor-pointer flex items-center gap-1.5 ${
                  showRaciExplanation 
                    ? "bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
                    : "bg-[#060b13] border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
                title="¿Qué es una Matriz RACI?"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>¿Qué es RACI?</span>
              </button>

              <button 
                onClick={() => setShowRaci(false)}
                className={`px-3 py-1 text-[8px] font-mono rounded font-black tracking-widest uppercase border transition-all cursor-pointer ${
                  !showRaci 
                    ? "bg-artis-orange text-artis-black border-artis-orange shadow-md" 
                    : "bg-[#060b13] border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                Fichas de Roles
              </button>
              <button 
                onClick={() => setShowRaci(true)}
                className={`px-3 py-1 text-[8px] font-mono rounded font-black tracking-widest uppercase border transition-all cursor-pointer ${
                  showRaci 
                    ? "bg-artis-orange text-artis-black border-artis-orange shadow-md" 
                    : "bg-[#060b13] border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                Matriz RACI Interactiva
              </button>

              {/* Elegant Dropdown Popover */}
              <AnimatePresence>
                {showRaciExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 z-50 w-[300px] sm:w-[480px] bg-[#050914]/95 border border-[#38bdf8]/40 rounded-lg p-5 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(56,189,248,0.15)] backdrop-blur-md"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                        <h4 className="text-xs font-black text-white font-mono tracking-wider uppercase">
                          ¿Qué es una Matriz RACI?
                        </h4>
                      </div>
                      <button 
                        onClick={() => setShowRaciExplanation(false)}
                        className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                      >
                        <X className="w-3" />
                      </button>
                    </div>

                    {/* Introductory text */}
                    <p className="text-[10px] leading-relaxed text-slate-300 font-sans mb-4">
                      Es una herramienta de asignación y claridad organizativa. Permite definir de manera transparente quién hace qué en cada entrega contractual según las directrices de la norma <strong>ISO 19650</strong>. Evita duplicidades y vacíos de gestión:
                    </p>

                    {/* Custom 2x2 Grid Graphic style matching the image */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {/* R */}
                      <div className="p-3 rounded bg-[#070c18] border border-orange-500/20 flex flex-col justify-between text-left">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-6 h-6 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center font-mono font-black text-xs border border-orange-500/30 shrink-0">
                            R
                          </span>
                          <span className="text-[10px] font-black font-mono text-white tracking-wide uppercase">
                            Responsible / Responsable
                          </span>
                        </div>
                        <p className="text-[9.5px] text-slate-400 font-sans leading-snug">
                          El actor que ejecuta y desarrolla materialmente la labor técnica del entregable.
                        </p>
                        <span className="text-[8.5px] text-orange-400/90 font-mono italic mt-1.5 block">
                          ¿Quién realiza la tarea?
                        </span>
                      </div>

                      {/* A */}
                      <div className="p-3 rounded bg-[#070c18] border border-emerald-500/20 flex flex-col justify-between text-left">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-black text-xs border border-emerald-500/30 shrink-0">
                            A
                          </span>
                          <span className="text-[10px] font-black font-mono text-white tracking-wide uppercase">
                            Accountable / Aprobador
                          </span>
                        </div>
                        <p className="text-[9.5px] text-slate-400 font-sans leading-snug">
                          El dueño de la calidad y de la firma contractual. Aprueba o rechaza el resultado final de la tarea.
                        </p>
                        <span className="text-[8.5px] text-emerald-400/90 font-mono italic mt-1.5 block">
                          ¿Quién aprueba la tarea?
                        </span>
                      </div>

                      {/* C */}
                      <div className="p-3 rounded bg-[#070c18] border border-sky-400/25 flex flex-col justify-between text-left">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-6 h-6 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-black text-xs border border-sky-500/30 shrink-0">
                            C
                          </span>
                          <span className="text-[10px] font-black font-mono text-white tracking-wide uppercase">
                            Consulted / Consultado
                          </span>
                        </div>
                        <p className="text-[9.5px] text-slate-400 font-sans leading-snug">
                          Asesores o expertos clave consultados de forma bidireccional para aportar valor técnico/experiencia.
                        </p>
                        <span className="text-[8.5px] text-sky-400/90 font-mono italic mt-1.5 block">
                          ¿A quién se consulta?
                        </span>
                      </div>

                      {/* I */}
                      <div className="p-3 rounded bg-[#070c18] border border-pink-500/20 flex flex-col justify-between text-left">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-6 h-6 rounded bg-pink-500/20 text-pink-400 flex items-center justify-center font-mono font-black text-xs border border-pink-500/30 shrink-0">
                            I
                          </span>
                          <span className="text-[10px] font-black font-mono text-white tracking-wide uppercase">
                            Informed / Informado
                          </span>
                        </div>
                        <p className="text-[9.5px] text-slate-400 font-sans leading-snug">
                          Destinatarios unidireccionales que deben conocer los avances o el resultado total de la tarea.
                        </p>
                        <span className="text-[8.5px] text-pink-400/90 font-mono italic mt-1.5 block">
                          ¿Quién debe estar al tanto?
                        </span>
                      </div>
                    </div>

                    {/* Pro tip / Bottom text */}
                    <div className="bg-white/2 p-2.5 rounded border border-white/5 flex gap-2 items-center text-[9px] text-[#38bdf8] font-mono leading-tight">
                      <Info className="w-4 h-4 shrink-0" />
                      <span><strong>Regla de Oro ISO 19650:</strong> Sólo puede existir 1 único <strong>Aprobador [A]</strong> real por cada entregable para evitar ambigüedades jurídicas.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-[11px] sm:text-[12px] text-slate-400 max-w-4xl font-sans leading-relaxed">
            La transición de la construcción tradicional a la metodología BIM no se limita a usar software; reestructura por completo la toma de decisiones, las responsabilidades legales y las puertas de verificación de calidad.
          </p>
        </div>

        {!showRaci ? (
          /* MAIN VIEW: INTERACTIVE ROLE CARDS AND DETAILS BOARD */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Selection Bar: 5 Roles Block (Lg: col-span-5) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[8px] font-black uppercase text-slate-500 font-mono tracking-widest block">
                Seleccione un rol para auditar sus responsabilidades:
              </span>
              
              <div className="flex flex-col gap-2.5">
                {ROLES_DATA.map((role) => {
                  const isActive = role.id === activeRoleId;
                  const IconComponent = role.mainIcon;

                  return (
                    <button
                      key={role.id}
                      onClick={() => setActiveRoleId(role.id)}
                      className={`relative overflow-hidden text-left p-4 rounded border transition-all flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? `border-${role.id} shadow-lg shadow-black/40`
                          : "border-white/5 bg-[#03060c]/50 hover:bg-[#070b13] hover:border-white/15"
                      }`}
                      style={{
                        borderColor: isActive ? role.accentColor : undefined,
                        boxShadow: isActive ? `inset 0 0 15px ${role.accentColor}10, 0 10px 25px -10px rgba(0,0,0,0.5)` : undefined
                      }}
                    >
                      {/* Left glowing border accent for active element */}
                      {isActive && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1"
                          style={{ backgroundColor: role.accentColor }}
                        />
                      )}

                      <div className="flex items-center gap-3 w-11/12">
                        <div 
                          className={`w-9 h-9 rounded flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                            isActive ? "scale-105" : "group-hover:scale-105"
                          }`}
                          style={{ 
                            backgroundColor: isActive ? `${role.accentColor}15` : 'rgba(255,255,255,0.02)',
                            borderColor: isActive ? `${role.accentColor}40` : 'rgba(255,255,255,0.05)'
                          }}
                        >
                          <IconComponent className={`w-4 h-4 ${isActive ? role.colorClass : "text-slate-400 group-hover:text-white"}`} />
                        </div>
                        <div className="truncate">
                          <span 
                            className={`text-[8.5px] font-mono font-black uppercase block tracking-wider leading-none mb-1.5 ${
                              isActive ? role.colorClass : "text-slate-500"
                            }`}
                          >
                            {role.badge}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black font-mono text-white tracking-wide truncate">
                            {role.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-sans truncate block mt-0.5">
                            {role.subtitle}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? "text-white translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Collaborative Network Mini Diagram Description */}
              <div className="bg-[#050912]/80 border border-white/5 rounded p-3 font-mono text-[9px] text-slate-500 space-y-1.5 leading-snug">
                <div className="flex items-center gap-1.5 text-[8px] font-bold text-white uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-artis-orange" />
                  <span>Flujo de Datos Transaccional (ISO):</span>
                </div>
                <p className="font-sans">
                  El <strong className="text-[#deb887]">Owner</strong> estipula los datos que el <strong className="text-[#db2777]">BIM Manager</strong> asienta metodológicamente en el <strong className="text-slate-300 font-bold">BEP</strong>. El <strong className="text-[#38bdf8]">Coordinador</strong> centraliza la calidad geométrica federando lo que el <strong className="text-[#ec4899]">Modelador</strong> construye. En la cúspide, el <strong className="text-[#fbbf24]">Residente</strong> valida de forma empírica en terreno que el gemelo digital coincida plenamente con la realidad física de la obra.
                </p>
              </div>
            </div>

            {/* Right Details Panel: High Fidelity Specific Information (Lg: col-span-7) */}
            <div className="lg:col-span-7 bg-[#040810]/95 border border-white/10 rounded-lg p-5 md:p-6 shadow-xl relative min-h-[460px] flex flex-col justify-between">
              
              <div className="space-y-5">
                {/* Detail Header */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-11 h-11 rounded-lg border flex items-center justify-center shrink-0"
                      style={{ 
                        backgroundColor: `${activeRole.accentColor}10`,
                        borderColor: `${activeRole.accentColor}30`
                      }}
                    >
                      {(() => {
                        const Icon = activeRole.mainIcon;
                        return <Icon className={`w-5 h-5 ${activeRole.colorClass}`} />;
                      })()}
                    </div>
                    <div>
                      <span className={`text-[8.5px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded border leading-none inline-block ${activeRole.colorClass}`} style={{ borderColor: `${activeRole.accentColor}30`, backgroundColor: `${activeRole.accentColor}05` }}>
                        Nivel {activeRole.actionLevel}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wide mt-1.5">
                        {activeRole.title}
                      </h3>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right font-mono text-[8px] text-slate-500">
                    <span>CDE INTRAC:</span>
                    <span className="text-white font-bold block">{activeRole.id.toUpperCase()}_STAGE</span>
                  </div>
                </div>

                {/* Role Brief Mantra (Quote callout) */}
                <div className="p-3 bg-[#080d19]/80 border-l-2 rounded-r flex items-start gap-2.5" style={{ borderColor: activeRole.accentColor }}>
                  <Sparkle className="w-4 h-4 shrink-0 text-artis-orange mt-0.5" />
                  <p className="text-[11px] text-slate-300 font-mono font-bold leading-relaxed italic">
                    &ldquo;{activeRole.mantra}&rdquo;
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <span className="text-[8px] font-black uppercase text-slate-500 font-mono tracking-widest block">
                    Descripción Técnica Desglosada:
                  </span>
                  <p className="text-[11px] sm:text-[12px] text-slate-300 leading-relaxed font-sans">
                    {activeRole.description}
                  </p>
                </div>

                {/* Split grid for deliverables and software tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1.5">
                  {/* Key Deliverables list */}
                  <div className="space-y-2 bg-white/2 p-3.5 rounded border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-[8.5px] font-black text-artis-orange font-mono tracking-wider uppercase block mb-2.5">
                        📂 Entregables Clave de Gestión:
                      </span>
                      <ul className="space-y-2 text-[10px] text-slate-300 font-mono">
                        {activeRole.deliverables.map((item, i) => (
                          <li key={i} className="flex gap-2 items-start leading-snug">
                            <span className="text-artis-orange select-none shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Software and specialized tools */}
                  <div className="space-y-2 bg-white/2 p-3.5 rounded border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-[8.5px] font-black text-slate-400 font-mono tracking-wider uppercase block mb-2.5">
                        🛠 Herramientas y Software Preferido:
                      </span>
                      <ul className="space-y-2 text-[10px] text-slate-300 font-mono">
                        {activeRole.tools.map((tool, i) => (
                          <li key={i} className="flex gap-2 items-start leading-snug">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 text-slate-500`} />
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Common Data Environment Interaction Role */}
                <div className="bg-[#0b101c]/80 border border-white/5 p-3 rounded text-[10px] leading-relaxed">
                  <strong className="text-white font-mono uppercase tracking-widest text-[8px] block mb-1">
                    Interatividad en el Entorno Común de Datos (CDE):
                  </strong>
                  <p className="text-slate-300 font-sans">
                    {activeRole.cdeInteraction}
                  </p>
                </div>
              </div>

              {/* Bottom footer bar with certification */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-5 text-[8.5px] text-slate-500 font-mono tracking-wide">
                <span>MATRIZ SÍNTESIS DE RESPONSABILIDADES ISO 19650</span>
                <span className="text-artis-orange font-bold">ROL VERIFICADO [100% OK]</span>
              </div>

            </div>

          </div>
        ) : (
          /* RACI MATRIX SIMULATOR VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left side: Task checklist */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[8px] font-black uppercase text-slate-400 font-mono tracking-widest block">
                Tareas Contractuales del Ciclo de Vida:
              </span>

              <div className="flex flex-col gap-2">
                {RACI_TASKS.map((task, i) => {
                  const isSelected = i === clickedRaciTask;
                  return (
                    <button
                      key={i}
                      onClick={() => setClickedRaciTask(i)}
                      className={`text-left p-3.5 rounded border transition-all cursor-pointer flex justify-between items-center group ${
                        isSelected 
                          ? "bg-artis-orange/10 border-artis-orange/70 text-white" 
                          : "bg-white/2 border-white/5 text-slate-400 hover:bg-[#070b13] hover:text-white"
                      }`}
                    >
                      <div>
                        <h4 className={`text-xs font-mono font-black tracking-wide ${isSelected ? "text-artis-orange" : "text-white"}`}>
                          {task.task}
                        </h4>
                        <span className="text-[9.5px] text-slate-400 font-sans block mt-1 line-clamp-1 group-hover:line-clamp-none transition-all">
                          {task.desc}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Brief RACI definition */}
              <div className="bg-[#050912]/80 border border-white/5 p-3 rounded font-sans text-[10px] text-slate-400 leading-normal">
                <span className="text-[8.5px] font-bold text-white uppercase tracking-wider block mb-1">
                  ¿Que significan las siglas RACI?
                </span>
                <p>
                  <strong>[R] Responsable (Producer):</strong> Quien desarrolla físicamente la tarea. <strong className="text-artis-orange">[A] Aprobador (Accountable):</strong> Dueño último de la aprobación; aprueba el resultado. <strong>[C] Consultado (Consulted):</strong> Experto técnico que aporta datos para el sustento. <strong>[I] Informado (Informed):</strong> Quien debe recibir notificación de avances.
                </p>
              </div>
            </div>

            {/* Right side: Matrix Grid & Interactive simulator details */}
            <div className="lg:col-span-8 bg-[#040810]/95 border border-white/10 rounded-lg p-5 md:p-6 shadow-xl space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <Cpu className="w-5 h-5 text-artis-orange" />
                  <div>
                    <h3 className="text-sm font-black text-white font-mono tracking-wider uppercase leading-none">
                      MATRIZ RACI GENERAL DE INFRAESTRUCTURA BIM
                    </h3>
                    <span className="text-[10px] text-slate-400 font-sans mt-1 block">
                      Responsabilidades en el flujo de ingeniería para la tarea activa
                    </span>
                  </div>
                </div>

                {/* Subtitle task details information */}
                <div className="bg-[#09101e] border border-white/5 rounded p-4 space-y-1.5 text-left">
                  <span className="text-[8.5px] font-mono text-artis-orange font-bold uppercase tracking-wider block">
                    Proceso Seleccionado:
                  </span>
                  <h4 className="text-sm font-bold font-mono text-white leading-tight">
                    {RACI_TASKS[clickedRaciTask].task}
                  </h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed leading-normal">
                    {RACI_TASKS[clickedRaciTask].desc}
                  </p>
                </div>

                {/* Large horizontal visual indicator representing Roles and their RACI values */}
                <div className="space-y-2">
                  <span className="text-[8px] font-black uppercase text-slate-500 font-mono tracking-widest block">
                    Distribución de Roles de la Tarea:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { key: "client", label: "Promotor / Owner", state: RACI_TASKS[clickedRaciTask].client, colorClass: "text-[#deb887]", border: "border-[#deb887]/20", bg: "bg-[#deb887]/5" },
                      { key: "manager", label: "BIM Manager", state: RACI_TASKS[clickedRaciTask].manager, colorClass: "text-[#db2777]", border: "border-[#db2777]/20", bg: "bg-[#db2777]/5" },
                      { key: "coordinator", label: "Coordinador BIM", state: RACI_TASKS[clickedRaciTask].coordinator, colorClass: "text-[#38bdf8]", border: "border-[#38bdf8]/20", bg: "bg-[#38bdf8]/5" },
                      { key: "modeler", label: "Modelador BIM", state: RACI_TASKS[clickedRaciTask].modeler, colorClass: "text-[#ec4899]", border: "border-[#ec4899]/20", bg: "bg-[#ec4899]/5" },
                      { key: "resident", label: "Residente BIM", state: RACI_TASKS[clickedRaciTask].resident, colorClass: "text-[#fbbf24]", border: "border-[#fbbf24]/20", bg: "bg-[#fbbf24]/5" }
                    ].map((cell, idx) => {
                      const stateDetails = 
                        cell.state === "A" ? { name: "Aprobador Principal", styling: "bg-emerald-500/10 text-emerald-400 border-emerald-500/45", sub: "Aprueba el hito" } :
                        cell.state === "R" ? { name: "Responsable Directo", styling: "bg-artis-orange/15 text-artis-orange border-artis-orange/45", sub: "Ejecuta el trabajo" } :
                        cell.state === "C" ? { name: "Consultado Técnico", styling: "bg-sky-500/10 text-sky-400 border-sky-500/30", sub: "Sustenta/Aporta" } :
                        { name: "Informado Tácito", styling: "bg-slate-500/10 text-slate-400 border-slate-500/20", sub: "Recibe el hito" };

                      return (
                        <div 
                          key={cell.key}
                          className={`p-3.5 rounded border flex flex-col justify-between items-center text-center gap-2 ${cell.bg} ${cell.border}`}
                        >
                          <span className="text-[8.5px] font-mono font-bold text-slate-400 block tracking-wide truncate max-w-full">
                            {cell.label}
                          </span>

                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black border tracking-wider font-mono shadow-md ${stateDetails.styling}`}>
                            {cell.state}
                          </div>

                          <div>
                            <span className="text-[8px] font-mono font-black uppercase block leading-none">
                              {stateDetails.name}
                            </span>
                            <span className="text-[7.5px] text-slate-500 block font-sans mt-1">
                              {stateDetails.sub}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Comprehensive Matrix Table view of all tasks for ultimate scannability */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[8px] font-black uppercase text-slate-500 font-mono tracking-widest block">
                    Vista General Tabular RACI:
                  </span>

                  <div className="border border-white/5 rounded overflow-hidden">
                    <table className="w-full text-left text-[9.5px] border-collapse font-mono">
                      <thead className="bg-[#070d18] text-slate-400 uppercase text-[7px] tracking-wider border-b border-white/5">
                        <tr>
                          <th className="p-2 gap-1">Entregable Contractual</th>
                          <th className="p-2 text-center text-[#deb887]">Owner</th>
                          <th className="p-2 text-center text-[#db2777]">Manager</th>
                          <th className="p-2 text-center text-[#38bdf8]">Coordinador</th>
                          <th className="p-2 text-center text-[#ec4899]">Modelador</th>
                          <th className="p-2 text-center text-[#fbbf24]">Residente</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/2 text-slate-300">
                        {RACI_TASKS.map((t, i) => {
                          const isActive = i === clickedRaciTask;
                          return (
                            <tr 
                              key={i} 
                              onClick={() => setClickedRaciTask(i)}
                              className={`transition-colors cursor-pointer ${isActive ? "bg-white/5" : "hover:bg-white/2"}`}
                            >
                              <td className="p-2 font-bold truncate max-w-[150px] text-white">
                                {t.task}
                              </td>
                              <td className={`p-2 text-center font-black ${t.client === "R" ? "text-artis-orange" : t.client === "A" ? "text-emerald-400" : "text-slate-500"}`}>
                                {t.client}
                              </td>
                              <td className={`p-2 text-center font-black ${t.manager === "R" ? "text-artis-orange" : t.manager === "A" ? "text-emerald-400" : "text-slate-500"}`}>
                                {t.manager}
                              </td>
                              <td className={`p-2 text-center font-black ${t.coordinator === "R" ? "text-artis-orange" : t.coordinator === "A" ? "text-emerald-400" : "text-slate-500"}`}>
                                {t.coordinator}
                              </td>
                              <td className={`p-2 text-center font-black ${t.modeler === "R" ? "text-artis-orange" : t.modeler === "A" ? "text-emerald-400" : "text-slate-500"}`}>
                                {t.modeler}
                              </td>
                              <td className={`p-2 text-center font-black ${t.resident === "R" ? "text-artis-orange" : t.resident === "A" ? "text-emerald-400" : "text-slate-500"}`}>
                                {t.resident}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Status footer bar */}
              <div className="pt-4 border-t border-white/5 flex justify-between text-[8px] text-slate-500 font-mono uppercase">
                <span>Norma ISO 19650-1 & 2 Sección 5.4</span>
                <span className="text-artis-orange font-bold">Interconectividad Metodológica</span>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* Slide ISO integration note (Small margin spacing at very bottom) */}
      <div className="relative mt-6 pt-3 border-t border-white/5 flex justify-between items-center text-[7.5px] font-mono text-slate-500 tracking-wider uppercase select-none">
        <span>Artis Business School © BIM Management</span>
        <div className="flex gap-4">
          <span>Clase 2: Estructura Organizativa</span>
          <span className="text-white">Slide Especial</span>
        </div>
      </div>
    </div>
  );
};
