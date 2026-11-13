import React, { useState, useEffect } from 'react';

function Diagnoza({ onBack }) {
  const [vehicul, setVehicul] = useState({
    marca: '', model: '', an: '', motor: '', codMotor: '', putere: '', carburant: '', vin: '', sistem: ''
  });
  const [simptome, setSimptome] = useState('');
  const [dtc, setDtc] = useState('');
  const [liveData, setLiveData] = useState('');
  const [autodata, setAutodata] = useState('');
  const [verificari, setVerificari] = useState('');
  const [diagnosticFinal, setDiagnosticFinal] = useState('');
  const [reparatie, setReparatie] = useState('');
  const [verificareDupa, setVerificareDupa] = useState('');
  const [rezultatFinal, setRezultatFinal] = useState('');
  const [imagini, setImagini] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [numeFisierImagini, setNumeFisierImagini] = useState('Niciun fișier selectat');
  const [numeFisierDocumentatie, setNumeFisierDocumentatie] = useState('Niciun fișier selectat');

  const handleChange = (e) => {
    setVehicul({ ...vehicul, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImagini([...imagini, ...newImages]);
    if (files.length > 0) {
      setNumeFisierImagini(files.map(f => f.name).join(', '));
    } else {
      setNumeFisierImagini('Niciun fișier selectat');
    }
  };

  const handleDocumentatieUpload = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(f => f.type === 'application/pdf');
    const imageFiles = files.filter(f => f.type.startsWith('image/'));

    if (pdfFiles.length > 0) {
      const newPdfs = pdfFiles.map(file => URL.createObjectURL(file));
      setPdfs([...pdfs, ...newPdfs]);
    }
    if (imageFiles.length > 0) {
      const newImages = imageFiles.map(file => URL.createObjectURL(file));
      setImagini([...imagini, ...newImages]);
    }

    if (files.length > 0) {
      setNumeFisierDocumentatie(files.map(f => f.name).join(', '));
    } else {
      setNumeFisierDocumentatie('Niciun fișier selectat');
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const newImage = URL.createObjectURL(blob);
        setImagini(prev => [...prev, newImage]);
        setNumeFisierImagini(prev => prev === 'Niciun fișier selectat' ? 'Imagine lipită' : prev + ', Imagine lipită');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const deschideFisier = (url) => {
    window.open(url, '_blank');
  };

  const stergeImagine = (idx) => {
    setImagini(imagini.filter((_, i) => i !== idx));
    setNumeFisierImagini('Niciun fișier selectat');
  };

  const stergePdf = (idx) => {
    setPdfs(pdfs.filter((_, i) => i !== idx));
    setNumeFisierDocumentatie('Niciun fișier selectat');
  };

  const cazActiv = vehicul.marca.trim() !== '' && vehicul.model.trim() !== '';

  return (
    <div className="min-h-screen bg-[#f1f4f8]">
      
      {/* Header albastru pe toată lățimea */}
      <div className="w-full bg-[#164a8a] text-white p-4 mb-6">
        <div className="w-full flex justify-between items-center px-4">
          <div>
            <h1 className="text-3xl font-bold">🔧 MICHELE Automotive Diagnostic AI</h1>
            <p className="text-base opacity-90">Asistent AI pentru diagnoză auto</p>
          </div>
          <button onClick={onBack} className="bg-white text-[#164a8a] px-6 py-2 rounded font-bold hover:bg-gray-200 text-lg">
            ACASĂ
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pb-8">
        
        {/* Bara Caz Activ Nou - apare doar după ce marca și modelul sunt completate */}
        {cazActiv && (
          <div className="sticky top-0 z-20 bg-white p-3 rounded-lg mb-4 font-bold text-gray-700 border-2 border-gray-400 shadow-md">
            CAZ ACTIV NOU
          </div>
        )}

        {/* Identificare Vehicul */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">🚗 Identificare vehicul</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block font-bold mb-1">Marcă</label><input name="marca" value={vehicul.marca} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: Opel" /></div>
            <div><label className="block font-bold mb-1">Model</label><input name="model" value={vehicul.model} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: Astra G" /></div>
            <div><label className="block font-bold mb-1">An</label><input name="an" value={vehicul.an} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: 2002" /></div>
            <div><label className="block font-bold mb-1">Motor</label><input name="motor" value={vehicul.motor} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: 2.0 DTI" /></div>
            <div><label className="block font-bold mb-1">Cod motor</label><input name="codMotor" value={vehicul.codMotor} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: AUY" /></div>
            <div><label className="block font-bold mb-1">Putere (kW)</label><input name="putere" type="number" value={vehicul.putere} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: 74" /></div>
            <div><label className="block font-bold mb-1">Carburant</label>
              <select name="carburant" value={vehicul.carburant} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Selectează carburantul</option>
                <option value="Motorină">Motorină</option>
                <option value="Benzină">Benzină</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Full electric">Full electric</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="block font-bold mb-1">VIN</label><input name="vin" value={vehicul.vin} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: W0L0AHL..." /></div>
            <div className="md:col-span-2"><label className="block font-bold mb-1">Sistem / componentă</label><input name="sistem" value={vehicul.sistem} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-500" placeholder="Ex: Airbag, ABS, motor, ECU..." /></div>
          </div>
        </div>

        {/* Simptome */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">📝 Simptome / reclamația clientului</h2>
          <textarea value={simptome} onChange={(e) => setSimptome(e.target.value)} className="w-full p-2 border rounded h-24 placeholder-gray-500" placeholder="Descrie exact problema. Exemplu: motorul pornește greu la rece..." />
        </div>

        {/* DTC */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">⚠️ Coduri de eroare (DTC)</h2>
          <textarea value={dtc} onChange={(e) => setDtc(e.target.value)} className="w-full p-2 border rounded h-24 placeholder-gray-500" placeholder="Introdu codurile DTC și descrierea lor." />
        </div>

        {/* Live Data */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">📊 Live Data / măsurători</h2>
          <textarea value={liveData} onChange={(e) => setLiveData(e.target.value)} className="w-full p-2 border rounded h-24 placeholder-gray-500" placeholder="Introdu valorile măsurate / Live Data." />
        </div>

        {/* Autodata */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">📚 Date din Autodata</h2>
          <textarea value={autodata} onChange={(e) => setAutodata(e.target.value)} className="w-full p-2 border rounded h-24 placeholder-gray-500" placeholder="Aici vor fi introduse / extrase datele tehnice din Autodata..." />
        </div>

        {/* Rezolvarea cazului */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">🔧 Rezolvarea cazului</h2>
          <label className="block font-bold mb-1">🔎 Verificări și intervenții efectuate</label>
          <textarea value={verificari} onChange={(e) => setVerificari(e.target.value)} className="w-full p-2 border rounded h-24 mb-3 placeholder-gray-500" placeholder="Ex: test efectuat, măsurători, componente verificate..." />
          
          <label className="block font-bold mb-1">🔧 Diagnostic final</label>
          <textarea value={diagnosticFinal} onChange={(e) => setDiagnosticFinal(e.target.value)} className="w-full p-2 border rounded h-24 mb-3 placeholder-gray-500" placeholder="Care a fost cauza confirmată?" />
          
          <label className="block font-bold mb-1">🛠️ Reparație efectuată</label>
          <textarea value={reparatie} onChange={(e) => setReparatie(e.target.value)} className="w-full p-2 border rounded h-24 mb-3 placeholder-gray-500" placeholder="Ce s-a reparat sau înlocuit?" />
          
          <label className="block font-bold mb-1">📊 Verificare după reparație</label>
          <textarea value={verificareDupa} onChange={(e) => setVerificareDupa(e.target.value)} className="w-full p-2 border rounded h-24 mb-3 placeholder-gray-500" placeholder="Ce valori sau teste au confirmat remedierea?" />
          
          <label className="block font-bold mb-1">✅ Rezultat final</label>
          <textarea value={rezultatFinal} onChange={(e) => setRezultatFinal(e.target.value)} className="w-full p-2 border rounded h-24 placeholder-gray-500" placeholder="Care este rezultatul după reparație?" />
        </div>

        {/* Imagini */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">📷 Imagini / osciloscop / tester</h2>
          
          {/* Caseta 1: Imagini cu paste */}
          <div className="border-2 border-dashed border-gray-300 p-6 rounded text-center mb-4">
            <p className="text-sm text-gray-600 font-medium mb-3">Poți adăuga capturi de ecran, imagini de osciloscop, fotografii ale componentelor sau capturi din tester.</p>
            <div className="flex justify-start items-center gap-3">
              <label className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer text-sm font-medium">
                Selectează fișiere
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <span className="text-sm text-gray-500">{numeFisierImagini}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Poți lipi o imagine din clipboard cu Ctrl+V.</p>
          </div>

          {/* Caseta 2: Documentație importată */}
          <div className="border border-gray-300 p-4 rounded mb-4">
            <p className="text-sm font-bold text-gray-700 mb-1">Documentație importată</p>
            <p className="text-xs text-gray-600 mb-2">Win+Shift+S → Ctrl+V = imagine | Ctrl+A → Ctrl+C → Ctrl+V = text + imagine | PDF = selectare fișier</p>
            <div className="flex justify-start items-center gap-3 mb-2">
              <label className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer text-sm font-medium">
                Selectează fișiere
                <input type="file" multiple accept="image/*,application/pdf" onChange={handleDocumentatieUpload} className="hidden" />
              </label>
              <span className="text-sm text-gray-500">{numeFisierDocumentatie}</span>
            </div>
            <p className="text-xs text-gray-500">Niciun PDF/text importat.</p>
          </div>

          {/* Previzualizare imagini cu buton "Șterge" */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {imagini.map((img, idx) => (
              <div key={idx} className="border rounded p-1 flex flex-col items-center relative">
                <img src={img} alt={`Imagine ${idx}`} className="w-full h-24 object-cover rounded mb-1" />
                <button onClick={() => stergeImagine(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">X</button>
                <button onClick={() => deschideFisier(img)} className="text-xs text-blue-600 hover:underline">Vezi</button>
              </div>
            ))}
          </div>

          {/* Previzualizare PDF-uri cu buton "Șterge" */}
          {pdfs.length > 0 && (
            <div className="space-y-2">
              {pdfs.map((pdf, idx) => (
                <div key={idx} className="border rounded p-2 flex justify-between items-center">
                  <p className="text-sm font-bold">PDF {idx + 1}</p>
                  <div className="flex gap-2">
                    <button onClick={() => deschideFisier(pdf)} className="text-sm text-blue-600 hover:underline">Deschide</button>
                    <button onClick={() => stergePdf(idx)} className="text-sm text-red-600 hover:underline">Șterge</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Butoane */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-[#164a8a] text-white px-6 py-3 rounded font-bold hover:bg-[#123d73]">🔍 ANALIZEAZĂ CU AI</button>
          <button className="bg-[#164a8a] text-white px-6 py-3 rounded font-bold hover:bg-[#123d73]">💾 SALVEAZĂ CAZUL</button>
          <button className="bg-[#164a8a] text-white px-6 py-3 rounded font-bold hover:bg-[#123d73]">📚 BIBLIOTECA CAZURILOR</button>
        </div>

        {/* Rezultat AI */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold text-[#164a8a] mb-4">🤖 Rezultatul analizei AI</h2>
          <div className="bg-gray-50 p-4 rounded border min-h-[200px] text-lg font-bold text-gray-800">
            Completează datele de diagnoză și apasă ANALIZEAZĂ CU AI.
          </div>
        </div>

      </div>
    </div>
  );
}

export default Diagnoza;