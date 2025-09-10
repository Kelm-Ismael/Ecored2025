import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import {
  obtenerUsuarios,
  insertarUsuario,
  editarUsuario,
  borrarUsuario,
  buscarUsuarioPorEmail,
  obtenerHashPorId,
  actualizarPasswordUsuario,
  actualizarFotoUrl,
  obtenerPerfilDetallado, buscarUsuarioPorId,
} from '../models/usuario.model.js';

/* Util para JWT */
function firmarToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES || '7d';
  if (!secret) throw new Error('CONFIG_JWT_SECRET_MISSING');
  return jwt.sign(payload, secret, { expiresIn });
}

/* ============ PÚBLICAS ============ */

// POST /api/usuarios  (registro)
export async function crearUsuario(req, res) {
  try {
    let { email, contrasenia, id_tipo_usuario, id_referencia = null } = req.body;
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Normalizar id_tipo_usuario
    const ALLOW = new Set([1, 2, 3, 4, 5]); // 1: ciudadano, 2: comercio, 3: escuela, 4: recuperador, 5: Administrador
    id_tipo_usuario = Number(id_tipo_usuario);
    if (!ALLOW.has(id_tipo_usuario)) id_tipo_usuario = 1;

    // Política: permitir auto-registro como admin?
    // Si la tabla no existe o falla la consulta, asumimos 0 (no permitir).
    let allowAdminSignup = 1;
    try {
      const [rows] = await db.query(
        'SELECT allow_admin_self_signup FROM app_settings ORDER BY id DESC LIMIT 1'
      );
      allowAdminSignup = rows?.[0]?.allow_admin_self_signup ? 1 : 0;
    } catch (_) {
      allowAdminSignup = 1;
    }

    // Si pide admin (5) y NO está permitido el auto-registro,
    // sólo un super admin (cuando este endpoint se use autenticado) podría crear otro admin.
    const isPublicRequest = !req.user; // este endpoint es público por defecto
    const requesterIsSuper = !!req.user?.is_super_admin;

    if (id_tipo_usuario === 5 && !allowAdminSignup && !(requesterIsSuper && !isPublicRequest)) {
      return res.status(403).json({ error: 'Registro como administrador deshabilitado' });
    }

    const ya = await buscarUsuarioPorEmail(email);
    if (ya) return res.status(409).json({ error: 'Email ya registrado' });

    const nuevoId = await insertarUsuario({ email, contrasenia, id_tipo_usuario, id_referencia });
    const token = firmarToken({ id: nuevoId });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email ya registrado' });
    if (err.message === 'CONFIG_JWT_SECRET_MISSING') return res.status(500).json({ error: 'Falta JWT_SECRET en .env' });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// POST /api/usuarios/login
export async function loginUsuario(req, res) {
  try {
    const { email, contrasenia } = req.body;
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(contrasenia, usuario.contrasenia_hash);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = firmarToken({ id: usuario.id });
    res.json({ token });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    if (err.message === 'CONFIG_JWT_SECRET_MISSING') return res.status(500).json({ error: 'Falta JWT_SECRET en .env' });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/* ============ PROTEGIDAS ============ */

// GET /api/usuarios  (listado simple)
export async function getUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// GET /api/usuarios/me  (perfil detallado)
export async function getPerfil(req, res) {
  try {
    const usuario = await obtenerPerfilDetallado(req.user.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PUT /api/usuarios/:id  (actualizar campos básicos)
export async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const datos = req.body; // { email, estado } u otros
    await editarUsuario(id, datos);
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// DELETE /api/usuarios/:id
export async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;
    await borrarUsuario(id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PUT /api/usuarios/me/password  { actual, nueva }
export async function putCambiarPassword(req, res) {
  try {
    const { actual, nueva } = req.body;
    if (!actual || !nueva) return res.status(400).json({ error: 'Campos requeridos: actual, nueva' });
    if (String(nueva).length < 6) return res.status(400).json({ error: 'La contraseña nueva debe tener al menos 6 caracteres' });

    const hashActual = await obtenerHashPorId(req.user.id);
    if (!hashActual) return res.status(404).json({ error: 'Usuario no encontrado' });

    const ok = await bcrypt.compare(actual, hashActual);
    if (!ok) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

    const nuevoHash = await bcrypt.hash(nueva, 10);
    await actualizarPasswordUsuario(req.user.id, nuevoHash);

    res.json({ ok: true, mensaje: 'Contraseña actualizada' });
  } catch (err) {
    console.error('Error al cambiar contraseña:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PUT /api/usuarios/me/avatar  (FormData: avatar)
export async function putActualizarAvatar(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Archivo avatar requerido' });
    const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
    const fotoUrl = `${base}/uploads/avatars/${req.file.filename}`;
    await actualizarFotoUrl(req.user.id, fotoUrl);
    res.json({ foto_url: fotoUrl });
  } catch (err) {
    console.error('Error al actualizar avatar:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
export async function getUsuarioById(req, res) {
  try {
    const { id } = req.params;
    const u = await buscarUsuarioPorId(id);
    if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(u);
  } catch (err) {
    console.error('Error al obtener usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
