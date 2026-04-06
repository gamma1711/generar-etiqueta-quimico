import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileText, Upload, CheckCircle } from 'lucide-react';
import EtiquetaGHS from './components/EtiquetaGHS'; // Importamos el componente de la etiqueta

// Lista de pictogramas SGA para el formulario
const pictogramsList = [
  { id: 'inflamable', name: 'Líquidos/Sólidos Inflamables' },
  { id: 'exclamacion:!', name: 'Irritante / Sensibilizante' },
  { id: 'corrosivo', name: 'Corrosivo' },
  { id: 'gas', name: 'Gas a Presión' },
  { id: 'explosivo', name: 'Explosivo' },
  { id: 'comburente', name: 'Comburente' },
  { id: 'toxicidad', name: 'Toxicidad Aguda' },
  { id: 'salud', name: 'Peligro para la Salud' },
  { id: 'entorno', name: 'Peligro para el Medio Ambiente' },
];

function App() {
  const [formData, setFormData] = useState({
    chemicalName: '',
    signalWord: '',
    hazardStatements: '',
    precautionaryStatements: '',
    emergencyContact: '',
    casNumber: '',
    onuNumber: '',
    manufacturerName: '',
    manufacturerPhone: '',
    manufacturerAddress: '',
    verticalText: 'GHSE Consulting: www.ghse.com.mx',
    pictograms: {},
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const labelRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictogramChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      pictograms: { ...prev.pictograms, [name]: checked },
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: labelRef,
    documentTitle: `Etiqueta_${formData.chemicalName || 'Quimico'}`,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-3xl">G</div>
        <h1 className="text-3xl font-extrabold text-blue-950 flex-grow">
          Generador de Etiquetas de Productos Químicos (SGA)
        </h1>
        <button
          onClick={handlePrint}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 transition shadow"
        >
          <FileText size={20} /> Generar Etiqueta PDF
        </button>
      </header>

      <main className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario Principal (Columnas 1 y 2) */}
        <div className="lg:col-span-2 space-y-8">

          {/* 1. Datos del Químico */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-5 text-blue-950">1. Datos de la etiqueta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Nombre del químico*" name="chemicalName" value={formData.chemicalName} onChange={handleInputChange} placeholder="Ej. ACETONA" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Palabra de advertencia*</label>
                <select name="signalWord" value={formData.signalWord} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200">
                  <option value="">Selecciona una palabra</option>
                  <option value="PELIGRO">PELIGRO</option>
                  <option value="ATENCIÓN">ATENCIÓN</option>
                </select>
              </div>
              <InputField label="Número de CAS" name="casNumber" value={formData.casNumber} onChange={handleInputChange} placeholder="Ej. 67-64-1" />
              <InputField label="Número de ONU" name="onuNumber" value={formData.onuNumber} onChange={handleInputChange} placeholder="Ej. UN 1090" />
              <TextAreaField label="Indicaciones de peligro (Frases H)" name="hazardStatements" value={formData.hazardStatements} onChange={handleInputChange} placeholder="Pega aquí los códigos y textos 'H'..." rows={3} />
              <TextAreaField label="Consejos de prudencia (Frases P)" name="precautionaryStatements" value={formData.precautionaryStatements} onChange={handleInputChange} placeholder="Pega aquí los códigos y textos 'P'..." rows={3} />
              <TextAreaField label="Teléfono de emergencia*" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} placeholder="Ej. 800 123 4567" rows={2} className="md:col-span-2" />
            </div>
          </section>

          {/* 2. Datos del Fabricante */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-5 text-blue-950">2. Datos del fabricante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Nombre del fabricante" name="manufacturerName" value={formData.manufacturerName} onChange={handleInputChange} placeholder="Ej. Química Global S.A." />
              <InputField label="Teléfono" name="manufacturerPhone" value={formData.manufacturerPhone} onChange={handleInputChange} placeholder="Ej. +52 55..." />
              <TextAreaField label="Dirección" name="manufacturerAddress" value={formData.manufacturerAddress} onChange={handleInputChange} placeholder="Dirección completa..." rows={2} className="md:col-span-2" />
            </div>
          </section>

          {/* 3. Pictogramas */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-5 text-blue-950">3. Pictogramas SGA</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {pictogramsList.map((pic) => (
                <label key={pic.id} className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition text-center">
                  <input type="checkbox" name={pic.id} checked={!!formData.pictograms[pic.id]} onChange={handlePictogramChange} className="w-5 h-5 text-blue-900 rounded focus:ring-blue-800" />
                  <span className="text-xs font-medium text-gray-700">{pic.name}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Panel Lateral: Personalización y Vista Previa (Columna 3) */}
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-5 text-blue-950">4. Personalización de Marca</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo de la empresa</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 text-sm font-medium">
                    <Upload size={16} /> Subir Logo
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  {logoPreview && <CheckCircle className="text-green-600" size={20} />}
                </div>
              </div>
              <InputField label="Texto vertical de marca (derecha)" name="verticalText" value={formData.verticalText} onChange={handleInputChange} placeholder="Ej. GHSE Consulting: www.ghse.com.mx" />
            </div>
          </section>

          {/* Resumen/Instrucciones */}
          <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-950 space-y-3">
            <p className="font-semibold">Instrucciones:</p>
            <ol className="list-decimal list-inside text-sm space-y-1.5 text-blue-900">
              <li>Rellena todos los campos obligatorios (*).</li>
              <li>Selecciona los pictogramas que apliquen.</li>
              <li>Sube tu logo para personalizar la marca.</li>
              <li>Haz clic en "Generar Etiqueta PDF" arriba.</li>
            </ol>
          </section>
        </div>
      </main>

      {/* Componente oculto que se usa para imprimir */}
      <EtiquetaGHS ref={labelRef} data={formData} logoPreview={logoPreview} />
    </div>
  );
}

// Componentes Auxiliares para el formulario (Inputs estilizados)
const InputField = ({ label, className = '', ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type="text" {...props} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
  </div>
);

const TextAreaField = ({ label, className = '', ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea {...props} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
  </div>
);

export default App;