import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Lock, Unlock, FileText, Server, Cpu, Database, 
  Users, UserX, AlertTriangle, AlertCircle, FileSearch, ShieldAlert,
  ArrowRight, Lightbulb, RefreshCw, KeyRound, Terminal
} from 'lucide-react';

export const PoliticaSeguridadSlide = () => {
  const [activeSubTab, setActiveSubTab] = useState<'classification' | 'controls' | 'threats' | 'incidents'>('classification');
  
  // States for sub-interactive interfaces
  const [selectedFolder, setSelectedFolder] = useState<'01_wip' | '03_publi'>('01_wip');
  const [selectedLayer, setSelectedLayer] = useState<'hardware' | 'software' | 'procesos' | 'personal'>('hardware');
  const [selectedRisk, setSelectedRisk] = useState<string | null>('ransomware');
  const [incidentStep, setIncidentStep] = useState<number>(0);
  const [raidModalOpen, setRaidModalOpen] = useState<boolean>(false);
  const [polpModalOpen, setPolpModalOpen] = useState<boolean>(false);

  const containerCategories = {
    '01_wip': {
      title: "01_WIP (Work In Progress) - Privado",
      type: "Información Restringida / Privada",
      badgeColor: "bg-rose-500/20 text-rose-450 border-rose-500/30",
      icon: <Lock className="w-5 h-5 text-rose-500" />,
      assets: [
        "Modelos nativos federados y de especialidades (.rvt, .rte, .ifc)",
        "Scripts de automatización internos desarrollados en Python / Dynamo",
        "Matriz financiera y volumétrica de costos 5D del proyecto"
      ],
      description: "Representa el núcleo de diseño, la propiedad intelectual y el know-how técnico de TEDI. Su distribución no está permitida fuera de los diseñadores oficiales del consorcio.",
      riskText: "La filtración de este contenedor expone de forma directa el secreto comercial y la estrategia presupuestaria ante competidores o licitantes hostiles."
    },
    '03_publi': {
      title: "03_PUBLI (Published) - Público Interno",
      type: "Información Compartida / Pública Interna",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: <Unlock className="w-5 h-5 text-emerald-400" />,
      assets: [
        "Planos coordinados, acotados y formalmente validados en PDF",
        "Modelos IFC generales livianos de consulta visual",
        "Documentación general de montaje de obra y guías de terreno"
      ],
      description: "Este contenedor recopila los documentos aprobados por la mesa técnica y visados por el Coordinador BIM. Está diseñado para alimentar la faena física.",
      riskText: "Debe ser de fácil accesibilidad para ingenieros de terreno, capataces y contratistas MEP para asegurar la correcta constructibilidad y coordinación física."
    }
  };

  const layersInfo = {
    hardware: {
      title: "Caudal de Hardware",
      badge: "Redundancia Física",
      desc: "Implementación de servidores locales y perimetrales con sistemas redundantes de almacenamiento de discos (RAID 5 o RAID 10), respaldados por Sistemas de Alimentación Ininterrumpida (UPS).",
      action: "Protege las bases de datos de fallas abruptas en el suministro eléctrico que corrompan permanentemente la consistencia de los archivos federados."
    },
    software: {
      title: "Caudal de Software",
      badge: "Seguridad de Acceso",
      desc: "Uso obligatorio de Autenticación de Múltiples Factores (MFA) para cada usuario con acceso al CDE de TEDI, combinado con firewalls activos con inspección de paquetes.",
      action: "Previene que contraseñas débiles o capturadas de forma remota permitan a atacantes externos infiltrarse en el ecosistema común de datos."
    },
    procesos: {
      title: "Caudal de Procesos (PoLP)",
      badge: "Mínimo Privilegio",
      desc: "Aplicación rígida del Principio de Mínimo Privilegio (Principle of Least Privilege - PoLP). Los roles se mapean estrictamente en el CDE según la función asignada en el BEP.",
      action: "Nadie tiene acceso a carpetas ajenas. El modelador MEP no entra a estructuras nativas o matrices 5D, reduciendo drásticamente la superficie de error."
    },
    personal: {
      title: "Caudal de Personal",
      badge: "Custodia Legal",
      desc: "Uso de Acuerdos de Confidencialidad firmados formalmente (NDAs) antes de otorgar credenciales, complementado con capacitaciones recurrentes contra Phishing.",
      action: "Instruye la conducta humana para evitar que la ingeniería social sea la llave de entrada a ataques que secuestren o extraigan propiedad de TEDI."
    }
  };

  const commonRisks = [
    {
      id: "ransomware",
      title: "Ataques Cibernéticos (Ransomware)",
      impact: "Disponibilidad",
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      situation: "Un malware encripta de forma completa las carpetas compartidas en el CDE o el servidor local, denegando el acceso a todo el set de planos e IFCs.",
      prevention: "Copias de seguridad fuera de línea de forma aislada (Air-Gapped) y cortafuegos perimetrales actualizados de manera continua."
    },
    {
      id: "leak",
      title: "Fugas de Información (Ex-empleados)",
      impact: "Confidencialidad",
      icon: <UserX className="w-5 h-5 text-amber-500" />,
      situation: "Modeladores desvinculados de la empresa que mantienen credenciales activas descargan de forma masiva familias paramétricas y scripts Python protegidos.",
      prevention: "Política estricta de bajas de cuentas de ex-colaboradores y sistemas automatizados de DLP (Data Loss Prevention) en el CDE."
    },
    {
      id: "human",
      title: "Errores Humanos (Borrado Accidental)",
      impact: "Integridad",
      icon: <AlertTriangle className="w-5 h-5 text-orange-505" />,
      situation: "Un modelador de especialidades MEP borra inadvertidamente componentes federados o ductos coordinados del modelo central sin avisar.",
      prevention: "Segregación estricta de funciones de edición en el sistema y auditoría diaria de modelos coordinados federados."
    },
    {
      id: "tech_fault",
      title: "Fallos Tecnológicos (Sincronización)",
      impact: "Conexión",
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />,
      situation: "Pérdida súbita o desincronización parcial en la nube debido a altos picos de latencia en la conexión a internet de obra durante cargas simultáneas.",
      prevention: "Configurar SmartCache local interactivo y forzar verificaciones de hash para subidas robustas mediante el CDE."
    }
  ];

  return (
    <div className="relative h-full w-full bg-[#020610] text-[#cbd5e1] p-6 md:p-12 overflow-y-auto flex flex-col justify-between font-sans">
      <div className="absolute inset-0 immersive-grid opacity-15 pointer-events-none"></div>

      <div className="relative z-10 flex-grow flex flex-col max-w-6xl mx-auto w-full space-y-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500 font-mono text-[9px] uppercase tracking-[0.35em] font-black">
                CLASE 5: SEGURIDAD, CIBERSEGURIDAD Y PROPIEDAD INTELECTUAL
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
              1. Política de Seguridad <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 italic">BIM (ISO 27002)</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
              Nivel de Madurez Operativa: clasificación del CDE, blindaje técnico en cuatro capas, amenazas comunes y protocolo de mitigación frente a incidentes.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-1 bg-black/40 p-1 rounded border border-white/5 self-start md:self-auto text-[9.5px]">
            {(['classification', 'controls', 'threats', 'incidents'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubTab(sub)}
                className={`px-3 py-2 font-mono font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  activeSubTab === sub
                    ? 'bg-amber-500 text-artis-black shadow-lg font-black'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {sub === 'classification' ? 'A. Clasificación CDE' : 
                 sub === 'controls' ? 'B. Controles ISO' : 
                 sub === 'threats' ? 'C. Riesgos Comunes' : 
                 'D. Protocolo Incidentes'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Box */}
        <AnimatePresence mode="wait">
          
          {/* TAP A: CLASIFICACIÓN DE CONTENEDORES */}
          {activeSubTab === 'classification' && (
            <motion.div
              key="classification"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 bg-amber-500/5 rounded border border-amber-500/25 text-left">
                <span className="text-[10px] font-mono font-bold text-amber-500 block mb-1">A. CLASIFICACIÓN DE CONTENEDORES CDE</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Para un BIM Manager, la información no tiene un valor uniforme. Los contenedores del Entorno Común de Datos (CDE) deben estructurarse según el principio de confidencialidad para proteger la propiedad intelectual sin obstruir los frentes de trabajo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Selector Pane */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 text-left">Categoría de Datos:</span>
                  
                  <button
                    onClick={() => setSelectedFolder('01_wip')}
                    className={`p-4 rounded border text-left transition-all flex items-start gap-4 cursor-pointer ${
                      selectedFolder === '01_wip'
                        ? 'bg-rose-500/10 border-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                        : 'bg-black/30 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded ${selectedFolder === '01_wip' ? 'bg-rose-500/20' : 'bg-white/5'}`}>
                      <Lock className={`w-5 h-5 ${selectedFolder === '01_wip' ? 'text-rose-550' : 'text-slate-500'}`} />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-black uppercase text-white block mb-0.5">01_WIP — RESTRINGIDO</span>
                      <p className="text-[10.5px] text-slate-450 leading-snug">Archivos nativos de TEDI, Dynamo, Python e ingeniería analítica.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedFolder('03_publi')}
                    className={`p-4 rounded border text-left transition-all flex items-start gap-4 cursor-pointer ${
                      selectedFolder === '03_publi'
                        ? 'bg-emerald-500/10 border-emerald-550 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-black/30 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded ${selectedFolder === '03_publi' ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                      <Unlock className={`w-5 h-5 ${selectedFolder === '03_publi' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-black uppercase text-white block mb-0.5">03_PUBLI — COMPARTIDO</span>
                      <p className="text-[10.5px] text-slate-450 leading-snug">Planos aprobados en PDF, IFCs coordinados para la obra.</p>
                    </div>
                  </button>
                </div>

                {/* Display Details Pane */}
                <div className="md:col-span-7 bg-[#050b18] p-6 rounded border border-white/5 flex flex-col justify-between text-left space-y-4">
                  <div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">DETALLES DEL TRATAMIENTO DE DATOS</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${containerCategories[selectedFolder].badgeColor}`}>
                        {containerCategories[selectedFolder].type}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2">
                      {containerCategories[selectedFolder].icon}
                      {containerCategories[selectedFolder].title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                      {containerCategories[selectedFolder].description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Activos Incluidos:</span>
                      <ul className="space-y-1.5">
                        {containerCategories[selectedFolder].assets.map((as, idx) => (
                          <li key={idx} className="flex gap-2 items-start text-[11px] text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{as}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`p-4 rounded border font-sans text-xs ${
                    selectedFolder === '01_wip' ? 'bg-rose-500/5 border-rose-500/25 text-rose-300' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                  }`}>
                    <strong>Directiva del BIM Manager:</strong> {containerCategories[selectedFolder].riskText}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAP B: CONTROLES EN 4 CAPAS */}
          {activeSubTab === 'controls' && (
            <motion.div
              key="controls"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 bg-amber-500/5 rounded border border-amber-500/25 text-left">
                <span className="text-[10px] font-mono font-bold text-amber-500 block mb-1">B. CONTROLES DE SEGURIDAD (CONTROLES ISO 27002, 8.1 AL 8.5)</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Para blindar la integridad del proyecto y detener ataques maliciosos o errores operacionales graves, el BIM Manager despliega salvaguardas estructuradas que cubren servidores, entornos, permisos y comportamiento del usuario:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* 4 layer selector columns */}
                <div className="lg:col-span-5 flex flex-col gap-2.5">
                  {(['hardware', 'software', 'procesos', 'personal'] as const).map((layer) => (
                    <button
                      key={layer}
                      onClick={() => setSelectedLayer(layer)}
                      className={`p-3.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer group ${
                        selectedLayer === layer
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                          : 'bg-black/30 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-sm ${selectedLayer === layer ? 'bg-amber-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                          {layer === 'hardware' && <Server className="w-4 h-4" />}
                          {layer === 'software' && <Cpu className="w-4 h-4" />}
                          {layer === 'procesos' && <Database className="w-4 h-4" />}
                          {layer === 'personal' && <Users className="w-4 h-4" />}
                        </div>
                        <span className="text-xs font-mono font-extrabold uppercase tracking-widest">{layersInfo[layer].title}</span>
                      </div>
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded uppercase ${
                        selectedLayer === layer ? 'bg-amber-500/20 text-amber-550 font-bold border border-amber-500/30' : 'bg-transparent text-slate-600'
                      }`}>
                        {layersInfo[layer].badge}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Display screen */}
                <div className="lg:col-span-7 bg-[#050b18] p-6 rounded border border-white/5 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">DIRECTIVA TÉCNICA CAPA {selectedLayer.toUpperCase()}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-black/40 border border-white/5 font-mono text-amber-500 font-bold uppercase">
                        ISO 27002 APP
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white uppercase font-mono tracking-tight flex items-center gap-2">
                      {selectedLayer === 'hardware' && <Server className="w-4 h-5 text-amber-500" />}
                      {selectedLayer === 'software' && <Cpu className="w-4 h-5 text-amber-500" />}
                      {selectedLayer === 'procesos' && <Database className="w-4 h-5 text-amber-500" />}
                      {selectedLayer === 'personal' && <Users className="w-4 h-5 text-amber-500" />}
                      {layersInfo[selectedLayer].title}
                    </h3>

                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {selectedLayer === 'hardware' ? (
                          <>
                            Implementación de servidores locales y perimetrales con sistemas redundantes de almacenamiento de discos (
                            <button
                              onClick={() => setRaidModalOpen(true)}
                              className="text-amber-400 hover:text-amber-350 font-black underline decoration-amber-500/60 decoration-2 underline-offset-2 hover:decoration-amber-300 cursor-pointer transition-all duration-200"
                            >
                              RAID 5 o RAID 10
                            </button>
                            ), respaldados por Sistemas de Alimentación Ininterrumpida (UPS).
                          </>
                        ) : selectedLayer === 'procesos' ? (
                          <>
                            Aplicación rígida del Principio de Mínimo Privilegio (
                            <button
                              onClick={() => setPolpModalOpen(true)}
                              className="text-amber-400 hover:text-amber-350 font-black underline decoration-amber-500/60 decoration-2 underline-offset-2 hover:decoration-amber-300 cursor-pointer transition-all duration-200"
                            >
                              Principle of Least Privilege - PoLP
                            </button>
                            ). Los roles se mapean estrictamente en el CDE según la función asignada en el BEP.
                          </>
                        ) : (
                          layersInfo[selectedLayer].desc
                        )}
                      </p>
                      <div className="p-3.5 bg-black/45 rounded border border-white/5 flex items-start gap-2.5 text-[11px] leading-relaxed text-slate-400 font-sans">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Impacto Operativo:</strong> {layersInfo[selectedLayer].action}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/5 rounded border border-amber-500/10 text-[10px] text-zinc-400 font-sans italic leading-tight">
                    📌 <strong>Nota Pedagógica:</strong> Su rol como BIM Manager no es programar firewalls, sino dictaminar contractualmente los privilegios (
                    <button
                      onClick={() => setPolpModalOpen(true)}
                      className="text-amber-400 hover:text-amber-350 font-black not-italic underline decoration-amber-500/60 decoration-2 underline-offset-2 hover:decoration-amber-300 cursor-pointer transition-all duration-200 uppercase font-mono text-[9px]"
                    >
                      PoLP
                    </button>
                    ) y requerir los blindajes físicos en el BEP.
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAP C: RIESGOS Y AMENAZAS */}
          {activeSubTab === 'threats' && (
            <motion.div
              key="threats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 bg-amber-500/5 rounded border border-amber-500/25 text-left">
                <span className="text-[10px] font-mono font-bold text-amber-500 block mb-1">C. RIESGOS Y AMENAZAS COMUNES EN LA GESTIÓN BIM</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Ignore la falsa sensación de inmunidad en construcción. Los modelos federados son sistemas masivos de datos que heredan riesgos cibernéticos y operacionales que atentan contra la confidencialidad, integridad y disponibilidad del proyecto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {commonRisks.map((risk) => (
                  <button
                    key={risk.id}
                    onClick={() => setSelectedRisk(risk.id)}
                    className={`p-4 rounded-lg border text-left flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
                      selectedRisk === risk.id
                        ? 'bg-rose-500/10 border-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                        : 'bg-black/30 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className="p-2 rounded bg-black/40 border border-white/5 shrink-0">
                        {risk.icon}
                      </div>
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                        risk.impact === 'Confidencialidad' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' : 
                        risk.impact === 'Integridad' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' : 
                        risk.impact === 'Disponibilidad' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                      }`}>
                        Afecta: {risk.impact}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-tight mb-1">{risk.title}</h4>
                      <p className="text-[10.5px] text-slate-400 leading-snug line-clamp-2">
                        {risk.situation}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail display panel for selected risk */}
              {selectedRisk && (
                <div className="p-5 bg-[#030610] rounded border border-white/5 text-left flex flex-col md:flex-row gap-6 items-center">
                  <div className="p-4 rounded-full bg-rose-500/5 border border-rose-500/20 shrink-0">
                    {commonRisks.find(r => r.id === selectedRisk)?.icon}
                  </div>
                  <div className="space-y-2 flex-grow">
                    <span className="text-[8.5px] font-mono uppercase text-rose-500 tracking-widest block font-extrabold">CASO DE ESTUDIO ACTIVO</span>
                    <h4 className="text-sm font-bold text-white uppercase font-mono">
                      {commonRisks.find(r => r.id === selectedRisk)?.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      <strong>Escenario de Fallo:</strong> {commonRisks.find(r => r.id === selectedRisk)?.situation}
                    </p>
                    <div className="p-3 bg-black/40 rounded border border-white/5 text-xs text-slate-400 flex items-center gap-2">
                      <strong className="text-emerald-400 shrink-0 font-mono text-[10px]">PREVENCIÓN REQUERIDA:</strong>
                      <span className="font-sans text-[11px]">{commonRisks.find(r => r.id === selectedRisk)?.prevention}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAP D: CONSECUENCIAS E PROTOCOLO INCIDENTES */}
          {activeSubTab === 'incidents' && (
            <motion.div
              key="incidents"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 bg-red-500/5 rounded border border-red-500/25 text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-rose-500 block mb-1">
                  D. CONSECUENCIAS DE INCUMPLIMIENTO Y MANEJO DE INCIDENTES (ISO 27002)
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  El protocolo de incidentes exige que ante una violación (como compartir voluntaria o involuntariamente contraseñas con subcontratistas externos), el BIM Manager reaccione aislando de inmediato al sospechoso, cancelando tokens y auditando los Logs. Siga la simulación interactiva:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Simulator Interactive panel */}
                <div className="lg:col-span-8 bg-[#030814]/95 p-6 rounded border border-white/5 text-left flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-rose-455 font-black uppercase tracking-wider block mb-1.5 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      Protocolo de Reacción Rígido frente a Filtraciones
                    </span>
                    <h3 className="text-base font-black text-rose-500 uppercase tracking-tight font-mono mb-2">Simulador de Control de Daños</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-4">
                      Establezca el paso a paso metodológico dispuesto por la norma para aislar la cuenta comprometida de forma segura:
                    </p>

                    <div className="p-4 bg-black/65 rounded border border-white/5 space-y-4 min-h-[190px] flex flex-col justify-between relative overflow-hidden">
                      {incidentStep === 1 && (
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-rose-500/80 shadow-[0_0_10px_rgba(239,68,68,1)] animate-scanline"></div>
                      )}

                      <div className="flex justify-between items-center text-[8.5px] font-mono border-b border-white/5 pb-2">
                        <span className="text-zinc-500 font-mono">FASE DEL PROTOCOLO DE INCIDENTES:</span>
                        <span className={`font-black ${
                          incidentStep === 0 ? 'text-yellow-500 animate-pulse' :
                          incidentStep === 1 ? 'text-red-500 animate-pulse' :
                          incidentStep === 2 ? 'text-amber-500 animate-pulse' :
                          'text-emerald-400'
                        }`}>
                          {incidentStep === 0 && '⚠️ ESCENARIO: EXPOSICIÓN DE CREDENCIALES'}
                          {incidentStep === 1 && '🚨 ACCIÓN 01: DETECTAR Y MAPEAR'}
                          {incidentStep === 2 && '🛡️ ACCIÓN 02: AISLAMIENTO PREVENTIVO'}
                          {incidentStep === 3 && '🔎 ACCIÓN 03: REGISTROS DE CAMBIOS (LOGS)'}
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center py-2 text-left">
                        {incidentStep === 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-black text-white uppercase font-mono">El Descontrol Inicial:</h4>
                            <p className="text-[11.5px] text-slate-350 font-sans leading-relaxed">
                              &quot;Un modelador comparte sus claves de acceso al CDE por WhatsApp con subcontratistas externos para 'aligerar la descarga'. Un malware o intermediario captura el token de sesión.&quot;
                            </p>
                            <span className="text-[9.5px] font-mono text-amber-500 uppercase font-bold block bg-amber-500/5 p-2 rounded border border-amber-500/15">
                              ⚠️ Consecuencia: Cualquier usuario externo puede descargar o corromper modelos nativos .rvt y la matriz 5D.
                            </span>
                          </div>
                        )}

                        {incidentStep === 1 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-rose-500 uppercase flex items-center gap-1.5 font-mono">
                              Anomalías de Acceso Concurrentes
                            </h4>
                            <p className="text-[11.5px] text-slate-350 font-sans leading-relaxed">
                              El sistema de alerta del CDE detecta que la cuenta del modelador MEP está descargando masivamente archivos nativos desde una IP internacional no registrada en el BEP.
                            </p>
                            <div className="p-2 bg-red-950/20 text-rose-455 font-mono text-[9px] rounded border border-red-500/20">
                              SYS_LOGGER [WARN]: Descargas simultáneas de 01_WIP desde IPs simultáneas externas (MFA omitido temporalmente).
                            </div>
                          </div>
                        )}

                        {incidentStep === 2 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-amber-500 uppercase flex items-center gap-1.5 font-mono">
                              Aislamiento Preventivo del Usuario
                            </h4>
                            <p className="text-[11.5px] text-slate-350 font-sans leading-relaxed">
                              Aplicación estricta de mitigación ISO 27002: suspender token del modelador MEP, forzar cierre de sesiones activas e invalidar permisos de forma provisional.
                            </p>
                            <div className="p-2 bg-amber-500/10 text-amber-505 font-mono text-[9px] rounded border border-amber-500/25">
                              SYS_LOGGER [REVOKE]: Sesiones finalizadas de inmediato. Descargas congeladas de manera exitosa.
                            </div>
                          </div>
                        )}

                        {incidentStep === 3 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5 font-mono">
                              Auditoría y Análisis Forense (Logs)
                            </h4>
                            <p className="text-[11.5px] text-slate-350 font-sans leading-relaxed">
                              El BIM Manager analiza minuciosamente el historial logístico (Logs) para rastrear qué archivos fueron sustraídos o si hubo borrados accidentales de elementos estructurados.
                            </p>
                            <div className="p-2 bg-emerald-950/10 text-emerald-400 font-mono text-[9px] rounded border border-emerald-500/20">
                              RESULTS_AUDIT [COMPLETED]: Modelos intactos debido a bloqueos paramétricos. Se notifica llamada disciplinaria.
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 border-t border-white/5 pt-3">
                        <button
                          onClick={() => setIncidentStep(0)}
                          className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded border transition-all cursor-pointer border-white/10 ${
                            incidentStep === 0 ? 'bg-zinc-800 text-slate-400' : 'bg-transparent text-slate-500 hover:text-white'
                          }`}
                        >
                          Reiniciar
                        </button>
                        <button
                          onClick={() => setIncidentStep(prev => Math.min(prev + 1, 3))}
                          disabled={incidentStep === 3}
                          className={`flex-1 py-1.5 text-[9.5px] font-mono font-black uppercase tracking-wider rounded-sm text-center cursor-pointer ${
                            incidentStep === 3 
                              ? 'bg-emerald-500/25 text-emerald-400 cursor-not-allowed opacity-50' 
                              : 'bg-amber-500 hover:bg-amber-600 text-artis-black shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                          }`}
                        >
                          {incidentStep === 0 && 'Gatillar Ataque / Fuga 💥'}
                          {incidentStep === 1 && 'Aplicar Bloqueo de Cuenta / Aislamiento 🛡️'}
                          {incidentStep === 2 && 'Inspeccionar Informes de Auditoría de Logs 🔎'}
                          {incidentStep === 3 && 'Amenaza Controlada Satisfactoriamente'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side panels */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-4 text-left">
                  <div className="bg-[#050b18]/60 p-5 rounded border border-white/5 space-y-2 flex-1">
                    <span className="text-[9px] font-mono text-rose-500 font-bold uppercase block tracking-wider">CONSECUENCIAS DE NEGLIGENCIA</span>
                    <h4 className="text-xs font-black text-white uppercase font-mono">Impacto en la Operación</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Compartir credenciales invalida los seguros de ingeniería civil (Professional Indemnity Insurance) ante colapso estructural posterior, e invalida la custodia de datos necesaria para certificar la entrega final del as-built.
                    </p>
                  </div>

                  <div className="bg-amber-500/5 p-5 border border-amber-500/20 rounded space-y-2 flex-1">
                    <span className="text-[9px] font-mono text-amber-500 font-extrabold block tracking-wider uppercase">SELLO CRIPTOGRÁFICO INMUTABLE</span>
                    <h4 className="text-xs font-black text-white uppercase font-mono">Auditoría Obligatoria de Logs</h4>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                      La ISO 27052 exige que cada transacción o commit sobre el CDE mantenga un timestamp inmutable y registro de IP. Ante disputas legales por defectos estructurales, este rastro es la primera prueba técnica.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* PERSISTENT TIPS FOR THE BIM MANAGER */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded text-left shadow-md">
          <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            TIPS PEDAGÓGICOS: GESTIÓN DE POLÍTICAS DEL CDE
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px] leading-relaxed text-slate-300 font-sans">
            <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
              <h5 className="font-bold text-amber-500 uppercase mb-1">CLASIFICACIÓN DEL CDE (ISO 19650)</h5>
              <p>
                La estructuración de contenedores no debe ser una barrera compleja. Defina desde las bases de licitación quién y cuándo accede a WIP o PUBLI. Una restricción ciega reduce la agilidad diaria, mientras que la entrega descuidada obsequia el know-how patentado de TEDI.
              </p>
            </div>
            <div className="bg-[#040c1c]/40 p-3 rounded border border-white/[0.03]">
              <h5 className="font-bold text-emerald-400 uppercase mb-1">AUDITORÍA E INMUTABILIDAD DE CAMBIOS</h5>
              <p>
                Asegúrese de estipular en el BEP revisiones periódicas a los ficheros de log de commits. Esto no es para monitorizar horas hombre, sino para construir un rastro técnico inalterable frente a eventuales reclamaciones futuras de seguros por colisiones u omisiones graves.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Modals for technical glossary terms */}
      <AnimatePresence>
        {raidModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setRaidModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#030917] border border-amber-500/40 rounded-xl p-6 md:p-8 text-left shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-widest block mb-1">GLOSARIO TECNOLÓGICO</span>
                  <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Server className="w-5 h-5 text-amber-500 animate-pulse" />
                    Sistemas Redundantes: RAID 5 vs. RAID 10
                  </h3>
                </div>
                <button
                  onClick={() => setRaidModalOpen(false)}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-mono border border-white/5"
                >
                  ✕ CERRAR
                </button>
              </div>

              {/* Content body */}
              <div className="space-y-6 text-sm">
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  En la gestión de proyectos BIM, un servidor local de archivos federados o una caché local de alta velocidad requiere resguardar la disponibilidad ininterrumpida frente a fallas físicas de discos rígidos. He aquí la comparativa técnica:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* RAID 5 */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold">RAID 5</span>
                      <h4 className="font-bold text-white uppercase text-xs font-mono">Paridad Distribuida</h4>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                      Distribuye los datos junto con bloques de cálculo de redundancia (paridad) a lo largo de un mínimo de <strong className="text-amber-500">3 discos</strong>. Si un disco cualquiera falla, la información se recalcula en tiempo real.
                    </p>
                    <div className="text-[10.5px] space-y-1 text-slate-400 font-sans border-t border-white/5 pt-2">
                      <div>🟢 <strong className="text-slate-350">Ventaja:</strong> Alta eficiencia de almacenamiento (se aprovecha la capacidad total menos 1 disco).</div>
                      <div>🔴 <strong className="text-slate-350">Límite:</strong> El proceso de reconstrucción tras fallo es lento y disminuye drásticamente el rendimiento operativo.</div>
                    </div>
                  </div>

                  {/* RAID 10 */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">RAID 10 (1+0)</span>
                      <h4 className="font-bold text-white uppercase text-xs font-mono">Espejo Dividido</h4>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                      Combina el reflejo de datos (espejo) y la división acelerada en un mínimo de <strong className="text-emerald-400">4 discos</strong>. Los datos se duplican en pares y se escribe en ellos en paralelo para máxima velocidad.
                    </p>
                    <div className="text-[10.5px] space-y-1 text-slate-400 font-sans border-t border-white/10 pt-2">
                      <div>🟢 <strong className="text-slate-350">Ventaja:</strong> Desempeño sobresaliente y reconstrucción veloz y segura de discos. Mayor tolerancia a fallos múltiples.</div>
                      <div>🔴 <strong className="text-slate-350">Límite:</strong> Alta inversión (solo se utiliza el 50% de la capacidad bruta para datos, el resto es espejo).</div>
                    </div>
                  </div>
                </div>

                {/* BIM Advisor footer */}
                <div className="p-4 bg-amber-500/5 rounded border border-amber-500/15 text-[11px] text-slate-300 font-sans leading-relaxed">
                  💡 <strong>Recomendación del Consultor:</strong> Para el servidor común de datos o base de datos de modelos activos centralizada de TEDI, emplee <strong className="text-amber-500 font-bold">RAID 10</strong> por su rendimiento en escrituras recurrentes de gran caudal. Utilice <strong className="text-amber-400 font-bold">RAID 5</strong> para silos históricos de almacenamiento en frío por su costo optimizado.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {polpModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setPolpModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-xl bg-[#030917] border border-amber-500/40 rounded-xl p-6 md:p-8 text-left shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-widest block mb-1">FILOSOFÍA DE ACCESO AL CDE</span>
                  <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Database className="w-5 h-5 text-amber-500 animate-pulse" />
                    Principio de Mínimo Privilegio (PoLP)
                  </h3>
                </div>
                <button
                  onClick={() => setPolpModalOpen(false)}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-mono border border-white/5"
                >
                  ✕ CERRAR
                </button>
              </div>

              {/* Content body */}
              <div className="space-y-4 text-xs font-sans text-slate-300 leading-relaxed">
                <p>
                  El <strong>Principio de Mínimo Privilegio (Principle of Least Privilege - PoLP)</strong> es la directiva fundamental de seguridad que estipula que a un usuario se le debe otorgar únicamente las facultades y permisos estrictamente indispensables para llevar a cabo sus tareas profesionales.
                </p>

                <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
                  <h4 className="font-mono font-bold text-white uppercase text-[10px]">Implementación Estratégica en el CDE</h4>
                  <p className="text-slate-450 text-[11px]">
                    Bajo este criterio, el BIM Manager diseña perfiles jerárquicos sumamente delimitados en lugar de otorgar accesos irrestrictos colectivos:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0 font-mono text-[9px] font-bold">A</div>
                    <div>
                      <strong className="text-white font-mono text-[11px] block">Aislamiento MEP / Estructuras</strong>
                      El modelador sanitario o eléctrico solo accede con privilegios de modificación a sus contenedores asignados en WIP, imposibilitado de sobreescribir o dañar los modelos nativos de hormigones/estructuras principales.
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0 font-mono text-[9px] font-bold">B</div>
                    <div>
                      <strong className="text-white font-mono text-[11px] block">Acceso Externo Blindado</strong>
                      Mandantes, supervisores de terreno y auditores externos operan bajo licencias puras de lectura e inspección visual IFC sobre el contenedor <strong className="text-emerald-400">03_PUBLI</strong>, bloqueándoles cambios de archivo.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-500/5 rounded border border-amber-500/15 text-slate-400 text-[10.5px]">
                  📌 <strong>Rol del BIM Manager:</strong> No diseña el cortafuegos perimetral, sino que redacta contractualmente dentro del BEP la matriz formal que limita los accesos según funciones validadas del personal.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
