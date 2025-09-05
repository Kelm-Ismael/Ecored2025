// import { obtenerUsuarios } from '../models/usuario.model.js';

// // GET todos
// export async function getUsuarios(req, res) {
//   try {
//     const usuarios = await obtenerUsuarios();
//     res.json(usuarios);
//   } catch (err) {
//     console.error('Error al obtener usuarios:', err);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }


// // POST nuevo (SIN PROBAR)
// export async function crearUsuario(req, res) {
//   try {
//     const usuario = req.body;
//     const nuevoId = await insertarUsuario(usuario);
//     res.status(201).json({ id: nuevoId, mensaje: 'Usuario creado' });
//   } catch (err) {
//     console.error('Error al crear usuario:', err);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }

// // PUT editar (SIN PROBAR)
// export async function actualizarUsuario(req, res) {
//   try {
//     const { id } = req.params;
//     const datos = req.body;
//     await editarUsuario(id, datos);
//     res.json({ mensaje: 'Usuario actualizado' });
//   } catch (err) {
//     console.error('Error al actualizar usuario:', err);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }

// // DELETE eliminar (SIN PROBAR)
// export async function eliminarUsuario(req, res) {
//   try {
//     const { id } = req.params;
//     await borrarUsuario(id);
//     res.json({ mensaje: 'Usuario eliminado' });
//   } catch (err) {
//     console.error('Error al eliminar usuario:', err);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  obtenerUsuarios,
  insertarUsuario,
  editarUsuario,
  borrarUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId
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

// POST registro
export async function crearUsuario(req, res) {
  try {
    const { email, contrasenia } = req.body;
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const nuevoId = await insertarUsuario({ email, contrasenia });

    // Generar token JWT
    const token = jwt.sign({ id: nuevoId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// POST login
export async function loginUsuario(req, res) {
  try {
    const { email, contrasenia } = req.body;
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(contrasenia, usuario.contrasenia_hash);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.json({ token });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// GET perfil del usuario autenticado
export async function getPerfil(req, res) {
  try {
    const usuario = await buscarUsuarioPorId(req.user.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PUT editar
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

// DELETE eliminar
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
