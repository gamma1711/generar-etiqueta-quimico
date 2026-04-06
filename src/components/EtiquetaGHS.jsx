import React, { forwardRef } from 'react';

// Mapeo de IDs de pictogramas a emojis o imágenes reales
const mapPictograms = {
    inflamable: '🔥',
    exclamacion: '!',
    corrosivo: '🧪',
    gas: '🧴',
    explosivo: '💥',
    comburente: '⭕',
    toxicidad: '💀',
    salud: '👤',
    entorno: '🐟'
};

const EtiquetaGHS = forwardRef(({ data, logoPreview }, ref) => {
    if (!data) return null;

    // Filtrar y mapear solo los pictogramas seleccionados
    const selectedPictogramIcons = Object.keys(data.pictograms)
        .filter(key => data.pictograms[key])
        .map(key => mapPictograms[key]);

    return (
        <div className="p-4" style={{ display: 'none' }}> {/* Oculto en pantalla */}
            <div
                ref={ref}
                className="bg-white border-[6px] border-black p-6 font-sans relative"
                style={{ width: '800px', height: '560px', boxSizing: 'border-box' }} // Tamaño fijo para PDF
            >
                {/* Texto Vertical de Marca a la derecha */}
                <div className="absolute right-0 top-1/2 -rotate-90 origin-right translate-x-[calc(50%-1.5rem)] text-xs text-blue-800 font-medium whitespace-nowrap">
                    {data.verticalText || 'GHSE Consulting: www.ghse.com.mx'}
                </div>

                {/* Cabecera: Logo, Nombre, Palabra, Códigos */}
                <div className="flex gap-4 items-start mb-6">
                    {/* Logo */}
                    <div className="w-16 h-16 flex-shrink-0">
                        {logoPreview ? (
                            <img src={logoPreview} alt="Logo Empresa" className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-400">Logo</div>
                        )}
                    </div>

                    {/* Nombre del Producto */}
                    <div className="flex-grow">
                        <h1 className="text-4xl font-bold uppercase">{data.chemicalName || 'NOMBRE DEL QUÍMICO'}</h1>
                    </div>

                    {/* Palabra de Advertencia */}
                    <div className="text-center px-4">
                        <span className="text-gray-500 text-xs">Palabra de advertencia</span>
                        <div className={`text-3xl font-bold uppercase ${data.signalWord === 'PELIGRO' ? 'text-red-600' : 'text-orange-500'}`}>
                            {data.signalWord || 'PALABRA'}
                        </div>
                    </div>

                    {/* Códigos CAS/ONU */}
                    <div className="text-right text-xs space-y-1">
                        <div>CAS: {data.casNumber || 'N/A'}</div>
                        <div>ONU: {data.onuNumber || 'NO REGULADO'}</div>
                    </div>
                </div>

                {/* Cuerpo: Pictogramas y Textos de Riesgo */}
                <div className="flex gap-8 mb-8">
                    {/* Pictogramas */}
                    <div className="w-1/3 flex flex-col items-center gap-2">
                        {selectedPictogramIcons.length > 0 ? (
                            selectedPictogramIcons.slice(0, 3).map((icon, index) => (
                                <div key={index} className="w-28 h-28 border-4 border-red-600 rotate-45 flex items-center justify-center m-4">
                                    <span className="-rotate-45 font-bold text-6xl">{icon}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-400 italic">Sin pictogramas</div>
                        )}
                    </div>

                    {/* Frases H y P */}
                    <div className="w-2/3 space-y-4 text-sm">
                        <p className="whitespace-pre-line">{data.hazardStatements || 'Aquí aparecerán las indicaciones de peligro (Frases H)...'}</p>
                        <p className="whitespace-pre-line">{data.precautionaryStatements || 'Aquí aparecerán los consejos de prudencia (Frases P)...'}</p>
                    </div>
                </div>

                {/* Pie de página: Emergencia y Fabricante */}
                <div className="grid grid-cols-2 gap-8 text-xs border-t border-gray-200 pt-4 mt-auto">
                    <div>
                        <h4 className="font-bold uppercase mb-1">En caso de emergencia</h4>
                        <p className="text-xl font-bold whitespace-pre-line">{data.emergencyContact || 'Teléfono / Contacto'}</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase mb-1">Fabricante</h4>
                        <p className="font-medium">{data.manufacturerName || 'Nombre del Fabricante'}</p>
                        <p>{data.manufacturerAddress || 'Dirección complete'}</p>
                        <p>Tel: {data.manufacturerPhone || 'Teléfono'}</p>
                    </div>
                </div>

            </div>
        </div>
    );
});

export default EtiquetaGHS;