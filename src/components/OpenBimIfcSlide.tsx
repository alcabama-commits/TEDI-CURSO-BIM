import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Layers, Settings, FileCode, CheckCircle2, AlertTriangle, 
  Clock, GitMerge, FileArchive, ArrowRight, Eye, Edit3, HelpCircle, Layout
} from 'lucide-react';

interface MappingItem {
  id: string;
  name: string;
  revitCategory: string;
  correctClass: string;
  description: string;
  successExp: string;
  warningExp: string;
  icon: string;
}

export const OpenBimIfcSlide = () => {
  // Mapping Sandbox State
  const [selectedElement, setSelectedElement] = useState<string>('footing');
  const [mappings, setMappings] = useState<Record<string, 'correct' | 'proxy'>>({
    footing: 'proxy',
    wall: 'proxy',
    column: 'proxy',
    door: 'proxy'
  });

  // MVD Comparison State
  const [selectedMvd, setSelectedMvd] = useState<'reference' | 'design'>('reference');

  const mappingElements: Record<string, MappingItem> = {
    footing: {
      id: 'footing',
      name: 'Zapata Iso-Aislada (Foundations)',
      revitCategory: 'Cimentación Estructural',
      correctClass: 'IfcFooting',
      description: 'El soporte de hormigón en contacto con el terreno que transmite los esfuerzos estructurales.',
      successExp: 'Óptimo. Navisworks y programas de 5D (como Cost-It o Presto) identifican las dimensiones de contacto de forma inmediata, automatizando la cubicación volumétrica sin intervención humana.',
      warningExp: 'Genérico. Clasifica la zapata como un "elemento genérico sin atributos". Obliga al estimador de costos a cubicaciones visuales manuales en pantalla, aumentando el margen de error un 15%.',
      icon: '📐'
    },
    wall: {
      id: 'wall',
      name: 'Muro Estructural H30 (Walls)',
      revitCategory: 'Muros',
      correctClass: 'IfcWall',
      description: 'Tabique estructural de carga vertical y envoltura de la edificación.',
      successExp: 'Perfecto. Mapeado como IfcWall, hereda propiedades analíticas que permiten que herramientas de cálculo térmico o acústico lean las capas de materiales (aislante, hormigón, yeso) automáticamente.',
      warningExp: 'Crítico. Al verse como IfcBuildingElementProxy, el modelo pierde su inteligencia térmica y arquitectónica. El software coordinará la física básica pero ignorará de qué está hecho el muro.',
      icon: '🧱'
    },
    column: {
      id: 'column',
      name: 'Columna de Acero W12 (Columns)',
      revitCategory: 'Pilares Estructurales',
      correctClass: 'IfcColumn',
      description: 'Pilar o montante estructural de acero encargado de resistir fuerzas axiales de compresión.',
      successExp: 'Excelente. Conserva las propiedades mecánicas y el perfil de la sección de acero I-beam, facilitando su exportación limpia para flujos de fabricación computarizada (CAM).',
      warningExp: 'Deficiente. Al exportarse de forma ciega, el pilar pierde su tipología geométrica de extrusión. Es tratado como un sólido importado "muerto", imposible de clasificar por perfiles.',
      icon: '🏛️'
    },
    door: {
      id: 'door',
      name: 'Puerta de Madera con Resistencia al Fuego',
      revitCategory: 'Puertas',
      correctClass: 'IfcDoor',
      description: 'Abertura equipada para egreso, equipada con cierrapuertas y clasificación RF.',
      successExp: 'Óptimo. Los algoritmos de evacuación y seguridad ante incendios pueden rastrear el parámetro de apertura útil y resistencia al fuego para validar normativas de seguridad de forma digital.',
      warningExp: 'Peligroso. Al ser un proxy, la puerta carece de parámetros de apertura y herrajes asociados a vías de escape. Los listados de compras de carpinterías de obra quedan desiertos de este ítem.',
      icon: '🚪'
    }
  };

  const handleToggleMap = (id: string, value: 'correct' | 'proxy') => {
    setMappings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header Slide Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#38bdf8] font-extrabold uppercase tracking-[0.2em] block mb-1">
            SESIÓN 7 — OPEN BIM E INTEROPERABILIDAD
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[#38bdf8] shrink-0" />
            1. Anatomía y Configuración Experta del IFC
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Mapeo de clases y definiciones de vista de modelo (MVD) para directivos y coordinadores BIM
          </p>
        </div>
        
        {/* Time Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-full text-[9px] font-mono text-[#38bdf8] font-bold self-center">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          ESTRATEGIA AVANZADA DE FORMATOS (50 MIN)
        </div>
      </div>

      {/* Concept Introduction Box */}
      <div className="bg-[#030a17]/50 p-5 rounded-2xl border border-white/5 text-left space-y-3 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
          <Database className="w-24 h-24 text-[#38bdf8]" />
        </div>
        <h3 className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest font-black">
          El IFC no es un mero &quot;Guardar Como&quot;
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-medium">
          El formato <strong>IFC (Industry Foundation Classes)</strong> no es un simple mecanismo de exportación estática de geometría. Es un **esquema de base de datos relacional orientado a objetos**. Un BIM Manager directivo debe configurar de forma estratégica el mapeo del modelo nativo antes de la exportación; de lo contrario, la base de datos se corrompe y pierde toda su interoperabilidad metodológica.
        </p>
      </div>

      {/* SECTION A: IFC Class Mapping Sandbox */}
      <div className="bg-[#040e25]/20 border border-white/5 rounded-2xl p-5 md:p-6 text-left space-y-4">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2.5 pb-2 border-b border-white/5">
          <div>
            <span className="text-[9px] font-mono text-amber-500 font-extrabold uppercase tracking-widest block">SISTEMA INTERACTIVO 1</span>
            <h4 className="text-md font-sans font-black text-white uppercase">Sandbox: Mapeo de Categorías Nativas a Clases IFC</h4>
            <p className="text-xs text-slate-450 mt-0.5">
              Haz clic en cada componente para simular la diferencia entre un mapeo correcto de base de datos versus una exportación perezosa (proxy).
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1 p-0.5 bg-black/60 border border-white/5 rounded-lg shrink-0 text-[10px] font-mono">
            {Object.values(mappingElements).map((el) => (
              <button
                key={el.id}
                onClick={() => setSelectedElement(el.id)}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer font-extrabold ${selectedElement === el.id ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {el.icon} {el.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Playable Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Simulation details and selector */}
          <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mappingElements[selectedElement].icon}</span>
                <div>
                  <h5 className="text-sm font-sans font-black text-white">{mappingElements[selectedElement].name}</h5>
                  <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">
                    Categoría Revit: {mappingElements[selectedElement].revitCategory}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {mappingElements[selectedElement].description}
              </p>

              {/* Selector switches */}
              <div className="space-y-2 pt-2">
                <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block">Seleccione Destino de Exportación:</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleToggleMap(selectedElement, 'proxy')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      mappings[selectedElement] === 'proxy' 
                        ? 'border-red-500/40 bg-red-500/10 text-white' 
                        : 'border-white/5 bg-black/45 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase font-black text-red-400">Opción Perezosa</div>
                    <div className="text-xs font-bold font-mono tracking-tight mt-1">IfcBuildingElementProxy</div>
                  </button>

                  <button
                    onClick={() => handleToggleMap(selectedElement, 'correct')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      mappings[selectedElement] === 'correct' 
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-white' 
                        : 'border-white/5 bg-black/45 text-[#10b981] hover:text-[#10b981]'
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase font-black text-emerald-400">Mapeo Avanzado</div>
                    <div className="text-xs font-bold font-mono tracking-tight mt-1">
                      {mappingElements[selectedElement].correctClass}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3.5 mt-4 text-[9.5px] text-zinc-500 leading-loose">
              💡 <strong>Regla del BIM Manager:</strong> Nunca dejes que elementos estructurales terminen en la clase genérica <em>IfcBuildingElementProxy</em>. Eso es considerado basura digital en auditorías contractuales.
            </div>
          </div>

          {/* Large diagnostic representation */}
          <div className="lg:col-span-7 bg-black/20 p-5 border border-zinc-900 rounded-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-[#38bdf8] font-bold uppercase tracking-widest pl-1.5 border-l-2 border-[#38bdf8] block">
                DIAGNÓSTICO AUTOMÁTICO DE LA BASE DE DATOS IFC
              </span>

              <AnimatePresence mode="wait">
                {mappings[selectedElement] === 'proxy' ? (
                  <motion.div
                    key="proxy-diag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-3"
                  >
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-mono font-black uppercase">ERROR DE MAPEO DETECTADO (INCONGRUENCIA)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {mappingElements[selectedElement].warningExp}
                    </p>
                    <div className="bg-black/60 p-2.5 rounded border border-red-500/10 font-mono text-[9px] text-red-200">
                      # BASE DE DATOS REGISTRA:
                      <br />
                      {"<IfcBuildingElementProxy GlobalId='3u9872ha2...' Name='" + mappingElements[selectedElement].name.split(' (')[0] + "' />"}
                      <br />
                      <span className="text-red-400 font-semibold">// Error: Propiedades nativas colapsadas o perdidas</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="correct-diag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3"
                  >
                    <div className="flex items-center gap-2 text-[#38bdf8]">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-[#10b981]" />
                      <span className="text-xs font-mono font-black uppercase text-[#10b981]">BASE DE DATOS EN CUMPLIMIENTO CON LA ISO 19650</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {mappingElements[selectedElement].successExp}
                    </p>
                    <div className="bg-black/60 p-2.5 rounded border border-emerald-500/10 font-mono text-[9px] text-[#10b981]">
                      # BASE DE DATOS REGISTRA:
                      <br />
                      {"<" + mappingElements[selectedElement].correctClass + " GlobalId='3u9872ha2...' Name='" + mappingElements[selectedElement].name.split(' (')[0] + "' />"}
                      <br />
                      <span className="text-emerald-450 font-semibold">// Éxito: Esquema relacional estructurado legible por cualquier software de cómputos</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Practical Student value block */}
            <div className="mt-4 p-3 bg-pink-500/[0.03] border border-pink-500/20 rounded-lg text-left text-[11px] leading-relaxed">
              <span className="font-mono text-pink-500 text-[9px] uppercase tracking-wider block font-bold mb-0.5">📂 IMPACTO EN TU PROYECTO (Presto o Navisworks)</span>
              Si dejas las zapatas de fundación o los muros como <code className="text-red-400">IfcBuildingElementProxy</code>, cuando intentes automatizar tu cubicación en Navisworks o Presto, las fórmulas de búsqueda por categoría fallarán. Tendrás que asignar los costos manualmente elemento por elemento, perdiendo días de trabajo.
            </div>
          </div>

        </div>
      </div>

      {/* SECTION B: Model View Definitions (MVD) Configurator */}
      <div className="bg-[#04112e]/30 border border-white/5 rounded-2xl p-5 md:p-6 text-left space-y-5">
        <div>
          <span className="text-[9px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block">SISTEMA INTERACTIVO 2</span>
          <h4 className="text-md font-sans font-black text-white uppercase">Model View Definitions (MVD): Reference View vs Design Transfer View</h4>
          <p className="text-xs text-slate-450 mt-0.5">
            Las MVD definen los subconjuntos lógicos del esquema IFC que se exportarán de acuerdo al caso de uso establecido por el consorcio.
          </p>
        </div>

        {/* Interactive Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-black/65 border border-white/5 rounded-xl font-mono text-xs">
          <button
            onClick={() => setSelectedMvd('reference')}
            className={`py-3.5 rounded-lg font-black transition-all cursor-pointer text-center flex flex-col justify-center items-center gap-1 ${
              selectedMvd === 'reference' 
                ? 'bg-gradient-to-r from-[#38bdf8]/15 to-[#38bdf8]/5 border border-[#38bdf8]/30 text-white' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Eye className={`w-4 h-4 ${selectedMvd === 'reference' ? 'text-[#38bdf8]' : ''}`} />
              <span>Reference View (IFC RV)</span>
            </div>
            <span className="text-[8px] opacity-60 normal-case font-medium">Idóneo para coordinación, colisiones e inspección</span>
          </button>

          <button
            onClick={() => setSelectedMvd('design')}
            className={`py-3.5 rounded-lg font-black transition-all cursor-pointer text-center flex flex-col justify-center items-center gap-1 ${
              selectedMvd === 'design' 
                ? 'bg-gradient-to-r from-pink-500/15 to-pink-500/5 border border-pink-500/30 text-white' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Edit3 className={`w-4 h-4 ${selectedMvd === 'design' ? 'text-pink-500' : ''}`} />
              <span>Design Transfer View (IFC DTV)</span>
            </div>
            <span className="text-[8px] opacity-60 normal-case font-medium">Idóneo para modificaciones paramétricas cruzadas</span>
          </button>
        </div>

        {/* Dynamic Display Details based on MVD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMvd}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5"
          >
            {/* Visual description */}
            <div className="md:col-span-4 bg-black/45 p-5 border border-white/5 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-mono text-slate-500 tracking-wider block uppercase mb-1">PROPIEDAD GEOMÉTRICA</span>
                <h5 className="text-[13px] font-sans font-black text-white uppercase flex items-center gap-1.5">
                  {selectedMvd === 'reference' ? (
                    <>
                      <Layers className="w-4 h-4 text-[#38bdf8]" />
                      Consistencia Rígida
                    </>
                  ) : (
                    <>
                      <GitMerge className="w-4 h-4 text-pink-500" />
                      Mapeo Paramétrico Abierto
                    </>
                  )}
                </h5>
                <p className="text-[11.5px] text-slate-350 leading-relaxed mt-3">
                  {selectedMvd === 'reference' 
                    ? 'Exporta la geometría como mallas cerradas e indestructibles (B-Rep). Ideal para que ningún otro contratista altere el diseño original de forma accidental.' 
                    : 'Exporta geometrías que se pueden modificar por parámetros en la herramienta destino (ej. extruir un muro o desplazar ventanas al importar a Revit desde ArchiCAD).'
                  }
                </p>
              </div>

              <div className={`mt-4 p-3 rounded-md text-[10px] font-mono ${
                selectedMvd === 'reference' ? 'bg-[#38bdf8]/10 text-[#38bdf8]/90' : 'bg-pink-500/10 text-pink-400'
              }`}>
                📂 Peso del archivo: {selectedMvd === 'reference' ? 'Muy Liviano (15%)' : 'Extremadamente Pesado (100%)'}
              </div>
            </div>

            {/* Comparison Table / Matrix */}
            <div className="md:col-span-8 bg-black/20 p-5 border border-white/5 rounded-xl space-y-4">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">MATRIZ DE DECISIONES DEL BIM MANAGER</span>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                  <span className="text-[8px] font-mono text-zinc-400 font-bold block">VENTAJAS</span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {selectedMvd === 'reference'
                      ? '✓ Evita alteraciones de diseño. Es la mejor base legal en litigios. Velocidad de visualización excelente en tablets u obra.'
                      : '✓ Permite el traspaso paramétrico para oficinas que modifican activamente el modelo de arquitectura en softwares diferentes.'
                    }
                  </p>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                  <span className="text-[8px] font-mono text-zinc-400 font-bold block">DESVENTAJAS / RIESGOS</span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {selectedMvd === 'reference'
                      ? '✗ No permite la edición paramétrica del volumen. Si deseas mover una tubería, debes rehacerla en el modelo fuente.'
                      : '✗ Elevada probabilidad de pérdida de datos. La traducción paramétrica entre marcas comerciales nunca es 100% perfecta.'
                    }
                  </p>
                </div>

                <div className="col-span-2 p-3 bg-white/[0.01] border border-dashed border-white/10 rounded-lg">
                  <span className="text-[8.5px] font-mono text-[#3aebff] font-bold block mb-1">CASO DE USO METODOLÓGICO SUGERIDO EN CONTRATOS (EIR)</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {selectedMvd === 'reference'
                      ? 'Ideal para inspección técnica de obras (ITO), cotización por contratistas (BIM 5D), validaciones de choques (BIM 3D) y archivo histórico as-built.'
                      : 'Reservado únicamente para el inicio del proyecto si el diseñador conceptual usa ArchiCAD y el calculista definitivo utiliza Revit.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Conclusion Banner */}
      <div className="bg-gradient-to-r from-[#0d1c44] to-transparent p-5 rounded-xl border-l-4 border-[#38bdf8]">
        <div className="flex gap-4">
          <span className="p-1.5 bg-[#38bdf8]/10 text-[#38bdf8] rounded-md shrink-0 self-start">
            <Layout className="w-5 h-5" />
          </span>
          <div className="text-left">
            <h5 className="text-[13px] font-sans font-black text-white uppercase">Conclusión Estratégica</h5>
            <p className="text-xs text-slate-305 mt-1 leading-relaxed">
              El esquema IFC es la base del openBIM. Tu rol como líder directivo no es modelar, sino asegurar contractualmente mediante el <strong>BEP (Bim Execution Plan)</strong> que todos los proveedores entreguen modelos mapeados a las clases correspondientes bajo la vista de definición correcta (usualmente <em>Reference View</em>) para asegurar flujos de auditoría automatizados sin desperdiciar recursos.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
