import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, Unlock, Eye, EyeOff, CheckCircle2, AlertTriangle, HelpCircle, 
  ShieldAlert, Key, Database, RefreshCw, FileText, Smartphone, Wifi, 
  WifiOff, Server, AlertCircle, Lightbulb, UserCheck, ShieldCheck, Info,
  ArrowRight
} from 'lucide-react';

interface SecurityItem {
  id: string;
  title: string;
  compromisedText: string;
  threatDesc: string;
  defenseDesc: string;
  controlCode: string;
}

export const SeguridadBimSlide = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'simulator' | 'iso'>('intro');
  const [selectedPillar, setSelectedPillar] = useState<'C' | 'I' | 'A'>('C');
  const [status, setStatus] = useState<Record<'C' | 'I' | 'A', 'SECURE' | 'BREACHED'>>({
    C: 'SECURE',
    I: 'SECURE',
    A: 'SECURE'
  });
  
  const [selectedTriangleNode, setSelectedTriangleNode] = useState<'C' | 'I' | 'A'>('C');
  const [incidentStep, setIncidentStep] = useState<number>(0);
  const [selectedFolder, setSelectedFolder] = useState<'01_wip' | '03_publi'>('01_wip');
  const [selectedControlLayer, setSelectedControlLayer] = useState<'hardware' | 'software' | 'procesos' | 'personal'>('hardware');

  const triangleExplanations = {
    C: {
      title: "Pilar C: Confidencialidad en BIM",
      concept: "Acceso Exclusivo y Propiedad Intelectual",
      desc: "Protege los metadatos contractuales, presupuestos analíticos y familias paramétricas de diseño exclusivas de la empresa contra copia no autorizada o espionaje industrial.",
      impact: "La fuga de información reduce el margen de rentabilidad durante las licitaciones públicas y regala desarrollo de ingeniería patentada a la competencia."
    },
    I: {
      title: "Pilar I: Integridad del Modelo",
      concept: "Exactitud Paramétrica y Coordinación",
      desc: "Asegura que los objetos constructivos (columnas, vigas, ductos MEP) se mantengan inalterados salvo por cambios autorizados y registrados en el Common Data Environment (CDE).",
      impact: "Una pérdida de integridad (p. ej., reducir la dimensión de una viga estructural de forma unilateral) causa colisiones críticas no detectadas o riesgos severos en obra."
    },
    A: {
      title: "Pilar A: Disponibilidad de Datos",
      concept: "Continuidad del Flujo de Información",
      desc: "Garantiza el libre acceso de ingenieros, supervisores y operadores de terreno a los planos revisados e IFCs federados, sin importar fallas de red local.",
      impact: "La falta de planos actualizados en faena detiene cuadrillas completas y maquinaria pesada, traduciéndose en penalizaciones contractuales y altos sobrecostos diarios."
    }
  };

  // Simulation data for threats/defenses based directly on BIM risk curriculum
  const ciaScenarios = {
    C: {
      title: "Confidencialidad",
      threat: "Fugas de Información: Ex-empleados que descargan librerías paramétricas",
      threatDesc: "Un modelador desvinculado de la empresa que mantiene sus credenciales activas descarga de forma masiva familias paramétricas patentadas de TEDI, scripts en Python (01_WIP) y la matriz de costos 5D del CDE.",
      consequence: "Pérdida de ventaja comercial estratégica en futuras licitaciones públicas. Competidores ganan acceso al know-how confidencial y presupuestario de TEDI.",
      isoControl: "ISO 27002 Control 5.15 (Control de Acceso) & 5.33 (Criptografía)",
      solution: "Anular de inmediato los accesos ante desvinculaciones. Configurar alertas DLP de descarga masiva en el CDE y cifrar metadatos del presupuesto.",
      color: "from-rose-500 to-red-600",
      accentBg: "bg-rose-500/10 border-rose-500/30 text-rose-450",
      successText: "Control de Acceso (5.15) activo. Acceso revocado de inmediato para ex-empleados. Matriz de costos cifrada bajo AES-256."
    },
    I: {
      title: "Integridad",
      threat: "Errores Humanos: Borrado accidental de elementos federados",
      threatDesc: "Un modelador MEP borra o edita accidentalmente tuberías principales vinculadas o el paso por vigas de hormigón ST-04, rompiendo la consistencia paramétrica coordinada sin dar aviso.",
      consequence: "La pérdida de coherencia del modelo federado genera colisiones críticas en obra no detectadas y sobrecostos por demolición o detención física de faena.",
      isoControl: "ISO 27002 Control 5.3 (Segregación de funciones) & 8.12 (Control de versiones)",
      solution: "Implementar segregación rigurosa de funciones en el CDE. Bloqueo paramétrico automático: elementos validados estructurales solo se editan con firma digital del Ingeniero Estructural.",
      color: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-500/10 border-amber-500/30 text-amber-550",
      successText: "Control de cambios estricto activo. Los elementos del CDE están protegidos contra edición accidental no autorizada. Auditoría de versiones activa."
    },
    A: {
      title: "Disponibilidad",
      threat: "Ataques Cibernéticos: Ransomware que encripte el servidor",
      threatDesc: "Un ataque de Ransomware gatillado por un email de Phishing cifra por completo la base de datos centralizada del CDE en la nube, congelando todo el set de planos e IFCs.",
      consequence: "Paro operacional absoluto en los frentes de excavaciones y montaje, costando miles de dólares por cada día de faena inmovilizada por falta de planos.",
      isoControl: "ISO 27002 Control 8.14 (Redundancia de red) e ISO 27001 (Continuidad)",
      solution: "Servidores con redundancia de discos (RAID) y copias de seguridad desconectadas de internet (Air-Gapped). Almacenar SmartCache local offline en tablets de terreno.",
      color: "from-emerald-500 to-teal-500",
      accentBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-450",
      successText: "Redundancia de datos y caché offline operativa. Acceso a planos garantizado aun si el servidor principal es encriptado."
    }
  };

  const handleSimulateThreat = (pillar: 'C' | 'I' | 'A') => {
    setStatus(prev => ({ ...prev, [pillar]: 'BREACHED' }));
  };

  const handleApplySafeguard = (pillar: 'C' | 'I' | 'A') => {
    setStatus(prev => ({ ...prev, [pillar]: 'SECURE' }));
  };

  return (
    <div className="relative h-full w-full bg-artis-black text-white p-6 md:p-12 overflow-y-auto flex flex-col justify-between font-sans">
      {/* Immersive background grids */}
      <div className="absolute inset-0 immersive-grid opacity-15 pointer-events-none"></div>

      <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500 font-mono text-[9px] uppercase tracking-[0.35em] font-black">
                CLASE 5: SEGURIDAD, CIBERSEGURIDAD Y PROPIEDAD INTELECTUAL
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
              Seguridad y Ciberseguridad <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 italic">BIM (ISO 27002)</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
              Modelos digitales no son meros dibujos, son activos estratégicos de información. Descubra cómo aplicar la norma para proteger su negocio de colapsos estructurales, fugas mercantiles u paros operativos.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5 bg-black/40 p-1 rounded-md border border-white/5 self-start md:self-auto">
            {(['intro', 'simulator', 'iso'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-[9.5px] font-mono font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-amber-500 text-artis-black shadow-lg font-black'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab === 'intro' ? '1. Tríada CIA' : tab === 'simulator' ? '2. Simulador de Riesgos' : '3. Controles ISO 27052'}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL SEGÚN LA PESTAÑA */}
        <AnimatePresence mode="wait">
          {activeTab === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 bg-amber-500/5 rounded border border-amber-500/20 text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-amber-500 block mb-1">FUNDAMENTO PRINCIPAL</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Explica a tus alumnos que, según los fundamentos de seguridad de la información, los datos de un proyecto no se protegen militarmente simplemente &quot;porque sí&quot;. Se resguardan para garantizar <strong>tres cualidades inmutables (la Tríada CIA)</strong>, sin importar si los datos se plasman en un plano impreso llevado en el maletín de obra o se alojan en un moderno clúster en la nube de Azure:
                </p>
              </div>

              {/* The CIA Triad interactive layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Confidentiality card */}
                <div 
                  onClick={() => { setSelectedPillar('C'); setActiveTab('simulator'); }}
                  className="bg-[#050b18]/60 p-6 rounded border border-white/5 hover:border-rose-500/40 transition-all cursor-pointer text-left relative group hover:shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                >
                  <div className="absolute top-4 right-4 text-rose-500/10 group-hover:text-rose-500/20 transition-all">
                    <EyeOff className="w-16 h-16 stroke-[1]" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                      <Lock className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-white font-mono tracking-tight">1. Confidencialidad</h4>
                      <span className="text-[9px] font-mono text-rose-450 uppercase font-black tracking-wider">Acceso Restringido</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Garantiza que únicamente el personal interno y previamente autorizado tenga acceso a los datos. Evita la fuga de metadatos comerciales, listas de costos analíticos o familias de diseño paramétricas patentadas de la empresa.
                  </p>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] font-mono">
                    <span className="text-rose-400 font-bold">Riesgo Real TEDI:</span> Filtración del presupuesto del Proyecto Horizonte a licitadores externos.
                  </div>
                </div>

                {/* Integrity card */}
                <div 
                  onClick={() => { setSelectedPillar('I'); setActiveTab('simulator'); }}
                  className="bg-[#050b18]/60 p-6 rounded border border-white/5 hover:border-amber-500/40 transition-all cursor-pointer text-left relative group hover:shadow-[0_0_20px_rgba(245,158,11,0.05)]"
                >
                  <div className="absolute top-4 right-4 text-amber-500/10 group-hover:text-amber-500/20 transition-all">
                    <Shield className="w-16 h-16 stroke-[1]" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-white font-mono tracking-tight">2. Integridad</h4>
                      <span className="text-[9px] font-mono text-amber-500 uppercase font-bold tracking-wider">Exactitud Absoluta</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Asegura que los datos sean milimétricamente exactos, consistentes y no hayan sido alterados maliciosamente, o modificados por mero error técnico sin coordinación ni aprobación previa del responsable clave.
                  </p>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] font-mono">
                    <span className="text-amber-400 font-bold font-black">Riesgo Real TEDI:</span> Modificación arbitraria de viga ST-04 para pasar climatización sin visto bueno del calculista.
                  </div>
                </div>

                {/* Availability card */}
                <div 
                  onClick={() => { setSelectedPillar('A'); setActiveTab('simulator'); }}
                  className="bg-[#050b18]/60 p-6 rounded border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer text-left relative group hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                >
                  <div className="absolute top-4 right-4 text-emerald-500/10 group-hover:text-emerald-500/20 transition-all">
                    <Wifi className="w-16 h-16 stroke-[1]" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-white font-mono tracking-tight">3. Disponibilidad</h4>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase font-black tracking-wider font-extrabold">Acceso en Sitio</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Asegura que los operadores autorizados en terreno tengan acceso inmediato a la información técnica precisa en el instante que lo requieran (por ejemplo, el Ingeniero Luis Fernando abriendo el modelo en obra).
                  </p>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] font-mono">
                    <span className="text-emerald-400 font-bold font-black">Riesgo Real TEDI:</span> Paro de obras en Campamento Kennedy al colapsar o congelarse el acceso a la red 4G celular.
                  </div>
                </div>

              </div>

              {/* Graphical Centerpiece showing the CIA Triad interactions */}
              <div id="cia-diagram-centerpiece" className="glass-panel p-6 border border-white/5 bg-artis-black/40 rounded">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Left side: interactive description of selected node */}
                  <div className="flex-1 space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-mono font-black uppercase">
                        Tríada de Información
                      </span>
                      <span className="text-slate-500 text-[10px] font-mono">Seleccione un nodo para analizar</span>
                    </div>

                    <div className="space-y-2 p-5 bg-black/44 rounded border border-white/5 min-h-[190px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm md:text-base font-black text-white uppercase tracking-tight flex items-center gap-2 mb-1">
                          {selectedTriangleNode === 'C' && <Lock className="w-4 h-4 text-rose-500" />}
                          {selectedTriangleNode === 'I' && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                          {selectedTriangleNode === 'A' && <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin-slow" />}
                          {triangleExplanations[selectedTriangleNode].title}
                        </h3>
                        <div className="text-[9px] text-amber-500 font-mono uppercase tracking-widest font-black mb-3">
                          {triangleExplanations[selectedTriangleNode].concept}
                        </div>
                        <p className="text-xs text-slate-350 leading-relaxed font-sans">
                          {triangleExplanations[selectedTriangleNode].desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 mt-3">
                        <span className="text-[9px] font-mono text-rose-455 font-black uppercase block mb-1">Impacto de Vulneración:</span>
                        <p className="text-xs text-slate-400 font-sans italic leading-relaxed">
                          {triangleExplanations[selectedTriangleNode].impact}
                        </p>
                      </div>
                    </div>

                    <div>
                      <button 
                        id="btn-goto-simulator"
                        onClick={() => {
                          setSelectedPillar(selectedTriangleNode);
                          setActiveTab('simulator');
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-[9px] font-mono font-black tracking-widest bg-amber-500 hover:bg-amber-600 active:bg-amber-705 text-artis-black rounded-sm transition-all uppercase cursor-pointer"
                      >
                        Probar en Simulador
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right side: 3D-styled unclipped Interactive Triangle diagram */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-64 h-64 bg-[#020612]/80 border border-white/[0.03] rounded-full flex items-center justify-center p-6">
                      <div className="absolute inset-0 immersive-grid opacity-10 rounded-full"></div>
                      <div className="absolute w-40 h-40 rounded-full border border-dashed border-white/10 animate-spin-slow pointer-events-none"></div>
                      
                      {/* Golden central node */}
                      <div className="absolute z-10 w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center pointer-events-none">
                        <Shield className="w-5 h-5 text-amber-500" />
                        <span className="text-[7px] font-mono font-bold text-white uppercase mt-0.5">BIM CIA</span>
                      </div>

                      {/* Explicitly mapped SVG vector lines safely connecting the safe coordinates */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                        <polygon points="50,22 76,68 24,68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <line x1="50" y1="22" x2="50" y2="50" stroke={selectedTriangleNode === 'C' ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.15)"} strokeWidth={selectedTriangleNode === 'C' ? "1.5" : "1"} strokeDasharray="2" />
                        <line x1="24" y1="68" x2="50" y2="50" stroke={selectedTriangleNode === 'A' ? "rgba(16,185,129,0.7)" : "rgba(255,255,255,0.15)"} strokeWidth={selectedTriangleNode === 'A' ? "1.5" : "1"} strokeDasharray="2" />
                        <line x1="76" y1="68" x2="50" y2="50" stroke={selectedTriangleNode === 'I' ? "rgba(245,158,11,0.7)" : "rgba(255,255,255,0.15)"} strokeWidth={selectedTriangleNode === 'I' ? "1.5" : "1"} strokeDasharray="2" />
                      </svg>

                      {/* Interactive Vertex Nodes: Placed safely inward with NO overflow-hidden parent to prevent any cutoff! */}
                      
                      {/* Vertex 1: Confidencialidad */}
                      <button 
                        id="node-confidentiality"
                        onClick={() => setSelectedTriangleNode('C')}
                        className="absolute top-[18px] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group focus:outline-none z-20"
                      >
                        <div className={`w-8.5 h-8.5 rounded-full bg-rose-500/20 border flex items-center justify-center transition-all duration-300 ${
                          selectedTriangleNode === 'C' 
                            ? 'border-rose-500 scale-110 shadow-[0_0_12px_rgba(239,68,68,0.5)]' 
                            : 'border-rose-500/40 group-hover:border-rose-500 group-hover:scale-105'
                        }`}>
                          <Lock className="w-3.5 h-3.5 text-rose-500" />
                          {/* Pulsing ring for active state */}
                          {selectedTriangleNode === 'C' && (
                            <span className="absolute inset-0 rounded-full border border-rose-500/60 animate-ping opacity-75"></span>
                          )}
                        </div>
                        <span className="text-[8px] font-mono text-rose-450 font-black uppercase mt-1">C</span>
                      </button>

                      {/* Vertex 2: Integridad */}
                      <button 
                        id="node-integrity"
                        onClick={() => setSelectedTriangleNode('I')}
                        className="absolute bottom-[36px] right-[36px] flex flex-col items-center cursor-pointer group focus:outline-none z-20"
                      >
                        <div className={`w-8.5 h-8.5 rounded-full bg-amber-500/20 border flex items-center justify-center transition-all duration-300 ${
                          selectedTriangleNode === 'I' 
                            ? 'border-amber-500 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.5)]' 
                            : 'border-amber-500/40 group-hover:border-amber-500 group-hover:scale-105'
                        }`}>
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                          {/* Pulsing ring for active state */}
                          {selectedTriangleNode === 'I' && (
                            <span className="absolute inset-0 rounded-full border border-amber-500/60 animate-ping opacity-75"></span>
                          )}
                        </div>
                        <span className="text-[8px] font-mono text-amber-500 font-extrabold uppercase mt-1">I</span>
                      </button>

                      {/* Vertex 3: Disponibilidad */}
                      <button 
                        id="node-availability"
                        onClick={() => setSelectedTriangleNode('A')}
                        className="absolute bottom-[36px] left-[36px] flex flex-col items-center cursor-pointer group focus:outline-none z-20"
                      >
                        <div className={`w-8.5 h-8.5 rounded-full bg-emerald-500/20 border flex items-center justify-center transition-all duration-300 ${
                          selectedTriangleNode === 'A' 
                            ? 'border-emerald-500 scale-110 shadow-[0_0_12px_rgba(16,185,129,0.5)]' 
                            : 'border-emerald-500/40 group-hover:border-emerald-500 group-hover:scale-105'
                        }`}>
                          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${selectedTriangleNode === 'A' ? 'animate-spin-slow' : ''}`} />
                          {/* Pulsing ring for active state */}
                          {selectedTriangleNode === 'A' && (
                            <span className="absolute inset-0 rounded-full border border-emerald-500/60 animate-ping opacity-75"></span>
                          )}
                        </div>
                        <span className="text-[8px] font-mono text-emerald-400 font-extrabold uppercase mt-1">A</span>
                      </button>

                    </div>
                    {/* Caption helper */}
                    <span className="text-[8px] font-mono text-slate-500 uppercase mt-4 tracking-wider max-w-[240px] text-center">
                      Haga clic en los nodos de la Tríada para diagnosticar cada cualidad de información.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'simulator' && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* TOP SELECTOR PILLARS */}
              <div className="grid grid-cols-3 gap-3">
                {(['C', 'I', 'A'] as const).map((p) => {
                  const data = ciaScenarios[p];
                  const isBreached = status[p] === 'BREACHED';
                  return (
                    <button
                      key={p}
                      onClick={() => setSelectedPillar(p)}
                      className={`p-4 rounded-md border text-left transition-all ${
                        selectedPillar === p
                          ? p === 'C'
                            ? 'bg-rose-500/10 border-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                            : p === 'I'
                              ? 'bg-amber-500/10 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                              : 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : 'bg-black/35 border-white/5 hover:border-white/10 text-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] font-mono py-0.5 px-2 rounded-xs bg-white/5">
                          {p === 'C' ? 'CONFIDENCIALIDAD' : p === 'I' ? 'INTEGRIDAD' : 'DISPONIBILIDAD'}
                        </span>
                        {isBreached ? (
                          <span className="text-[8px] text-red-500 font-extrabold flex items-center gap-1 animate-pulse">
                            <ShieldAlert className="w-3 h-3 text-rose-500 animate-bounce" /> VULNERADO
                          </span>
                        ) : (
                          <span className="text-[8px] text-emerald-400 font-extrabold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 animate-pulse" /> PROTEGIDO
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-black uppercase text-white truncate">{data.title}</h4>
                    </button>
                  );
                })}
              </div>

              {/* THE ACTIVE SIMULATION COMPONENT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left pane: Active Simulator control panel and Visual asset representation */}
                <div className="lg:col-span-7 bg-[#050b18] p-6 rounded border border-white/5 flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">DIORAMA DE AMENAZAS EN TIEMPO REAL</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-black/40 border border-white/5 font-mono text-amber-500 font-bold uppercase">
                        PILAR {selectedPillar}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-black text-white uppercase font-mono">{ciaScenarios[selectedPillar].title} en el Modelo</h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{ciaScenarios[selectedPillar].threatDesc}</p>
                    </div>

                    {/* Interactive representation of the status */}
                    <div className="p-5 rounded bg-black/55 border border-white/5 min-h-[170px] flex flex-col justify-between relative overflow-hidden">
                      
                      {/* Active breach scanline overlay if breached */}
                      {status[selectedPillar] === 'BREACHED' && (
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,1)] animate-scanline z-30"></div>
                      )}

                      {/* Title representing resource */}
                      <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2">
                        <span className="text-zinc-500 font-mono">RECURSO:</span>
                        <span className="text-white font-extrabold">
                          {selectedPillar === 'C' && '📄 PRESUPUESTO_HORIZONTE.XLSB'}
                          {selectedPillar === 'I' && '💾 ESTRUCTURA_EST_VIGA_ST04.IFC / REPOSITORIO'}
                          {selectedPillar === 'A' && '📱 PLANO_CONEXION_TERRENO_KENNEDY.PDF'}
                        </span>
                      </div>

                      {/* Visual core */}
                      {status[selectedPillar] === 'BREACHED' ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center space-y-2 animate-fade-in">
                          <ShieldAlert className="w-12 h-12 text-rose-500 animate-bounce" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-455 px-3 py-0.5 rounded border border-rose-500/30 tracking-widest font-extrabold uppercase">
                              ⚠️ ALERTA: COMPROMETIDO / ATAQUE ACTIVO
                            </span>
                            <p className="text-[10px] text-rose-400 font-mono leading-tight max-w-md mx-auto mt-2">
                              {selectedPillar === 'C' && "INTEGRIDAD DE ACCESO ROTA: Datos confidenciales transferidos a IP externa."}
                              {selectedPillar === 'I' && "MODIFICACIÓN ARBITRARIA: El parámetro dimensional 'Viga ST-04 Perfil' ha sido reducido de 60cm a 40cm."}
                              {selectedPillar === 'A' && "RED NO DISPONIBLE: Error en conexión con Azure Hub. Frentes de excavación paralizados por completo."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center space-y-2 animate-fade-in">
                          <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-pulse" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-3 py-0.5 rounded border border-emerald-500/30 tracking-widest font-black uppercase">
                              🔒 PROTEGIDO BAJO PROTOCOLO ISO 27002
                            </span>
                            <p className="text-[10px] text-zinc-400 font-mono leading-tight max-w-md mx-auto mt-2">
                              {ciaScenarios[selectedPillar].successText}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Logs output console styled block */}
                      <div className="bg-[#02050c] p-2.5 rounded border border-white/[0.03] font-mono text-[9px] text-left">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span className="text-slate-600">SYS_LOG STATUS //</span>
                          <span className={`${status[selectedPillar] === 'BREACHED' ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
                            {status[selectedPillar] === 'BREACHED' ? 'SYSTEM_BREACH_DETECTED' : 'SYSTEM_OPERATIONAL_SECURE'}
                          </span>
                        </div>
                        <div className="text-slate-400 mt-1">
                          {status[selectedPillar] === 'BREACHED' 
                            ? `>> [FAIL] Parámetros alterados o filtrados ilegalmente en el CDE. Sin control de mitigación.`
                            : `>> [SUCCESS] Audit trail verificado. Cumple control ${ciaScenarios[selectedPillar].isoControl.split(' (')[0]}.`
                          }
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* ACTION CONTROLS */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSimulateThreat(selectedPillar)}
                      className={`px-4 py-3 rounded text-[10px] uppercase font-mono tracking-widest font-bold border transition-all cursor-pointer ${
                        status[selectedPillar] === 'BREACHED'
                          ? 'bg-rose-500/5 text-rose-500 border-rose-500/20 opacity-50 cursor-not-allowed'
                          : 'bg-rose-600 hover:bg-rose-700 text-white border-transparent shadow-lg shadow-rose-950/20'
                      }`}
                      disabled={status[selectedPillar] === 'BREACHED'}
                    >
                      💥 Gatillar Amenaza
                    </button>
                    <button
                      onClick={() => handleApplySafeguard(selectedPillar)}
                      className={`px-4 py-3 rounded text-[10px] uppercase font-mono tracking-widest font-bold border transition-all cursor-pointer ${
                        status[selectedPillar] === 'SECURE'
                          ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20 opacity-50 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-lg shadow-emerald-950/20'
                      }`}
                      disabled={status[selectedPillar] === 'SECURE'}
                    >
                      🛡️ Aplicar Salvaguarda
                    </button>
                  </div>

                </div>

                {/* Right pane: Analysis of breach consequences & ISO countermeasures */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-left">
                  
                  {/* Consequence Block */}
                  <div className="bg-red-500/5 border border-red-500/10 p-5 rounded">
                    <span className="text-[9.5px] font-mono text-red-400 font-extrabold uppercase tracking-wider block mb-2">
                      ⚔️ Impacto Comercial y de Obra
                    </span>
                    <h4 className="text-xs font-black text-white uppercase mb-1">Consecuencia Directa:</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {ciaScenarios[selectedPillar].consequence}
                    </p>
                  </div>

                  {/* ISO 27002 Countermeasure detail */}
                  <div className="bg-[#050b18] p-5 border border-white/5 rounded flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9.5px] font-mono text-amber-500 font-black uppercase tracking-wider block mb-2">
                        🛡️ RECOMENDACIÓN ISO 27002
                      </span>
                      <div className="p-2 py-1 px-3 mb-3 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-mono font-bold w-fit rounded-xs">
                        {ciaScenarios[selectedPillar].isoControl}
                      </div>
                      <h4 className="text-xs font-black text-white uppercase mb-1">Estrategia e Implementación:</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {ciaScenarios[selectedPillar].solution}
                      </p>
                    </div>

                    <div className="mt-4 p-3 bg-black/45 border border-white/5 rounded text-[10px] text-slate-400 leading-normal italic">
                      💡 <strong>Mensaje Clave del Docente:</strong> Enséñele a sus alumnos que un software CDE o un entorno de modelado desatendido es un blanco directo. La seguridad se diseña desde el contrato y los privilegios jerárquicos del personal.
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'iso' && (
            <motion.div
              key="iso"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* ISO 27002 Key standard guidelines in grid layout */}
              <div className="p-5 bg-amber-500/5 rounded border border-amber-500/20 text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-amber-500 block mb-1">MARCO NORMATIVO DE RESPALDO (ISO 27002)</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  BIM no es una burbuja aislada. Al federar modelos en repositorios en la nube, se hereda la responsabilidad técnica descrita en las directivas de control de ciberseguridad internacionales. Conozca los 4 dominios esenciales aplicados al entorno común de datos:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Domain 1: Control de Acceso General */}
                <div className="bg-[#050b18]/60 p-5 rounded border border-white/5 text-left flex gap-4">
                  <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Key className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-white font-mono">Control 5.15 — Control de Acceso</h4>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                      Los derechos de acceso al CDE deben otorgarse en función de la función técnica en el BEP. El arquitecto no edita electricidad; el MEP no edita vigas de concreto. El supervisor de obra tiene permisos estrictos de vista sin sobreescritura.
                    </p>
                  </div>
                </div>

                {/* Domain 2: Segregación de Funciones */}
                <div className="bg-[#050b18]/60 p-5 rounded border border-white/5 text-left flex gap-4">
                  <div className="w-10 h-10 rounded bg-[#10b981]/10 flex items-center justify-center shrink-0 border border-[#10b981]/20 text-emerald-500">
                    <UserCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-white font-mono">Control 5.3 — Segregación de Funciones</h4>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                      Quien modela un parámetro crítico estructural en la empresa no puede auto-aprobarse las colisiones en la mesa federada G2. El sistema IFC debe forzar que un Coordinador BIM o Revisor valide los cambios paramétricos antes de publicarlos oficialmente.
                    </p>
                  </div>
                </div>

                {/* Domain 3: Criptografía y Cifrado */}
                <div className="bg-[#050b18]/60 p-5 rounded border border-white/5 text-left flex gap-4">
                  <div className="w-10 h-10 rounded bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20">
                    <Lock className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-white font-mono">Control 5.33 — Uso de Criptografía</h4>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                      Proteger la propiedad intelectual de las familias paramétricas de diseño y los metadatos de costos de materiales. Todo intercambio de archivos con subcontratistas externos debe transitar por túneles HTTPS con archivos ZIP protegidos o visores seguros en la web CDE.
                    </p>
                  </div>
                </div>

                {/* Domain 4: Integridad de Archivos */}
                <div className="bg-[#050b18]/60 p-5 rounded border border-white/5 text-left flex gap-4">
                  <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-450">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-white font-mono">Control 8.12 — Prevención de Software Malicioso</h4>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                      Se prohíbe el tránsito de modelos BIM a través de memorias USB sin escanear previamente. Cualquier archivo subido al CDE de obra debe someterse a escaneos automáticos de virus para impedir secuestro de datos por ransomware.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TIPS FOR THE BIM MANAGER */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded text-left mt-4 shadow-md">
          <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Tips para el BIM Manager
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px] leading-relaxed text-slate-300 font-sans">
            <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
              <h5 className="font-bold text-amber-500 uppercase mb-1">La ciberseguridad NO es sólo un tema de TI</h5>
              <p>
                Los BIM Managers tradicionales creen que los hackeos en construcción no ocurren. Recuerde que secuestrar la base de datos de un terminal hospitalario construido mediante BIM permite detener el aire de quirófanos manipulando los sensores integrados.
              </p>
            </div>
            <div className="bg-[#040c1c]/40 p-3 rounded border border-white/[0.03]">
              <h5 className="font-bold text-emerald-450 uppercase mb-1">La propiedad de la información</h5>
              <p>
                El modelo es propiedad contractual del mandante. Diseñar e-mails informales o compartir archivos mediante carpetas abiertas sin control legal de cambios destruye la custodia técnica e invalida reclamos frente a defectos de obra.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
