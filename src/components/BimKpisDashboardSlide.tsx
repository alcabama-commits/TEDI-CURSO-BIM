import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Percent, 
  ShieldCheck, 
  DollarSign, 
  Settings, 
  Layers, 
  HelpCircle, 
  Activity, 
  Info, 
  BarChart3, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Calculator, 
  FileText, 
  Users, 
  CheckSquare, 
  ArrowRight
} from 'lucide-react';

export const BimKpisDashboardSlide = () => {
  // Navigation tabs: 'kpis' for the new metrics & calculator, 'roi' for the original financial simulator
  const [activeTab, setActiveTab] = useState<'kpis' | 'roi'>('kpis');

  // --- TAB 1: PROCESS KPIS CALCULATOR STATE ---
  const [trcResueltas, setTrcResueltas] = useState<number>(45);
  const [trcAbiertas, setTrcAbiertas] = useState<number>(60);
  const [lrDias, setLrDias] = useState<number>(4.5);
  const [pdcSolucionados, setPdcSolucionados] = useState<number>(8);
  const [pdcAgendados, setPdcAgendados] = useState<number>(10);

  // Constraints to prevent logical errors (e.g. resueltas > abiertas)
  const cleanTrcResueltas = Math.min(trcResueltas, trcAbiertas);
  const cleanPdcSolucionados = Math.min(pdcSolucionados, pdcAgendados);

  // Process KPIs calculations
  const calculatedTrc = trcAbiertas > 0 ? Math.round((cleanTrcResueltas / trcAbiertas) * 100) : 100;
  const calculatedPdc = pdcAgendados > 0 ? Math.round((cleanPdcSolucionados / pdcAgendados) * 100) : 100;

  // --- TAB 2: ORIGINAL FINANCIAL SIMULATOR STATE ---
  const [area, setArea] = useState<number>(12000); // m2
  const [detectedClashes, setDetectedClashes] = useState<number>(450);
  const [resolvedClashes, setResolvedClashes] = useState<number>(380);
  const [coordinationCost, setCoordinationCost] = useState<number>(15000); // USD
  const [averageClashCost, setAverageClashCost] = useState<number>(180); // USD per clash saved

  // Constrain resolved to always be <= detected
  const cleanResolved = Math.min(resolvedClashes, detectedClashes);

  // KPIs Calculations
  const tir = detectedClashes > 0 ? Math.round((cleanResolved / detectedClashes) * 100) : 100;
  const ic = parseFloat((detectedClashes / area).toFixed(3));
  
  const potentialReworkSaved = cleanResolved * averageClashCost;
  const roiValue = coordinationCost > 0 
    ? Math.round(((potentialReworkSaved - coordinationCost) / coordinationCost) * 100)
    : 0;

  // Audit evaluation threshold for Financial/ROI Tab
  let auditStatus: 'green' | 'amber' | 'red' = 'amber';
  let auditTitle = 'APROBACIÓN CONDICIONADA';
  let auditMessage = 'El proyecto tiene una tasa de resolución respetable, pero se requiere resolver al menos el 90% de las colisiones críticas antes de firmar el acta de inicio.';
  let auditColor = 'text-amber-400 border-amber-500/20 bg-amber-950/10';

  if (tir >= 92) {
    auditStatus = 'green';
    auditTitle = 'AUDITORÍA APROBADA (Luz Verde Obra)';
    auditMessage = 'Excelente coordinación federada. La tasa de resolución supera el umbral del 92% estipulado. Los riesgos de interferencia de obra están mitigados.';
    auditColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-950/10';
  } else if (tir < 80) {
    auditStatus = 'red';
    auditTitle = 'AUDITORÍA RECHAZADA (Construcción Detenida)';
    auditMessage = 'Nivel crítico de colisiones sin resolver. El modelo federado es inmaduro para ir a construcción. Riesgo inminente de demolición de losas o desvíos de ductos de gran costo en campo.';
    auditColor = 'text-red-400 border-red-500/20 bg-red-950/10';
  }

  // General evaluation feedback helper for TRC
  const getTrcFeedback = (value: number) => {
    if (value >= 85) return { text: 'ÓPTIMO (Resolución Ágil)', color: 'text-emerald-400', bg: 'bg-emerald-950/20', border: 'border-emerald-500/20' };
    if (value >= 70) return { text: 'ACEPTABLE (Velocidad Media)', color: 'text-amber-400', bg: 'bg-amber-950/20', border: 'border-amber-500/20' };
    return { text: 'CRÍTICO (Cuello de Botella)', color: 'text-red-400', bg: 'bg-red-950/20', border: 'border-red-500/20' };
  };

  // General evaluation feedback helper for LR
  const getLrFeedback = (value: number) => {
    if (value <= 3) return { text: 'NIVEL AGILE (≤ 3 días)', color: 'text-emerald-400', bg: 'bg-emerald-950/20', border: 'border-emerald-500/20' };
    if (value <= 6) return { text: 'NIVEL ESTÁNDAR (3-6 días)', color: 'text-amber-400', bg: 'bg-amber-950/20', border: 'border-amber-500/20' };
    return { text: 'DEMORA SEVERA (> 6 días)', color: 'text-red-400', bg: 'bg-red-950/20', border: 'border-red-500/20' };
  };

  // General evaluation feedback helper for PDC
  const getPdcFeedback = (value: number) => {
    if (value >= 90) return { text: 'ALTA EFICIENCIA (≥ 90%)', color: 'text-emerald-400', bg: 'bg-emerald-950/20', border: 'border-emerald-500/20' };
    if (value >= 75) return { text: 'PRODUCTIVIDAD MEDIA (75-89%)', color: 'text-amber-400', bg: 'bg-amber-950/20', border: 'border-amber-500/20' };
    return { text: 'REUNIÓN INEFICIENTE (< 75%)', color: 'text-red-400', bg: 'bg-red-950/20', border: 'border-red-500/20' };
  };

  const trcFeedback = getTrcFeedback(calculatedTrc);
  const lrFeedback = getLrFeedback(lrDias);
  const pdcFeedback = getPdcFeedback(calculatedPdc);

  // Global Process Audit Diagnosis based on the three KPIs
  const getGlobalProcessDiagnosis = () => {
    let score = 0;
    if (calculatedTrc >= 85) score += 2;
    else if (calculatedTrc >= 70) score += 1;

    if (lrDias <= 3) score += 2;
    else if (lrDias <= 6) score += 1;

    if (calculatedPdc >= 90) score += 2;
    else if (calculatedPdc >= 75) score += 1;

    if (score >= 5) {
      return {
        title: 'PROCESO BIM DE ALTA PRODUCTIVIDAD',
        desc: 'El flujo de auditoría y coordinación está fluyendo según las mejores prácticas de la ISO 19650. Los modeladores corrigen incidencias con rapidez, y las sesiones ICE logran decisiones definitivas de alto impacto.',
        color: 'text-emerald-400',
        border: 'border-emerald-500/20',
        bg: 'bg-emerald-950/10'
      };
    } else if (score >= 3) {
      return {
        title: 'PROCESO EN RIESGO DE LATENCIA',
        desc: 'Aunque el equipo resuelve problemas, los tiempos de respuesta o la toma de decisiones en las sesiones ICE presentan cuellos de botella. Monitoree las prioridades de asignación de los tickets de colisión para evitar demoras.',
        color: 'text-amber-400',
        border: 'border-amber-500/20',
        bg: 'bg-amber-950/10'
      };
    } else {
      return {
        title: 'COLAPSO EN LA COORDINACIÓN BIM',
        desc: 'Crítico. El equipo no está respondiendo con agilidad a las colisiones asignadas y las sesiones ICE están resultando improductivas. Es imperativo revisar la capacitación de los modeladores y el liderazgo técnico del Coordinador BIM.',
        color: 'text-red-400',
        border: 'border-red-500/20',
        bg: 'bg-red-950/10'
      };
    }
  };

  const processDiagnosis = getGlobalProcessDiagnosis();

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto text-slate-100 font-sans p-6" id="kpis-slide">
      {/* Header Block 3 Info */}
      <div className="border-b border-white/5 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono text-tedi-pink font-extrabold uppercase tracking-[0.2em]">
            SESIÓN 10 — CONTROL DE CALIDAD Y ASEGURAMIENTO BIM
          </span>
          <div className="flex items-center gap-1.5 bg-tedi-pink/10 px-2.5 py-1 rounded-full border border-tedi-pink/20">
            <Clock className="w-3.5 h-3.5 text-tedi-pink" />
            <span className="text-[10px] font-mono text-tedi-pink font-bold">Tiempo estimado: 40 minutos</span>
          </div>
        </div>
        <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
          <Activity className="text-tedi-pink w-6 h-6 animate-pulse" /> BLOQUE 3: Auditoría del Proceso BIM en Proyectos (Métricas y KPIs)
        </h2>
      </div>

      {/* Intro Quote box */}
      <div className="bg-[#111625]/90 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tedi-pink/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-1 md:max-w-3xl">
          <h4 className="text-xs font-black uppercase text-tedi-pink tracking-wider flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> El Rigor de la Medición de Calidad
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="text-white font-bold italic">“Lo que no se mide, no se puede mejorar.”</span> Un BIM Manager audita la salud de un proyecto específico mediante el uso de <span className="text-tedi-orange font-semibold">KPIs (Key Performance Indicators) de proceso</span>. Estas métricas cuantitativas evalúan el desempeño y madurez operativa del equipo de ingeniería y modelado, dividiéndose rigurosamente en dos grupos críticos.
          </p>
        </div>
        <div className="flex gap-3 bg-[#1c2333] px-5 py-3 rounded-xl border border-white/10 shrink-0 text-center">
          <div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Enfoque de Auditoría</div>
            <div className="text-xs font-bold text-white uppercase tracking-wide mt-0.5">Control Cuantitativo</div>
          </div>
        </div>
      </div>

      {/* Tab Switcher - Sleek Modern Slide Tabs */}
      <div className="flex border-b border-white/5 p-1 bg-[#111625]/40 rounded-xl max-w-md">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex-1 py-2 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'kpis' 
              ? 'bg-gradient-to-r from-tedi-pink to-tedi-orange text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calculator className="w-4 h-4" /> 1. Métricas & Calculadora
        </button>
        <button
          onClick={() => setActiveTab('roi')}
          className={`flex-1 py-2 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'roi' 
              ? 'bg-gradient-to-r from-tedi-pink to-tedi-orange text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> 2. Impacto & ROI Financiero
        </button>
      </div>

      {/* TAB CONTENTS */}
      {activeTab === 'kpis' ? (
        <div className="space-y-6">
          {/* Two Groups of Metrics Description Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Group 1: Métricas de Coordinación */}
            <div className="bg-[#111625]/60 border-l-4 border-tedi-orange border-y border-r border-white/5 p-5 rounded-r-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-3 right-3 opacity-5">
                <Layers className="w-20 h-20 text-tedi-orange" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-tedi-orange/10 rounded-lg text-tedi-orange border border-tedi-orange/20">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">A. Métricas de Coordinación</h3>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Flujo y velocidad del modelado federado</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Auditan la agilidad operativa, la interacción técnica entre diferentes disciplinas y la tasa a la cual se identifican y corrigen los problemas de diseño en la plataforma común de datos. Evitan embotellamientos en la cadena de entregables.
              </p>
              <ul className="text-[10px] space-y-2 text-slate-400 pt-1 border-t border-white/5">
                <li className="flex items-start gap-1.5">
                  <span className="text-tedi-orange font-bold">•</span>
                  <span><strong className="text-slate-200">TRC (Tasa de Resolución):</strong> Velocidad de mitigación de colisiones abiertas.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-tedi-orange font-bold">•</span>
                  <span><strong className="text-slate-200">LR (Latencia de Respuesta):</strong> Plazo desde la detección de colisión hasta su respuesta como resuelta.</span>
                </li>
              </ul>
            </div>

            {/* Group 2: Métricas de la Sesión ICE */}
            <div className="bg-[#111625]/60 border-l-4 border-tedi-pink border-y border-r border-white/5 p-5 rounded-r-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-3 right-3 opacity-5">
                <Users className="w-20 h-20 text-tedi-pink" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-tedi-pink/10 rounded-lg text-tedi-pink border border-tedi-pink/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">B. Métricas de la Sesión ICE</h3>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Eficiencia en ingeniería concurrente</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Miden el rendimiento de las sesiones de Ingeniería Concurrente Integrada (ICE). Evalúan si la inversión de tiempo de los especialistas en salas de decisión técnica se traduce efectivamente en acuerdos aprobados firmemente y actas liberadas.
              </p>
              <ul className="text-[10px] space-y-2 text-slate-400 pt-1 border-t border-white/5">
                <li className="flex items-start gap-1.5">
                  <span className="text-tedi-pink font-bold">•</span>
                  <span><strong className="text-slate-200">PDC (Porcentaje de Decisiones):</strong> Eficiencia resolutiva real frente a la agenda planificada de la sesión.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-tedi-pink font-bold">•</span>
                  <span><strong className="text-slate-200">Asistencia de Decisores:</strong> Ratio de asistencia de líderes de proyecto con poder de firma.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulación Matemática - ECUACIONES VISUALES */}
          <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
              <FileText className="w-4 h-4 text-tedi-pink" /> Ecuaciones de Auditoría de Procesos (Fórmulas Oficiales)
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* TRC Equation Card */}
              <div className="bg-[#060913] border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[8px] font-mono text-tedi-orange font-bold uppercase tracking-wider">Métrica de Coordinación</span>
                  <h4 className="text-xs font-bold text-white uppercase mt-0.5">Tasa de Resolución de Conflictos (TRC)</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Mide la rapidez y capacidad resolutiva de los diseñadores.</p>
                </div>
                
                {/* Math Equation display */}
                <div className="py-3 px-2 bg-white/5 rounded-lg flex items-center justify-center font-mono text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-tedi-orange">TRC</span>
                    <span>=</span>
                    <span className="text-base text-slate-400 font-light">(</span>
                    <div className="flex flex-col items-center mx-1">
                      <span className="border-b border-white/30 pb-0.5 text-[10px] font-medium text-slate-200">Incidencias Resueltas en el Periodo</span>
                      <span className="pt-0.5 text-[10px] font-medium text-slate-400">Incidencias Totales Abiertas</span>
                    </div>
                    <span className="text-base text-slate-400 font-light">)</span>
                    <span className="text-slate-300">×</span>
                    <span className="font-bold">100</span>
                  </div>
                </div>
              </div>

              {/* LR Explanation Card */}
              <div className="bg-[#060913] border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[8px] font-mono text-tedi-orange font-bold uppercase tracking-wider">Métrica de Coordinación</span>
                  <h4 className="text-xs font-bold text-white uppercase mt-0.5">Latencia de Respuesta (LR)</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Evalúa el retraso de corrección en la entrega de soluciones.</p>
                </div>
                
                {/* Visual workflow representing Latency */}
                <div className="py-3 px-3 bg-white/5 rounded-lg flex flex-col justify-center gap-1 font-mono text-[9px]">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-bold">Ticket Nuevo</span>
                    <span className="text-tedi-orange">LR (Días Promedio)</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">Resuelto</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full relative mt-1 overflow-hidden">
                    <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                  </div>
                  <div className="text-[8.5px] text-slate-500 text-center mt-1 italic">Días transcurridos desde asignación del Coordinador hasta entrega.</div>
                </div>
              </div>

              {/* PDC Equation Card */}
              <div className="bg-[#060913] border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[8px] font-mono text-tedi-pink font-bold uppercase tracking-wider">Métrica de Sesión ICE</span>
                  <h4 className="text-xs font-bold text-white uppercase mt-0.5">Decisiones ICE Concluidas (PDC)</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Mide el aprovechamiento y agilidad en reuniones de equipo.</p>
                </div>
                
                {/* Math Equation display */}
                <div className="py-3 px-2 bg-white/5 rounded-lg flex items-center justify-center font-mono text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-tedi-pink">PDC</span>
                    <span>=</span>
                    <span className="text-base text-slate-400 font-light">(</span>
                    <div className="flex flex-col items-center mx-1">
                      <span className="border-b border-white/30 pb-0.5 text-[10px] font-medium text-slate-200">Problemas Solucionados en la Sesión</span>
                      <span className="pt-0.5 text-[10px] font-medium text-slate-400">Problemas Agendados en la Orden del Día</span>
                    </div>
                    <span className="text-base text-slate-400 font-light">)</span>
                    <span className="text-slate-300">×</span>
                    <span className="font-bold">100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CALCULATOR SECTION */}
          <div className="bg-[#111625]/40 border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h3 className="text-base font-mono font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-tedi-orange" /> Calculadora de Auditoría de Procesos
                </h3>
                <p className="text-[11px] text-slate-400">Varía los parámetros operativos de tus proyectos y evalúa los KPIs de proceso automáticamente.</p>
              </div>
              <span className="text-[10px] bg-tedi-orange/15 border border-tedi-orange/30 text-tedi-orange font-mono font-bold px-3 py-1 rounded-full uppercase shrink-0">
                Simulador Dinámico
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* TRC CALCULATOR SLIDERS */}
              <div className="bg-slate-900/40 border border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-tedi-orange font-black uppercase">1. Calcular TRC</span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${trcFeedback.bg} ${trcFeedback.color}`}>
                    {calculatedTrc}%
                  </span>
                </div>

                {/* Slider: Abiertas */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Incidencias Totales Abiertas:</span>
                    <span className="text-white font-bold">{trcAbiertas} tickets</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    step="5"
                    value={trcAbiertas}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setTrcAbiertas(val);
                      if (trcResueltas > val) setTrcResueltas(val);
                    }}
                    className="w-full accent-tedi-orange bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Slider: Resueltas */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Resueltas en el Periodo:</span>
                    <span className="text-tedi-orange font-bold">{cleanTrcResueltas} de {trcAbiertas}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={trcAbiertas} 
                    step="1"
                    value={cleanTrcResueltas}
                    onChange={(e) => setTrcResueltas(parseInt(e.target.value))}
                    className="w-full accent-tedi-orange bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Small calculation representation */}
                <div className="bg-black/30 p-2.5 rounded-lg text-center font-mono text-[9px] text-slate-400">
                  Operación: <span className="text-white font-bold">({cleanTrcResueltas} / {trcAbiertas}) × 100 = {calculatedTrc}%</span>
                </div>

                <div className={`text-center p-2 rounded border text-[9.5px] font-mono font-bold ${trcFeedback.bg} ${trcFeedback.color} ${trcFeedback.border}`}>
                  {trcFeedback.text}
                </div>
              </div>

              {/* LR CALCULATOR SLIDERS */}
              <div className="bg-slate-900/40 border border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-tedi-orange font-black uppercase">2. Calcular LR</span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${lrFeedback.bg} ${lrFeedback.color}`}>
                    {lrDias} Días
                  </span>
                </div>

                {/* Slider: LR */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Latencia de Respuesta Promedio:</span>
                    <span className="text-white font-bold">{lrDias} días</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    step="0.5"
                    value={lrDias}
                    onChange={(e) => setLrDias(parseFloat(e.target.value))}
                    className="w-full accent-tedi-orange bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                  />
                  <p className="text-[8px] text-slate-500 leading-normal italic">
                    Plazo transcurrido promedio entre la creación del ticket por coordinación y la devolución del archivo corregido por el modelador.
                  </p>
                </div>

                <div className="bg-black/30 p-2.5 rounded-lg text-center font-mono text-[9px] text-slate-400">
                  Un valor menor indica <span className="text-emerald-400 font-bold">mayor agilidad</span> en cambios de diseño.
                </div>

                <div className={`text-center p-2 rounded border text-[9.5px] font-mono font-bold ${lrFeedback.bg} ${lrFeedback.color} ${lrFeedback.border}`}>
                  {lrFeedback.text}
                </div>
              </div>

              {/* PDC CALCULATOR SLIDERS */}
              <div className="bg-slate-900/40 border border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-tedi-pink font-black uppercase">3. Calcular PDC</span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${pdcFeedback.bg} ${pdcFeedback.color}`}>
                    {calculatedPdc}%
                  </span>
                </div>

                {/* Slider: Agendados */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Temas Agendados (Orden Día):</span>
                    <span className="text-white font-bold">{pdcAgendados} temas</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="20" 
                    step="1"
                    value={pdcAgendados}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setPdcAgendados(val);
                      if (pdcSolucionados > val) setPdcSolucionados(val);
                    }}
                    className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Slider: Solucionados */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Resueltos en la Reunión ICE:</span>
                    <span className="text-tedi-pink font-bold">{cleanPdcSolucionados} de {pdcAgendados}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={pdcAgendados} 
                    step="1"
                    value={cleanPdcSolucionados}
                    onChange={(e) => setPdcSolucionados(parseInt(e.target.value))}
                    className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Small calculation representation */}
                <div className="bg-black/30 p-2.5 rounded-lg text-center font-mono text-[9px] text-slate-400">
                  Operación: <span className="text-white font-bold">({cleanPdcSolucionados} / {pdcAgendados}) × 100 = {calculatedPdc}%</span>
                </div>

                <div className={`text-center p-2 rounded border text-[9.5px] font-mono font-bold ${pdcFeedback.bg} ${pdcFeedback.color} ${pdcFeedback.border}`}>
                  {pdcFeedback.text}
                </div>
              </div>
            </div>

            {/* PROCESS REPORT DIAGNOSIS BOX */}
            <div className={`p-5 rounded-2xl border ${processDiagnosis.bg} ${processDiagnosis.border} space-y-2 mt-4`}>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 ${processDiagnosis.color} shrink-0`} />
                <h4 className={`text-xs font-mono font-black uppercase tracking-wider ${processDiagnosis.color}`}>
                  DIAGNÓSTICO AUTOMÁTICO DEL PROCESO AUDITADO
                </h4>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                {processDiagnosis.desc}
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-[9px] font-mono text-slate-400">
                <div>TRC: <span className={`font-bold ${trcFeedback.color}`}>{calculatedTrc}%</span></div>
                <div className="h-3 w-px bg-white/10 hidden sm:block"></div>
                <div>Latencia: <span className={`font-bold ${lrFeedback.color}`}>{lrDias} días</span></div>
                <div className="h-3 w-px bg-white/10 hidden sm:block"></div>
                <div>PDC ICE: <span className={`font-bold ${pdcFeedback.color}`}>{calculatedPdc}%</span></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: ORIGINAL COORDINATION & ROI FINANCIAL SIMULATOR */
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="space-y-1 md:max-w-2xl">
              <h4 className="text-xs font-black uppercase text-tedi-pink tracking-wider">Aseguramiento Financiero y ROI de Coordinación</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Aparte de auditar el flujo del proceso de los modeladores, la auditoría BIM debe justificar numéricamente su <span className="text-white font-bold">retorno de inversión (ROI)</span>. Mide las colisiones que el equipo resolvió en el modelo antes de excavar u hormigonar, valorando el costo del retrabajo evitado en obra física.
              </p>
            </div>
            <div className="flex gap-3 bg-[#1c2333] px-4 py-3 rounded-xl border border-white/10 shrink-0 text-center">
              <div>
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Ley de la Rentabilidad</div>
                <div className="text-xs font-bold text-white uppercase tracking-wide mt-0.5">ROI &gt; 100% Habitual</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left column: Simulator Sliders */}
            <div className="col-span-12 lg:col-span-5 space-y-4 bg-slate-900/30 border border-white/5 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-tedi-pink" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Variables del Simulador de ROI
                </h3>
              </div>

              {/* Area slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Área del Proyecto:</span>
                  <span className="text-white font-bold">{area.toLocaleString()} m²</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="50000" 
                  step="1000"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Initial Detected Clashes slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Interferencias Iniciales:</span>
                  <span className="text-white font-bold">{detectedClashes} colisiones</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="1500" 
                  step="10"
                  value={detectedClashes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setDetectedClashes(val);
                    if (resolvedClashes > val) {
                      setResolvedClashes(val);
                    }
                  }}
                  className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Resolved Clashes slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Interferencias Solucionadas:</span>
                  <span className="text-tedi-pink font-bold">{cleanResolved} de {detectedClashes}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={detectedClashes} 
                  step="5"
                  value={cleanResolved}
                  onChange={(e) => setResolvedClashes(parseInt(e.target.value))}
                  className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Coordination Cost slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Presupuesto Coordinación BIM:</span>
                  <span className="text-white font-bold">${coordinationCost.toLocaleString()} USD</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="60000" 
                  step="1000"
                  value={coordinationCost}
                  onChange={(e) => setCoordinationCost(parseInt(e.target.value))}
                  className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Average Clash Savings slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Costo Promedio Rework/Colisión:</span>
                  <span className="text-slate-300 font-bold">${averageClashCost} USD</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="500" 
                  step="10"
                  value={averageClashCost}
                  onChange={(e) => setAverageClashCost(parseInt(e.target.value))}
                  className="w-full accent-tedi-pink bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
                <p className="text-[8px] text-slate-500 leading-normal italic">
                  Impacto financiero estimado de no solucionar una colisión en modelo y tener que demoler, rediseñar o parchar en obra física.
                </p>
              </div>
            </div>

            {/* Right column: KPIs Screen Dashboard */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* KPI 1: TIR */}
                <div className="bg-[#050510] border border-white/10 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">TIR (Tasa Interferencia Resuelta)</span>
                    <span className="bg-tedi-pink/15 text-tedi-pink p-1 rounded-lg text-xs font-mono font-bold">%</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-mono font-black text-white">{tir}%</div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${tir >= 92 ? 'bg-emerald-500' : tir >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} 
                        style={{ width: `${tir}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[8px] text-slate-500 mt-1 uppercase">Meta BEP estándar: &gt;90% antes de construir</span>
                </div>

                {/* KPI 2: IC */}
                <div className="bg-[#050510] border border-white/10 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">IC (Densidad de Colisiones)</span>
                    <span className="bg-tedi-orange/15 text-tedi-orange p-1 rounded-lg text-xs font-mono font-bold">m²</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-mono font-black text-white">{ic} <span className="text-[10px] text-slate-400 font-normal">colisiones/m²</span></div>
                    <div className="text-[8px] mt-1">
                      {ic <= 0.05 ? (
                        <span className="text-emerald-400 font-bold">Densidad Excelente (Modelo Limpio)</span>
                      ) : ic <= 0.15 ? (
                        <span className="text-amber-400 font-bold">Densidad Normal (Complejidad Media)</span>
                      ) : (
                        <span className="text-red-400 font-bold">Densidad Crítica (Revisar modelado)</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[8px] text-slate-500 mt-1 uppercase">Mide la salud inicial de los modelos federados</span>
                </div>

                {/* KPI 3: Saved Rework */}
                <div className="bg-[#050510] border border-white/10 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Costo Rework Evitado</span>
                    <span className="bg-emerald-500/10 text-emerald-400 p-1 rounded-lg text-xs font-mono font-bold">$</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-mono font-black text-emerald-400">${potentialReworkSaved.toLocaleString()} USD</div>
                    <span className="text-[8px] text-slate-400 block mt-1">Ahorro bruto por resolver {cleanResolved} colisiones</span>
                  </div>
                  <span className="text-[8px] text-slate-500 uppercase">Impacto directo en cuenta de resultados</span>
                </div>

                {/* KPI 4: ROI */}
                <div className="bg-[#050510] border border-white/10 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">ROI de Coordinación</span>
                    <span className="bg-tedi-pink/15 text-tedi-pink p-1 rounded-lg text-xs font-mono font-bold">%</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-mono font-black text-white">{roiValue}%</div>
                    <span className="text-[8px] text-slate-400 block mt-1">
                      {roiValue > 500 ? 'Retorno Extraordinario' : roiValue > 100 ? 'Coordinación Altamente Rentable' : roiValue > 0 ? 'Retorno Positivo' : 'Coordinación Ineficiente'}
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-500 uppercase">Justificación financiera ante el directorio</span>
                </div>
              </div>

              {/* AUDIT STATUS REPORT */}
              <div className={`p-5 rounded-2xl border ${auditColor} space-y-2`}>
                <div className="flex items-center gap-2">
                  {auditStatus === 'green' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {auditStatus === 'amber' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
                  {auditStatus === 'red' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
                  <h4 className="text-xs font-mono font-black uppercase tracking-wider">{auditTitle}</h4>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  {auditMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
