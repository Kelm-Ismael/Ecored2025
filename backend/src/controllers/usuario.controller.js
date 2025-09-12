import { obtenerUsuarios } from '../models/usuario.model.js';

// GET todos
export async function getUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    console.log('Usuarios obtenidos:', usuarios); // esto imprime los datos
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err); // imprime error completo
    res.status(500).json({ error: err.message }); // muestra mensaje real en JSON
  }
}


// POST nuevo (SIN PROBAR)
export async function crearUsuario(req, res) {
  try {
    const usuario = req.body;
    const nuevoId = await insertarUsuario(usuario);
    res.status(201).json({ id: nuevoId, mensaje: 'Usuario creado' });
  } catch (err) {
    console.error('Error al crear usuario:', err);
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