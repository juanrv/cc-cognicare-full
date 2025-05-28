import React, { useState, useEffect } from 'react';
import LoginForm from '../components/login/LoginForm'; // <-- Importamos LoginForm
import '../App.css'; // <-- Importamos los estilos

const backgroundImages = [
  '/assets/Biblioteca.webp',
  '/assets/Comidas.webp',
  '/assets/Entrada.webp',
  '/assets/Grupo.webp',
  '/assets/Laboratorio.webp'
];

function InicioPage() { // Renombramos a InicioPage
  const [view, setView] = useState('start');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleStartClick = () => {
    setView('login');
  };

  // Esta función se la podríamos pasar a LoginForm para que nos avise
  const handleSuccessfulLogin = (loginData) => {
      console.log("¡Login exitoso desde InicioPage!", loginData);
      // Aquí, en el futuro, cambiaríamos la vista a un Dashboard, por ejemplo.
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
  };

  return (
    <div className="App" style={backgroundStyle}>
      <div className="overlay">
        {view === 'start' && (
          <div className="start-screen">
            <h1>Bienvenido a CC</h1>
            <p>Tu plataforma de entrenamiento cognitivo.</p>
            <button className="start-button" onClick={handleStartClick}>
              Iniciar
            </button>
          </div>
        )}

        {/* Usamos LoginForm e incluimos la prop onLoginSuccess */}
        {view === 'login' && <LoginForm onLoginSuccess={handleSuccessfulLogin} />}
      </div>
    </div>
  );
}

export default InicioPage; // Exportamos InicioPage