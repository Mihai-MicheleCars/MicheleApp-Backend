import React from 'react';

function Dashboard({ onBack, onDiagnoza }) {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/michele-bg.png')" }}
    >
      {/* Scrisul MICHELE de pe sertar */}
      <div 
        className="absolute text-white/75 font-bold text-[30px] tracking-[2px] z-0"
        style={{ right: '9.5%', bottom: '23%', transform: 'rotate(6.8deg)' }}
      >
        MICHELE
      </div>

      {/* Butonul BACK - acum albastru */}
      <button 
        onClick={onBack}
        className="absolute top-[25px] left-[25px] w-[150px] h-[38px] bg-[#168df0] hover:bg-[#1278d0] text-white text-[14px] font-bold rounded-[7px] z-10 transition-colors"
      >
        ← ÎNAPOI
      </button>

      {/* Container centrat pentru logo și butoane */}
      <div className="flex flex-col items-center w-full max-w-4xl z-10 translate-y-[90px]">
        
        {/* Logo */}
        <div className="text-center mb-12">
          <img 
            src="/michele-logo.png" 
            alt="MICHELE AUTOMOTIVE" 
            className="block w-[650px] max-w-none h-auto mx-auto"
          />
        </div>

        {/* Butoanele mari */}
        <div className="grid grid-cols-2 gap-[20px] w-full justify-items-center">
          <button 
            onClick={onDiagnoza}
            className="w-[420px] h-[85px] bg-[#168df0] hover:bg-[#1278d0] text-white text-[20px] font-bold rounded-[0] shadow-lg transition-colors"
          >
            DIAGNOZĂ
          </button>
          <button className="w-[420px] h-[85px] bg-[#168df0] hover:bg-[#1278d0] text-white text-[20px] font-bold rounded-[0] shadow-lg transition-colors">
            INFORMAȚII TEHNICE
          </button>
          <button className="col-span-2 w-[320px] h-[85px] bg-white hover:bg-gray-200 text-black text-[20px] font-bold rounded-[0] shadow-lg">
            ADMINISTRARE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;