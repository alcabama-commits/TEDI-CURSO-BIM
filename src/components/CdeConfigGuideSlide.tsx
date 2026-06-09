import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderLock, Share2, ShieldCheck, ArrowRight, CheckCircle2, 
  Users, RefreshCw, Send, Lock, Unlock, ChevronRight, FileText, 
  Check, AlertCircle, MessageSquare, AlertTriangle, Globe, Database, HelpCircle,
  Eye, FileCode, ShieldAlert, Cpu, Wifi, Smartphone, HardDrive, Feather, Landmark,
  Lightbulb
} from 'lucide-react';

// --- Types ---
interface FolderPermission {
  folder: string;
  creator: string;
  camiloPerm: 'WRITE' | 'READ' | 'NONE';
  dianaPerm: 'WRITE' | 'READ' | 'NONE';
  mateoPerm: 'WRITE' | 'READ' | 'NONE';
}

interface HealthIssue {
  id: string;
  name: string;
  status: 'PENDING' | 'CLEANED' | 'ERROR';
  description: string;
  impact: string;
}

interface BcfClash {
  id: string;
  elementA: string;
  elementB: string;
  assignee: string;
  status: 'OPEN' | 'RESOLVED';
  proposal: string;
}

export const CdeConfigGuideSlide = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // =========================================================================
  // STAGE 1: WIP STATES
  // =========================================================================
  const [selectedFolder, setSelectedFolder] = useState<string>("01_WIP/01_ESTRUCTURAS");
  const [permissions, setPermissions] = useState<FolderPermission[]>([
    { folder: "01_WIP/01_ARQUITECTURA", creator: "Diana", camiloPerm: "NONE", dianaPerm: "WRITE", mateoPerm: "NONE" },
    { folder: "01_WIP/01_ESTRUCTURAS", creator: "Camilo", camiloPerm: "WRITE", dianaPerm: "NONE", mateoPerm: "NONE" },
    { folder: "01_WIP/01_MEP", creator: "Mateo", camiloPerm: "NONE", dianaPerm: "NONE", mateoPerm: "WRITE" }
  ]);
  const [wipSecurityLog, setWipSecurityLog] = useState<string>("Directorio seguro inicializado bajo ISO 19650.");
  const [testUser试图Access, setTestUser试图Access] = useState<'Diana' | 'Camilo' | 'Mateo'>('Diana');

  const handleTestWipAccess = (user: 'Diana' | 'Camilo' | 'Mateo') => {
    const currentFolderData = permissions.find(p => p.folder === selectedFolder);
    if (!currentFolderData) return;

    let permission: 'WRITE' | 'READ' | 'NONE' = 'NONE';
    if (user === 'Diana') permission = currentFolderData.dianaPerm;
    if (user === 'Camilo') permission = currentFolderData.camiloPerm;
    if (user === 'Mateo') permission = currentFolderData.mateoPerm;

    if (permission === 'WRITE') {
      setWipSecurityLog(`✅ ACCESO CONCEDIDO: ${user} tiene permisos de ESCRITURA en ${selectedFolder}. Puede sincronizar subproyectos locales de Revit tranquilamente.`);
    } else if (permission === 'READ') {
      setWipSecurityLog(`ℹ️ ACCESO RESTRINGIDO: ${user} tiene permisos de SOLO LECTURA en ${selectedFolder}. No puede alterar el borrador activo.`);
    } else {
      setWipSecurityLog(`❌ ACCESO DENEGADO (Sólido CDE): ${user} NO tiene autorizado el acceso a ${selectedFolder}. ¡Excelente! Esto garantiza total PRIVACIDAD INFORMÁTICA para que el autor trabaje sin la presión o interferencias de terceros.`);
    }
  };

  const handleToggleWipPermission = (folderName: string, user: 'camilo' | 'diana' | 'mateo') => {
    setPermissions(prev => prev.map(p => {
      if (p.folder === folderName) {
        const key = `${user}Perm` as 'camiloPerm' | 'dianaPerm' | 'mateoPerm';
        const currentVal = p[key];
        let newVal: 'WRITE' | 'READ' | 'NONE' = 'NONE';
        if (currentVal === 'NONE') newVal = 'READ';
        else if (currentVal === 'READ') newVal = 'WRITE';
        else newVal = 'NONE';

        return { ...p, [key]: newVal };
      }
      return p;
    }));
    setWipSecurityLog(`⚙️ Configuración CDE modificada para la carpeta ${folderName}. Matriz de derechos de acceso actualizada.`);
  };

  // =========================================================================
  // STAGE 2: INTERNAL REVIEW STATES
  // =========================================================================
  const [selectedAuditModel, setSelectedAuditModel] = useState<'EST' | 'ARQ' | 'MEP'>('EST');
  const [healthIssues, setHealthIssues] = useState<HealthIssue[]>([
    { id: 'nom', name: 'Nomenclatura ISO 19650', status: 'ERROR', description: 'El archivo se llama "THOR_Estructuras_Final_v2_OK.rvt" en lugar del estándar BEP.', impact: 'Dificulta la automatización del CDE y el enrutamiento de versiones.' },
    { id: 'dup', name: 'Objetos Duplicados (0% requerido)', status: 'ERROR', description: 'Se detectaron 4.2% de vigas y losas encimadas en las mismas coordenadas exactas.', impact: 'Sobredimensiona presupuestos de cantidades de obra.' },
    { id: 'des', name: 'Desconexiones de Elementos', status: 'ERROR', description: '12 zapatas estructurales desligadas de sus columnas de cimentación correspondientes.', impact: 'Invalida el cálculo de transferencia de cargas estructurales.' },
    { id: 'war', name: 'Advertencias Críticas de Revit', status: 'ERROR', description: '84 advertencias nativas de colisión de geometría y uniones de muros.', impact: 'Ralentiza el rendimiento de renderizado en federación.' }
  ]);
  const [auditProgress, setAuditProgress] = useState<number>(0);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditMessage, setAuditMessage] = useState<string>("Esperando que el Coordinador inicie el Filtro de Salud...");

  const handleFixHealthIssue = (id: string) => {
    setHealthIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return { ...issue, status: issue.status === 'ERROR' ? 'CLEANED' : 'ERROR' };
      }
      return issue;
    }));
  };

  const handleRunHealthScanner = () => {
    setIsAuditing(true);
    setAuditProgress(10);
    setAuditMessage("Iniciando auditoría interna para el modelo seleccionado... No se permite contaminación en SHARED.");
    
    const interval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAuditing(false);
          const allClean = healthIssues.every(h => h.status === 'CLEANED');
          if (allClean) {
            setAuditMessage("🎉 ¡COMPUERTA 1 APROBADA! El modelo estructural cumple la norma de salud al 100% (Duplicados 0%, nomenclaturas BEP, conectividad perfecta). Archivo enrutado a 02_SHARED.");
          } else {
            setAuditMessage("🛑 RECHAZADO EN COMPUERTA 1: El modelo contiene fallas críticas de salud. Corrija los errores marcados en rojo antes de contaminar el contenedor común.");
          }
          return 100;
        }
        return prev + 30;
      });
    }, 450);
  };

  // =========================================================================
  // STAGE 3: SHARED STATES
  // =========================================================================
  const [syncFrequency, setSyncFrequency] = useState<'Semanal' | 'Quincenal' | 'Mensual'>('Quincenal');
  const [isSyncingShared, setIsSyncingShared] = useState<boolean>(false);
  const [lastSyncDate, setLastSyncDate] = useState<string>("Hace 8 días");
  const [sharedLog, setSharedLog] = useState<string[]>([]);

  const handleSyncShared = () => {
    setIsSyncingShared(true);
    setSharedLog(prev => [...prev, `🔄 [Sincronización Iniciada] Leyendo vínculos autorizados con frecuencia: ${syncFrequency}...`]);
    setTimeout(() => {
      setSharedLog(prev => [
        ...prev,
        `📥 Cargando 'THOR-DIS-EST-T1-M3_APPROVED.rvt' (Camilo) como FONDO de referencia para Diana y Mateo.`,
        `📥 Cargando 'THOR-DIS-ARQ-T1-M3_APPROVED.rvt' (Diana) como FONDO de referencia para Camilo y Mateo.`,
        `🔒 Aplicando protocolo: SOLO LECTURA para terceros. Diana y Mateo pueden ver, pero bajo ningún motivo pueden modificar el modelo de Camilo.`,
        `✅ Vínculos cruzados actualizados con éxito en el contenedor 02_SHARED.`
      ]);
      setLastSyncDate("Hoy mismo (Hace unos instantes)");
      setIsSyncingShared(false);
    }, 1000);
  };

  // =========================================================================
  // STAGE 4: MESA FEDERADA STATES
  // =========================================================================
  const [tickets, setTickets] = useState<BcfClash[]>([
    { id: "CF-01", elementA: "Ducto de Inyección HVAC (Mateo)", elementB: "Viga Estructural ST-04 (Camilo)", assignee: "Mateo (MEP)", status: "OPEN", proposal: "Bajar el ruteo del ducto 15cm para librar el peralte de la viga estructural central" },
    { id: "CF-02", elementA: "Caja de Paso Eléctrico", elementB: "Puerta ContraIncendio Sótano 1", assignee: "Diana (ARQ)", status: "RESOLVED", proposal: "Desplazar caja de paso 45cm a la izquierda para evitar interferir el marco" }
  ]);
  const [selectedClash, setSelectedClash] = useState<string>("CF-01");
  const [step4HeightCheck, setStep4HeightCheck] = useState<number>(2.20); // free height parameter
  const [clashStrategy, setClashStrategy] = useState<'CLASSIC_66' | 'OPTIMIZED_10'>('CLASSIC_66');
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [isMilestoneDigitalSigned, setIsMilestoneDigitalSigned] = useState<boolean>(false);
  const [signingLog, setSigningLog] = useState<string[]>([]);
  const [isSigning, setIsSigning] = useState<boolean>(false);

  const activeClash = tickets.find(t => t.id === selectedClash) || tickets[0];

  const handleResolveBcfTicket = (id: string) => {
    // Check height constraints manually selected
    if (id === "CF-01" && step4HeightCheck < 2.10) {
      alert("❌ ERROR DE DISEÑO: Si bajas el ducto al nivel seleccionado, la altura de paso libre en sótano queda por debajo de la norma peatonal mínima (2.10m). ¡Diana (Arquitectura) rechaza la propuesta!");
      return;
    }
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: 'RESOLVED' as const };
      }
      return t;
    }));
  };

  const handleSignContractualMilestone = () => {
    if (clashStrategy === 'CLASSIC_66') {
      setIsSigning(true);
      setSigningLog([
        "⚖️ [ERROR EN COMPUERTA CONTRACTUAL M02]",
        "⚠️ DETECTADA FATIGA DE COLISIONES (CLASH FATIGUE): Hay 784 colisiones absurdas activas.",
        "❌ RECHAZO DE FIRMA: El CDE tiene demasiada basura técnica acumulada. El cliente no firmará planos basados en ruido.",
        "💡 DISRUPCIÓN DE PROYECTO: Cambie la estrategia a 'Pirámide Jerárquica Optimizada' (10 informes clave) para purgar falsos positivos y habilitar el visado."
      ]);
      setTimeout(() => {
        setIsSigning(false);
      }, 800);
      return;
    }

    setIsSigning(true);
    setSigningLog([
      "⚖️ [INICIANDO COMPUERTA DE APROBACIÓN CONTRACTUAL M02]",
      "📂 Consolidando modelo federado IFC Multidisciplinar definitivo...",
      "🔒 Calculando firma SHA256 para bloquear inmutabilidad contractual...",
    ]);

    setTimeout(() => {
      setSigningLog(prev => [
        ...prev,
        "✍️ ESTAMPANDO Sello Digital del Supervisor / Cliente (EIR Inspector).",
        "📂 Planos PDF y Modelo IFC marcados como inmutables.",
        "🚀 TRANSICIÓN AUTOMÁTICA: Modelo federado promovido al contenedor 03_PUBLISHED."
      ]);
      setIsMilestoneDigitalSigned(true);
      setIsSigning(false);
    }, 1200);
  };

  // =========================================================================
  // STAGE 5: PUBLISH STATES
  // =========================================================================
  const [publishFormat, setPublishFormat] = useState<'NATIVE' | 'OPTIMIZED'>('OPTIMIZED');
  const [activeDevice, setActiveDevice] = useState<'LAPTOP_I3' | 'TABLET_4G'>('TABLET_4G');
  const [networkSignal, setNetworkSignal] = useState<'EXCELLENT' | 'STABLE' | 'UNSTABLE'>('UNSTABLE');
  const [deviceLogs, setDeviceLogs] = useState<string[]>([]);
  const [isTestingDevice, setIsTestingDevice] = useState<boolean>(false);

  const handleRunFieldTest = () => {
    setIsTestingDevice(true);
    setDeviceLogs([
      `⚡ [Iniciando Simulador de Obra]`,
      `🔧 Destinatario: Ing. Luis Fernando Tobón (Residente Obra Kennedy)`,
      `📱 Dispositivo de campo: ${activeDevice === 'LAPTOP_I3' ? 'Notebook Corporativa Intel i3 con 8GB RAM' : 'Tablet de Obra con Chip 4G celular'}`,
      `📶 Estado de red en campamento: ${networkSignal === 'UNSTABLE' ? '4G Inestable / Intermitente (2 rayas)' : 'Red Corporativa Estable'}`,
      `📥 Descargando documentación contractual liberada...`
    ]);

    setTimeout(() => {
      const logs = [];
      if (publishFormat === 'NATIVE') {
        logs.push("⚠️ Tamaño del archivo: 1.5 Gigabytes (.RVT Nativo pesado de Revit sin optimizar)");
        logs.push("📶 ERROR DE TIEMPO DE ESPERA: La conexión 4G inestable del campamento colapsó a los 10 minutos de descarga.");
        logs.push("❌ CRASH GEOMÉTRICO: El procesador Intel i3 de 8GB RAM colapsó al 100% de memoria intentando renderizar los archivos nativos pesados de Revit sin licencia instalada.");
        logs.push("🛑 DIAGNÓSTICO: Configuración fallida de CDE. Luis Fernando Tobón no tiene información para construir.");
      } else {
        logs.push("✔️ Tamaño de entrega optimizado: 22 Megabytes (PDFs vectoriales y archivos IFC recortados)");
        logs.push("📶 DESCARGA ÉXITO: 4G inestable descarga con éxito el archivo compacto en 9 segundos.");
        logs.push("🚀 FLUIDEZ TOTAL: El visor web liviano renderiza el IFC y los planos vectoriales a 60 FPS en la tablet básica.");
        logs.push("✅ CONSTRUCCIÓN EN MARCHA: Luis Fernando Tobón visualiza cotas y ruteos en tiempo real sobre el terreno sin trabas de hardware.");
        logs.push("🎯 DIAGNÓSTICO: ¡ENTREGA PERFECTA! El destino final del dato se cumple plenamente.");
      }
      setDeviceLogs(prev => [...prev, ...logs]);
      setIsTestingDevice(false);
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10" id="cde-manager-lab">
      
      {/* 20% MAIN HEADER */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div className="text-left">
          <span className="text-artis-orange font-mono text-[9px] uppercase tracking-[0.4em] font-black">ISO 19650  CDE MANAGER LAB</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1 italic flex items-center gap-2">
            🌐 Portal de Configuración CDE <span className="text-white text-lg font-mono not-italic text-slate-400">/ Tablero de Control</span>
          </h2>
          <p className="text-slate-400 text-xs text-pretty font-medium">
            Entorno interactivo para configurar de forma robusta los contenedores y compuertas del Common Data Environment (CDE).
          </p>
        </div>

        {/* Chronological Unified Guide Thread Tabs */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-1 bg-artis-black border border-white/5 p-1 rounded-sm">
          {[
            "1. WIP: Privacidad",
            "2. G1: Filtro de Calidad",
            "3. SHARED: Solo Lectura",
            "4. G2: Mesa Federada & BCF",
            "5. PUBLISH: Campo en Obra"
          ].map((tName, i) => (
            <button
              id={`nav-cde-tab-${i}`}
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-2 text-[10px] uppercase tracking-wider font-extrabold rounded-sm transition-all cursor-pointer ${
                activeTab === i 
                  ? "bg-artis-orange text-black font-black shadow-[0_0_15px_rgba(255,164,0,0.25)]" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tName}
            </button>
          ))}
        </div>
      </div>

      {/* VIEWPORT CONTROLLER CONTENT */}
      <div className="flex-1 min-h-0 bg-transparent rounded-sm">
        <AnimatePresence mode="wait">
          
          {/* =========================================================================
              TAB 1: WIP (EL ORIGEN DEL DATO & PRIVACIDAD INFORMÁTICA)
              ========================================================================= */}
          {activeTab === 0 && (
            <motion.div
              id="cde-step-wip"
              key="wip"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {/* INTERACTIVE WORKSPACE */}
              <div className="xl:col-span-2 space-y-4 text-left">
                <div className="glass-panel p-6 border-l-4 border-artis-orange bg-artis-black/40">
                  <h3 className="text-md font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <FolderLock className="w-5 h-5 text-artis-orange" />
                    ETAPA 1: WORK IN PROGRESS (WIP) — CONFIGURAR EL ORIGEN DEL DATO
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                    <strong>BIM Manager Challenge:</strong> Configure carpetas independientes y restrictivas para que cada disciplina (Diana - ARQ, Camilo - EST, Mateo - MEP) trabaje con <strong>Privacidad Informática</strong>. Los modeladores deben estar exentos de la presión de que otros vean o referencien sus errores preliminares en tiempo real.
                  </p>
                </div>

                {/* Directory Browser Interface */}
                <div className="glass-panel p-6 border border-white/5 bg-artis-black/60 relative">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Consola de Control de Directorios y Cuentas Activas</span>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mt-1">Gobernanza de Acceso de Servidor Cloud CDE</h4>
                    </div>
                    <span className="text-[8px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 uppercase font-mono">
                      Restricción WIP Certificada
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left: Folders Hierarchy representation */}
                    <div className="bg-black/40 rounded border border-white/5 p-3 space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Contenedor 01_WIP</span>
                      <div className="space-y-1 mt-2">
                        {permissions.map((p) => (
                          <div 
                            key={p.folder}
                            onClick={() => setSelectedFolder(p.folder)}
                            className={`p-2 rounded text-xs select-none transition-all cursor-pointer font-mono flex items-center justify-between ${
                              selectedFolder === p.folder 
                                ? "bg-artis-orange/15 border-l-4 border-artis-orange text-white font-bold" 
                                : "bg-white/[0.01] hover:bg-white/5 text-slate-400 border border-transparent"
                            }`}
                          >
                            <span className="truncate">📂 {p.folder.replace("01_WIP/", "")}</span>
                            <span className="text-[8px] opacity-70">({p.creator})</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-white/5 text-[9.5px] text-slate-500">
                        📁 02_SHARED <br/>
                        📁 03_PUBLISHED
                      </div>
                    </div>

                    {/* Middle: Live Permission Matrix Grid */}
                    <div className="lg:col-span-2 bg-[#050b12] rounded border border-white/10 p-4 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/15 pb-2">
                        <span className="text-[10px] font-bold text-slate-300 font-mono">Matriz de Escritura / Lectura</span>
                        <span className="text-[9px] text-zinc-500">Haz clic para rotar el permiso</span>
                      </div>

                      {permissions.map((perm) => (
                        <div key={perm.folder} className="grid grid-cols-4 items-center gap-2 py-1.5 border-b border-white/5 text-xs">
                          <span className="font-mono text-slate-405 truncate text-[10px] text-left">{perm.folder.replace("01_WIP/01_", "")}</span>
                          
                          {/* Diana */}
                          <div className="text-center">
                            <span className="block text-[8px] text-slate-500 font-mono">ARQ Diana</span>
                            <button 
                              onClick={() => handleToggleWipPermission(perm.folder, 'diana')}
                              className={`mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all ${
                                perm.dianaPerm === 'WRITE' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                perm.dianaPerm === 'READ' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                'bg-zinc-800 text-zinc-500 border-transparent'
                              }`}
                            >
                              {perm.dianaPerm}
                            </button>
                          </div>

                          {/* Camilo */}
                          <div className="text-center">
                            <span className="block text-[8px] text-slate-500 font-mono">EST Camilo</span>
                            <button 
                              onClick={() => handleToggleWipPermission(perm.folder, 'camilo')}
                              className={`mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all ${
                                perm.camiloPerm === 'WRITE' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                perm.camiloPerm === 'READ' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                'bg-zinc-800 text-zinc-500 border-transparent'
                              }`}
                            >
                              {perm.camiloPerm}
                            </button>
                          </div>

                          {/* Mateo */}
                          <div className="text-center">
                            <span className="block text-[8px] text-slate-500 font-mono">MEP Mateo</span>
                            <button 
                              onClick={() => handleToggleWipPermission(perm.folder, 'mateo')}
                              className={`mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black border transition-all ${
                                perm.mateoPerm === 'WRITE' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                perm.mateoPerm === 'READ' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                'bg-zinc-800 text-zinc-500 border-transparent'
                              }`}
                            >
                              {perm.mateoPerm}
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVE TESTING INTERACTIVE AREA */}
                  <div className="mt-4 p-4 bg-[#090f1e] rounded border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="block text-xs font-bold text-slate-205">Prueba del Servidor: Intentar Acceso Directo Cruzado</span>
                        <p className="text-[10px] text-slate-400">Compruebe si Diana o Mateo pueden alterar el modelo de Estructuras antes de su revisión.</p>
                      </div>

                      <div className="flex bg-[#050b12] p-1 rounded border border-white/5 gap-1">
                        {(['Diana', 'Camilo', 'Mateo'] as const).map(user => (
                          <button
                            id={`btn-wip-user-${user}`}
                            key={user}
                            onClick={() => {
                              setTestUser试图Access(user);
                            }}
                            className={`px-2.5 py-1 text-[9px] font-mono uppercase font-black rounded transition-all cursor-pointer ${
                              testUser试图Access === user ? "bg-artis-orange text-black font-black" : "text-slate-405 hover:text-white"
                            }`}
                          >
                            {user === 'Diana' ? '👩‍💼 Diana' : user === 'Camilo' ? '👨‍💻 Camilo' : '👨‍🔧 Mateo'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        id="run-access-wip-check"
                        onClick={() => handleTestWipAccess(testUser试图Access)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono font-black text-[9px] uppercase tracking-wider rounded transition-all cursor-pointer"
                      >
                        Ejecutar Intento de Escritura
                      </button>

                      <div className="flex-1 bg-black/70 rounded p-2.5 font-mono text-[9.5px]">
                        <span className="text-slate-450 block text-[8px] uppercase font-bold text-zinc-600 mb-0.5">Terminal del sistema CDE:</span>
                        <p className="text-white select-all text-left">{wipSecurityLog}</p>
                      </div>
                    </div>
                  </div>

                  {/* Autodesk Revit Sync subprojects explanation */}
                  <div className="mt-4 p-3 bg-artis-orange/5 border border-artis-orange/20 rounded font-mono text-[9px] text-slate-400 text-pretty">
                    <span className="text-artis-orange font-bold uppercase block text-[10px] mb-1">🔧 CONFIGURACIÓN DE AUTORÍA (REVIT):</span>
                    Los modeladores trabajan con <strong>subproyectos locales</strong> de manera aislada (p.ej. <span className="text-white">EST_Columnas</span>, <span className="text-white">ARQ_Fachada</span>). Las rutas estan configuradas en sus entornos locales e inactivas en la nube común de coordinación para evitar la propagación de basura geométrica accidental.
                  </div>

                </div>
              </div>

              {/* MANUAL SIDEBAR SPECIFICATIONS */}
              <div className="glass-panel p-6 border border-white/5 bg-artis-black/40 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-artis-orange font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Directriz ISO 19650
                  </div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">Privacidad del Borrador WIP</h4>
                  
                  <div className="space-y-4 text-xs font-medium text-slate-400 leading-relaxed">
                    <p>
                      La norma internacional establece que el contenedor <strong>WIP (Work in Progress)</strong> pertenece de forma exclusiva a la disciplina que lo crea.
                    </p>
                    <p className="border-l-2 border-red-500 pl-3 py-1 bg-red-500/[0.02]">
                      <strong>Prohibición Absoluta:</strong> Ningún revisor externo o cliente debe tener acceso de edición o visualización de errores al modelo en borrador. 
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex gap-2">
                        <span className="text-artis-orange font-black select-none">•</span>
                        <span><strong>Inmunidad:</strong> Permite fallar y corregir de manera local e independiente.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-artis-orange font-black select-none">•</span>
                        <span><strong>Seguridad:</strong> Bloquea la edición accidental o mal intencionada del resto de disciplinas sobre el propio modelo nativo.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 bg-artis-orange/5 p-4 rounded border border-artis-orange/10">
                  <div className="text-[8px] font-mono text-artis-orange font-black uppercase tracking-widest mb-1">Pedagogía TEDI</div>
                  <span className="text-[10px] text-slate-300 leading-relaxed italic block">
                    &ldquo;Un error en WIP es un proceso constructivo natural del diseño de Camilo, Diana o Mateo. El CDE debe resguardar su privacidad.&rdquo;
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 2: COMPUERTA 1 — FILTRO DE SALUD INMÓVIL DIGITAL (INTERNAL QUALITY GATE)
              ========================================================================= */}
          {activeTab === 1 && (
            <motion.div
              id="cde-step-review"
              key="quality"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {/* INTERACTIVE WORKSPACE */}
              <div className="xl:col-span-2 space-y-4 text-left">
                <div className="glass-panel p-6 border-l-4 border-pink-500 bg-artis-black/40">
                  <h3 className="text-md font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-pink-500 animate-pulse" />
                    ETAPA 2: REVISIÓN INTERNA (COMPUERTA 1) — FILTRO AUTOMÁTICO DE SALUD
                  </h3>
                  <p className="text-slate-330 text-xs mt-2 leading-relaxed">
                    <strong>BIM Manager Challenge:</strong> El CDE no es un vertedero. Antes de promover un archivo desde WIP al contenedor SHARED, el Coordinador de Especialidad debe someter el modelo a una estricta validación técnica utilizando reglas de filtrado visualizadas aquí.
                  </p>
                </div>

                {/* Audit Terminal Dashboard */}
                <div className="glass-panel p-6 border border-white/5 bg-artis-black/60">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Consola de Reglas de Calidad e Integridad de Geometría</span>
                    <span className="text-[8px] text-pink-400 font-extrabold bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 uppercase font-mono">Compuerta de Control M01</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Select Model Source to Audit */}
                    <div className="p-3 bg-[#050b18] rounded border border-white/10 flex flex-col justify-between h-24">
                      <span className="block text-[8px] font-mono text-slate-500 uppercase font-bold">Archivo Origen WIP</span>
                      <select 
                        value={selectedAuditModel}
                        onChange={(e) => setSelectedAuditModel(e.target.value as 'EST' | 'ARQ' | 'MEP')}
                        className="bg-black/60 text-white font-black text-xs border border-white/5 p-1 rounded font-mono cursor-pointer"
                      >
                        <option value="EST">Camilo_Estructuras.rvt</option>
                        <option value="ARQ">Diana_Arquitectura.rvt</option>
                        <option value="MEP">Mateo_Instalaciones.rvt</option>
                      </select>
                      <span className="text-[8px] text-slate-400 font-mono italic">Disciplina: {selectedAuditModel}</span>
                    </div>

                    {/* Progress representation bar */}
                    <div className="p-3 bg-[#050b18] rounded border border-white/10 flex flex-col justify-center h-24 space-y-1">
                      <span className="block text-[8px] font-mono text-slate-500 uppercase">Progreso del Diagnóstico</span>
                      <div className="w-full bg-slate-900 border border-white/5 h-2 rounded overflow-hidden">
                        <div className="bg-pink-500 h-full transition-all duration-350" style={{ width: `${auditProgress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-pink-400 font-mono font-bold text-center mt-1">{auditProgress}% Completado</span>
                    </div>

                    {/* Status diagnostic indicator */}
                    <div className="p-3 bg-[#050b18] rounded border border-white/10 flex flex-col justify-between h-24">
                      <span className="block text-[8px] font-mono text-slate-500 uppercase">Dictamen del Control</span>
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded text-[10px] tracking-wide font-black uppercase font-mono ${
                          healthIssues.every(h => h.status === 'CLEANED') 
                            ? 'bg-emerald-505/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {healthIssues.every(h => h.status === 'CLEANED') ? 'APROBADO' : 'FALLA CRÍTICA'}
                        </span>
                      </div>
                      <span className="text-[7.5px] font-mono text-slate-500 text-center">Filtro de Salud de Compuerta 1</span>
                    </div>
                  </div>

                  {/* INTERACTIVE SANITIZER FORM - DIRECT ACTION FOR BIM MANAGERS */}
                  <div className="bg-black/60 p-4 rounded border border-white/5 space-y-3 text-left">
                    <span className="block text-xs font-bold text-slate-100 uppercase tracking-wider">
                      📋 Requisitos del Filtro Técnico de Salud:
                    </span>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      El modelo de <strong className="text-white">{selectedAuditModel}</strong> tiene errores nativos. Haz clic en el botón de la derecha para simular las correcciones que realizaría el modelador en Revit:
                    </p>

                    <div className="space-y-2">
                      {healthIssues.map(issue => (
                        <div key={issue.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 rounded border border-white/5 bg-black/40 font-mono text-xs">
                          <div className="max-w-xl">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${issue.status === 'CLEANED' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`}></span>
                              <span className={`font-black tracking-tight ${issue.status === 'CLEANED' ? 'text-emerald-400' : 'text-red-400'}`}>{issue.name}</span>
                            </div>
                            <p className="text-[9.5px] text-slate-350 mt-1">{issue.description}</p>
                            <span className="text-[8px] text-zinc-500 block mt-0.5 font-sans leading-none">Consecuencia: {issue.impact}</span>
                          </div>

                          <button 
                            id={`fix-btn-${issue.id}`}
                            onClick={() => handleFixHealthIssue(issue.id)}
                            className={`px-3 py-1.5 rounded text-[8.5px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                              issue.status === 'CLEANED' 
                                ? 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700' 
                                : 'bg-pink-600/20 text-pink-400 border border-pink-500/25 hover:bg-pink-600/35'
                            }`}
                          >
                            {issue.status === 'CLEANED' ? 'Deshacer Corrección' : 'Resolver en Revit'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terminal output feedback */}
                  <div className="mt-4 p-4 bg-black rounded border border-white/10 font-mono text-[10px]">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2 text-[9px] text-slate-500 uppercase tracking-widest">
                      <span>Resultado de Ejecución de Filtro de Calidad</span>
                      <span className="text-pink-500">M01 Engine</span>
                    </div>
                    <p className={`text-pretty ${auditMessage.startsWith('🛑') ? 'text-red-450 font-bold' : auditMessage.startsWith('🎉') ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                      {auditMessage}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      id="btn-run-m01-audit"
                      onClick={handleRunHealthScanner}
                      disabled={isAuditing}
                      className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-mono font-black text-[10px] uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(219,39,119,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
                      {isAuditing ? "CORRIENDO DIAGNÓSTICO..." : "Ejecutar Filtro Automático de Salud (Validar Compuerta M01)"}
                    </button>
                  </div>

                </div>
              </div>

              {/* MANUAL SIDEBAR SPECIFICATIONS */}
              <div className="glass-panel p-6 border border-white/5 bg-artis-black/40 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-pink-550 font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" /> Concepto Clave
                  </div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">Filtro de Salud del Modelo</h4>
                  
                  <div className="space-y-4 text-xs font-medium text-slate-400 leading-relaxed">
                    <p>
                      El Coordinador de cada disciplina actúa como aduana técnica de calidad informática antes de que el archivo final cruce fronteras.
                    </p>
                    <p>
                      Cargar modelos con advertencias reprimidas o duplicados genera colapso informático en la fase federada de coordinación.
                    </p>
                    <ul className="space-y-3 mt-4 text-[11px] font-mono">
                      <li className="flex gap-2">
                        <span className="text-pink-550 font-black">•</span>
                        <span><strong>Duplicados (0%):</strong> Previene la volumetría inflada que arruina el presupuesto de obra del cliente.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-pink-550 font-black">•</span>
                        <span><strong>Desconexiones:</strong> Protege que existan tuberías flotando libres sin flujo.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 bg-pink-500/5 p-4 rounded border border-pink-500/10 text-pretty">
                  <div className="text-[8px] font-mono text-pink-500 font-bold uppercase tracking-widest mb-1">M01 - Control Interno</div>
                  <span className="text-[10px] text-slate-300 leading-relaxed italic block">
                    No promueva a SHARED nada que no apruebe la auditoría. &quot;Si entra basura, sale basura magnificada&quot;.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 3: SHARED (MUTUO ENLAZADO & SOLO LECTURA TERCEROS)
              ========================================================================= */}
          {activeTab === 2 && (
            <motion.div
              id="cde-step-shared"
              key="shared"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {/* INTERACTIVE WORKSPACE */}
              <div className="xl:col-span-2 space-y-4 text-left">
                <div className="glass-panel p-6 border-l-4 border-cyan-400 bg-artis-black/40">
                  <h3 className="text-md font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-cyan-400" />
                    ETAPA 3: SHARED (COMPARTIDO) — CONFIGURAR COORDINACIÓN MULTIDISCIPLINAR
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed text-pretty">
                    <strong>BIM Manager Challenge:</strong> En el contenedor SHARED, los modelos limpios se vinculan entre sí como fondos referenciales inalterables. Configure las reglas mecánicas de <strong>Solo Lectura para Terceros</strong> y establezca la frecuencia reglamentaria de enlazado de vínculos.
                  </p>
                </div>

                {/* Sincronizacion de enlaces de fondo Panel */}
                <div className="glass-panel p-6 border border-white/5 bg-artis-black/60 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Matriz de Enlaces Cruzados e Inmutabilidad</span>
                    <span className="text-[8.5px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 uppercase font-mono">Consumo de Vínculos Cruzados</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    
                    {/* Camilo's Approved Structure link logic */}
                    <div className="p-4 bg-black/45 border border-white/5 rounded flex flex-col justify-between h-28">
                      <div className="flex justify-between items-center">
                        <span className="text-[8.5px] font-black font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">EST ESTRUCTURAS</span>
                        <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-xs font-black block text-slate-200 mt-1 uppercase">Camilo_Estructuras.rvt</span>
                        <span className="text-[8.5px] font-mono text-zinc-500">Último Guardado: Aprobado por M01</span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold tracking-tight">Solo Lectura para ARQ/MEP</span>
                    </div>

                    {/* Diana's Architecture Approved link logic */}
                    <div className="p-4 bg-black/45 border border-white/5 rounded flex flex-col justify-between h-28">
                      <div className="flex justify-between items-center">
                        <span className="text-[8.5px] font-black font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">ARQ ARQUITECTURA</span>
                        <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-xs font-black block text-slate-200 mt-1 uppercase">Diana_Arquitectura.rvt</span>
                        <span className="text-[8.5px] font-mono text-zinc-500">Fondo limpio cargado</span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold tracking-tight">Solo Lectura para EST/MEP</span>
                    </div>

                    {/* Mateo's MEP Approved link logic */}
                    <div className="p-4 bg-black/45 border border-white/5 rounded flex flex-col justify-between h-28">
                      <div className="flex justify-between items-center">
                        <span className="text-[8.5px] font-black font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">MEP INSTALACIONES</span>
                        <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-xs font-black block text-slate-200 mt-1 uppercase">Mateo_Instalaciones.rvt</span>
                        <span className="text-[8.5px] font-mono text-zinc-500">Canalizaciones aprobadas</span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold tracking-tight">Solo Lectura para ARQ/EST</span>
                    </div>

                  </div>

                  {/* Frecuencia Select Configurator */}
                  <div className="p-4 bg-black/70 rounded border border-white/5 space-y-3 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="block text-xs font-extrabold text-slate-204 uppercase">Frecuencia Obligatoria de Actualización Mutua de Fondos</span>
                        <p className="text-[10px] text-slate-400 font-sans mt-0.5">La rapidez con que se refrescan las copias de referencia.</p>
                      </div>

                      <div className="flex bg-[#050b12] p-1 rounded border border-white/5 gap-1">
                        {(['Semanal', 'Quincenal', 'Mensual'] as const).map(freq => (
                          <button
                            id={`sync-freq-btn-${freq}`}
                            key={freq}
                            onClick={() => setSyncFrequency(freq)}
                            className={`px-3 py-1.5 text-[9px] font-mono uppercase font-black rounded transition-all cursor-pointer ${
                              syncFrequency === freq ? "bg-cyan-400 text-black font-black" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] gap-2 font-mono">
                      <span className="text-zinc-500 uppercase">Última Promoción / Sincronización Realizada:</span>
                      <span className="text-amber-400 font-bold">{lastSyncDate}</span>
                    </div>
                  </div>

                  {/* Interactive Trigger for sync links */}
                  <div className="mt-4 space-y-2">
                    <button
                      id="btn-sync-shared-links"
                      onClick={handleSyncShared}
                      disabled={isSyncingShared}
                      className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-black text-[10px] uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-45"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncingShared ? "animate-spin" : ""}`} />
                      {isSyncingShared ? "ACTUALIZANDO ENLACES MUTUOS DE SHARED..." : "Sincronizar y Forzar Inmutabilidad en SHARED"}
                    </button>

                    {sharedLog.length > 0 && (
                      <div className="bg-black/90 p-4 border border-white/5 rounded font-mono text-[9.5px] space-y-1.5 h-40 overflow-y-auto text-left">
                        {sharedLog.map((log, lIdx) => (
                          <div key={lIdx} className={`${
                            log.startsWith("✅") ? "text-emerald-400 font-bold" :
                            log.startsWith("❌") ? "text-red-400 font-bold" :
                            log.startsWith("🔒") ? "text-amber-400" : "text-slate-400"
                          }`}>
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* MANUAL SIDEBAR SPECIFICATIONS */}
              <div className="glass-panel p-6 border border-white/5 bg-artis-black/40 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Concepto Clave
                  </div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">Solo Lectura para Terceros</h4>
                  
                  <div className="space-y-4 text-xs font-medium text-slate-400 leading-relaxed text-pretty">
                    <p>
                      En el contenedor <strong>SHARED (Compartido)</strong>, la inmutabilidad es crítica. El modelo estructural aprobado de Camilo se aloja aquí para que Diana y Mateo lo vinculen en Arquitectura y viceversa.
                    </p>
                    <p className="border-l-2 border-cyan-400 pl-3 py-1 bg-cyan-400/[0.02]">
                      <strong>Regla CDE:</strong> Nadie ajeno a la disciplina autora puede modificar ese archivo de forma deliberada; solo pueden consumirlo pasivamente como fondo estático de referencia.
                    </p>
                    <p>
                      La frecuencia pactada (ej. <strong>Quincenal</strong>) establece un hito obligatorio para que todos muevan sus progresos y sigan diseñando bajo información real.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 bg-cyan-400/5 p-4 rounded border border-cyan-400/10">
                  <div className="text-[8px] font-mono text-cyan-405 font-bold uppercase tracking-widest mb-1 text-zinc-500">M02 - Coordinación</div>
                  <span className="text-[10px] text-slate-300 leading-relaxed italic block">
                    No permita la edición desordenada cruzada. Mantenga siempre los vínculos protegidos en modo Solo Lectura.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 4: G2 (MESA FEDERADA, COMPUERTA 2 CONTRACTUAL & BCF CLASH)
              ========================================================================= */}
          {activeTab === 3 && (
            <motion.div
              id="cde-step-federated"
              key="federated"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {/* INTERACTIVE WORKSPACE */}
              <div className="xl:col-span-2 space-y-4 text-left">
                <div className="glass-panel p-6 border-l-4 border-amber-500 bg-artis-black/40">
                  <h3 className="text-md font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-amber-500" />
                    ETAPA 4: REVISIÓN Y APROBACIÓN (COMPUERTA 2) — LA MESA FEDERADA BCF
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                    <strong>BIM Manager Challenge:</strong> Consolide las disciplinas en un solo modelo global federado (IFC abierto) para correr pruebas de interferencia. Configure la **Estrategia de Informes de Colisión**: ¿Ejecuta una matriz de interferencias ciega &quot;todos contra todos&quot; que inunda de falsas alarmas, u optimiza los cruces siguiendo la pirámide de orden jerárquico según la ISO 19650?
                  </p>
                </div>

                {/* ESTRATEGIA PICKER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Classic exhaustive matrix */}
                  <div 
                    onClick={() => {
                      setClashStrategy('CLASSIC_66');
                    }}
                    className={`p-4 rounded border text-left cursor-pointer transition-all ${
                      clashStrategy === 'CLASSIC_66'
                        ? 'bg-rose-500/10 border-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] text-white'
                        : 'bg-black/45 border-white/5 hover:border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-450 font-bold">PIRÁMIDE CLÁSICA (66 INFORMES)</span>
                      <AlertTriangle className={`w-4 h-4 ${clashStrategy === 'CLASSIC_66' ? 'text-rose-500 animate-bounce' : 'text-slate-500'}`} />
                    </div>
                    <h4 className="text-sm font-black uppercase text-white truncate">Cruces Técnicos Exhaustivos</h4>
                    <p className="text-[10.5px] text-slate-400 mt-1 leading-tight font-sans">
                      Pruebas redundantes todos-contra-todos. Se testean especialidades sin prioridad física orquestada, impregnando el CDE de alarmas irrelevantes.
                    </p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                      <span>Reportes generados:</span>
                      <span className="text-rose-450 font-extrabold font-mono">66 Informes / 784 Clashes ⚠️</span>
                    </div>
                  </div>

                  {/* Option 2: Optimized hierarchical pyramid */}
                  <div 
                    onClick={() => {
                      setClashStrategy('OPTIMIZED_10');
                    }}
                    className={`p-4 rounded border text-left cursor-pointer transition-all ${
                      clashStrategy === 'OPTIMIZED_10'
                        ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-white'
                        : 'bg-black/45 border-white/5 hover:border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">PIRÁMIDE OPTIMIZADA (10 INFORMES)</span>
                      <CheckCircle2 className={`w-4 h-4 ${clashStrategy === 'OPTIMIZED_10' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                    </div>
                    <h4 className="text-sm font-black uppercase text-white truncate">Gobernanza de Jerarquía</h4>
                    <p className="text-[10.5px] text-slate-400 mt-1 leading-tight font-sans">
                      Cascada secuencial de 10 relaciones prioritarias críticas. Elimina los falsos positivos por autocomisión o interacciones imposibles.
                    </p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                      <span>Reportes generados:</span>
                      <span className="text-emerald-400 font-extrabold font-mono font-black">10 Informes / 2 Clashes Clave ✅</span>
                    </div>
                  </div>
                </div>

                {/* ESTRATEGIA VISUAL CONTENT AREA */}
                <div className="glass-panel p-5 border border-white/5 bg-artis-black/60 relative">
                  
                  {clashStrategy === 'CLASSIC_66' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">Matriz Triangular Clásica: Revisiones de Cruces Técnicos</h4>
                          <span className="text-[10px] text-rose-450 italic font-mono mt-0.5 block">
                            Suma de diagonales para 11 disciplinas: 11*12/2 = 66 Informes redundantes de colisión activos
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-rose-400 border border-rose-500/35 bg-rose-500/15 px-2 py-0.5 rounded tracking-widest font-black uppercase">
                          FATIGA DE COLISIONES
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        {/* Triangular interactive layout */}
                        <div className="space-y-1 bg-black/45 p-4 rounded border border-white/5">
                          {/* Columns headers */}
                          <div className="grid grid-cols-12 gap-0.5 text-[7.5px] font-mono text-zinc-500 mb-1">
                            <div className="col-span-1"></div>
                            {[
                              { code: "EST", name: "Estructura" },
                              { code: "ARQ", name: "Arquitectura" },
                              { code: "ILU", name: "Iluminación" },
                              { code: "DES", name: "Desagües" },
                              { code: "HVA", name: "HVAC" },
                              { code: "RCI", name: "RCI" },
                              { code: "SUM", name: "Suministro" },
                              { code: "GAS", name: "Gas" },
                              { code: "ELE", name: "Eléctrico" },
                              { code: "SEG", name: "Seguridad y control" },
                              { code: "DET", name: "Detección" }
                            ].map((h, hIdx) => (
                              <div key={hIdx} className="text-center font-black" title={h.name}>{h.code}</div>
                            ))}
                          </div>

                          {/* Rows with lower triangular squares */}
                          {[
                            { name: "Estructura", code: "EST" },
                            { name: "Arquitectura", code: "ARQ" },
                            { name: "Iluminación", code: "ILU" },
                            { name: "Desagües", code: "DES" },
                            { name: "HVAC", code: "HVA" },
                            { name: "RCI", code: "RCI" },
                            { name: "Suministro", code: "SUM" },
                            { name: "Gas", code: "GAS" },
                            { name: "Eléctrico", code: "ELE" },
                            { name: "Seguridad y control", code: "SEG" },
                            { name: "Detección", code: "DET" }
                          ].map((dRow, rIdx, arr) => (
                            <div key={rIdx} className="grid grid-cols-12 gap-0.5 items-center">
                              {/* Row tag */}
                              <div className="col-span-1 text-[7px] font-mono font-bold text-slate-400 truncate text-right pr-1" title={dRow.name}>
                                {dRow.code}
                              </div>
                              {/* Cells */}
                              {arr.map((dCol, cIdx) => {
                                const isActive = rIdx >= cIdx;
                                const isCellHovered = hoveredCell?.r === rIdx && hoveredCell?.c === cIdx;
                                return (
                                  <div
                                    key={cIdx}
                                    onMouseEnter={() => isActive && setHoveredCell({ r: rIdx, c: cIdx })}
                                    onMouseLeave={() => setHoveredCell(null)}
                                    className={`aspect-square rounded-[1px] transition-all duration-100 ${
                                      isActive
                                        ? isCellHovered
                                          ? "bg-rose-500 scale-125 shadow-[0_0_8px_rgba(239,68,68,1)] z-10 cursor-pointer"
                                          : "bg-[#718096]/30 border border-white/5 hover:bg-rose-600/60 cursor-pointer"
                                        : "bg-transparent pointer-events-none"
                                    }`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>

                        {/* Interactive analysis response */}
                        <div className="space-y-3 font-sans">
                          <div className="bg-[#050b18] p-4 rounded border border-white/5 text-xs text-left min-h-[170px]">
                            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wide block">
                              Inspección de Cruces en Bloque (66 Informes):
                            </span>
                            
                            {hoveredCell ? (
                              <div className="mt-3 space-y-2 font-mono">
                                <p className="text-[11px] text-zinc-300">
                                  Cruces Técnicos Activados: <br/> 
                                  <strong className="text-white text-xs uppercase">{[
                                    "Estructura", "Arquitectura", "Iluminación", "Desagües", "HVAC", "RCI", "Suministro", "Gas", "Eléctrico", "Seguridad y control", "Detección"
                                  ][hoveredCell.r]}</strong> 
                                  <span className="text-rose-455 font-bold"> vs </span> 
                                  <strong className="text-white text-xs uppercase">{[
                                    "Estructura", "Arquitectura", "Iluminación", "Desagües", "HVAC", "RCI", "Suministro", "Gas", "Eléctrico", "Seguridad y control", "Detección"
                                  ][hoveredCell.c]}</strong>
                                </p>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                                  {hoveredCell.r === hoveredCell.c 
                                    ? "⚠️ AUTOCOLISIÓN INDEBIDA: Analiza interferencias de un archivo contra sí mismo. Genera miles de falsas alarmas y duplicidades innecesarias en Revit que congestionan el log de fallas."
                                    : "⚠️ CRUCE EXPUESTO AL RUIDO: Los test redundantes como Electricidad vs Clima producen falsos positivos masivos. Los instaladores desvían manualmente estos trazados flexibles sin planos."
                                  }
                                </p>
                                <div className="p-1 px-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9.5px] text-rose-450 font-bold">
                                  Prueba redundante. Satura el CDE de ruidos inútiles.
                                </div>
                              </div>
                            ) : (
                              <div className="mt-4 text-center py-6 text-zinc-500 text-xs italic font-sans animate-pulse">
                                Pase el cursor sobre los cuadros de la matriz triangular (66 informes activos) para explorar detalladamente las colisiones que congestionan.
                              </div>
                            )}
                          </div>

                          <div className="p-3 bg-red-500/5 border border-red-500/20 rounded text-[10px] text-slate-300 font-medium leading-relaxed text-left">
                            <span className="text-red-400 font-bold uppercase block text-[11px] mb-1">Patología Técnica del BIM Manager</span>
                            La Mesa Federada usando esta matriz genera **784 colisiones cruzadas residuo**. Diana (ARQ) y Camilo (EST) pierden semanas analizando alertas de ruteos de aire vs cables que en obra se solucionan con simple desvío flexible. Esto paraliza el visado comercial e impide certificar el hito.
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 font-sans">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-extrabold text-white font-sans">Pirámide de Coordinación Jerárquica Optimizada</h4>
                          <span className="text-[10px] text-emerald-400 italic font-mono mt-0.5 block">
                            Normativa ISO 19650: Los hilos de coordinación secuenciales protegen la toma de decisiones
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 rounded tracking-widest font-black uppercase">
                          CERO RUIDO ACTIVO
                        </span>
                      </div>

                      {/* Display Waterfall Ladder from image 3 */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start font-sans">
                        {/* Priority Sequence block list */}
                        <div className="space-y-1 py-1 max-h-[300px] overflow-y-auto pr-1 bg-black/45 p-3 rounded border border-white/5 scrollbar-thin text-left">
                          {[
                            { specA: "ARQUITECTURA", specB: "ESTRUCTURA", colA: "bg-lime-500 text-black", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "ESTRUCTURA", specB: "SANITARIO", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "SANITARIO", specB: "ELÉCTRICO", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "ELÉCTRICO", specB: "SUMINISTRO", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "SUMINISTRO", specB: "LLUVIAS", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "LLUVIAS", specB: "RCI", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "RCI", specB: "GAS", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "GAS", specB: "HVAC", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "HVAC", specB: "SEG. HUMANA", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" },
                            { specA: "SEG. HUMANA", specB: "CCTV", colA: "bg-purple-600/30 text-purple-200", colB: "bg-purple-600/30 text-purple-200" }
                          ].map((pair, idx) => (
                            <div 
                              key={idx} 
                              className="group flex items-center justify-between p-1.5 px-3 rounded border border-white/5 bg-zinc-900/60 text-[10px] font-mono hover:bg-zinc-800 transition-all text-left"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="text-[8.5px] font-black text-slate-500 w-3.5 font-mono">{idx + 1}.</span>
                                
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${pair.colA}`}>
                                  {pair.specA}
                                </span>
                                <span className="text-zinc-550 text-[9px] font-bold">vs</span>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${pair.colB}`}>
                                  {pair.specB}
                                </span>
                              </div>
                              <span className="text-[8px] text-emerald-400 font-extrabold tracking-wide uppercase font-mono">Prioritario</span>
                            </div>
                          ))}
                        </div>

                        {/* Concept analysis sidebar */}
                        <div className="space-y-3 text-left font-sans">
                          <div className="bg-[#050b18] p-4 rounded border border-white/5 text-xs text-left">
                            <span className="text-[10px] font-mono text-emerald-400 font-black uppercase tracking-wide block font-sans">
                              Ventajas de la Gobernanza Jerárquica:
                            </span>
                            <ul className="space-y-2 mt-3 list-none text-slate-300 text-[11px] leading-relaxed">
                              <li className="flex gap-2">
                                <span className="text-emerald-400 font-bold font-mono">1.</span>
                                <span>**Cascada de Rigidez:** Primero se congela Arquitectura vs Estructura. Lo pesado impone posición a todas las colitantes menores.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-emerald-400 font-bold font-mono font-bold">2.</span>
                                <span>**Cero Autocolisiones:** Desactiva chequeos redundantes de un modelo consigo mismo. Purgado absoluto del BCF.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-emerald-400 font-bold font-mono font-bold">3.</span>
                                <span>**Poli-Saneado:** El CDE se reduce de 784 falsos positivos a únicamente **2 incidencias genuinas** de geometría principal.</span>
                              </li>
                            </ul>
                            <div className="mt-3 p-1.5 px-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9.5px] text-emerald-400 font-mono text-center font-bold">
                              ¡BIM Management de Alto Rendimiento!
                            </div>
                          </div>

                          <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded text-[10px] text-slate-300 font-medium leading-relaxed font-sans">
                            <strong className="text-emerald-400 font-bold uppercase block text-[11px] mb-1">Impacto de la Priorización en CDE:</strong>
                            Al priorizar de forma piramidal, sólo se listan conflictos que arruinarían el flujo de paso o la estabilidad dimensional de columnas en sótano. El modelado queda limpio, y la aprobación queda lista.
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

                {/* Federated interactive screen */}
                <div className="glass-panel p-6 border border-white/5 bg-artis-black/60 relative overflow-hidden font-sans">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Incidencias de Clash Federadas Estándar BCF</span>
                    <span className="text-[8.5px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase font-mono">Consolidación Federada</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* BCF Issue List */}
                    <div className="bg-black/40 rounded border border-white/5 p-3 space-y-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Listado de Incidencias BCF</span>
                      <div className="space-y-1 mt-2">
                        {tickets.map(t => (
                          <div 
                            key={t.id}
                            onClick={() => setSelectedClash(t.id)}
                            className={`p-2 rounded text-xs select-none transition-all cursor-pointer font-mono flex flex-col ${
                              selectedClash === t.id 
                                ? "bg-amber-550/15 border-l-4 border-amber-500 text-white font-bold" 
                                : "bg-white/[0.01] hover:bg-white/5 text-slate-400 border border-transparent"
                            }`}
                          >
                            <div className="flex justify-between items-center text-[9px] mb-1">
                              <span>🆔 {t.id}</span>
                              <span className={`px-1 rounded text-[8px] font-black ${t.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-450 border border-rose-550/20'}`}>
                                {t.status === 'RESOLVED' ? 'RESUELTO' : 'ABIERTO'}
                              </span>
                            </div>
                            <span className="truncate text-[10px]">{t.elementA.split(" (")[0]} vs {t.elementB.split(" (")[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clash details and Interactive Solution Parameters */}
                    <div className="md:col-span-2 bg-[#050b12] rounded border border-white/10 p-4 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/15 pb-2">
                        <span className="text-[10px] font-bold text-amber-400 font-mono">Análisis de Conflicto: {activeClash.id}</span>
                        <span className="text-[9px] text-zinc-500">Asignado a: {activeClash.assignee}</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2 bg-black/30 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase">Elemento Colitante A:</span>
                            <span className="text-slate-300 font-bold">{activeClash.elementA}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase">Elemento Colitante B:</span>
                            <span className="text-slate-300 font-bold">{activeClash.elementB}</span>
                          </div>
                        </div>

                        {/* Visual Clash Proposal slider/selector block */}
                        {activeClash.id === "CF-01" && activeClash.status === "OPEN" && (
                          <div className="p-3 bg-amber-500/5 border border-amber-500/25 rounded space-y-3">
                            <span className="text-[10px] font-black text-amber-400 block uppercase font-mono">Ajuste Técnico BIM Manager (Parámetro de ducto):</span>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-300 font-bold">Ajustes de altura de libre paso arquitectónico:</span>
                                <span className={`font-mono font-black ${step4HeightCheck < 2.10 ? 'text-red-400' : 'text-emerald-400'}`}>
                                  {step4HeightCheck.toFixed(2)} metros {step4HeightCheck < 2.10 ? '⚠️ (PROHIBIDO POR LA NORMA)' : '✅ (APTO)'}
                                </span>
                              </div>

                              {/* Target selector range for BIM decision */}
                              <div className="flex gap-2 justify-between">
                                {[2.00, 2.05, 2.12, 2.20].map((val) => (
                                  <button
                                    id={`height-val-selector-${val}`}
                                    key={val}
                                    onClick={() => setStep4HeightCheck(val)}
                                    className={`px-3 py-1 rounded text-[10px] font-mono font-black border transition-all cursor-pointer ${
                                      step4HeightCheck === val
                                        ? "bg-amber-500 text-black border-amber-500"
                                        : "bg-black/60 text-slate-400 border-white/5 hover:border-white/10"
                                    }`}
                                  >
                                    {val.toFixed(2)}m
                                  </button>
                                ))}
                              </div>

                              <p className="text-[9.5px] text-slate-400 font-sans leading-relaxed">
                                * Si baja el nivel a menos de <span className="text-white">2.10m</span>, se incumple la altura libre obligatoria de sótano. Si lo mantiene más alto, Mateo (MEP) tendrá que re-rutear el ducto rodeando la viga ST-04 de Camilo.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="bg-black/50 p-2.5 rounded border border-white/5 text-[10px] space-y-1">
                          <span className="text-zinc-550 font-bold block uppercase text-[8px]">Propuesta de Solución Técnica BCF:</span>
                          <span className="text-slate-300 italic block leading-relaxed">{activeClash.proposal}</span>
                        </div>

                        {activeClash.status === "OPEN" ? (
                          <button
                            id={`btn-resolve-clash-${activeClash.id}`}
                            onClick={() => handleResolveBcfTicket(activeClash.id)}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-[9.5px] uppercase tracking-wider rounded transition-all cursor-pointer"
                          >
                            Autorizar Resolución Técnica en Modelo Federado
                          </button>
                        ) : (
                          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-black text-center rounded">
                            ✅ INCIDENCIA RESUELTA Y PROMOVIDA AL MODELO INTEGRAL
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DIGITAL SIGNATURE FOR CONTRACTUAL CERTIFICATE */}
                  <div className="mt-4 p-4 bg-artis-orange/5 border border-artis-orange/20 rounded space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="block text-xs font-black text-amber-400 uppercase">Estampar Firma Digital Contractual (M02)</span>
                        <p className="text-[9.5px] text-slate-400">Sólo aplicable cuando no existan incidencias de Clash pendientes (BCF Resueltas al 100%).</p>
                      </div>

                      <button
                        id="btn-sign-contractual"
                        onClick={handleSignContractualMilestone}
                        disabled={isSigning || tickets.some(t => t.status === 'OPEN')}
                        className={`px-4 py-2.5 text-[9px] font-mono font-black uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          tickets.some(t => t.status === 'OPEN')
                            ? 'bg-zinc-800 text-zinc-550 border border-transparent opacity-95 cursor-not-allowed'
                            : 'bg-amber-500 hover:bg-amber-400 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {isMilestoneDigitalSigned ? 'CONTRATO FIRMADO' : 'Firmar Hito Contractual'}
                      </button>
                    </div>

                    {signingLog.length > 0 && (
                      <div className="bg-black/90 p-4 border border-white/5 rounded font-mono text-[9px] space-y-1 h-32 overflow-y-auto text-left">
                        {signingLog.map((log, lIdx) => (
                          <div key={lIdx} className={`${
                            log.startsWith("✅") || log.startsWith("✍️") ? "text-emerald-400 font-bold" : "text-slate-400"
                          }`}>
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* MANUAL SIDEBAR SPECIFICATIONS */}
              <div className="glass-panel p-6 border border-white/5 bg-artis-black/40 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-amber-500 font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Directriz Técnica
                  </div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">Mesa Federada e Interoperabilidad</h4>
                  
                  <div className="space-y-4 text-xs font-medium text-slate-400 leading-relaxed text-pretty">
                    <p>
                      La revisión mutua consolidada exige el uso de formatos de datos abiertos (<strong>IFC</strong>) y el sistema de gestión estandarizado de incidencias (<strong>BCF</strong>).
                    </p>
                    <p className="border-l-2 border-amber-550 pl-3 py-1 bg-amber-500/[0.02]">
                      <strong>Firma Digital:</strong> Una vez resueltas las colisiones (Ductos vs Vigas) y validados los parámetros, el cliente sella digitalmente los planos definitivos congelándolos contractualmente.
                    </p>
                    <p>
                      Esto evita reclamos en obra por parte de constructores subcontratistas y resguarda la legalidad del hito BIM.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 bg-amber-505/5 p-4 rounded border border-amber-500/10 text-pretty">
                  <div className="text-[8px] font-mono text-amber-400 font-bold uppercase tracking-widest mb-1">M03 - Contractual</div>
                  <span className="text-[10px] text-slate-300 leading-relaxed italic block font-sans">
                    Nadie aprueba un hito legal con archivos con advertencias o interferencias abiertas en el BCF.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 5: PUBLISH (EL DESTINO DEL DATO Y RENDIMIENTO OPTIMIZADO PARA LUIS FERNANDO TOBÓN)
              ========================================================================= */}
          {activeTab === 4 && (
            <motion.div
              id="cde-step-publish"
              key="publish"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {/* INTERACTIVE WORKSPACE */}
              <div className="xl:col-span-2 space-y-4 text-left">
                <div className="glass-panel p-6 border-l-4 border-red-500 bg-artis-black/40">
                  <h3 className="text-md font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Globe className="w-5 h-5 text-red-500 animate-pulse" />
                    ETAPA 5: PUBLISH (PUBLICADO) — EL DESTINO FINAL DEL DATO
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed text-pretty">
                    <strong>BIM Manager Challenge:</strong> Los datos ya no son para los diseñadores de oficina. Es para el equipo de construcción de obra (Ing. Luis Fernando Tobón) y la gerencia en el terreno en el campamento Kennedy. Configure las salidas optimizadas para hardware estándar corporativo (I3, 8GB y red 4G inestable).
                  </p>
                </div>

                {/* Performance Simulator Screen */}
                <div className="glass-panel p-6 border border-white/5 bg-artis-black/60 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Modelador de Performance en Obra</span>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mt-0.5">Visor Móvil & Benchmarks de Carga</h4>
                    </div>
                    <span className="text-[8px] text-red-400 font-extrabold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 uppercase font-mono">Campamento Kennedy</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Setup Output Formats */}
                    <div className="bg-[#050b12] rounded border border-white/10 p-4 space-y-3">
                      <span className="text-[10px] font-bold text-slate-350 block uppercase font-mono pb-2 border-b border-white/5">
                        Seleccionar Formato de Salida
                      </span>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Native RVT */}
                        <button
                          id="format-selector-native"
                          onClick={() => setPublishFormat('NATIVE')}
                          className={`p-3 rounded border text-left transition-all cursor-pointer ${
                            publishFormat === 'NATIVE'
                              ? 'bg-rose-500/10 border-rose-550 text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                              : 'bg-black/40 border-white/5 text-slate-505 hover:bg-black/65'
                          }`}
                        >
                          <span className="block text-[8px] uppercase font-bold text-rose-450 font-mono">No Recomendado</span>
                          <span className="text-xs font-black block mt-0.5">NATIVO RVT CRUDO</span>
                          <span className="text-[9px] text-zinc-500 block mt-1">Peso: 1.5 Gigabytes</span>
                        </button>

                        {/* Optimized PDF / IFC */}
                        <button
                          id="format-selector-optimized"
                          onClick={() => setPublishFormat('OPTIMIZED')}
                          className={`p-3 rounded border text-left transition-all cursor-pointer ${
                            publishFormat === 'OPTIMIZED'
                              ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                              : 'bg-black/40 border-white/5 text-slate-505 hover:bg-black/65'
                          }`}
                        >
                          <span className="block text-[8px] uppercase font-bold text-emerald-450 font-mono">Recomendado ISO 19650</span>
                          <span className="text-xs font-black block mt-0.5">PDF + IFC COMPACTO</span>
                          <span className="text-[9px] text-zinc-500 block mt-1">Peso: 22 Megabytes</span>
                        </button>
                      </div>

                      <div className="mt-2 text-[9.5px] text-slate-400 font-sans leading-relaxed">
                        * El formato nativo de Revit (.rvt) requiere una licencia de diseño cara y un procesador i7 de alta gama. El formato de planos vectoriales (PDF) y el IFC liviano permiten lectura universal y fluida.
                      </div>
                    </div>

                    {/* Hardware Simulation settings on Camp */}
                    <div className="bg-[#050b12] rounded border border-white/10 p-4 space-y-3">
                      <span className="text-[10px] font-bold text-slate-350 block uppercase font-mono pb-2 border-b border-white/5">
                        Simulador de Hardware & Red del Terreno
                      </span>

                      <div className="space-y-1">
                        <label className="block text-[9px] text-slate-500 uppercase font-mono">Estación de Destino:</label>
                        <select
                          value={activeDevice}
                          onChange={(e) => setActiveDevice(e.target.value as 'LAPTOP_I3' | 'TABLET_4G')}
                          className="w-full bg-black/65 text-slate-300 border border-white/5 p-1 rounded text-xs select-none cursor-pointer"
                        >
                          <option value="TABLET_4G">Tablet Móvil Básica con Chip 4G</option>
                          <option value="LAPTOP_I3">Notebook Corporativa Core i3 + 8GB RAM</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] text-slate-500 uppercase font-mono">Conectividad Campamento Kennedy:</label>
                        <div className="flex gap-1">
                          {(['UNSTABLE', 'STABLE'] as const).map(sig => (
                            <button
                              id={`signal-btn-${sig}`}
                              key={sig}
                              onClick={() => setNetworkSignal(sig)}
                              className={`px-2 py-1 text-[9px] font-mono border rounded cursor-pointer transition-all ${
                                networkSignal === sig
                                  ? 'bg-red-500/20 text-red-400 border-red-500/30 font-black'
                                  : 'bg-black/60 text-slate-500 border-white/5'
                              }`}
                            >
                              {sig === 'UNSTABLE' ? '📶 4G Inestable (Kennedy Obra)' : '📶 Fibra Conectada'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Benchmark action trigger */}
                  <div className="mt-4 space-y-2">
                    <button
                      id="btn-run-obras-test"
                      onClick={handleRunFieldTest}
                      disabled={isTestingDevice}
                      className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono font-black text-[10px] uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(239,68,68,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                    >
                      <Wifi className={`w-3.5 h-3.5 ${isTestingDevice ? "animate-pulse" : ""}`} />
                      {isTestingDevice ? "SIMULANDO ACCESO EN ORA..." : "Simular Apertura de Datos de Obra (Luis Fernando Tobón)"}
                    </button>

                    {deviceLogs.length > 0 && (
                      <div className="bg-black/95 p-4 border border-white/5 rounded font-mono text-[9.5px] space-y-1.5 h-44 overflow-y-auto text-left">
                        {deviceLogs.map((log, lIdx) => (
                          <div key={lIdx} className={`${
                            log.startsWith("✅") || log.startsWith("✔️") || log.startsWith("🚀") ? "text-emerald-400 font-bold" :
                            log.startsWith("❌") || log.startsWith("🛑") ? "text-rose-455 font-bold" :
                            log.startsWith("⚠️") ? "text-amber-450" : "text-slate-400"
                          }`}>
                            {log}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pedagogical Takeaways Panel */}
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-sm text-left">
                      <span className="text-[10px] font-mono text-red-405 font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Lightbulb className="w-3.5 h-3.5 text-red-450 animate-pulse" />
                        ¿Qué nos enseña esta Simulación? (Fase PUBLISH - ISO 19650)
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px] leading-relaxed text-slate-300">
                        <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
                          <h5 className="font-black text-rose-450 uppercase mb-1 font-mono text-[9.5px]">💻 Brecha de Hardware y Red</h5>
                          <p>
                            Al diseñar se trabaja con fibra óptica y equipos pesados. En obra (Campamento Kennedy), Luis Fernando Tobón dispone de un <span className="text-white">dispositivo básico y 4G inestable</span>. Enviar un archivo <span className="text-rose-400 font-semibold text-[10px] font-mono">1.5 GB RVT Crudo</span> significa colapso de red y crashes constantes.
                          </p>
                        </div>
                        <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
                          <h5 className="font-black text-emerald-400 uppercase mb-1 font-mono text-[9.5px]">🚀 Solución Abierta Especializada</h5>
                          <p>
                            Establecer un conducto automatizado a formato abierto <span className="text-emerald-400 font-semibold">PDF Vectorial + IFC Compacto (22 MB)</span> democratiza la consulta: descarga instantánea en 9 segundos y visualización fluida a 60 FPS en cualquier dispositivo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* MANUAL SIDEBAR SPECIFICATIONS */}
              <div className="glass-panel p-6 border border-white/5 bg-artis-black/40 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-red-500 font-mono text-[9px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" /> Concepto Clave
                  </div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">Apto para Construcción</h4>
                  
                  <div className="space-y-4 text-xs font-medium text-slate-400 leading-relaxed text-pretty">
                    <p>
                      El destino final del CDE es el contenedor <strong>PUBLISH (Publicado)</strong>. Toda información aquí contenida debe ser de lectura universal, fluida y de descarga ligera.
                    </p>
                    <p className="border-l-2 border-red-500 pl-3 py-1 bg-red-500/[0.02]">
                      <strong>Democratización de la Obra:</strong> Es una patología obligar al Ingeniero Residente en el campamento Kennedy a descargar 1.5 GB nativo de Revit si no posee hardware de renderizado pesado.
                    </p>
                    <p>
                      Configurar exportaciones compactas en PDFs vectoriales e IFC compactados (22 MB) le otorga fluidez a las consultas y agiliza los plazos de obra previniendo errores.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 bg-red-500/5 p-4 rounded border border-red-500/10 text-pretty">
                  <div className="text-[8px] font-mono text-red-400 font-extrabold uppercase tracking-widest mb-1">M04 - Liberación de Obra</div>
                  <span className="text-[10px] text-slate-300 leading-relaxed italic block">
                    &ldquo;El dato solo tiene valor cuando llega al trabajador en obra de forma nítida y usable bajo cualquier circunstancia.&rdquo;
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

// Simple visual fallback component name alignment matching imports
const AlertCheck = ShieldCheck;
