import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tag, Layers, ShieldCheck, HelpCircle, Lightbulb, 
  Search, ListCollapse, Compass, RefreshCw, Layers2,
  FileSpreadsheet, Sparkles, Network, CheckCircle2, ChevronRight, Info,
  Globe, Award, Bookmark, ArrowRight, Eye
} from 'lucide-react';

interface ElementInfo {
  name: string;
  category: string;
  omniClassCode: string;
  omniClassPath: string[];
  uniClassCode: string;
  uniClassPath: string[];
  masterFormatCode: string;
  masterFormatPath: string[];
  uniFormatCode: string;
  uniFormatPath: string[];
  bimApplication: string;
}

interface AnimalTaxonomy {
  name: string;
  scientificName: string;
  emoji: string;
  color: string; // Tailwind color classes
  textAccent: string;
  accentBg: string;
  borderCol: string;
  hierarchy: { rank: string; value: string; desc: string }[];
  funFact: string;
}

export const ClasificacionBimSlide = () => {
  // Tabs: 'bim' (Clasificación Técnica Estándar) or 'animal' (Analogía Visual)
  const [activeTab, setActiveTab] = useState<'bim' | 'animal'>('bim');

  // Elements to simulate building classification
  const [selectedElement, setSelectedElement] = useState<'wall' | 'footing' | 'door' | 'light'>('wall');
  const [selectedStandard, setSelectedStandard] = useState<'omniclass' | 'uniclass' | 'masterformat' | 'uniformat'>('omniclass');
  
  // Animal taxonomy state
  const [selectedAnimal, setSelectedAnimal] = useState<'lion' | 'dolphin' | 'eagle' | 'chameleon'>('lion');
  const [hoveredRank, setHoveredRank] = useState<string | null>(null);

  // Custom states for interactive characteristics
  const [activeChar, setActiveChar] = useState<string>('estructurado');

  // Realistic building elements classification data with Uniformat added
  const elementsData: Record<'wall' | 'footing' | 'door' | 'light', ElementInfo> = {
    wall: {
      name: "Muro Exterior de Hormigón",
      category: "Elementos / Sistemas de Cerramiento",
      omniClassCode: "21-02 10 20",
      omniClassPath: [
        "Tabla 21: Elements (Elementos de Construcción)",
        "21-02: Superstructure & Shell (Superestructura y Envoltura)",
        "21-02 10: Exterior Vertical Enclosures (Cerramientos Verticales Exteriores)",
        "21-02 10 20: Exterior Walls (Muros Exteriores)"
      ],
      uniClassCode: "Ss_25_10_30",
      uniClassPath: [
        "Ss: Systems (Sistemas)",
        "Ss_25: Wall, barrier and cladding systems (Sistemas de Muros y Revestimientos)",
        "Ss_25_10: Wall systems (Sistemas de Paredes)",
        "Ss_25_10_30: External wall systems (Sistemas de Muros Exteriores)"
      ],
      masterFormatCode: "03 30 00",
      masterFormatPath: [
        "División 03: Concrete (Hormigón / Concreto)",
        "03 30 00: Cast-in-Place Concrete (Hormigón Moldeado in Situ)",
        "Muros Estructurales de Carga Terrestre"
      ],
      uniFormatCode: "B2010",
      uniFormatPath: [
        "Categoría B: Shell (Envoltura de Edificio)",
        "B20: Exterior Enclosure (Cerramiento Exterior)",
        "B2010: Exterior Walls (Sistemas de Muros Exteriores en Fachada)"
      ],
      bimApplication: "Rebasa las consultas manuales. En Revit o Archicad, este código permite calcular automáticamente el área exterior expuesta a vientos para análisis de transmitancia térmica y cubicación de pintura."
    },
    footing: {
      name: "Zapata de Fundación Aislada",
      category: "Cimentación / Estructura de Soporte",
      omniClassCode: "21-01 10 10",
      omniClassPath: [
        "Tabla 21: Elements (Elementos de Construcción)",
        "21-01: Substructure (Subestructura)",
        "21-01 10: Foundations (Cimentaciones)",
        "21-01 10 10: Standard Foundations (Cimentaciones Convencionales)"
      ],
      uniClassCode: "Ef_15_10",
      uniClassPath: [
        "Ef: Elements (Elementos)",
        "Ef_15: Ground and foundation elements (Elementos de Terreno y Fundación)",
        "Ef_15_10: Foundations (Cimentaciones de Soporte Fijo)"
      ],
      masterFormatCode: "03 11 13",
      masterFormatPath: [
        "División 03: Concrete (Hormigón / Concreto)",
        "03 11 00: Concrete Forming (Encofrados de Concreto)",
        "03 11 13: Structural Cast-in-Place Concrete Forming (Moldes de Zapata)"
      ],
      uniFormatCode: "A1010",
      uniFormatPath: [
        "Categoría A: Substructure (Subestructura)",
        "A10: Foundations (Cimentaciones de Soporte)",
        "A1010: Standard Foundations (Zapata o base de fundación corrida)"
      ],
      bimApplication: "Permite al software de presupuesto (Navisworks, Presto o CYPE) agrupar todas las zapatas e identificar de inmediato la dosificación del hormigón y metros cúbicos requeridos."
    },
    door: {
      name: "Puerta de Madera contra Incendios",
      category: "Carpintería / Aperturas",
      omniClassCode: "23-30 10 10",
      omniClassPath: [
        "Tabla 23: Products (Productos de Construcción)",
        "23-30: Openings, Passages & Protective Devices (Aperturas y Dispositivos de Protección)",
        "23-30 10: Doors & Gates (Puertas e Ingresos)",
        "23-30 10 10: Wood Doors (Puertas de Madera)"
      ],
      uniClassCode: "Pr_30_59_24",
      uniClassPath: [
        "Pr: Products (Productos)",
        "Pr_30: Structure and enclosure products (Productos Estructurales y de Envoltura)",
        "Pr_30_59: Door and window products (Sistemas de Madera de Paso)",
        "Pr_30_59_24: Door assemblies (Conjuntos de Puertas Completos)"
      ],
      masterFormatCode: "08 14 16",
      masterFormatPath: [
        "División 08: Openings (Aperturas / Puertas y Ventanas)",
        "08 14 00: Wood Doors (Puertas de Madera Nativas)",
        "08 14 16: Flush Wood Doors (Puertas Lisas de Madera Compuesta)"
      ],
      uniFormatCode: "B2030",
      uniFormatPath: [
        "Categoría B: Shell (Envoltura de Edificio)",
        "B20: Exterior Enclosure (Cerramiento Exterior)",
        "B2030: Exterior Doors (Puertas y Accesos Exteriores Cortafuegos)"
      ],
      bimApplication: "Almacena los parámetros de resistencia al fuego del modelo nativo. El auditor de seguridad de bomberos puede aislar rápidamente la categoría con búsqueda de código y comprobar el cumplimiento de horas de resguardo."
    },
    light: {
      name: "Luminaria Embutida LED",
      category: "Equipos Eléctricos / Iluminación",
      omniClassCode: "23-85 10 10",
      omniClassPath: [
        "Tabla 23: Products (Productos)",
        "23-85: Electrical & Lighting Products (Productos Eléctricos y de Luminotecnia)",
        "23-85 10: Luminaires (Luminarias de Distribución Fotométrica)",
        "23-85 10 10: Indoor Luminaires (Luminarias Interiores Estándar)"
      ],
      uniClassCode: "Pr_70_70_47",
      uniClassPath: [
        "Pr: Products (Productos de Obra)",
        "Pr_70: Services products (Sistemas de Servicio de Distribución)",
        "Pr_70_70: Electrical and lighting products (Productos de Suministro Eléctrico)",
        "Pr_70_70_47: Luminaires (Luminarias LED Embutidas)"
      ],
      masterFormatCode: "26 51 19",
      masterFormatPath: [
        "División 26: Electrical (Sistemas Eléctricos)",
        "26 51 00: Interior Lighting (Iluminación de Espacios Interiores)",
        "26 51 19: LED Interior Lighting (Luminarias de Tecnología de Diodos)"
      ],
      uniFormatCode: "D5020",
      uniFormatPath: [
        "Categoría D: Services (Instalaciones y Servicios)",
        "D50: Electrical (Instalaciones Eléctricas Técnicas)",
        "D5020: Lighting and Branch Wiring (Alumbrado y Circuitos Derivados)"
      ],
      bimApplication: "Indispensable para el Facility Management (Gestión de Operaciones). Facilita al equipo de mantenimiento geolocalizar la marca y reemplazar el bulbo en el modelo usando la codificación única en la base de datos de activos (AIM)."
    }
  };

  // Animal Taxonomy data for visual comparison
  const animalData: Record<'lion' | 'dolphin' | 'eagle' | 'chameleon', AnimalTaxonomy> = {
    lion: {
      name: "León",
      scientificName: "Panthera leo",
      emoji: "🦁",
      color: "from-amber-500/25 to-amber-700/5",
      textAccent: "text-amber-400",
      accentBg: "bg-amber-500/10",
      borderCol: "border-amber-500/30",
      hierarchy: [
        { rank: "Reino", value: "Animalia", desc: "Organismo pluricelular complejo con nutrición heterótrofa." },
        { rank: "Filo", value: "Chordata", desc: "Posee cuerda dorsal y columna vertebral segmentada." },
        { rank: "Clase", value: "Mammalia", desc: "Posee glándulas mamarias y temperatura corporal regulada." },
        { rank: "Orden", value: "Carnivora", desc: "Especializado en consumo alimentario preferencial de carne." },
        { rank: "Familia", value: "Felidae", desc: "Garras retráctiles, rostro corto y ágiles hábitos de caza." },
        { rank: "Género", value: "Panthera", desc: "Estructura laríngea modificada que habilita rugidos potentes." },
        { rank: "Especie", value: "Panthera leo", desc: "Especie leonina: gran felino melánico de hábito social gregario." }
      ],
      funFact: "En la naturaleza, un león tiene el 'código' único Panthera leo. Esto impide que un biólogo lo confunda con un tigre (Panthera tigris) o con un felino doméstico, operando exactamente igual que una base de datos BIM."
    },
    dolphin: {
      name: "Delfín",
      scientificName: "Delphinus delphis",
      emoji: "🐬",
      color: "from-sky-500/25 to-sky-700/5",
      textAccent: "text-sky-450",
      accentBg: "bg-sky-500/10",
      borderCol: "border-sky-500/30",
      hierarchy: [
        { rank: "Reino", value: "Animalia", desc: "Eucariontes móviles sin pared celular y tejido diferenciado." },
        { rank: "Filo", value: "Chordata", desc: "Vertebrados marinos de desarrollo cefálico avanzado." },
        { rank: "Clase", value: "Mammalia", desc: "Mamífero marino de sangre caliente con espiráculo funcional." },
        { rank: "Orden", value: "Cetacea", desc: "Cuerpo torpedo hidrodinámico y extremidades anteriores de aleta." },
        { rank: "Familia", value: "Delphinidae", desc: "Cetáceos odontocetos sociables con biosónar o ecolocalización." },
        { rank: "Género", value: "Delphinus", desc: "Hocico alargado delimitado por un surco y dentadura cónica." },
        { rank: "Especie", value: "D. delphis", desc: "Delfín común de zonas templadas y pelágicas de los océanos." }
      ],
      funFact: "Para clasificar un delfín, descendemos por la jerarquía. El sistema inmediatamente descarta que sea un tiburón (Clase: Chondrichthyes), impidiendo costosos errores de identificación científica."
    },
    eagle: {
      name: "Águila Real",
      scientificName: "Aquila chrysaetos",
      emoji: "🦅",
      color: "from-orange-505/25 to-yellow-700/5",
      textAccent: "text-yellow-400",
      accentBg: "bg-yellow-500/10",
      borderCol: "border-yellow-500/30",
      hierarchy: [
        { rank: "Reino", value: "Animalia", desc: "Pluricelulares que metabolizan alimento de forma interna." },
        { rank: "Filo", value: "Chordata", desc: "Vías nerviosas tubulares protegidas por arcos óseos." },
        { rank: "Clase", value: "Aves", desc: "Saurópsidos endotermos con plumas, pico córneo y vuelo." },
        { rank: "Orden", value: "Accipitriformes", desc: "Aves de presa diurnas de gran tamaño y garras curvas potentes." },
        { rank: "Familia", value: "Accipitridae", desc: "Rapaces de vista ultra-aguda y robustos tarsos de aprensión." },
        { rank: "Género", value: "Aquila", desc: "Águilas verdaderas con tarsos emplumados hasta los dedos." },
        { rank: "Especie", value: "A. chrysaetos", desc: "Águila real: plumaje pardo leonado con matices dorados en nuca." }
      ],
      funFact: "La rigurosa 'anatomía taxonómica' de las aves funciona idénticamente a las tablas OmniClass: desglosa al elemento paso a paso hasta que su identidad queda indiscutiblemente fijada."
    },
    chameleon: {
      name: "Camaleón",
      scientificName: "Chamaeleo chamaeleon",
      emoji: "🦎",
      color: "from-emerald-500/25 to-teal-700/5",
      textAccent: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      borderCol: "border-emerald-500/30",
      hierarchy: [
        { rank: "Reino", value: "Animalia", desc: "Reino metazoo con maduración de tejidos y locomoción." },
        { rank: "Filo", value: "Chordata", desc: "Estructura cordada de soporte general resistente." },
        { rank: "Clase", value: "Reptilia", desc: "Vertebrados terrestres de respiración pulmonar y escamas duras." },
        { rank: "Orden", value: "Squamata", desc: "Saurios y ofidios caracterizados por mudar la piel exterior." },
        { rank: "Familia", value: "Chamaeleonidae", desc: "Especialistas arborícolas de ojos giratorios e independiente foco." },
        { rank: "Género", value: "Chamaeleo", desc: "Camaleones de cuerno o casco prominente sobre el cráneo." },
        { rank: "Especie", value: "C. chamaeleon", desc: "Camaleón común de gran mimetismo cromático activo." }
      ],
      funFact: "Aunque cambie de color a azul o verde, su código taxonómico (Chamaeleo chamaeleon) permanece inalterado. En el CDE, un objeto BIM mantiene su ID de clasificación intacto aunque cambies su geometría."
    }
  };

  const characteristics = [
    {
      id: 'estructurado',
      title: "Estructurado",
      subtitle: "Jerarquía Inteligente",
      desc: "Organiza meticulosamente toda la información de un activo de construcción de lo general a lo particular bajo un orden de tablas lógicas interconectadas.",
      detail: "No se limita a colgar etiquetas sueltas. Al segmentar por niveles (Divisiones, Grupos, Clases, Subclases), cualquier máquina o motor de base de datos puede escanear un elemento y entender su superorden de procedencia por el patrón numérico.",
      badge: "Revit / IFC Standard"
    },
    {
      id: 'consistente',
      title: "Consistente",
      subtitle: "Uniformidad Absoluta",
      desc: "Utiliza criterios uniformes e inalterables para clasificar elementos idénticos, sin importar qué profesional defina la geometría.",
      detail: "Evita que un modelador llame a un pilar 'Columna_Hormigón', otro lo llame 'Pilar_Estructural', y un tercero 'Viga_Vertical'. Todos usarán el mismo código normativo, garantizando consistencia en las cubicaciones.",
      badge: "ISO 19650-2"
    },
    {
      id: 'escalable',
      title: "Escalable",
      subtitle: "Diseño para el Futuro",
      desc: "Tiene la flexibilidad intrínseca de expandirse y albergar nuevas subcategorías de datos o productos disruptivos sin dañar la categorización previa.",
      detail: "Si surgen tecnologías limpias como pintura fotovoltaica inteligente, el sistema puede ramificar una clase adicional dentro de las envolturas externas sin alterar los códigos ya indexados de cimentaciones, muros o puertas estándar.",
      badge: "Continuous Evolution"
    },
    {
      id: 'interoperable',
      title: "Interoperable",
      subtitle: "Independencia de Formato",
      desc: "Garantiza un lenguaje tecnológico neutro y universal que facilita el flujo limpio de datos a través de distintas soluciones del consorcio OpenBIM.",
      detail: "Vence los silos de software. Un muro exterior parametrizado de forma estandarizada mantiene sus metadatos estables al exportarse a IFC, importarse en software estructural (CYPE), modelador térmico, o gestor de costos como Presto.",
      badge: "OpenBIM & IFC"
    },
    {
      id: 'trazable',
      title: "Trazable",
      subtitle: "Control en el Ciclo de Vida",
      desc: "Permite seguir y correlacionar un elemento unitario de diseño desde el trazo de planos nativos hasta las tareas de demolición o reciclaje.",
      detail: "Asocia instantáneamente un elemento físico en terreno con planos as-built, órdenes de compra comerciales de materiales, bitácoras de mantención de activos, y eventuales deslindes por reclamos mecánicos o estructurales.",
      badge: "Trazabilidad de Datos"
    }
  ];

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header Slide section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-[0.2em] block mb-1">
            CLASE 6 — ENTORNO DE DATOS COMUNES
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-pink-500 shrink-0" />
            Sistemas de Clasificación de Información
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            El lenguaje estructural común para garantizar consistencia técnica e intercambio de información
          </p>
        </div>
        
        {/* Tab Switcher - BIM vs Animal Metaphor */}
        <div className="flex bg-black/55 p-1 rounded-xl border border-white/5 self-start md:self-auto shrink-0 shadow-lg">
          <button
            id="tab-bim-systems"
            onClick={() => setActiveTab('bim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'bim' ? 'bg-pink-500/15 border border-pink-500/35 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Layers className="w-3.5 h-3.5 text-pink-500" />
            Clasificación BIM
          </button>
          <button
            id="tab-animal-analogy"
            onClick={() => setActiveTab('animal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'animal' ? 'bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-white shadow-[0_0_12px_rgba(56,189,248,0.05)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            Ejemplo Visual: Animales
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'bim' ? (
          /* ==================== TAB 1: CLASIFICACIÓN TÉCNICA (BIM) ==================== */
          <motion.div
            key="bim-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Introducción General */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              <div className="md:col-span-8 space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-medium">
                  Un <strong>sistema de clasificación</strong> es una estructura organizada de categorías, códigos y reglas que permite agrupar, identificar y ordenar información de manera consistente según características comunes o criterios previamente definidos.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  En la construcción y BIM, este marco normativo permite asignar <strong className="text-white font-mono">códigos estandarizados</strong> a elementos, espacios, actividades, materiales o documentos. Esto elimina ambigüedades, facilitando su búsqueda, intercambio e integración en presupuestos, análisis térmicos o programas de obra (4D/5D) a lo largo del ciclo de vida del proyecto.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col justify-between bg-pink-500/5 border border-pink-500/20 rounded-xl p-4 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-2xl rounded-full"></div>
                <div>
                  <span className="text-[8px] font-mono text-pink-400 font-black tracking-widest uppercase block mb-1">DEFINICIÓN INDUSTRIAL</span>
                  <p className="text-[11px] text-slate-200 italic font-medium leading-relaxed font-sans relative z-10">
                    &quot;Un sistema de clasificación es un lenguaje común para organizar y gestionar la información de un proyecto de construcción.&quot;
                  </p>
                </div>
                <div className="border-t border-white/5 pt-2 mt-3 flex justify-between items-center text-[8.5px] font-mono text-slate-500">
                  <span>NORMATIVA ASOCIADA</span>
                  <span className="text-pink-400 font-bold">ISO 19650 ANEXO</span>
                </div>
              </div>
            </div>

            {/* Interactive Section 1: Explora la Estructura en Acción */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Interactive Panel: Element Explorer */}
              <div className="lg:col-span-7 bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] font-mono text-pink-400 font-black uppercase tracking-widest block">HERRAMIENTA DIGITAL ACTIVA</span>
                      <h3 className="text-base font-mono font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-pink-500" />
                        Módulo de Clasificación en BIM
                      </h3>
                    </div>
                    <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold">
                      Multiestándar Integrado
                    </span>
                  </div>

                  {/* Selector de Elementos */}
                  <div className="space-y-2 mb-4">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Seleccione un Componente Estructural:</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <button
                        id="btn-class-wall"
                        onClick={() => setSelectedElement('wall')}
                        className={`px-3 py-2 rounded-lg text-[10.5px] font-sans font-bold transition-all border text-center cursor-pointer ${selectedElement === 'wall' ? 'bg-pink-500/15 border-pink-500/40 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.1)]' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
                      >
                        🧱 Muro Exterior
                      </button>
                      <button
                        id="btn-class-footing"
                        onClick={() => setSelectedElement('footing')}
                        className={`px-3 py-2 rounded-lg text-[10.5px] font-sans font-bold transition-all border text-center cursor-pointer ${selectedElement === 'footing' ? 'bg-pink-500/15 border-pink-500/40 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.1)]' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
                      >
                        📐 Zapata Fundación
                      </button>
                      <button
                        id="btn-class-door"
                        onClick={() => setSelectedElement('door')}
                        className={`px-3 py-2 rounded-lg text-[10.5px] font-sans font-bold transition-all border text-center cursor-pointer ${selectedElement === 'door' ? 'bg-pink-500/15 border-pink-500/40 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.1)]' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
                      >
                        🚪 Puerta Cortafuego
                      </button>
                      <button
                        id="btn-class-light"
                        onClick={() => setSelectedElement('light')}
                        className={`px-3 py-2 rounded-lg text-[10.5px] font-sans font-bold transition-all border text-center cursor-pointer ${selectedElement === 'light' ? 'bg-pink-500/15 border-pink-500/40 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.1)]' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'}`}
                      >
                        💡 Luminaria LED
                      </button>
                    </div>
                  </div>

                  {/* Selector de Estándar (Including Uniformat!) */}
                  <div className="flex flex-wrap gap-1.5 bg-black/45 p-1 rounded-xl border border-white/5 mb-4">
                    <button
                      id="btn-std-omniclass"
                      onClick={() => setSelectedStandard('omniclass')}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-extrabold uppercase transition-all cursor-pointer min-w-[100px] ${selectedStandard === 'omniclass' ? 'bg-pink-500/15 border border-pink-500/30 text-white' : 'text-slate-500 hover:text-slate-350'}`}
                    >
                      OmniClass (América)
                    </button>
                    <button
                      id="btn-std-uniclass"
                      onClick={() => setSelectedStandard('uniclass')}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-extrabold uppercase transition-all cursor-pointer min-w-[100px] ${selectedStandard === 'uniclass' ? 'bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-white' : 'text-slate-500 hover:text-slate-350'}`}
                    >
                      UniClass (Reino Unido)
                    </button>
                    <button
                      id="btn-std-uniformat"
                      onClick={() => setSelectedStandard('uniformat')}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-extrabold uppercase transition-all cursor-pointer min-w-[100px] ${selectedStandard === 'uniformat' ? 'bg-emerald-500/15 border border-emerald-500/30 text-white' : 'text-slate-500 hover:text-slate-350'}`}
                    >
                      UniFormat (Esquemático)
                    </button>
                    <button
                      id="btn-std-masterformat"
                      onClick={() => setSelectedStandard('masterformat')}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-extrabold uppercase transition-all cursor-pointer min-w-[100px] ${selectedStandard === 'masterformat' ? 'bg-amber-500/15 border border-amber-500/30 text-white' : 'text-slate-500 hover:text-slate-350'}`}
                    >
                      MasterFormat (Costos)
                    </button>
                  </div>

                  {/* Dynamic code visualization section */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedElement}-${selectedStandard}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="bg-black/50 p-4 border border-white/5 rounded-xl space-y-3 text-left"
                    >
                      {/* Large Code Output Badge */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase block">CÓDIGO DE CLASIFICACIÓN</span>
                          <span className="text-sm font-sans font-black text-white">{elementsData[selectedElement].name}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-3 py-1.5 rounded font-mono font-extrabold tracking-wide border ${
                            selectedStandard === 'omniclass' ? 'bg-pink-500/10 border-pink-500/25 text-pink-400' :
                            selectedStandard === 'uniclass' ? 'bg-sky-500/10 border-sky-500/25 text-sky-400' :
                            selectedStandard === 'uniformat' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' :
                            'bg-amber-500/10 border-amber-500/25 text-amber-400'
                          }`}>
                            {selectedStandard === 'omniclass' && elementsData[selectedElement].omniClassCode}
                            {selectedStandard === 'uniclass' && elementsData[selectedElement].uniClassCode}
                            {selectedStandard === 'masterformat' && elementsData[selectedElement].masterFormatCode}
                            {selectedStandard === 'uniformat' && elementsData[selectedElement].uniFormatCode}
                          </span>
                        </div>
                      </div>

                      {/* Hierarchy tree explorer */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">Desglose Jerárquico del Código:</span>
                        <div className="space-y-1.5 pl-1.5 border-l border-zinc-700/60 font-sans text-xs">
                          {(
                            selectedStandard === 'omniclass' ? elementsData[selectedElement].omniClassPath : 
                            selectedStandard === 'uniclass' ? elementsData[selectedElement].uniClassPath : 
                            selectedStandard === 'uniformat' ? elementsData[selectedElement].uniFormatPath :
                            elementsData[selectedElement].masterFormatPath
                          ).map((pathNode, idx, arr) => (
                            <div key={idx} className="flex flex-wrap items-center gap-1.5 text-slate-300">
                              <span className="text-[9px] font-mono text-zinc-500 shrink-0">Nivel {idx + 1}:</span>
                              <span className={`font-semibold ${
                                idx === arr.length - 1 ? (
                                  selectedStandard === 'omniclass' ? 'text-pink-400' :
                                  selectedStandard === 'uniclass' ? 'text-sky-400' :
                                  selectedStandard === 'uniformat' ? 'text-emerald-400' :
                                  'text-amber-400'
                                ) : "text-slate-300"
                              }`}>
                                {pathNode}
                              </span>
                              {idx !== arr.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-650 shrink-0" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real Coordination Value */}
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg text-slate-450 text-[11px] leading-relaxed font-sans">
                        💡 <strong className="text-slate-300">Aplicación práctica en obra:</strong> {elementsData[selectedElement].bimApplication}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                  <span>Intercambio estandarizado IFC ({selectedStandard.toUpperCase()})</span>
                  <span className="text-pink-400">OpenBIM Compliant</span>
                </div>
              </div>

              {/* Right Panel: Characteristics List */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between gap-4">
                <div className="space-y-3 text-left">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-black block">
                    CARACTERÍSTICAS CLAVE DEL SISTEMA
                  </span>

                  {/* Characteristics Grid list */}
                  <div className="space-y-2">
                    {characteristics.map((char) => {
                      const isSelected = activeChar === char.id;
                      return (
                        <button
                          key={char.id}
                          id={`btn-char-${char.id}`}
                          onClick={() => setActiveChar(char.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${isSelected ? 'border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-transparent shadow-[0_0_15px_rgba(236,72,153,0.05)]' : 'border-white/5 hover:bg-white/5'}`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-pink-500 animate-pulse' : 'bg-slate-700'}`}></span>
                              <strong className="text-xs font-mono uppercase text-white font-black">{char.title}</strong>
                            </div>
                            <span className="text-[8px] font-mono text-slate-500 font-extrabold uppercase">
                              {char.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{char.desc}</p>
                          
                          {/* Collapsible detail on active */}
                          <AnimatePresence initial={false}>
                            {isSelected && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="overflow-hidden border-t border-white/5 pt-2 text-[10.5px] leading-relaxed text-slate-350 space-y-1 font-sans"
                              >
                                <div><strong className="text-pink-400 font-mono font-semibold">{char.subtitle}:</strong> {char.detail}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-black/45 rounded-xl border border-white/5 leading-relaxed text-[10.5px] text-slate-400 font-sans text-left">
                  📌 <strong>Anclaje con ISO 19650-2:</strong> Asegura que los datos producidos sean coherentes, geolocalizables y comprensibles por todo el personal sin ambigüedades.
                </div>
              </div>

            </div>

            {/* Relación con la ISO 19650 y Flujo de Entrega */}
            <div className="bg-[#040a17]/50 border border-white/5 rounded-2xl p-5 text-left">
              <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block mb-1">ALINEACIÓN NORMATIVA</span>
              <h4 className="text-sm font-sans font-black text-white uppercase mb-3">La Clasificación como Pilar de Intercambio de Información (ISO 19650-2)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-mono font-bold text-white uppercase block border-b border-white/5 pb-1">WIP (Trabajo en Progreso)</h5>
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Los modeladores aplican clasificaciones nativas desde el inicio. Así se previene el descontrol de nombres subjetivos antes de transferir datos al CDE.
                  </p>
                </div>
                <div className="bg-black/40 border border-[#de1b7d]/10 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-mono font-bold text-pink-400 uppercase block border-b border-[#de1b7d]/5 pb-1">SHARED (Información Compartida)</h5>
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Al unificar modelos en la federación G2, se buscan interferencias filtrando por códigos únicos estandarizados en minutos en lugar de buscar manualmente.
                  </p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-mono font-bold text-white uppercase block border-b border-white/5 pb-1">PUBLISHED (Modelos de Entrega)</h5>
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    El mandante o contratista de obra recibe modelos listos para integrarlos directamente en motores de simulación de costos 5D o presupuestos estructurados.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ==================== TAB 2: ANALOGÍA VISUAL (ANIMALES) ==================== */
          <motion.div
            key="animal-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Introducción Contexto - Muy visual y simple */}
            <div className="bg-[#030712]/60 p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-4 text-left">
              <span className="text-3xl p-3 bg-[#38bdf8]/10 rounded-xl border border-[#38bdf8]/20 animate-pulse shrink-0">🦁🐾</span>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#38bdf8] font-black uppercase tracking-widest block">APRENDIZAJE INTUITIVO</span>
                <h4 className="text-sm font-mono font-black text-white uppercase">¿Cómo entender un Sistema de Clasificación? La Analogía Taxonómica del Reino Animal</h4>
                <p className="text-[11px] text-slate-450 font-sans leading-relaxed">
                  Para entender por qué se codifica un Muro en BIM, primero mira la naturaleza. Los biólogos no anotan &quot;felino salvaje grande con melena&quot;, sino que emplean una taxonomía jerárquica estricta que lo sitúa en un lugar inequívoco del planeta. ¡Explóralo a continuación de forma dinámica!
                </p>
              </div>
            </div>

            {/* Main Interactive Sandbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Visual Selector and active state card */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Animal Carousel/Selector */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3 text-left">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-bold">1. SELECCIONA UN ANIMAL DE ESTUDIO</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="btn-animal-lion"
                      onClick={() => setSelectedAnimal('lion')}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-1 ${
                        selectedAnimal === 'lion' ? 'bg-amber-500/15 border-amber-500/40 text-amber-250' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-bold font-sans">León Común</span>
                      <span className="text-xl">🦁</span>
                    </button>
                    <button
                      id="btn-animal-dolphin"
                      onClick={() => setSelectedAnimal('dolphin')}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-1 ${
                        selectedAnimal === 'dolphin' ? 'bg-sky-500/15 border-sky-500/40 text-sky-250' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-bold font-sans">Delfín de Mar</span>
                      <span className="text-xl">🐬</span>
                    </button>
                    <button
                      id="btn-animal-eagle"
                      onClick={() => setSelectedAnimal('eagle')}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-1 ${
                        selectedAnimal === 'eagle' ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-250' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-bold font-sans">Águila Real</span>
                      <span className="text-xl">🦅</span>
                    </button>
                    <button
                      id="btn-animal-chameleon"
                      onClick={() => setSelectedAnimal('chameleon')}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-1 ${
                        selectedAnimal === 'chameleon' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-250' : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-bold font-sans">Camaleón Escamoso</span>
                      <span className="text-xl">🦎</span>
                    </button>
                  </div>
                </div>

                {/* Highly visual central highlight item card */}
                <div className={`flex-1 p-5 rounded-2xl bg-gradient-to-br ${animalData[selectedAnimal].color} border ${animalData[selectedAnimal].borderCol} relative overflow-hidden flex flex-col justify-between text-left`}>
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-sans text-9xl font-black select-none pointer-events-none">
                    {animalData[selectedAnimal].emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{animalData[selectedAnimal].emoji}</span>
                      <div>
                        <h4 className="text-lg font-sans font-black text-white">{animalData[selectedAnimal].name}</h4>
                        <p className={`text-xs font-mono italic opacity-90 ${animalData[selectedAnimal].textAccent}`}>
                          {animalData[selectedAnimal].scientificName}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                      {animalData[selectedAnimal].funFact}
                    </p>
                  </div>

                  <div className="bg-black/55 p-3 rounded-xl border border-white/5 flex gap-2 items-start">
                    <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                    <span className="text-[10px] text-zinc-450 leading-relaxed font-sans">
                      <strong>Tip de aprendizaje:</strong> Observa cómo el nombre vulgar varía por región (León, Lion, Löwe), pero su taxonomía fija un lenguaje técnico global único idéntico en todos los continentes.
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Nesting Boxes Model (Very Visual) */}
              <div className="lg:col-span-7 bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono text-[#38bdf8] font-black uppercase tracking-widest block">JERARQUÍA COMPLETA</span>
                      <h4 className="text-xs font-sans font-extrabold text-white uppercase">Las 7 Cajas de la Taxonomía Natural</h4>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">Pasa el cursor (o presiona) para ver definición</span>
                  </div>

                  {/* Taxonomy Visual Nesting Loop */}
                  <div className="space-y-1.5 text-left">
                    {animalData[selectedAnimal].hierarchy.map((item, idx) => {
                      const isHovered = hoveredRank === item.rank;
                      return (
                        <div
                          key={item.rank}
                          onMouseEnter={() => setHoveredRank(item.rank)}
                          onMouseLeave={() => setHoveredRank(null)}
                          className={`p-2 rounded-lg border transition-all duration-200 cursor-help ${
                            isHovered 
                              ? `bg-white/[0.04] border-${selectedAnimal === 'lion' ? 'amber' : selectedAnimal === 'dolphin' ? 'sky' : selectedAnimal === 'eagle' ? 'yellow' : 'emerald'}-500/40 translate-x-1` 
                              : 'bg-black/30 border-white/[0.03]'
                          } flex align-center justify-between gap-4`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono font-bold text-zinc-500 w-12 text-right shrink-0">
                              {item.rank}:
                            </span>
                            <span className={`text-[11px] font-mono font-black tracking-wide ${
                              idx === 6 ? animalData[selectedAnimal].textAccent : 'text-slate-200'
                            }`}>
                              {item.value}
                            </span>
                          </div>

                          <div className="hidden sm:block text-[10px] text-slate-450 font-sans max-w-xs text-right truncate">
                            {item.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Context Information displaying active hierarchy node definition */}
                  <div className="min-h-[50px] bg-black/60 p-3 rounded-lg border border-white/5 text-[11px] text-slate-350 leading-relaxed font-sans text-left flex items-start gap-2">
                    <span className="text-base shrink-0">🔎</span>
                    <div>
                      {hoveredRank ? (
                        <>
                          <strong className="text-white uppercase font-mono text-[10px] block mb-0.5">
                            Categoría Taxonómica: {hoveredRank}
                          </strong>
                          {animalData[selectedAnimal].hierarchy.find(h => h.rank === hoveredRank)?.desc}
                        </>
                      ) : (
                        <span className="text-slate-500 italic block">
                          Pasa el cursor sobre cualquiera de los 7 estamentos jerárquicos de arriba para leer su significado biológico en tiempo real.
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Compare Tree - BIM vs Nature */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-[8px] font-mono text-zinc-550 uppercase tracking-widest block mb-2 text-center">EL PUENTE CONCEPTUAL HACIA LA CONSTRUCCIÓN</span>
                  <div className="grid grid-cols-2 gap-4 items-center font-sans">
                    <div className="bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 text-center text-[10.5px]">
                      <span className="block text-2xl mb-1">🦁 ➔ 🗂️</span>
                      <strong className="text-white block">Orden Taxonómico</strong>
                      <span className="text-slate-400 text-[9.5px]">Organismo vivo clasificado unívocamente</span>
                    </div>
                    <div className="bg-pink-500/5 p-2 rounded-lg border border-pink-500/10 text-center text-[10.5px]">
                      <span className="block text-2xl mb-1">🧱 ➔ 🔢</span>
                      <strong className="text-white block">Código OmniClass / Uniformat</strong>
                      <span className="text-slate-400 text-[9.5px]">Elemento de construcción ordenado en Base de Datos</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Box Pedagógico Común */}
      <div className="p-4 bg-pink-500/5 border border-pink-500/20 rounded text-left shadow-md">
        <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          GUÍA DE APRENDIZAJE EXPERIENCIAL (ISO 19650)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10.5px] leading-relaxed text-slate-300 font-sans">
          <div className="bg-black/25 p-3 rounded border border-white/[0.03]">
            <h5 className="font-bold text-pink-500 uppercase mb-1">EXPLORA LA ANALOGÍA ANIMAL</h5>
            <p>
              Te recomendamos alternar la vista con <strong>&quot;Ejemplo Visual: Animales&quot;</strong> antes de sumergirte en la codificación técnica de encofrados u otros elementos reales. Así comprenderás con total claridad el concepto de herencia jerárquica y categorización ordenada antes de profundizar en códigos complejos.
            </p>
          </div>
          <div className="bg-[#040c1c]/40 p-3 rounded border border-white/[0.03]">
            <h5 className="font-bold text-[#38bdf8] uppercase mb-1">ELEGIR EL ESTÁNDAR ADECUADO (ISO 19650-2)</h5>
            <p>
              Ten en cuenta que ningún estándar es obligatorio por sí solo: se define con el cliente al planear el BEP de cada obra. <strong>UniFormat</strong> te servirá para fases preliminares y de diseño esquemático, <strong>OmniClass</strong> para coordinar sistemas espaciales amplios de obra, y <strong>MasterFormat</strong> para vincular directamente presupuestos estructurados de construcción.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
