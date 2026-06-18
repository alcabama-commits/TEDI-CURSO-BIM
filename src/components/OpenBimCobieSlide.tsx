import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, FileSpreadsheet, HardDrive, Users, MapPin, Tag, Wrench, 
  ShieldCheck, AlertCircle, FileText, CheckCircle2, RefreshCw, Clock, ArrowRight, ClipboardCheck
} from 'lucide-react';

interface CobieRecord {
  sheet: 'Contact' | 'Space' | 'Type' | 'Component';
  headers: string[];
  rows: Record<string, string>[];
}

interface AssetDetails {
  name: string;
  emoji: string;
  location: string;
  contact: { name: string; role: string; email: string };
  type: { model: string; manufacturer: string; warrantyYr: number; manualUrl: string };
  component: { serialNum: string; tagId: string; installationDate: string; testStatus: string };
}

// Structured assets displaying how COBie database elements cascade
const exampleAssets: Record<string, AssetDetails> = {
  hvac: {
    name: 'Unidad Manejadora de Aire (UMA-04)',
    emoji: '💨',
    location: 'Piso 3 - Sala de Máquinas Norte (N3-SM01)',
    contact: { name: 'Luis Vera', role: 'Instalador Climatización', email: 'lvera@climaexpertos.cl' },
    type: { model: 'VAV-Aero 400', manufacturer: 'Carrier Latam', warrantyYr: 5, manualUrl: 'https://specs.carrier.com/vav-aero400.pdf' },
    component: { serialNum: 'SN-CARRIER-2026-9904A', tagId: 'EQ-HVAC-P3-004', installationDate: '15/03/2026', testStatus: 'Aprobado / Operativo' },
  },
  elevator: {
    name: 'Ascensor de Pasajeros de Alta Velocidad (ASC-01)',
    emoji: '🛗',
    location: 'Piso 1 al 12 - Núcleo de Circulación Central (N-CIRC)',
    contact: { name: 'Marta Rivas', role: 'Fabricante de Elevación', email: 'mrivas@schindler.com' },
    type: { model: 'Schindler 5500', manufacturer: 'Schindler Group', warrantyYr: 10, manualUrl: 'https://specs.schindler.com/s5500-manual.pdf' },
    component: { serialNum: 'SN-SCH-55-8812-C', tagId: 'EQ-ELEV-01', installationDate: '10/01/2026', testStatus: 'Aprobado / Certificado' },
  },
  booster: {
    name: 'Grupo de Bombeo de Agua Potable (BOM-02)',
    emoji: '💧',
    location: 'Subterráneo - Planta Hidráulica (SB-PLH02)',
    contact: { name: 'Andrés Soto', role: 'Contratista Hidráulico', email: 'asoto@hidrosistemas.cl' },
    type: { model: 'Hydro-booster Triplex 5HP', manufacturer: 'Grundfos', warrantyYr: 3, manualUrl: 'https://specs.grundfos.com/triplex5hp.pdf' },
    component: { serialNum: 'SN-GF-TRIPLEX-0921', tagId: 'EQ-PLUMB-SB-02', installationDate: '02/02/2026', testStatus: 'Aprobado / Operativo' },
  }
};

