import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Diagnoza from './Diagnoza';
import './index.css';

function App() {
  const [paginaCurenta, setPaginaCurenta] = useState('login');

  return (
    <div>
      {paginaCurenta === 'login' && <Login onLogin={() => setPaginaCurenta('dashboard')} />}
      {paginaCurenta === 'dashboard' && (
        <Dashboard 
          onBack={() => setPaginaCurenta('login')} 
          onDiagnoza={() => setPaginaCurenta('diagnoza')} 
        />
      )}
      {paginaCurenta === 'diagnoza' && <Diagnoza onBack={() => setPaginaCurenta('dashboard')} />}
    </div>
  );
}

export default App;