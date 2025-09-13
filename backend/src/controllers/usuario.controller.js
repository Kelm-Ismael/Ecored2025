import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken, verificarToken } from '../utils/jwt.js';
import db from '../config/db.js';
import { 
  obtenerUsuarios, 
  insertarUsuario, 
  buscarUsuarioPorEmail, 
  buscarUsuarioPorId, 
  editarUsuario, 
  borrarUsuario, 
  obtenerHashPorId, 
  actualizarFotoUrl, 
  sumarPuntosUsuario, 
  obtenerPerfilDetallado, 
  setSuperAdmin 
} from '../models/usuario.model.js';

// GET todos
export async function getUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


// POST nuevo (SIN PROBAR)
export async function crearUsuario(req, res) {
  try {
    let usuario = { email, contrasenia, id_tipo_usuario, id_referencia } = req.body;
    
    // TODO if superadmin habilitar creacion con tipo
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // verificar existencia
    const usuarioRegistrado = await buscarUsuarioPorEmail(email);
    if (usuarioRegistrado) 
      return res.status(409).json({ error: 'Email ya registrado' });
    
    // insertar nuevo usuario
    const nuevoId = await insertarUsuario(usuario);
    
    //generar token
    const token = firmarToken({id: nuevoId});

    // devolver token e id
    res.status(201).json({ 
      mensaje: 'Usuario creado',
      id_usuario: nuevoId,
      token,
      tipo_usuario: usuario.tipo_usuario
    });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email ya registrado' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// LOGIN
export async function loginUsuario(req, res) {
  try {
    const { email, contrasenia } = req.body;
    
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // verificar contrasenia con hash
    // const ok = await bcrypt.compare(contrasenia, usuario.contrasenia_hash);
    // if (!ok) {
    //   return res.status(401).json({ error: 'Credenciales inválidas' });
    // }

    const hashDb = usuario.contrasenia_hash;
    let ok = false;

    // Detectar si la contraseña en la DB ya está hasheada
    if (
      typeof hashDb === 'string' &&
      (hashDb.startsWith('$2a$') || hashDb.startsWith('$2b$') || hashDb.startsWith('$2y$'))
    ) {
      // Comparar usando bcrypt (modo producción)
      ok = await bcrypt.compare(contrasenia, hashDb);
    } else {
      // Comparación directa (modo testing - texto plano)
      ok = contrasenia === hashDb;
    }

    if (!ok) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = firmarToken({ id: usuario.id });
    
    res.json({ 
      token, 
      id_usuario: usuario.id,
      id_tipo_usuario: usuario.id_tipo_usuario,
      id_referencia: usuario.id_referencia
    });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    
    if (err.message === 'CONFIG_JWT_SECRET_MISSING') {
      return res.status(500).json({ error: 'Falta JWT_SECRET en .env' });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PERFIL
export async function perfilUsuario(req, res) {
  try {
    const usuario = await obtenerPerfilDetallado(req.usuario.id_usuario);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PUT editar (SIN PROBAR)
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

// DELETE eliminar (SIN PROBAR)
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