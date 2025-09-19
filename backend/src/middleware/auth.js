// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { buscarUsuarioPorId } from '../models/usuario.model.js';

export async function verificarToken(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: 'JWT no configurado' });

    const payload = jwt.verify(token, secret);
    if (!payload?.id) return res.status(401).json({ error: 'Token inválido' });

    const u = await buscarUsuarioPorId(payload.id);
    if (!u) return res.status(401).json({ error: 'Usuario no encontrado' });

    req.user = {
      id: u.id,
      id_tipo_usuario: Number(u.id_tipo_usuario) || 1,
      estado: u.estado,
      is_super_admin: false,
    };

    next();
  } catch (err) {
    console.error('verificarToken error:', err.message);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
