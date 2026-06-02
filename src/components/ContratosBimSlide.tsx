import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Globe2, ShieldAlert, BadgeCheck, Compass, Sliders, FolderKey, 
  Trash2, AlertTriangle, CheckCircle2, Focus, RefreshCw, PenTool, Layers,
  X, ChevronLeft, ChevronRight, Maximize2, Eye
} from 'lucide-react';

interface ClauseDetail {
  id: string;
  num: string;
  title: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  icon: any;
  summary: string;
  description: string;
  severity: "CRÍTICO" | "OBLIGATORIO" | "AUDITABLE";
  severityColor: string;
  contractualImpact: string;
  technicalChecks: {
    label: string;
    description: string;
  }[];
}

const CLAUSES_DATA: ClauseDetail[] = [
  {
    id: "loin",
    num: "1.1",
    title: "Criterios de Modelado (N.D. / LOIN)",
    badge: "Geometría & Datos",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245,158,11,0.2)",
    icon: Layers,
    summary: "Define los límites del ¿Cómo modelar? regulando la correspondencia entre geometría y metadatos.",
    description: "El contrato debe estipular detalladamente el Nivel de Desarrollo (N.D.) o Nivel de Necesidad de Información (LOIN). Esto regula si un elemento constructivo se modela como un solo bloque monolítico o por capas/materiales separados (por ejemplo, para permitir un cómputo preciso de presupuestos).",
    severity: "OBLIGATORIO",
    severityColor: "text-amber-400 border-amber-400/30 bg-amber-400/5",
    contractualImpact: "Evita reclamos por falsos rendimientos e incongruencias en los metrados del contratista.",
    technicalChecks: [
      { label: "Segmentación por Materiales", description: "Muros y losas deben separarse por acabados y revoques según diseño." },
      { label: "Atribución Mínima Exigible", description: "Familias parametrizadas con campos obligatorios de fabricante e ID." }
    ]
  },
  {
    id: "georref",
    num: "1.2",
    title: "Nivel de Georreferenciación",
    badge: "Ubicación Real",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    borderColor: "border-sky-500/30",
    glowColor: "rgba(56,189,248,0.2)",
    icon: Compass,
    summary: "Establece el sistema de coordenadas de origen real bajo el cual debe erigirse el gemelo digital.",
    description: "Es una obligación legal indiscutible entregar los modelos coordinados bajo un único sistema de coordenadas compartidas reales del proyecto. Un modelo flotando de forma huérfana en el espacio virtual o desfasado respecto al terreno real (punto base y punto de reconocimiento incorrectos) rompe la compatibilidad espacial y será rechazado contractualmente.",
    severity: "CRÍTICO",
    severityColor: "text-red-400 border-red-500/30 bg-red-500/5",
    contractualImpact: "Garantiza que el diseño calce exactamente con la topografía real y replanteos en obra.",
    technicalChecks: [
      { label: "Coordenadas Compartidas", description: "Alineación rígida con el punto de reconocimiento topográfico." },
      { label: "Punto Base de Proyecto", description: "Verificación de desfases X, Y, Z y rotación respecto al Norte Real." }
    ]
  },
  {
    id: "nomenclatura",
    num: "1.3",
    title: "Nomenclatura Estándar",
    badge: "Gobernanza Digital",
    badgeColor: "text-[#deb887] bg-yellow-600/10 border-[#deb887]/20",
    borderColor: "border-[#deb887]/30",
    glowColor: "rgba(222,184,135,0.2)",
    icon: PenTool,
    summary: "Codificación estricta e indexable para automatizar auditorías y catalogar metadatos.",
    description: "La estructura de nombres para archivos, familias, tipos y parámetros debe seguir una codificación estricta alineada con el estándar de la organización u homologación ISO 19650. No se convalidarán entregas con nombres improvisados, ruidosos o desordenados que impidan la búsqueda automatizada y dificulten la auditoría limpia de datos.",
    severity: "AUDITABLE",
    severityColor: "text-blue-400 border-blue-500/30 bg-blue-500/5",
    contractualImpact: "Permite programar rutinas de control de calidad automáticas para validar el avance semanal.",
    technicalChecks: [
      { label: "Esquema ISO 19650", description: "Campos de Proyecto-Originador-Volumen-Nivel-Tipo-Especialidad." },
      { label: "Familia y Tipos Limpios", description: "Erradicación absoluta de sufijos temporales como '_copia' o '_Final'." }
    ]
  },
  {
    id: "salud",
    num: "1.4",
    title: "Salud Técnica del Modelo",
    badge: "Garantía de Calidad",
    badgeColor: "text-red-400 bg-red-500/10 border-red-500/20",
    borderColor: "border-red-500/30",
    glowColor: "rgba(239,68,68,0.2)",
    icon: ShieldAlert,
    summary: "Evaluaciones patológicas de colisiones, desconexiones, duplicados y basura virtual.",
    description: "El contratista asume la responsabilidad contractual de entregar archivos limpios e integrados. El software de control ejecutará pruebas automatizadas para detectar fallas patológicas antes de liberar cualquier hito de pago por servicio de diseño.",
    severity: "CRÍTICO",
    severityColor: "text-red-400 border-red-500/30 bg-red-500/5",
    contractualImpact: "Evita que las fallas del modelo se hereden a la construcción real, previniendo sobrecostos catastróficos.",
    technicalChecks: [
      { label: "Desconexiones MEP", description: "Búsqueda de tuberías o ductos abiertos o sueltos en el vacío." },
      { label: "Colisiones Físicas", description: "Cruces no coordinados entre estructuras y redes (Clash Detection)." },
      { label: "Duplicados Geométricos", description: "Elementos idénticos apilados en el mismo punto que inflan los metrados." },
      { label: "Limpieza de Basura", description: "Purga de familias descontinuadas, vistas temporales y avisos críticos de Revit." }
    ]
  },
  {
    id: "usos",
    num: "1.5",
    title: "Parámetros por Usos BIM",
    badge: "Usos Especiales",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    borderColor: "border-pink-500/30",
    glowColor: "rgba(244,63,94,0.2)",
    icon: Sliders,
    summary: "Parámetros específicos mandatorios para alimentar dimensiones 4D (Planificación) o 5D (Presupuestos).",
    description: "Dependiendo de los objetivos declarados en el contrato (por ejemplo, si el uso es Simulación de Plazos 4D o Modelado Térmico 6D), el contratista tiene la obligación de inyectar propiedades específicas y normadas en las categorías de los elementos involucrados.",
    severity: "OBLIGATORIO",
    severityColor: "text-amber-400 border-amber-400/30 bg-amber-400/5",
    contractualImpact: "Permite una transición fluida al presupuesto sin reformular los entregables mecánicos.",
    technicalChecks: [
      { label: "Parámetros de Plazos / Fases", description: "Asignación obligatoria de ID de tareas de MS Project / Primavera." },
      { label: "Conductividad Térmica", description: "Información nativa de transmitancia para simulaciones energéticas." }
    ]
  },
  {
    id: "cde",
    num: "1.6",
    title: "Entrega Formal en el CDE",
    badge: "Garantía de Recepción",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    borderColor: "border-emerald-500/30",
    glowColor: "rgba(16,185,129,0.2)",
    icon: FolderKey,
    summary: "Se desconoce cualquier entrega efectuada fuera de los canales rígidos comunes.",
    description: "No se convalidará ninguna entrega de modelos realizada por canales informales (tales como correos directos, plataformas de chat o transferencias físicas). El hito de entrega oficial solo se considera contractualmente recibido y registrado una vez superado el control de puerta en el Entorno Común de Datos (CDE) asignado.",
    severity: "CRÍTICO",
    severityColor: "text-red-400 border-red-500/30 bg-red-500/5",
    contractualImpact: "Sostiene el orden jurídico en los plazos de entrega y previene reclamos de retraso espurios.",
    technicalChecks: [
      { label: "Estado Publicado Real", description: "Envío formal a la carpeta oficial de aprobación del mandante." },
      { label: "Firma Digital y Hash", description: "Registro inmutable del hash del archivo para salvaguardar manipulaciones." }
    ]
  }
];

interface DetailingImage {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  description: string;
  annotations: string[];
}

const DETAIL_IMAGES: DetailingImage[] = [
  {
    id: "real-chair",
    title: "1. Silla de Referencia o Guía (Mobiliario)",
    subtitle: "Especificación dimensional que se debe modelar",
    src: "",
    description: "Se utiliza el producto real como referencia espacial basándose únicamente en sus dimensiones máximas, ergonomía de contornos generales y altura de uso. Se debe evitar capturar detalles decorativos de marca, costuras de cuero o herrajes menores que no aporten a la coordinación.",
    annotations: [
      "Definición de altura del asiento y rango máximo de ocupación ergonómica.",
      "Límite máximo horizontal de los apoyabrazos para coordinar espacios de paso.",
      "Diámetro exterior proyectado de la base estrella para evitar colisiones en planta."
    ]
  },
  {
    id: "properties",
    title: "2. Propiedades de Tipo (Revit UI)",
    subtitle: "Parámetros redundantes y sobredimensionados",
    src: "",
    description: "Exceso de metadatos e información no-gráfica inyectada en la familia de Revit. Muestra una cantidad exagerada de parámetros textuales, URLs comerciales secundarias y metadatos innecesarios que inflan el archivo de base de datos sin aportar valor al proyecto.",
    annotations: [
      "Parámetros redundantes de lanzamientos comerciales, distribuidores y textos publicitarios.",
      "Múltiples opciones de gama cargadas en bloque en lugar de parametrizarse por tipo limpio.",
      "Inyección innecesaria de especificaciones exclusivas de fábrica que no regulan interferencia espacial."
    ]
  },
  {
    id: "bim-model",
    title: "3. Modelo Sobre-modelado (LOD Ineficiente)",
    subtitle: "Exageración de detalle geométrico e inútil",
    src: "",
    description: "Modelado con un exceso perjudicial de detalle gráfico (LOD 450+). El diseño tridimensional hiperdetallado de manguitos, roscas interiores de tornillos, engranajes o resortes de pistón no visibles satura el visor de obra y ralentiza dramáticamente el visor 3D.",
    annotations: [
      "Modelado inútil de roscas espirales de tornillos de unión inferiores.",
      "Rebajes micrométricos, muelles flexibles y rodamientos interiores de ruedas.",
      "Saturación de polígonos innecesarios que inflan el archivo más de 10 veces de lo permitido."
    ]
  },
  {
    id: "matrix-table",
    title: "4. Matriz de Códigos BIM",
    subtitle: "Nomenclatura y gobernanza de mobiliario",
    src: "",
    description: "Reglas de control de calidad contractuales para la validación del modelo. Asegura que cada pieza de mobiliario incluya únicamente los identificadores esenciales (LOD/LOIN acordado) sin sobrecargar de detalles.",
    annotations: [
      "Codificación limpia del RA-MG.01 al RA-MG.E07.",
      "Asociación ordenada de subproyectos y niveles de restricción.",
      "Prevención estricta de componentes de manufactura sobredimensionados."
    ]
  }
];

// --- High Fidelity Data for Revit properties panel simulation ---
const REVIT_PARAMS = [
  { group: "Restricciones", name: "Elevación por defecto (Estándar innecesario)", value: "1.2192 m" },
  { group: "Materiales y acabados", name: "Material de pistón (Innecesario)", value: "Acero Cromado Brillo Espejo" },
  { group: "Materiales y acabados", name: "Material de brazos (Innecesario)", value: "Poliamida blanca texturada" },
  { group: "Costuras físicas de malla (Innecesario)", name: "Tipo de hilo para costura de tela", value: "Hilo de Nylon de alta resistencia" },
  { group: "Datos de identidad", name: "Nombre del diseñador original (REDUNDANTE)", value: "Jorge Pensi" },
  { group: "Datos de identidad", name: "Estudio de diseño responsable (REDUNDANTE)", value: "Jorge Pensi Design Studio" },
  { group: "Datos de identidad", name: "Página web de compra del distribuidor (REDUNDANTE)", value: "https://comercial-mobiliario.com/seating/" },
  { group: "Datos de identidad", name: "Enlace a plano en PDF comercial (REDUNDANTE)", value: "https://comercial-mobiliario.com/downloads/catalogo.pdf" },
  { group: "Datos de identidad", name: "País de fabricación origen (REDUNDANTE)", value: "Unión Europea" },
  { group: "Datos de identidad", name: "Instrucciones de mantenimiento de fábrica (REDUNDANTE)", value: "Limpiar con paño húmedo libre de solventes" },
  { group: "Datos de identidad", name: "Año de lanzamiento del modelo (REDUNDANTE)", value: "2021" },
  { group: "Datos de identidad", name: "Descripción comercial publicitaria (REDUNDANTE)", value: "Una silla estelar para oficinas modernas que inspira productividad, diseño ergonómico y fluidez de posturas en el entorno de trabajo corporativo." },
  { group: "Parámetros IFC", name: "Código OmniClass", value: "23.21.13.11" },
  { group: "Parámetros IFC", name: "GUID de Tipo Global", value: "0GOVRuV6v0huWM7mxog41$" },
  { group: "Otras opciones de catálogo cargadas de más", name: "Opción de brazo regulable tipo 1 (SOBREDIMENSIONADO)", value: "Brazo 2D" },
  { group: "Otras opciones de catálogo cargadas de más", name: "Opción de brazo regulable tipo 2 (SOBREDIMENSIONADO)", value: "Brazo 3D" },
  { group: "Otras opciones de catálogo cargadas de más", name: "Opción de brazo regulable tipo 3 (SOBREDIMENSIONADO)", value: "Brazo 4D" },
  { group: "Otras opciones de catálogo cargadas de más", name: "Opción de base pulida (SOBREDIMENSIONADO)", value: "Base Aluminio" },
  { group: "Otras opciones de catálogo cargadas de más", name: "Opción de ruedas blindadas (SOBREDIMENSIONADO)", value: "Ruedas de goma blandas" },
];

const BIM_RULES = [
  { code: "RA-MG.01", title: "Nomenclatura de mobiliario", status: "Activo", desc: "Revisar que las familias se encuentren codificadas según la nomenclatura estandarizada." },
  { code: "RA-MG.02", title: "Familia de repositorio", status: "Activo", desc: "Usar la familia correcta, descargada desde el repositorio homologado del fabricante." },
  { code: "RA-MG.03", title: "Niveles de mobiliario general", status: "Activo", desc: "Garantizar que los elementos se encuentren asignados a los niveles y elevaciones correctos." },
  { code: "RA-MG.04", title: "Subproyectos de mobiliario", status: "Activo", desc: "Verificar que los elementos se encuentren en el subproyecto de mobiliario correspondiente." },
  { code: "RA-MG.05", title: "Materialidad de mobiliario", status: "Activo", desc: "Asegurar que la materialidad de las partes configuradas corresponda con el pliego real." },
  { code: "RA-MG.06", title: "Colisiones de mobiliario", status: "Activo", desc: "Gestionar interferencias, evitando colisiones físicas con muros, tabiquerías o ductos MEP." },
  { code: "RA-MG.07", title: "Integridad dimensional", status: "Activo", desc: "Mantener dimensiones y proporciones de los elementos fieles a las especificaciones físicas." },
  { code: "RA-MG.E07", title: "Clasificación adicional", status: "Activo", desc: "Inyectar la reclasificación adicional obligatoria para la catalogación de activos." },
];

// --- High Fidelity Data for BIM Uses Analytical Dashboard (Quantities and Budgets) ---
interface DashboardRow {
  levelId: string;
  category: "Armazón" | "Escaleras" | "Muros" | "Suelos";
  element: string;
  material: string;
  longitud: number | "-";
  area: number | "-";
  volumen: number;
}

