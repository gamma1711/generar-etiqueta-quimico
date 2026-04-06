import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileText } from 'lucide-react';
import EtiquetaGHS from './components/EtiquetaGHS';
import './App.css';

// Imágenes de pictogramas GHS
import imgAcid from './assets/acid.png';
import imgCircleflame from './assets/circleflame.png';
import imgEnvironment from './assets/environment.png';
import imgExclaim from './assets/exclaim.png';
import imgExplosion from './assets/explosion.png';
import imgFlame from './assets/flame.png';
import imgGasbottle from './assets/gasbottle.png';
import imgHazardhealth from './assets/hazardhealth.png';
import imgSkull from './assets/skull.png';
import imgRevergy from './assets/7-revergy_horizontal.png';

// Lista de pictogramas SGA con sus imágenes
const pictogramsList = [
  { id: 'corrosivo', name: 'Corrosivo', img: imgAcid },
  { id: 'inflamable', name: 'Inflamable', img: imgFlame },
  { id: 'entorno', name: 'Peligro Ambiental', img: imgEnvironment },
  { id: 'exclamacion', name: 'Irritante', img: imgExclaim },
  { id: 'explosivo', name: 'Explosivo', img: imgExplosion },
  { id: 'comburente', name: 'Comburente', img: imgCircleflame },
  { id: 'gas', name: 'Gas a Presión', img: imgGasbottle },
  { id: 'salud', name: 'Peligro Salud', img: imgHazardhealth },
  { id: 'toxicidad', name: 'Toxicidad Aguda', img: imgSkull },
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
    pictograms: {},
  });

  const labelRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictogramChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      pictograms: { ...prev.pictograms, [id]: !prev.pictograms[id] },
    }));
  };

  const handlePrint = useReactToPrint({
    contentRef: labelRef,
    documentTitle: `Etiqueta_${formData.chemicalName || 'Quimico'}`,
  });

  return (
    <div className="page-wrapper">

      {/* Tarjeta principal */}
      <div className="card">

        {/* Logo */}
        <div className="logo-area">
          <img src={imgRevergy} alt="Revergy logo" />
        </div>

        {/* Título principal */}
        <h1 className="page-title">Generador de Etiquetas de Productos Químicos (SGA)</h1>

        {/* ── SECCIÓN: Datos de la etiqueta ── */}
        <p className="section-title">Datos de la etiqueta</p>

        {/* Nombre del químico + Palabra de advertencia */}
        <div className="field-grid field-grid-2" style={{ marginBottom: 18 }}>
          <Field label="Nombre del químico" required>
            <input
              name="chemicalName"
              value={formData.chemicalName}
              onChange={handleInputChange}
              placeholder="Nombre requerido"
            />
          </Field>
          <Field label="Palabra de advertencia" required>
            <select
              name="signalWord"
              value={formData.signalWord}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una palabra</option>
              <option value="PELIGRO">PELIGRO</option>
              <option value="ATENCIÓN">ATENCIÓN</option>
            </select>
          </Field>
        </div>

        {/* Códigos de peligro H */}
        <Field label="Pegar aquí códigos de peligro">
          <textarea
            name="hazardStatements"
            value={formData.hazardStatements}
            onChange={handleInputChange}
            placeholder="Pega aquí los códigos 'H' de tu Hoja o Ficha de Seguridad"
            rows={4}
          />
        </Field>

        {/* Códigos de prudencia P */}
        <Field label="Pegar aquí códigos de prudencia">
          <textarea
            name="precautionaryStatements"
            value={formData.precautionaryStatements}
            onChange={handleInputChange}
            placeholder="Pega aquí los códigos 'P' de tu Hoja o Ficha de Seguridad"
            rows={4}
          />
        </Field>

        {/* Teléfono de emergencia + Número de CAS */}
        <div className="field-grid field-grid-2">
          <Field label="Teléfono de emergencia">
            <input
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Teléfono"
            />
          </Field>
          <Field label="Número de CAS">
            <input
              name="casNumber"
              value={formData.casNumber}
              onChange={handleInputChange}
              placeholder="CAS"
            />
          </Field>
        </div>

        <hr className="section-divider" />

        {/* ── SECCIÓN: Datos del fabricante ── */}
        <p className="section-title">Datos del fabricante</p>

        <div className="field-grid field-grid-2" style={{ marginBottom: 18 }}>
          <Field label="Nombre del fabricante">
            <input
              name="manufacturerName"
              value={formData.manufacturerName}
              onChange={handleInputChange}
              placeholder="Nombre"
            />
          </Field>
          <Field label="Teléfono">
            <input
              name="manufacturerPhone"
              value={formData.manufacturerPhone}
              onChange={handleInputChange}
              placeholder="Teléfono"
            />
          </Field>
        </div>
        <Field label="Dirección">
          <input
            name="manufacturerAddress"
            value={formData.manufacturerAddress}
            onChange={handleInputChange}
            placeholder="Dirección"
          />
        </Field>

        <hr className="section-divider" />

        {/* ── SECCIÓN: Pictogramas ── */}
        <p className="section-title">Pictogramas</p>

        <div className="pictogram-grid">
          {pictogramsList.map((pic) => (
            <div
              key={pic.id}
              className={`pictogram-card${formData.pictograms[pic.id] ? ' selected' : ''}`}
              onClick={() => handlePictogramChange(pic.id)}
            >
              <img src={pic.img} alt={pic.name} />
            </div>
          ))}
        </div>

        {/* Número de ONU */}
        <div style={{ maxWidth: 220, marginTop: 8 }}>
          <Field label="Número de ONU">
            <input
              name="onuNumber"
              value={formData.onuNumber}
              onChange={handleInputChange}
              placeholder="ONU"
            />
          </Field>
        </div>

        <hr className="section-divider" style={{ marginTop: '36px' }} />

        {/* Botón generar al final del formulario */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button className="btn-generate" onClick={handlePrint}>
            <FileText size={16} />
            Generar Etiqueta
          </button>
        </div>

      </div>{/* fin .card */}

      {/* Componente oculto para imprimir */}
      <EtiquetaGHS ref={labelRef} data={formData} />
    </div>
  );
}

/* ── Componente Field reutilizable ── */
const Field = ({ label, required = false, children, style }) => (
  <div className="field" style={style}>
    {label && (
      <label className={required ? 'required' : ''}>
        {label}{required && <span style={{ color: 'var(--danger)' }}> *</span>}
      </label>
    )}
    {children}
  </div>
);

export default App;