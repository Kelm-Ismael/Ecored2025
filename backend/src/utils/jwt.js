import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

/**
 * Genera un token JWT para el payload dado.
 * @param {Object} payload - Datos que querés incluir en el token.
 * @returns {string} - Token firmado.
 */
export function firmarToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

/**
 * Middleware para verificar el token JWT.
 * Agrega el id_usuario al objeto `req`.
 */
export function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.usuario = {
      id_usuario: payload.id
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}