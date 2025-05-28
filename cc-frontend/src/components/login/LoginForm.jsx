import React, { useState } from 'react';
import '../../App.css'; // Importamos los estilos desde la raíz de src

// Recibimos 'onLoginSuccess' como una prop (aunque aún no la usemos para cambiar de vista)
function LoginForm({ onLoginSuccess }) {
  const [role, setRole] = useState('admin');
  const [documento, setDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    let url = '';
    let body = {};

    if (role === 'admin') {
      url = 'http://localhost:3001/api/login/admin';
      body = { numeroDocumento: documento };
    } else {
      url = 'http://localhost:3001/api/login/entrenador';
      body = { correo: correo, numeroDocumento: documento };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(`¡Bienvenido ${data.user.nombres}! Rol: ${data.role}`);
        // Si se pasó la función onLoginSuccess, la llamamos
        if (onLoginSuccess) {
            onLoginSuccess(data);
        }
      } else {
        setMessage(`Error: ${data.message || 'Credenciales incorrectas.'}`);
      }
    } catch (error) {
      setMessage('Error de conexión. ¿El backend está corriendo?');
    }
  };

  return (
    <div className="login-box">
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Administrador</option>
            <option value="entrenador">Entrenador</option>
          </select>
        </div>
        {role === 'entrenador' && (
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required={role === 'entrenador'}
            />
          </div>
        )}
        <div>
          <label>
            {role === 'admin' ? 'Contraseña:' : 'Contraseña:'}
          </label>
          <input
            type={role === 'admin' ? 'password' : 'password'}
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
}

export default LoginForm; // No olvides exportar!