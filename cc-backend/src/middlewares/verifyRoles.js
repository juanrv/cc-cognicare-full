// Middleware para verificar si es Admin
export const isAdmin = (req, res, next) => {
    // Importante: Asumimos que 'verifyToken' ya se ejecutó
    // y que 'req.user' existe.
    if (req.user && req.user.role === 'admin') {
        next(); // Es admin, continuar
    } else {
        console.log(`--- [ROLE_MW] Acceso denegado. Se requiere rol Admin. Usuario:`, req.user);
        res.status(403).json({ message: 'Acceso denegado: Se requiere rol de Administrador.' });
    }
}

// Middleware para verificar si es Entrenador
export const isEntrenador = (req, res, next) => {
    // Importante: Asumimos que 'verifyToken' ya se ejecutó
    // y que 'req.user' existe.
    if (req.user && req.user.role === 'entrenador') {
        next(); // Es entrenador, continuar
    } else {
        console.log(`--- [ROLE_MW] Acceso denegado. Se requiere rol Entrenador. Usuario:`, req.user);
        res.status(403).json({ message: 'Acceso denegado: Se requiere rol de Entrenador.' });
    }
}

