import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [parola, setParola] = useState('');
  const [limbaSelectata, setLimbaSelectata] = useState('ro');
  const [esteDeschis, setEsteDeschis] = useState(false);

  const limbi = [
    { cod: 'ro', nume: 'Română' },
    { cod: 'gb', nume: 'English' },
    { cod: 'fr', nume: 'Français' },
    { cod: 'es', nume: 'Español' },
    { cod: 'it', nume: 'Italiano' },
    { cod: 'de', nume: 'Deutsch' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && parola) {
      onLogin();
    } else {
      alert('Introduceți utilizatorul și parola!');
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/michele-bg.png')" }}
    >
      {/* Textul MICHELE de pe sertar */}
      <div 
        className="absolute text-white/75 font-bold text-[30px] tracking-[2px] z-0"
        style={{ right: '9.5%', bottom: '23%', transform: 'rotate(6.8deg)' }}
      >
        MICHELE
      </div>

      {/* Meniul de limbă și butonul User */}
      <div className="absolute top-[25px] right-[300px] flex gap-[10px] z-10">
        
        {/* Meniul de limbă */}
        <div className="relative w-[150px] h-[38px] bg-[#168df0] text-white border border-white/10 rounded-[7px] text-[14px] font-semibold cursor-pointer flex items-center px-[10px] gap-[7px]">
          <div 
            className="flex items-center gap-[7px] w-full"
            onClick={() => setEsteDeschis(!esteDeschis)}
          >
            <img src={`/flags/${limbaSelectata}.png`} alt="flag" className="w-[19px] h-[14px] rounded-[4px] object-cover" />
            <span className="flex-1">{limbi.find(l => l.cod === limbaSelectata)?.nume}</span>
            <span className="text-[10px] opacity-70">▾</span>
          </div>

          {esteDeschis && (
            <div className="absolute top-[42px] left-0 w-[150px] bg-white text-black rounded-[6px] overflow-hidden shadow-lg z-20">
              {limbi.map(l => (
                <div
                  key={l.cod}
                  className="flex items-center gap-[7px] h-[29px] px-[9px] text-[13px] font-semibold cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    setLimbaSelectata(l.cod);
                    setEsteDeschis(false);
                  }}
                >
                  <img src={`/flags/${l.cod}.png`} alt={l.nume} className="w-[18px] h-[13px] rounded-[4px] object-cover" />
                  {l.nume}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Butonul Utilizator - albastru */}
        <button className="w-[150px] h-[38px] bg-[#168df0] text-white border border-white/10 rounded-[7px] text-[14px] font-semibold flex items-center justify-center gap-[6px]">
          👤 Utilizator
        </button>
      </div>

      {/* Caseta de Login */}
      <div className="w-[520px] p-[45px] bg-[rgba(7,27,41,0.35)] rounded-[12px] transform translate-y-[90px] flex flex-col items-center">
        
        <div className="text-center mb-[20px] w-full">
          <img 
            src="/michele-logo.png" 
            alt="MICHELE AUTOMOTIVE" 
            className="block w-[650px] max-w-none h-auto"
            style={{ marginLeft: '50%', transform: 'translateX(-50%)' }}
          />
        </div>

        <h2 className="m-0 mb-[24px] text-white text-center text-[24px]">Autentificare</h2>

        <form onSubmit={handleLogin} className="w-full">
          <label className="block text-white mt-[12px] mb-[6px] text-[13px] font-bold">Utilizator / Email</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full box-border p-[12px] bg-[#1b2d3a] text-white border border-[#405565] rounded-[6px]"
            placeholder="Utilizator / Email"
          />

          <label className="block text-white mt-[12px] mb-[6px] text-[13px] font-bold">Parolă</label>
          <input 
            type="password" 
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            className="w-full box-border p-[12px] bg-[#1b2d3a] text-white border border-[#405565] rounded-[6px]"
            placeholder="Parolă"
          />

          <button 
            type="submit" 
            className="w-full mt-[20px] p-[13px] border-none rounded-[6px] bg-[#168df0] text-white text-[16px] font-bold cursor-pointer hover:bg-[#1278d0] transition-colors"
          >
            INTRĂ
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;