// Imports
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/secrets.js';

// Función para generar un token JWT
const generateToken = (userId, userRole) => {
  const payload = {
    id: userId,
    role: userRole,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};



// Controlador para Login de Administrador
export const loginAdmin = async (req, res) => {
  console.log('--- [CTRL] Petición recibida en loginAdmin ---');
  const { numeroDocumento } = req.body;
  console.log('--- [CTRL] Body:', req.body);

  if (!numeroDocumento) {
    return res.status(400).json({ message: 'Número de documento requerido.' });
  }

  try {
    const query = `
      SELECT id, nombres, apellidos
      FROM CC.Administrador
      WHERE numeroDocumento = $1 AND fechaFin > CURRENT_TIMESTAMP`;
    console.log('--- [CTRL] Ejecutando query Admin...');
    const result = await pool.query(query, [numeroDocumento]);

    if (result.rows.length > 0) {
        const admin = result.rows[0];
        // Generar token JWT
        const token = generateToken(admin.id, 'admin');
      console.log('--- [CTRL] Login Admin exitoso.');
        // Enviar respuesta con el token y los datos del administrador
      res.json({ success: true, user: admin, role: 'admin', token: token });
    } else {
      console.log('--- [CTRL] Login Admin fallido.');
      res.status(401).json({ success: false, message: 'Credenciales inválidas o administrador inactivo.' });
    }
  } catch (error) {
    console.error('--- [ERROR] Error en loginAdmin:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Controlador para Login de Entrenador
export const loginEntrenador = async (req, res) => {
  console.log('--- [CTRL] Petición recibida en loginEntrenador ---');
  const { correo, numeroDocumento } = req.body;
  console.log('--- [CTRL] Body:', req.body);

  if (!correo || !numeroDocumento) {
    return res.status(400).json({ message: 'Correo y número de documento requeridos.' });
  }

  try {
    const query = `
      SELECT id, nombres, apellidos
      FROM CC.Entrenador
      WHERE correo = $1 AND numeroDocumento = $2 AND fechaFin > CURRENT_TIMESTAMP`;
    console.log('--- [CTRL] Ejecutando query entrenador...');
    const result = await pool.query(query, [correo, numeroDocumento]);

    if (result.rows.length > 0) {
        const entrenador = result.rows[0];
        // Generar token JWT
        const token = generateToken(entrenador.id, 'entrenador');
        console.log('--- [CTRL] Login entrenador exitoso.');
        // Enviar respuesta con el token y los datos del entrenador
      res.json({ success: true, user: entrenador, role: 'entrenador', token: token });
    } else {
        console.log('--- [CTRL] Login entrenador fallido.');
      res.status(401).json({ success: false, message: 'Credenciales inválidas o entrenador inactivo.' });
    }
  } catch (error) {
    console.error('--- [ERROR] Error en loginEntrenador:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};