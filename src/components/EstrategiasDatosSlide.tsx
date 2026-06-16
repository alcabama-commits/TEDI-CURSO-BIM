import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck, ShieldCheck, Database, Wrench, Settings, ArrowRight, 
  Layers, CheckCircle, AlertTriangle, Play, RefreshCw, BookOpen, Clock, Lightbulb, Hammer
} from 'lucide-react';

interface ParameterDetail {
  id: 'assembly' | 'keynote' | 'custom';
  name: string;
  revitField: string;
  associatedStandard: string;
  purpose: string;
  bestPractice: string;
  exampleValue: string;
}

export const EstrategiasDatosSlide = () => {
  const [selectedParam, setSelectedParam] = useState<'assembly' | 'keynote' | 'custom'>('assembly');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [revitMockState, setRevitMockState] = useState({
    category: "Muro Básico - Exterior con Aislamiento",
    assemblyCode: "B2010",
    keynote: "08 11 13",
    customSharedCode: "Pr_30_59_24_25",
    status: "Pendiente de Validación"
  });

  const parameterStrategies: Record<'assembly' | 'keynote' | 'custom', ParameterDetail> = {
    assembly: {
      id: 'assembly',
      name: "Assembly Code (Código de Montaje)",
      revitField: "Assembly Code (Parámetro de Tipo Nativo)",
      associatedStandard: "UniFormat o OmniClass Tabla 21",
      purpose: "Asociar elementos constructivos completos a macrosistemas funcionales para análisis de costos preliminares y presupuestos tempranos (BIM 5D).",
      bestPractice: "Vincular el archivo de texto uniforme 'UniformatClassifications.txt' provisto por Autodesk a la plantilla del proyecto para que el modelador seleccione códigos estáticos desde un árbol jerárquico estructurado, mitigando errores tipográficos.",
      exampleValue: "B2010 (Muros exteriores) o B2030 (Puertas exteriores)"
    },
    keynote: {
      id: 'keynote',
      name: "Keynote (Nota Clave de Tipo)",
      revitField: "Keynote (Parámetro de Tipo Nativo)",
      associatedStandard: "MasterFormat (CSI)",
      purpose: "Enlazar elementos del modelo directamente con las especificaciones técnicas escritas y partidas del presupuesto detallado de obra.",
      bestPractice: "Centralizar un archivo maestro .txt de notas clave en el servidor compartido del CDE (o la red corporativa). Cada código y su descripción correspondiente se autocompletan en tablas de planificación de Revit al seleccionar el elemento.",
      exampleValue: "08 11 13 (Puertas metálicas huecas) o 03 30 00 (Hormigón in situ)"
    },
    custom: {
      id: 'custom',
      name: "Parámetros Compartidos (Shared Parameters)",
      revitField: "Parámetro Compartido (.txt) de Proyecto",
      associatedStandard: "UniClass 2015 / Parámetros IFC Personalizados",
      purpose: "Inyectar metadatos adicionales exigidos en el EIR (como códigos OmniClass de producto o UniClass) que no están cubiertos por campos nativos de Revit.",
      bestPractice: "Crear un archivo de Parámetros Compartidos único a nivel corporativo y cargarlo vía script de Dynamo o macros a la plantilla, configurando el parámetro como de 'Tipo' para evitar discrepancias de escritura.",
      exampleValue: "Pr_30_59_24_25 (BIM UniClass para Puerta Cortafuego)"
    }
  };

  const handleSimulateRule = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 2) {
          clearInterval(interval);
          setRevitMockState(s => ({ ...s, status: "Código Validado (Sincronizado Licitación)" }));
          return 3;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
    setRevitMockState({
      category: "Muro Básico - Exterior con Aislamiento",
      assemblyCode: "B2010",
      keynote: "08 11 13",
      customSharedCode: "Pr_30_59_24_25",
      status: "Pendiente de Validación"
    });
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header Slide Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-[0.2em] block mb-1">
            CLASE 6 — ENTORNO DE DATOS COMUNES
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-pink-500 shrink-0" />
            3. Estrategias de Estandarización de Datos
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Mapeo pragmático de parámetros en Revit, mitigación de errores humanos y estructuración del flujo editorial
          </p>
        </div>
        
        {/* Quick time indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-full text-[9px] font-mono text-[#fbbf24] font-bold self-center">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          ESTRATEGIA RECOMENDADA (50 MIN)
        </div>
      </div>

      {/* Introducción Orientada al Rol del BIM Manager */}
      <div className="bg-[#030712]/50 p-5 rounded-2xl border border-white/5 text-left space-y-3 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
          <Wrench className="w-24 h-24 text-pink-500" />
        </div>
        <h3 className="text-xs font-mono text-pink-500 uppercase tracking-widest font-black">
          ¿Por qué planificar la inyección de datos?
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-medium">
          Saber que existen estos estándares no sirve de nada si el <strong>BIM Manager</strong> no define cómo inyectar estos datos en el flujo de trabajo diario de los modeladores. Un proceso desorganizado es sinónimo de modelados lentos, bases de datos inconsistentes y errores manuales catastróficos al exportar presupuestos.
        </p>
      </div>

      {/* Mapeo de Parámetros de Software de Autoría (Caso Revit) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive parameter selector details */}
        <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-black mb-1">
                A. MAPEO ESTRATÉGICO DE PARÁMETROS (REVIT)
              </span>
              <h4 className="text-sm font-sans font-black text-white uppercase">Parámetros Críticos en Revit</h4>
              <p className="text-[10.5px] text-slate-405 leading-normal">
                El BIM Manager debe normar el uso de campos nativos o crear Parámetros Compartidos específicos en la plantilla institucional.
              </p>
            </div>

            {/* Parameter Pills */}
            <div className="space-y-2">
              {Object.values(parameterStrategies).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedParam(p.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                    selectedParam === p.id 
                      ? 'border-pink-500/40 bg-pink-500/[0.03] text-white font-semibold' 
                      : 'border-white/5 bg-black/20 hover:bg-neutral-800/40 text-slate-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[11px] font-bold">{p.name}</span>
                    {selectedParam === p.id && <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
                  </div>
                  <span className="text-[9.5px] font-mono opacity-65 block">{p.revitField}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/50 p-3.5 rounded-xl border border-white/5 text-[10.5px] text-slate-400 leading-relaxed font-sans mt-4">
            💡 <strong>Regla áurea:</strong> Siempre prefiere parámetros de <strong>Tipo</strong> sobre parámetros de <strong>Instancia</strong> para clasificaciones generales; de lo contrario, cada copia física del mismo muro requerirá recodificarse a mano.
          </div>
        </div>

        {/* Selected Parameter deep details display */}
        <div className="lg:col-span-7 bg-[#040a17]/50 border border-white/5 rounded-2xl p-5 md:p-6 text-left flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedParam}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="border-b border-white/5 pb-2">
                <span className="text-[9px] font-mono text-[#38bdf8] font-black uppercase tracking-widest block">NORMATIVA DE PLANTILLA CORP</span>
                <h4 className="text-base font-sans font-black text-white">{parameterStrategies[selectedParam].name}</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase">Estándar Predilecto:</span>
                  <p className="text-[11px] font-mono font-bold text-white bg-white/[0.03] p-2 rounded border border-white/5">
                    🔗 {parameterStrategies[selectedParam].associatedStandard}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase">Ejemplo de código:</span>
                  <p className="text-[11.5px] font-mono font-bold text-pink-400 bg-black/45 p-2 rounded border border-pink-500/20">
                    📂 {parameterStrategies[selectedParam].exampleValue}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-mono text-zinc-550 uppercase">Propósito en Obra:</span>
                <p className="text-[11.5px] leading-relaxed text-slate-300 font-sans">
                  {parameterStrategies[selectedParam].purpose}
                </p>
              </div>

              <div className="bg-[#fbbf24]/5 p-3.5 rounded-xl border border-[#fbbf24]/20 space-y-1.5">
                <span className="text-[9px] font-mono text-[#fbbf24] font-black uppercase tracking-wide flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  RECOMENDACIÓN METODOLÓGICA (BEST PRACTICE)
                </span>
                <p className="text-[11px] leading-relaxed text-slate-300 font-sans">
                  {parameterStrategies[selectedParam].bestPractice}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 pt-3 border-t border-white/5 text-[9.5px] text-zinc-500 font-mono flex justify-between items-center">
            <span>Interoperabilidad Estructurada (BEP / EIR)</span>
            <span>Autodesk Revit Native Mapping</span>
          </div>
        </div>

      </div>

      {/* Simulador Interactivo Revit Sandbox - "Prueba cómo el software asocia metadatos" */}
      <div className="bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 md:p-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl pointer-events-none"></div>

        <div>
          <span className="text-[9px] font-mono text-pink-400 font-black uppercase tracking-widest block">INTERACTIVIDAD PEDAGÓGICA</span>
          <h4 className="text-sm font-sans font-black text-white uppercase">Simulador de Vinculación de Clasificaciones</h4>
          <p className="text-[10.5px] text-slate-450 font-sans">
            Comprueba cómo se consolida la información de un Muro básico dentro del Inspector de Parámetros de Tipo en Revit.
          </p>
        </div>

        {/* Visual Mock-up of Revit Property Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 items-stretch">
          
          {/* Mockup parameters panel */}
          <div className="lg:col-span-8 bg-black/60 border border-zinc-900 rounded-xl p-4.5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Revit Window Header */}
              <div className="flex justify-between items-center bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                  <Settings className="w-3 h-3 text-sky-400" />
                  Propiedades de Tipo (Type Properties) v2026.1
                </span>
                <span className="text-[9px] text-[#fbbf24] font-bold">Familia del Sistema</span>
              </div>

              {/* Entity info card */}
              <div className="p-3 bg-white/[0.02] rounded-lg border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-450 text-[10px] font-mono">Nombre de Familia:</span>
                  <span className="font-mono font-bold text-white">Muro Básico</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 text-[10px] font-mono">Nombre de Tipo (Familia):</span>
                  <span className="font-mono font-bold text-white text-right">{revitMockState.category}</span>
                </div>
              </div>

              {/* Parameters List Input Grid */}
              <div className="space-y-2.5 font-mono text-xs">
                {/* Assembly Code row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-black/45 p-2 rounded border border-white/5">
                  <span className="sm:col-span-4 text-[10.5px] text-slate-400 font-bold">Assembly Code</span>
                  <div className="sm:col-span-5 flex items-center bg-zinc-900 px-2 py-1 rounded border border-white/10">
                    <span className="text-emerald-400 font-bold">{revitMockState.assemblyCode}</span>
                  </div>
                  <span className="sm:col-span-3 text-[9.5px] text-zinc-550 italic text-right">Uniformat: Envoltura</span>
                </div>

                {/* Keynote row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-black/45 p-2 rounded border border-white/5">
                  <span className="sm:col-span-4 text-[10.5px] text-slate-400 font-bold">Keynote (Nota Clave)</span>
                  <div className="sm:col-span-5 flex items-center bg-zinc-900 px-2 py-1 rounded border border-white/10">
                    <span className="text-amber-400 font-bold">{revitMockState.keynote}</span>
                  </div>
                  <span className="sm:col-span-3 text-[9.5px] text-zinc-550 italic text-right">MasterFormat: Puertas</span>
                </div>

                {/* Custom / Shared parameters Row with UniClass */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-black/45 p-2 rounded border border-white/5">
                  <span className="sm:col-span-4 text-[10.5px] text-slate-400 font-bold">UniClass (Completo/Shared)</span>
                  <div className="sm:col-span-5 flex items-center bg-zinc-900 px-2 py-1 rounded border border-white/10">
                    <span className="text-sky-400 font-bold">{revitMockState.customSharedCode}</span>
                  </div>
                  <span className="sm:col-span-3 text-[9.5px] text-zinc-550 italic text-right">UniClass 2015</span>
                </div>
              </div>
            </div>

            {/* Simulated feedback logs */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-450 uppercase">Diagnóstico Auditoría:</span>
                <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded ${
                  revitMockState.status.includes('Validado') ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/35' : 'bg-amber-400/10 text-[#fbbf24] border border-[#fbbf24]/20'
                }`}>
                  {revitMockState.status}
                </span>
              </div>
              
              <div className="flex gap-2">
                {isSimulating ? (
                  <button onClick={resetSimulation} className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-slate-300 font-bold text-[10px] rounded border border-white/10 cursor-pointer">
                    Reiniciar
                  </button>
                ) : (
                  <button onClick={handleSimulateRule} className="px-3.5 py-1 bg-pink-500 hover:bg-pink-600 font-bold text-[10.5px] text-white rounded border border-pink-500/30 flex items-center gap-1 transition-all cursor-pointer">
                    <Play className="w-3 h-3 fill-current" />
                    Simular Validación
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step description tracker of simulation */}
          <div className="lg:col-span-4 bg-[#030712]/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-black mb-3">
              ESTADO DE EJECUCIÓN
            </span>

            <div className="space-y-3 my-auto">
              {/* Step 1 */}
              <div className="flex gap-2.5 items-start">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shrink-0 ${
                  simulationStep >= 1 ? 'bg-white text-black border-white' : 'border-zinc-500 text-zinc-500'
                }`}>
                  1
                </div>
                <div>
                  <span className="text-[11px] font-sans font-bold block text-white leading-none mb-0.5">Lectura de Plantilla .txt</span>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans">
                    Vincular archivos maestros de montaje para mitigar descuidos ortográficos.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-2.5 items-start">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shrink-0 ${
                  simulationStep >= 2 ? 'bg-white text-black border-white' : 'border-zinc-500 text-zinc-500'
                }`}>
                  2
                </div>
                <div>
                  <span className="text-[11px] font-sans font-bold block text-white leading-none mb-0.5">Análisis de Integridad</span>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans">
                    Escaneo de parámetros en busca de códigos duplicados o inconsistentes.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-2.5 items-start">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shrink-0 ${
                  simulationStep >= 3 ? 'bg-emerald-450 text-white border-emerald-400' : 'border-zinc-500 text-zinc-500'
                }`}>
                  3
                </div>
                <div>
                  <span className="text-[11px] font-sans font-bold block text-white leading-none mb-0.5">Mapeo Consolidado</span>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans">
                    Inyección satisfactoria para vincular costos, adquisiciones y modelado 5D.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[9.5px] text-zinc-450 leading-relaxed font-sans">
              Prueba la simulación para comprobar la diferencia al validar los parámetros de obra corporativos.
            </div>
          </div>

        </div>

      </div>

      {/* Seccion B: Automatización del Proceso: Integración 5D y Auditoría */}
      <div className="bg-[#030712]/75 border border-white/5 rounded-2xl p-5 text-left space-y-4">
        <div>
          <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block mb-1">
            B. AUTOMATIZACIÓN DEL PROCESO
          </span>
          <h4 className="text-sm font-sans font-black text-white uppercase">
            Integración 5D y Auditoría de Datos
          </h4>
          <p className="text-xs text-slate-400 font-medium">
            Cuando el 100% de los elementos del modelo tienen un código de clasificación estandarizado, el modelo deja de ser solo un dibujo 3D y se transforma en una base de datos operativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 border border-emerald-500/10 p-4 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 text-4xl">💰</div>
            <div className="flex items-center gap-2">
              <span className="p-1 px-2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-extrabold">5D</span>
              <h5 className="text-[12.5px] font-sans font-black text-white uppercase">Presupuestos en un clic (5D)</h5>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-350 font-sans">
              El software de presupuestos no lee el nombre del tipo de muro o la etiqueta descriptiva inventada por el modelador; <strong>lee estrictamente el código de clasificación estandarizado</strong>. Si el código coincide con la base de datos de precios de la constructora, el presupuesto se genera y actualiza automáticamente ante cualquier cambio de diseño.
            </p>
          </div>

          <div className="bg-black/40 border border-sky-500/10 p-4 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 text-4xl">🛡️</div>
            <div className="flex items-center gap-2">
              <span className="p-1 px-2 rounded bg-sky-500/10 text-sky-400 font-mono text-[10px] font-extrabold">QA / QC</span>
              <h5 className="text-[12.5px] font-sans font-black text-white uppercase">Filtros de Control de Calidad</h5>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-350 font-sans">
              La estandarización permite crear reglas de visualización instantáneas del modelo en menos de un segundo. Por ejemplo, es posible configurar reglas de auditoría para <strong>&quot;Pintar de rojo todos los elementos que no tengan asignado un código de la Tabla 23 de OmniClass&quot;</strong>, agilizando la revisión de entregables previo a licitaciones.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
