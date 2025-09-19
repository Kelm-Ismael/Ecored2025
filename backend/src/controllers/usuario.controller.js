// src/controllers/usuario.controller.js
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { firmarToken } from '../utils/jwt.js';

import {
  obtenerUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuariosPorQuery,
  editarUsuario,
  borrarUsuario,
  obtenerPerfilDetallado,
  insertarUsuarioCiudadano,   // ✅ único flujo de inserción usado
  obtenerHashPorId,
  actualizarPasswordUsuario,
  actualizarFotoUrl,
  buscarUsuarioPorId,
} from '../models/usuario.model.js';

import {
  buscarPersonaPorRefUsuario,
  buscarPersonaPorDni,
  insertarPersona,
} from '../models/persona.model.js';

/* ============ PÚBLICAS ============ */

// POST /api/usuarios  (registro simple con tipo)
export async function crearUsuario(req, res) {
  try {
    let { email, contrasenia, id_tipo_usuario = 1, id_referencia = null } = req.body;
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const ALLOW = new Set([1, 2, 3, 4, 5]);
    id_tipo_usuario = Number(id_tipo_usuario);
    if (!ALLOW.has(id_tipo_usuario)) id_tipo_usuario = 1;

    // Política de signup admin
    let allowAdminSignup = 0;
    try {
      const [rows] = await db.query(
        'SELECT allow_admin_self_signup FROM app_settings ORDER BY id DESC LIMIT 1'
      );
      allowAdminSignup = rows?.[0]?.allow_admin_self_signup ? 1 : 0;
    } catch {
      allowAdminSignup = 0;
    }

    const isPublicRequest = !req.user;
    const requesterIsSuper = !!req.user?.is_super_admin;
    if (id_tipo_usuario === 5 && !allowAdminSignup && !(requesterIsSuper && !isPublicRequest)) {
      return res.status(403).json({ error: 'Registro como administrador deshabilitado' });
    }

    const ya = await buscarUsuarioPorEmail(email);
    if (ya) return res.status(409).json({ error: 'Email ya registrado' });

    // ✅ usar sólo la función que existe en tu modelo
    const nuevoId = await insertarUsuarioCiudadano({
      email,
      contrasenia,
      id_referencia,
    });

    const token = firmarToken({ id: nuevoId });
    res.status(201).json({ token, id_usuario: nuevoId });
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

    const hashDb = usuario.contrasenia_hash;
    const isBcrypt = typeof hashDb === 'string' && (/^\$2[aby]\$/.test(hashDb));
    const ok = isBcrypt ? await bcrypt.compare(contrasenia, hashDb) : (contrasenia === hashDb);

    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = firmarToken({ id: usuario.id });
    res.json({
      token,
      id_usuario: usuario.id,
      id_tipo_usuario: usuario.id_tipo_usuario,
      id_referencia: usuario.id_referencia,
    });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    if (err.message === 'CONFIG_JWT_SECRET_MISSING') {
      return res.status(500).json({ error: 'Falta JWT_SECRET en .env' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/* ============ PROTEGIDAS ============ */

export async function getUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function perfilUsuario(req, res) {
  try {
    const usuario = await obtenerPerfilDetallado(req.user.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    let datosReferencia = {};
    switch (usuario.id_tipo_usuario) {
      case 1:
      case 2:
      case 3:
      case 4:
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia);
        break;
      case 5:
        // datos específicos si aplica
        break;
      default:
        console.warn('Tipo de usuario no manejado:', usuario.id_tipo_usuario);
    }

    res.json({ ...usuario, referencia: datosReferencia });
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function buscarUsuario(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });

  try {
    const resultados = await buscarUsuariosPorQuery(q);
    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const datos = req.body;
    await editarUsuario(id, datos);
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

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
