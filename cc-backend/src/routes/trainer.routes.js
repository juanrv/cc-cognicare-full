import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/verifyRoles.js';
// Importaríamos los controladores de entrenadores cuando existan
// import { createTrainer, getTrainers } from '../controllers/trainer.controller.js';

const router = Router();

// Ejemplo: Para obtener la lista de entrenadores, necesitas estar logueado (cualquier rol)
// router.get('/entrenadores', verifyToken, getTrainers);

// Ejemplo: Para crear un entrenador, necesitas estar logueado Y SER ADMIN
// router.post('/entrenadores', verifyToken, isAdmin, createTrainer);

// Por ahora, una ruta de prueba protegida:
router.get('/entrenadores/profile', verifyToken, (req, res) => {
    // Gracias a verifyToken, aquí tenemos req.user
    res.json({ message: `Bienvenido a tu perfil (protegido), ID: ${req.user.id}, Rol: ${req.user.role}` });
});

// Y una ruta de prueba solo para admins:
router.get('/entrenadores/admin-only', verifyToken, isAdmin, (req, res) => {
    res.json({ message: `¡Hola Admin! ID: ${req.user.id}. Estás viendo contenido solo para admins.` });
});


export default router;