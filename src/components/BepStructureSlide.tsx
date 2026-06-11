import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, FileText, CheckCircle2, Database, 
  Layers, AlertOctagon, ChevronRight, Network, HardHat, 
  Cpu, Lock, CheckSquare, BadgeInfo
} from 'lucide-react';

// --- Data Types ---
interface Highlight {
  label: string;
  text: string;
}

interface Chapter {
  number: string;
  title: string;
  summary: string;
  
  // Guía Metodológica / Requisitos Normativos
  guiaExplicacion: string;
  guiaPuntos: string[];
  
  // Ejemplo Real de Aplicación (Torres del Horizonte)
  ejemploExplicacion: string;
  ejemploDetalles: Highlight[];
}

interface BlockData {
  id: "I" | "II" | "III" | "IV";
  title: string;
  subtitle: string;
  colorClass: string;
  bgLightClass: string;
  borderColorClass: string;
  accentColor: string;
  icon: any;
  chapters: Chapter[];
}

const MASTER_BEP_DATA: BlockData[] = [
  {
    id: "I",
    title: "Bloque I: Información del Proyecto y Objetivos",
    subtitle: "Alineamiento Contractual y Metas de Información",
    colorClass: "text-[#14b8a6]",
    bgLightClass: "bg-[#14b8a6]/5",
    borderColorClass: "border-[#14b8a6]/25",
    accentColor: "#14b8a6",
    icon: Database,
    chapters: [
      {
        number: "1",
        title: "Información General del Proyecto",
        summary: "Identificación física, linderos exactos, personería jurídica de intervinientes y metas de plazos de Torres del Horizonte.",
        guiaExplicacion: "La norma ISO 19650 requiere que el BEP identifique de forma inequívoca el activo (física y legalmente), su propósito general, su geolocalización geográfica exacta mediante linderos y coordenadas reales, los hitos del cronograma contractual de mayor rango, así como los directores y firmas responsables, fijando los límites legales de la información entregada.",
        guiaPuntos: [
          "Identificación física unívoca del proyecto, terreno y geolocalización.",
          "Identificación legal completa de los participantes principales (Adjudicador, Adjudicatarios clave y sus directores).",
          "Hitos de plazo del contrato de diseño/obra y jerarquía de validez del modelo."
        ],
        ejemploExplicacion: "Implementación formal y específica aprobada contractualmente para el proyecto residencial Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Nombre del Proyecto", text: "Torres del Horizonte." },
          { label: "Descripción y Alcance", text: "Proyecto residencial de mediana escala que consta de dos (2) torres de 15 pisos cada una, un sótano de parqueaderos común y una zona social (piscina y salón comunal). Área total construida aproximada: 14,500 m²." },
          { label: "Dirección y Ubicación", text: "Avenida Carrera 86 # 43 - 51 Sur, Localidad de Kennedy, Bogotá D.C., Colombia. Código Postal: 110821. (Lote urbano plano con un área de terreno de 3,200 m²)." },
          { label: "Adjudicador (Cliente)", text: "Inmobiliaria & Constructora Horizonte S.A. (Representado por Carlos Mendoza, Director de Proyectos)." },
          { label: "Adjudicatario Principal de Diseño y Coordinación", text: "Consorcio \"Diseño Inteligente\" (Liderado por la Arq. Julia Restrepo)." },
          { label: "Adjudicatario Principal de Construcción y Obra", text: "Equipo de Campo Horizonte (Dirigido por el Ing. Luis Fernando Tobón)." },
          { label: "Datos Contractuales Clave", text: "Plazo perentorio de desarrollo de diseños de tres (3) meses calendario. Presupuesto asignado para la implementación tecnológica, entorno de datos (CDE) y soporte: USD $5,000." },
          { label: "Prioridad y Validez Legal", text: "Planos en formato PDF firmados digitalmente, validados únicamente si provienen de modelos coordinados y aprobados en el CDE institucional." }
        ]
      },
      {
        number: "2",
        title: "Objetivo y Usos BIM Soportados",
        summary: "Determinación de los alcances operacionales reales con base en la viabilidad técnica y presupuestal.",
        guiaExplicacion: "Define formalmente cuáles Usos BIM generarán un beneficio comercial directo para las decisiones del proyecto. Cada uso adoptado debe ser técnicamente viable y estar respaldado por la infraestructura real, excluyendo formalmente los que superen la capacidad definida.",
        guiaPuntos: [
          "Definir el propósito de cada uso y su impacto en la toma de decisiones.",
          "Establecer la viabilidad computacional y financiera (presupuesto tecnológico).",
          "Excluir formalmente los Usos BIM que no se implementarán para evitar falsas expectativas contractuales."
        ],
        ejemploExplicacion: "Configuración de usos BIM aprobados para Torres del Horizonte, adaptados al presupuesto de USD $5,000:",
        ejemploDetalles: [
          { label: "Uso 1: Coordinación 3D", text: "Mandatorio para Arquitectura, Estructuras e MEP antes de la ejecución física, con el fin de resolver colisiones espaciales en la losa de sótanos y apartamentos tipo." },
          { label: "Uso 2: Extracción 5D", text: "Vinculación directa de elementos tridimensionales con la base de datos de costos de Horizonte para agilizar cubicaciones automáticas y desterrar la medición manual." },
          { label: "Uso 3: Gestión de Activos (AIM)", text: "Carga final de parámetros lógicos para mantenimiento y postventas durante la entrega al propietario." },
          { label: "Exclusión Técnica Declarada", text: "Se excluye Planificación 4D avanzada (Gantt enlazado) y Simulaciones Energéticas 6D debido a restricciones operativas de hardware en campamento." }
        ]
      },
      {
        number: "4",
        title: "Requisitos de Información (Inbound)",
        summary: "Traducción de mandatos estratégicos de Horizonte en requisitos técnicos de entrada.",
        guiaExplicacion: "Especifica la cascada de requisitos de información que el cliente define para resolver necesidades de negocio de mayor jerarquía. Traduce metas corporativas en reglas y metadatos concretos solicitados a los proveedores.",
        guiaPuntos: [
          "OIR (Requisitos de la Organización): Metas corporativas de rentabilidad y calidad que justifican la tecnología.",
          "PIR (Requisitos del Proyecto): Hitos espaciales de diseño indispensables durante el transcurso del desarrollo.",
          "AIR (Requisitos del Activo): Metadatos mandatorios y de mantenimiento que deben portar los objetos al fin del ciclo."
        ],
        ejemploExplicacion: "Requisitos unificados formulados por Horizonte para los diseñadores coordinados por Consorcio \"Diseño Inteligente\":",
        ejemploDetalles: [
          { label: "OIR (Organizational)", text: "Reducir un 20% reclamaciones de postventa por desajustes geométricos o fallas de instalaciones sanitarias." },
          { label: "PIR (Project)", text: "Validar compatibilidad geométrica total entre concreto e instalaciones de desagüe de sótanos antes del vaciado para evitar sobrecostos por picado de obra." },
          { label: "AIR (Asset Information)", text: "Carga obligatoria de metadatos de garantía para equipos MEP: [Código_Activo], [Fecha_Instalación], [Garantía_Proveedor]." },
          { label: "EIR (Exchange Requirements)", text: "Entrega obligada en formatos neutrales estándar IFC y nativos .RVT limpios en el CDE institucional quincenalmente." }
        ]
      }
    ]
  },
  {
    id: "II",
    title: "Bloque II: Métodos y Procedimientos de Gestión",
    subtitle: "Control Metodológico, Flujos y Entorno Común de Datos (CDE)",
    colorClass: "text-[#38bdf8]",
    bgLightClass: "bg-[#38bdf8]/5",
    borderColorClass: "border-[#38bdf8]/25",
    accentColor: "#38bdf8",
    icon: Network,
    chapters: [
      {
        number: "6",
        title: "Entorno Común de Datos (CDE)",
        summary: "Plataforma central y flujos lógicos de estados informativos para controlar la verdad documental.",
        guiaExplicacion: "El CDE es el único espacio aprobado para compartir datos. La ISO 19650 exige mantener la trazabilidad rigurosa de los archivos controlando su transición por 4 fases principales para erradicar planos obsoletos o duplicados en obra.",
        guiaPuntos: [
          "WIP (Trabajo en Progreso): Espacio privado de producción de cada disciplina antes de compatibilizarse.",
          "SHARED (Compartido): Modelos coordinados para revisiones interdisciplinares quincenales.",
          "PUBLISHED (Publicado): Formatos contractuales firmados y validados para ejecutar en obra.",
          "ARCHIVED (Archivado): Historial inmutable para revisiones y auditorías legales."
        ],
        ejemploExplicacion: "Operación de la nube del CDE institucional para Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Infraestructura elegida", text: "Servidor provisto por la constructora con visor ligero accesible desde cualquier navegador comercial o tableta." },
          { label: "Validación Interna", text: "Ningún modelo de Diana, Mateo o Camilo pasa a SHARED sin la autorización previa del líder de su respectiva firma." },
          { label: "Firma Digital Legal", text: "Ningún archivo pasa a PUBLISHED sin la validación visual y aprobación digital de Andrés Silva (Coordinador BIM Horizonte)." }
        ]
      },
      {
        number: "12",
        title: "Plan de Comunicación Integrado",
        summary: "Frecuencia de reuniones de resolución conjunta de interferencias y canales virtuales.",
        guiaExplicacion: "Normaliza los canales oficiales donde se aprueban cambios de diseño, eliminando la dispersión. Define la cadencia de reuniones de Ingeniería Concurrente Integrada (ICE) con modelación síncrona.",
        guiaPuntos: [
          "Cadencia formal de convocatorias virtuales y comités presenciales técnicos.",
          "Centralización unificada de revisiones en la plataforma común de datos.",
          "Establecimiento del flujo de reporte quincenal para priorizar correcciones de fallas."
        ],
        ejemploExplicacion: "Canales regulados para el flujo de diseño de Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Sesiones ICE", text: "Reuniones de Ingeniería Concurrente Integrada virtuales cada 15 días con federación de modelos síncrona para solventar interferencias graves." },
          { label: "Exclusividad del Canal", text: "Prohibida de forma tajante la discusión técnica de cambios por correo electrónico o WhatsApp. Todo comentario debe crearse y trazarse directamente en el CDE." },
          { label: "Plan quincenal", text: "Envío formal de reportes de detección de colisiones Navisworks el lunes previo a cada reunión ICE quincenal." }
        ]
      },
      {
        number: "13",
        title: "Seguridad y Gestión de la Información",
        summary: "Control estricto de accesos de usuario, almacenamiento redundante y validación de autenticidad.",
        guiaExplicacion: "Protege las bases de datos tridimensionales contra pérdidas, virus informáticos o modificaciones de autoría sin certificar. Controla quién puede ver, editar o eliminar modelos en cada carpeta del CDE.",
        guiaPuntos: [
          "Matriz formal de roles y permisos de acceso para las carpetas operativas del CDE COLD.",
          "Rutinas sistemáticas de copia de seguridad periódicas redundantes.",
          "Validación criptográfica de planos que certifique su procedencia directa del modelo en estado PUBLISHED."
        ],
        ejemploExplicacion: "Seguridad aplicada en la colaboración técnica de Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Gestión de Permisos", text: "Visualizador básico: Carlos Mendoza (Cliente, Inmobiliaria Horizonte) e Ing. Luis Fernando (Obra). Redactor/Editor: Diana, Mateo y Camilo (Consorcio). Administrador total: Andrés Silva." },
          { label: "Política de Respaldo", text: "Backup automatizado diario en la nube de la constructora. Trabajos intermedios locales en las oficinas del Consorcio son de su entera responsabilidad." },
          { label: "Identificador Único SHA-256", text: "Todo PDF impreso o en pantalla en el campamento de obra carece de validez técnica si no cuenta con el ID y firma criptográfica que confirme que proviene del CDE en estado PUBLISHED." }
        ]
      }
    ]
  },
  {
    id: "III",
    title: "Bloque III: Métodos de Producción de Información",
    subtitle: "Reglas de Modelado, Estándares de Coordenadas y Matrices de Coordinación",
    colorClass: "text-[#ec4899]",
    bgLightClass: "bg-[#ec4899]/5",
    borderColorClass: "border-[#ec4899]/25",
    accentColor: "#ec4899",
    icon: Layers,
    chapters: [
      {
        number: "5",
        title: "Estrategia de Producción de Información",
        summary: "Reglas constructivas de modelación, federación lógica y matrices LOIN.",
        guiaExplicacion: "Pauta las instrucciones físicas de modelación para que los objetos tridimensionales respeten la lógica real de construcción física. Determina la partición en sub-arquitecturas livianas para evitar colapso de hardware.",
        guiaPuntos: [
          "Representación tridimensional que siga la física del proceso de construcción real.",
          "División modular lógica (Federación) para posibilitar compatibilización ligera.",
          "Uso inteligente del Nivel de Necesidad de Información (LOIN) sopesando geometría vs datos útiles."
        ],
        ejemploExplicacion: "Reglas de modelación vigentes en el proyecto residencial Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Modelado Real de Componentes", text: "Prohibido modelar columnas o muros estructurales como elementos verticales continuos de 15 niveles. Segmentación obligatoria losa por losa para permitir metrados 5D de concreto perfectos." },
          { label: "Modelos Federados Oficiales", text: "Esquema unificado en tres sub-modelos ligados por coordenadas georeferenciadas: Modelo_ARQ (Diana), Modelo_EST (Mateo) y Modelo_MEP (Camilo)." },
          { label: "Matrices de Detalle LOIN", text: "LOD 300 geométrico para estructuras combinado con LOI parametrizado para activos de postventa de Horizonte; familias ligeras libres de mallas poligonales inútiles." }
        ]
      },
      {
        number: "7",
        title: "Convenciones y Estándares Técnicos",
        summary: "Marcado internacional/regional de archivos, capas CAD, representación gráfica e indexación de metadatos.",
        guiaExplicacion: "La unificación formal de la información técnica del proyecto exige la aplicación coordinada de marcos internacionales y normativas regionales de dibujo y representación. De esta manera, se definen procesos de nomenclatura unificada, control de metadatos estricto de archivos en CDE (ISO 19650, 15489, 23081), modelamiento computacional (ISO 12911), codificación de capas vectoriales (ISO 13567) y dibujo físico (ISO 128).",
        guiaPuntos: [
          "Estándares ISO de Información: ISO 19650 (CDE), ISO 15489 (Archivo documental) e ISO 23081 (Metadatos unificados).",
          "Estándares ISO Gráficos y Técnicos: ISO 128 (Dibujo técnico), ISO 13567 (Capas CAD/BIM) e ISO 12911 (Procesos de modelado).",
          "Alineamiento de Reglamentos Locales: Cartilla CPNAA (Colombia), SENCICO (Perú), NCh (Chile), NMX (México) y National CAD Standard (USA)."
        ],
        ejemploExplicacion: "Nomenclatura integrada bajo estándares internacionales y regionales vigentes para Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Gestión de Información (ISO)", text: "Uso combinado de ISO 19650 para estados del CDE, ISO 15489 para la retención y disponibilidad de archivos, e ISO 23081 para los metadatos de autoría, versión e idioma." },
          { label: "Coordinación Gráfica (ISO)", text: "Implementación de ISO 128 en la representación de vistas/secciones, e ISO 13567 para el código y color de capas en coordinaciones CAD." },
          { label: "Normativa Regional de Dibujo", text: "Adecuación según entrega a la Cartilla CPNAA colombiana, Manual de Representación SENCICO peruano, normas chilenas NCh, y NMX de dibujo técnico en México." },
          { label: "Georreferenciación y Escala", text: "Anclaje absoluto al mojón topográfico verificado en Kennedy, Bogotá. Proyección bajo el sistema métrico internacional y National CAD Standard regulado." }
        ]
      },
      {
        number: "8",
        title: "Estrategia de Coordinación y Tolerancias",
        summary: "Definición del rango de holguras aceptables en revisiones y protocolos de informe de colisiones.",
        guiaExplicacion: "Especifica los rangos de tolerancia de interferencias físicas antes de catalogarlas como colisiones que requieran junta ICE. Libera el software de reportar falsos positivos de colisión que dilaten la obra.",
        guiaPuntos: [
          "Calibración de la holgura geométrica aceptable por cruces de ingenierías.",
          "Filtrado manual de colisiones constructivas empotradas de fábrica.",
          "Uso de protocolos estandarizados ágiles para comunicarse con el diseñador responsable."
        ],
        ejemploExplicacion: "Límites definidos para análisis de interferencias Navisworks en Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Estructura contra Estructura", text: "0 mm de tolerancia. No se toleran cruces imprevistos de ingeniería civil." },
          { label: "Arquitectura contra Estructura", text: "15 mm de tolerancia permitida por recubrimientos y tarrajeos de muros." },
          { label: "Filtros de Exclusión aprobados", text: "Conductos eléctricos empotrados embebidos en el concreto de losa de fábrica en Kennedy no se marcan como fallas en interferencias." },
          { label: "Estándar BIM BCF", text: "Sincronización mandatoria mediante BIM Collaboration Format (BCF) para evitar correos con imágenes sueltas de Navisworks." }
        ]
      },
      {
        number: "11",
        title: "Control de Calidad (Salud del Modelo)",
        summary: "Verificaciones periódicas de integridad lógica, objetos clonados y desconexiones de ingeniería.",
        guiaExplicacion: "Establece los requisitos mínimos de salud lógica que debe poseer toda base de datos gráfica antes de considerarse información oficial. Previene errores críticos que distorsionen presupuestos o impidan dimensionamientos.",
        guiaPuntos: [
          "Detección y eliminación completa de elementos solapados espacialmente que dupliquen cantidades.",
          "Trazabilidad y conectividad física en las uniones de redes de fluidos sanitarios e instalaciones.",
          "Inspección periódica del visor de advertencias del sistema modelador."
        ],
        ejemploExplicacion: "Métricas de auditoría y rechazo automático aplicadas en Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Duplicidad de Objetos", text: "0% de tolerancia. Cualquier elemento duplicado (vigal colindante duplicada) causa el rechazo inmediato del modelo del Consorcio por daño en el presupuesto 5D." },
          { label: "Conectividad de Redes", text: "Cero tolerancia a colectores desconectados de desagüe o bajantes sanitarios flotando en aire en sótanos." },
          { label: "Mantenimiento Preventivo", text: "Andrés Silva ejecutará semanalmente scripts de revisión interna en Revit para purgar familias obsoletas de terceras marcas y mantener archivos ligeros." }
        ]
      }
    ]
  },
  {
    id: "IV",
    title: "Bloque IV: Recursos, Responsabilidades y Tecnología",
    subtitle: "Mapeo Organizacional, Entregables Tecnológicos y Anexos Contractuales",
    colorClass: "text-[#fbbf24]",
    bgLightClass: "bg-[#fbbf24]/5",
    borderColorClass: "border-[#fbbf24]/25",
    accentColor: "#fbbf24",
    icon: HardHat,
    chapters: [
      {
        number: "3",
        title: "Organización y Responsabilidades (ISO 19650)",
        summary: "Estructura de gobernanza contractual y matriz RACI de delegación metodológica.",
        guiaExplicacion: "Organiza de forma clara quién decide, quién modela, quién audita y quién construye. Divide la cadena en niveles precisos según ISO 19650 garantizando canales técnicos directos.",
        guiaPuntos: [
          "Estructura jerárquica del proyecto con nombres reales y correos unificados.",
          "Delimitación operativa del nivel A (Adjudicador), nivel B (Principal), nivel C (Tareas).",
          "Matriz RACI formalizada por entregable."
        ],
        ejemploExplicacion: "Consorcio unificado y equipo humano responsable de Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Adjudicador Responsable (Parte A)", text: "Andrés Silva (Coordinador BIM Horizonte, líder administrador de la plataforma común)." },
          { label: "Adjudicatario de Coordinación de Diseño (B1)", text: "Consorcio 'Diseño Inteligente' con Arq. Julia Restrepo liderando el modelado unificado del proyecto." },
          { label: "Adjudicatario de Construcción (B2)", text: "Equipo de Campo Horizonte bajo el liderazgo del Director de Obra Ing. Luis Fernando Tobón." },
          { label: "Equipos de Tarea Especializada (Parte C)", text: "C1.1: Diana y Mateo (Modelado Arquitectura). C1.2: Camilo e Ing. Roberto Gómez (Estructura y Redes de fluidos)." }
        ]
      },
      {
        number: "9",
        title: "Entregables del Contrato BIM",
        summary: "Formatos oficiales de bases de datos, planos y reportes que amarran los hitos de pago del contrato.",
        guiaExplicacion: "Determina de forma legal qué constituye una 'entrega'. Amarra la validez documentaría a formatos nativos, formatos interoperables e informes sin los cuales los hitos financieros no pueden tramitarse.",
        guiaPuntos: [
          "Definición obligatoria de formatos abiertos neutrales (ej. IFC, BCF) y nativos específicos (ej. RVT).",
          "Planos de obra exportados de forma directa de las vistas oficiales del modelo tridimensional coordinado.",
          "Cronograma formalizado de hitos de entrega."
        ],
        ejemploExplicacion: "Matriz contractual de entregas coordinadas firmada para Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Formatos Oficiales", text: "Archivos nativos de Revit (.RVT versión 2026), archivos de coordinación ligera .IFC4 y reportes de incidencias BCF." },
          { label: "Exclusividad Gráfica", text: "Toda la de planos PDF de Kennedy de construcción debe provenir de las vistas del modelo aprobado. Prohibido el dibujo en CAD desconectado." },
          { label: "Listado de Activos", text: "Excel estructurado compatible con los parámetros del AIR cargado para el departamento de postventas." },
          { label: "Hitos Calendarizados", text: "Ciclos formales quincenales de coordinación, con hito de entrega del modelo preliminar al Día 30, modelo coordinado al Día 60 y as-built final al Día 90." }
        ]
      },
      {
        number: "10",
        title: "Tecnología e Infraestructura",
        summary: "Plataformas de software obligatorias y directrices de simplificación computacional.",
        guiaExplicacion: "Garantiza la compatibilidad informática total entre subcontratistas. Determina las plantillas y versiones oficiales, evitando corrupciones de datos, y optimiza los archivos para hardware modesto campamental.",
        guiaPuntos: [
          "Homologar software de diseño y versiones para eliminar problemas de actualización imprevista.",
          "Estándar OpenBIM interoperable habilitador del CDE corporativo.",
          "Pautas de simplificación volumétrica de familias para notebooks de obra."
        ],
        ejemploExplicacion: "Fórmula de soporte informático de Torres del Horizonte con presupuesto de USD $5,000:",
        ejemploDetalles: [
          { label: "Versión Homologada", text: "Uso exclusivo de Revit 2026 y Navisworks 2026. Prohibido subir o actualizar modelos centrales a versiones beta o superiores." },
          { label: "Interoperabilidad Abierta", text: "Esquema IFC4 oficial habilitado para contratistas que utilicen otras arquitecturas computacionales o visores portátiles." },
          { label: "Optimización de Hardware", text: "Regla de peso máximo de familias. Los elementos de Diana, Mateo y Camilo deben estar optimizados para operar sin bloqueos en los notebooks Core i3 estándar del campamento de obra." }
        ]
      },
      {
        number: "14",
        title: "Anexos Contractuales Operativos",
        summary: "Matriz RACI firmada, planes de entregas formalizados en contratos de sub-diseño.",
        guiaExplicacion: "Los anexos componen la base de cumplimiento legal y las firmas que comprometen formalmente a los subcontratistas. Soportan la exigibilidad de coordinación bajo el amparo de la legislación civil ordinaria.",
        guiaPuntos: [
          "Matriz RACI extendida y anexa firmada físicamente o con certificado digital.",
          "Punto Base y sistema geodésico topográfico amarrado a contrato de linderos.",
          "Alineamiento formal de los tiempos técnicos del BEP con los comités financieros de desembolso bancario."
        ],
        ejemploExplicacion: "Soportes legales adjuntados al contrato principal de Torres del Horizonte:",
        ejemploDetalles: [
          { label: "Matriz RACI Firmada", text: "Consignada formalmente por el Consorcio 'Diseño Inteligente' e Inmobiliaria Horizonte S.A. al cerrar la licitación." },
          { label: "Coordinación Fiduciaria", text: "Plan de hitos de modelación quincenal alineado con los informes de liberación del fideicomiso constructor de Torres del Horizonte." }
        ]
      }
    ]
  }
];