const DASHBOARD_DATA: DashboardRow[] = [
  // level 1: CIM
  { levelId: "1_CIM", category: "Armazón", element: "BORDILLO DE FUNDACIÓN", material: "Concreto 3000", longitud: 35.40, area: "-", volumen: 0.15 },
  { levelId: "1_CIM", category: "Armazón", element: "BORDILLO - (0.12X0.40)", material: "Concreto 3000", longitud: 107.68, area: "-", volumen: 3.79 },
  { levelId: "1_CIM", category: "Armazón", element: "SOBREANCHO_CIM", material: "Concreto 3000", longitud: 7.61, area: "-", volumen: 0.52 },
  { levelId: "1_CIM", category: "Armazón", element: "SOBREANCHO_CIM1", material: "Concreto 3000", longitud: 4.47, area: "-", volumen: 0.45 },
  { levelId: "1_CIM", category: "Suelos", element: "LOSA DE CIMENTACIÓN C-1", material: "Concreto 3000", longitud: "-", area: 245.50, volumen: 61.37 },
  
  // level 2: P2
  { levelId: "2_P2", category: "Armazón", element: "COLUMNA C-30X30", material: "Concreto 4000", longitud: 3.20, area: "-", volumen: 1.15 },
  { levelId: "2_P2", category: "Armazón", element: "COLUMNA CORRIDA P1", material: "Concreto 4000", longitud: 3.20, area: "-", volumen: 1.15 },
  { levelId: "2_P2", category: "Armazón", element: "VIGA VC- (0.20X1.00)", material: "Concreto 3000", longitud: 3.02, area: "-", volumen: 0.41 },
  { levelId: "2_P2", category: "Armazón", element: "VIGA VC- (0.30X1.00)", material: "Concreto 3000", longitud: 259.41, area: "-", volumen: 55.01 },
  { levelId: "2_P2", category: "Muros", element: "MURO DE CONTENCIÓN E=0.25", material: "Concreto 4000", longitud: 12.40, area: 31.00, volumen: 7.75 },
  { levelId: "2_P2", category: "Suelos", element: "LOSA ALIGERADA P2", material: "Concreto 3000", longitud: "-", area: 180.40, volumen: 27.06 },
  { levelId: "2_P2", category: "Escaleras", element: "ESCALERA CENTRAL SECC.1", material: "Concreto 3000", longitud: "-", area: 14.50, volumen: 2.18 },

  // level 3: P3
  { levelId: "3_P3", category: "Armazón", element: "PHR C 150X50X2.0", material: "Acero A1011-Gr50", longitud: 72.50, area: "-", volumen: 0.04 },
  { levelId: "3_P3", category: "Armazón", element: "PHR C 220X80X2.5", material: "Acero A1011-Gr50", longitud: 54.82, area: "-", volumen: 0.05 },
  { levelId: "3_P3", category: "Armazón", element: "PHR C 220X80X3.0", material: "Acero A1011-Gr50", longitud: 11.17, area: "-", volumen: 0.01 },
  { levelId: "3_P3", category: "Armazón", element: "R- (0.10X0.25)", material: "Concreto 3000", longitud: 31.19, area: "-", volumen: 0.40 },
  { levelId: "3_P3", category: "Armazón", element: "VIGA DE AMARRE V-102", material: "Concreto 3000", longitud: 42.15, area: "-", volumen: 2.15 },
  { levelId: "3_P3", category: "Muros", element: "MURO ESCALA H=2.70 E=0.15", material: "Concreto 3000", longitud: 18.50, area: 49.95, volumen: 7.49 },
  { levelId: "3_P3", category: "Suelos", element: "DETALLE DE RAMPA 01", material: "Concreto 3000", longitud: "-", area: 34.20, volumen: 5.13 },
  { levelId: "3_P3", category: "Escaleras", element: "ESCALERA CENTRAL SECC.2", material: "Concreto 3000", longitud: "-", area: 14.50, volumen: 2.18 },

  // level 4: P4
  { levelId: "4_P4", category: "Armazón", element: "COLUMNA C-30X30", material: "Concreto 4000", longitud: 3.20, area: "-", volumen: 1.15 },
  { levelId: "4_P4", category: "Armazón", element: "VIGA VC- (0.30X1.00)", material: "Concreto 3000", longitud: 245.10, area: "-", volumen: 51.20 },
  { levelId: "4_P4", category: "Muros", element: "MURO PERIMETRAL P4", material: "Concreto 3000", longitud: 45.00, area: 121.50, volumen: 18.23 },
  { levelId: "4_P4", category: "Suelos", element: "LOSA MACIZA E=0.15", material: "Concreto 3000", longitud: "-", area: 195.00, volumen: 29.25 },

  // level 5: P5
  { levelId: "5_P5", category: "Armazón", element: "VIGA VC- (0.30X1.00)", material: "Concreto 3000", longitud: 245.10, area: "-", volumen: 51.20 },
  { levelId: "5_P5", category: "Suelos", element: "LOSA MACIZA E=0.15", material: "Concreto 3000", longitud: "-", area: 195.00, volumen: 29.25 },
  { levelId: "5_P5", category: "Muros", element: "MURO PERIMETRAL P5", material: "Concreto 3000", longitud: 45.00, area: 121.50, volumen: 18.23 },

  // level 6: P6
  { levelId: "6_P6", category: "Armazón", element: "VIGA VC- (0.20X0.80)", material: "Concreto 3000", longitud: 122.40, area: "-", volumen: 19.58 },
  { levelId: "6_P6", category: "Armazón", element: "COLUMNA C-25X25", material: "Concreto 4000", longitud: 3.25, area: "-", volumen: 0.81 },
  { levelId: "6_P6", category: "Muros", element: "MURO ALIVIANADO P6", material: "Concreto 3000", longitud: 30.50, area: 82.35, volumen: 8.24 },
  { levelId: "6_P6", category: "Suelos", element: "SUELO DE COCHERA AUX", material: "Concreto 3000", longitud: "-", area: 45.00, volumen: 0.90 },

  // level 7: P7
  { levelId: "7_P7", category: "Armazón", element: "VIGA VC- (0.20X0.80)", material: "Concreto 3000", longitud: 122.40, area: "-", volumen: 19.58 },
  { levelId: "7_P7", category: "Suelos", element: "LOSA MACIZA TIPO B", material: "Concreto 3000", longitud: "-", area: 155.00, volumen: 23.25 },

  // level 8: P8
  { levelId: "8_P8", category: "Armazón", element: "VIGA VC- (0.20X0.80)", material: "Concreto 3000", longitud: 122.40, area: "-", volumen: 19.58 },
  { levelId: "8_P8", category: "Suelos", element: "LOSA MACIZA TIPO B", material: "Concreto 3000", longitud: "-", area: 155.00, volumen: 23.25 },

  // level 9: P9
  { levelId: "9_P9", category: "Armazón", element: "VIGA VC- (0.20X0.80)", material: "Concreto 3000", longitud: 122.40, area: "-", volumen: 19.58 },
  { levelId: "9_P9", category: "Suelos", element: "LOSA MACIZA TIPO B", material: "Concreto 3000", longitud: "-", area: 155.00, volumen: 23.25 },

  // level 10: CUB
  { levelId: "10_CUB", category: "Armazón", element: "VIGA CUBIERTA VC-1", material: "Concreto 3000", longitud: 95.10, area: "-", volumen: 11.41 },
  { levelId: "10_CUB", category: "Suelos", element: "LOSA INCLINADA CUBIERTA", material: "Concreto 3000", longitud: "-", area: 125.00, volumen: 18.75 },

  // level 11: CUB_MAQ
  { levelId: "11_CUB_MAQ", category: "Armazón", element: "PEDESTALES DE SOPORTE", material: "Concreto 4000", longitud: 1.50, area: "-", volumen: 0.95 },
  { levelId: "11_CUB_MAQ", category: "Suelos", element: "LOSA EQUIPO CHILLER", material: "Concreto 3000", longitud: "-", area: 18.00, volumen: 2.70 }
];

const USOS_LEVELS = [
  { id: "all", label: "Vista General (Todos)" },
  { id: "1_CIM", label: "1. CIM - NE 0.00" },
  { id: "10_CUB", label: "10. CUB - NE+22.86" },
  { id: "11_CUB_MAQ", label: "11. CUB-MAQ" },
  { id: "2_P2", label: "2. P2 - NE+2.70" },
  { id: "3_P3", label: "3. P3 - NE+5.22" },
  { id: "4_P4", label: "4. P4 - NE+7.74" },
  { id: "5_P5", label: "5. P5 - NE+10.26" },
  { id: "6_P6", label: "6. P6 - NE+12.78" },
  { id: "7_P7", label: "7. P7 - NE+15.30" },
  { id: "8_P8", label: "8. P8 - NE+17.82" },
  { id: "9_P9", label: "9. P9 - NE+20.34" }
];

// --- Pure SVG High Fidelity Office Chair Representation ---
const ChairSvgMatrix = ({ colorBack = "#ef4444", colorSeat = "#1c1917", isWireframe = false, rotation = 0 }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className="w-full h-full max-h-[350px] drop-shadow-2xl transition-transform duration-500 ease-out select-none"
      style={{ transform: `rotateY(${rotation}deg)` }}
    >
      <defs>
        {/* Red Mesh Pattern */}
        <pattern id="meshRedPat" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke={colorBack} strokeWidth="0.8" strokeOpacity="0.45" />
        </pattern>
        {/* Cyan Wireframe Mesh Pattern */}
        <pattern id="wireframeGrid" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#2563eb" strokeWidth="0.6" strokeOpacity="0.3" />
        </pattern>
      </defs>

      <g transform="translate(0, -5)">
        {/* Chair Backrest Back Support Column bracket - black */}
        <path 
          d="M 95,95 L 95,120 L 105,120 L 105,95 Z" 
          fill={isWireframe ? "none" : "#1e293b"} 
          stroke={isWireframe ? "#3b82f6" : "#0f172a"} 
          strokeWidth="1.2" 
        />

        {/* Chair Backrest Ring Frame */}
        <path 
          d="M 65,35 C 65,15 135,15 135,35 L 128,100 C 128,106 72,106 72,100 Z" 
          fill={isWireframe ? "rgba(96,165,250,0.05)" : "#0f172a"} 
          stroke={isWireframe ? "#60a5fa" : "#334155"} 
          strokeWidth="2.2" 
        />
        
        {/* Inner Mesh Net Backrest */}
        <path 
          d="M 70,40 C 70,22 130,22 130,40 L 124,96 C 124,101 76,101 76,96 Z" 
          fill={isWireframe ? "url(#wireframeGrid)" : "url(#meshRedPat)"} 
          stroke={isWireframe ? "#2563eb" : "#ef4444"} 
          strokeWidth={isWireframe ? "1.5" : "0.5"} 
        />
        
        {/* Modern technical curved lumbar support band */}
        <path 
          d="M 72,80 C 72,80 100,74 128,80 L 127,90 C 127,90 100,83 73,90 Z" 
          fill={isWireframe ? "none" : "#1e293b"} 
          stroke={isWireframe ? "#60a5fa" : "#2e3a50"} 
          strokeWidth="1" 
        />

        {/* Thick elegant seat cushion */}
        <path 
          d="M 52,102 C 55,102 145,102 148,102 C 154,108 153,122 144,126 C 110,128 90,128 56,126 C 47,122 46,108 52,102 Z" 
          fill={isWireframe ? "rgba(59,130,246,0.1)" : colorSeat} 
          stroke={isWireframe ? "#3b82f6" : "#292524"} 
          strokeWidth="2" 
        />

        {/* Elegant looping armrests */}
        {/* Left Armrest */}
        <path 
          d="M 48,104 C 42,100 40,65 52,65 C 59,65 58,103 58,103" 
          fill="none" 
          stroke={isWireframe ? "#60a5fa" : "#cbd5e1"} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        {/* Right Armrest */}
        <path 
          d="M 152,104 C 158,100 160,65 148,65 C 141,65 142,103 142,103" 
          fill="none" 
          stroke={isWireframe ? "#60a5fa" : "#cbd5e1"} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />

        {/* Support Steel column / Piston beneath cushion */}
        <rect 
          x="97" 
          y="126" 
          width="6" 
          height="32" 
          fill={isWireframe ? "none" : "#cbd5e1"} 
          stroke={isWireframe ? "#60a5fa" : "#64748b"} 
          strokeWidth="1.2" 
        />
        {/* Decorative black cylinder collar */}
        <rect 
          x="94" 
          y="127" 
          width="12" 
          height="14" 
          fill={isWireframe ? "none" : "#1e293b"} 
          stroke={isWireframe ? "#2563eb" : "#0f172a"} 
          strokeWidth="1.2" 
        />

        {/* Star Leg Base (Isometric perspective projection) */}
        {/* Central hub */}
        <ellipse 
          cx="100" 
          cy="158" 
          rx="10" 
          ry="4" 
          fill={isWireframe ? "none" : "#64748b"} 
          stroke={isWireframe ? "#60a5fa" : "#475569"} 
          strokeWidth="1.2" 
        />
        
        {/* Hub to Leg extensions */}
        {/* Straight Down */}
        <path d="M 100,158 L 100,172" fill="none" stroke={isWireframe ? "#3b82f6" : "#cbd5e1"} strokeWidth="3.5" strokeLinecap="round" />
        {/* Left Back */}
        <path d="M 94,157 L 70,153" fill="none" stroke={isWireframe ? "#2563eb" : "#94a3b8"} strokeWidth="3.6" strokeLinecap="round" />
        {/* Right Back */}
        <path d="M 106,157 L 130,153" fill="none" stroke={isWireframe ? "#2563eb" : "#94a3b8"} strokeWidth="3.6" strokeLinecap="round" />
        {/* Left Front */}
        <path d="M 94,159 L 63,168" fill="none" stroke={isWireframe ? "#3b82f6" : "#cbd5e1"} strokeWidth="3.8" strokeLinecap="round" />
        {/* Right Front */}
        <path d="M 106,159 L 137,168" fill="none" stroke={isWireframe ? "#3b82f6" : "#cbd5e1"} strokeWidth="3.8" strokeLinecap="round" />

        {/* Cast Wheels at ends of legs */}
        <circle cx="100" cy="176" r="4.5" fill={isWireframe ? "none" : "#0f172a"} stroke={isWireframe ? "#60a5fa" : "#64748b"} strokeWidth="1" />
        <circle cx="68" cy="154" r="4.5" fill={isWireframe ? "none" : "#0f172a"} stroke={isWireframe ? "#60a5fa" : "#64748b"} strokeWidth="1" />
        <circle cx="132" cy="154" r="4.5" fill={isWireframe ? "none" : "#0f172a"} stroke={isWireframe ? "#60a5fa" : "#64748b"} strokeWidth="1" />
        <circle cx="61" cy="171" r="4.5" fill={isWireframe ? "none" : "#0f172a"} stroke={isWireframe ? "#60a5fa" : "#64748b"} strokeWidth="1" />
        <circle cx="139" cy="171" r="4.5" fill={isWireframe ? "none" : "#0f172a"} stroke={isWireframe ? "#60a5fa" : "#64748b"} strokeWidth="1" />
      </g>
    </svg>
  );
};

