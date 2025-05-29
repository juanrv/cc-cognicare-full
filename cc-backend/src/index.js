import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; 
import entrenadorRoutes from './routes/entrenador.routes.js'; 

const app = express();
const port = 3001;

// Configuración CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba 
app.get('/test', (req, res) => {
  console.log('--- [LOG] ¡¡¡Petición recibida en /test !!! ---');
  res.status(200).send('¡El backend (reestructurado) está respondiendo!');
});

// Montamos las rutas de autenticación bajo el prefijo /api
app.use('/api', authRoutes); 
app.use('/api', entrenadorRoutes);

// Middleware para manejar 404 (si ninguna ruta coincide)
app.use((req, res) => {
    console.log(`--- [404] Ruta no encontrada: ${req.method} ${req.path}`);
    res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.path}` });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});