export interface AcronymItem {
  sigla: string;
  significado: string;
  descripcion: string;
}

export interface StandardRef {
  id: string;
  name: string;
  category: string;
  concept: string;
  patternLabel: string;
  patternDesc: string;
  sampleGenerator: (disc: string, zone: string, user: string) => string;
  metadata: Record<string, string>;
  acronymsResolver: (disc: string, zone: string, user: string) => AcronymItem[];
}

export const STANDARDS_REFERENCE_DATA: StandardRef[] = [
  {
    id: "ISO-19650",
    name: "ISO 19650: Gestión de Información (BIM)",
    category: "Internacional",
    concept: "Marco regulatorio para la gestión de la información en proyectos de construcción (Entornos de Datos Comunes - CDE).",
    patternLabel: "Nomenclatura de Archivos en CDE",
    patternDesc: "Define campos fijos con guiones regulando el ciclo informativo del contenedor de datos.",
    sampleGenerator: (disc, zone, user) => `THOR-DIS-${disc}-${zone}-M3-0001.rvt`,
    metadata: {
      "Estado CDE": "SHARED (02_SHARE)",
      "Revisión": "P01.02",
      "Clasificación": "Uniclass 2015 Co_45",
      "Inmutable": "Garantizado en Entorno Común"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "THOR", significado: "Código de Proyecto", descripcion: "Torres del Horizonte (Identificador global único del desarrollo)." },
      { sigla: "DIS", significado: "Creador / Originador", descripcion: "Consorcio Diseño Inteligente (Agencia técnica autora y modeladora)." },
      { sigla: disc, significado: "Disciplina Técnica", descripcion: disc === "ARQ" ? "Arquitectura (Estilo, volumetría y distribución espacial)." : disc === "EST" ? "Estructura (Cálculos de resistencia civil y cimientos)." : "Redes de Fluidos y MEP (Sistemas sanitarios, eléctricos e hidráulicos)." },
      { sigla: zone, significado: "Zona / Sector", descripcion: zone === "T1" ? "Torre 1 (Primer bloque residencial de apartamentos)." : zone === "T2" ? "Torre 2 (Segundo bloque residencial de apartamentos)." : "Sótano Común (Área de parqueaderos, tanques y subestación)." },
      { sigla: "M3", significado: "Nivel de Modelado", descripcion: "Descriptor de nivel federado tridimensional y altura del activo." },
      { sigla: "0001", significado: "Número Secuencial", descripcion: "Código incremental correlativo único que evita duplicidades." },
      { sigla: ".rvt", significado: "Formato / Extensión", descripcion: "Extensión del software Autodesk Revit de diseño paramétrico multidimensional." }
    ]
  },
  {
    id: "ISO-15489",
    name: "ISO 15489: Gestión de Documentos de Archivo",
    category: "Internacional",
    concept: "Establece principios internacionales para la gestión, seguridad y disponibilidad de archivos físicos o electrónicos.",
    patternLabel: "Marcado de Registro Archivístico",
    patternDesc: "Estructura la retención y control de procedencia de los contenedores de datos del proyecto.",
    sampleGenerator: (disc, zone, user) => `ARC-THOR-2026-${disc}-${zone}-ID990`,
    metadata: {
      "Tiempo de Retención": "10 Años mínimo",
      "Clase de Acceso": "Restringido (Nivel 2)",
      "Responsable Custodia": "Consorcio Diseño Inteligente",
      "Gobernanza": "Sistemático & Seguro"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "ARC", significado: "Identificador de Archivo", descripcion: "Acrónimo de 'Archive' que delimita un contenedor inmutable de retención histórica." },
      { sigla: "THOR", significado: "Código de Proyecto", descripcion: "Torres del Horizonte (Identificador oficial del activo)." },
      { sigla: "2026", significado: "Año de Registro", descripcion: "Período fiscal en el que se indiza y resguarda la documentación." },
      { sigla: disc, significado: "Disciplina Técnica", descripcion: disc === "ARQ" ? "Especialidad de Arquitectura." : disc === "EST" ? "Especialidad de Estructura." : "Especialidad de Redes de Fluidos/MEP." },
      { sigla: zone, significado: "Ubicación Espacial", descripcion: zone === "T1" ? "Ubicación asociada a Torre 1." : zone === "T2" ? "Ubicación asociada a Torre 2." : "Ubicación asociada al Sótano General." },
      { sigla: "ID990", significado: "ID de Trazabilidad Col", descripcion: "Identificador de indexación exclusivo para control institucional." }
    ]
  },
  {
    id: "ISO-23081",
    name: "ISO 23081: Metadatos para Documentos",
    category: "Internacional",
    concept: "Regula la creación, gestión y uniformidad de metadatos garantizando la indización y etiquetado sistemático.",
    patternLabel: "Código XML de Metadatos",
    patternDesc: "Proporciona campos unificados descriptores del origen, autor, fecha e idioma del archivo.",
    sampleGenerator: (disc, zone, user) => `THOR-${disc}-${zone}-METADATA-ISO23081.xml`,
    metadata: {
      "Esquema Núcleo": "Dublin Core (ISO 15836)",
      "Codificación Idioma": "ISO 639-2 (Español)",
      "Fecha Creación": "2026-06-04",
      "Proveedor": "Inmobiliaria Horizonte S.A."
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "THOR", significado: "Código de Proyecto", descripcion: "Torres del Horizonte (Emprendimiento constructivo)." },
      { sigla: disc, significado: "Disciplina Técnica", descripcion: disc === "ARQ" ? "Arquitectura residencial." : disc === "EST" ? "Ingeniería Estructural." : "Ingeniería de Instalaciones MEP." },
      { sigla: zone, significado: "Zona / Sector", descripcion: zone === "T1" ? "Torre 1" : zone === "T2" ? "Torre 2" : "Sótano Común" },
      { sigla: "METADATA", significado: "Función de Archivos", descripcion: "Indica que es un descriptor estructurado de metadatos del sistema electrónico." },
      { sigla: "ISO23081", significado: "Alineación de Estándar", descripcion: "Denominación del esquema de metadatos regulado internacionalmente." },
      { sigla: ".xml", significado: "Formato Extensible", descripcion: "Extensión portátil autocontenida legible e indexable por procesadores del CDE." }
    ]
  },
  {
    id: "ISO-128",
    name: "ISO 128: Representación Gráfica de Planos",
    category: "Internacional",
    concept: "Estándar internacional para la representación de líneas, cortes, acotación y símbolos en planos técnicos.",
    patternLabel: "Simbología de Dibujo",
    patternDesc: "Norma los grosores de líneas gráficas, simbologías de proyección y acotados métricos oficiales.",
    sampleGenerator: (disc, zone, user) => `PLN-THOR-${disc}-${zone}-ISO128-E150`,
    metadata: {
      "Sistema Proyección": "Primer Diedro (Método Europeo)",
      "Grosor de Línea": "0.5mm (Contorno) / 0.18mm (Cotas)",
      "Unidad Oficial": "Metros (M) decimales",
      "Anotación": "Cortes / Secciones Uniformizadas"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "PLN", significado: "Tipo de Soporte Técnico", descripcion: "Identificador de plano/lámina técnica para construcción física u obra." },
      { sigla: "THOR", significado: "Código de Proyecto", descripcion: "Torres del Horizonte (Proyecto matriz)." },
      { sigla: disc, significado: "Especialidad en Lámina", descripcion: disc === "ARQ" ? "Planos arquitectónicos." : disc === "EST" ? "Planos estructurales sismorresistentes." : "Planos de canalizaciones sanitarias y de fluidos." },
      { sigla: zone, significado: "Zona Graficada", descripcion: zone === "T1" ? "Láminas correspondientes a la Torre 1." : zone === "T2" ? "Láminas correspondientes a la Torre 2." : "Láminas correspondientes al Sótano." },
      { sigla: "ISO128", significado: "Norma de Representación", descripcion: "Alineamiento a la norma ISO 128 (Espesores de línea, secciones, cotas y proyecciones)." },
      { sigla: "E150", significado: "Escala Métrica Nominal", descripcion: "Indica visualización proporcional normalizada (E150 representa Escala 1:50)." }
    ]
  },
  {
    id: "ISO-13567",
    name: "ISO 13567: Organización de Capas (CAD)",
    category: "Internacional",
    concept: "Establece un sistema de clasificación y nombres de capas para dibujo asistido, agilizando la coordinación interdisciplinaria.",
    patternLabel: "Nomenclatura de Capas (Layers)",
    patternDesc: "Codifica capas por agente, elemento constructivo y estado de intervención.",
    sampleGenerator: (disc, zone, user) => `${disc === "MEP" ? "M" : disc === "EST" ? "S" : "A"}_WALL_FULL_NEW_SHAD`,
    metadata: {
      "Agente de Capa": "Campo 1 (Obligatorio)",
      "Código Elemento": "OmniClass / UniFormat Mapeado",
      "Estado de Capa": "Intervención: Nuevo",
      "Interoperable": "Compatible CAD / BIM"
    },
    acronymsResolver: (disc, zone, user) => {
      const agent = disc === "MEP" ? "M" : disc === "EST" ? "S" : "A";
      const agentName = agent === "A" ? "Architect (Arquitectura)" : agent === "S" ? "Structural Engineer (Cálculo Estructural)" : "Mechanical Engineer (Redes de Fluidos)";
      return [
        { sigla: agent, significado: "Agente de Capa CAD", descripcion: `${agentName} - Responsable originador de las entidades geométricas.` },
        { sigla: "WALL", significado: "Elemento Constructivo", descripcion: "Clasificación de elemento arquitectónico (Muros, muros cortantes, tabiquerías)." },
        { sigla: "FULL", significado: "Complejidad Técnico-Gráfica", descripcion: "Elemento proyectado de forma completa (proyección o alzado tridimensional amplio)." },
        { sigla: "NEW", significado: "Estado de Obra", descripcion: "Fase temporal del elemento (Elemento nuevo que se debe construir en Torres del Horizonte)." },
        { sigla: "SHAD", significado: "Atributo Gráfico", descripcion: "Formato de representación del objeto (Sombreo, relleno o patrón de hatch)." }
      ];
    }
  },
  {
    id: "ISO-12911",
    name: "ISO 12911: Framework de Adopción BIM",
    category: "Internacional",
    concept: "Establece directrices estratégicas de gestión, roles y colaboración técnica entre actores en procesos BIM.",
    patternLabel: "Protocolo de Proceso BIM",
    patternDesc: "Identifica el nivel de colaboración técnica y el marco de intercambio contractual.",
    sampleGenerator: (disc, zone, user) => `THOR-BIM-PROC-${disc}-${user.toUpperCase()}-v1.0`,
    metadata: {
      "Madurez de Proceso": "BIM Nivel 2",
      "Plan de Calidad": "Alineado ISO 9050",
      "Requisito Mandante": "EIR Horizonte V1.2",
      "Colaboración": "Interdisciplinaria Activa"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "THOR", significado: "Código de Proyecto", descripcion: "Torres del Horizonte (Identificador contractual)." },
      { sigla: "BIM-PROC", significado: "Subproceso Colaborativo", descripcion: "Define protocolo de modelado e intercambio según lineamientos ISO 12911." },
      { sigla: disc, significado: "Disciplina de Enfoque", descripcion: disc === "ARQ" ? "Área de cobertura arquitectónica." : disc === "EST" ? "Área de estructura y cimientos." : "Área de instalaciones electromecánicas (MEP)." },
      { sigla: user.toUpperCase(), significado: "Modelador Responsable", descripcion: `ID del especialista asignado: ${user} Restrepo/Castro/Torres.` },
      { sigla: "v1.0", significado: "Control de Versión", descripcion: "Versión de base aprobada para la homologación del protocolo maestro." }
    ]
  },
  {
    id: "COL-CPNAA",
    name: "Cartilla CPNAA (Colombia)",
    category: "Regional",
    concept: "Manual de lineamientos profesionales y estándares de dibujo para el ejercicio de la arquitectura en Colombia.",
    patternLabel: "Matrícula Profesional y Control CO",
    patternDesc: "Exige la consignación visible del registro profesional del arquitecto u originador responsable de la lámina.",
    sampleGenerator: (disc, zone, user) => `CO-CPNAA-RESTREP_J-THOR-${disc}-${zone}-PLN`,
    metadata: {
      "Matrícula Consejo": "Reg. A2541-CO65 (Julia Restrepo)",
      "Ley de Regulación": "Ley 435 de 1998",
      "Formato Lámina": "Papel Pliego (100x70 cm)",
      "Sello Calidad": "Aprobación Consejo Nacional"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "CO", significado: "Código Geográfico", descripcion: "Identificación de República de Colombia (Sigla internacional ISO de país)." },
      { sigla: "CPNAA", significado: "Consejo Profesional", descripcion: "Sello regulador del Consejo Profesional Nacional de Arquitectura y sus Profesiones Auxiliares." },
      { sigla: "RESTREP_J", significado: "Profesional Regulado", descripcion: "Matrícula del arquitecto originador responsable (Ej: Julia Restrepo como directora de arte)." },
      { sigla: "THOR", significado: "Código de Proyecto", descripcion: "Torres del Horizonte (Obra registrada)." },
      { sigla: disc, significado: "Especialidad en Cartela", descripcion: disc === "ARQ" ? "Planos arquitectónicos de detalle." : disc === "EST" ? "Lástima de cimientos estructurales." : "Láminas de instalaciones domésticas e internas." },
      { sigla: zone, significado: "Zona de Proyecto", descripcion: zone === "T1" ? "Torre 1" : zone === "T2" ? "Torre 2" : "Sótano" },
      { sigla: "PLN", significado: "Tipo de Plano", descripcion: "Plano impreso o PDF con cartela y firmas homologadas en Colombia." }
    ]
  },
  {
    id: "PER-SENCICO",
    name: "SENCICO (Perú)",
    category: "Regional",
    concept: "Normas de representación topográfica, escalas métricas y estructuración de planos para edificaciones peruanas.",
    patternLabel: "Rotulado de Lámina SENCICO",
    patternDesc: "Organización de cartelas y rotulado de acuerdo al Reglamento Nacional de Edificaciones (RNE).",
    sampleGenerator: (disc, zone, user) => `PE-SEN-${disc}-${zone}-LAMINA-001`,
    metadata: {
      "Código RNE": "Reglamento G.040",
      "Formato Muestreo": "A1 Peruano (84.1x59.4 cm)",
      "Escala Principal": "General: 1:50 / Detalle: 1:20",
      "Referencia Perú": "Cotas y Simbología SENCICO"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "PE", significado: "Código Geográfico", descripcion: "Prefijo que identifica la República del Perú en licitaciones internacionales." },
      { sigla: "SEN", significado: "Organismo de Control", descripcion: "Acreditado bajo SENCICO (Servicio Nacional de Capacitación para la Industria de la Construcción)." },
      { sigla: disc, significado: "Disciplina del Dibujo", descripcion: disc === "ARQ" ? "Arquitectura según manual pericial." : disc === "EST" ? "Ingeniería sísmica de estructuras para Perú." : "Ingeniería de fluidos y tuberías." },
      { sigla: zone, significado: "Sector Geométrico", descripcion: zone === "T1" ? "Torre 1" : zone === "T2" ? "Torre 2" : "Sótano General" },
      { sigla: "LAMINA", significado: "Medio de Entrega", descripcion: "Representación física impresa en papel de escala regulada por el RNE peruano." },
      { sigla: "001", significado: "Índice Correlativo", descripcion: "Secuencia incremental del plano dentro de la especialidad." }
    ]
  },
  {
    id: "CHI-NCH",
    name: "Normas NCh (Chile)",
    category: "Regional",
    concept: "Prescripciones técnicas chilenas de dibujo estructural, rotulados y representación antisísmica de edificación.",
    patternLabel: "Designación de Especialidad Ch",
    patternDesc: "Frecuencia de planos y especialidades antisísmicas según las normas NCh 1193 y NCh 2203.",
    sampleGenerator: (disc, zone, user) => `CL-NCh1193-${disc === "EST" ? "ESTRU-SISMICA" : disc}-${zone}-FOLIO-02`,
    metadata: {
      "Normas Base": "NCh 1193 Dibujo / NCh 2203 Documental",
      "Método Proyección": "Tercer Diedro (Estadounidense)",
      "Clase de Estructura": "Categoría Residencial SismoA",
      "Revisión INN": "Instituto Nacional Chile"
    },
    acronymsResolver: (disc, zone, user) => {
      const specLabel = disc === "EST" ? "ESTRU-SISMICA" : disc;
      const specDesc = disc === "EST" ? "Estructura sismorresistente calculada según directriz sismológica chilena." : disc === "ARQ" ? "Arquitectura general de edificación multifamiliar." : "Instalaciones de ventilación, sanitarias y fluidos.";
      return [
        { sigla: "CL", significado: "Código de País", descripcion: "República de Chile (Marca de origen según regulaciones de aduana e INN)." },
        { sigla: "NCh1193", significado: "Código de Norma", descripcion: "Alineación estricta con la Norma Chilena NCh 1193 de dibujo técnico." },
        { sigla: specLabel, significado: "Especialidad / Sistema", descripcion: specDesc },
        { sigla: zone, significado: "Sector de Estructura", descripcion: zone === "T1" ? "Cálculo estructural de Torre 1." : zone === "T2" ? "Cálculo estructural de Torre 2." : "Cálculo estructural de muros de contención de Sótano." },
        { sigla: "FOLIO-02", significado: "Designador de Carpeta", descripcion: "Identificación única de folio de archivo indexada ante el Instituto Nacional de Normalización (INN)." }
      ];
    }
  },
  {
    id: "MEX-NMX",
    name: "Normas NMX-C (México)",
    category: "Regional",
    concept: "Directrices de dibujo técnico arquitectónico e instalaciones de la Secretaría de Economía (ONNCCE).",
    patternLabel: "Registro de Plano Arquitectónico MX",
    patternDesc: "Clasificación de planos normalizados de acuerdo con los lineamientos del organismo nacional organizador.",
    sampleGenerator: (disc, zone, user) => `MX-NMX-C409-${disc}-${zone}-NIVEL-P5`,
    metadata: {
      "Organismo Oficial": "Secretaría de Economía ONNCCE",
      "Cód de Norma": "NMX-C-409-ONNCCE-2024",
      "Unidad Oficial": "Metro (M)",
      "Control de Dibujo": "Métricas de representación"
    },
    acronymsResolver: (disc, zone, user) => [
      { sigla: "MX", significado: "Código Geográfico", descripcion: "Indicativo de Estados Unidos Mexicanos (Sello reglamentario nacional)." },
      { sigla: "NMX-C409", significado: "Reglamento Oficial", descripcion: "Norma Mexicana NMX-C-409-ONNCCE para dibujo técnico de la construcción civil." },
      { sigla: disc, significado: "Especialidad en Eje", descripcion: disc === "ARQ" ? "Arquitectura mexicana." : disc === "EST" ? "Estructura de concreto y acero de refuerzo." : "Instalaciones de gas, electricidad y plomería." },
      { sigla: zone, significado: "Sección de Planta", descripcion: zone === "T1" ? "Torre 1" : zone === "T2" ? "Torre 2" : "Sótano principal" },
      { sigla: "NIVEL", significado: "Descriptor de Cota", descripcion: "Estándar obligatorio para indicar la altura vertical del plano técnico." },
      { sigla: "P5", significado: "Posición / Piso", descripcion: "Cota de elevación o nivel de piso asignado (P5 representa Piso 5 de edificación)." }
    ]
  },
  {
    id: "USA-NCS",
    name: "National CAD Standard (Estados Unidos)",
    category: "Regional",
    concept: "Estándar integrado que unifica CAD Layer Guidelines, Drafting Conventions e indicación jerárquica de planos.",
    patternLabel: "CAD Layer Discipline Designator US",
    patternDesc: "Capas jerárquicas codificadas con abreviaturas cortas de especialidad, elemento y estado.",
    sampleGenerator: (disc, zone, user) => `${disc === "ARQ" ? "A" : disc === "EST" ? "S" : "M"}-WALL-FULL-NEW-NCS`,
    metadata: {
      "Version NCS": "NCS Version 6.0",
      "Discipline Code": "A-Architectural / S-Structural",
      "Major Group Code": "WALL (Muros) / DOOR (Puertas)",
      "Minor Group 1 Code": "FULL (Elevación o Corte Completo)"
    },
    acronymsResolver: (disc, zone, user) => {
      const discCode = disc === "ARQ" ? "A" : disc === "EST" ? "S" : "M";
      const discName = disc === "ARQ" ? "Architectural (Arquitectura)" : disc === "EST" ? "Structural (Estabilidad Estructural)" : "Mechanical (Hvac y Fluidos)";
      return [
        { sigla: discCode, significado: "Discipline Designator", descripcion: `${discCode} - Abreviatura primaria obligatoria según la convención de planos de NCS.` },
        { sigla: "WALL", significado: "Major Group Code", descripcion: "Identificación de componente de obra de primer orden (WALL representa Muros / Mampostería / Alzados)." },
        { sigla: "FULL", significado: "Minor Group 1", descripcion: "Detalle técnico de visualización (FULL indica proyección libre de corte completo)." },
        { sigla: "NEW", significado: "Minor Group 2", descripcion: "Código de estado de intervención temporal (NEW indica elemento recién incorporado)." },
        { sigla: "NCS", significado: "Código de Estándar", descripcion: "Estándar integrado de capas CAD de Estados Unidos (National CAD Standard v6.0)." }
      ];
    }
  }
];

