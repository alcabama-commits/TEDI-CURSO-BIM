import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Database, TrendingUp, Users2, Layers, Info, CheckCircle2, 
  HelpCircle, ArrowRight, ArrowDown, RefreshCw, FileText, Settings, Shield, User
} from 'lucide-react';

// --- Industry Scenarios ---
interface BlockData {
  title: string;
  subtitle: string;
  description: string;
  question: string;
  questionLabel: string;
  example: string;
  actor: string;
}

interface Scenario {
  id: string;
  label: string;
  desc: string;
  need: string;
  oir: BlockData;
  pir: BlockData;
  air: BlockData;
  eir: BlockData;
  pim: BlockData;
  aim: BlockData;
}

const SCENARIOS: Scenario[] = [
  {
    id: "educativo",
    label: "Infraestructura Educativa",
    desc: "Colegios de Alto Rendimiento con eficiencia energética",
    need: "Necesidad: Mejorar la calidad de las infraestructuras educativas públicas para reducir la brecha de aprendizaje.",
    oir: {
      title: "OIR",
      subtitle: "Requisitos de Información de la Organización",
      description: "Define las metas generales de negocio y gestión de activos a nivel corporativo o estatal.",
      question: "¿Por qué se construye?",
      questionLabel: "Alineación Estratégica",
      example: "Garantizar la construcción y operación sostenible de 10 colegios de alto rendimiento bajo estándares de eficiencia de recursos, disminuyendo costos fijos de servicios en un 15% anual.",
      actor: "Ministerio de Educación (Dirección de Planificación)"
    },
    pir: {
      title: "PIR",
      subtitle: "Requisitos de Información del Proyecto",
      description: "Traduce las metas organizacionales a las especificaciones del proyecto singular a licitar.",
      question: "¿Qué se necesita en este proyecto?",
      questionLabel: "Alcance del Proyecto",
      example: "Se requiere que cada colegio tenga un área de recreación mínima de 50 m², 2 escaleras de emergencia por pabellón y un diseño bioclimático pasivo adaptable.",
      actor: "Ministerio de Educación (Equipo de Proyectos)"
    },
    air: {
      title: "AIR",
      subtitle: "Requisitos de Información del Activo",
      description: "Define la información necesaria para operar y mantener la infraestructura a largo plazo.",
      question: "¿Para qué operamos la información?",
      questionLabel: "Fase de Operaciones (O&M)",
      example: "Plan de mantenimiento preventivo de aulas, inventario digitalizado de luminarias, tableros y equipos con fichas de fabricante para reemplazo expedito.",
      actor: "Ministerio de Educación (Mantenimiento y Activos)"
    },
    eir: {
      title: "EIR",
      subtitle: "Requisitos de Intercambio de Información",
      description: "Son las instrucciones contractuales exactas dadas a los proveedores para la entrega de datos.",
      question: "¿Cómo se solicita la información?",
      questionLabel: "Pliego Contractual",
      example: "Entregar modelos 3D y 2D federados en formatos IFC abiertos, con cronogramas de obra enlazados y planillas de precios estructuradas según estándares nacionales.",
      actor: "Ministerio de Educación (Licitaciones / BIM Manager)"
    },
    pim: {
      title: "PIM",
      subtitle: "Modelo de Información del Proyecto",
      description: "Representación digital detallada durante el diseño y construcción de la obra.",
      question: "¿Qué genera el diseño y obra?",
      questionLabel: "Fase de Entrega",
      example: "Modelo 3D federado consolidando arquitectura, estructura e instalaciones sanitarias, incluyendo detección de colisiones críticas previo a la obra física.",
      actor: "Consorcio Constructor o Contratista"
    },
    aim: {
      title: "AIM",
      subtitle: "Modelo de Información del Activo",
      description: "Representación digital optimizada para la operación, mantenimiento y ciclo de vida final.",
      question: "¿Con qué operamos el activo?",
      questionLabel: "Fase de Operación",
      example: "Modelo 3D as-built enlazado directamente con la base de datos de Facility Management o GMAO, conteniendo las garantías de equipos escolares activas.",
      actor: "Equipo de Facility Management u Operador"
    }
  },
  {
    id: "sanitario",
    label: "Infraestructura Sanitaria",
    desc: "Complejo Hospitalario de Alta Complejidad",
    need: "Necesidad: Optimizar la atención de salud mediante infraestructura médica resiliente y equipada con tecnología inteligente.",
    oir: {
      title: "OIR",
      subtitle: "Requisitos de Información de la Organización",
      description: "Estructura los mandatos globales de eficiencia de red y optimización del cuidado médico.",
      question: "¿Por qué se construye?",
      questionLabel: "Estrategia de Red Hospitalaria",
      example: "Asegurar un tiempo de inactividad técnica planificada inferior al 1% en quirófanos y salas de cuidados intensivos, optimizando además el consumo energético central en un 20%.",
      actor: "Consorcio de Salud Pública / Ministerio de Salud"
    },
    pir: {
      title: "PIR",
      subtitle: "Requisitos de Información del Proyecto",
      description: "Alinea las dimensiones físicas y de seguridad requeridas para este hospital clínico específico.",
      question: "¿Qué se necesita en este proyecto?",
      questionLabel: "Especificación de Proyecto",
      example: "Diseñar un bloque de quirófanos con blindaje de plomo para rayos X, redes de gases medicinales redundantes y flujos de circulación estéril/sucio completamente independientes.",
      actor: "Dirección de Infraestructura Hospitalaria"
    },
    air: {
      title: "AIR",
      subtitle: "Requisitos de Información del Activo",
      description: "Garantiza que la información operativa sostenga la continuidad clínica sin fallas críticas.",
      question: "¿Para qué operamos la información?",
      questionLabel: "Continuidad del Activo Sanitario",
      example: "Monitoreo y plan de calibración programada para equipos médicos mayores (resonancia, tomografías) y ciclo de vida de filtros HEPA de aire acondicionado.",
      actor: "Departamento de Ingeniería Clínica / FM"
    },
    eir: {
      title: "EIR",
      subtitle: "Requisitos de Intercambio de Información",
      description: "Pliego de exigencias de datos médicos que el oferente debe plasmar en la entrega digital.",
      question: "¿Cómo se solicita la información?",
      questionLabel: "Mandato BIM de Información",
      example: "Modelos 3D clasificados estrictamente bajo códigos OmniClass, entregando planillas COBie rellenadas de todos los activos electromecánicos para integración EAM.",
      actor: "Oficina de Licitaciones y Dirección BIM"
    },
    pim: {
      title: "PIM",
      subtitle: "Modelo de Información del Proyecto",
      description: "Modelo virtual de diseño y obra coordinado que evita retrasos por colisiones técnicas.",
      question: "¿Qué genera el diseño y obra?",
      questionLabel: "Fase de Entrega",
      example: "Modelos de ingeniería de detalle de gases medicinales integrados con estructuras y ductos de ventilación crítica, coordinando interferencias en etapa virtual.",
      actor: "Consorcio Constructor e Ingenierías"
    },
    aim: {
      title: "AIM",
      subtitle: "Modelo de Información del Activo",
      description: "Gemelo digital enlazado para la gobernanza total de la vida útil del hospital.",
      question: "¿Con qué operamos el activo?",
      questionLabel: "Fase de Operación",
      example: "As-Built definitivo conectado con sensores IoT de presión negativa en salas de aislamiento infeccioso y temperaturas de red de vacunas.",
      actor: "Mantenimiento Técnico Hospitalario"
    }
  },
  {
    id: "comercial",
    label: "Inmobiliario Corporativo",
    desc: "Torre de Oficinas Eficiente con certificación LEED",
    need: "Necesidad: Construir un edificio comercial AAA de alta plusvalía que minimice la huella de carbono.",
    oir: {
      title: "OIR",
      subtitle: "Requisitos de Información de la Organización",
      description: "Alineación de inversiones y rentabilidad inmobiliaria sostenible.",
      question: "¿Por qué se construye?",
      questionLabel: "Estrategia del Desarrollador",
      example: "Atraer arrendatarios multinacionales de perfil premium ofreciendo una torre con certificación LEED Platinum y costos de administración un 25% por debajo del mercado.",
      actor: "Desarrollador Inmobiliario / Asset Manager"
    },
    pir: {
      title: "PIR",
      subtitle: "Requisitos de Información del Proyecto",
      description: "Sienta las pautas físicas de diseño de la torre para garantizar el estándar LEED y espacio útil.",
      question: "¿Qué se necesita en este proyecto?",
      questionLabel: "Alcance Comercial",
      example: "Torre de 25 pisos con núcleo central estructural antisísmico, fachada cortina con doble acristalamiento templado de baja emisividad y sistema central automatizado.",
      actor: "Gerencia de Desarrollo Inmobiliario"
    },
    air: {
      title: "AIR",
      subtitle: "Requisitos de Información del Activo",
      description: "Asegura la trazabilidad técnica para una administración eficiente de servicios y expensas.",
      question: "¿Para qué operamos la información?",
      questionLabel: "Gestión Comercial y Operativa",
      example: "Sub-facturación de consumo eléctrico independiente por piso, mantenimiento del sistema de elevadores inteligentes y control predictivo de bombas de agua helada.",
      actor: "Empresa Administradora de Inmuebles"
    },
    eir: {
      title: "EIR",
      subtitle: "Requisitos de Intercambio de Información",
      description: "Documento contractual que fija los parámetros BIM de entrega de materiales e instalaciones.",
      question: "¿Cómo se solicita la información?",
      questionLabel: "Pliego de Requisitos BIM",
      example: "Modelos en formatos nativos y abiertos clasificados con UniFormat, incluyendo todos los metadatos de garantía de chillers de climatización y fichas de vida útil.",
      actor: "BIM Manager del Desarrollador"
    },
    pim: {
      title: "PIM",
      subtitle: "Modelo de Información del Proyecto",
      description: "BIM coordinado para control óptimo de costos y plazos de construcción física.",
      question: "¿Qué genera el diseño y obra?",
      questionLabel: "Fase de Entrega",
      example: "Modelo integrado coordinado de estructura de concreto armado de plantas libres con sistemas mecánicos de cielo raso, optimizando tiempos de montaje.",
      actor: "Empresa Constructora y Contratistas MEP"
    },
    aim: {
      title: "AIM",
      subtitle: "Modelo de Información del Activo",
      description: "El gemelo digital final entregado a la operadora para el monitoreo rutinario confiable.",
      question: "¿Con qué operamos el activo?",
      questionLabel: "Fase de Operación",
      example: "Modelo 3D virtual de operaciones conectado al BMS (Building Management System) para calibrar automatizaciones de climatización según ocupación real.",
      actor: "Jefe de Operaciones y Mantenimiento del Edificio"
    }
  },
  {
    id: "transporte",
    label: "Infraestructura de Transporte",
    desc: "Línea de Metro Subterráneo Urbano masivo",
    need: "Necesidad: Proveer movilidad urbana masiva, segura, puntual y de altísima confiabilidad de red.",
    oir: {
      title: "OIR",
      subtitle: "Requisitos de Información de la Organización",
      description: "Directrices macro del gobierno metropolitano para garantizar transporte continuo y seguro.",
      question: "¿Por qué se construye?",
      questionLabel: "Políticas de Movilidad Metropolitana",
      example: "Garantizar una disponibilidad del servicio de trenes del 99.8% reduciendo incidentes mecánicos en vías mediante un mantenimiento optimizado a largo plazo.",
      actor: "Autoridad del Metro Urbano de la Ciudad"
    },
    pir: {
      title: "PIR",
      subtitle: "Requisitos de Información del Proyecto",
      description: "Define el tramo de túnel y estaciones específicas a licitar con estándares mecánicos de seguridad masiva.",
      question: "¿Qué se necesita en este proyecto?",
      questionLabel: "Ingeniería de Obra de Metro",
      example: "Túnel subterráneo de 12 km excavado con tuneladora, 10 estaciones de alta ventilación, sistema de catenaria rígida y trenes autónomos computarizados.",
      actor: "Dirección de Obras Ferroviarias"
    },
    air: {
      title: "AIR",
      subtitle: "Requisitos de Información del Activo",
      description: "Garantiza que la información permita prever fatiga de materiales pesados e instalaciones de vía.",
      question: "¿Para qué operamos la información?",
      questionLabel: "Mantenimiento Ferroviario Crítico",
      example: "Monitoreo preventivo de la vibración de túneles, desgaste de rieles, plan de sustitución de subestaciones eléctricas y desvíos automatizados de vías.",
      actor: "Gerencia de Infraestructura y Vías Ferroviarias"
    },
    eir: {
      title: "EIR",
      subtitle: "Requisitos de Intercambio de Información",
      description: "Exigencia contractual detallada para licitadores internacionales sobre modelos georreferenciados.",
      question: "¿Cómo se solicita la información?",
      questionLabel: "TDR e Información BIM del Pliego",
      example: "Modelos 3D georreferenciados según sistema de coordenadas oficial de la ciudad, con parametrización de catenarias e hilos de contacto estructurados en IFC.",
      actor: "Comisión Técnica de Licitación / Metro"
    },
    pim: {
      title: "PIM",
      subtitle: "Modelo de Información del Proyecto",
      description: "Modelo integrando complejas ingenierías civiles, electromecánicas y de telecomunicación.",
      question: "¿Qué genera el diseño y obra?",
      questionLabel: "Fase de Entrega",
      example: "Modelado federado masivo unificando obra civil de túneles con subestaciones, rieles y sistemas de señalización de seguridad civil, resolviendo más de 400 pre-colisiones.",
      actor: "Consorcio de Constructoras Civiles"
    },
    aim: {
      title: "AIM",
      subtitle: "Modelo de Información del Activo",
      description: "Soporte operativo que combina visualización 3D e información geográfica de la ciudad (GIS).",
      question: "¿Con qué operamos el activo?",
      questionLabel: "Fase de Operación",
      example: "Modelo 3D final as-built federado integrado con SIG para visualizar desgaste acumulado en rieles de metro y planificar cortes de vía de mantenimiento nocturno.",
      actor: "Equipo de Operaciones e Ingeniería de Metro"
    }
  }
];

