import * as AuthService from '../services/auth.service.js'; // Importamos nuestro servicio

export const loginAdmin = async (req, res) => {
  console.log('--- [CTRL] Petición recibida en loginAdmin ---');
  const { numeroDocumento } = req.body;
  console.log('--- [CTRL] Body:', req.body);

  // La validación básica de entrada puede permanecer en el controlador
  if (!numeroDocumento) {
    console.log('--- [CTRL] Error 400: Número de documento no proporcionado.');
    return res.status(400).json({ message: 'Número de documento requerido.' });
  }

  try {
    // Llamamos al servicio para realizar la autenticación
    const authResult = await AuthService.autenticarAdmin(numeroDocumento);

    if (authResult.success) {
      console.log('--- [CTRL] Login Admin exitoso (vía servicio).');
      res.json(authResult); // Enviamos el resultado completo del servicio
    } else {
      console.log('--- [CTRL] Login Admin fallido (vía servicio).');
      // El servicio ya nos da un mensaje, así que lo usamos
      res.status(401).json({ success: false, message: authResult.message });
    }
  } catch (error) {
    // Este catch ahora también podría capturar errores lanzados desde el servicio
    console.error('--- [ERROR_CTRL] Error en loginAdmin:', error.message);
    res.status(500).json({ message: error.message || 'Error interno del servidor.' });
  }
};

export const loginEntrenador = async (req, res) => {
  console.log('--- [CTRL] Petición recibida en loginTrainer ---');
  const { correo, numeroDocumento } = req.body;
  console.log('--- [CTRL] Body:', req.body);

  if (!correo || !numeroDocumento) {
    console.log('--- [CTRL] Error 400: Correo o número de documento no proporcionado.');
    return res.status(400).json({ message: 'Correo y número de documento requeridos.' });
  }

  try {
    const authResult = await AuthService.autenticarEntrenador(correo, numeroDocumento);

    if (authResult.success) {
      console.log('--- [CTRL] Login Entrenador exitoso (vía servicio).');
      res.json(authResult);
    } else {
      console.log('--- [CTRL] Login Entrenador fallido (vía servicio).');
      res.status(401).json({ success: false, message: authResult.message });
    }
  } catch (error) {
    console.error('--- [ERROR_CTRL] Error en loginTrainer:', error.message);
    res.status(500).json({ message: error.message || 'Error interno del servidor.' });
  }
};