export const OpenBimCobieSlide = () => {
  const [selectedAssetKey, setSelectedAssetKey] = useState<string>('hvac');
  const [activeSheet, setActiveSheet] = useState<'Contact' | 'Space' | 'Type' | 'Component'>('Type');
  const [simulatedHandovers, setSimulatedHandovers] = useState<Record<string, 'lost' | 'digital'>>({
    hvac: 'lost',
    elevator: 'lost',
    booster: 'lost'
  });

  const selectedAsset = exampleAssets[selectedAssetKey];

  // Dynamic rows based on selected asset for Excel Simulator
  const cobieSheets: Record<'Contact' | 'Space' | 'Type' | 'Component', CobieRecord> = {
    Contact: {
      sheet: 'Contact',
      headers: ['Email', 'CreatedBy', 'CreatedOn', 'Category', 'Company', 'Phone', 'GivenName', 'FamilyName'],
      rows: [
        {
          Email: selectedAsset.contact.email,
          CreatedBy: 'BIM_Manager@obra.com',
          CreatedOn: '2026-06-18',
          Category: 'Contratista de Especialidad',
          Company: selectedAsset.contact.role.split(' ')[2] || 'Especialista',
          Phone: '+56 9 8877 6655',
          GivenName: selectedAsset.contact.name.split(' ')[0],
          FamilyName: selectedAsset.contact.name.split(' ')[1],
        },
        {
          Email: 'soporte@proveedor.com',
          CreatedBy: 'BIM_Manager@obra.com',
          CreatedOn: '2026-06-18',
          Category: 'Fabricante de Equipamiento',
          Company: selectedAsset.type.manufacturer,
          Phone: '+56 2 2334 4556',
          GivenName: 'Servicio',
          FamilyName: 'Técnico',
        }
      ]
    },
    Space: {
      sheet: 'Space',
      headers: ['Name', 'CreatedBy', 'CreatedOn', 'Category', 'FloorName', 'Description', 'RoomTag'],
      rows: [
        {
          Name: selectedAsset.location.split(' (')[1].replace(')', ''),
          CreatedBy: 'BIM_Manager@obra.com',
          CreatedOn: '2026-06-18',
          Category: 'Sala Técnica',
          FloorName: selectedAsset.location.split(' - ')[0],
          Description: selectedAsset.location.split(' (')[0].split(' - ')[1],
          RoomTag: selectedAsset.location.split(' (')[1].replace(')', '') + '-TAG',
        }
      ]
    },
    Type: {
      sheet: 'Type',
      headers: ['Name', 'CreatedBy', 'CreatedOn', 'Category', 'Manufacturer', 'ModelNumber', 'WarrantyDuration', 'DocumentReference'],
      rows: [
        {
          Name: selectedAsset.name.split(' (')[1].replace(')', '') + '_TYPE',
          CreatedBy: 'BIM_Manager@obra.com',
          CreatedOn: '2026-06-18',
          Category: selectedAsset.name.split(' (')[0],
          Manufacturer: selectedAsset.type.manufacturer,
          ModelNumber: selectedAsset.type.model,
          WarrantyDuration: selectedAsset.type.warrantyYr + ' Años',
          DocumentReference: selectedAsset.type.manualUrl,
        }
      ]
    },
    Component: {
      sheet: 'Component',
      headers: ['Name', 'CreatedBy', 'CreatedOn', 'TypeName', 'SpaceName', 'SerialNumber', 'AssetIdentifier', 'InstallationDate'],
      rows: [
        {
          Name: selectedAsset.component.tagId,
          CreatedBy: 'BIM_Manager@obra.com',
          CreatedOn: '2026-06-18',
          TypeName: selectedAsset.name.split(' (')[1].replace(')', '') + '_TYPE',
          SpaceName: selectedAsset.location.split(' (')[1].replace(')', ''),
          SerialNumber: selectedAsset.component.serialNum,
          AssetIdentifier: selectedAsset.component.tagId,
          InstallationDate: selectedAsset.component.installationDate,
        }
      ]
    }
  };

  const handleToggleHandover = (key: string) => {
    setSimulatedHandovers(prev => ({
      ...prev,
      [key]: prev[key] === 'digital' ? 'lost' : 'digital'
    }));
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto text-slate-100 font-sans">
      
      {/* Header Secction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#10b981] font-extrabold uppercase tracking-[0.2em] block mb-1">
            SESIÓN 7 — OPEN BIM E INTEROPERABILIDAD
          </span>
          <h2 className="text-2xl font-mono text-white font-black uppercase tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-[#10b981] shrink-0" />
            2. Extracción de Datos mediante COBie para Mantenimiento
          </h2>
          <p className="text-xs text-slate-400 font-medium font-sans">
            Comprendiendo el estándar relacional que transforma el caos operativo en bases de datos listos para operar
          </p>
        </div>
        
        {/* Time Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full text-[9px] font-mono text-[#10b981] font-bold self-center">
          <Clock className="w-3.5 h-3.5" />
          ESTRATEGIA AVANZADA DE OPERACIÓN (50 MIN)
        </div>
      </div>

      {/* Concept block comparing paper and digital COBie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Paper Chaos Cards */}
        <div className="bg-[#05050e]/40 p-4 rounded-xl border border-red-500/10 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono text-red-400 bg-red-400/10 border border-red-500/20 px-2 py-0.5 rounded uppercase font-bold">
              ENTREGA TRADICIONAL (EL CAOS OPERATIVO)
            </span>
            <span className="text-lg">📦</span>
          </div>
          <h4 className="text-xs font-mono text-slate-200 uppercase font-black">Planos en cajas de cartón y archivadores AZ</h4>
          <p className="text-[11.5px] leading-relaxed text-slate-400">
            Al finalizar un megaproyecto, el constructor entrega cientos de archivadores con manuales fotocopiados, garantías impresas y planos as-built PDF desvinculados de la realidad. El Facility Manager tarda <strong>más de 12 meses</strong> en digitalizar estos papeles para subirlos a su software de mantenimiento (GMAO), periodo durante el cual el <strong>30% de las garantías caduca</strong> sin ser registradas.
          </p>
        </div>

        {/* COBie Rescue */}
        <div className="bg-[#050510]/50 p-4 rounded-xl border border-[#10b981]/20 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono text-[#10b981] bg-[#10b981]/15 border border-[#10b981]/30 px-2 py-0.5 rounded uppercase font-bold">
              ESTÁNDAR COBie (CONEXIÓN INMEDIATA)
            </span>
            <span className="text-lg">⚡</span>
          </div>
          <h4 className="text-xs font-mono text-slate-200 uppercase font-black">Bases de datos estandarizadas legibles por máquinas</h4>
          <p className="text-[11.5px] leading-relaxed text-slate-400">
            <strong>COBie (Construction Operations Building Information Exchange)</strong> es un subconjunto simplificado del esquema IFC. Permite volcar toda la información de contactos, garantías, espacios y catálogos en una estructura de base de datos relacional (visualizable en Excel) que cualquier software de operaciones puede importar en <strong>cuestión de segundos</strong>.
          </p>
        </div>
      </div>

      {/* BIM Element Selection & Cascading Simulator */}
      <div className="bg-[#040e24]/20 border border-white/5 rounded-2xl p-5 md:p-6 text-left space-y-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 border-b border-white/5 pb-4">
          <div>
            <span className="text-[9px] font-mono text-[#10b981] font-extrabold uppercase tracking-widest block">INTERACTIVO PARTE 1</span>
            <h4 className="text-md font-sans font-black text-white uppercase">El Flujo de Datos COBie en Cascada</h4>
            <p className="text-xs text-slate-450 mt-0.5 leading-normal">
              Selecciona un activo certificado y observa cómo se estructura su información a lo largo de las hojas principales de datos COBie.
            </p>
          </div>

          {/* Asset Selector buttons */}
          <div className="flex flex-wrap p-0.5 bg-black/65 border border-white/5 rounded-lg shrink-0 font-mono shadow-md text-[9.5px] gap-1">
            {Object.entries(exampleAssets).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedAssetKey(key)}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer font-extrabold flex items-center gap-1.5 ${
                  selectedAssetKey === key 
                    ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>{value.emoji}</span>
                <span>{value.name.split(' (')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Cascading steps cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Step 1: Contact */}
          <div className={`p-4 rounded-xl border text-left transition-all ${
            activeSheet === 'Contact' ? 'border-yellow-500/40 bg-yellow-500/[0.03]' : 'border-white/5 bg-black/30'
          }`}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className={`p-1.5 rounded text-yellow-500 ${activeSheet === 'Contact' ? 'bg-yellow-500/20' : 'bg-white/5'}`}>
                <Users className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-yellow-500 font-extrabold tracking-wider">COBie: Contact</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug mb-3">
              ¿Quién instaló el equipo? Almacena datos del contratista para reclamo de garantías.
            </p>
            <div className="text-[11px] font-mono space-y-0.5 text-slate-200 border-t border-white/5 pt-2">
              <div className="font-bold">{selectedAsset.contact.name}</div>
              <div className="text-[10px] text-zinc-500 leading-tight">{selectedAsset.contact.role}</div>
              <div className="text-[9.5px] text-yellow-500/90 truncate">{selectedAsset.contact.email}</div>
            </div>
          </div>

          {/* Step 2: Space */}
          <div className={`p-4 rounded-xl border text-left transition-all ${
            activeSheet === 'Space' ? 'border-emerald-500/40 bg-emerald-500/[0.03]' : 'border-white/5 bg-black/30'
          }`}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className={`p-1.5 rounded text-emerald-500 ${activeSheet === 'Space' ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                <MapPin className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-emerald-500 font-extrabold tracking-wider">COBie: Space</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug mb-3">
              ¿Dónde está instalado físicamente dentro del modelo y los niveles de la edificación?
            </p>
            <div className="text-[11px] font-mono space-y-0.5 text-slate-200 border-t border-white/5 pt-2">
              <div className="font-bold">{selectedAsset.location.split(' - ')[1].split(' (')[0]}</div>
              <div className="text-[10px] text-zinc-500 leading-tight">{selectedAsset.location.split(' - ')[0]}</div>
              <div className="text-[9.5px] text-emerald-400 font-bold">{selectedAsset.location.split(' (')[1]?.replace(')', '') || 'TAG-01'}</div>
            </div>
          </div>

          {/* Step 3: Type */}
          <div className={`p-4 rounded-xl border text-left transition-all ${
            activeSheet === 'Type' ? 'border-sky-500/40 bg-sky-500/[0.03]' : 'border-white/5 bg-black/30'
          }`}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className={`p-1.5 rounded text-sky-500 ${activeSheet === 'Type' ? 'bg-sky-500/20' : 'bg-white/5'}`}>
                <Tag className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-sky-500 font-extrabold tracking-wider">COBie: Type</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug mb-3">
              ¿Qué tipo/catálogo es? Almacena marca, manual digital y términos de garantía.
            </p>
            <div className="text-[11px] font-mono space-y-0.5 text-slate-200 border-t border-white/5 pt-2">
              <div className="font-bold">{selectedAsset.type.model}</div>
              <div className="text-[10px] text-zinc-500 leading-tight">Fabricante: {selectedAsset.type.manufacturer}</div>
              <div className="text-[9.5px] text-[#3aebff] truncate underline">Ficha de Garantía</div>
            </div>
          </div>

          {/* Step 4: Component */}
          <div className={`p-4 rounded-xl border text-left transition-all ${
            activeSheet === 'Component' ? 'border-purple-500/40 bg-purple-500/[0.03]' : 'border-white/5 bg-black/30'
          }`}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className={`p-1.5 rounded text-purple-500 ${activeSheet === 'Component' ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                <Wrench className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-purple-500 font-extrabold tracking-wider">COBie: Component</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug mb-3">
              ¿Identificación única física? La instancia con número de serie de fábrica y tag en obra.
            </p>
            <div className="text-[11px] font-mono space-y-0.5 text-slate-200 border-t border-white/5 pt-2">
              <div className="font-bold truncate">{selectedAsset.component.serialNum}</div>
              <div className="text-[10px] text-zinc-500 leading-tight">Tag: {selectedAsset.component.tagId}</div>
              <div className="text-[9.5px] text-purple-400 font-bold">{selectedAsset.component.testStatus}</div>
            </div>
          </div>

        </div>

        {/* Excel Spreadsheet GUI Simulator representing actual COBie tables */}
        <div className="bg-[#050b18]/60 border border-white/5 rounded-xl overflow-hidden text-left shadow-lg">
          
          {/* Excel Spreadsheet Header tabs */}
          <div className="flex bg-black/50 border-b border-white/5 font-mono text-[9.5px] overflow-x-auto select-none">
            
            <div className="px-3.5 py-2.5 bg-zinc-900 border-r border-[#1e293b] text-slate-400 tracking-wider flex items-center gap-1.5 shrink-0">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>COBie_Mantenimiento_AsBuilt.xlsx</span>
            </div>

            <button
              onClick={() => setActiveSheet('Contact')}
              className={`px-4 py-2.5 border-r border-[#1e293b] transition-all font-bold uppercase cursor-pointer ${
                activeSheet === 'Contact' 
                  ? 'bg-yellow-500/10 text-yellow-400 border-t-2 border-yellow-500' 
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              📊 Contact
            </button>

            <button
              onClick={() => setActiveSheet('Space')}
              className={`px-4 py-2.5 border-r border-[#1e293b] transition-all font-bold uppercase cursor-pointer ${
                activeSheet === 'Space' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-t-2 border-emerald-500' 
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              🏢 Space
            </button>

            <button
              onClick={() => setActiveSheet('Type')}
              className={`px-4 py-2.5 border-r border-[#1e293b] transition-all font-bold uppercase cursor-pointer ${
                activeSheet === 'Type' 
                  ? 'bg-sky-500/10 text-sky-450 border-t-2 border-sky-500' 
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              🏷️ Type (Modelos)
            </button>

            <button
              onClick={() => setActiveSheet('Component')}
              className={`px-4 py-2.5 border-r border-[#1e293b] transition-all font-bold uppercase cursor-pointer ${
                activeSheet === 'Component' 
                  ? 'bg-purple-500/10 text-purple-400 border-t-2 border-purple-500' 
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              🔩 Component (Series)
            </button>

          </div>

          {/* Spreadsheet Table Data representation */}
          <div className="p-3.5 overflow-x-auto bg-black/40">
            <table className="w-full font-mono text-[10px] text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="py-1.5 px-2 bg-zinc-950/45 text-[8.5px] border-r border-zinc-900">N°</th>
                  {cobieSheets[activeSheet].headers.map((hdr) => (
                    <th key={hdr} className="py-1.5 px-3 bg-[#030712] font-black uppercase text-zinc-400 border-r border-zinc-900 tracking-wide">
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cobieSheets[activeSheet].rows.map((row, idx) => (
                  <tr key={idx} className="border-b border-zinc-900 bg-white/[0.01]">
                    <td className="py-2 px-2 bg-zinc-950/45 text-[8.5px] border-r border-zinc-900 text-slate-600 font-bold text-center">
                      {idx + 1}
                    </td>
                    {cobieSheets[activeSheet].headers.map((hdr) => (
                      <td key={hdr} className="py-2 px-3 border-r border-zinc-900 truncate max-w-[200px] text-slate-300">
                        {hdr === 'DocumentReference' ? (
                          <span className="text-[#3aebff] underline cursor-pointer">{row[hdr]}</span>
                        ) : (
                          row[hdr]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Micro lesson panel detailing what each selected sheet contains */}
          <div className="bg-[#030814]/80 p-3 px-4 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] text-slate-400 gap-2.5">
            <span className="italic font-sans">
              🔍 <strong>Auditoría Metodológica:</strong> El formato relacional asegura que la hoja <em>Component</em> haga referencia estricta a la llave única (ID) de la hoja <em>Type</em>, evitando duplicidad de información técnica.
            </span>
            <span className="text-[#10b981] font-mono font-bold">
              ✓ Estándar buildingSMART Internacional
            </span>
          </div>

        </div>

      </div>

      {/* Handover Performance Test - Traditional vs. Digital COBie Upload */}
      <div className="bg-[#040e24]/20 border border-white/5 rounded-2xl p-5 md:p-6 text-left space-y-4">
        <div>
          <span className="text-[9px] font-mono text-pink-500 font-extrabold uppercase tracking-widest block">INTERACTIVO PARTE 2</span>
          <h4 className="text-md font-sans font-black text-white uppercase">Simulador de Importación de Datos en GMAO/CMMS</h4>
          <p className="text-xs text-slate-450 mt-0.5">
            Ponte a prueba simulando el traspaso del modelo de mantenimiento. Haz clic en el botón de cada activo para cambiar su estado de carpeta a COBie y observa el impacto en la operación del Facility Manager.
          </p>
        </div>

        {/* Small comparative console panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Interactive controls config */}
          <div className="lg:col-span-5 bg-black/45 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-bold">Bandeja de Equipamiento Pendiente</span>
              
              <div className="space-y-2">
                {Object.entries(exampleAssets).map(([key, item]) => (
                  <div key={key} className="p-3 bg-[#040813] border border-white/5 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <div className="text-[11px] font-mono leading-none">
                        <div className="text-white font-bold">{item.name.split(' (')[0]}</div>
                        <div className="text-zinc-500 mt-1">Ubicación: {item.location.split(' - ')[0]}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleHandover(key)}
                      className={`px-2.5 py-1.5 rounded font-mono text-[9px] font-black uppercase border cursor-pointer transition-all ${
                        simulatedHandovers[key] === 'digital'
                          ? 'bg-[#10b981]/15 border-[#10b981]/30 text-[#10b981]'
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      {simulatedHandovers[key] === 'digital' ? '✓ COBie Activo' : '✗ Carpeta AZ'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-zinc-500 leading-relaxed font-sans">
              💡 Haz clic en los botones rojos para simular que los modeladores completaron el mapeo COBie antes del término de obra de cada activo.
            </div>
          </div>

          {/* Database upload statistics */}
          <div className="lg:col-span-7 bg-black/20 p-5 border border-zinc-900 rounded-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[9.5px] font-mono text-[#10b981] uppercase font-bold pl-1.5 border-l-2 border-[#10b981] block">
                CONSOLA DEL GEFE DE MANTENIMIENTO (FACILITY MANAGER PANEL)
              </span>

              {/* Dynamic stats metrics */}
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-black/60 p-3 rounded-lg border border-white/5">
                  <span className="text-[8px] font-mono text-zinc-500 block uppercase">Tiempo de Carga Digital</span>
                  <span className="text-xl font-mono font-black text-white">
                    {Object.values(simulatedHandovers).filter(v => v === 'digital').length === 3 
                      ? '12 Segundos' 
                      : Object.values(simulatedHandovers).filter(v => v === 'digital').length === 0 
                      ? '14 Meses' 
                      : '8 Meses'
                    }
                  </span>
                  <div className="text-[10px] font-sans text-zinc-400 mt-1">
                    Traspaso manual a base de datos de CMMS.
                  </div>
                </div>

                <div className="bg-black/60 p-3 rounded-lg border border-white/5">
                  <span className="text-[8px] font-mono text-zinc-500 block uppercase">Porcentaje de Garantías Aseguradas</span>
                  <span className={`text-xl font-mono font-black ${
                    Object.values(simulatedHandovers).filter(v => v === 'digital').length === 3 
                      ? 'text-[#10b981]' 
                      : 'text-amber-500'
                  }`}>
                    {Object.values(simulatedHandovers).filter(v => v === 'digital').length === 3 
                      ? '100% Sin Pérdidas' 
                      : Object.values(simulatedHandovers).filter(v => v === 'digital').length === 0 
                      ? '45% Extraídas' 
                      : '70% Registradas'
                    }
                  </span>
                  <div className="text-[10px] font-sans text-zinc-400 mt-1">
                    Seguimiento contra siniestros.
                  </div>
                </div>
              </div>

              {/* Status report summary message based on integration states */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={JSON.stringify(simulatedHandovers)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2"
                >
                  {Object.values(simulatedHandovers).filter(v => v === 'digital').length === 3 ? (
                    <div className="p-3 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl space-y-1">
                      <div className="flex items-center gap-2 text-[#10b981] text-xs font-bold font-mono">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>ESTADO: INTEGRACIÓN PRESTO / GMAO EXITOSA (LOD 500)</span>
                      </div>
                      <p className="text-[11.5px] text-slate-350 leading-relaxed font-sans">
                        Excelente trabajo de control de calidad. Al estar el 100% de los elementos mapeados con el estándar COBie, el software de Facility Management lee de inmediato el modelo as-built BIM. Los mantenimientos preventivos quedan agendados en una mañana.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                      <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-mono">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>ESTADO: POBREZA DE INFORMACIÓN DE ACTIVOS (CAOS LEGAL)</span>
                      </div>
                      <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                        Falta exportación estructurada del {3 - Object.values(simulatedHandovers).filter(v => v === 'digital').length} activo(s). El gestor de mantenimiento tendrá que buscar de forma individual en carpetas físicas archivadas en el sótano para averiguar a qué correo de proveedor llamar ante una rotura o falla técnica crítica.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Practical pedagogical summary value */}
            <div className="mt-4 p-3 bg-pink-500/[0.03] border border-pink-500/25 rounded-xl text-[11px] leading-relaxed text-slate-300">
              <span className="font-mono text-pink-500 text-[9px] font-black uppercase tracking-widest block mb-0.5">📂 IMPACTO PROFESIONAL EN ADQUISICIONES</span>
              Un modelo COBie bien auditado disminuye en un <strong>20% los costos operativos</strong> de operaciones de la edificación en los primeros 10 años, eliminando el desperdicio de tiempo del personal de mantención buscando datos de repuestos desactualizados.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
