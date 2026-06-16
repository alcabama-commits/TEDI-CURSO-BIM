import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tag, Layers, ShieldCheck, HelpCircle, Lightbulb, 
  Search, ListCollapse, Compass, RefreshCw, Layers2,
  FileSpreadsheet, Sparkles, Network, CheckCircle2, ChevronRight, Info,
  Globe, Award, Bookmark, ArrowRight, Eye
} from 'lucide-react';

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
  
  // Animal taxonomy state
  const [selectedAnimal, setSelectedAnimal] = useState<'lion' | 'dolphin' | 'eagle' | 'chameleon'>('lion');
  const [hoveredRank, setHoveredRank] = useState<string | null>(null);

  // Custom states for interactive characteristics
  const [activeChar, setActiveChar] = useState<string>('estructurado');

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

              {/* Left Panel: Characteristics List */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="space-y-3 text-left">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-black block">
                    ATRIBUTOS CLAVE DEL SISTEMA (ISO 19650)
                  </span>

                  {/* Characteristics Clickable Buttons */}
                  <div className="space-y-2">
                    {characteristics.map((char) => {
                      const isSelected = activeChar === char.id;
                      return (
                        <button
                          key={char.id}
                          id={`btn-char-${char.id}`}
                          onClick={() => setActiveChar(char.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? 'border-pink-500/35 bg-pink-500/[0.04] shadow-[0_0_15px_rgba(236,72,153,0.05)]' 
                              : 'border-white/5 bg-black/25 hover:bg-white/5'
                          }`}
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
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-black/45 rounded-xl border border-white/5 leading-relaxed text-[10.5px] text-slate-400 font-sans text-left">
                  📌 <strong>Anclaje con ISO 19650-2:</strong> Asegura que los datos producidos sean coherentes, geolocalizables y comprensibles por todo el personal sin ambigüedades.
                </div>
              </div>

              {/* Right Panel: Immersive Deep-Dive Card */}
              <div className="lg:col-span-7 bg-[#040a17]/70 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden text-left">
                <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>

                {characteristics.filter(c => c.id === activeChar).map((char) => (
                  <div key={char.id} className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono text-pink-400 font-black uppercase tracking-widest block">
                          DETALLE DEL ATRIBUTO BIM
                        </span>
                        <h3 className="text-lg font-mono font-black text-white uppercase tracking-tight">
                          {char.title} – {char.subtitle}
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold">
                        {char.badge}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {char.desc}
                      </p>
                      
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg text-xs leading-relaxed text-slate-350 font-sans">
                        <strong className="text-pink-400 font-semibold">{char.subtitle}: </strong>
                        {char.detail}
                      </div>
                    </div>

                    {/* Highly aesthetic live data schema simulator based on activeChar */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Representación en la Estructura de Datos (IFC / Revit):
                      </span>
                      <div className="bg-black/75 p-4 rounded-xl border border-white/5 font-mono text-[10px] leading-relaxed overflow-x-auto text-pink-300">
                        {char.id === 'estructurado' && (
                          <div className="space-y-1">
                            <div className="text-zinc-500">// IFCClassificationReference (Jerarquía de Árbol)</div>
                            <div>IFCClassificationReference:</div>
                            <div className="pl-4 text-slate-400">├── Name: <span className="text-pink-400">"OmniClass Tabla 21"</span></div>
                            <div className="pl-4 text-slate-400">├── Location: <span className="text-pink-400">"http://www.omniclass.org"</span></div>
                            <div className="pl-4 text-slate-400">└── Referencia_Padre:</div>
                            <div className="pl-8 text-sky-400">└── IFCClassification (Nivel Superior)</div>
                            <div className="pl-12 text-slate-500">├── Name: "Elements"</div>
                            <div className="pl-12 text-slate-500">└── Edition: "2.1"</div>
                          </div>
                        )}
                        {char.id === 'consistente' && (
                          <div className="space-y-1">
                            <div className="text-zinc-500">// Parámetros Compartidos Uniformes (GUID Único)</div>
                            <div>SharedParameter (GUID: <span className="text-zinc-450 font-sans font-bold">8fa7b21a-32fb-44d5-8962-e67c82300b9c</span>):</div>
                            <div className="pl-4 text-slate-400">├── Nombre_Parámetro: <span className="text-pink-400">"Classification_Code"</span></div>
                            <div className="pl-4 text-slate-400">├── Tipo_De_Datos: <span className="text-sky-400">"Text"</span></div>
                            <div className="pl-4 text-slate-400">├── Disciplina: "Common"</div>
                            <div className="pl-4 text-slate-400">└── Valor_Asignado: <span className="text-emerald-400 font-bold">"21-02 10 20" (Muro Exterior)</span></div>
                          </div>
                        )}
                        {char.id === 'escalable' && (
                          <div className="space-y-1">
                            <div className="text-zinc-550">// Soporte de Nuevos Materiales Ecológicos</div>
                            <div>Extensión_De_Nodos_BIM:</div>
                            <div className="pl-4 text-slate-400">├── Clase_Base: <span className="text-zinc-500 font-semibold">"B2015 - Revestimiento Fachada"</span></div>
                            <div className="pl-4 text-slate-400">└── Extensión_Subclase:</div>
                            <div className="pl-8 text-pink-400">└── "B2015.35 - Pintura Fotovoltaica" <span className="text-emerald-400 font-extrabold text-[8.5px] uppercase bg-emerald-500/10 px-1 py-0.5 rounded text-right tracking-widest">// NUEVA</span></div>
                            <div className="pl-12 text-slate-500">└── Propiedad: "Tasa_Generación_Solar = 45 W/m²"</div>
                          </div>
                        )}
                        {char.id === 'interoperable' && (
                          <div className="space-y-1">
                            <div className="text-zinc-500">// Mapeo IFC Neutro de Intercambio OpenBIM</div>
                            <div>Archivo_Intercambio_IFC4:</div>
                            <div className="text-slate-350">#4281 = IFCCLASSIFICATIONREFERENCE(</div>
                            <div className="pl-6 text-slate-400">'https://standards.buildingsmart.org',</div>
                            <div className="pl-6 text-emerald-400">'Ss_25_10_30', <span className="text-zinc-550">// Código de Sistema</span></div>
                            <div className="pl-6 text-pink-400">'External wall systems',</div>
                            <div className="pl-6 text-slate-400">#105 <span className="text-zinc-550">// Relación de Referencia</span></div>
                            <div className="text-slate-350">);</div>
                          </div>
                        )}
                        {char.id === 'trazable' && (
                          <div className="space-y-1">
                            <div className="text-zinc-500">// Registro del Ciclo de Vida Completo</div>
                            <div>Registro_Trazabilidad:</div>
                            <div className="pl-4 text-slate-450">├── Fase 1 (Diseño): <span className="text-slate-300">"Revit ID 10842"</span></div>
                            <div className="pl-4 text-slate-450">├── Fase 2 (Costos): <span className="text-slate-300">"Partida MasterFormat Division 03"</span></div>
                            <div className="pl-4 text-slate-450">├── Fase 3 (Obra): <span className="text-slate-300">"Código QR en Terreno"</span></div>
                            <div className="pl-4 text-slate-450">└── Fase 4 (Operaciones): <span className="text-emerald-400">"Asociado a Plan de Mantención Anual"</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-550 font-mono">
                  <span>Atributo de Datos Activo ({activeChar.toUpperCase()})</span>
                  <span className="text-pink-400 font-bold uppercase tracking-widest">Interoperabilidad Garantizada</span>
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