export const CascadaSlide = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeBlock, setActiveBlock] = useState<string | null>("oir");

  const scenario = SCENARIOS[selectedScenarioIndex];

  // Helper values for active display
  const activeData: BlockData = activeBlock && scenario[activeBlock as keyof Scenario] 
    ? (scenario[activeBlock as keyof Scenario] as BlockData) 
    : scenario.oir;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10 font-sans"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div>
          <span className="text-pink-500 font-mono text-[9px] uppercase tracking-[0.4em] font-black">Clase 2: Profundización</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1 italic">
            El Ciclo de la Información <span className="text-white">ISO 19650</span>
          </h2>
          <p className="text-slate-400 text-xs">
            Paso 1: La Cascada de Requisitos — Del alineamiento de negocio de la Empresa a la entrega real del Contratista.
          </p>
        </div>
        <div className="bg-artis-black px-4 py-2 border border-white/5 rounded-full flex items-center gap-3 shrink-0">
          <Database className="w-4 h-4 text-pink-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">Gobernanza Digital</span>
        </div>
      </div>

      {/* Scenario Selectors */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 shrink-0 bg-[#090d16]/30 border border-white/5 p-2 rounded-sm select-none">
        <span className="text-[10px] font-mono tracking-widest text-[#de1b7d] uppercase font-black self-center px-2">Escenario Industrial:</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 flex-1">
          {SCENARIOS.map((sc, index) => {
            const isSelected = index === selectedScenarioIndex;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIndex(index);
                  // Keep block active but clear to ensure it links correctly
                }}
                className={cn(
                  "py-2 px-3 text-[10px] rounded-xs font-bold uppercase transition-all border text-center cursor-pointer truncate",
                  isSelected
                    ? "bg-gradient-to-r from-pink-500/15 to-artis-orange/5 text-white border-pink-500/60 shadow-[0_0_10px_rgba(222,27,125,0.15)]"
                    : "bg-transparent hover:bg-white/5 border-transparent text-slate-400"
                )}
                title={sc.desc}
              >
                {sc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Need banner */}
      <div className="py-2.5 px-4 bg-gradient-to-r from-sky-500/15 to-transparent border-l-2 border-sky-400 rounded-r-sm text-left mb-6 text-xs text-white uppercase tracking-tight font-black select-none flex items-center gap-3">
        <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />
        {scenario.need}
      </div>

      {/* Main Panel Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 items-start">
        {/* Interactive Cascade Graph (Left 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-sm border border-white/10 bg-[#070b13] relative overflow-hidden shadow-2xl">
            {/* Diagram Background Grid */}
            <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

            {/* Diagram Headers */}
            <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-3 mb-6 select-none">
              <div className="text-center">
                <span className="text-[8px] tracking-[0.2em] font-mono text-slate-500 font-bold uppercase">Categorías Base</span>
                <h4 className="text-[10px] font-black text-slate-300 uppercase">Alineación Organizativa</h4>
              </div>
              <div className="text-center border-x border-white/5">
                <span className="text-[8px] tracking-[0.2em] font-mono text-slate-500 font-bold uppercase">Pliegos Operativos</span>
                <h4 className="text-[10px] font-black text-slate-300 uppercase">Contratos de Datos</h4>
              </div>
              <div className="text-center">
                <span className="text-[8px] tracking-[0.2em] font-mono text-slate-500 font-bold uppercase">Entregables BIM</span>
                <h4 className="text-[10px] font-black text-slate-300 uppercase">Modelos de Información</h4>
              </div>
            </div>

            {/* Matrix of Flow */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-10 relative">
              
              {/* --- COLUMN 1: REQUERIMIENTOS BASE --- */}
              <div className="flex flex-col gap-10">
                {/* 1. OIR Block */}
                <div className="relative group">
                  <button
                    onClick={() => setActiveBlock("oir")}
                    className={cn(
                      "w-full p-4 rounded-sm border text-left transition-all relative flex flex-col cursor-pointer active:scale-95 select-none",
                      activeBlock === "oir"
                        ? "bg-gradient-to-br from-[#de1b7d]/20 to-[#de1b7d]/5 border-[#de1b7d] shadow-[0_0_15px_rgba(222,27,125,0.25)]"
                        : "bg-[#0b0e17]/50 border-white/5 text-slate-300 hover:border-white/10 hover:bg-[#0c101c]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                      <span className="text-[8.5px] font-mono font-black text-[#de1b7d] tracking-wider uppercase">NEGOCIO / OPERACIÓN</span>
                      <span className="text-[6.5px] bg-white/5 text-slate-400 px-1 py-0.5 rounded-none font-bold">OIR</span>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">OIR</h5>
                    <p className="text-[9.5px] text-slate-500 font-bold uppercase leading-none mt-1">Requisitos de la Organización</p>
                    <div className="text-[9.5px] text-pink-400 font-mono italic mt-1.5 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#de1b7d]" /> P: ¿Por qué?
                    </div>
                  </button>

                  {/* Flow Arrow down to PIR */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 flex flex-col items-center select-none pointer-events-none">
                    <span className="text-[7px] font-mono text-slate-600 uppercase font-black bg-[#070b13] px-1 translate-y-2 z-10">Contribuye a</span>
                    <ArrowDown className="w-3.5 h-3.5 text-white/10" />
                  </div>
                  
                  {/* Flow SVG connection path OIR -> AIR (horizontal crossing) */}
                  <div className="absolute top-1/2 -right-6 w-6 h-[1.5px] border-t-2 border-dashed border-white/5 pointer-events-none select-none z-0"></div>
                </div>

                {/* 2. PIR Block */}
                <div className="relative group mt-2">
                  <button
                    onClick={() => setActiveBlock("pir")}
                    className={cn(
                      "w-full p-4 rounded-sm border text-left transition-all relative flex flex-col cursor-pointer active:scale-95 select-none",
                      activeBlock === "pir"
                        ? "bg-gradient-to-br from-[#de1b7d]/20 to-[#de1b7d]/5 border-[#de1b7d] shadow-[0_0_15px_rgba(222,27,125,0.25)]"
                        : "bg-[#0b0e17]/50 border-white/5 text-slate-300 hover:border-white/10 hover:bg-[#0c101c]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                      <span className="text-[8.5px] font-mono font-black text-[#de1b7d] tracking-wider uppercase">OBJETIVO DEL PROYECTO</span>
                      <span className="text-[6.5px] bg-white/5 text-slate-400 px-1 py-0.5 rounded-none font-bold">PIR</span>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">PIR</h5>
                    <p className="text-[9.5px] text-slate-500 font-bold uppercase leading-none mt-1">Requisitos del Proyecto</p>
                    <div className="text-[9.5px] text-pink-400 font-mono italic mt-1.5 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#de1b7d]" /> P: ¿Qué?
                    </div>
                  </button>

                  {/* Flow Arrow pointing horizontally to middle column bottom (EIR) */}
                  <div className="absolute top-1/2 -right-8 flex items-center select-none pointer-events-none overflow-visible w-8">
                    <span className="absolute left-1 flex-1 h-[2px] w-6 bg-[#de1b7d]/20"></span>
                    <span className="absolute -right-1.5 text-[6.5px] font-mono text-pink-400/80 bg-[#070b13] px-0.5 uppercase font-black tracking-tighter shrink-0 z-10 translate-y-3">Proporciona Entrada</span>
                    <ArrowRight className="absolute right-0 w-3 h-3 text-[#de1b7d]/50" />
                  </div>
                </div>

                {/* Actor Badge Base Column 1 */}
                <div className="bg-white/2 border border-white/5 p-3 rounded-xs text-center select-none flex items-center gap-2 justify-center mt-auto">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <div className="text-left">
                    <span className="text-[7.5px] uppercase font-bold text-slate-500 block leading-tight font-mono">Actor Promotor</span>
                    <span className="text-[9px] font-bold text-slate-300 block leading-tight truncate max-w-[120px]">Cliente / Mandante</span>
                  </div>
                </div>
              </div>

              {/* --- COLUMN 2: PLIEGOS OPERATIVOS / CONTRATOS --- */}
              <div className="flex flex-col gap-10">
                {/* 3. AIR Block */}
                <div className="relative group">
                  <button
                    onClick={() => setActiveBlock("air")}
                    className={cn(
                      "w-full p-4 rounded-sm border text-left transition-all relative flex flex-col cursor-pointer active:scale-95 select-none",
                      activeBlock === "air"
                        ? "bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                        : "bg-[#0b0e17]/50 border-white/5 text-slate-300 hover:border-white/10 hover:bg-[#0c101c]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                      <span className="text-[8.5px] font-mono font-black text-indigo-400 tracking-wider uppercase">GESTIÓN DE ACTIVOS</span>
                      <span className="text-[6.5px] bg-white/5 text-slate-400 px-1 py-0.5 rounded-none font-bold">AIR</span>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">AIR</h5>
                    <p className="text-[9.5px] text-slate-500 font-bold uppercase leading-none mt-1">Requisitos del Activo</p>
                    <div className="text-[9.5px] text-[#818cf8] font-mono italic mt-1.5 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#6366f1]" /> P: ¿Para qué?
                    </div>
                  </button>

                  {/* Flow Arrow down to EIR */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 flex flex-col items-center select-none pointer-events-none">
                    <span className="text-[7px] font-mono text-slate-600 uppercase font-black bg-[#070b13] px-1 translate-y-2 z-10">Contribuye a</span>
                    <ArrowDown className="w-3.5 h-3.5 text-white/10" />
                  </div>
                  
                  {/* Flow Arrow pointing horizontally to column 3 top (AIM) */}
                  <div className="absolute top-1/2 -right-8 flex items-center select-none pointer-events-none overflow-visible w-8">
                    <span className="absolute left-1 flex-1 h-[2px] w-6 bg-indigo-500/20"></span>
                    <span className="absolute -right-1 text-[6.5px] font-mono text-[#818cf8] bg-[#070b13] px-0.5 uppercase font-black tracking-tighter shrink-0 z-10 -translate-y-3">Especifica Contenido</span>
                    <ArrowRight className="absolute right-0 w-3 h-3 text-indigo-500/50" />
                  </div>
                </div>

                {/* 4. EIR Block */}
                <div className="relative group mt-2">
                  <button
                    onClick={() => setActiveBlock("eir")}
                    className={cn(
                      "w-full p-4 rounded-sm border text-left transition-all relative flex flex-col cursor-pointer active:scale-95 select-none",
                      activeBlock === "eir"
                        ? "bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                        : "bg-[#0b0e17]/50 border-white/5 text-slate-300 hover:border-white/10 hover:bg-[#0c101c]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                      <span className="text-[8.5px] font-mono font-black text-indigo-400 tracking-wider uppercase">LICITACIÓN / COMPRA</span>
                      <span className="text-[6.5px] bg-white/5 text-slate-400 px-1 py-0.5 rounded-none font-bold">EIR</span>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">EIR</h5>
                    <p className="text-[9.5px] text-slate-500 font-bold uppercase leading-none mt-1">Contrato de Intercambio</p>
                    <div className="text-[9.5px] text-[#818cf8] font-mono italic mt-1.5 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#6366f1]" /> P: ¿Cómo?
                    </div>
                  </button>

                  {/* Flow Arrow pointing horizontally to Column 3 bottom (PIM) */}
                  <div className="absolute top-1/2 -right-8 flex items-center select-none pointer-events-none overflow-visible w-8">
                    <span className="absolute left-1 flex-1 h-[2px] w-6 bg-indigo-500/20"></span>
                    <span className="absolute -right-1 text-[6.5px] font-mono text-[#818cf8] bg-[#070b13] px-0.5 uppercase font-black tracking-tighter shrink-0 z-10 -translate-y-3">Especifica Contenido</span>
                    <ArrowRight className="absolute right-0 w-3 h-3 text-indigo-500/50" />
                  </div>
                </div>

                {/* Actor Badge Base Column 2 */}
                <div className="bg-white/2 border border-white/5 p-3 rounded-xs text-center select-none flex items-center gap-2 justify-center mt-auto">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <div className="text-left">
                    <span className="text-[7.5px] uppercase font-bold text-slate-500 block leading-tight font-mono">Actor Directivo</span>
                    <span className="text-[9px] font-bold text-slate-300 block leading-tight truncate max-w-[120px]">BIM Manager Mandate</span>
                  </div>
                </div>
              </div>

              {/* --- COLUMN 3: ENTREGABLES / MODELOS --- */}
              <div className="flex flex-col gap-10">
                {/* 5. AIM Block */}
                <div className="relative group">
                  <button
                    onClick={() => setActiveBlock("aim")}
                    className={cn(
                      "w-full p-4 rounded-sm border text-left transition-all relative flex flex-col cursor-pointer active:scale-95 select-none",
                      activeBlock === "aim"
                        ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                        : "bg-[#0b0e17]/50 border-white/5 text-slate-300 hover:border-white/10 hover:bg-[#0c101c]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                      <span className="text-[8.5px] font-mono font-black text-emerald-400 tracking-wider uppercase">MODELO DE OPERACIÓN</span>
                      <span className="text-[6.5px] bg-white/5 text-slate-400 px-1 py-0.5 rounded-none font-bold">AIM</span>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">AIM</h5>
                    <p className="text-[9.5px] text-slate-500 font-bold uppercase leading-none mt-1">Modelo de Activo (O&M)</p>
                    <div className="text-[9.5px] text-[#34d399] font-mono italic mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Operaciones Digitales
                    </div>
                  </button>

                  {/* Flow Arrow pointing up from PIM to AIM */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 flex flex-col items-center select-none pointer-events-none">
                    <span className="text-[7px] font-mono text-slate-600 uppercase font-black bg-[#070b13] px-1 translate-y-2 z-10">Alimenta / Crece</span>
                    <ArrowDown className="w-3.5 h-3.5 text-white/10 rotate-180" />
                  </div>
                </div>

                {/* 6. PIM Block */}
                <div className="relative group mt-2">
                  <button
                    onClick={() => setActiveBlock("pim")}
                    className={cn(
                      "w-full p-4 rounded-sm border text-left transition-all relative flex flex-col cursor-pointer active:scale-95 select-none",
                      activeBlock === "pim"
                        ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                        : "bg-[#0b0e17]/50 border-white/5 text-slate-300 hover:border-white/10 hover:bg-[#0c101c]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                      <span className="text-[8.5px] font-mono font-black text-emerald-400 tracking-wider uppercase">MODELO DE OBRA</span>
                      <span className="text-[6.5px] bg-white/5 text-slate-400 px-1 py-0.5 rounded-none font-bold">PIM</span>
                    </div>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">PIM</h5>
                    <p className="text-[9.5px] text-slate-500 font-bold uppercase leading-none mt-1">Modelo de Proyecto</p>
                    <div className="text-[9.5px] text-[#34d399] font-mono italic mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Diseño y Obra
                    </div>
                  </button>
                </div>

                {/* Actor Badge Base Column 3 */}
                <div className="bg-white/2 border border-white/5 p-3 rounded-xs text-center select-none flex items-center gap-2 justify-center mt-auto">
                  <Users2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <div className="text-left">
                    <span className="text-[7.5px] uppercase font-bold text-slate-500 block leading-tight font-mono">Actor Productor</span>
                    <span className="text-[9px] font-bold text-slate-300 block leading-tight truncate max-w-[120px]">Contratista / Mercado</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Instruction tooltip */}
            <div className="mt-8 pt-4 border-t border-white/5 text-center text-[10px] text-slate-500 font-mono tracking-wide uppercase select-none">
              💡 Presione cualquier bloque (OIR, PIR, AIR, EIR, PIM, AIM) para ver su desglose en el panel derecho.
            </div>
          </div>
        </div>

        {/* Detailed Explanation Panel (Right 5 Columns) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="glass-panel p-6 rounded-sm border border-white/5 bg-[#090d16]/30 shadow-xl h-full flex flex-col justify-between min-h-[460px]">
            <div>
              {/* Box Title */}
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-mono text-[#de1b7d] font-black border border-[#de1b7d]/30 px-2 py-0.5 bg-rose-500/10">
                    DETALLE DEL REQUISITO
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono">
                  <RefreshCw className="w-3 h-3 text-[#de1b7d]" /> ISO 19650
                </div>
              </div>

              {/* Dynamic Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBlock}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 text-left"
                >
                  <div>
                    <span className="text-[10px] uppercase text-pink-500 font-mono tracking-widest font-black block">
                      {activeData.subtitle}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mt-1 italic leading-none">
                      {activeData.title}
                    </h3>
                  </div>

                  {/* Core description */}
                  <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans border-l border-white/10 pl-3">
                    {activeData.description}
                  </p>

                  {/* Question visualizer */}
                  <div className="p-3 bg-[#0d1222] border border-white/5 rounded-xs flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] uppercase text-slate-500 tracking-wider font-bold font-mono">Pregunta que responde</span>
                      <span className="block text-sm font-semibold text-white mt-0.5">{activeData.question}</span>
                    </div>
                    <div className="px-2.5 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full shrink-0">
                      <span className="text-[8.5px] font-mono leading-none text-pink-400 uppercase font-black tracking-wide">
                        {activeData.questionLabel}
                      </span>
                    </div>
                  </div>

                  {/* Real World Example box */}
                  <div className="p-4 bg-artis-orange/5 border border-artis-orange/20 rounded-xs">
                    <h4 className="text-xs font-bold text-artis-orange uppercase tracking-wider flex items-center gap-1.5 mb-2 font-mono">
                      <FileText className="w-3.5 h-3.5 shrink-0" /> Ejemplo de Aplicación (Escenario activo)
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-normal italic font-medium">
                      "{activeData.example}"
                    </p>
                  </div>

                  {/* Actor responsabilities */}
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xs">
                    <span className="block text-[8px] uppercase text-slate-500 tracking-wider font-bold font-mono">Responsable Directo / Emisor</span>
                    <span className="block text-xs font-black text-slate-200 mt-1 uppercase tracking-wider">{activeData.actor}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-white/5 text-[9.5px] text-slate-500 uppercase tracking-wider select-none font-mono flex items-center gap-1.5 mt-6 justify-between">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#de1b7d]" /> Módulo de Gobernanza Digital
              </span>
              <span className="text-[#de1b7d] font-black">PASO 01</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper code to inject Tailwind standard conditional names safely
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
