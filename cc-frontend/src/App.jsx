import React, { useState } from 'react';
import InicioPage from './pages/InicioPage'; // <-- Actualizamos la importación
import './App.css';

function App() {
  // En el futuro, aquí podrías tener un estado para saber si el usuario está logueado
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Y podrías mostrar InicioPage o el Dashboard según ese estado
  // {isLoggedIn ? <Dashboard /> : <InicioPage onLogin={() => setIsLoggedIn(true)} />}

  return (
    <div className="app-container">
      <InicioPage /> {/* Simplemente mostramos la página de inicio/login */}
    </div>
  );
}

export default App;