export const ContratosBimSlide = () => {
  const [selectedId, setSelectedId] = useState<string>("loin");
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [paramSearch, setParamSearch] = useState("");
  const [rulesSearch, setRulesSearch] = useState("");
  const [chairRotation, setChairRotation] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [georrefViewMode, setGeorrefViewMode] = useState<string>("survey");
  const [georrefNorthAngle, setGeorrefNorthAngle] = useState<number>(15);
  const [georrefNS, setGeorrefNS] = useState<number>(964700.0000);
  const [georrefEO, setGeorrefEO] = useState<number>(923500.0000);
  const [georrefElev, setGeorrefElev] = useState<number>(282.6300);
  const [isGeorrefMaximized, setIsGeorrefMaximized] = useState<boolean>(false);

  // States for interactive BIM parameters / usos dashboard
  const [isUsosMaximized, setIsUsosMaximized] = useState<boolean>(false);
  const [selectedUsosCategories, setSelectedUsosCategories] = useState<string[]>(["Armazón", "Muros", "Suelos"]);
  const [selectedUsosConcretes, setSelectedUsosConcretes] = useState<string[]>(["Concreto 3000", "Concreto 4000"]);
  const [selectedUsosLevel, setSelectedUsosLevel] = useState<string>("3_P3");
  const [areParamsFilled, setAreParamsFilled] = useState<boolean>(true);

  const activeClause = CLAUSES_DATA.find(c => c.id === selectedId) || CLAUSES_DATA[0];

  const renderPreview = (id: string) => {
    switch (id) {
      case "properties":
        return (
          <div className="flex flex-col gap-1 w-full h-full p-2.5 justify-center opacity-45 group-hover:opacity-75 transition-opacity font-mono">
            <span className="text-[7.5px] text-amber-500 font-bold uppercase tracking-tight">[Propiedades Revit]</span>
            <div className="space-y-0.5 mt-1">
              <div className="flex justify-between text-[6px] text-slate-500"><span className="truncate">OmniClass:</span> <span className="text-white truncate">23.21.13.00</span></div>
              <div className="flex justify-between text-[6px] text-slate-500"><span className="truncate">IfcGUID:</span> <span className="text-amber-400 truncate">0GOVRuV6...</span></div>
              <div className="flex justify-between text-[6px] text-slate-500"><span className="truncate">Op-Brazos:</span> <span className="text-red-400 truncate font-bold">Sobredimensionados ⚠</span></div>
            </div>
          </div>
        );
      case "matrix-table":
        return (
          <div className="flex flex-col gap-1 w-full h-full p-2.5 justify-center opacity-45 group-hover:opacity-75 transition-opacity font-mono">
            <span className="text-[7.5px] text-pink-400 font-bold uppercase tracking-tight">[Matriz de Control]</span>
            <div className="space-y-0.5 mt-1">
              <div className="flex justify-between text-[6px] text-slate-500"><span>RA-MG.01</span> <span className="text-emerald-500 font-bold">✔ OK</span></div>
              <div className="flex justify-between text-[6px] text-slate-500"><span>RA-MG.02</span> <span className="text-emerald-500 font-bold">✔ OK</span></div>
              <div className="flex justify-between text-[6px] text-slate-500"><span>RA-MG.03</span> <span className="text-emerald-500 font-bold">✔ OK</span></div>
            </div>
          </div>
        );
      case "real-chair":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-45 group-hover:opacity-75 transition-all py-1">
            <div className="w-12 h-12">
              <ChairSvgMatrix colorBack="#ef4444" colorSeat="#18181b" isWireframe={false} rotation={22} />
            </div>
            <span className="text-[6.5px] font-mono text-slate-400 mt-1 uppercase tracking-wider font-bold">Silla que se Debe Modelar</span>
          </div>
        );
      case "bim-model":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-45 group-hover:opacity-75 transition-all py-1">
            <div className="w-12 h-12">
              <ChairSvgMatrix colorBack="#3b82f6" colorSeat="#334155" isWireframe={true} rotation={22} />
            </div>
            <span className="text-[6.5px] font-mono text-red-400 mt-1 uppercase tracking-wider font-bold">LOD 450 (Sobre-modelado ⚠)</span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFullComponent = (id: string) => {
    if (id === "properties") {
      const filteredParams = paramSearch.trim() === "" 
        ? REVIT_PARAMS 
        : REVIT_PARAMS.filter(item => 
            item.name.toLowerCase().includes(paramSearch.toLowerCase()) || 
            item.value.toLowerCase().includes(paramSearch.toLowerCase()) || 
            item.group.toLowerCase().includes(paramSearch.toLowerCase())
          );

      return (
        <div className="w-full h-full flex flex-col text-slate-300 font-sans p-4 overflow-hidden bg-[#0d111d] max-h-[45vh] md:max-h-[75vh]">
          {/* Mock Revit properties titlebar */}
          <div className="bg-[#1b2234] border border-white/10 p-2 text-[10px] font-mono text-slate-300 flex justify-between items-center rounded-t-sm select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-pink-500" />
              <span className="font-bold uppercase tracking-tight text-white">Análisis de Metadatos de Tipo</span>
            </div>
            <span className="text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-xs">Silla_Mobiliario_Sobredimensionado.rfa</span>
          </div>

          <div className="bg-[#0f1422] border border-t-0 border-white/10 p-2.5 flex flex-col md:flex-row gap-4 flex-1 overflow-hidden min-h-0">
            {/* Properties parameters column */}
            <div className="flex-1 flex flex-col min-h-0 bg-[#07090f]/60 rounded-xs border border-white/5 p-2 overflow-hidden">
              {/* Internal filters */}
              <div className="relative mb-2 shrink-0">
                <input 
                  type="text" 
                  value={paramSearch}
                  onChange={(e) => setParamSearch(e.target.value)}
                  placeholder="🔍 Buscar parámetro de tipo..." 
                  className="w-full bg-[#121828] border border-white/10 rounded-sm py-1 px-2 text-[10px] focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white font-mono placeholder-slate-500"
                />
                {paramSearch && (
                  <button 
                    onClick={() => setParamSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-[9px] hover:bg-white/10 px-1.5 rounded-full p-0 leading-none"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Param table */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 font-mono text-[9px]">
                {["Restricciones", "Materiales y acabados", "Datos de identidad", "Parámetros IFC", "Otra"].map(grp => {
                  const itemsInGroup = filteredParams.filter(p => p.group === grp);
                  if (itemsInGroup.length === 0) return null;
                  return (
                    <div key={grp} className="space-y-1">
                      <div className="text-[8px] font-black text-pink-400 uppercase tracking-widest bg-white/2 px-1.5 py-0.5 border-l border-pink-500 select-none">
                        {grp}
                      </div>
                      <div className="divide-y divide-white/5 border border-white/5 bg-black/20 rounded-xs">
                        {itemsInGroup.map((item, pIdx) => (
                          <div key={pIdx} className="flex justify-between items-start p-1.5 hover:bg-white/2 transition-colors">
                            <span className="text-slate-400 font-medium break-all pr-2">{item.name}</span>
                            <span className="text-white text-right break-all max-w-[65%] leading-tight font-semibold selection:bg-pink-500/30 selection:text-white" title={item.value}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {filteredParams.length === 0 && (
                  <div className="p-8 text-center text-slate-500 text-[10px] italic">
                    No se encontraron parámetros que coincidan con '{paramSearch}'
                  </div>
                )}
              </div>
            </div>

            {/* Viewport mini illustration columns */}
            <div className="w-full md:w-36 shrink-0 flex flex-col justify-between items-center bg-[#07090f]/60 rounded-xs border border-white/5 p-3 select-none text-left">
              <div className="w-full text-center border-b border-white/5 pb-1.5">
                <span className="text-[7.5px] font-black text-amber-500 uppercase tracking-widest block font-mono bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-400">DIFUSIÓN EXCESIVA</span>
              </div>
              <div className="w-24 h-24 my-1">
                <ChairSvgMatrix colorBack="#ef4444" colorSeat="#18181b" isWireframe={false} rotation={30} />
              </div>
              <div className="w-full space-y-1 text-center font-mono text-[7px] text-slate-500 leading-tight">
                <div className="text-amber-500 font-bold uppercase">Sobredimensionado</div>
                <div>Metadata Redundante ⚠</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === "matrix-table") {
      const filteredRules = rulesSearch.trim() === ""
        ? BIM_RULES
        : BIM_RULES.filter(r => 
            r.code.toLowerCase().includes(rulesSearch.toLowerCase()) ||
            r.title.toLowerCase().includes(rulesSearch.toLowerCase()) ||
            r.desc.toLowerCase().includes(rulesSearch.toLowerCase())
          );

      return (
        <div className="w-full h-full flex flex-col text-slate-300 font-sans p-4 overflow-hidden bg-[#0d111d] max-h-[45vh] md:max-h-[75vh]">
          {/* Header */}
          <div className="mb-3 flex justify-between items-center border-b border-white/10 pb-2.5 shrink-0 select-none">
            <div className="flex flex-col">
              <span className="text-[#deb887] text-[8px] font-mono tracking-widest font-black uppercase">Filtros y Auditoría de Admisibilidad</span>
              <span className="text-sm font-black text-white uppercase italic leading-none mt-0.5 font-sans">Matriz de Códigos BIM</span>
            </div>
            
            {/* Search Input */}
            <div className="relative w-40 md:w-48 shrink-0">
              <input 
                type="text" 
                value={rulesSearch}
                onChange={(e) => setRulesSearch(e.target.value)}
                placeholder="🔍 Filtrar reglas..." 
                className="w-full bg-[#121828] border border-white/10 rounded-sm py-1 px-2.5 text-[10px] focus:outline-none focus:border-[#deb887] focus:ring-1 focus:ring-[#deb887] text-white font-mono placeholder-slate-500"
              />
              {rulesSearch && (
                <button 
                  onClick={() => setRulesSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-[11px] hover:bg-white/10 px-1 rounded-full p-0 leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto bg-[#07090f]/60 rounded-xs border border-white/5 p-1 select-none">
            <table className="w-full text-left font-mono text-[9px] border-collapse min-w-[420px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-500 font-bold uppercase tracking-wider text-[7.5px] select-none bg-black/20 font-mono">
                  <th className="p-2 w-[18%]">Código</th>
                  <th className="p-2 w-[38%]">Título de Regla</th>
                  <th className="p-2 w-[14%] text-center">Estado</th>
                  <th className="p-2 w-[30%]">Descripción Operativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRules.map((rule) => (
                  <tr key={rule.code} className="hover:bg-white/2 transition-colors">
                    <td className="p-2 text-pink-400 font-bold">{rule.code}</td>
                    <td className="p-2 text-white font-semibold uppercase tracking-tight">{rule.title}</td>
                    <td className="p-2 text-center">
                      <span className="inline-block px-1.5 py-0.5 rounded-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[7px] font-bold uppercase tracking-wider font-mono">
                        {rule.status}
                      </span>
                    </td>
                    <td className="p-2 text-slate-400 leading-normal font-sans pr-4">{rule.desc}</td>
                  </tr>
                ))}
                {filteredRules.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 italic text-[10px]">
                      No hay reglas que coincidan con '{rulesSearch}'
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (id === "real-chair") {
      const hotspots = [
        { id: "back", cx: "100", cy: "60", r: "5", title: "Envolvente de Respaldo", desc: "El volumen general del respaldo debe modelarse de forma simplificada con una extrusión o cara curvada suave sin simular la malla física, hilos ni costuras. Solo se definen los límites tridimensionales máximos de ocupación." },
        { id: "arms", cx: "150", cy: "85", r: "5", title: "Planificación de Apoyabrazos", desc: "Los apoyabrazos deben representarse como cajas rígidas o formas barridas básicas para validación de holguras. No se deben modelar tornillos de fijación, herrajes de unión, ni chaflanes detallados de fabricación." },
        { id: "seat", cx: "100", cy: "116", r: "5", title: "Superficie de Asiento", desc: "El plano del asiento define el nivel de uso ergonómico. Debe ser una extrusión sólida limpia con un espesor constante aproximado, ignorando costuras o deformidades de textura." },
        { id: "piston", cx: "100", cy: "142", r: "5", title: "Cilindro Base del Pistón", desc: "Se modela como un simple cilindro extruido en el origen local (0,0,0) del componente. No se modelan resortes internos, válvulas neumáticas, cilindros concéntricos ni palancas de regulación." },
        { id: "base", cx: "115", cy: "162", r: "5", title: "Base de Apoyo y Holgura", desc: "La base se representa mediante un polígono extruido o una extrusión en estrella bidimensional simplificada para verificar colisiones con otros mobiliarios. Las ruedas se modelan como cilindros sin huella, frenos, ni rodamientos de bolas." }
      ];

      const currentHotspot = hotspots.find(h => h.id === activeHotspot);

      return (
        <div className="w-full h-full flex flex-col md:grid md:grid-cols-12 text-slate-300 font-sans p-4 overflow-hidden bg-[#0d111d] max-h-[45vh] md:max-h-[75vh]">
          {/* Main SVG Interactive Viewer (col-7) */}
          <div className="md:col-span-7 bg-[#05080f] rounded-xs border border-white/5 relative flex items-center justify-center p-4 min-h-[220px] select-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#deb887_1px,transparent_1px)] bg-[size:10px_10px] opacity-5"></div>
            
            <div className="w-full h-full max-h-[280px] flex items-center justify-center relative">
              <ChairSvgMatrix colorBack="#ef4444" colorSeat="#18181b" isWireframe={false} rotation={0} />
              
              {/* Hotspots layer overlays */}
              <svg className="absolute inset-0 w-full h-full pointer-events-auto" viewBox="0 0 200 200">
                {hotspots.map((hs) => {
                  const isHovered = activeHotspot === hs.id;
                  return (
                    <g key={hs.id} className="cursor-pointer" onClick={() => setActiveHotspot(hs.id)} onMouseEnter={() => setActiveHotspot(hs.id)}>
                      {/* Outer pulsing ring */}
                      <circle 
                        cx={hs.cx} 
                        cy={hs.cy} 
                        r={isHovered ? "9" : "6"} 
                        className={`fill-none stroke-pink-500 transition-all ${isHovered ? "stroke-[2.5px] opacity-100" : "opacity-50"}`} 
                      />
                      {/* Core point */}
                      <circle 
                        cx={hs.cx} 
                        cy={hs.cy} 
                        r="3" 
                        className={`fill-pink-500 hover:fill-white text-white shadow-xl transition-all ${isHovered ? "scale-125" : ""}`} 
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="absolute top-2.5 left-2.5 font-mono text-[7px] text-slate-500 leading-tight uppercase select-none">
              👉 Seleccione los puntos calientes para ver pautas de simplificación
            </div>
          </div>

          {/* Specs Output Detail Deck (col-5) */}
          <div className="md:col-span-5 flex flex-col justify-start p-3.5 space-y-3 md:border-l border-white/5 bg-[#080d16] text-left min-h-[140px] overflow-y-auto">
            <div className="border-b border-white/5 pb-2 shrink-0 animate-pulse">
              <span className="text-[7.5px] font-mono text-pink-400 tracking-widest block uppercase font-black">Criterios de Abstracción</span>
              <span className="text-[11.5px] font-black text-white uppercase mt-0.5">Silla de Referencia</span>
            </div>

            {currentHotspot ? (
              <div className="space-y-2 animate-fadeIn flex-1">
                <span className="text-[9px] font-black font-mono text-[#deb887] uppercase border-b border-[#deb887]/20 pb-0.5 inline-block">
                  {currentHotspot.title}
                </span>
                <p className="text-[10px] text-slate-300 leading-relaxed font-sans font-normal selection:bg-pink-500/30 selection:text-white">
                  {currentHotspot.desc}
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center py-4 text-slate-500 font-mono text-[9px] italic leading-normal">
                <Sliders className="w-5 h-5 text-slate-600 mb-2 animate-bounce" />
                Haga clic en los puntos interactivos para revelar las restricciones tridimensionales simplificadas.
              </div>
            )}

            <div className="pt-2 border-t border-white/5 space-y-0.5 text-[7px] font-mono text-slate-500 leading-tight shrink-0">
              <div>Estándar: Nivel de Información Geométrica LOIN</div>
              <div className="text-pink-500 font-bold">Optimización de Envolventes Espaciales</div>
            </div>
          </div>
        </div>
      );
    }

    if (id === "bim-model") {
      const bimSpecs = [
        { id: "bounding", name: "Caja de Bounding / Volumetría", val: "L: 640mm × W: 630mm × H: 1040mm" },
        { id: "polygon", name: "Complejidad Geométrica / LOD", val: "LOD 450+ (Exceso gráfico: roscas de tornillos, engranajes y costuras visibles)" },
        { id: "warnings", name: "Reporte de Advertencias Revit", val: "38 Advertencias de Rendimiento (Sobrecarga de polígonos)" },
        { id: "size", name: "Peso de Almacenamiento Familia", val: "18.4 MB (Crítico: El límite contractual es 1.5 MB)" },
        { id: "subproject", name: "Asociación de Subproyecto", val: "Saturación del CDE por componentes de manufactura" },
        { id: "level", name: "Nivel de Restricción Paramétrica", val: "Nivel de referencia incorrecto e inconsistente" }
      ];

      return (
        <div className="w-full h-full flex flex-col md:grid md:grid-cols-12 text-slate-300 font-sans p-4 overflow-hidden bg-[#0d111d] max-h-[45vh] md:max-h-[75vh]">
          {/* Main SVG Interactive Viewer (col-7) */}
          <div className="md:col-span-7 bg-[#020408] rounded-xs border border-white/5 relative flex flex-col items-center justify-between p-4 min-h-[220px] select-none overflow-hidden">
            {/* Engineering Grid wireframe */}
            <div className="absolute inset-0 bg-[#020408] bg-[linear-gradient(to_right,#3b0712_1px,transparent_1px),linear-gradient(to_bottom,#3b0712_1px,transparent_1px)] bg-[size:16px_16px] opacity-25"></div>
            
            {/* Viewport Crosshair decorations */}
            <div className="absolute top-1/2 left-3 right-3 h-px border-t border-dashed border-red-500/10 pointer-events-none"></div>
            <div className="absolute left-1/2 top-3 bottom-3 w-px border-l border-dashed border-red-500/10 pointer-events-none"></div>

            {/* Compass overlay */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 font-mono text-[7px] text-red-500 select-none">
              <Compass className="w-3.5 h-3.5 text-red-500 antialiased animate-spin" style={{ animationDuration: "8s" }} />
              <span className="text-red-400">ALERTA: SOBRE-MODELADO GRÁFICO RECURRENTE</span>
            </div>

            <div className="w-full h-full max-h-[240px] flex items-center justify-center relative z-10 my-1">
              <ChairSvgMatrix colorBack="#ef4444" colorSeat="#991b1b" isWireframe={true} rotation={chairRotation} />
              
              {/* Live coordinates labels floating */}
              <div className="absolute top-4 right-4 bg-[#18080b] border border-red-500/40 font-mono text-[7px] text-red-400 p-1.5 rounded-xs leading-none shadow-2xl">
                <div>Z-ROT: {chairRotation}°</div>
                <div className="mt-1 font-bold text-red-500">LOD-STATUS: RECHAZADO (450+)</div>
              </div>
            </div>

            {/* Live Slider Controller for 3D Orbit Rotator */}
            <div className="w-full bg-[#0a0d16] border border-white/5 rounded-sm p-1.5 flex items-center gap-3 relative z-10 shrink-0">
              <span className="text-[7px] font-mono text-slate-500 tracking-wider uppercase font-black whitespace-nowrap">Rotar Órbita Revit:</span>
              <input 
                type="range" 
                min="-180" 
                max="180" 
                value={chairRotation} 
                onChange={(e) => setChairRotation(parseInt(e.target.value))}
                className="flex-1 accent-red-500/80 bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
              />
              <span className="text-[8px] font-mono font-bold text-red-400 min-w-[32px] text-right">{chairRotation}°</span>
            </div>
          </div>

          {/* Specs Output Detail Deck (col-5) */}
          <div className="md:col-span-5 flex flex-col justify-between p-3.5 space-y-3 md:border-l border-white/5 bg-[#080d16] text-left min-h-[140px] overflow-y-auto">
            <div className="border-b border-red-500/20 pb-2 shrink-0">
              <span className="text-[7.5px] font-mono text-red-400 tracking-widest block uppercase font-black">Modelo BIM Defectuoso</span>
              <span className="text-[11.5px] font-black text-rose-500 uppercase mt-0.5">Exceso de Detalle 3D</span>
            </div>

            <div className="flex-1 space-y-2 text-[9px] font-mono">
              {bimSpecs.map((s, sIdx) => (
                <div key={sIdx} className="border-b border-white/5 pb-1 flex justify-between gap-4 items-start hover:bg-red-950/10 p-1 rounded-xs transition-all">
                  <span className="text-slate-500 text-left leading-snug font-medium select-none">{s.name}:</span>
                  <span className="text-white text-right leading-tight break-all font-semibold select-all" title={s.val}>{s.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-red-500/20 text-[7px] text-slate-500 leading-tight uppercase font-mono shrink-0">
              <div className="text-slate-500">VIOLA RESTRICCIONES CONTRACTUALES</div>
              <div className="text-red-500 font-bold mt-0.5">Modelo Hiper-Detallado Inútil (Rechazado)</div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (!activeImageId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageId(null);
      if (e.key === 'ArrowLeft') {
        const currentIndex = DETAIL_IMAGES.findIndex(i => i.id === activeImageId);
        const prevIndex = (currentIndex - 1 + DETAIL_IMAGES.length) % DETAIL_IMAGES.length;
        setActiveImageId(DETAIL_IMAGES[prevIndex].id);
      }
      if (e.key === 'ArrowRight') {
        const currentIndex = DETAIL_IMAGES.findIndex(i => i.id === activeImageId);
        const nextIndex = (currentIndex + 1) % DETAIL_IMAGES.length;
        setActiveImageId(DETAIL_IMAGES[nextIndex].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageId]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10 font-sans text-white"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div>
          <span className="text-pink-500 font-mono text-[9px] uppercase tracking-[0.4em] font-black">Clase 2: Contratos & Cláusulas</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1 italic">
            3. Gestión de Contratos <span className="text-white">y Cláusulas BIM</span>
          </h2>
          <p className="text-slate-400 text-xs">
            El contrato rige la validez legal del gemelo digital. Configura los parámetros mínimos exigibles para dar por recibido un entregable formalmente.
          </p>
        </div>
        <div className="bg-[#0c101a] px-4 py-2 border border-white/5 rounded-full flex items-center gap-2 shrink-0">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">Calidad Legal Indexada v2.0</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch min-h-0">
        
        {/* Left Side: interactive Legal Document (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-sm border border-white/10 bg-[#070b13] relative overflow-hidden shadow-2xl flex-1 flex flex-col justify-between min-h-[490px]">
            <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

            <div className="w-full flex items-center justify-between mb-3 relative z-10">
              <span className="text-[9px] font-black text-pink-500 font-mono tracking-widest uppercase">
                📝 ANEXO DE CUMPLIMIENTO BIM (ESPECIFICACIONES CONTRATUALES)
              </span>
              <span className="text-[8px] font-bold text-slate-500 font-mono uppercase bg-white/5 px-2 py-0.5 rounded-sm">
                6 CLÁUSULAS INDEXADAS
              </span>
            </div>

            {/* Legal Form Container Mockup */}
            <div className="bg-[#0b101c]/90 border border-white/10 rounded-sm p-4 relative z-10 flex-1 flex flex-col justify-between min-h-[360px]">
              {/* Paper header style */}
              <div className="border-b border-dashed border-white/20 pb-3 mb-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>ANEXO TÉCNICO: DEBERES DEL CONTRATISTA</span>
                  <span>REF. ISO 19650 SECCIÓN 5</span>
                </div>
                <h4 className="text-sm font-black text-white mt-1 uppercase tracking-tight">
                  SECCIÓN C. ESPECIFICACIONES TÉCNICAS CONTRACTUALES (ANEXO DE CALIDAD)
                </h4>
              </div>

              {/* Grid of the 6 Contract Checkpoint Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 mb-4">
                {CLAUSES_DATA.map((clause) => {
                  const isSelected = selectedId === clause.id;
                  const IconComp = clause.icon;
                  return (
                    <button
                      key={clause.id}
                      onClick={() => setSelectedId(clause.id)}
                      className={`text-left p-3 rounded-xs border transition-all duration-300 relative group flex gap-3 cursor-pointer select-none ${
                        isSelected 
                          ? `bg-[#0f1a2e] border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.15)]` 
                          : 'bg-white/2 border-white/5 hover:border-white/20 hover:bg-white/4'
                      }`}
                    >
                      {/* Interactive glow circle */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-mono mt-1 text-slate-500 font-bold">{clause.num}</span>
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex justify-between items-start gap-1">
                          <h5 className="text-[11.5px] font-black text-white uppercase tracking-tight truncate leading-tight mt-0.5">
                            {clause.title}
                          </h5>
                        </div>
                        <p className="text-[9.5px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                          {clause.summary}
                        </p>
                      </div>

                      {/* Small border arrow decorator */}
                      {isSelected && (
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 flex items-center justify-center">
                          <div className="w-2 h-2 rotate-45 bg-pink-500 " />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Informative Footer warning */}
              <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xs flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-[9.5px] text-slate-300 leading-snug font-sans">
                  <strong>IMPORTANTE:</strong> El incumplimiento severo de cualquiera de las cláusulas indexadas faculta a la supervisión para denegar la recepción del archivo, paralizando las órdenes de pago asociadas al hito correspondiente.
                </span>
              </div>
            </div>

            <div className="text-center text-[10.5px] text-slate-500 font-mono select-none uppercase tracking-wider relative z-10 pt-2">
              💡 Haga clic en cualquiera de las 6 cláusulas contractuales para desplegar los entregables, severidades e impactos técnicos.
            </div>

          </div>
        </div>

        {/* Right Side: Clause Audit Profile Detail Panel (5 columns) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="glass-panel p-6 rounded-sm border border-white/5 bg-[#090d16]/30 shadow-xl h-full flex flex-col justify-between min-h-[490px]">
            <div className="space-y-6 text-left flex flex-col justify-between h-full">

              <div className="space-y-5">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className={`text-[9.5px] font-mono font-black tracking-widest px-2.5 py-0.5 border rounded-xs uppercase ${activeClause.badgeColor}`}>
                    CLÁUSULA {activeClause.badge}
                  </span>
                  <div className={`text-[8.5px] font-black border px-2 py-0.5 rounded-sm font-mono tracking-wider ${activeClause.severityColor}`}>
                     SEVERIDAD: {activeClause.severity}
                  </div>
                </div>

                {/* Main Titles */}
                <div>
                  <span className="text-[9px] font-mono text-pink-500 uppercase font-black tracking-widest block leading-none mb-1">
                    APARTADO {activeClause.num} DEL CONTRATO
                  </span>
                  <h3 className="text-2.5xl font-black text-white uppercase italic leading-none tracking-tight mt-1">
                    {activeClause.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono tracking-wider mt-1 uppercase">
                    Exigibilidad Administrativa y Técnica
                  </p>
                </div>

                {/* Description Text */}
                <div className="space-y-1">
                  <span className="text-[8px] font-black uppercase text-slate-500 block font-mono tracking-wider">
                    Definición Contractual Básica:
                  </span>
                  <p className="text-[11.5px] text-slate-200 leading-relaxed font-sans font-normal">
                    {activeClause.description}
                  </p>
                </div>

                {/* Contractual Impact Info */}
                <div className="bg-[#0c1220] border border-white/5 p-3 rounded-xs space-y-1">
                  <span className="text-[7.5px] font-mono text-pink-500 uppercase block tracking-wider leading-none">Impacto Jurídico de Omisión:</span>
                  <span className="text-xs text-white leading-tight block font-sans font-medium">
                    {activeClause.contractualImpact}
                  </span>
                </div>

                {/* Checkpoint audit points */}
                <div className="space-y-2 pt-1.5">
                  <span className="text-[8px] font-black uppercase text-slate-500 block font-mono tracking-wider">
                    Pautas de Auditoría de Calidad:
                  </span>
                  <div className="space-y-2.5">
                    {activeClause.technicalChecks.map((check, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-[10.5px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-pink-500" />
                        <div>
                          <strong className="text-slate-100 block font-sans">{check.label}</strong>
                          <span className="text-slate-400 leading-snug block font-sans mt-0.5">{check.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 Interactive Thumbnail Images for CRITERIOS DE MODELADO (LOIN) */}
                {activeClause.id === "loin" && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
                    <span className="text-[8px] font-black uppercase text-pink-400 block font-mono tracking-wider">
                      📸 Capturas e Hitos de Modelado en Revit:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {DETAIL_IMAGES.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => setActiveImageId(img.id)}
                          className="group relative h-22 rounded-xs overflow-hidden border border-white/10 hover:border-pink-500 transition-all duration-300 bg-[#070b13] cursor-pointer text-left focus:outline-none flex flex-col justify-between shadow-lg"
                        >
                          {/* Render beautiful custom interactive preview */}
                          <div className="absolute inset-x-0 top-0 bottom-6 opacity-80 group-hover:opacity-100 transition-all">
                            {renderPreview(img.id)}
                          </div>

                          {/* Dark overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#070b13] to-transparent pointer-events-none"></div>
                          
                          {/* Inner labels */}
                          <div className="relative z-10 p-2 h-full flex flex-col justify-end pointer-events-none">
                            <span className="text-[9px] text-white font-bold uppercase tracking-tight leading-tight line-clamp-1 group-hover:text-pink-400 transition-colors">
                              {img.title}
                            </span>
                            <span className="text-[7.5px] text-slate-400 truncate leading-none mt-0.5">
                              {img.subtitle}
                            </span>
                          </div>

                          {/* Hover maximize indicator */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/70 transition-opacity duration-300">
                            <div className="flex items-center gap-1 bg-pink-600 px-2.5 py-1 rounded-xs shadow-md scale-95 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-3 h-3 text-white" />
                              <span className="text-[7.5px] text-white font-bold uppercase tracking-wider">Ver Panel</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Georreferenciación Panel */}
                {activeClause.id === "georref" && (() => {
                  const georrefOffsetX = (georrefEO - 923500) * 0.05;
                  const georrefOffsetY = -(georrefNS - 964700) * 0.05;
                  const georrefElevShift = (georrefElev - 282.63) * 2;

                  return (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between items-center pr-1 select-none">
                        <span className="text-[8px] font-black uppercase text-sky-400 block font-mono tracking-wider">
                          🌐 Entorno de Georreferenciación de Modelos:
                        </span>
                        {/* View selection tabs */}
                        <div className="flex gap-1.5 font-mono text-[7px]">
                          {["survey", "project", "north"].map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setGeorrefViewMode(mode)}
                              className={`px-1.5 py-0.5 rounded-xs border uppercase font-bold transition-all cursor-pointer ${
                                georrefViewMode === mode
                                  ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.2)]"
                                  : "bg-white/2 border-white/10 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              {mode === "survey" ? "Pto Reconocimiento" : mode === "project" ? "Pto Base" : "Norte Real"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Revit Viewport Simulation */}
                      <div className="bg-[#03060c] border border-sky-500/10 rounded-sm relative p-4 flex flex-col justify-between overflow-hidden select-none shadow-2xl h-[280px]">
                        {/* Grid background */}
                        <div className="absolute inset-0 bg-[#03060c] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:18px_18px] opacity-[0.08]"></div>

                        {/* Heading / Info overlay */}
                        <div className="absolute top-2.5 left-2.5 font-mono text-[7.5px] text-slate-500 leading-tight uppercase flex items-center gap-1.5 pointer-events-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                          <span>Vista de Coordenadas Compartidas (Modelo Estructural)</span>
                        </div>

                        {/* Maximize Button */}
                        <button
                          onClick={() => setIsGeorrefMaximized(true)}
                          className="absolute top-2 right-2 z-30 flex items-center gap-1 px-1.5 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/25 active:scale-95 border border-sky-500/20 hover:border-sky-400 text-sky-300 hover:text-white font-mono text-[7px] font-black uppercase transition-all shadow-md cursor-pointer"
                          title="Maximizar Vista e Información de Coordenadas"
                        >
                          <Maximize2 className="w-3 h-3 text-sky-400 group-hover:text-white" />
                          <span>Maximizar</span>
                        </button>

                        {/* Main SVG Graphic Workspace */}
                        <div className="w-full h-full flex-1 flex items-center justify-center relative mt-2">
                          
                          {/* Survey Coordinate Callout (Top-Left of screen, replicating Revit layout) */}
                          <div className={`absolute top-2 max-w-[170px] bg-slate-950/95 border border-sky-500/20 rounded-xs p-2 font-mono text-[8.5px] leading-tight select-text z-25 transition-all filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${
                            georrefViewMode === "survey" ? "border-sky-400 ring-1 ring-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.15)] scale-[1.02]" : "opacity-80"
                          }`}>
                            <div className="text-sky-400 font-bold uppercase tracking-wide border-b border-sky-500/20 pb-1 mb-1">
                              Punto de reconocimiento - Internal
                            </div>
                            <div className="grid grid-cols-[38px_1fr] text-slate-300 font-mono gap-y-0.5 gap-x-1.5">
                              <span className="text-slate-500">Emp. c.:</span>
                              <span className="text-slate-400 whitespace-nowrap">Coordenadas Reales</span>
                              
                              <span className="text-slate-500 font-bold">N/S:</span>
                              <span className="text-[#a5f3fc] font-bold tracking-wider">{georrefNS.toFixed(4)}</span>
                              
                              <span className="text-slate-500 font-bold">E/O:</span>
                              <span className="text-[#a5f3fc] font-bold tracking-wider">{georrefEO.toFixed(4)}</span>
                              
                              <span className="text-slate-500 font-bold">Elev:</span>
                              <span className="text-emerald-400 font-black tracking-wider">{georrefElev.toFixed(4)}</span>
                            </div>
                          </div>

                          {/* Interactive SVG Workspace */}
                          <svg className="w-full h-full min-h-[210px] pointer-events-auto" viewBox="0 0 320 200">
                            {/* Compass Rose (Glow underlay when True North mode) */}
                            <g 
                              transform={`translate(265, 45) rotate(${georrefViewMode === "north" ? georrefNorthAngle : 15})`} 
                              className="transition-transform duration-700 ease-out"
                            >
                              <circle cx="0" cy="0" r="18" fill="none" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-60" />
                              <line x1="0" y1="-23" x2="0" y2="23" stroke="#475569" strokeWidth="0.8" />
                              <line x1="-23" y1="0" x2="23" y2="0" stroke="#475569" strokeWidth="0.8" />
                              {/* North needle */}
                              <path d="M 0,-22 L 4,-5 L 0,0 L -4,-5 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
                              <path d="M 0,22 L 3,5 L 0,0 L -3,5 Z" fill="#64748b" stroke="#475569" strokeWidth="0.5" />
                              <text x="-3.5" y="-26" fill="#ef4444" className="font-mono text-[9px] font-black uppercase">N</text>
                            </g>

                            {/* Revit Survey Point Symbol (Triangle with cross) */}
                            <g 
                              transform="translate(45, 95)"
                              className={`cursor-pointer transition-transform duration-300 ${georrefViewMode === "survey" ? "scale-115" : "hover:scale-105"}`}
                              onClick={() => setGeorrefViewMode("survey")}
                            >
                              {/* Paperclip background icon */}
                              <path 
                                d="M 12,-16 C 14,-16 16,-14 16,-12 L 16,-2 C 16,3 12,7 7,7 C 2,7 -2,3 -2,-2 L -2,-12 C -2,-13 -1,-14 0,-14 C 1,-14 2,-13 2,-12 L 2,-2 C 2,1 4,4 7,4 C 10,4 12,1 12,-2 L 12,-12 C 12,-13 11,-14 10,-14 C 9,-14 8,-13 8,-12 L 8,-4 C 8,-3.5 7.5,-3 7,-3 C 6.5,-3 6,-3.5 6,-4 L 6,-12 C 6,-15 8,-16 10,-16" 
                                fill="none" 
                                stroke="#60a5fa" 
                                strokeWidth="0.8" 
                                className="opacity-70"
                              />
                              {/* Main Revit Survey Triangle */}
                              <polygon 
                                points="0,-8 -9,7 9,7" 
                                fill={georrefViewMode === "survey" ? "rgba(56, 189, 248, 0.2)" : "rgba(37, 99, 235, 0.1)"} 
                                stroke={georrefViewMode === "survey" ? "#38bdf8" : "#2563eb"} 
                                strokeWidth="1.5" 
                              />
                              <line x1="-5" y1="2" x2="5" y2="2" stroke={georrefViewMode === "survey" ? "#38bdf8" : "#2563eb"} strokeWidth="1" />
                              <line x1="0" y1="-3" x2="0" y2="7" stroke={georrefViewMode === "survey" ? "#38bdf8" : "#2563eb"} strokeWidth="1" />
                              {/* Label */}
                              <text x="12" y="-2" fill="#38bdf8" className="font-mono text-[7px] tracking-tight truncate uppercase font-bold">Punto Reconocimiento</text>
                              
                              {/* Ring ping */}
                              {georrefViewMode === "survey" && (
                                <circle cx="0" cy="1" r="14" fill="none" stroke="#22d3ee" strokeWidth="1" className="animate-ping opacity-30" />
                              )}
                            </g>

                            {/* Building Structural Model Elevation Isometric representation with live translations */}
                            <g transform={`translate(${130 + georrefOffsetX}, ${25 + georrefOffsetY - georrefElevShift})`}>
                              {/* Concrete Foundation Footings */}
                              <g className="opacity-95">
                                {/* Footing left */}
                                <rect x="0" y="115" width="22" height="10" fill="#444a56" stroke="#22c55e" strokeWidth="1" rx="1" />
                                <polygon points="0,115 11,111 33,111 22,115" fill="#525b6a" stroke="#22c55e" strokeWidth="1" />
                                <rect x="22" y="115" width="11" height="10" fill="#333842" stroke="#22c55e" strokeWidth="1" rx="0.5" />

                                {/* Footing middle-left */}
                                <rect x="44" y="115" width="22" height="10" fill="#444a56" stroke="#22c55e" strokeWidth="1" rx="1" />
                                <polygon points="44,115 55,111 77,111 66,115" fill="#525b6a" stroke="#22c55e" strokeWidth="1" />
                                <rect x="66" y="115" width="11" height="10" fill="#333842" stroke="#22c55e" strokeWidth="1" rx="0.5" />

                                {/* Footing middle-right */}
                                <rect x="110" y="115" width="22" height="10" fill="#444a56" stroke="#22c55e" strokeWidth="1" rx="1" />
                                <polygon points="110,115 121,111 143,111 132,115" fill="#525b6a" stroke="#22c55e" strokeWidth="1" />
                                <rect x="132" y="115" width="11" height="10" fill="#333842" stroke="#22c55e" strokeWidth="1" rx="0.5" />

                                {/* Footing right */}
                                <rect x="154" y="115" width="22" height="10" fill="#444a56" stroke="#22c55e" strokeWidth="1" rx="1" />
                                <polygon points="154,115 165,111 187,111 176,115" fill="#525b6a" stroke="#22c55e" strokeWidth="1" />
                                <rect x="176" y="115" width="11" height="10" fill="#333842" stroke="#22c55e" strokeWidth="1" rx="0.5" />
                              </g>

                              {/* Columns vertical boxes (Green edges, gray surface) */}
                              <g className="opacity-90">
                                {/* Left main columns */}
                                <rect x="8" y="70" width="6" height="41" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />
                                <rect x="52" y="70" width="6" height="41" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />
                                <rect x="118" y="70" width="6" height="41" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />
                                <rect x="162" y="70" width="6" height="41" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />

                                {/* Level 2 columns */}
                                <rect x="8" y="25" width="6" height="37" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />
                                <rect x="52" y="25" width="6" height="37" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />
                                <rect x="118" y="25" width="6" height="37" fill="#4b5563" stroke="#22c55e" strokeWidth="0.8" />
                                <rect x="162" y="25" width="24" height="37" fill="#374151" stroke="#22c55e" strokeWidth="0.8" />
                              </g>

                              {/* Floors plates: Slabs with neon green outlines and magenta bottom borders */}
                              <g>
                                {/* Baseline soil / layout slice */}
                                <line x1="-12" y1="120" x2="198" y2="120" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

                                {/* Lower active slab level (Level 1) */}
                                <polygon 
                                  points="5,70 180,70 180,74 5,74" 
                                  fill="#2d3748" 
                                  stroke="#22c55e" 
                                  strokeWidth="0.8" 
                                />
                                {/* Highlight neon magenta for Revit selection/structural face */}
                                <line x1="5" y1="74" x2="180" y2="74" stroke="#ec4899" strokeWidth="1.6" />

                                {/* Left extension substation slab */}
                                <polygon 
                                  points="-10,85 5,85 5,88 -10,88" 
                                  fill="#232730" 
                                  stroke="#22c55e" 
                                  strokeWidth="0.8" 
                                />
                                <line x1="-10" y1="88" x2="5" y2="88" stroke="#ec4899" strokeWidth="1.2" />
                                {/* Left extension pillars */}
                                <rect x="-8" y="88" width="4" height="23" fill="#334155" stroke="#22c55e" strokeWidth="0.6" />

                                {/* Upper level slab/roof framing */}
                                <polygon 
                                  points="5,25 180,25 180,28 5,28" 
                                  fill="#1e293b" 
                                  stroke="#22c55e" 
                                  strokeWidth="0.8" 
                                />
                                {/* Beams inside the roof structure */}
                                <line x1="28" y1="21" x2="28" y2="25" stroke="#22c55e" strokeWidth="0.8" />
                                <line x1="78" y1="21" x2="78" y2="25" stroke="#22c55e" strokeWidth="0.8" />
                                <line x1="138" y1="21" x2="138" y2="25" stroke="#22c55e" strokeWidth="0.8" />
                              </g>

                              {/* Project Base Point (Punto Base de Proyecto) symbol - Blue Circle with crosshair, attached to foundations */}
                              <g 
                                transform="translate(8, 72)"
                                className={`cursor-pointer transition-transform duration-300 ${georrefViewMode === "project" ? "scale-120" : "hover:scale-105"}`}
                                onClick={() => setGeorrefViewMode("project")}
                              >
                                <circle 
                                  cx="0" 
                                  cy="0" 
                                  r="5.5" 
                                  fill={georrefViewMode === "project" ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 41, 59, 0.4)"} 
                                  stroke={georrefViewMode === "project" ? "#3b82f6" : "#2563eb"} 
                                  strokeWidth="1.5" 
                                />
                                {/* Cross x */}
                                <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke={georrefViewMode === "project" ? "#3b82f6" : "#1e40af"} strokeWidth="1" />
                                <line x1="-5.5" y1="5.5" x2="5.5" y2="-5.5" stroke={georrefViewMode === "project" ? "#3b82f6" : "#1e40af"} strokeWidth="1" />
                                <circle cx="0" cy="0" r="1.5" fill="#3b82f6" />
                                {/* Label */}
                                <text x="10" y="3" fill="#3b82f6" className="font-mono text-[6.5px] font-bold uppercase tracking-tight">PUNTO BASE</text>
                                
                                {georrefViewMode === "project" && (
                                  <circle cx="0" cy="0" r="10" fill="none" stroke="#3b82f6" strokeWidth="0.8" className="animate-ping opacity-45" />
                                )}
                              </g>
                            </g>

                            {/* Connecting relation line between Survey point and project base point (Datum Shared Reference line) */}
                            <line 
                              x1="45" 
                              y1="96" 
                              x2={`${138 + georrefOffsetX}`} 
                              y2={`${97 + georrefOffsetY - georrefElevShift}`} 
                              stroke="#3b82f6" 
                              strokeWidth="1" 
                              strokeDasharray="2 3" 
                              className="opacity-50" 
                            />
                          </svg>

                          {/* Interactive HUD Readout (Bottom-Right, displaying info about selected node) */}
                          <div className="absolute bottom-2.5 right-2 px-2.5 py-1.5 bg-[#0a0f1d] border border-white/5 rounded-xs font-mono text-[7px] text-slate-500 leading-snug flex flex-col min-w-[130px]">
                            {georrefViewMode === "survey" && (
                              <>
                                <div className="text-sky-400 font-bold uppercase text-[7.5px]">Nivel Topográfico Real</div>
                                <div className="mt-0.5 text-slate-300 font-sans">Alineado al hito IGN oficial del proyecto.</div>
                                <div className="text-emerald-400 font-semibold font-mono mt-0.5">ESTADO: ADMITIDO (C. COMPARTIDAS)</div>
                              </>
                            )}
                            {georrefViewMode === "project" && (
                              <>
                                <div className="text-blue-400 font-bold uppercase text-[7.5px]">Punto de Origen Interno</div>
                                <div className="mt-0.5 text-slate-300 font-sans leading-tight">Desfases calculados respecto a topografía real: 0,0,0.</div>
                                <div className="text-sky-400 font-semibold mt-0.5">ROTACIÓN NORTE: 0.00°</div>
                              </>
                            )}
                            {georrefViewMode === "north" && (
                              <>
                                <div className="text-red-400 font-bold uppercase text-[7.5px]">Alineación Norte Geodésico</div>
                                <div className="mt-0.5 text-slate-300 font-sans">Norte Real establecido mediante azimut geoespacial del contrato.</div>
                                <div className="text-amber-400 font-semibold mt-0.5">ÁNGULO: {georrefNorthAngle}°</div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Interactive slide controller for rotation when mode is north */}
                        {georrefViewMode === "north" && (
                          <div className="mt-2 bg-[#090e1a]/80 border border-red-500/10 rounded-xs p-1.5 flex items-center gap-3 shrink-0 relative z-10">
                            <span className="text-[7.5px] font-mono text-red-400 tracking-wider uppercase font-bold whitespace-nowrap">Simular Rotación Norte:</span>
                            <input 
                              type="range" 
                              min="-90" 
                              max="90" 
                              value={georrefNorthAngle} 
                              onChange={(e) => setGeorrefNorthAngle(parseInt(e.target.value))}
                              className="flex-1 accent-red-500/80 bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
                            />
                            <span className="text-[8px] font-mono font-bold text-red-300 min-w-[28px] text-right">{georrefNorthAngle}°</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {activeClause.id === "usos" && (() => {
                  const filteredUsosRows = DASHBOARD_DATA.filter((row) => {
                    const mappedCat = 
                      row.category === "Armazón" ? "Armazón" :
                      row.category === "Muros" ? "Muros" :
                      row.category === "Suelos" ? "Suelos" : "Escaleras";
                    if (!selectedUsosCategories.includes(mappedCat)) return false;
                    
                    if (selectedUsosLevel !== "all" && row.levelId !== selectedUsosLevel) return false;
                    return true;
                  });

                  // Calculate sums
                  const totalVolume = areParamsFilled 
                    ? filteredUsosRows.reduce((sum, r) => sum + r.volumen, 0)
                    : 0;

                  const totalCost = areParamsFilled
                    ? filteredUsosRows.reduce((sum, r) => {
                        const costPerM3 = r.material === "Concreto 4000" ? 135 : (r.material === "Acero A1011-Gr50" ? 1800 : 110);
                        return sum + (r.volumen * costPerM3);
                      }, 0)
                    : 0;

                  return (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between items-center pr-1 select-none">
                        <span className="text-[8px] font-black uppercase text-pink-400 block font-mono tracking-wider">
                          📊 Simulador de Cantidades y Presupuestos (Usos 5D):
                        </span>
                        {/* Maximize Button */}
                        <button 
                          onClick={() => setIsUsosMaximized(true)}
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-pink-500/10 hover:bg-pink-500/25 active:scale-95 border border-pink-500/20 hover:border-pink-400 text-pink-300 hover:text-white font-mono text-[7px] font-black uppercase transition-all shadow-md cursor-pointer"
                          title="Maximizar Vista Interactiva (Dashboard Completo)"
                        >
                          <Maximize2 className="w-2.5 h-2.5 text-pink-400" />
                          <span>PANTALLA COMPLETA</span>
                        </button>
                      </div>

                      {/* Params toggle block */}
                      <div className="bg-[#0c1120] border border-white/10 rounded p-2.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[7.5px] font-mono text-slate-400 uppercase font-bold">
                            Configuración Contractual:
                          </span>
                          <button
                            onClick={() => setAreParamsFilled(!areParamsFilled)}
                            className={`px-2 py-0.5 text-[8.5px] font-mono rounded font-black transition-all cursor-pointer border ${
                              areParamsFilled 
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                                : "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
                            }`}
                          >
                            {areParamsFilled ? "✔ PARÁMETROS COMPLETOS" : "⚠ PARÁMETROS NULOS / VACÍOS"}
                          </button>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-snug font-sans">
                          {areParamsFilled 
                            ? "El modelo incluye los metadatos [Material_Name] e [IfcGUID] necesarios para el cálculo presupuestario."
                            : "El contratista omitió los campos obligatorios. Revit reporta valores indefinidos o nulos en las planillas."
                          }
                        </p>
                      </div>

                      {/* Miniature Isometric Projection of Building Model (interactive SVG) */}
                      <div className="relative h-28 bg-[#03060c] border border-white/5 rounded overflow-hidden flex items-center justify-center p-2 group">
                        <div className="absolute inset-x-2 top-1 flex justify-between font-mono text-[6.5px] text-slate-500 pointer-events-none">
                          <span>VISTA DE NIVELES (FILTRO ACTIVO)</span>
                          <span className="text-pink-400 font-bold">{selectedUsosLevel === "all" ? "GLOBAL" : `RESTORED: ${selectedUsosLevel.replace("_", " ")}`}</span>
                        </div>

                        {/* Mini project building diagram */}
                        <svg className="w-full h-full max-h-[100px] select-none" viewBox="0 0 200 100">
                          <g transform="translate(100, 52) scale(0.95)" className="transition-all duration-500">
                            {[-12, -4, 4, 12, 20].map((yOffset, i) => {
                              const levelMap = ["1_CIM", "2_P2", "3_P3", "4_P4", "10_CUB"];
                              const currLevel = levelMap[i];
                              const isHighlighted = selectedUsosLevel === "all" || selectedUsosLevel === currLevel;
                              const opacityClass = isHighlighted ? "opacity-90" : "opacity-15";

                              return (
                                <g key={i} transform={`translate(0, ${yOffset})`} className={`${opacityClass} transition-opacity duration-300`}>
                                  {/* Horizontal Slab: Blue/Magenta */}
                                  {selectedUsosCategories.includes("Suelos") && (
                                    <polygon points="-40,0 10,-10 40,0 -10,10" fill="#db2777" stroke="#ec4899" strokeWidth="0.5" />
                                  )}
                                  {/* Structural framing line: Orange/Grey */}
                                  {selectedUsosCategories.includes("Armazón") && (
                                    <g>
                                      <line x1="-30" y1="0" x2="-30" y2="-8" stroke="#f97316" strokeWidth="1" />
                                      <line x1="0" y1="-5" x2="0" y2="-13" stroke="#f97316" strokeWidth="1" />
                                      <line x1="30" y1="0" x2="30" y2="-8" stroke="#f97316" strokeWidth="1" />
                                    </g>
                                  )}
                                  {/* Inner Stairs diagonal line */}
                                  {selectedUsosCategories.includes("Escaleras") && i % 2 === 0 && (
                                    <line x1="-15" y1="0" x2="15" y2="-10" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="1 1" />
                                  )}
                                  {/* Wall facade: purple */}
                                  {selectedUsosCategories.includes("Muros") && (
                                    <polygon points="35,0 40,0 40,-8 35,-8" fill="#a855f7" stroke="#c084fc" strokeWidth="0.5" />
                                  )}
                                </g>
                              );
                            })}
                          </g>
                        </svg>
                      </div>

                      {/* Filters panel */}
                      <div className="grid grid-cols-2 gap-2 text-left font-mono">
                        {/* Category Toggles */}
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">Categorías IFC:</span>
                          <div className="flex flex-col gap-1">
                            {["Armazón", "Muros", "Suelos", "Escaleras"].map((cat) => {
                              const isChecked = selectedUsosCategories.includes(cat);
                              return (
                                <button
                                  key={cat}
                                  onClick={() => {
                                    if (isChecked) {
                                      setSelectedUsosCategories(selectedUsosCategories.filter(c => c !== cat));
                                    } else {
                                      setSelectedUsosCategories([...selectedUsosCategories, cat]);
                                    }
                                  }}
                                  className={`px-1.5 py-0.5 text-[7.5px] rounded border text-left flex items-center justify-between cursor-pointer transition-all ${
                                    isChecked 
                                      ? "bg-pink-500/10 border-pink-500/30 text-white" 
                                      : "bg-white/2 border-white/5 text-slate-500 hover:text-slate-300"
                                  }`}
                                >
                                  <span>{cat === "Armazón" ? "Armazón Estruct." : cat}</span>
                                  <span className="text-[6.5px]">{isChecked ? "✔" : "◦"}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Total Calculations Dashboard HUD block */}
                        <div className="bg-[#080c14] border border-white/5 rounded p-2 flex flex-col justify-between">
                          <div>
                            <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">Volumen Calculado:</span>
                            <div className={`text-[12px] font-black tracking-widest leading-none mt-0.5 ${areParamsFilled ? "text-[#a5f3fc]" : "text-red-400"}`}>
                              {totalVolume > 0 ? `${totalVolume.toFixed(2)} m³` : areParamsFilled ? "0.00 m³" : "ERR: NULO ⚠"}
                            </div>
                          </div>
                          
                          <div className="border-t border-white/5 pt-1.5 mt-1.5">
                            <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">Presupuesto (USD):</span>
                            <div className={`text-[12px] font-black tracking-widest leading-none mt-0.5 ${areParamsFilled ? "text-emerald-400" : "text-red-400"}`}>
                              {totalCost > 0 ? `$${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : areParamsFilled ? "$0.00" : "INCOMPUTABLE ⚠"}
                            </div>
                          </div>

                          {/* Level Select Trigger info */}
                          <div className="text-[6.5px] text-slate-500 border-t border-white/5 pt-1 mt-1 font-mono text-center leading-none">
                            {selectedUsosLevel === "all" ? "Vista: Todo el edificio" : `Nivel Filtrado: ${selectedUsosLevel.replace("_", " ")}`}
                          </div>
                        </div>
                      </div>

                      {/* Explanatory callout for 1.5 parameters purpose */}
                      <div className={`rounded-xs p-2 text-[9px] border leading-normal ${
                        areParamsFilled
                          ? "bg-slate-900/40 border-white/5 text-slate-400"
                          : "bg-red-500/5 border-red-500/20 text-red-300 shadow-[inset_0_0_10px_rgba(239,68,68,0.05)] animate-pulse"
                      }`}>
                        {areParamsFilled ? (
                          <span className="font-sans">
                            💡 <strong>Simulación en Regla:</strong> Al inyectar de forma correcta los parámetros de procedencia y costo, el modelo alimenta al panel analítico con exactitud automatizada.
                          </span>
                        ) : (
                          <span className="font-sans">
                            ⛔ <strong>ALERTA DE RECHAZO:</strong> Al omitir los parámetros definidos, el panel analítico queda huérfano de datos, arrojando valores nulos que inutilizan el modelo.
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}

              </div>

              {/* ISO reference baseline */}
              <div className="pt-4 border-t border-white/5 text-[9px] text-slate-500 uppercase tracking-widest select-none font-mono flex items-center gap-2">
                <Focus className="w-3.5 h-3.5 text-pink-500" />
                <span>Plan de Ejecución BIM (BEP) como anexo vinculante</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageId && (() => {
          const activeImg = DETAIL_IMAGES.find(i => i.id === activeImageId);
          if (!activeImg) return null;
          const currentIndex = DETAIL_IMAGES.findIndex(i => i.id === activeImageId);

          const handlePrev = (e?: React.MouseEvent) => {
            e?.stopPropagation();
            const prevIndex = (currentIndex - 1 + DETAIL_IMAGES.length) % DETAIL_IMAGES.length;
            setActiveImageId(DETAIL_IMAGES[prevIndex].id);
          };

          const handleNext = (e?: React.MouseEvent) => {
            e?.stopPropagation();
            const nextIndex = (currentIndex + 1) % DETAIL_IMAGES.length;
            setActiveImageId(DETAIL_IMAGES[nextIndex].id);
          };

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageId(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md"
            >
              {/* Close Button on Top Right */}
              <button 
                onClick={() => setActiveImageId(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-pink-500 text-slate-400 hover:text-white p-2.5 rounded-full transition-all cursor-pointer z-50 flex items-center justify-center"
                title="Cerrar (Esc)"
              >
                <X className="w-5 h-5 sm:w-6 h-6" />
              </button>

              {/* Central Lightbox Container */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#060912] border border-white/10 rounded-sm overflow-hidden shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col md:grid md:grid-cols-12"
              >
                {/* Left Side: Dynamic Technical Interactive Revit Simulation Container */}
                <div className="relative md:col-span-7 bg-[#020408] flex flex-col justify-between group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 min-h-[300px] md:min-h-[480px]">
                  {renderFullComponent(activeImg.id)}
                  
                  {/* Subtle technical scale background blueprint overlay overlaying container */}
                  <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

                  {/* Nav Arrows overlaying the panel edge */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-3 z-30">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-black/85 hover:bg-pink-600 text-white hover:scale-105 active:scale-95 border border-white/10 hover:border-pink-500/30 transition-all cursor-pointer flex items-center justify-center shadow-2xl"
                      title="Anterior (Retroceder)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 right-3 z-30">
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-black/85 hover:bg-pink-600 text-white hover:scale-105 active:scale-95 border border-white/10 hover:border-pink-500/30 transition-all cursor-pointer flex items-center justify-center shadow-2xl"
                      title="Siguiente (Avanzar)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Badge overlay */}
                  <span className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-md border border-white/10 text-pink-500 text-[7px] font-mono tracking-widest px-2.5 py-1 rounded-sm uppercase font-black pointer-events-none select-none z-20">
                    EVIDENCIA INTERACTIVA ACTIVA
                  </span>
                </div>

                {/* Right Side: Detailed Clause Explanatory Text */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh] bg-[#080d16] text-left">
                  <div className="space-y-4">
                    {/* Header ID */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[#deb887] text-[8.5px] font-mono font-black tracking-widest uppercase">
                        ANEXO TÉCNICO - MODELADO
                      </span>
                      <span className="text-[8px] text-slate-500 font-mono font-bold uppercase">
                        REVISIÓN CONTRACTUAL
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tight">
                        {activeImg.title}
                      </h4>
                      <p className="text-[10px] text-pink-400 font-mono tracking-wider font-bold uppercase mt-1">
                        {activeImg.subtitle}
                      </p>
                    </div>

                    {/* Detailed contractual meaning */}
                    <div className="space-y-1 bg-[#0b101c]/60 p-3.5 rounded-xs border border-white/5">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Definición de Exigencia Legal:</span>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans mt-1">
                        {activeImg.description}
                      </p>
                    </div>

                    {/* Annotations List */}
                    <div className="space-y-2">
                      <span className="text-[8.5px] font-black uppercase text-[#deb887] block font-mono tracking-wider">
                        Requisitos de Admisibilidad (checklist):
                      </span>
                      <div className="space-y-2">
                        {activeImg.annotations.map((note, nIdx) => (
                          <div key={nIdx} className="flex gap-2.5 items-start text-[10px] bg-white/2 p-2.5 rounded-xs border border-white/5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400 mt-0.5" />
                            <span className="text-slate-300 leading-relaxed font-sans">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[8px] text-slate-500 font-mono uppercase">
                    <span>Certificación ISO 19650</span>
                    <span className="text-pink-500 font-black">ENTREGABLE REVISADO</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}

        {isGeorrefMaximized && (() => {
          const georrefOffsetX = (georrefEO - 923500) * 0.12;
          const georrefOffsetY = -(georrefNS - 964700) * 0.12;
          const georrefElevShift = (georrefElev - 282.63) * 5;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGeorrefMaximized(false)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md"
            >
              {/* Close Button on Top Right */}
              <button 
                onClick={() => setIsGeorrefMaximized(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-sky-500 text-slate-400 hover:text-white p-2.5 rounded-full transition-all cursor-pointer z-50 flex items-center justify-center"
                title="Cerrar (Esc)"
              >
                <X className="w-5 h-5 sm:w-6 h-6" />
              </button>

              {/* Central Lightbox Container */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#060912] border border-white/10 rounded-sm overflow-hidden shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col md:grid md:grid-cols-12"
              >
                {/* Left Side: Deep interactive SVG map workspace and numerical adjustment sliders */}
                <div className="relative md:col-span-7 bg-[#020408] p-6 flex flex-col justify-between group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 min-h-[350px] md:min-h-[550px]">
                  {/* Subtle technical scale background blueprint overlay */}
                  <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>

                  <div className="flex justify-between items-center select-none z-10 shrink-0">
                    <div className="flex flex-col">
                      <span className="text-[#a5f3fc] text-[9.5px] font-mono font-black tracking-widest uppercase">
                        VISTA DE AUDITORÍA TOPOGRÁFICA
                      </span>
                      <span className="text-[8px] text-slate-500 font-mono uppercase font-bold mt-0.5">
                        Espacio de Coordenadas Compartidas y Orientación de Norte Real
                      </span>
                    </div>

                    {/* View selection tabs */}
                    <div className="flex gap-2 font-mono text-[8px]">
                      {["survey", "project", "north"].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setGeorrefViewMode(mode)}
                          className={`px-2 py-1 rounded-xs border uppercase font-bold transition-all cursor-pointer ${
                            georrefViewMode === mode
                              ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                              : "bg-white/2 border-white/10 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {mode === "survey" ? "Pto Reconocimiento" : mode === "project" ? "Pto Base" : "Norte Real"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main SVG Workspace */}
                  <div className="w-full flex-1 flex items-center justify-center relative my-4">
                    
                    {/* Survey Coordinate Callout (Top-Left, replicating Revit layout) */}
                    <div className={`absolute top-2 left-2 max-w-[210px] bg-[#070c16]/98 border border-sky-500/30 rounded p-3 font-mono text-[9px] leading-relaxed select-text z-25 transition-all filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] ${
                      georrefViewMode === "survey" ? "border-sky-400 ring-2 ring-sky-400/25 shadow-[0_0_16px_rgba(56,189,248,0.2)] scale-[1.03]" : "opacity-90"
                    }`}>
                      <div className="text-sky-400 font-bold uppercase tracking-wider border-b border-sky-500/20 pb-1.5 mb-1.5 flex justify-between items-center">
                        <span>Punto de Reconocimiento</span>
                        <span className="text-[7.5px] bg-sky-500/10 text-sky-300 px-1 rounded font-bold">IGN REAL</span>
                      </div>
                      <div className="grid grid-cols-[55px_1fr] text-slate-300 gap-y-1 gap-x-2">
                        <span className="text-slate-500">SISTEMA:</span>
                        <span className="text-slate-400 font-black">UTM WGS84 H21S</span>
                        
                        <span className="text-slate-500 font-bold">NORTE (N):</span>
                        <span className="text-[#22d3ee] font-black tracking-widest">{georrefNS.toFixed(4)} m</span>
                        
                        <span className="text-slate-500 font-bold">ESTE (E):</span>
                        <span className="text-[#22d3ee] font-black tracking-widest">{georrefEO.toFixed(4)} m</span>
                        
                        <span className="text-slate-500 font-bold">ELEVACIÓN:</span>
                        <span className="text-emerald-400 font-black tracking-widest">{georrefElev.toFixed(4)} m</span>
                      </div>
                    </div>

                    {/* Interactive SVG Workspace */}
                    <svg className="w-full h-full min-h-[280px] md:min-h-[380px] pointer-events-auto" viewBox="0 0 500 300">
                      {/* Technical visual axes */}
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="5 5" className="opacity-40" />
                      <line x1="250" y1="0" x2="250" y2="300" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="5 5" className="opacity-40" />

                      {/* Compass Rose */}
                      <g 
                        transform={`translate(420, 70) rotate(${georrefViewMode === "north" ? georrefNorthAngle : 15})`} 
                        className="transition-transform duration-700 ease-out"
                      >
                        <circle cx="0" cy="0" r="32" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" className="opacity-60" />
                        <circle cx="0" cy="0" r="25" fill="none" stroke="#1e293b" strokeWidth="1" />
                        <circle cx="0" cy="0" r="4" fill="#334155" />
                        <line x1="0" y1="-40" x2="0" y2="40" stroke="#475569" strokeWidth="1" />
                        <line x1="-40" y1="0" x2="40" y2="0" stroke="#475569" strokeWidth="1" />
                        {/* Compass points */}
                        <path d="M 0,-38 L 6,-8 L 0,0 L -6,-8 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
                        <path d="M 0,38 L 5,8 L 0,0 L -5,8 Z" fill="#64748b" stroke="#475569" strokeWidth="0.5" />
                        <text x="-4" y="-44" fill="#ef4444" className="font-mono text-[11px] font-black uppercase">N</text>
                        <text x="44" y="3" fill="#64748b" className="font-mono text-[9px]">E</text>
                        <text x="-50" y="3" fill="#64748b" className="font-mono text-[9px]">O</text>
                        <text x="-3" y="50" fill="#64748b" className="font-mono text-[9px]">S</text>
                      </g>

                      {/* Revit Survey Point Symbol (Triangle with cross) */}
                      <g 
                        transform="translate(85, 175)"
                        className={`cursor-pointer transition-transform duration-300 ${georrefViewMode === "survey" ? "scale-125" : "hover:scale-105"}`}
                        onClick={() => setGeorrefViewMode("survey")}
                      >
                        <polygon 
                          points="0,-14 -15,11 15,11" 
                          fill={georrefViewMode === "survey" ? "rgba(56, 189, 248, 0.25)" : "rgba(37, 99, 235, 0.08)"} 
                          stroke={georrefViewMode === "survey" ? "#38bdf8" : "#2563eb"} 
                          strokeWidth="2" 
                        />
                        <line x1="-8" y1="3" x2="8" y2="3" stroke={georrefViewMode === "survey" ? "#38bdf8" : "#2563eb"} strokeWidth="1.5" />
                        <line x1="0" y1="-5" x2="0" y2="11" stroke={georrefViewMode === "survey" ? "#38bdf8" : "#2563eb"} strokeWidth="1.5" />
                        
                        {/* Paperclip graphic integrated in survey marker */}
                        <path 
                          d="M 18,-24 C 21,-24 24,-21 24,-18 L 24,-3 C 24,4 18,10 10,10 C 2,10 -4,4 -4,-3 L -4,-18 C -4,-19.5 -2.5,-21 0,-21 C 1.5,-21 3,-19.5 3,-18 L 3,-3 C 3,1 6,6 10,6 C 14,6 17,1 17,-3 L 17,-18 C 17,-19.5 15.5,-21 14,-21 C 12.5,-21 11,-19.5 11,-18 L 11,-6 C 11,-5 10,-4 10,-4 C 9,-4 8,-5 8,-6 L 8,-18 C 8,-22 11,-24 14,-24" 
                          fill="none" 
                          stroke="#60a5fa" 
                          strokeWidth="1" 
                          className="opacity-80"
                        />
                        
                        <text x="24" y="-3" fill="#38bdf8" className="font-mono text-[9px] font-black tracking-widest uppercase">Pto Reconocimiento</text>
                        {georrefViewMode === "survey" && (
                          <circle cx="0" cy="1" r="22" fill="none" stroke="#22d3ee" strokeWidth="1" className="animate-ping opacity-35" />
                        )}
                      </g>

                      {/* Building Structural Model Grid elevation and slab with offset translation */}
                      <g transform={`translate(${210 + georrefOffsetX}, ${55 + georrefOffsetY - georrefElevShift})`}>
                        {/* Real foundation structure */}
                        <g className="opacity-95">
                          {/* Footing left */}
                          <rect x="0" y="165" width="28" height="14" fill="#334155" stroke="#22c55e" strokeWidth="1.5" rx="1.5" />
                          <polygon points="0,165 14,160 42,160 28,165" fill="#475569" stroke="#22c55e" strokeWidth="1.5" />
                          <rect x="28" y="165" width="14" height="14" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" rx="1" />

                          {/* Footing center-left */}
                          <rect x="56" y="165" width="28" height="14" fill="#334155" stroke="#22c55e" strokeWidth="1.5" rx="1.5" />
                          <polygon points="56,165 70,160 98,160 84,165" fill="#475569" stroke="#22c55e" strokeWidth="1.5" />
                          <rect x="84" y="165" width="14" height="14" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" rx="1" />

                          {/* Footing center-right */}
                          <rect x="140" y="165" width="28" height="14" fill="#334155" stroke="#22c55e" strokeWidth="1.5" rx="1.5" />
                          <polygon points="140,165 154,160 182,160 168,165" fill="#475569" stroke="#22c55e" strokeWidth="1.5" />
                          <rect x="168" y="165" width="14" height="14" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" rx="1" />

                          {/* Footing right */}
                          <rect x="196" y="165" width="28" height="14" fill="#334155" stroke="#22c55e" strokeWidth="1.5" rx="1.5" />
                          <polygon points="196,165 210,160 238,160 224,165" fill="#475569" stroke="#22c55e" strokeWidth="1.5" />
                          <rect x="224" y="165" width="14" height="14" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" rx="1" />
                        </g>

                        {/* Concrete Pillars Columns */}
                        <g className="opacity-95">
                          <rect x="11" y="90" width="8" height="75" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />
                          <rect x="67" y="90" width="8" height="75" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />
                          <rect x="151" y="90" width="8" height="75" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />
                          <rect x="207" y="90" width="8" height="75" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />

                          <rect x="11" y="25" width="8" height="65" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />
                          <rect x="67" y="25" width="8" height="65" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />
                          <rect x="151" y="25" width="8" height="65" fill="#4b5563" stroke="#22c55e" strokeWidth="1" />
                          <rect x="207" y="25" width="31" height="65" fill="#374151" stroke="#22c55e" strokeWidth="1" />
                        </g>

                        {/* Concrete Slabs Slices */}
                        <g>
                          {/* Baseline ground boundary reference */}
                          <line x1="-15" y1="172" x2="255" y2="172" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* Level 1 structural floor slab */}
                          <polygon points="5,90 230,90 230,95 5,95" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
                          <line x1="5" y1="95" x2="230" y2="95" stroke="#ec4899" strokeWidth="2.5" />

                          {/* Left utility room floor plate */}
                          <polygon points="-15,110 5,110 5,114 -15,114" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
                          <line x1="-15" y1="114" x2="5" y2="114" stroke="#ec4899" strokeWidth={1.5} />
                          <rect x="-11" y="114" width="5" height="51" fill="#334155" stroke="#22c55e" strokeWidth="1" />

                          {/* Level 2 roof structure */}
                          <polygon points="5,25 230,25 230,29 5,29" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
                          <line x1="35" y1="20" x2="35" y2="25" stroke="#22c55e" strokeWidth="1" />
                          <line x1="95" y1="20" x2="95" y2="25" stroke="#22c55e" strokeWidth="1" />
                          <line x1="175" y1="20" x2="175" y2="25" stroke="#22c55e" strokeWidth="1" />
                        </g>

                        {/* Project Base Point (Punto Base de Proyecto) symbol inside structure bases */}
                        <g 
                          transform="translate(11, 93)"
                          className={`cursor-pointer transition-transform duration-300 ${georrefViewMode === "project" ? "scale-125" : "hover:scale-105"}`}
                          onClick={() => setGeorrefViewMode("project")}
                        >
                          <circle 
                            cx="0" 
                            cy="0" 
                            r="8" 
                            fill={georrefViewMode === "project" ? "rgba(59, 130, 246, 0.4)" : "rgba(30, 41, 59, 0.6)"} 
                            stroke={georrefViewMode === "project" ? "#3b82f6" : "#2563eb"} 
                            strokeWidth="2" 
                          />
                          <line x1="-8" y1="-8" x2="8" y2="8" stroke={georrefViewMode === "project" ? "#3b82f6" : "#1e40af"} strokeWidth="1.5" />
                          <line x1="-8" y1="8" x2="8" y2="-8" stroke={georrefViewMode === "project" ? "#3b82f6" : "#1e40af"} strokeWidth="1.5" />
                          <circle cx="0" cy="0" r="2" fill="#22d3ee" />
                          
                          <text x="14" y="3" fill="#3b82f6" className="font-mono text-[9px] font-black uppercase tracking-wider">Punto Base Proyecto (0,0,0)</text>
                          {georrefViewMode === "project" && (
                            <circle cx="0" cy="0" r="14" fill="none" stroke="#3b82f6" strokeWidth="1" className="animate-ping opacity-45" />
                          )}
                        </g>
                      </g>

                      {/* Line of relationship */}
                      <line 
                        x1="85" 
                        y1="176" 
                        x2={`${210 + georrefOffsetX}`} 
                        y2={`${148 + georrefOffsetY - georrefElevShift}`} 
                        stroke="#38bdf8" 
                        strokeWidth="1.5" 
                        strokeDasharray="3 4" 
                        className="opacity-70 animate-pulse" 
                      />
                    </svg>

                    {/* HUD monitoring readout */}
                    <div className="absolute bottom-2 right-2 px-3 py-2 bg-[#080d16]/98 border border-white/5 rounded font-mono text-[8.5px] text-slate-400 leading-relaxed grid grid-cols-2 gap-4 min-w-[310px] select-text z-20 shadow-xl">
                      <div>
                        <div className="text-slate-500 font-bold uppercase tracking-wider">ELEVACIÓN ABSOLUTA:</div>
                        <div className="text-[#a5f3fc] font-black text-[10px] tracking-widest mt-0.5">{georrefElev.toFixed(4)} m</div>
                        <div className="text-slate-500 font-bold uppercase tracking-wider mt-1.5">RELACIÓN TOPOGRÁFICA:</div>
                        <div className="text-emerald-400 font-bold uppercase tracking-wider">IGN VINCULADO (REAL)</div>
                      </div>
                      <div className="border-l border-white/5 pl-4">
                        <div className="text-slate-500 font-bold uppercase tracking-wider">DESFASE DEL DELTA EN:</div>
                        <div className="text-sky-300 font-black text-[9px] tracking-wide mt-0.5">
                          ΔX (E/O): {((georrefEO - 923500)).toFixed(2)} m
                        </div>
                        <div className="text-sky-300 font-black text-[9px] tracking-wide">
                          ΔY (N/S): {((georrefNS - 964700)).toFixed(2)} m
                        </div>
                        <div className="text-emerald-400 font-black text-[9px] tracking-wide">
                          ΔZ (ELEV): {((georrefElev - 282.63)).toFixed(2)} m
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM: Massive Slider Controls to live recalculate coordinates */}
                  <div className="bg-[#070b13] border border-white/5 rounded p-4.5 space-y-3 z-10 shrink-0">
                    <div className="flex items-center justify-between font-mono text-[9px] text-[#a5f3fc] font-black tracking-widest uppercase border-b border-white/5 pb-2 mb-1">
                      <span>🔧 CALIBRADOR DE COORDENADAS COMPARTIDAS (REACCIONES EN TIEMPO REAL)</span>
                      <span className="text-slate-500 text-[8px]">Arrastre para desplazar el modelo en el plano estructural</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 font-mono text-[8px]">
                      {/* Norte / Sur slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-bold">COORDENADA ABSOLUTA NORTE/SUR (N/S):</span>
                          <span className="text-[#22d3ee] font-black">{georrefNS.toFixed(2)} m</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-[9px] font-black">-Y</span>
                          <input 
                            type="range" 
                            min="964400" 
                            max="965000" 
                            step="1"
                            value={georrefNS} 
                            onChange={(e) => setGeorrefNS(parseFloat(e.target.value))}
                            className="flex-1 accent-sky-500 bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
                          />
                          <span className="text-slate-500 text-[9px] font-black">+Y</span>
                        </div>
                      </div>

                      {/* Este / Oeste slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-bold">COORDENADA ABSOLUTA ESTE/OESTE (E/O):</span>
                          <span className="text-[#22d3ee] font-black">{georrefEO.toFixed(2)} m</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-[9px] font-black">-X</span>
                          <input 
                            type="range" 
                            min="923200" 
                            max="923800" 
                            step="1"
                            value={georrefEO} 
                            onChange={(e) => setGeorrefEO(parseFloat(e.target.value))}
                            className="flex-1 accent-sky-500 bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
                          />
                          <span className="text-slate-500 text-[9px] font-black">+X</span>
                        </div>
                      </div>

                      {/* Elevación slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-bold">ELEVACIÓN ABSOLUTA SOBRE NIVEL MAR (Elev):</span>
                          <span className="text-emerald-400 font-black">{georrefElev.toFixed(2)} m</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-[9px] font-black">-Z</span>
                          <input 
                            type="range" 
                            min="280.00" 
                            max="285.00" 
                            step="0.05"
                            value={georrefElev} 
                            onChange={(e) => setGeorrefElev(parseFloat(e.target.value))}
                            className="flex-1 accent-emerald-500 bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
                          />
                          <span className="text-slate-500 text-[9px] font-black">+Z</span>
                        </div>
                      </div>

                      {/* TRUE NORTH ROTATION */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-bold">ÁNGULO DE ROTACIÓN DE NORTE REAL (AZIMUT):</span>
                          <span className="text-red-400 font-black">{georrefNorthAngle}°</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-[9px] font-black">-90°</span>
                          <input 
                            type="range" 
                            min="-95" 
                            max="95" 
                            step="1"
                            value={georrefNorthAngle} 
                            onChange={(e) => setGeorrefNorthAngle(parseInt(e.target.value))}
                            className="flex-1 accent-red-500 bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
                          />
                          <span className="text-slate-500 text-[9px] font-black">+90°</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Clause Explanatory Text */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh] bg-[#080d16] text-left">
                  <div className="space-y-4">
                    {/* Header ID */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[#a5f3fc] text-[8.5px] font-mono font-black tracking-widest uppercase">
                        ANEXO TÉCNICO - CLÁUSULA 1.2
                      </span>
                      <span className="text-[8px] text-red-500 font-mono font-bold uppercase bg-red-950/20 px-1.5 py-0.5 rounded border border-red-500/20">
                        SEVERIDAD: CRÍTICO
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tight">
                        Nivel de Georreferenciación
                      </h4>
                      <p className="text-[10px] text-sky-400 font-mono tracking-wider font-bold uppercase mt-1">
                        Alineación Estructural de Coordenadas Compartidas
                      </p>
                    </div>

                    {/* Detailed contractual meaning */}
                    <div className="space-y-1 bg-[#0b101c]/60 p-3.5 rounded-xs border border-white/5">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Definición Contractual Básica:</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans mt-1">
                        Es una obligación legal indiscutible entregar los modelos coordinados bajo un único sistema de coordenadas compartidas reales del proyecto. Un modelo flotante de forma huérfana en el espacio virtual o desfasado respecto al terreno real (punto base y punto de reconocimiento incorrectos) rompe la compatibilidad espacial y será rechazado contractualmente en su totalidad.
                      </p>
                    </div>

                    {/* Impact analysis */}
                    <div className="p-3 bg-red-950/15 border border-red-500/10 rounded-xs">
                      <span className="text-[8.5px] font-black uppercase text-red-400 block font-mono tracking-wider">
                        Impacto Jurídico de Omisión:
                      </span>
                      <p className="text-[10px] text-slate-300 leading-relaxed mt-1 font-sans">
                        Garantiza que el diseño calce exactamente con la topografía real y replanteos en obra. Errores de desfase conllevan a penalidades graves por demoras estructurales de vaciado y colisiones espaciales.
                      </p>
                    </div>

                    {/* Annotations List */}
                    <div className="space-y-2">
                      <span className="text-[8.5px] font-black uppercase text-[#a5f3fc] block font-mono tracking-wider">
                        Pautas Oficiales de Auditoría de Calidad:
                      </span>
                      
                      <div className="space-y-2 text-[10px]">
                        <div className="flex gap-2.5 items-start bg-white/2 p-2.5 rounded-xs border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-white font-bold block">Coordenadas Compartidas Georreferenciadas:</span>
                            <span className="text-slate-300 leading-relaxed font-sans">Alineación estricta y rígidamente ajustada al punto de reconocimiento topográfico nacional.</span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-start bg-white/2 p-2.5 rounded-xs border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-white font-bold block">Punto Base de Proyecto Correcto:</span>
                            <span className="text-slate-300 leading-relaxed font-sans">Verificación de desfasamientos X, Y, Z exactos y rotación respecto al Norte Real del terreno.</span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-start bg-white/2 p-2.5 rounded-xs border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-white font-bold block">Consistencia entre Especialidades Structural/MEP/Arch:</span>
                            <span className="text-slate-300 leading-relaxed font-sans">Todos los modelos secundarios deben heredar la base del modelo estructural para colación exacta.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[8px] text-slate-500 font-mono uppercase">
                    <span>Certificación ISO 19650</span>
                    <span className="text-sky-400 font-extrabold">AUDITOR DE DATUM ACTIVO</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}

        {isUsosMaximized && (() => {
          const filteredUsosRows = DASHBOARD_DATA.filter((row) => {
            const mappedCat = 
              row.category === "Armazón" ? "Armazón" :
              row.category === "Muros" ? "Muros" :
              row.category === "Suelos" ? "Suelos" : "Escaleras";
            if (!selectedUsosCategories.includes(mappedCat)) return false;
            
            if (selectedUsosLevel !== "all" && row.levelId !== selectedUsosLevel) return false;
            
            // Check concrete material filter
            if (row.material.includes("Concreto 3000") && !selectedUsosConcretes.includes("Concreto 3000")) return false;
            if (row.material.includes("Concreto 4000") && !selectedUsosConcretes.includes("Concreto 4000")) return false;
            
            return true;
          });

          // Calculate sums
          const totalVolume = areParamsFilled 
            ? filteredUsosRows.reduce((sum, r) => sum + r.volumen, 0)
            : 0;

          const totalCost = areParamsFilled
            ? filteredUsosRows.reduce((sum, r) => {
                const costPerM3 = r.material === "Concreto 4000" ? 135 : (r.material === "Acero A1011-Gr50" ? 1800 : 110);
                return sum + (r.volumen * costPerM3);
              }, 0)
            : 0;

          const totalCount = filteredUsosRows.length;
          const progressCompliance = areParamsFilled ? 100 : 25;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/95 backdrop-blur-md"
              onClick={() => setIsUsosMaximized(false)}
            >
              {/* Main Dialog Window */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-[#040810] border border-pink-500/30 w-full max-w-7xl h-full max-h-[94vh] rounded-lg shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col md:grid md:grid-cols-12 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Left Columns (7/12): Analytics Dashboard Control & Elements Grid */}
                <div className="md:col-span-7 p-5 flex flex-col justify-between overflow-y-auto border-r border-white/5 h-full max-h-[50vh] md:max-h-[94vh]">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <FolderKey className="w-5 h-5 text-pink-500" />
                        <div>
                          <h3 className="text-sm font-black text-white font-mono tracking-wider uppercase leading-none">
                            CUADRO ANALÍTICO DE CANTIDADES 5D
                          </h3>
                          <span className="text-[9px] text-slate-400 font-sans mt-1 block">
                            Extractores automatizados basados en la Cláusula de Parámetros Contractuales
                          </span>
                        </div>
                      </div>

                      {/* Close button */}
                      <button 
                        onClick={() => setIsUsosMaximized(false)}
                        className="w-6 h-6 rounded bg-white/5 hover:bg-pink-500 hover:text-white flex items-center justify-center text-slate-400 border border-white/10 transition-all cursor-pointer"
                        title="Cerrar ventana"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Simulation Settings Panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 bg-[#090f1d] border border-white/5 p-4 rounded-xs">
                      
                      {/* Left: Compliance State Toggle */}
                      <div className="sm:col-span-5 space-y-2">
                        <span className="text-[8px] font-black uppercase text-slate-400 font-mono tracking-wider block">
                          Calidad de Metadatos Contractuales:
                        </span>
                        
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => setAreParamsFilled(true)}
                            className={`px-3 py-2 text-left rounded border flex items-center justify-between cursor-pointer transition-all ${
                              areParamsFilled 
                                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-extrabold" 
                                : "bg-white/1 border-white/5 text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <span className="text-[9px] font-mono">✔ C. COMPLETO (REGLA)</span>
                            <span className="text-[7.5px] font-mono">{areParamsFilled ? "ACTIVO" : "◦"}</span>
                          </button>

                          <button
                            onClick={() => setAreParamsFilled(false)}
                            className={`px-3 py-2 text-left rounded border flex items-center justify-between cursor-pointer transition-all ${
                              !areParamsFilled 
                                ? "bg-red-500/15 border-red-500 text-red-500 font-extrabold animate-pulse" 
                                : "bg-white/1 border-white/5 text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <span className="text-[9px] font-mono">⚠ C. INCORRECTO (VACÍO)</span>
                            <span className="text-[7.5px] font-mono">{!areParamsFilled ? "FALLANDO" : "◦"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Explanatory Warning depending on Selection */}
                      <div className="sm:col-span-7 flex flex-col justify-center bg-[#050912] p-3 rounded border border-white/5 font-sans leading-relaxed text-[10px]">
                        {areParamsFilled ? (
                          <p className="text-slate-300">
                            <strong className="text-emerald-400">Estado: Compliance Exitoso (Cláusula 1.5):</strong> El constructor inyectó cada parámetro geométrico y de costeo (<code className="text-[#a5f3fc] font-mono px-1 bg-white/5">Volume_Code</code>, <code className="text-[#a5f3fc] font-mono px-1 bg-white/5">Material_Description</code>). El dashboard analítico puede vincularse directamente con bases presupuestarias.
                          </p>
                        ) : (
                          <p className="text-red-400">
                            <strong className="text-red-500">Estado: Incumplimiento Contractual Detectado:</strong> El contratista guardó el modelo con campos vacíos (<code className="text-[#a5f3fc] font-mono px-1 bg-white/5">None</code> o valores por defecto). El filtrador arrojó valores nulos, bloqueando el cálculo automático de cantidades en presupuestos.
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Level Selector Tabs Grid */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-black uppercase text-pink-500 font-mono tracking-wider block">
                        Filtros de Altura / Niveles del Proyecto:
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-mono">
                        {USOS_LEVELS.map((lvl) => {
                          const isActive = selectedUsosLevel === lvl.id;
                          return (
                            <button
                              key={lvl.id}
                              onClick={() => setSelectedUsosLevel(lvl.id)}
                              className={`p-1.5 rounded text-[8.5px] leading-tight text-center uppercase tracking-tight font-black transition-all cursor-pointer border ${
                                isActive 
                                  ? "bg-pink-500/20 border-pink-500 text-white shadow-md shadow-pink-500/10" 
                                  : "bg-white/2 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {lvl.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interactive Filter Switches for Categories & Concrete Types */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Checkbox Category Filters */}
                      <div className="space-y-2 bg-white/2 p-3 rounded-xs border border-white/5">
                        <span className="text-[8px] font-black uppercase text-slate-400 font-mono tracking-widest block">
                          Categorías del Modelo Revit (Estructuras IFC):
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {["Armazón", "Muros", "Suelos", "Escaleras"].map((cat) => {
                            const isChecked = selectedUsosCategories.includes(cat);
                            return (
                              <button
                                key={cat}
                                onClick={() => {
                                  if (isChecked) {
                                    setSelectedUsosCategories(selectedUsosCategories.filter(c => c !== cat));
                                  } else {
                                    setSelectedUsosCategories([...selectedUsosCategories, cat]);
                                  }
                                }}
                                className={`p-1.5 rounded text-[8px] font-mono text-left flex items-center justify-between border cursor-pointer transition-all ${
                                  isChecked 
                                    ? "bg-pink-500/10 border-pink-500/40 text-white font-extrabold" 
                                    : "bg-[#060c15] border-white/5 text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                <span>{cat === "Armazón" ? "Armazón Estruct." : cat}</span>
                                <span className={`text-[9px] ${isChecked ? "text-pink-400 font-bold" : "text-slate-700"}`}>
                                  {isChecked ? "✔" : "◦"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Material Type Concrete Filter */}
                      <div className="space-y-2 bg-white/2 p-3 rounded-xs border border-white/5">
                        <span className="text-[8px] font-black uppercase text-slate-400 font-mono tracking-widest block">
                          Filtro de Materiales (Calidad Concreto):
                        </span>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "Concreto 3000", label: "C. 3000 psi (21 MPa)" },
                            { id: "Concreto 4000", label: "C. 4000 psi (28 MPa)" }
                          ].map((con) => {
                            const isChecked = selectedUsosConcretes.includes(con.id);
                            return (
                              <button
                                key={con.id}
                                onClick={() => {
                                  if (isChecked) {
                                    setSelectedUsosConcretes(selectedUsosConcretes.filter(c => c !== con.id));
                                  } else {
                                    setSelectedUsosConcretes([...selectedUsosConcretes, con.id]);
                                  }
                                }}
                                className={`p-1.5 rounded text-[8px] font-mono text-left flex items-center justify-between border cursor-pointer transition-all ${
                                  isChecked 
                                    ? "bg-slate-400/10 border-slate-400 text-white font-extrabold" 
                                    : "bg-[#060c15] border-white/5 text-slate-500 hover:text-slate-300"
                                }`}
                              >
                                <span>{con.label}</span>
                                <span className={`text-[9px] ${isChecked ? "text-sky-400 font-bold" : "text-slate-700"}`}>
                                  {isChecked ? "✔" : "◦"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Elements database - Spreadsheet View */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[8.5px] font-mono">
                        <span className="font-black text-pink-400 uppercase tracking-wider block">
                          Planilla de Cantidades Filtrada (Base de Datos IFC):
                        </span>
                        <span className="text-slate-500">
                          Elementos detectados: <strong className="text-white font-bold">{totalCount}</strong>
                        </span>
                      </div>

                      <div className="border border-white/5 rounded overflow-hidden shadow-lg font-mono">
                        <div className="max-h-[30vh] overflow-y-auto bg-[#03060d]">
                          <table className="w-full text-left text-[9.5px] border-collapse">
                            <thead className="sticky top-0 bg-[#070d18] text-slate-400 uppercase text-[7.5px] tracking-wider border-b border-white/5">
                              <tr>
                                <th className="p-2">Nivel</th>
                                <th className="p-2">Categoría</th>
                                <th className="p-2">Elemento Revit</th>
                                <th className="p-2">Especificación</th>
                                <th className="p-2 text-right">Volumen</th>
                                <th className="p-2 text-right">Presupuesto</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/2 text-slate-300">
                              {filteredUsosRows.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="p-4 text-center text-slate-500 italic font-sans">
                                    Ningún elemento coincide con los filtros establecidos.
                                  </td>
                                </tr>
                              ) : (
                                filteredUsosRows.map((row, i) => {
                                  const costPerM3 = row.material === "Concreto 4000" ? 135 : (row.material === "Acero A1011-Gr50" ? 1800 : 110);
                                  const singleCost = row.volumen * costPerM3;

                                  return (
                                    <tr key={i} className="hover:bg-white/2 transition-colors">
                                      <td className="p-2 text-[#a5f3fc]">
                                        {row.levelId.replace("_", " ")}
                                      </td>
                                      <td className="p-2">
                                        <span className={`px-1 rounded-xs text-[8px] font-bold uppercase ${
                                          row.category === "Armazón" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                          row.category === "Suelos" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" :
                                          row.category === "Muros" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                          "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                        }`}>
                                          {row.category}
                                        </span>
                                      </td>
                                      <td className="p-2 font-bold truncate max-w-[130px]" title={row.element}>
                                        {row.element}
                                      </td>
                                      
                                      {/* Material cell - affected by compliance toggle */}
                                      <td className="p-2">
                                        {areParamsFilled ? (
                                          <span className="text-slate-400 text-[8.5px]">
                                            {row.material}
                                          </span>
                                        ) : (
                                          <span className="text-red-400 uppercase text-[8px] font-black tracking-tighter">
                                            ⚠ NULO
                                          </span>
                                        )}
                                      </td>

                                      {/* Volume cell - affected by compliance toggle */}
                                      <td className={`p-2 text-right ${areParamsFilled ? "text-slate-300 font-bold" : "text-red-400 font-black"}`}>
                                        {areParamsFilled ? `${row.volumen.toFixed(2)} m³` : "0.00 / ERROR"}
                                      </td>

                                      {/* Budget cell - affected by compliance toggle */}
                                      <td className={`p-2 text-right ${areParamsFilled ? "text-emerald-400 font-bold" : "text-red-400 font-black"}`}>
                                        {areParamsFilled ? `$${singleCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "$0.00"}
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footer status block */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] text-slate-500 font-mono tracking-wider uppercase select-none mt-2">
                    <span>Sincronización de Base de Datos</span>
                    <span>Habilitado vía Speckle API Bridge</span>
                  </div>
                </div>

                {/* Right Columns (5/12): Reactive interactive 3D view and explanatory contract clauses */}
                <div className="md:col-span-5 p-5 flex flex-col justify-between overflow-y-auto max-h-[44vh] md:max-h-[94vh] bg-[#070b13] text-left">
                  <div className="space-y-4">
                    {/* ID Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 font-mono">
                      <span className="text-pink-400 text-[8.5px] font-black tracking-widest uppercase">
                        ANEXO TÉCNICO - CLÁUSULA 1.5
                      </span>
                      <span className="text-[8px] text-amber-500 font-bold uppercase bg-amber-950/20 px-1.5 py-0.5 rounded border border-amber-500/20">
                        SEVERIDAD: OBLIGATORIO
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h4 className="text-lg font-black text-white uppercase italic tracking-tight">
                        Parámetros por Usos BIM
                      </h4>
                      <p className="text-[10px] text-pink-400 font-mono tracking-wider font-bold uppercase mt-1">
                        Sincronización Presupuestaria 5D & Cantidades Analíticas
                      </p>
                    </div>

                    {/* Interactive 3D Mock model visualization */}
                    <div className="relative h-44 bg-[#020509] rounded border border-white/10 overflow-hidden flex flex-col items-center justify-center p-3 select-none">
                      <div className="absolute inset-x-3 top-2 flex justify-between font-mono text-[7px] text-slate-500">
                        <span>MODELIZACIÓN INTEGRAL ACTIVA (FILTRADO 3D)</span>
                        <span className="text-pink-400 font-extrabold shadow-sm">IFC TOWER</span>
                      </div>

                      {/* Big Isometric building schematic in pure SVG */}
                      <svg className="w-full h-full max-h-[140px]" viewBox="0 0 100 120">
                        <g transform="translate(50, 85)" className="transition-transform duration-500">
                          {/* We draw blocks representing the multi-story structure */}
                          {/* Each floor layer highlights depending on active filters */}
                          {[-48, -40, -32, -24, -16, -8, 0].map((yHeight, idx) => {
                            const levelKeys = ["10_CUB", "9_P9", "8_P8", "5_P5", "4_P4", "3_P3", "2_P2", "1_CIM"];
                            const relevantKey = levelKeys[idx] || "all";
                            const isLvlHigh = selectedUsosLevel === "all" || selectedUsosLevel === relevantKey;
                            const levelOpacity = isLvlHigh ? 0.9 : 0.08;

                            return (
                              <g key={idx} transform={`translate(0, ${yHeight})`} className="transition-opacity duration-300" style={{ opacity: levelOpacity }}>
                                {/* Horizontal Slab floor drawing - Pink/Suelo */}
                                {selectedUsosCategories.includes("Suelos") && (
                                  <polygon points="-28,0 0,-7 28,0 0,7" fill="#db2777" stroke="#f472b6" strokeWidth="0.4" fillOpacity="0.45" />
                                )}

                                {/* Armazón Columns drawing - Orange */}
                                {selectedUsosCategories.includes("Armazón") && (
                                  <g>
                                    <line x1="-20" y1="0" x2="-20" y2="-6" stroke="#f97316" strokeWidth="1.2" />
                                    <line x1="0" y1="3" x2="0" y2="-3" stroke="#f97316" strokeWidth="1.2" />
                                    <line x1="20" y1="0" x2="20" y2="-6" stroke="#f97316" strokeWidth="1.2" />
                                  </g>
                                )}

                                {/* Wall elements drawing - Purple */}
                                {selectedUsosCategories.includes("Muros") && idx % 2 === 0 && (
                                  <polygon points="12,1 25,1 25,-4 12,-4" fill="#a855f7" stroke="#c084fc" strokeWidth="0.4" fillOpacity="0.5" />
                                )}

                                {/* Escaleras diagonal connection */}
                                {selectedUsosCategories.includes("Escaleras") && idx % 3 === 0 && (
                                  <line x1="-10" y1="2" x2="10" y2="-5" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="1 1" />
                                )}
                              </g>
                            );
                          })}
                        </g>
                      </svg>

                      {/* Color code legend on very small bottom margin */}
                      <div className="absolute inset-x-3 bottom-1.5 flex justify-center gap-3 font-mono text-[6.5px]">
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-pink-500 rounded-sm"></span><span className="text-slate-400">Suelos</span></div>
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500 rounded-sm"></span><span className="text-slate-400">Armazón</span></div>
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-purple-500 rounded-sm"></span><span className="text-slate-400">Muros</span></div>
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-sm"></span><span className="text-slate-400">Escaleras</span></div>
                      </div>
                    </div>

                    {/* KPI Cards section */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/2 p-2.5 rounded border border-white/5">
                        <span className="text-[7px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Volumen Modelado total:</span>
                        <span className={`text-[13px] font-black tracking-widest ${areParamsFilled ? "text-[#a5f3fc]" : "text-red-400 animate-pulse"}`}>
                          {totalVolume > 0 ? `${totalVolume.toFixed(2)} m³` : areParamsFilled ? "0.00 m³" : "DESCONOCIDO ⚠"}
                        </span>
                      </div>

                      <div className="bg-white/2 p-2.5 rounded border border-white/5">
                        <span className="text-[7px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Costo Estimado Sincronizado:</span>
                        <span className={`text-[13px] font-black tracking-widest ${areParamsFilled ? "text-emerald-400" : "text-red-400 animate-pulse"}`}>
                          {totalVolume > 0 ? `$${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : areParamsFilled ? "$0.00" : "INCOMPUTABLE ⚠"}
                        </span>
                      </div>
                    </div>

                    {/* Contractual Explanation Block */}
                    <div className="space-y-1.5 p-3 rounded-xs bg-[#0b101c]/60 border border-white/5 text-[10px] leading-relaxed">
                      <strong className="text-slate-400 uppercase tracking-widest text-[7.5px] font-mono block">¿Por qué es mandatoria la Cláusula 1.5?</strong>
                      <p className="text-slate-300 font-sans mt-1">
                        Las características cosméticas o comerciales (como quién diseñó el mueble, textura física, manuales Comerciales) son redundantes en etapas de ingeniería pesada y se eliminan del modelo para no congestionar peso de modelado. Sin embargo, los <strong>parámetros de vinculación por usos analíticos</strong> (ej. volumen neto, tipo de concreto, ID de clasificación IFC) son indispensables. Si el modelador no los llena, el integrador arroja valores vacíos y bloquea automáticamente la planificación financiera.
                      </p>
                    </div>

                    {/* Quality checklist */}
                    <div className="space-y-2">
                      <span className="text-[8.5px] font-black uppercase text-[#a5f3fc] block font-mono tracking-wider">
                        Especificación del Compliance de Parámetros:
                      </span>
                      
                      <div className="space-y-2 text-[10px]">
                        <div className="flex gap-2 items-start bg-white/2 p-2 rounded border border-white/5">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${areParamsFilled ? "text-emerald-400" : "text-slate-600"}`} />
                          <div>
                            <span className="text-white font-bold block">Inyección de Código IFC (IfcGUID):</span>
                            <span className="text-slate-400 font-sans text-[9px]">Enlace relacional unívoco con la base de datos de costos de la empresa.</span>
                          </div>
                        </div>

                        <div className="flex gap-2 items-start bg-white/2 p-2 rounded border border-white/5">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${areParamsFilled ? "text-emerald-400" : "text-slate-600"}`} />
                          <div>
                            <span className="text-white font-bold block">Valores Geométricos Netos:</span>
                            <span className="text-slate-400 font-sans text-[9px]">En Revit, los parámetros de volumetría real limpian excedentes de sobre-modelado de forma automática.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Metadata and certifications */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] text-slate-500 font-mono uppercase">
                    <span>Estándar Internacional IFC 4</span>
                    <span className="text-pink-400 font-extrabold">VINCULADO DESPUÉS DE COMPLIANCE</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
};
