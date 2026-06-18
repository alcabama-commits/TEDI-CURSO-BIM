import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, CheckCircle2, MessageSquare, Camera, Compass, 
  Send, Mail, MailCheck, ShieldAlert, Cpu, Layers, Play, RefreshCw, Clock
} from 'lucide-react';

interface BcfIssue {
  id: string;
  title: string;
  elementGuids: string[];
  elementNames: string[];
  clashType: 'Hard Clash' | 'Clearance';
  coordinates: { x: number; y: number; z: number };
  cameraAngle: { yaw: number; pitch: number; roll: number };
  snapshot: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  comments: Array<{ author: string; text: string; time: string }>;
}

export const OpenBimBcfSlide = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'traditional' | 'bcf'>('bcf');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('iss-01');
  
  // Interactive Issues State
  const [issues, setIssues] = useState<Record<string, BcfIssue>>({
    'iss-01': {
      id: 'BCF-2026-0001',
      title: 'Interferencia Crítica: Ducto HVAC atraviesa Viga Maestra',
      elementGuids: ['3B_b4f0b0-a54b-4f51-86fc', '0a_8f51a2-c11f-47ea-aef1'],
      elementNames: ['Ducto de Inyección de Aire 600x400', 'Viga de Hormigón Postensado V-401'],
      clashType: 'Hard Clash',
      coordinates: { x: 12.458, y: -4.892, z: 3.420 },
      cameraAngle: { yaw: 45.2, pitch: -15.8, roll: 0.0 },
      snapshot: 'hvac_beam_clash',
      status: 'Open',
      assignedTo: 'Carlos Gómez (Ing. Climatización)',
      comments: [
        { author: 'Ana Reyes (BIM Manager)', text: 'El ducto interfiere 15cm con la viga estructural principal de carga. Reubicar trazado de HVAC bajando el nivel de cielo falso.', time: 'Hace 2 horas' }
      ]
    },
    'iss-02': {
      id: 'BCF-2026-0002',
      title: 'Incompatibilidad de Tubería Sanitaria con Muro de Hormigón',
      elementGuids: ['7e_f2a40b-b389-4bce-bc0b', '3c_41ad02-86ff-4dc7-be65'],
      elementNames: ['Tubería de Descarga Sanitaria PVC 4"', 'Muro Exterior Estructural Cortafuegos'],
      clashType: 'Hard Clash',
      coordinates: { x: 8.120, y: -15.340, z: 1.150 },
      cameraAngle: { yaw: -90.0, pitch: -5.0, roll: 0.0 },
      snapshot: 'pipe_wall_clash',
      status: 'Open',
      assignedTo: 'Sofía Martínez (Modelador Sanitario)',
      comments: [
        { author: 'Ana Reyes (BIM Manager)', text: 'Falta manga protectora pasante o desviar colector sanitario para evitar perforar la armadura de acero del muro estructural.', time: 'Ayer' }
      ]
    }
  });

  const [activeCameraSync, setActiveCameraSync] = useState<boolean>(false);
  const [currentCommentText, setCurrentCommentText] = useState<string>('');
  
  // Animation coordinates for Revit Viewport simulator
  const [viewportTransform, setViewportTransform] = useState<{ x: number; y: number; scale: number }>({ x: 0, y: 0, scale: 1 });

  const handleCameraSync = () => {
    setActiveCameraSync(true);
    // Simulate camera flying smoothly to the clash location
    setViewportTransform({ x: -15, y: -10, scale: 1.4 });
    setTimeout(() => {
      setActiveCameraSync(false);
    }, 1200);
  };

  const handleResetViewport = () => {
    setViewportTransform({ x: 0, y: 0, scale: 1 });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommentText.trim()) return;

    setIssues(prev => {
      const updated = { ...prev };
      updated[selectedIssueId].comments.push({
        author: 'Diseñador Alternativo (Tú)',
        text: currentCommentText,
        time: 'Ahora mismo'
      });
      return updated;
    });
    setCurrentCommentText('');
  };

  const handleResolveIssue = () => {
    setIssues(prev => {
      const updated = { ...prev };
      updated[selectedIssueId].status = updated[selectedIssueId].status === 'Resolved' ? 'Open' : 'Resolved';
      return updated;
    });
  };

  const selectedIssue = issues[selectedIssueId];

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header Slide Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-pink-400 font-extrabold uppercase tracking-[0.2em] block mb-1">
            SESIÓN 7 — OPEN BIM E INTEROPERABILIDAD
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-pink-500 shrink-0 animate-pulse" />
            2. Flujo de Incidencias Inteligente mediante BCF
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Por qué enviar capturas de pantalla por correo está obsoleto para la coordinación BIM
          </p>
        </div>
        
        {/* Time Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-[9px] font-mono text-pink-400 font-bold self-center">
          <Clock className="w-3.5 h-3.5" />
          ESTRATEGIA AVANZADA DE FORMATOS (BCF)
        </div>
      </div>

      {/* Workflow Strategy Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional */}
        <button
          onClick={() => setActiveWorkflow('traditional')}
          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
            activeWorkflow === 'traditional'
              ? 'border-red-500/30 bg-red-500/[0.04] shadow-[0_0_15px_rgba(239,68,68,0.05)]'
              : 'border-white/5 bg-black/25 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-mono text-red-400 font-black uppercase tracking-widest bg-red-550/10 border border-red-550/20 px-2 py-0.5 rounded">
              METODOLOGÍA OBSOLETA
            </span>
            <Mail className={`w-4 h-4 ${activeWorkflow === 'traditional' ? 'text-red-400' : 'text-slate-500'}`} />
          </div>
          <h3 className="text-sm font-sans font-black uppercase mt-2.5 text-white">Capturas de Pantalla por Correo Electrónico</h3>
          <p className="text-[11px] leading-relaxed text-slate-400 mt-1">
            El flujo tradicional donde se toman capturas, se redacta un correo largo pesado describiendo dónde está el error y se asume que el modelador buscará el elemento manualmente.
          </p>
        </button>

        {/* BCF */}
        <button
          onClick={() => setActiveWorkflow('bcf')}
          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
            activeWorkflow === 'bcf'
              ? 'border-pink-500/35 bg-pink-500/[0.04] shadow-[0_0_15px_rgba(236,72,153,0.05)]'
              : 'border-white/5 bg-black/25 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-mono text-pink-400 font-black uppercase tracking-widest bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded animate-pulse">
              METODOLOGÍA OPEN BIM
            </span>
            <Compass className={`w-4 h-4 ${activeWorkflow === 'bcf' ? 'text-pink-400' : 'text-slate-500'}`} />
          </div>
          <h3 className="text-sm font-sans font-black uppercase mt-2.5 text-white">BIM Collaboration Format (BCF XML/API)</h3>
          <p className="text-[11px] leading-relaxed text-slate-400 mt-1">
            Un archivo de metadatos ultra liviano con IDs de elementos coordinados, comentarios y coordenadas del punto exacto de la cámara 3D para teletransportación automática.
          </p>
        </button>
      </div>

      {/* Traditional Workflow Simulation Container */}
      <AnimatePresence mode="wait">
        {activeWorkflow === 'traditional' && (
          <motion.div
            key="traditional-workflow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="bg-[#05050e]/50 border border-white/5 rounded-2xl p-5 md:p-6 text-left space-y-4"
          >
            <div className="flex justify-between items-start border-b border-white/5 pb-3">
              <div>
                <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-wider block">FLUJO DOCUMENTADO</span>
                <h4 className="text-md font-sans font-black text-white uppercase">El Calvario de la Coordinación Análoga</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/40 p-4 border border-white/5 rounded-xl space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">1. CAPTURA EXPLÍCITA</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El inspector encuentra una colisión en el software de revisión (ej. Solibri). Toma una captura recortada de pantalla, la guarda en formato JPG de alta resolución (3MB) y la arrastra a Paint para pintar una flecha roja indicativa.
                </p>
              </div>

              <div className="bg-black/40 p-4 border border-white/5 rounded-xl space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">2. REACCIÓN POR EMAIL</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Redacta un correo grupal pesado adjuntando la imagen: <em className="text-pink-300 block my-1 text-[11px] font-mono">&quot;Revisar muro del eje 4, cerca del baño del tercer piso de oficinas. El ducto de clima choca con el concreto.&quot;</em>
                </p>
              </div>

              <div className="bg-black/40 p-4 border border-white/5 rounded-xl space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">3. BÚSQUEDA A CIEGAS</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El modelador especialista recibe el correo, abre Revit, y pasa hasta 40 minutos navegando en la estructura del tercer piso buscando el eje exacto de la colisión, intentando igualar visualmente el ángulo de la foto.
                </p>
              </div>
            </div>

            {/* Error simulation card */}
            <div className="p-4 bg-red-950/10 border border-red-500/20 rounded-xl flex items-start gap-4">
              <span className="p-2 bg-red-500/10 text-red-400 rounded-lg shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-black block">CONSECUENCIAS DE LA METODOLOGÍA TRADICIONAL</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Pérdida de trazabilidad:</strong> Los comentarios y resoluciones técnicas quedan abandonados en bandejas de correo individuales imposibles de auditar ante una demanda. Los archivos aumentan su peso geométrica y digitalmente innecesaria de forma exponencial mediante adjuntos repetitivos.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* BCF Workflow Simulation Container */}
        {activeWorkflow === 'bcf' && (
          <motion.div
            key="bcf-workflow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {/* The BCF Sandbox Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: BCF Issues Explorer */}
              <div className="lg:col-span-5 bg-[#040e24]/45 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest font-black block mb-1">INTERCAMBIO DE INSIDENCIAS FORMATADO</span>
                    <h4 className="text-md font-sans font-black text-white uppercase text-left">Bandeja de Incidencias BCF</h4>
                    <p className="text-[11px] text-slate-450 text-left">
                      Selecciona un caso de colisión activa reportado en el software de control y simula su transferencia de datos.
                    </p>
                  </div>

                  {/* Issues List Buttons */}
                  <div className="space-y-2">
                    {(Object.values(issues) as BcfIssue[]).map((issue) => {
                      const isSelected = selectedIssueId === (issue.id === 'BCF-2026-0001' ? 'iss-01' : 'iss-02');
                      return (
                        <button
                          key={issue.id}
                          onClick={() => setSelectedIssueId(issue.id === 'BCF-2026-0001' ? 'iss-01' : 'iss-02')}
                          className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'border-pink-500/40 bg-pink-500/[0.04]' 
                              : 'border-white/5 bg-black/25 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[9.5px] font-mono font-bold text-pink-400">
                              {issue.id}
                            </span>
                            <span className={`text-[8.5px] font-mono px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${
                              issue.status === 'Resolved' 
                                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                                : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                            }`}>
                              {issue.status}
                            </span>
                          </div>
                          <h5 className="text-[11.5px] font-sans font-bold text-white line-clamp-2 leading-snug">
                            {issue.title}
                          </h5>
                          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mt-2.5 pt-2 border-t border-white/5">
                            <span>Tipo: {issue.clashType}</span>
                            <span>Asignado a: {issue.assignedTo.split(' (')[0]}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-left">
                  <span className="text-[10px] font-mono text-zinc-550 block leading-relaxed">
                    ⚙️ <strong>Estructura técnica de un BCF:</strong> Consiste en un archivo ZIP con archivos comprimidos JSON/XML específicos para el marcado, cámaras e imágenes vectorizadas.
                  </span>
                </div>
              </div>

              {/* Right Column: Revit / Archicad BIM Viewport Simulator */}
              <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 immersive-grid opacity-[0.03] pointer-events-none"></div>

                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-[#38bdf8] font-black uppercase tracking-widest block">ENTORNO DE DISEÑO NATIVO</span>
                      <h4 className="text-sm font-sans font-black text-white uppercase flex items-center gap-1.5">
                        <Compass className="w-4.5 h-4.5 text-[#38bdf8]" />
                        Simulador de Cámara Revit / Archicad
                      </h4>
                    </div>

                    <button
                      onClick={handleCameraSync}
                      disabled={activeCameraSync}
                      className="px-3 py-1.5 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 hover:bg-pink-500/25 transition-all cursor-pointer font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-md disabled:opacity-50"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      {activeCameraSync ? 'Teletransportando...' : 'Sincronizar Cámara (BCF)'}
                    </button>
                  </div>

                  {/* Revit Interactive Viewport */}
                  <div className="relative h-56 bg-[#040813] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center">
                    
                    {/* Grid Overlays / Coordinate HUD */}
                    <div className="absolute top-2 left-2 z-10 font-mono text-[8px] text-[#38bdf8] bg-[#040813]/85 p-2 rounded border border-white/5 space-y-0.5">
                      <div>CAMERA COORDS:</div>
                      <div>X: <span className="text-white font-bold">{selectedIssue.coordinates.x.toFixed(3)}</span></div>
                      <div>Y: <span className="text-white font-bold">{selectedIssue.coordinates.y.toFixed(3)}</span></div>
                      <div>Z: <span className="text-white font-bold">{selectedIssue.coordinates.z.toFixed(3)}</span></div>
                      <div className="text-pink-400 mt-1">YAW: {selectedIssue.cameraAngle.yaw}°</div>
                    </div>

                    <div className="absolute right-2 top-2 z-10 font-mono text-[8.5px] text-zinc-500">
                      VISTA 3D COORDINACIÓN ORTOGONAL
                    </div>

                    {/* Simulation graphics representing Clash */}
                    <motion.div
                      animate={{
                        x: viewportTransform.x,
                        y: viewportTransform.y,
                        scale: viewportTransform.scale
                      }}
                      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                      className="relative w-72 h-44 flex items-center justify-center"
                    >
                      {/* Duct */}
                      {selectedIssueId === 'iss-01' ? (
                        <>
                          {/* Concrete Beam */}
                          <div className="absolute w-52 h-14 bg-slate-600 border-2 border-slate-500 rounded flex items-center justify-center text-slate-100 font-mono text-[9px] font-bold shadow-lg z-10">
                            VIGA HORMIGÓN V-401 (IfcBeam)
                          </div>
                          {/* Chocking HVAC Duct */}
                          <div className="absolute w-12 h-36 bg-blue-500/40 border-2 border-blue-500 rounded flex flex-col justify-between py-5 items-center text-[8px] font-mono font-bold text-blue-200 shadow-md">
                            <span>DUCTO</span>
                            <span className="bg-red-650 text-white font-black px-1 py-0.5 rounded animate-pulse">CLASH!</span>
                            <span>HVAC</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Concrete Wall */}
                          <div className="absolute w-44 h-44 bg-[linear-gradient(45deg,#475569_25%,transparent_25%,transparent_50%,#475569_50%,#475569_75%,transparent_75%,transparent)] bg-[size:12px_12px] bg-slate-700/60 border-2 border-slate-500 rounded flex items-center justify-center text-slate-100 font-mono text-[9px] font-bold shadow-lg z-10">
                            MURO ESTRUCTURAL (IfcWall)
                          </div>
                          {/* Passing Pipe */}
                          <div className="absolute h-10 w-52 bg-emerald-500/35 border-2 border-emerald-500 rounded flex justify-between px-5 items-center text-[8px] font-mono font-bold text-emerald-200 shadow-md transform rotate-12">
                            <span>TUBERÍA PVC</span>
                            <span className="bg-red-650 text-white font-black px-1.5 py-0.5 rounded animate-pulse text-[7.5px]">SIN PASADA</span>
                            <span>SANI</span>
                          </div>
                        </>
                      )}
                    </motion.div>

                    {/* Controls Overlay inside Viewport */}
                    <div className="absolute bottom-2 right-2 flex gap-1 z-10">
                      <button
                        onClick={handleResetViewport}
                        className="p-1 px-2 rounded bg-black/85 border border-white/5 hover:bg-white/5 transition-all font-mono text-[8px] text-zinc-300 font-bold uppercase cursor-pointer"
                      >
                        Reestablecer Vista
                      </button>
                    </div>

                    {/* Camera effect flash */}
                    <AnimatePresence>
                      {activeCameraSync && (
                        <motion.div
                          initial={{ opacity: 0.9 }}
                          animate={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-white pointer-events-none z-20"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Resolution and task info panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-black/45 p-3 rounded-lg border border-white/5 text-[11px] leading-relaxed">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">ELEMENTOS IMPLICADOS (CON GUID EN IFC / BCF)</span>
                      <div className="space-y-1 mt-1 font-mono text-[9.5px]">
                        {selectedIssue.elementGuids.map((guid, i) => (
                          <div key={guid} className="text-slate-300 flex justify-between bg-white/[0.02] p-1.5 rounded border border-white/5">
                            <span className="font-semibold text-pink-400">{selectedIssue.elementNames[i]}</span>
                            <span className="text-zinc-550 shrink-0 select-all ml-1 bg-black/60 px-1 rounded">{guid.substring(0,8)}...</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between bg-black/35 p-3 rounded-lg border border-white/5 text-left">
                      <div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block">RESOLUCIÓN DE ENCARGADO</span>
                        <p className="text-xs text-slate-300 mt-1 font-semibold">
                          Diseñador Climatizador tiene asignado resolver la interferencia.
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/5 mt-2">
                        <button
                          onClick={handleResolveIssue}
                          className={`flex-1 py-1 px-3 rounded-md font-mono text-[10px] font-black uppercase text-center cursor-pointer transition-all ${
                            selectedIssue.status === 'Resolved'
                              ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                              : 'bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/25'
                          }`}
                        >
                          {selectedIssue.status === 'Resolved' ? 'Reabrir Incidencia' : 'Resolver Interferencia'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments thread inside BCF */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3">
                    <span className="text-[9px] font-mono text-zinc-450 uppercase tracking-widest block font-black">
                      HISTORIAL DE COMENTARIOS ASOCIADOS AL XML / BCF
                    </span>

                    <div className="space-y-2.5 max-h-32 overflow-y-auto">
                      {selectedIssue.comments.map((comm, idx) => (
                        <div key={idx} className="p-2.5 bg-black/35 rounded border border-white/5 text-xs text-left">
                          <div className="flex justify-between font-mono text-[8.5px] text-zinc-500 mb-1">
                            <span className="font-bold text-[#38bdf8]">{comm.author}</span>
                            <span>{comm.time}</span>
                          </div>
                          <p className="text-slate-305 font-sans leading-relaxed">{comm.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Post comment form */}
                    <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-white/5">
                      <input
                        type="text"
                        value={currentCommentText}
                        onChange={(e) => setCurrentCommentText(e.target.value)}
                        placeholder="Escribe una directriz técnica o sugerencia de reubicación..."
                        className="flex-1 px-3 py-1.5 bg-black/60 border border-white/10 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                      />
                      <button
                        type="submit"
                        className="px-3 bg-pink-500/10 border border-pink-500/25 hover:bg-pink-500/20 transition-all text-pink-400 rounded cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced XML Structured Metadata Reference code segment */}
      <div className="bg-[#030a17]/50 border border-white/5 rounded-2xl p-5 md:p-6 text-left space-y-3">
        <div className="flex items-center gap-2 text-[#38bdf8]">
          <Compass className="w-5 h-5" />
          <span className="text-xs font-mono font-black uppercase tracking-wider">
            Estructura Técnica del Archivo BCF (markup.bcf)
          </span>
        </div>
        <p className="text-xs text-slate-350 leading-relaxed font-sans">
          A nivel de archivos internos, el archivo BCF comprimido cuenta con una estructura limpia XML estandarizada por buildingSMART para que cualquier software lea las coordenadas espaciales y mueva allí el visor 3D:
        </p>
        
        <div className="bg-black/75 p-4 rounded-xl border border-white/5 font-mono text-[9px] leading-relaxed text-pink-300 overflow-x-auto">
          <div className="text-zinc-550">// BCF XML Camera Perspective (Módulo de Teletransportación automática)</div>
          <div className="text-slate-400">&lt;<span className="text-pink-400 font-semibold">PerspectiveCamera</span>&gt;</div>
          <div className="pl-4 text-slate-300">&lt;<span className="text-[#38bdf8]">CameraViewPoint</span>&gt;</div>
          <div className="pl-8 text-slate-300">&lt;X&gt;<span className="text-white font-bold">{selectedIssue.coordinates.x.toFixed(4)}</span>&lt;/X&gt;</div>
          <div className="pl-8 text-slate-300">&lt;Y&gt;<span className="text-white font-bold">{selectedIssue.coordinates.y.toFixed(4)}</span>&lt;/Y&gt;</div>
          <div className="pl-8 text-slate-300">&lt;Z&gt;<span className="text-white font-bold">{selectedIssue.coordinates.z.toFixed(4)}</span>&lt;/Z&gt;</div>
          <div className="pl-4 text-slate-300">&lt;/<span className="text-[#38bdf8]">CameraViewPoint</span>&gt;</div>
          <div className="pl-4 text-slate-300">&lt;<span className="text-amber-500">CameraDirection</span>&gt;</div>
          <div className="pl-8 text-slate-350">&lt;Yaw&gt;{selectedIssue.cameraAngle.yaw}&lt;/Yaw&gt;</div>
          <div className="pl-8 text-slate-350">&lt;Pitch&gt;{selectedIssue.cameraAngle.pitch}&lt;/Pitch&gt;</div>
          <div className="pl-4 text-slate-300">&lt;/<span className="text-amber-500">CameraDirection</span>&gt;</div>
          <div className="text-slate-400">&lt;/<span className="text-pink-400 font-semibold">PerspectiveCamera</span>&gt;</div>
        </div>
      </div>

      {/* Practical Pedagogic Conclusion / Slide Takeaway */}
      <div className="bg-gradient-to-r from-pink-950/15 to-transparent p-5 rounded-xl border-l-4 border-pink-500 text-left">
        <span className="text-[10px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block mb-1">
          💡 RESUMEN CLAVE PARA EXÁMENES BIM
        </span>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          El <strong>BIM Collaboration Format (BCF)</strong> revoluciona la coordinación porque separa la comunicación ágil del peso colosal del diseño geométrico. No necesitas enviar el modelo nativo o guardar archivos IFC masivos de gigabytes por correo para reportar colisiones simples. Transmites un archivo de metadatos ultra-liviano de pocos kilobytes con comentarios de incidencias que sincroniza la cámara 3D de forma autónoma.
        </p>
      </div>

    </div>
  );
};
