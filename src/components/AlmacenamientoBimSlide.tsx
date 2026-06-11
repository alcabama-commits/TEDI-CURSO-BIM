import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, Server, DollarSign, Cloud, ArrowRight, Zap, Coffee, Check, ShieldCheck, 
  Settings, HelpCircle, HardDrive, Cpu, AlertTriangle, RefreshCw, Lightbulb, TrendingUp
} from 'lucide-react';

export const AlmacenamientoBimSlide = () => {
  // Simulator state: default is optimized (e.g. 80 GB Hot, 240 GB Cool/Archive)
  const [hotStorage, setHotStorage] = useState<number>(80);
  const totalGB = 320;
  const coolStorage = totalGB - hotStorage;

  // Real world ballpark pricing per GB/month on Azure:
  // Hot Storage: ~$0.022 per GB
  // Cool/Archive Storage: ~$0.002 per GB
  const HOT_COST_PER_GB = 0.022;
  const COOL_COST_PER_GB = 0.0025;

  const hotMonthlyCost = hotStorage * HOT_COST_PER_GB;
  const coolMonthlyCost = coolStorage * COOL_COST_PER_GB;
  const totalMonthlyCost = hotMonthlyCost + coolMonthlyCost;

  // Baseline if everything was in Hot Storage
  const maxHotCost = totalGB * HOT_COST_PER_GB;
  const savingsPercent = totalMonthlyCost > 0 ? Math.round((1 - (totalMonthlyCost / maxHotCost)) * 100) : 0;

  // Preset layouts
  const applyPreset = (preset: 'all-hot' | 'optimized' | 'all-cool') => {
    if (preset === 'all-hot') {
      setHotStorage(320);
    } else if (preset === 'optimized') {
      setHotStorage(80); // 80GB WIP/Shared Active, 240GB Archive
    } else if (preset === 'all-cool') {
      setHotStorage(0);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      {/* Header section with branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-[0.2em] block mb-1">
            CLASE 5 — SECCIÓN 2: ESCALABILIDAD E INFRAESTRUCTURA
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <Cloud className="w-6 h-6 text-amber-500 shrink-0" />
            Infraestructura a Gran Escala y el Reto del Almacenamiento
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Equilibrio de Disponibilidad, Velocidad de Escritura y Costo en Microsoft Azure
          </p>
        </div>
        <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 self-start md:self-auto font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ESCENARIO ACTUAL: <strong>320 GB (HORIZONTE)</strong></span>
        </div>
      </div>

      {/* Introducción / Contexto */}
      <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
        Para administrar con éxito el inventario de <strong className="text-amber-400">320 GB</strong> de Horizonte y asegurar el escalado hacia proyectos masivos de la empresa, el BIM Manager debe optimizar de manera estricta los costos en infraestructuras de nube balanceando la Tríada de Almacenamiento. No todo debe vivir en caliente.
      </p>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Azure Tier Explanations (Tríada) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-black mb-1">
            LA TRÍADA DE RENDIMIENTO Y COSTO
          </div>

          {/* Hot Storage Card */}
          <div className={`p-4 bg-gradient-to-r from-amber-500/10 to-red-500/5 hover:from-amber-500/15 border rounded-xl transition-all duration-300 ${hotStorage > 100 ? 'border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-mono font-black text-white text-xs uppercase tracking-wider">Hot Storage (Caliente)</h4>
                  <p className="text-[10px] text-amber-400 font-mono font-bold">Producción Diaria (WIP)</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                ${HOT_COST_PER_GB.toFixed(3)}/GB
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-normal font-sans">
              Alta disponibilidad y latencia ultrabaja. Es ideal para archivos de modelado activo, subproyectos en sincronización continua y modelos federados que se modifican y revisan en tiempo real.
            </p>
            <div className="mt-2 pt-2 border-t border-white/5 flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Velocidad: <strong className="text-emerald-400">Inmediata (&lt;10ms)</strong></span>
              <span>Costo por GB: <strong className="text-red-400">Alto</strong></span>
            </div>
          </div>

          {/* Cool / Archive Storage Card */}
          <div className={`p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 hover:from-blue-500/15 border rounded-xl transition-all duration-300 ${coolStorage > 150 ? 'border-blue-500/30' : 'border-white/5'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono font-black text-white text-xs uppercase tracking-wider">Cool/Archive (Frío)</h4>
                  <p className="text-[10px] text-blue-400 font-mono font-bold">Modelos Terminados (AIM)</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                ${COOL_COST_PER_GB.toFixed(4)}/GB
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-normal font-sans">
              Custodia a largo plazo para modelos de proyectos cerrados, as-built históricos y nubes de puntos pesadas ya integradas. Costo por gigabyte extremadamente reducido.
            </p>
            <div className="mt-2 pt-2 border-t border-white/5 flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Velocidad: <strong className="text-amber-400">Lenta (Minutos/Horas)</strong></span>
              <span>Costo por GB: <strong className="text-emerald-400">Ultra Bajo</strong></span>
            </div>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-white/5 leading-relaxed text-[11px] text-slate-400 font-sans">
            ℹ️ <strong className="text-slate-300">¿Qué pasa si fallamos en balancear?</strong> Si pones todo en caliente, la empresa duplicará el gasto TI de Azure en unos meses. Si pones el WIP activo en frío para ahorrar, los ingenieros de Revit tardarán minutos enteros en sincronizar un solo muro, paralizando la producción de obra.
          </div>
        </div>

        {/* Right Column: Interactive Cost Simulator */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#040a17]/70 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>

          <div>
            {/* Header of Simulator */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[9px] font-mono text-amber-500 font-black uppercase tracking-widest block">HERRAMIENTA ACTIVA</span>
                <h3 className="text-lg font-mono font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                  Simulador de Azure Storage
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-450 block font-mono">DISTR. RECOMENDADA</span>
                <span className="text-xs text-amber-400 font-mono font-bold">25% Caliente / 75% Frío</span>
              </div>
            </div>

            {/* Presets buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={() => applyPreset('all-hot')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold transition-all border cursor-pointer ${hotStorage === 320 ? 'bg-red-500/15 border-red-500/40 text-red-100' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
              >
                🚨 Despilfarro (100% Caliente)
              </button>
              <button 
                onClick={() => applyPreset('optimized')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold transition-all border cursor-pointer ${hotStorage === 80 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.1)]' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
              >
                ✅ Optimizado (Fórmula Tríada)
              </button>
              <button 
                onClick={() => applyPreset('all-cool')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold transition-all border cursor-pointer ${hotStorage === 0 ? 'bg-blue-500/15 border-blue-500/40 text-blue-100' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
              >
                ⚠️ Inoperable (100% Frío)
              </button>
            </div>

            {/* Range Slider control */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-amber-500 font-black">🔥 CALIENTE (WIP/SHARED): <strong className="text-white text-sm">{hotStorage} GB</strong></span>
                <span className="text-blue-400 font-black">❄️ FRÍO/ARCHIVO (AIM): <strong className="text-white text-sm">{coolStorage} GB</strong></span>
              </div>

              {/* Slider Input */}
              <div className="relative">
                <input 
                  type="range" 
                  min="0" 
                  max="320" 
                  step="10" 
                  value={hotStorage} 
                  onChange={(e) => setHotStorage(Number(e.target.value))}
                  className="w-full h-2.5 bg-black/50 border border-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[9px] text-zinc-500 pt-1 font-mono">
                  <span>0 GB (Extremo Frío)</span>
                  <span>160 GB (50/50)</span>
                  <span>320 GB (Máximo Caliente)</span>
                </div>
              </div>
            </div>

            {/* Visual dynamic bar */}
            <div className="mb-6 h-6 w-full bg-slate-900 border border-white/5 rounded-full overflow-hidden flex font-mono text-[9px] text-center font-bold">
              {hotStorage > 0 && (
                <motion.div 
                  initial={{ width: "25%" }}
                  animate={{ width: `${(hotStorage / totalGB) * 100}%` }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-full flex items-center justify-center text-black px-2 overflow-hidden shrink-0"
                >
                  {Math.round((hotStorage / totalGB) * 100)}% HOT
                </motion.div>
              )}
              {coolStorage > 0 && (
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 h-full flex-1 flex items-center justify-center text-white px-2 overflow-hidden"
                >
                  {Math.round((coolStorage / totalGB) * 100)}% COOL
                </div>
              )}
            </div>

            {/* Simulated outcome parameters */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-left">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block leading-none">Costo Caliente</span>
                <span className="text-sm font-mono font-black text-amber-500 block mt-1">${hotMonthlyCost.toFixed(2)} /mes</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-left">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block leading-none">Costo Frío</span>
                <span className="text-sm font-mono font-black text-blue-400 block mt-1">${coolMonthlyCost.toFixed(2)} /mes</span>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500/10 to-red-500/5 rounded-xl border border-amber-500/20 text-left col-span-2 md:col-span-1">
                <span className="text-[9px] font-mono text-white/50 uppercase block leading-none flex items-center gap-1">
                  Costo Total Estimado
                </span>
                <span className="text-sm font-mono font-black text-white block mt-1">${totalMonthlyCost.toFixed(2)}/mes</span>
              </div>
            </div>

            {/* Scenario Evaluation message */}
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-white/5 min-h-[90px] flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {hotStorage === 320 ? (
                  <span className="p-1 px-2 rounded bg-red-500/10 text-red-400 font-mono text-[9px] border border-red-500/20 font-bold uppercase">DESPILFARRO</span>
                ) : hotStorage === 0 ? (
                  <span className="p-1 px-2 rounded bg-rose-500/10 text-rose-450 font-mono text-[9px] border border-rose-500/20 font-bold uppercase">CRÍTICO</span>
                ) : hotStorage > 0 && hotStorage <= 120 ? (
                  <span className="p-1 px-2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] border border-emerald-500/20 font-bold uppercase">ÓPTIMO</span>
                ) : (
                  <span className="p-1 px-2 rounded bg-amber-500/10 text-amber-400 font-mono text-[9px] border border-amber-500/20 font-bold uppercase">MOLERABLE</span>
                )}
              </div>
              <div className="text-xs text-slate-350 leading-relaxed font-sans">
                {hotStorage === 320 ? (
                  <p>
                    <strong className="text-white">Almacenamiento 100% Caliente:</strong> Gasto excesivo. Todo el inventario (incluyendo renders de hace un año y nubes de puntos estáticas) consume ancho de banda prémium de Azure. La empresa está pagando $7.04/mes por gigabytes congelados sin justificación.
                  </p>
                ) : hotStorage === 0 ? (
                  <p>
                    <strong className="text-red-400">¡Alerta de Inoperancia!</strong> Al archivar absolutamente todo: Cualquier modificación, federación rápida de archivos MEP, o la apertura diaria de Revit en WIP fallará. El tiempo de recuperación desde Archive puede tardar más de 3 horas, haciendo imposible el avance fluido de Horizonte.
                  </p>
                ) : hotStorage > 0 && hotStorage <= 120 ? (
                  <p>
                    <strong className="text-emerald-400">Balance Estratégico Aplicado:</strong> ¡Excelente decisión! Ha asignado ~{hotStorage} GB para la producción activa diaria en el CDE (WIP y Shared) y derivó {coolStorage} GB listos y consolidados a bóvedas de archivo de bajo costo. <strong className="text-emerald-400">¡Consigue un ahorro del {savingsPercent}% frente a la opción tradicional!</strong>
                  </p>
                ) : (
                  <p>
                    <strong className="text-amber-400">Tolerable pero mejorable:</strong> Tienes demasiados archivos en Hot Storage. Probablemente estás manteniendo modelos de entregas ya despachadas o archivos temporales en fases activas. Archivar unas cuantas carpetas de entregas antiguas reduciría la factura mensual de Azure.
                  </p>
                )}
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>Base Costo Máximo: $7.04 /mes</span>
            <span className="text-emerald-400">Ahorro conseguido: {savingsPercent}% (Aprox. ${(maxHotCost - totalMonthlyCost).toFixed(2)} /mes)</span>
          </div>

        </div>

      </div>

      {/* Box Pedagógico */}
      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded text-left shadow-md">
        <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          TIPS PEDAGÓGICOS: LA CUSTODIA DE ARCHIVO (AIM)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px] leading-relaxed text-slate-300 font-sans">
          <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
            <h5 className="font-bold text-amber-500 uppercase mb-1">EL MODELO AS-BUILT NO SE EDITA</h5>
            <p>
              Explique a los directivos que una vez que el proyecto se entrega al mandante para la fase de Operación y Mantenimiento (AIM), el fichero nativo no debe seguir expuesto en WIP de alto costo. Congelarlo en un archivo Cool/Archive garantiza la inmutabilidad y restringe mutaciones negligentes.
            </p>
          </div>
          <div className="bg-[#040c1c]/40 p-3 rounded border border-white/[0.03]">
            <h5 className="font-bold text-emerald-400 uppercase mb-1">POLÍTICAS CONTRACTUALES DE PURGA</h5>
            <p>
              Asegúrese de establecer en el BEP que a los 90 días del término de la obra, el CDE será purgado de versiones preliminares obsoletas (p. ej. las decenas de backups locales). Únicamente se conservarán las hitos federados clave reduciendo sustancialmente el costo a largo plazo del almacenamiento.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
