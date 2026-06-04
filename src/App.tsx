/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  ArrowRight, ArrowLeft, Building2, Database, ShieldAlert, TrendingUp, 
  MonitorCheck, Users2, Layers, MessageSquare, ChevronRight, Info,
  CheckCircle2, AlertTriangle, Lightbulb, ClipboardList, Sliders, Award, Clock,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { CascadaSlide } from './components/CascadaSlide';
import { CicloIntroSlide } from './components/CicloIntroSlide';
import { CdeFlowSlide } from './components/CdeFlowSlide';
import { ContratosBimSlide } from './components/ContratosBimSlide';
import { RolesBimSlide } from './components/RolesBimSlide';
import { EquiposBimSlide } from './components/EquiposBimSlide';
import { BepStructureSlide } from './components/BepStructureSlide';
import { RefreshCw, Share2, Network, HardHat } from 'lucide-react';

// --- Types ---
interface SlideProps {
  onNext?: () => void;
  onPrev?: () => void;
}

// --- Mock Data ---
const MACLEAMY_DATA = [
  { name: 'Concepto', costoTradicional: 5, costoBIM: 10, impactoCambio: 100 },
  { name: 'Diseño', costoTradicional: 15, costoBIM: 25, impactoCambio: 80 },
  { name: 'CDs', costoTradicional: 50, costoBIM: 30, impactoCambio: 40 },
  { name: 'Construcción', costoTradicional: 100, costoBIM: 60, impactoCambio: 10 },
];

const lifecycleData = [
  { phase: 'Diseño', value: 10 },
  { phase: 'Construcción', value: 20 },
  { phase: 'Operaciones', value: 70 },
];

// --- Components ---

const TediLogo = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="py-2.5 px-1 inline-flex items-center justify-center w-full select-none hover:scale-[1.02] transition-transform duration-300">
      <img 
        src="https://i.postimg.cc/xd96FXW3/LOGO.jpg" 
        alt="TEDI" 
        className="h-12 w-full object-contain filter invert hue-rotate-180 brightness-110 contrast-125 mix-blend-screen select-none pointer-events-none" 
      />
    </div>
    <div className="flex items-center gap-2 px-1 mt-1">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-artis-orange/50 to-transparent"></div>
      <span className="text-[7.5px] font-bold tracking-[0.35em] text-slate-400 uppercase leading-none font-mono">BIM MÓDULO DIRECTIVO</span>
    </div>
  </div>
);

