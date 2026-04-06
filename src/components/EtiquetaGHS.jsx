import React, { forwardRef } from 'react';

// Imágenes de pictogramas GHS
import imgAcid from '../assets/acid.png';
import imgCircleflame from '../assets/circleflame.png';
import imgEnvironment from '../assets/environment.png';
import imgExclaim from '../assets/exclaim.png';
import imgExplosion from '../assets/explosion.png';
import imgFlame from '../assets/flame.png';
import imgGasbottle from '../assets/gasbottle.png';
import imgHazardhealth from '../assets/hazardhealth.png';
import imgSkull from '../assets/skull.png';
import imgRevergyLogo from '../assets/1-revergy_cuadrado.png';

// Mapeo de ID → imagen del asset
const pictogramImages = {
    corrosivo: imgAcid,
    inflamable: imgFlame,
    entorno: imgEnvironment,
    exclamacion: imgExclaim,
    explosivo: imgExplosion,
    comburente: imgCircleflame,
    gas: imgGasbottle,
    salud: imgHazardhealth,
    toxicidad: imgSkull,
};

const EtiquetaGHS = forwardRef(({ data }, ref) => {
    if (!data) return null;

    // Pictogramas seleccionados
    const selectedPics = Object.keys(data.pictograms)
        .filter(key => data.pictograms[key])
        .map(key => ({ id: key, src: pictogramImages[key] }))
        .filter(p => p.src);

    const fabricanteTexto = [
        data.manufacturerName,
        data.manufacturerAddress ? `Dirección: ${data.manufacturerAddress}` : '',
        data.manufacturerPhone   ? `Teléfono: ${data.manufacturerPhone}`   : '',
    ].filter(Boolean).join('. ');

    return (
        <div style={{ display: 'none' }}>
            {/* Contenedor envolvente para centrar el PDF en la página impresa */}
            <div
                ref={ref}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '60px',
                    width: '100%',
                }}
            >
                {/* La etiqueta real */}
                <div
                    style={{
                        width: '780px',
                        minHeight: '520px',
                        boxSizing: 'border-box',
                        border: '5px solid #000',
                        padding: '25px', // padding simétrico
                        fontFamily: 'Arial, sans-serif',
                        position: 'relative',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >


                {/* ── CABECERA ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', width: '100%' }}>
                    
                    {/* Logo y Nombre del Químico (Izquierda) */}
                    <div style={{ width: '48%', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-start' }}>
                        <img
                            src={imgRevergyLogo}
                            alt="Revergy"
                            style={{ width: '70px', height: '70px', objectFit: 'contain', flexShrink: 0 }}
                        />
                        <div style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase', lineHeight: '1.2' }}>
                            {data.chemicalName || 'NOMBRE DEL QUÍMICO'}
                        </div>
                    </div>

                    {/* Palabra de Advertencia (Centro) */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '22px', textTransform: 'uppercase' }}>
                            {data.signalWord || ''}
                        </div>
                    </div>

                    {/* CAS / ONU (Derecha) */}
                    <div style={{ width: '28%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', fontWeight: 'bold', fontSize: '13px', lineHeight: '1.4' }}>
                        {data.casNumber && <div>CAS: {data.casNumber}</div>}
                        <div>ONU: {data.onuNumber || 'NO REGULADO'}</div>
                    </div>
                </div>

                {/* ── CUERPO ── */}
                <div style={{ display: 'flex', flex: 1, marginTop: '5px' }}>
                    
                    {/* Columna Izquierda: Pictogramas */}
                    <div style={{ width: '38%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        {/* Pictogramas */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                            {selectedPics.length > 0 ? (
                                selectedPics.map(pic => (
                                    <img key={pic.id} src={pic.src} alt={pic.id} style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
                                ))
                            ) : (
                                <div style={{ fontSize: '11px', color: '#aaa', fontStyle: 'italic' }}>Sin pictogramas</div>
                            )}
                        </div>
                    </div>

                    {/* Columna Derecha: Frases H y P */}
                    <div style={{ flex: 1, paddingLeft: '15px', fontSize: '15px', lineHeight: '1.5', paddingRight: '20px' }}>
                        {data.hazardStatements && (
                            <p style={{ whiteSpace: 'pre-line', marginBottom: '8px' }}>
                                {data.hazardStatements}
                            </p>
                        )}
                        {data.precautionaryStatements && (
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {data.precautionaryStatements}
                            </p>
                        )}
                        {!data.hazardStatements && !data.precautionaryStatements && (
                            <p style={{ color: '#aaa', fontStyle: 'italic', fontSize: '12px' }}>
                                Aquí aparecerán las indicaciones de peligro (H) y consejos de prudencia (P)...
                            </p>
                        )}
                    </div>
                </div>

                {/* ── PIE DE PÁGINA ── */}
                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '35px' }}>
                    {/* Sección Emergencia */}
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ textDecoration: 'underline', textTransform: 'uppercase', fontSize: '12px', marginBottom: '5px' }}>
                            EN CASO DE EMERGENCIA
                        </div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center', lineHeight: '1.3' }}>
                            {data.emergencyContact || 'Teléfono'}
                        </div>
                    </div>

                    {/* Sección Fabricante */}
                    <div style={{ flex: 1, fontSize: '13px', lineHeight: '1.5', paddingLeft: '15px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>FABRICANTE:</div>
                        <div>{fabricanteTexto || 'Nombre del fabricante. Dirección.'}</div>
                    </div>
                </div>

            </div>
            </div>
        </div>
    );
});

export default EtiquetaGHS;