export const BepStructureSlide = () => {
  const [activeBlockId, setActiveBlockId] = useState<"I" | "II" | "III" | "IV">("I");
  const [expandedChapter, setExpandedChapter] = useState<string>("1");

  // --- Bloque I State ---
  const [torresArea, setTorresArea] = useState<number>(14500);

  // --- Bloque II State ---
  const [selectedFolder, setSelectedFolder] = useState<"WIP" | "SHARED" | "PUBLISHED" | "ARCHIVED">("SHARED");
  const [cdeSecurityMode, setCdeSecurityMode] = useState<"norma" | "informal">("norma");

  // --- Bloque III State ---
  const [selectedStandardId, setSelectedStandardId] = useState<string>("ISO-19650");
  const [activeNomenclatureUser, setActiveNomenclatureUser] = useState<string>("Diana");
  const [activeNomenclatureZone, setActiveNomenclatureZone] = useState<string>("T1");
  const [activeNomenclatureDiscipline, setActiveNomenclatureDiscipline] = useState<string>("EST");
  const [activeAuditClean, setActiveAuditClean] = useState<boolean>(false);
  const [detectedDuplicates, setDetectedDuplicates] = useState<number>(14);
  const [detectedDisconnections, setDetectedDisconnections] = useState<number>(8);

  // --- Bloque IV State ---
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>("andres");

  const currentBlock = MASTER_BEP_DATA.find(b => b.id === activeBlockId) || MASTER_BEP_DATA[0];
  const activeChapter = currentBlock.chapters.find(c => c.number === expandedChapter) || currentBlock.chapters[0];

  // Sync expanded state when block changes
  useEffect(() => {
    if (currentBlock.chapters.length > 0) {
      setExpandedChapter(currentBlock.chapters[0].number);
    }
  }, [activeBlockId]);

  return (
    <div className="relative h-full w-full bg-artis-black text-white p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
      {/* Immersive background decoration */}
      <div className="absolute inset-0 immersive-grid opacity-10 pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-artis-orange font-mono text-[9px] uppercase tracking-[0.4em] font-black">
                MÓDULO DE ADJUDICACIÓN CORPORATIVA • CLASE 4
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-artis-orange animate-pulse shadow-[0_0_10px_#FFA400]"></div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight leading-none text-white font-mono">
              BEP de Post-adjudicación: <span className="text-artis-orange">Estructura Maestra ISO 19650</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 font-sans max-w-4xl leading-relaxed">
              Planificación oficial de <strong className="text-white">Torres del Horizonte</strong>. Consolidamos en una única estructura interactiva los 14 apartados fundamentales del BEP, distinguiendo con claridad la <strong className="text-sky-400 font-mono">Guía Metodológica</strong> del <strong className="text-artis-orange font-mono">Ejemplo Práctico Real</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#0c1824]/80 p-2.5 rounded-md border border-[#14b8a6]/25 font-mono text-[10px] shrink-0 text-slate-300">
            <Building2 className="w-4 h-4 text-[#14b8a6]" />
            <div>
              <p className="font-extrabold text-[#14b8a6] leading-none uppercase">Torres del Horizonte</p>
              <span className="text-[8px] text-slate-400 uppercase mt-0.5 block">Residencial • 14,500 m²</span>
            </div>
          </div>
        </div>

        {/* The 4 Blocks Interactive Selector Tab-Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 select-none font-mono">
          {MASTER_BEP_DATA.map((block) => {
            const isActive = block.id === activeBlockId;
            const BlockIcon = block.icon;
            return (
              <button
                key={block.id}
                onClick={() => setActiveBlockId(block.id)}
                className={`p-3.5 rounded-lg border text-left flex flex-col justify-between h-[85px] relative transition-all cursor-pointer ${
                  isActive 
                    ? "bg-[#0c1824]/90 border-artis-orange text-white shadow-xl" 
                    : "bg-[#02050b]/60 border-white/5 text-slate-400 hover:border-white/10"
                }`}
                style={{
                  boxShadow: isActive ? `0 8px 20px -8px ${block.accentColor}30, inset 0 0 10px ${block.accentColor}10` : undefined,
                  borderColor: isActive ? block.accentColor : undefined
                }}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-lg" style={{ backgroundColor: block.accentColor }} />
                )}

                <div className="flex items-center justify-between w-full">
                  <span className={`text-[9px] font-black tracking-widest ${isActive ? block.colorClass : "text-slate-600"}`}>
                    BLOQUE {block.id}
                  </span>
                  <BlockIcon className={`w-4 h-4 ${isActive ? block.colorClass : "text-slate-700"}`} />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10.5px] font-bold text-white leading-none block uppercase truncate">
                    {(block.title.split(":")[1] || block.title).trim()}
                  </span>
                  <span className="text-[8px] text-slate-400 font-sans block truncate">
                    {block.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE (6/12 Column) - Selected Block Chapters & Guía Metodológica */}
          <div className="lg:col-span-6 bg-[#03060c]/90 border border-white/5 rounded-xl p-5 md:p-6 space-y-4 shadow-2xl relative">
            
            {/* Header description of selected Bloque */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                {(() => {
                  const BlockIcon = currentBlock.icon;
                  return <BlockIcon className={`w-5 h-5 ${currentBlock.colorClass}`} />;
                })()}
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white font-mono uppercase tracking-wider leading-none">
                    {currentBlock.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">
                    {currentBlock.subtitle}
                  </span>
                </div>
              </div>
              <span className="text-[8px] font-mono text-zinc-500 block uppercase border border-white/5 px-2 py-0.5 rounded">
                ISO 19650
              </span>
            </div>

            {/* Render chapters list in block */}
            <div className="space-y-3">
              {currentBlock.chapters.map((chapter) => {
                const isExpanded = chapter.number === expandedChapter;
                return (
                  <div 
                    key={chapter.number}
                    className={`rounded-lg border transition-all ${
                      isExpanded 
                        ? "bg-[#060c18] border-white/15 shadow-xl" 
                        : "bg-white/2 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Chapter Trigger / Button */}
                    <button
                      onClick={() => setExpandedChapter(chapter.number)}
                      className="w-full text-left p-3.5 flex items-center justify-between cursor-pointer font-mono animate-fade-in"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black min-w-[70px] text-center bg-white/5 px-2 py-1 rounded border border-white/5 ${isExpanded ? "text-artis-orange" : "text-slate-400"}`}>
                          Cap. {chapter.number}
                        </span>
                        <h4 className={`text-xs sm:text-[13px] font-bold tracking-wide transition-colors ${isExpanded ? "text-white animate-pulse" : "text-slate-400 font-medium"}`}>
                          {chapter.title}
                        </h4>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? "rotate-90 text-artis-orange" : ""}`} />
                    </button>

                    {/* Expandable Guía Metodológica */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-1 border-t border-white/5 space-y-4 bg-black/25 font-sans text-xs">
                            
                            {/* Summary sentence */}
                            <div className="p-3 bg-white/2 text-slate-300 italic border-l-2 border-artis-orange leading-relaxed text-[11px]">
                              &ldquo;{chapter.summary}&rdquo;
                            </div>

                            {/* Guia Column */}
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5 space-y-3">
                              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[9px] uppercase tracking-wider mb-1">
                                <BadgeInfo className="w-4 h-4 text-sky-450 shrink-0" />
                                <span className="text-sky-400 font-bold">Guía Metodológica del Estándar</span>
                              </div>
                              <p className="text-[11.5px] text-slate-300 leading-relaxed italic">
                                {chapter.guiaExplicacion}
                              </p>
                              
                              <div className="space-y-1.5 pt-2">
                                <span className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-1">
                                  Requisitos Normativos Mandatarios:
                                </span>
                                {chapter.guiaPuntos.map((punto, idx) => (
                                  <div key={idx} className="flex gap-2 items-start text-[11px] font-mono text-zinc-400 leading-normal">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-455 shrink-0 mt-0.5 opacity-80" />
                                    <span>{punto}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ADJUNTOS CONTRACTUALES - Espacio Desperdiciado del Primer Bloque (Capítulo 1) */}
                            {chapter.number === "1" && (
                              <div className="bg-[#14b8a6]/5 border border-[#14b8a6]/25 rounded-lg p-4 space-y-3 animate-fade-in text-left">
                                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                                  <FileText className="w-4 h-4 text-[#14b8a6]" />
                                  <span className="text-[9px] font-mono text-white font-extrabold uppercase tracking-wider">
                                    Documentos e Información que se Adjuntan (Anexo 1)
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-sans">
                                  <div className="flex items-start gap-2 p-2 bg-[#03060c]/80 rounded border border-white/5">
                                    <CheckSquare className="w-3.5 h-3.5 text-[#14b8a6] shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-extrabold text-slate-200 block">Planos Linderos .DWG</span>
                                      <span className="text-slate-400 text-[9px] leading-relaxed">Georreferenciación oficial en mojón real (Kennedy) de Bogotá.</span>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 p-2 bg-[#03060c]/80 rounded border border-white/5">
                                    <CheckSquare className="w-3.5 h-3.5 text-[#14b8a6] shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-extrabold text-slate-200 block">Certificado Jurídico Lote</span>
                                      <span className="text-slate-400 text-[9px] leading-relaxed">Tradición y libertad del predio de 3,200 m².</span>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 p-2 bg-[#03060c]/80 rounded border border-white/5">
                                    <CheckSquare className="w-3.5 h-3.5 text-[#14b8a6] shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-extrabold text-slate-200 block">Acta Unión Comercial</span>
                                      <span className="text-slate-400 text-[9px] leading-relaxed">Personería legal del Consorcio "Diseño Inteligente" y firmas asociadas.</span>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 p-2 bg-[#03060c]/80 rounded border border-white/5">
                                    <CheckSquare className="w-3.5 h-3.5 text-[#14b8a6] shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-extrabold text-slate-200 block">Hitos Fiduciaria</span>
                                      <span className="text-slate-400 text-[9px] leading-relaxed">Ciclo de aprobaciones y liberación de desembolsos bancarios.</span>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 p-2 bg-[#03060c]/80 rounded border border-white/5 col-span-1 sm:col-span-2">
                                    <CheckSquare className="w-3.5 h-3.5 text-artis-orange shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-extrabold text-[#14b8a6] block text-left">Soporte Operacional de Infraestructura y Hardware</span>
                                      <span className="text-slate-400 text-[9px] leading-relaxed block text-left">Licenciamiento homologado y equipamientos con presupuesto asignado de USD $5,000 en campamento.</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
  
          </div>

          {/* RIGHT SIDE (6/12 Column) - Comprehensive Ejemplo Real de Aplicación (Un-cramped!) */}
          <div className="lg:col-span-6 bg-[#040813]/90 border border-artis-orange/20 rounded-xl p-6 space-y-5 shadow-[0_12px_40px_rgba(255,164,0,0.04)] relative flex flex-col justify-between min-h-[600px]">
            
            {/* Blueprint background lines for that high-end structural aesthetic */}
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-artis-orange/[0.03] to-transparent pointer-events-none"></div>

            {/* Document Header Panel */}
            <div className="space-y-2 relative z-10 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono">
                  <div className="w-2 h-2 rounded-full bg-artis-orange animate-pulse"></div>
                  <span className="text-[9px] font-black text-artis-orange tracking-widest uppercase">
                    EJEMPLO CONTRACTUAL MÁXIMO • APÉNDICE A.2
                  </span>
                </div>
                <div className="text-[8px] bg-white/5 border border-white/10 text-slate-300 font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#14b8a6]" />
                  Torres del Horizonte
                </div>
              </div>

              {/* Title Section */}
              <div className="border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-[#14b8a6] uppercase tracking-wider font-extrabold block">
                  Bloque {currentBlock.id} / Capítulo {activeChapter.number}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white font-mono tracking-tight uppercase leading-none mt-1">
                  {activeChapter.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans mt-2 leading-relaxed">
                  {activeChapter.ejemploExplicacion}
                </p>
              </div>
            </div>

            {/* Main Details Parameters Grid (The highly visible un-cramped list!) */}
            <div className="flex-1 space-y-3.5 relative z-10 py-1 text-left">
              <span className="text-[8.5px] font-mono font-black text-slate-500 uppercase tracking-widest block">
                ATRIBUTOS CONTRACTUALES REALES Y VALIDADOS:
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {activeChapter.ejemploDetalles.map((hl, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-[#0a101f] rounded-lg border border-white/[0.06] hover:bg-white/[0.01] hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-2 shadow-sm"
                  >
                    <div className="sm:min-w-[170px] shrink-0 text-left">
                      <span className="text-[9px] font-mono tracking-wider uppercase text-artis-orange font-extrabold block leading-tight">
                        {hl.label}
                      </span>
                    </div>
                    <div className="text-left flex-1 sm:pl-4 sm:border-l border-white/5">
                      <p className="text-[11.5px] text-slate-200 font-sans leading-relaxed font-semibold">
                        {hl.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONTEXTUAL INTERACTIVE SIMULATORS - Embedded within their respective Chapters! */}
              
              {/* Simulator for Chapter 6 - Entorno Común de Datos (CDE) */}
              {activeChapter.number === "6" && (
                <div className="mt-5 p-4 bg-[#0a101f] border border-[#38bdf8]/20 rounded-lg space-y-3.5 animate-fade-in font-mono text-left">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[9px] font-black text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                      <Network className="w-4 h-4" /> Consola Operativa del CDE
                    </span>
                    <span className="text-[8px] text-slate-500">CONTROL DE VERSIONES</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-black uppercase">
                    <button
                      onClick={() => setCdeSecurityMode("norma")}
                      className={`p-2 rounded border cursor-pointer transition-all ${
                        cdeSecurityMode === "norma" 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow" 
                          : "bg-black/40 border-white/5 text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      ✔ Norma ISO CDE
                    </button>
                    <button
                      onClick={() => setCdeSecurityMode("informal")}
                      className={`p-2 rounded border cursor-pointer transition-all ${
                        cdeSecurityMode === "informal" 
                          ? "bg-red-500/10 border-red-500/60 text-red-400 font-extrabold animate-pulse" 
                          : "bg-black/40 border-white/5 text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      ⚠ Chats / WhatsApp
                    </button>
                  </div>

                  <div className="space-y-1 text-left">
                    <span className="text-[7.5px] font-bold text-slate-500 uppercase block tracking-wider">
                      Ubicación de Carpeta en Servidor:
                    </span>
                    <div className="grid grid-cols-4 gap-1 text-center text-[8.5px] font-bold">
                      {(["WIP", "SHARED", "PUBLISHED", "ARCHIVED"] as const).map((folder) => {
                        const isFolderSel = selectedFolder === folder;
                        return (
                          <button
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className={`p-1.5 rounded border transition-all cursor-pointer ${
                              isFolderSel 
                                ? "bg-[#38bdf8]/15 border-[#38bdf8] text-[#38bdf8] shadow" 
                                : "bg-black/45 border-white/5 text-slate-500 hover:text-slate-350"
                            }`}
                          >
                            {folder === "WIP" ? "01_WIP" : folder === "SHARED" ? "02_SHARE" : folder === "PUBLISHED" ? "03_PUBLI" : "04_ARCH"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#03060c] border border-white/5 rounded p-3 min-h-[90px] flex flex-col justify-center text-[10.5px]">
                    {cdeSecurityMode === "norma" ? (
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1 text-emerald-400 text-[8.5px] uppercase font-black">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>FLUJO VERIFICADO BAJO ISO 19650</span>
                        </div>
                        <p className="text-[10px] font-sans text-slate-300 leading-relaxed">
                          {selectedFolder === "WIP" && "Uso local privado: Modeladores (Diana, Mateo, Camilo) realizan iteraciones rápidas sin entorpecer el proceso de diseño común."}
                          {selectedFolder === "SHARED" && "Coordinación federal quincenal: Los archivos se unifican mediante coordenadas compartidas para la detección de colisiones de ingenierías."}
                          {selectedFolder === "PUBLISHED" && "Trazabilidad Oficial de Obra: Planos aprobados mediante firma digital de Andrés Silva (Horizonte). Luis Fernando opera directamente desde esta carpeta."}
                          {selectedFolder === "ARCHIVED" && "Archivo de Trazabilidad: Historial inmutable para revisiones futuras o garantías legales ordinarias del activo."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1 bg-red-950/20 p-2 rounded border border-red-500/20 text-left">
                        <div className="flex items-center gap-1 text-red-400 text-[8.5px] uppercase font-black">
                          <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                          <span>¡ALERTA DE DESVIACIÓN CONTRACTUAL!</span>
                        </div>
                        <p className="text-[9.5px] font-sans text-slate-300 leading-normal">
                          El envío por correo o mensajería de chat rompe la directriz contractual regulada y exime legalmente al Consorcio de omisiones de planos. Se exige usar el CDE de forma innegociable.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Simulator for Chapter 7 - Convenciones y Estándares Técnicos */}
              {activeChapter.number === "7" && (() => {
                const selectedStandard = STANDARDS_REFERENCE_DATA.find(s => s.id === selectedStandardId) || STANDARDS_REFERENCE_DATA[0];
                return (
                  <div className="mt-5 p-4 bg-[#0a101f] border border-[#ec4899]/20 rounded-lg space-y-3.5 animate-fade-in font-mono text-left">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[9.5px] font-black text-[#ec4899] uppercase tracking-wider flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-[#ec4899]" /> Selector de Estándar & Nomenclador
                      </span>
                      <span className="text-[8px] text-zinc-500 uppercase">{selectedStandard.category}</span>
                    </div>

                    {/* Standard Selection Dropdown */}
                    <div className="space-y-1">
                      <label className="text-[7.5px] text-slate-500 font-bold block uppercase">Estándar / Marco de Marcado de Archivos</label>
                      <select
                        value={selectedStandardId}
                        onChange={(e) => setSelectedStandardId(e.target.value)}
                        className="w-full bg-slate-950 border border-white/12 rounded p-1.5 text-white text-[10px] font-bold focus:border-[#ec4899] focus:outline-none"
                      >
                        <optgroup label="Normas Internacionales">
                          {STANDARDS_REFERENCE_DATA.filter(s => s.category === "Internacional").map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Normas Regionales">
                          {STANDARDS_REFERENCE_DATA.filter(s => s.category === "Regional").map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Standard Concept Box */}
                    <div className="p-2.5 bg-black/40 border border-white/5 rounded text-[10px] space-y-1 leading-relaxed">
                      <div className="flex items-center justify-between">
                        <span className="text-[#ec4899] text-[8px] font-black uppercase tracking-wider">Concepto Regulatorio:</span>
                        <span className="text-[7px] bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/25 px-1.5 py-0.2 rounded font-black uppercase">
                          {selectedStandard.category}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-slate-350 font-sans">
                        {selectedStandard.concept}
                      </p>
                    </div>

                    {/* User parameters (same as original, so user interactivity is fully retained) */}
                    <div className="grid grid-cols-3 gap-2 text-[8.5px] pt-1">
                      <div className="space-y-1">
                        <label className="text-[7px] text-slate-500 block">DISCIPLINA</label>
                        <select 
                          value={activeNomenclatureDiscipline} 
                          onChange={(e) => setActiveNomenclatureDiscipline(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded p-1 text-white text-[8.5px]"
                        >
                          <option value="ARQ">ARQ (Arquitectura)</option>
                          <option value="EST">EST (Estructura)</option>
                          <option value="MEP">MEP (Fluido/MEP)</option>
                        </select>
                      </div>

                      <div className="space-y-1 axis-select">
                        <label className="text-[7px] text-slate-500 block">ZONA</label>
                        <select 
                          value={activeNomenclatureZone} 
                          onChange={(e) => setActiveNomenclatureZone(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded p-1 text-white text-[8.5px]"
                        >
                          <option value="T1">T1 (Torre 1)</option>
                          <option value="T2">T2 (Torre 2)</option>
                          <option value="SO">SO (Sótano)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[7px] text-slate-500 block">MODELADOR</label>
                        <select 
                          value={activeNomenclatureUser} 
                          onChange={(e) => setActiveNomenclatureUser(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded p-1 text-white text-[8.5px]"
                        >
                          <option value="Diana">Diana R.</option>
                          <option value="Mateo">Mateo C.</option>
                          <option value="Camilo">Camilo T.</option>
                        </select>
                      </div>
                    </div>

                    {/* Generated Nomenclatura Box */}
                    <div className="bg-[#03060c] border border-white/5 rounded p-3 space-y-2.5 text-left">
                      <div className="space-y-1">
                        <span className="text-zinc-500 text-[7.5px] uppercase block font-semibold">
                          {selectedStandard.patternLabel}:
                        </span>
                        <div className="p-1 px-2 bg-slate-950 rounded border border-[#ec4899]/15 flex items-center justify-between gap-1.5 overflow-x-auto">
                          <span className="text-emerald-400 font-bold text-[10px] whitespace-nowrap">
                            {selectedStandard.sampleGenerator(activeNomenclatureDiscipline, activeNomenclatureZone, activeNomenclatureUser)}
                          </span>
                        </div>
                        <span className="text-[7.5px] text-slate-400 font-sans block leading-normal mt-0.5">
                          {selectedStandard.patternDesc}
                        </span>
                      </div>

                      {/* Desglose explicativo de las siglas de la nomenclatura (Reemplaza metadatos de marcado obligatorio) */}
                      <div className="pt-3 border-t border-white/5 space-y-1.5">
                        <span className="text-zinc-500 text-[7.5px] uppercase block font-black tracking-wider">
                          Interpretación de Siglas & Elementos del Código:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[8.5px] font-sans">
                          {selectedStandard.acronymsResolver(activeNomenclatureDiscipline, activeNomenclatureZone, activeNomenclatureUser).map((item, idx) => (
                            <div key={idx} className="p-2 bg-[#0a1020] rounded border border-white/[0.03] hover:border-[#ec4899]/30 transition-all flex items-start gap-2.5">
                              <div className="shrink-0 font-mono font-black text-[9.5px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-white/5 min-w-[55px] text-center shadow-inner mt-0.5">
                                {item.sigla}
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <span className="text-[#ec4899] font-mono font-bold uppercase block text-[7.5px] tracking-wide leading-none">
                                  {item.significado}
                                </span>
                                <span className="text-slate-200 font-medium block leading-relaxed break-words">
                                  {item.descripcion}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Simulator for Chapter 11 - Control de Calidad */}
              {activeChapter.number === "11" && (
                <div className="mt-5 p-4 bg-[#0a101f] border border-[#ec4899]/20 rounded-lg space-y-3.5 animate-fade-in font-mono text-left">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[9px] font-black text-[#ec4899] uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[#ec4899]" /> Auditoría de Salud Lógica del Modelo
                    </span>
                    <button
                      onClick={() => {
                        if (!activeAuditClean) {
                          setActiveAuditClean(true);
                          setDetectedDuplicates(0);
                          setDetectedDisconnections(0);
                        } else {
                          setActiveAuditClean(false);
                          setDetectedDuplicates(14);
                          setDetectedDisconnections(8);
                        }
                      }}
                      className={`text-[8.5px] px-2 py-0.5 rounded font-black border transition-all cursor-pointer ${
                        activeAuditClean 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow" 
                          : "bg-[#ec4899]/15 border-[#ec4899] text-[#ec4899] animate-pulse"
                      }`}
                    >
                      {activeAuditClean ? "RESTAURAR ERRORES" : "EJECUTAR SCRIPT DE AUDITORÍA"}
                    </button>
                  </div>

                  <div className="p-3 bg-black/45 rounded-md border border-white/5 text-[9px] space-y-1.5 text-left">
                    <span className="text-[7.5px] text-zinc-500 uppercase font-bold tracking-wider block">Inspección de Familias y Redes:</span>
                    
                    {!activeAuditClean ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-red-400 bg-red-950/25 p-1.5 rounded border border-red-500/20">
                          <span>⚠ Elementos Espaciales Solapados:</span>
                          <span className="font-extrabold">{detectedDuplicates} vigas duplicadas</span>
                        </div>
                        <div className="flex items-center justify-between text-amber-500 bg-amber-950/25 p-1.5 rounded border border-amber-500/20">
                          <span>⚠ Descalces Sanitarios / Tubos Sueltos:</span>
                          <span className="font-extrabold">{detectedDisconnections} fallas sanitarias</span>
                        </div>
                        <p className="text-[8.5px] text-red-300 italic pl-1 leading-normal font-sans pt-0.5 text-left">
                          *Alerta Crítica: El solapamiento de vigas distorsiona el conteo automático del presupuesto (IFC 5D). Esto provocaría cobros dobles e infligiría daños económicos directos. El modelo ha sido rechazado automáticamente.
                        </p>
                      </div>
                    ) : (
                      <div className="py-2 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-1" />
                        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">¡Todo Limpio y Validado!</p>
                        <span className="text-[8px] text-slate-400 mt-0.5">Volúmenes, familias y uniones de fluidos óptimas para construcción de obra física.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Simulator for Chapter 3 - Organización y Responsabilidades */}
              {activeChapter.number === "3" && (
                <div className="mt-5 p-4 bg-[#0a101f] border border-[#fbbf24]/20 rounded-lg space-y-3.5 animate-fade-in font-mono text-left">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[9px] font-black text-[#fbbf24] uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> Matriz Operativa de Responsabilidades RACI
                    </span>
                    <span className="text-[8px] text-slate-500">ORGANIGRAMA</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "andres", name: "Andrés Silva (Coor. BIM)" },
                      { id: "julia", name: "Julia Restrepo (Diseño)" },
                      { id: "luis", name: "Luis Tobón (Obra)" },
                      { id: "diana", name: "Modeladores (Tareas)" }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedParticipantId(p.id)}
                        className={`p-1.5 rounded text-[8.5px] text-left border transition-all cursor-pointer truncate ${
                          selectedParticipantId === p.id 
                            ? "bg-[#fbbf24]/10 border-[#fbbf24] text-[#fbbf24] font-black" 
                            : "bg-black/40 border-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#03060c] border border-white/5 rounded p-3 text-[10px] text-left">
                    {selectedParticipantId === "andres" && (
                      <div className="space-y-1">
                        <span className="text-[#fbbf24] font-semibold uppercase text-[9px]">Andrés Silva • Adjudicador (Parte A)</span>
                        <p className="text-slate-300 text-[9.5px] leading-relaxed font-sans mt-1 text-left">
                          Representante de Inmobiliaria Horizonte S.A. Actúa como el Aprobador Final (RACI: Approver) del CDE. Valida y autoriza formalmente que la información avance de Shared a PUBLISHED para su uso contractual en obra.
                        </p>
                      </div>
                    )}
                    {selectedParticipantId === "julia" && (
                      <div className="space-y-1">
                        <span className="text-[#fbbf24] font-semibold uppercase text-[9px]">Julia Restrepo • Directora (Parte B1)</span>
                        <p className="text-slate-300 text-[9.5px] leading-relaxed font-sans mt-1 text-left">
                          Líder de Consorcio "Diseño Inteligente". Es la Ejecutora Responsable (RACI: Responsible) de la consistencia métrica de los modelos ARQ, EST y MEP en el plazo de 3 meses.
                        </p>
                      </div>
                    )}
                    {selectedParticipantId === "luis" && (
                      <div className="space-y-1">
                        <span className="text-[#fbbf24] font-semibold uppercase text-[9px]">Luis Fernando • Director de Obra (Parte B2)</span>
                        <p className="text-slate-300 text-[9.5px] leading-relaxed font-sans mt-1 text-left">
                          Sujeto de consulta e información (RACI: Consulted / Informed). Construye físicamente el activo sirviéndose de los entregables del CDE, auditando el modelo integrado desde terreno.
                        </p>
                      </div>
                    )}
                    {selectedParticipantId === "diana" && (
                      <div className="space-y-1">
                        <span className="text-[#fbbf24] font-semibold uppercase text-[9px]">Diana, Mateo y Camilo • Equipos de Tareas (C)</span>
                        <p className="text-slate-300 text-[9.5px] leading-relaxed font-sans mt-1 text-left">
                          Modeladores especialistas de tareas. Responsables directos (RACI: Responsible) del modelado geométrico de las tres disciplinas, reportando interferencias en tiempo real.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Document Signature Seal Overlay at Bottom */}
            <div className="pt-3 border-t border-white/5 relative z-10 flex flex-col sm:flex-row justify-between items-center text-[9px] text-slate-500 font-mono gap-2 uppercase select-none">
              <div className="flex items-center gap-1.5 text-[8.5px] tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14b8a6]" />
                <span>Validado digitalmente: Inmobiliaria & Constructora Horizonte S.A.</span>
              </div>
              <span className="text-artis-orange font-bold font-sans">Soporte Tecnológico: USD $5,000</span>
            </div>

          </div>

        </div>

      </div>

      {/* Footer Branding Area */}
      <div className="relative mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono text-zinc-500 tracking-wider uppercase gap-2 select-none">
        <span>Artis Business School © BIM Corporate Training</span>
        <div className="flex gap-4">
          <span>Clase 4: Recursos Directivos</span>
          <span className="text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">ISO 19650-2 Completo</span>
        </div>
      </div>
    </div>
  );
};