const Building3D = ({ showData = false, showCost = false, showStatus = false, showGantt = false, showInterference = false }: { showData?: boolean; showCost?: boolean; showStatus?: boolean; showGantt?: boolean; showInterference?: boolean }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 45 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <div 
      className="relative w-full h-full perspective-1000 flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => { setIsMouseDown(false); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={(e) => {
        if (isMouseDown) {
          setRotation(r => ({
            x: r.x - e.movementY * 0.5,
            y: r.y + e.movementX * 0.5
          }));
        }
      }}
    >
      <div className="absolute inset-0 immersive-grid opacity-10 pointer-events-none"></div>
      
      <motion.div 
        className="w-48 h-72 relative preserve-3d"
        animate={{ 
          rotateX: rotation.x, 
          rotateY: rotation.y 
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        {/* Building Floors Structure */}
        <div className="absolute inset-0 border-2 border-artis-orange/40 bg-artis-orange/5 preserve-3d shadow-[0_0_50px_rgba(255,164,0,0.1)]">
            {/* Front & Back */}
            <div className="absolute inset-0 border border-white/10" style={{ transform: 'translateZ(40px)' }}>
               {[...Array(6)].map((_, i) => <div key={i} className="h-px w-full bg-white/5" style={{ top: `${(i+1)*16.6}%`, position: 'absolute' }} />)}
            </div>
            <div className="absolute inset-0 border border-white/10" style={{ transform: 'translateZ(-40px)' }}></div>
            
            {/* Sides */}
            <div className="absolute inset-0 border border-white/10" style={{ transform: 'rotateY(90deg) translateZ(24px)' }}></div>
            <div className="absolute inset-0 border border-white/10" style={{ transform: 'rotateY(-90deg) translateZ(24px)' }}></div>
            
            {/* Top */}
            <div className="absolute w-full h-20 border border-white/10" style={{ transform: 'rotateX(90deg) translateZ(40px)' }}></div>
        </div>
        
        {/* Interference Clashing Elements (Red Planes) */}
        {showInterference && (
          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
            {/* Structural Beam (Horizontal) */}
            <motion.div 
               className="absolute w-40 h-12 bg-red-600/40 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)]"
               style={{ transform: 'translateZ(10px) rotateY(10deg)' }}
               animate={{ opacity: [0.4, 0.8, 0.4] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="text-[6px] font-black text-white uppercase tracking-tighter">VIGA ST-01</div>
            </motion.div>

            {/* MEP Service (Vertical Circle/Pipe) - The Clash Point */}
            <motion.div 
               className="absolute w-12 h-64 bg-red-600/60 border-2 border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.8)]"
               style={{ transform: 'translateX(20px) translateZ(5px)' }}
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rotate-90 text-[6px] font-black text-white uppercase tracking-tighter whitespace-nowrap">TUBO HIDRÁULICO</div>
               </div>
               
               {/* Impact Glow at center of intersection */}
               <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full blur-2xl opacity-40 animate-pulse"></div>
            </motion.div>
          </div>
        )}
        
        {/* Core Highlight */}
        {isHovered && (
          <motion.div 
            className="absolute inset-x-4 top-20 h-10 bg-artis-orange/20 border border-artis-orange shadow-[0_0_20px_rgba(255,164,0,0.5)] z-20"
            style={{ transform: 'translateZ(41px)' }}
          />
        )}
      </motion.div>
      
      {/* Interaction Tooltips */}
      <AnimatePresence>
        {isHovered && showData && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-10 right-10 glass-panel p-4 rounded-sm z-50 border-artis-orange/50"
          >
            <div className="text-artis-orange font-black text-[10px] mb-2 tracking-widest uppercase">Metadato Operativo</div>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex justify-between gap-8"><span className="text-slate-500">COD:</span> <span className="text-white">ART-ST-402</span></div>
              <div className="flex justify-between gap-8"><span className="text-slate-500">MAT:</span> <span className="text-white">CONCRETO 4000 PSI</span></div>
              <div className="flex justify-between gap-8"><span className="text-slate-500">M3:</span> <span className="text-white">8.42</span></div>
            </div>
          </motion.div>
        )}

        {isHovered && showStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-[12px] font-black z-50 shadow-2xl border-2 border-white/20 whitespace-nowrap"
            style={{ transform: 'translateZ(100px)' }}
          >
            ESTADO: CONSTRUIDO
          </motion.div>
        )}

        {isHovered && showCost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-10 left-10 glass-panel p-4 rounded-sm z-50 border-artis-orange/50"
          >
            <div className="text-artis-orange font-black text-[10px] mb-2 tracking-widest">VALOR UNITARIO</div>
            <div className="text-2xl font-mono font-bold text-white tracking-tighter">$4,250.00</div>
            <div className="text-[8px] text-slate-500 mt-1">COSTO INSTALADO (MATERIAL + MO)</div>
          </motion.div>
        )}
      </AnimatePresence>

      {showGantt && (
        <div className="absolute bottom-4 left-6 right-6 h-12 glass-panel rounded-sm overflow-hidden flex items-center px-4 gap-2 border-white/5">
           <div className="h-2 w-24 bg-artis-orange rounded-full shadow-[0_0_10px_rgba(255,164,0,0.6)]"></div>
           <div className="h-2 flex-1 bg-white/5 rounded-full relative overflow-hidden">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-artis-orange/40" 
               initial={{ width: "0%" }}
               animate={{ width: "65%" }}
               transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
             />
           </div>
           <span className="text-[8px] font-mono text-artis-orange">FASE: ESTRUCTURA</span>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-600 tracking-[0.4em] uppercase">
        Interactuar para rotar activo digital
      </div>
    </div>
  );
};

const Sidebar = ({ current, total, onJump }: { current: number; total: number; onJump: (i: number) => void }) => {
  const clase1Steps = [
    { idx: 0, title: "Inicio", icon: <Building2 className="w-4 h-4" /> },
    { idx: 1, title: "1. Fundamento", icon: <Layers className="w-4 h-4" /> },
    { idx: 2, title: "2. Coordinación", icon: <Users2 className="w-4 h-4" /> },
    { idx: 3, title: "4. Control", icon: <MonitorCheck className="w-4 h-4" /> },
    { idx: 4, title: "5. Ejecución", icon: <TrendingUp className="w-4 h-4" /> },
    { idx: 5, title: "Elevator Pitch", icon: <Lightbulb className="w-4 h-4" /> },
    { idx: 6, title: "Madurez BIM", icon: <ClipboardList className="w-4 h-4" /> },
    { idx: 7, title: "Guía de Ejecución", icon: <Sliders className="w-4 h-4" /> },
  ];

  const clase2Steps = [
    { idx: 8, title: "El Ciclo ISO", icon: <RefreshCw className="w-4 h-4" /> },
    { idx: 9, title: "Roles BIM", icon: <Users2 className="w-4 h-4" /> },
    { idx: 10, title: "1. La Cascada ISO", icon: <Database className="w-4 h-4" /> },
    { idx: 11, title: "2. Flujo del CDE", icon: <Share2 className="w-4 h-4" /> },
    { idx: 12, title: "3. Cláusulas BIM", icon: <FileText className="w-4 h-4" /> },
  ];

  const clase4Steps = [
    { idx: 13, title: "Equipos BIM", icon: <Users2 className="w-4 h-4" /> },
    { idx: 14, title: "Estructura BEP", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="hidden lg:flex flex-col w-72 bg-artis-black text-white p-8 justify-between border-r border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 immersive-grid opacity-10 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="mb-12">
          <TediLogo />
        </div>
        <nav className="space-y-6">
          <div>
            <div className="px-4 mb-3 text-[8px] font-black text-slate-500 uppercase tracking-[0.25em] font-mono">
              Clase 1: Módulo Directivo
            </div>
            <div className="space-y-1">
              {clase1Steps.map((step) => (
                <button
                  key={step.idx}
                  onClick={() => onJump(step.idx)}
                  className={cn(
                    "flex items-center gap-4 w-full px-4 py-2.5 rounded-lg transition-all text-xs font-bold uppercase tracking-widest cursor-pointer",
                    current === step.idx 
                      ? "bg-artis-orange/10 text-artis-orange border border-artis-orange/30 shadow-[0_0_15px_rgba(255,164,0,0.1)] font-black" 
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <span className={cn(current === step.idx ? "text-artis-orange" : "text-slate-600")}>{step.icon}</span>
                  {step.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="px-4 mb-3 text-[8px] font-black text-pink-500 uppercase tracking-[0.25em] font-mono">
              Clase 2: ISO 19650
            </div>
            <div className="space-y-1">
              {clase2Steps.map((step) => (
                <button
                  key={step.idx}
                  onClick={() => onJump(step.idx)}
                  className={cn(
                    "flex items-center gap-4 w-full px-4 py-2.5 rounded-lg transition-all text-xs font-bold uppercase tracking-widest cursor-pointer",
                    current === step.idx 
                      ? "bg-[#de1b7d]/15 text-white border border-[#de1b7d]/35 shadow-[0_0_15px_rgba(222,27,125,0.15)] font-black" 
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <span className={cn(current === step.idx ? "text-pink-500" : "text-slate-600")}>{step.icon}</span>
                  {step.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="px-4 mb-3 text-[8px] font-black text-[#38bdf8] uppercase tracking-[0.25em] font-mono">
              Clase 4: Recursos ISO
            </div>
            <div className="space-y-1">
              {clase4Steps.map((step) => (
                <button
                  key={step.idx}
                  onClick={() => onJump(step.idx)}
                  className={cn(
                    "flex items-center gap-4 w-full px-4 py-2.5 rounded-lg transition-all text-xs font-bold uppercase tracking-widest cursor-pointer",
                    current === step.idx 
                      ? "bg-[#38bdf8]/15 text-white border border-[#38bdf8]/35 shadow-[0_0_15px_rgba(56,189,248,0.15)] font-black" 
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <span className={cn(current === step.idx ? "text-[#38bdf8]" : "text-slate-600")}>{step.icon}</span>
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <div className="relative z-10">
        <div className="px-4 py-3 bg-artis-teal-dark/30 border border-artis-teal/20 rounded-xl">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Status Metodológico</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-artis-orange animate-pulse"></div>
            <span className="text-[10px] font-mono text-artis-orange/80">TEDI VIRTUAL v3.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Slides ---

const IntroSlide = () => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="h-full flex flex-col justify-center max-w-6xl"
  >
    <div className="flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 border border-artis-orange/30 bg-artis-orange/5 text-artis-orange rounded-sm text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-artis-orange to-transparent"></div>
          <Building2 className="w-3 h-3" />
          <span>Estrategia de Gestión 2026</span>
        </div>
        <h1 className="text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-10 tracking-tighter">
          BIM:<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-artis-orange to-artis-orange-deep italic pr-2">DE LA GESTIÓN</span><br/>
          AL DATO.
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-xl mb-12">
          Transformando la construcción en una industria de datos precisos para decisiones estratégicas en tiempo real.
        </p>
        
        <div className="glass-panel border border-artis-teal/10 px-8 py-6 rounded-sm w-fit shadow-2xl">
          <div className="text-4xl font-mono font-bold text-white tracking-tight">DATA</div>
          <div className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-2 font-mono">Verdad Estructural</div>
        </div>
      </div>

      {/* BIM Dimensions Roadmap */}
      <div className="w-full lg:w-[450px]">
        <div className="glass-panel p-8 rounded-sm border border-white/5 relative overflow-hidden shadow-2xl art-glow bg-artis-black/60">
          <h3 className="text-artis-orange font-black text-xs uppercase tracking-widest mb-6 border-b border-white/10 pb-4 italic">Mapa de Implementación TEDI</h3>
          <div className="space-y-2">
            {[
              { dim: "1D", label: "Idea / Concepto", status: "legacy", desc: "Fase Inicial" },
              { dim: "2D", label: "Dibujo Técnico", status: "legacy", desc: "Planimetría 2D" },
              { dim: "3D", label: "Modelado / BIM", status: "active", desc: "Fundamento y Coordinación" },
              { dim: "4D", label: "Gestión Tiempo", status: "active", desc: "Control de Obra" },
              { dim: "5D", label: "Gestión Costos", status: "active", desc: "Ejecución Presupuestaria" },
              { dim: "6D", label: "Sustentabilidad", status: "future", desc: "Huella Energética" },
              { dim: "7D", label: "Mantenimiento", status: "future", desc: "Operación de Activos" },
            ].map((d, i) => (
              <div key={i} className={cn(
                "flex items-center gap-4 p-2.5 border rounded-sm transition-all",
                d.status === "active" && "opacity-100 border-artis-orange/40 bg-artis-orange/5 shadow-[0_0_15px_rgba(255,164,0,0.1)]",
                d.status === "legacy" && "opacity-80 border-artis-orange/10 bg-transparent",
                d.status === "future" && "opacity-70 border-white/10 bg-white/2"
              )}>
                <div className={cn(
                  "w-9 h-9 flex items-center justify-center font-black text-xs font-mono rounded-full border-2 shrink-0",
                  d.status === "active" && "border-artis-orange text-artis-orange bg-artis-orange/10 shadow-[0_0_10px_rgba(255,164,0,0.2)]",
                  d.status === "legacy" && "border-artis-orange/30 text-artis-orange/50",
                  d.status === "future" && "border-slate-600 text-slate-400"
                )}>
                  {d.dim}
                </div>
                <div>
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-tight", 
                    d.status === "active" ? "text-white" : (d.status === "legacy" ? "text-slate-300" : "text-slate-400")
                  )}>{d.label}</div>
                  <div className="text-[8px] text-slate-500 italic leading-none mt-1">{d.desc}</div>
                </div>
                {d.status === "active" && <div className="ml-auto w-1 h-1 rounded-full bg-artis-orange animate-pulse"></div>}
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-white/10">
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Enfoque: <span className="text-artis-orange">BIM 3D, 4D & 5D (Core Business)</span></p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FundamentoSlide = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-full flex flex-col max-w-6xl"
  >
    <div className="mb-12">
      <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Bloque 1: <span className="text-artis-orange">Fundamento (3D)</span></h2>
      <p className="text-slate-400 max-w-2xl text-lg underline decoration-white/5 underline-offset-8 italic">
        "BIM no es un software, es una metodología basada en un modelo digital que contiene toda la información técnica."
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="p-8 glass-panel rounded-sm relative border-l-4 border-artis-orange shadow-lg">
          <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-white flex items-center gap-3">
            <Layers className="w-5 h-5 text-artis-orange" /> Dimensión 3: Geometría
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Pasamos de representar con líneas a <strong>construir virtualmente</strong>. Cada elemento es ahora una entidad con datos.
          </p>
        </div>
        <div className="p-8 glass-panel rounded-sm relative border-l-4 border-artis-teal">
          <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-white">Visualización Activa</h3>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            "Ver el proyecto antes de poner el primer ladrillo permite detectar errores críticos antes de que ocurran."
          </p>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-sm relative h-[500px] bg-artis-black border-artis-orange/10">
         <Building3D showData={true} />
      </div>
    </div>
  </motion.div>
);

const CoordinacionSlide = () => (
  <motion.div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
    <div className="mb-12">
      <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Bloque 2: <span className="text-artis-orange">Coordinación (3D)</span></h2>
      <p className="text-slate-400 text-lg italic">Integración de sistemas para mitigar desviaciones en fase de obra.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="group p-8 glass-panel rounded-sm hover:border-artis-orange/30 transition-all cursor-default">
          <div className="flex items-center gap-5">
            <Users2 className="w-8 h-8 text-artis-orange" />
            <div>
              <h4 className="font-bold text-lg text-white mb-1 uppercase tracking-tight">Especialidades Integradas</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Arquitectura, Estructura y MEP en un entorno común de datos.</p>
            </div>
          </div>
        </div>

        <div className="group p-8 glass-panel rounded-sm border-l-4 border-artis-orange transition-all cursor-default bg-artis-orange/5">
          <div className="flex items-center gap-5">
            <Layers className="w-8 h-8 text-artis-orange" />
            <div>
              <h4 className="font-bold text-lg text-white mb-1 uppercase tracking-tight">Trabajo Colaborativo</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Sinergia real entre disciplinas para resolver interferencias antes del impacto en sitio.</p>
            </div>
          </div>
        </div>

        <div className="group p-8 glass-panel rounded-sm hover:border-artis-teal/30 transition-all cursor-default">
          <div className="flex items-center gap-5">
            <ShieldAlert className="w-8 h-8 text-artis-teal" />
            <div>
              <h4 className="font-bold text-lg text-white mb-1 uppercase tracking-tight">Seguridad Técnica</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Detección proactiva de colisiones, salvaguardando el presupuesto y cronograma.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-0 rounded-sm relative h-[450px] bg-artis-black overflow-hidden border-artis-orange/20 shadow-2xl">
        <Building3D showStatus={false} showInterference={true} />
        {/* Overlay for "Interference" visual feedback */}
        <div className="absolute top-10 right-10 z-50 pointer-events-none">
           <div className="bg-artis-black p-4 border border-artis-orange-deep/50 rounded shadow-2xl text-[9px] font-mono w-52 artis-glow">
              <div className="text-artis-orange-deep font-black mb-1 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 animate-pulse" />
                INTERFERENCIA CRÍTICA
              </div>
              <div className="text-slate-500 uppercase tracking-tighter">VIGA ST-01 vs RED HIDRÁULICA</div>
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const AnalisisSlide = () => (
  <motion.div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
    <div className="mb-12">
      <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Bloque 5: <span className="text-artis-orange">Ejecución (Quinta Dimensión)</span></h2>
      <p className="text-slate-400 text-lg italic">El modelo es ahora una base de datos dinámica para tiempo y costos.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-[500px]">
      <div className="space-y-6 flex flex-col justify-center">
          <div className="glass-panel p-8 rounded-sm relative border-l-4 border-artis-orange shadow-2xl">
             <div className="flex items-center gap-4 mb-2">
               <TrendingUp className="w-5 h-5 text-artis-orange" />
               <h4 className="font-bold text-white uppercase tracking-widest text-sm">Dimensión 5: Presupuesto</h4>
             </div>
             <p className="text-sm text-slate-400">
               Extracción automática de cantidades. El presupuesto se deriva directamente de la geometría 3D, minimizando el error humano.
             </p>
          </div>
          <div className="bg-artis-orange/10 p-8 border border-artis-orange/20 rounded-sm mt-4 artis-glow">
            <p className="text-[10px] text-artis-orange font-bold uppercase mb-2 tracking-widest">Información al Instante</p>
            <p className="text-[10px] text-slate-400 italic">
              Al interactuar con el modelo en pantalla, obtenemos el <strong>costo de elemento</strong> proyectado vinculado a la base de datos central.
            </p>
          </div>
      </div>
      
      <div className="glass-panel p-0 rounded-sm relative h-full bg-artis-black overflow-hidden border-artis-orange/10 shadow-2xl">
        <Building3D showCost={true} showGantt={true} />
      </div>
    </div>
  </motion.div>
);

const ConstruccionSlide = () => (
  <motion.div className="h-full flex flex-col max-w-6xl mx-auto">
    <div className="mb-6 border-b border-white/5 pb-4">
      <h2 className="text-4xl font-black uppercase tracking-tighter">Bloque 4: <span className="text-artis-orange">Control de Obra (Cuarta Dimensión)</span></h2>
      <p className="text-slate-500 text-sm italic font-medium">Seguimiento en tiempo real de la realidad vs el proyecto digital.</p>
    </div>
    
    <div className="flex flex-col gap-4 h-full">
      {/* Visor above the dashboard, reduced height for better proportions */}
      <div className="h-[240px] glass-panel rounded-sm bg-artis-black overflow-hidden relative border-artis-orange/20 artis-glow shadow-2xl">
         <Building3D showStatus={true} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-4">
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "Seguimiento Live", icon: <MonitorCheck className="text-artis-orange w-5 h-5"/>, desc: "Verificación de avance físico versus proyectado mediante nube de puntos." },
            { label: "Automatización", icon: <CheckCircle2 className="text-artis-orange w-5 h-5"/>, desc: "Dashboards que se alimentan del modelo centralizado para reportes inmediatos." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 glass-panel rounded-sm relative border border-white/5 hover:bg-white/5 transition-colors group">
              <div className="shrink-0 mt-1">{item.icon}</div>
              <div>
                <span className="block font-bold text-white uppercase tracking-tight text-xs mb-0.5">{item.label}</span>
                <span className="block text-[10px] text-slate-500 leading-relaxed font-medium">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel p-5 rounded-sm relative h-full bg-artis-black/60 border border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-artis-orange uppercase tracking-widest italic">Live Dashboard</span>
              <span className="text-[12px] font-bold text-white uppercase tracking-tighter">TEDI Virtual Central</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-artis-orange"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-artis-teal-dark/10 p-4 border border-white/5 rounded-sm">
                <div className="text-[7px] text-slate-500 uppercase mb-1 font-bold">Avance Físico</div>
                <div className="text-2xl font-mono font-bold text-white tracking-tighter">68.4%</div>
                <div className="w-full h-1 bg-slate-800 mt-2"><motion.div initial={{ width: 0 }} animate={{ width: "68.4%" }} transition={{ duration: 1 }} className="h-full bg-artis-orange shadow-[0_0_5px_#FFA400]"></motion.div></div>
             </div>
             <div className="bg-artis-teal-dark/10 p-4 border border-white/5 rounded-sm">
                <div className="text-[7px] text-slate-500 uppercase mb-1 font-bold">Status Obra</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">EN PLAZO</div>
                <div className="text-[7px] text-slate-600 mt-1 uppercase italic tracking-tighter">Sin Desviaciones</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const PitchSlide = () => (
  <motion.div className="h-full flex flex-col justify-center items-center max-w-6xl mx-auto text-center">
    <div className="mb-16">
      <div className="text-artis-orange font-mono text-sm mb-4 tracking-[0.5em] uppercase">Propuesta de Valor</div>
      <h2 className="text-6xl font-black mb-6 uppercase tracking-tighter">Puntos <span className="text-artis-teal italic underline decoration-artis-orange underline-offset-12">Clave</span></h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {[
        { title: "Gestión Riesgos", icon: <ShieldAlert className="text-artis-orange-deep"/>, desc: "Controlamos colisiones en fase digital, no en la excavación." },
        { title: "Control", icon: <Database className="text-artis-teal"/>, desc: "El presupuesto sale del modelo centralizado. Datos técnicos, no estimaciones." },
        { title: "Eficiencia", icon: <TrendingUp className="text-artis-orange"/>, desc: "Mediante la innovación se generan herramientas que mejoran el desempeño de los proyectos y la información exacta en tiempo real." },
      ].map((v, i) => (
        <div key={i} className="p-10 glass-panel rounded-sm relative group hover:border-artis-orange/20 transition-all flex flex-col items-center">
          <div className="mb-6 bg-artis-black border border-white/5 w-16 h-16 flex items-center justify-center rounded-full shadow-inner">
            {v.icon}
          </div>
          <h4 className="font-bold text-white uppercase tracking-tight mb-4 text-xl">{v.title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-16 p-8 glass-panel border-artis-orange/30 bg-artis-orange/5 rounded-sm max-w-2xl">
      <p className="text-artis-orange font-mono text-[10px] uppercase italic tracking-[0.5em]">
        "BIM: El activo digital es tan valioso como el físico."
      </p>
    </div>
  </motion.div>
);

const getMaturityStats = (avg: number, budget: string, timeline: string) => {
  let lvl = "";
  let badgeColor = "";
  
  if (avg < 1.75) {
    lvl = "Nivel 1: Inicial / Reactivo";
    badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
  } else if (avg < 2.75) {
    lvl = "Nivel 2: Definido / Localizado";
    badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
  } else if (avg < 3.75) {
    lvl = "Nivel 3: Estandarizado / Colaborativo";
    badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  } else {
    lvl = "Nivel 4: Optimizado / Integrado";
    badgeColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  }

  // Calculate scope based on values
  let scopeTitle = "";
  let scopeDesc = "";

  if (avg < 2.0) {
    if (budget === "Limitado" || timeline === "Ajustado") {
      scopeTitle = "Fase Piloto Controlado (BIM 3D Minimalista)";
      scopeDesc = "Concentrar el 100% del recurso en modelar un solo subsistema crítico (p.ej. estructura principal) y capacitar al equipo clave. No intentar integración 4D/5D aún.";
    } else {
      scopeTitle = "Plan de Estandarización y Modelado Base (BIM 3D)";
      scopeDesc = "Desarrollar plantilla corporativa y arrancar con modelado 3D de arquitectura estructural. Establecer flujos básicos de traspaso de planos CAD a BIM.";
    }
  } else if (avg < 3.0) {
    if (budget === "Limitado") {
      scopeTitle = "Coordinación de Interferencias (3D Colaborativo)";
      scopeDesc = "Enfocarse en resolver choques críticos entre Estructuras y MEP. Usar almacenamiento básico en la nube. Ahorro inmediato de sobrecostos en obra.";
    } else if (timeline === "Ajustado") {
      scopeTitle = "Doble Núcleo: Coordinación 3D + Control de Plazos (BIM 4D)";
      scopeDesc = "Priorizar la simulación de etapas constructivas para garantizar el cronograma. Automatizar reportes de interferencias semanales.";
    } else {
      scopeTitle = "BIM Integral de Obra (3D + Coordinación + Presupuesto 5D)";
      scopeDesc = "Vincular el presupuesto centralizado al modelo geométrico. Extracción de cantidades directa para compras y órdenes de cambio dinámicas.";
    }
  } else {
    // High maturity
    if (budget === "Limitado") {
      scopeTitle = "Automatización Cloud & QA de Modelos";
      scopeDesc = "Aprovechar el personal capacitado para automatizar reglas de revisión de modelos (QA) y optimizar flujos colaborativos usando CDE económicos.";
    } else {
      scopeTitle = "TEDI Virtual Completo (Ecosistema BIM 5D + 7D Twin Ready)";
      scopeDesc = "Máxima integración tecnológica. Conexión automatizada de bases de datos de obra con el modelo centralizado. Preparación directa del modelo de mantenimiento de activos (As-Built Digital).";
    }
  }

  return { lvl, badgeColor, scopeTitle, scopeDesc };
};

const MaturitySlide = () => {
  const [techLvl, setTechLvl] = useState(2);
  const [processLvl, setProcessLvl] = useState(2);
  const [peopleLvl, setPeopleLvl] = useState(2);
  const [dataLvl, setDataLvl] = useState(2);
  const [budget, setBudget] = useState("Medio"); // "Limitado", "Medio", "Óptimo"
  const [timeline, setTimeline] = useState("Estándar"); // "Ajustado", "Estándar", "Flexible"

  const avgScore = Number(((techLvl + processLvl + peopleLvl + dataLvl) / 4).toFixed(2));

  // Framework data:
  const pillars = [
    {
      id: "tech",
      name: "Tecnología (T)",
      subtitle: "Hardware, Software e Infraestructura",
      current: techLvl,
      setter: setTechLvl,
      icon: <Layers className="w-5 h-5 text-artis-orange" />,
      levels: [
        { lvl: 1, text: "Equipos gama baja (i3 o menores). CAD 2D. Conectividad inestable o nula. Almacenamiento local aislado." },
        { lvl: 2, text: "Equipos gama media. Software especializado por islas (Cálculo, CAD). Nube básica para transferir archivos (Drive/Dropbox)." },
        { lvl: 3, text: "Estaciones de trabajo adecuadas para 3D. Software de autoría BIM. Entorno Común de Datos (CDE) configurado." },
        { lvl: 4, text: "Servidores optimizados o Cloud nativo. Integración de bases de datos (SQL, APIs, automatizaciones). Visores web ligeros." }
      ]
    },
    {
      id: "process",
      name: "Procesos (P)",
      subtitle: "Metodologías y Estándares",
      current: processLvl,
      setter: setProcessLvl,
      icon: <TrendingUp className="w-5 h-5 text-artis-orange" />,
      levels: [
        { lvl: 1, text: "No existen procesos documentados. Cada profesional trabaja bajo su propio criterio. Entregas tradicionales en papel/PDF." },
        { lvl: 2, text: "Procesos internos verbales o guías básicas de dibujo. Intercambio de información reactivo. Sin conocimiento de normas BIM." },
        { lvl: 3, text: "Flujos de trabajo bajo estándares de organización (ej. ISO 19650). Uso de BEP (Plan de Ejecución BIM) y plantillas corporativas." },
        { lvl: 4, text: "Mejora continua basada en analítica de datos. Auditorías automatizadas de modelos. Flujos ágiles y Lean Construction incorporados." }
      ]
    },
    {
      id: "people",
      name: "Personas (H)",
      subtitle: "Cultura, Roles y Competencias",
      current: peopleLvl,
      setter: setPeopleLvl,
      icon: <Users2 className="w-5 h-5 text-artis-orange" />,
      levels: [
        { lvl: 1, text: "Resistencia total al cambio. Personal sin capacitación en herramientas digitales. Roles 100% tradicionales." },
        { lvl: 2, text: "Interés aislado (algunos modelan por su cuenta). Resistencia en la media/alta gerencia. Sin roles BIM oficiales." },
        { lvl: 3, text: "Organigrama con roles definidos (Manager, Coordinador, Modelador). Capacitación continua. La gerencia apoya la digitalización." },
        { lvl: 4, text: "Cultura de innovación abierta. Personal interdisciplinario con habilidades de programación/automatización. Cero fricción al cambio." }
      ]
    },
    {
      id: "data",
      name: "Destino del Dato (D)",
      subtitle: "Uso y Explotación de la Información",
      current: dataLvl,
      setter: setDataLvl,
      icon: <Database className="w-5 h-5 text-artis-orange" />,
      levels: [
        { lvl: 1, text: "La información muere en el plano impreso. Postventas y compras operan desvinculados del diseño (Excel/Papel)." },
        { lvl: 2, text: "El presupuesto usa datos del diseño, pero mediante transcripción manual. Pérdida de trazabilidad de los cambios." },
        { lvl: 3, text: "Modelos coordinados que alimentan presupuestos (5D) y cronogramas (4D). Formatos de intercambio abiertos (IFC / COBie)." },
        { lvl: 4, text: "Modelos As-Built vinculados a Gemelos Digitales o sistemas CMMS/IWMS de operación en tiempo real (7D)." }
      ]
    }
  ];

  const { lvl, badgeColor, scopeTitle, scopeDesc } = getMaturityStats(avgScore, budget, timeline);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10"
    >
      <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div>
          <span className="text-artis-orange font-mono text-[9px] uppercase tracking-[0.4em] font-black">Pilares de Negocio</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1 italic">
            Evaluación de <span className="text-white">Madurez BIM</span>
          </h2>
          <p className="text-slate-400 text-xs">
            Framework VMT para Auditoría y Diagnóstico BIM. Evalúa tecnología, procesos, talento y datos.
          </p>
        </div>
        <div className="bg-artis-black px-4 py-2 border border-white/5 rounded-full flex items-center gap-3 shrink-0">
          <Award className="w-4 h-4 text-artis-orange" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Nivel {avgScore} - TEDI Certificación</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start flex-1 min-h-0">
        {/* Interactive Matrix Table */}
        <div className="xl:col-span-3 flex flex-col gap-4">
          <div className="glass-panel p-4 rounded-sm border border-white/5 bg-artis-black/40 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 text-[9px] uppercase tracking-widest text-slate-400 select-none">
                  <th className="py-3 px-3 w-[22%] font-black uppercase tracking-widest text-artis-orange">Pilar de Evaluación</th>
                  <th className="py-3 px-4 w-[19.5%] text-slate-400 font-bold">Nivel 1<br/><span className="text-[8px] text-slate-500 font-normal">Inicial / Reactivo</span></th>
                  <th className="py-3 px-4 w-[19.5%] text-slate-400 font-bold">Nivel 2<br/><span className="text-[8px] text-slate-500 font-normal">Definido / Localizado</span></th>
                  <th className="py-3 px-4 w-[19.5%] text-slate-400 font-bold">Nivel 3<br/><span className="text-[8px] text-slate-500 font-normal">Estandarizado / Colab.</span></th>
                  <th className="py-3 px-4 w-[19.5%] text-slate-400 font-bold">Nivel 4<br/><span className="text-[8px] text-slate-500 font-normal">Optimizado / Integrado</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pillars.map((pilar) => (
                  <tr key={pilar.id} className="group/row">
                    {/* Column 1: Row header */}
                    <td className="py-4 pr-3 py-3 font-semibold text-white">
                      <div className="flex gap-2.5 items-start">
                        <div className="mt-1 shrink-0 bg-white/5 p-1.5 rounded-sm border border-white/5">
                          {pilar.icon}
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-tight font-black text-white">{pilar.name}</div>
                          <div className="text-[8px] text-slate-500 font-mono mt-0.5 uppercase tracking-tighter leading-tight font-normal">{pilar.subtitle}</div>
                          <div className="mt-2.5 inline-flex items-center gap-1.5 bg-artis-orange/15 px-2 py-0.5 rounded-xs border border-artis-orange/20 text-[8px] font-mono font-bold text-artis-orange">
                            Nivel Actual: {pilar.current}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Columns 2-5: Levels */}
                    {pilar.levels.map((lvl) => {
                      const isActive = pilar.current === lvl.lvl;
                      return (
                        <td key={lvl.lvl} className="p-2 vertical-align-top">
                          <button
                            onClick={() => pilar.setter(lvl.lvl)}
                            className={cn(
                              "w-full h-full text-left p-3 rounded-sm text-[10px] leading-relaxed transition-all relative border overflow-hidden select-none",
                              isActive
                                ? "bg-gradient-to-br from-artis-orange/10 to-artis-teal/5 border-artis-orange/60 text-white font-medium shadow-[0_0_15px_rgba(255,85,17,0.15)] scale-[1.01] z-10"
                                : "bg-[#0b0e17]/40 hover:bg-[#0e1220]/80 border-white/5 text-slate-400 group-hover/row:border-white/10"
                            )}
                          >
                            {/* Level absolute tag */}
                            <span className={cn(
                              "absolute top-1.5 right-1.5 font-mono text-[8px] font-black px-1 rounded-xs border",
                              isActive
                                ? "bg-artis-orange text-artis-black border-transparent"
                                : "bg-white/2 text-slate-500 border-white/5"
                            )}>
                              L{lvl.lvl}
                            </span>
                            
                            <p className="pr-4">{lvl.text}</p>
                            
                            {isActive && (
                              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-artis-orange via-artis-teal to-transparent" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-artis-orange/5 border border-artis-orange/10 rounded-sm">
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              <strong className="text-artis-orange font-bold uppercase tracking-wider font-mono mr-1">Instrucciones de Diagnóstico:</strong> 
              Haga clic sobre cualquiera de los cuadrantes anteriores correspondientes al estado actual de las capacidades tecnológicas, procesológicas, humanas y de datos de su organización. Los resultados se actualizarán dinámicamente en la consola derecha en concordancia con sus factores de mercado.
            </p>
          </div>
        </div>

        {/* Diagnosis Result Console */}
        <div className="space-y-4 font-sans">
          <div className="glass-panel p-5 rounded-sm border border-white/10 bg-[#090d16]/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-artis-orange/5 blur-2xl pointer-events-none"></div>
            
            <div>
              <span className="text-[9px] font-black text-artis-orange uppercase tracking-widest italic block mb-3">Consola Directiva</span>
              
              <div className="text-center py-4 bg-white/2 rounded-sm border border-white/5 mb-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Madurez BIM Promedio</div>
                <div className="text-5xl font-mono font-black text-white py-1">
                  {avgScore} <span className="text-[16px] text-slate-500 font-light">/ 4</span>
                </div>
                <span className={cn("inline-block px-3 py-0.5 rounded-full text-[8px] font-bold uppercase border tracking-widest mt-1", badgeColor)}>
                  {lvl}
                </span>
              </div>

              {/* Business Params */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1.5 select-none">
                    <Clock className="w-3 h-3 text-artis-orange" /> Plazos del Proyecto
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {["Ajustado", "Estándar", "Flexible"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={cn(
                          "py-1.5 rounded-xs text-[9px] font-bold uppercase select-none transition-all active:scale-95 border cursor-pointer",
                          timeline === t 
                            ? "bg-slate-100 text-artis-black border-transparent font-black shadow-md"
                            : "bg-white/2 text-slate-500 border-white/5 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1.5 select-none">
                    <Sliders className="w-3 h-3 text-artis-orange" /> Presupuesto
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {["Limitado", "Medio", "Óptimo"].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={cn(
                          "py-1.5 rounded-xs text-[9px] font-bold uppercase select-none transition-all active:scale-95 border cursor-pointer",
                          budget === b 
                            ? "bg-slate-100 text-artis-black border-transparent font-black shadow-md"
                            : "bg-white/2 text-slate-500 border-white/5 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Scope recommendation */}
            <div className="mt-5 pt-4 border-t border-white/5">
              <span className="text-[9px] font-black text-artis-teal uppercase tracking-widest block mb-2">Alcance BIM Viable (VMT)</span>
              <div className="p-3.5 bg-artis-teal-dark/35 border border-artis-teal/20 rounded-sm">
                <span className="block font-bold text-[11px] text-white uppercase tracking-tight mb-1">
                  {scopeTitle}
                </span>
                <span className="block text-[10px] text-slate-400 leading-normal font-sans">
                  {scopeDesc}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExecutionGuideSlide = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  // Interactive Simulator States
  const [tVal, setTVal] = useState(2);
  const [pVal, setPVal] = useState(2);
  const [hVal, setHVal] = useState(1);
  const [dVal, setDVal] = useState(1);

  // Step 2 target deliverables
  const [targetBim, setTargetBim] = useState("4D");

  // Step 3 financial input params
  const [budget, setBudget] = useState("Limitado"); // Limitado, Medio, Óptimo
  const [timeline, setTimeline] = useState("Muy Ajustado"); // Muy Ajustado (1-3m), Medio (4-6m), Flexible (7m+)

  // Pillars list
  const pillars = [
    { id: "tech", name: "Tecnología (T)", subtitle: "Equipos y Red", val: tVal, setter: setTVal, icon: <Layers className="w-4 h-4 text-pink-500" /> },
    { id: "process", name: "Procesos (P)", subtitle: "Estándares y BEP", val: pVal, setter: setPVal, icon: <TrendingUp className="w-4 h-4 text-artis-orange" /> },
    { id: "people", name: "Personas (H)", subtitle: "Cultura y Roles", val: hVal, setter: setHVal, icon: <Users2 className="w-4 h-4 text-rose-500" /> },
    { id: "data", name: "Destino del Dato (D)", subtitle: "Integraciones", val: dVal, setter: setDVal, icon: <Database className="w-4 h-4 text-cyan-400" /> }
  ];

  // Weakest link logic (Step 1)
  const weakestPillar = pillars.reduce((prev, curr) => (curr.val < prev.val ? curr : prev), pillars[0]);
  const overallLevel = weakestPillar.val;

  // VMT golden rule (Step 2)
  const minPeopleProcess = Math.min(pVal, hVal);
  let requiredLvl = 1;
  if (targetBim === "3D") requiredLvl = 1;
  else if (targetBim === "4D") requiredLvl = 2;
  else if (targetBim === "5D") requiredLvl = 3;
  else if (targetBim === "7D") requiredLvl = 3; // "Para exigir 7D, requieres procesos y personas mínimo en Nivel 3"

  const isVmtViable = minPeopleProcess >= requiredLvl;

  // step navigation
  const listSteps = [
    { num: 1, label: "Paso 1: Mapear Asimetría" },
    { num: 2, label: "Paso 2: Índice VMT" },
    { num: 3, label: "Paso 3: Filtro de Viabilidad" },
    { num: 4, label: "Paso 4: Contrapropuesta" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col max-w-7xl mx-auto overflow-y-auto pr-2 pb-10"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
        <div>
          <span className="text-artis-orange font-mono text-[9px] uppercase tracking-[0.4em] font-black">Guía Académica y de Negocios</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1 italic">
            Guía de Ejecución: <span className="text-white">Los 4 Pasos</span>
          </h2>
          <p className="text-slate-400 text-xs">
            Metodología analítica estructurada para estudiantes y consultores directivos TEDI.
          </p>
        </div>
        <div className="bg-artis-black px-4 py-2 border border-white/5 rounded-full flex items-center gap-3 shrink-0">
          <Sliders className="w-4 h-4 text-artis-orange animate-spin duration-1000" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">Simulador de Decisión v3.0</span>
        </div>
      </div>

      {/* Step Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6 select-none shrink-0 border border-white/5 bg-[#090d16]/30">
        {listSteps.map((st) => (
          <button
            key={st.num}
            onClick={() => setActiveStep(st.num)}
            className={cn(
              "py-3.5 px-4 rounded-xs font-bold uppercase transition-all border text-left flex items-center justify-between group cursor-pointer",
              activeStep === st.num
                ? "bg-gradient-to-r from-artis-orange/20 to-pink-500/5 text-white border-artis-orange/70 shadow-[0_0_15px_rgba(255,85,17,0.15)] scale-[1.01]"
                : "bg-transparent hover:bg-white/5 border-transparent text-slate-400"
            )}
          >
            <div className="flex flex-col text-left">
              <span className="text-[7.5px] font-mono tracking-widest text-[#de1b7d] uppercase font-black">Procedimiento</span>
              <span className="text-[10px] tracking-tight">{st.label}</span>
            </div>
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-black shrink-0 transition-transform",
              activeStep === st.num 
                ? "bg-artis-orange text-artis-black scale-110" 
                : "bg-white/5 text-slate-500 group-hover:scale-105"
            )}>
              0{st.num}
            </div>
          </button>
        ))}
      </div>

      {/* Main Panel Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 items-start">
        {/* Left Explanation Column (Academic Core) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-sm border border-white/5 bg-[#090d16]/30 shadow-xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="font-mono text-xs text-[#de1b7d] font-black">PASO 0{activeStep}</span>
                <div className="h-2 w-2 rounded-full bg-[#de1b7d] animate-ping"></div>
              </div>

              {activeStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Mapear la Asimetría Operativa</h3>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">
                    Consiste en listar y calificar formalmente los niveles de infraestructura, estándares, cultura y tecnología detectados en la auditoría inicial.
                  </p>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-sm">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Clave
                    </h4>
                    <p className="text-[10.5px] text-slate-300 leading-normal">
                      <strong>Regla del Eslabón Débil:</strong> El nivel de madurez operativa global de una constructora está estrictamente limitado por su pilar más rezagado. No genera ningún retorno de negocio actualizar a software Nivel 4 si la conectividad es inestable (Nivel 1) o si los roles humanos siguen en flujos analógicos.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Calcular el Índice VMT</h3>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">
                    Determina la <strong>Viabilidad Máxima Teórica (VMT)</strong> de las metas u objetivos BIM pedidos originalmente por el directivo. Se contrastan las dimensiones con el talento disponible.
                  </p>
                  <div className="p-4 bg-artis-orange/10 border border-artis-orange/20 rounded-sm">
                    <h4 className="text-xs font-bold text-artis-orange uppercase tracking-wider flex items-center gap-1.5 mb-1.5 font-mono">
                      <Award className="w-3.5 h-3.5 shrink-0" /> Regla de Oro del BIM Management
                    </h4>
                    <p className="text-[10.5px] text-slate-300 leading-normal italic font-medium">
                      "No se puede exigir un entregable de dimensión constructiva N si los pilares de Procesos y Personas están por debajo del Nivel N-2."
                    </p>
                    <p className="text-[9.5px] text-slate-400 mt-2 leading-relaxed">
                      Ejemplo: Para demandar coordinación avanzada u operaciones digitales <strong>7D</strong>, requieres un piso metodológico y personal con cultura colaborativa consolidada en <strong>Nivel 3</strong> como mínimo. De lo contrario, se malgastarán recursos en licencias vacías.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Aplicar Filtros Financieros y Temporales</h3>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">
                    Cruzar la viabilidad teórica obtenida en el Paso 2 con la realidad macroeconómica, el flujo de caja asignado y las fechas de vencimientos contractuales.
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#de1b7d] mt-1.5 shrink-0"></div>
                      <p className="text-[11.5px] text-slate-300 leading-tight">
                        <strong>Ecuación de Cómputo (Hardware):</strong> ¿El presupuesto cubre el reemplazo de los ordenadores lentos detectados en Nivel 1?
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#de1b7d] mt-1.5 shrink-0"></div>
                      <p className="text-[11.5px] text-slate-300 leading-tight">
                        <strong>Ecuación del Software/CDE:</strong> ¿El flujo de caja alcanza para licenciar las plataformas integradas comunes en la nube?
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#de1b7d] mt-1.5 shrink-0"></div>
                      <p className="text-[11.5px] text-slate-300 leading-tight">
                        <strong>Curva de Aprendizaje:</strong> ¿El plazo disponible del proyecto (ej: 3 meses/90 días) es realista para instruir al equipo actual en Nivel 1?
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Redefinición Estratégica (Propuesta de Valor)</h3>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">
                    Si el análisis demuestra incapacidad de cumplir el pedido idílico, el consultor redacta una <strong>Contrapropuesta Escalonada</strong>.
                  </p>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-sm">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Filosofía de Venta Consultiva
                    </h4>
                    <p className="text-[10.5px] text-slate-300 leading-normal">
                      <strong>Nunca se le dice "No" a un cliente.</strong> En su lugar, se le estructura una hoja de ruta progresiva (Roadmap) que mitiga riesgos inmediatos, consolida bases de hardware y sube paulatinamente su madurez a fin de proteger su dinero e inversión.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/5 text-[9.5px] text-slate-500 uppercase tracking-wider select-none font-mono flex items-center gap-1.5 mt-6">
              <Info className="w-3 h-3 text-[#de1b7d]" /> TEDI Framework de Decisiones Directivas
            </div>
          </div>
        </div>

        {/* Right Interactive Simulator Column (Core Interaction) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 rounded-sm border border-white/10 bg-[#070b13] relative overflow-hidden shadow-2xl">
            {/* Display Interactive Interactive Tool */}

            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase font-bold">Consola: Ajustador de Pilares</span>
                  <span className="text-[9px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/20 font-bold uppercase tracking-wider">Ajuste Manual</span>
                </div>

                <div className="space-y-4">
                  {pillars.map((pl) => (
                    <div key={pl.id} className="p-3 bg-white/2 hover:bg-white/[0.04] transition-colors border border-white/5 rounded-sm flex items-center justify-between">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-white/5 rounded-sm border border-white/5 shrink-0">
                          {pl.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase">{pl.name}</h4>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">{pl.subtitle}</p>
                        </div>
                      </div>

                      {/* Manual adjust controls */}
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-slate-400 font-mono text-[9px] uppercase tracking-tighter mr-2 hidden sm:inline">Madurez Nivel:</span>
                        {[1, 2, 3, 4].map((v) => (
                          <button
                            key={v}
                            onClick={() => pl.setter(v)}
                            className={cn(
                              "w-7 h-7 rounded-sm border font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer",
                              pl.val === v 
                                ? "bg-artis-orange text-artis-black border-transparent shadow-[0_0_8px_rgba(255,85,17,0.3)] font-black"
                                : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                            )}
                          >
                            L{v}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Chain Link indicating weakest link rule */}
                <div className="bg-rose-500/5 border border-rose-500/10 p-5 rounded-sm">
                  <span className="text-[9.5px] font-black text-rose-400 uppercase tracking-wider block mb-3 font-mono text-left">Simulación de Cadena Operativa:</span>
                  
                  <div className="flex gap-2.5 justify-center items-center py-2 select-none">
                    {pillars.map((pl, idx) => {
                      const isWeakest = pl.id === weakestPillar.id;
                      return (
                        <Fragment key={pl.id}>
                          {idx > 0 && <div className="h-[2px] w-4 bg-white/5 flex-1 max-w-[20px]" />}
                          <div className={cn(
                            "px-3 py-2.5 rounded-sm border text-center transition-all relative flex flex-col items-center justify-center min-w-[75px]",
                            isWeakest 
                              ? "bg-rose-500/15 border-rose-500/60 scale-105 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse z-10" 
                              : "bg-[#0b0e17]/30 border-white/5 opacity-55"
                          )}>
                            <span className="text-[12px] font-bold text-white block uppercase tracking-tight">{pl.id.toUpperCase()}</span>
                            <span className={cn("text-[10px] font-mono font-black mt-1", isWeakest ? "text-rose-400" : "text-slate-400")}>
                              L{pl.val}
                            </span>
                            {isWeakest && (
                              <span className="absolute -bottom-2 bg-rose-500 text-[6.5px] px-1 font-bold rounded-xs tracking-wide text-white uppercase shadow-sm">
                                LIMITANTE
                              </span>
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/5 text-left text-[11px] leading-relaxed text-slate-400">
                    <span className="font-bold text-rose-400 uppercase font-mono text-[9px] tracking-wider block mb-1">Diagnóstico Automático:</span>
                    La madurez global operativa es de <strong className="text-white">Nivel {overallLevel} ({weakestPillar.name})</strong>. Aunque disponga de otros pilares en Nivel 4, cualquier esfuerzo mayor a Nivel {overallLevel} fallará inmediatamente por falta de cohesión.
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase font-bold">Calculador Viabilidad Teórica (Regla N-2)</span>
                  <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 font-bold uppercase tracking-wider">Cumplimiento Técnico</span>
                </div>

                <div className="space-y-4 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono select-none">
                    1. Seleccione la Dimensión BIM solicitada por el Cliente:
                  </label>
                  
                  <div className="grid grid-cols-4 gap-2.5">
                    {["3D", "4D", "5D", "7D"].map((dim) => {
                      const isActive = targetBim === dim;
                      return (
                        <button
                          key={dim}
                          onClick={() => setTargetBim(dim)}
                          className={cn(
                            "py-3 rounded-sm border text-center transition-all select-none active:scale-95 cursor-pointer font-sans",
                            isActive 
                              ? "bg-gradient-to-br from-[#de1b7d]/25 to-artis-orange/5 border-artis-orange text-white font-black shadow-[0_0_12px_rgba(255,85,17,0.15)]"
                              : "bg-[#0b0e17]/50 hover:bg-[#0e1220]/80 border-white/5 text-slate-400"
                          )}
                        >
                          <div className="text-sm font-mono block tracking-tight">{dim}</div>
                          <div className="text-[7.5px] uppercase text-slate-500 font-bold mt-0.5">
                            {dim === "3D" && "Modelado Base"}
                            {dim === "4D" && "Control Plazos"}
                            {dim === "5D" && "Presupuesto"}
                            {dim === "7D" && "Operaciones v Twin"}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-white/2 p-4 border border-white/5 rounded-sm space-y-3.5">
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block font-mono">BARRERAS METODOLÓGICAS (Procesos y Personas):</span>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#0d1222] border border-white/5 rounded-xs">
                        <span className="block text-[8px] uppercase text-slate-500 tracking-wider font-bold">Procesos (P)</span>
                        <span className="block text-xl font-mono font-black text-white py-0.5">Nivel {pVal}</span>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-artis-orange" style={{ width: `${(pVal / 4) * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-[#0d1222] border border-white/5 rounded-xs">
                        <span className="block text-[8px] uppercase text-slate-500 tracking-wider font-bold">Talento Humano (H)</span>
                        <span className="block text-xl font-mono font-black text-white py-0.5">Nivel {hVal}</span>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-pink-500" style={{ width: `${(hVal / 4) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gatekeeper Check result */}
                  <div className={cn(
                    "p-4.5 rounded-sm border transition-all text-left flex items-start gap-4",
                    isVmtViable 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-white" 
                      : "bg-rose-500/10 border-rose-500/30 text-white"
                  )}>
                    <div className="p-2 rounded-full shrink-0 mt-0.5 bg-black/40">
                      {isVmtViable ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#de1b7d]">Veredicto VMT:</span>
                        <strong className={cn("text-xs font-black uppercase tracking-wider", isVmtViable ? "text-emerald-400" : "text-rose-400")}>
                          {isVmtViable ? "VIABLE" : "Inviable / Bloqueado por Madurez"}
                        </strong>
                      </div>
                      <p className="text-[10.5px] leading-relaxed text-slate-300">
                        {isVmtViable 
                          ? `Su puntaje metodológico consolidado (L${minPeopleProcess}) es apto para el alcance ${targetBim}. Cuenta con los pilares base requeridos para iniciar.` 
                          : `Para exigir entregables ${targetBim}, se requiere que Procesos (P) y Personas (H) alcancen mínimo el Nivel ${requiredLvl}. Su nivel actual consolidado es L${minPeopleProcess}. Si firma este alcance, incurrirá en pérdidas inmediatas.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase font-bold">Interactuar: Cruzar Factores de Negocio</span>
                  <span className="text-[9px] bg-[#de1b7d]/10 text-[#de1b7d] px-2 py-0.5 rounded-full border border-[#de1b7d]/25 font-bold uppercase tracking-wider">Filtro Limitante</span>
                </div>

                <div className="space-y-4 text-left select-none">
                  {/* Selectors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1.5">
                        Presupuesto Disponible:
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {["Limitado", "Medio", "Óptimo"].map((b) => (
                          <button
                            key={b}
                            onClick={() => setBudget(b)}
                            className={cn(
                              "py-2 rounded-xs text-[9px] font-bold uppercase select-none transition-all border cursor-pointer",
                              budget === b 
                                ? "bg-slate-100 text-artis-black border-transparent font-black shadow-md"
                                : "bg-[#0b0e17]/50 text-white/40 border-white/5 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1.5">
                        Plazo del Proyecto:
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {["Muy Ajustado", "Estándar", "Flexible"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={cn(
                              "py-2 rounded-xs text-[9px] font-bold uppercase select-none transition-all border cursor-pointer",
                              timeline === t 
                                ? "bg-slate-100 text-artis-black border-transparent font-black shadow-md"
                                : "bg-[#0b0e17]/50 text-white/40 border-white/5 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {t === "Muy Ajustado" ? "1-3m" : t === "Estándar" ? "4-6m" : "7m+"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Impact block indicators */}
                  <div className="space-y-3.5">
                    {/* Block index 1 - hardware equation */}
                    <div className="p-3 bg-white/2 border border-white/5 rounded-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9.5px] font-bold block bg-white/5 px-2 py-0.5 rounded-xs text-white uppercase tracking-wider font-mono">1. Hardware (T) versus Presupuesto</span>
                        <span className="text-[8px] font-mono uppercase text-slate-500">Tecnología</span>
                      </div>
                      <p className="text-[10.5px] text-slate-300 leading-normal">
                        {tVal === 1 
                          ? budget === "Limitado"
                            ? "🚨 VIABILIDAD CRÍTICA: Los ordenadores actuales gama baja no soportarán modelado 3D BIM. Su presupuesto limitado obstaculiza actualizar el hardware básico."
                            : "✅ VIABLE: Cuenta con equipos débiles, pero el presupuesto asignado permite financiar la renovación tecnológica indispensable."
                          : "✅ EQUIPAMIENTO SUFICIENTE: Sus equipos actuales son de gama aceptable para arrancar este modelado."
                        }
                      </p>
                    </div>

                    {/* Block index 2 - software cde equation */}
                    <div className="p-3 bg-white/2 border border-white/5 rounded-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9.5px] font-bold block bg-white/5 px-2 py-0.5 rounded-xs text-white uppercase tracking-wider font-mono">2. CDE Software versus Presupuesto</span>
                        <span className="text-[8px] font-mono uppercase text-slate-500">Procesos</span>
                      </div>
                      <p className="text-[10.5px] text-slate-300 leading-normal">
                        {pVal < 3 
                          ? budget === "Limitado"
                            ? "🚨 VIABILIDAD CRÍTICA: No es financiable licenciar entornos de datos avanzados (CDE) con presupuesto restringido. Colaboración fragmentada."
                            : "✅ VIABLE: El presupuesto holgado permite adquirir licencias y planificar repositorios en la nube bajo normas ISO 19650."
                          : "✅ CDE COMPATIBLE: Su organización ya utiliza almacenamiento colaborativo oficial de grado industrial."
                        }
                      </p>
                    </div>

                    {/* Block index 3 - learning curve equation */}
                    <div className="p-3 bg-white/2 border border-white/5 rounded-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9.5px] font-bold block bg-white/5 px-2 py-0.5 rounded-xs text-white uppercase tracking-wider font-mono">3. Curva de Aprendizaje versus Plazos</span>
                        <span className="text-[8px] font-mono uppercase text-slate-500">Talento</span>
                      </div>
                      <p className="text-[10.5px] text-slate-300 leading-normal">
                        {hVal < 3
                          ? timeline === "Muy Ajustado"
                            ? "🚨 COLAPSO TEMPORAL: Su equipo tiene bajo o nulo entrenamiento en modelado y el plazo de 1 a 3 meses bloqueará la ejecución del proyecto. Fracaso por curva de aprendizaje inminente."
                            : "✅ ENTRENAMIENTO VIABLE: Cuenta con tiempo suficiente para capacitar al equipo inicial antes de fases de coordinación intensas."
                          : "✅ CAPACIDAD GARANTIZADA: Su equipo cuenta con talento entrenado y roles sólidos, eliminando cualquier desfase temporal."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase font-bold">Resultante: Hoja de Ruta Consultiva Escalonada</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">Mitigación de Riesgos</span>
                </div>

                {/* Structured Roadmap Timeline vertical layout */}
                <div className="space-y-4 text-left select-none relative pl-6 border-l border-white/10 ml-2">
                  
                  {/* Phase 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 px-1.5 py-0.5 bg-artis-orange text-artis-black font-mono text-[8px] font-black rounded-sm border border-[#de1b7d]">
                      F1
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-tight flex items-center gap-1.5">
                        Mitigación e Inicialización Tecnológica <span className="text-[9px] text-artis-orange font-mono tracking-tighter normal-case"> (Meses 1-2)</span>
                      </h4>
                      <p className="text-[10.5px] text-slate-400 leading-relaxed mt-1">
                        Establecer el modelado en 3D autónomo de arquitectura y estructura básica. Adquirir 1 o 2 terminales de hardware óptimos y focalizados antes de expandir. Se congelan expectativas 5D/7D momentáneamente.
                      </p>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative mt-2">
                    <div className="absolute -left-[31px] top-1 px-1.5 py-0.5 bg-pink-500 text-white font-mono text-[8px] font-black rounded-sm">
                      F2
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-tight flex items-center gap-1.5">
                        Colaboración e Interferencia <span className="text-[9px] text-pink-400 font-mono tracking-tighter normal-case"> (Meses 3-4)</span>
                      </h4>
                      <p className="text-[10.5px] text-slate-400 leading-relaxed mt-1">
                        Creación del Entorno Común de Datos en la nube (CDE con Dropbox/Drive o BIM platform económica). Redacción del BEP guía y entrenamiento intensivo al personal en colisiones críticas de Estructura vs MEP.
                      </p>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="relative mt-2">
                    <div className="absolute -left-[31px] top-1 px-1.5 py-0.5 bg-sky-500 text-white font-mono text-[8px] font-black rounded-sm">
                      F3
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-tight flex items-center gap-1.5">
                        Explotación Avanzada y ROI <span className="text-[9px] text-sky-400 font-mono tracking-tighter normal-case"> (Meses 5+)</span>
                      </h4>
                      <p className="text-[10.5px] text-slate-400 leading-relaxed mt-1">
                        Vinculación del presupuesto geométrico (5D) y entrega limpia para operación (7D Digital Twin Ready) una vez que el personal estabilizó su curva de aprendizaje y hay procesos claros.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-sm">
                  <span className="block font-bold text-emerald-400 text-[10px] uppercase tracking-wider font-mono mb-1">
                    Beneficio para el Cliente Directivo TEDI:
                  </span>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Este escalonamiento estratégico ahorra hasta un 35% en licencias sobrantes e inversión en hardware antes de tiempo. Minimiza el descontento laboral por fatiga de cambio y asegura un QuickWin inicial en detección de colisiones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AIChatSlide = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const askAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(""); 
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const prompt = `Actúa como un consultor BIM Senior experto para directivos TEDI. Responde de forma ejecutiva, enfocada en negocio, ROI y riesgos a la siguiente pregunta: "${query}"`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setResponse(response.text || "No se pudo generar una respuesta estratégica en este momento.");
    } catch (err) {
      setResponse("Error de conexión con el módulo estratégico TEDI. Verifique su clave de acceso digital.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto pt-4">
      <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Consultas <span className="text-artis-orange">Alto Nivel</span></h2>
          <p className="text-slate-400 font-medium">Resolución de dudas sobre ROI y Gobernanza Digital TEDI.</p>
        </div>
        <div className="bg-artis-black px-4 py-2 border border-white/5 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Consultor TEDI IA: Online</span>
        </div>
      </div>

      <div className="glass-panel rounded-sm flex-1 overflow-hidden flex flex-col relative border-artis-orange/5">
        <div className="absolute inset-0 immersive-grid opacity-5 pointer-events-none"></div>
        
        <div className="flex-1 p-10 overflow-y-auto z-10 space-y-8" ref={chatRef}>
          {!response && !loading && (
             <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-6">
                <div className="w-20 h-20 border border-artis-orange/10 rounded-full flex items-center justify-center bg-artis-black shadow-2xl">
                  <MessageSquare className="w-8 h-8 opacity-40 text-artis-orange" />
                </div>
                <div className="text-center">
                  <p className="font-bold uppercase tracking-widest text-[10px] mb-2 opacity-60">Canal Seguro TEDI Establecido</p>
                  <p className="text-[10px] opacity-40">Introduzca su consulta ejecutiva en el terminal inferior.</p>
                </div>
             </div>
          )}
          
          {loading && (
            <div className="flex gap-6 items-start animate-fade-in group">
               <div className="w-10 h-10 rounded-sm bg-artis-orange/10 border border-artis-orange/20 flex items-center justify-center text-artis-orange font-mono text-xs font-bold">AI</div>
               <div className="flex flex-col gap-2">
                  <div className="w-64 h-3 bg-slate-800 rounded animate-pulse opacity-50" />
                  <div className="w-96 h-3 bg-slate-800 rounded animate-pulse opacity-30" />
                  <div className="w-48 h-3 bg-slate-800 rounded animate-pulse opacity-20" />
               </div>
            </div>
          )}
          
          {response && (
            <div className="flex gap-6 items-start animate-fade-in">
               <div className="w-10 h-10 rounded-sm bg-artis-orange border border-artis-orange-deep flex items-center justify-center text-artis-black font-black text-xs shadow-lg">AI</div>
               <div className="flex-1 text-slate-300 leading-relaxed font-medium bg-artis-teal-dark/5 p-8 rounded-sm border border-white/5 prose prose-invert max-w-none">
                  {response.split('\n').filter(l => l.trim()).map((line, i) => (
                    <p key={i} className="mb-4 last:mb-0 text-sm">
                       {line.split('**').map((part, index) => (
                         index % 2 === 1 ? <strong key={index} className="text-artis-orange font-bold font-mono">{part}</strong> : part
                       ))}
                    </p>
                  ))}
               </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 bg-artis-black z-20 flex gap-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && askAI()}
            placeholder="CONSULTA: [EJE: IMPACTO EN VALORACIÓN DE ACTIVOS]"
            className="flex-1 bg-artis-teal-dark/10 border border-white/5 rounded-sm px-6 py-4 font-mono text-[10px] text-white placeholder:text-slate-700 focus:outline-hidden focus:border-artis-orange/50 transition-all uppercase tracking-widest"
          />
          <button 
            disabled={loading}
            onClick={askAI}
            className="bg-white text-artis-black px-8 py-4 rounded-sm font-black text-[9px] uppercase tracking-[0.2em] hover:bg-artis-orange transition-all disabled:opacity-50 flex items-center gap-3 shrink-0 shadow-xl"
          >
            {loading ? "Calculando..." : "Ejecutar Consulta"}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 15;

  const nextSlide = () => setSlide(s => Math.min(s + 1, totalSlides - 1));
  const prevSlide = () => setSlide(s => Math.max(s - 1, 0));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="flex h-screen w-full bg-artis-black overflow-hidden text-slate-100 font-sans selection:bg-artis-orange/30 selection:text-white">
      <Sidebar current={slide} total={totalSlides} onJump={setSlide} />
      
      <main className="flex-1 relative flex flex-col p-10 lg:p-16 overflow-hidden">
        {/* Immersive Backdrop */}
        <div className="absolute inset-0 immersive-grid opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-artis-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-artis-teal/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Progress System */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
           <motion.div 
            className="h-full bg-artis-orange shadow-[0_0_10px_rgba(255,164,0,0.6)]" 
            initial={{ width: 0 }}
            animate={{ width: `${((slide + 1) / totalSlides) * 100}%` }}
           />
        </div>

        {/* Content Area */}
        <div className="flex-1 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {slide === 0 && <IntroSlide />}
              {slide === 1 && <FundamentoSlide />}
              {slide === 2 && <CoordinacionSlide />}
              {slide === 3 && <ConstruccionSlide />}
              {slide === 4 && <AnalisisSlide />}
              {slide === 5 && <PitchSlide />}
              {slide === 6 && <MaturitySlide />}
              {slide === 7 && <ExecutionGuideSlide />}
              {slide === 8 && <CicloIntroSlide />}
              {slide === 9 && <RolesBimSlide />}
              {slide === 10 && <CascadaSlide />}
              {slide === 11 && <CdeFlowSlide />}
              {slide === 12 && <ContratosBimSlide />}
              {slide === 13 && <EquiposBimSlide />}
              {slide === 14 && <BepStructureSlide />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Bar */}
        <div className="mt-auto flex items-center justify-between pt-10 border-t border-white/5 z-10">
           <div className="flex items-center gap-6">
             <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em] font-bold">
               SECUENCIA ARTIS [{slide + 1}/{totalSlides}]
             </div>
             <div className="h-4 w-px bg-white/5"></div>
             <div className="flex gap-2">
                {[...Array(totalSlides)].map((_, i) => (
                  <div key={i} className={cn("w-6 h-1 transition-all duration-500", i <= slide ? "bg-artis-orange" : "bg-white/5")}></div>
                ))}
             </div>
           </div>
           
           <div className="flex gap-4">
             <button 
               onClick={prevSlide}
               disabled={slide === 0}
               className={cn(
                 "px-6 py-4 rounded-sm border border-white/5 transition-all font-bold text-[9px] uppercase tracking-widest",
                 slide === 0 ? "opacity-10 cursor-not-allowed" : "hover:bg-white/5 hover:border-white/10 active:scale-95"
               )}
             >
               Regresar
             </button>
             <button 
               onClick={nextSlide}
               className={cn(
                 "flex items-center gap-3 bg-white text-artis-black px-10 py-4 rounded-sm font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:bg-slate-200 active:scale-95 shadow-xl",
                 slide === totalSlides -1 && "bg-artis-orange text-artis-black hover:bg-artis-orange-deep"
               )}
             >
               {slide === totalSlides - 1 ? "Finalizar Presentación" : "Siguiente Módulo"}
               {slide !== totalSlides - 1 && <ArrowRight className="w-3 h-3" />}
             </button>
           </div>
        </div>
      </main>
    </div>
  );
}
