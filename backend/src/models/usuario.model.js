// import db from '../config/db.js';

// export async function obtenerUsuarios() {
//   const [rows] = await db.query(`SELECT * FROM usuario`); //consulta sql va entre las comillas
//   return rows;
// }

// export async function insertarUsuario(usuario) {
//   const { email, contrasenia_hash, id_tipo_usuario, id_referencia } = usuario;
//   const [result] = await db.query(
//     `INSERT INTO usuario (email, contrasenia_hash, id_tipo_usuario, id_referencia) VALUES (?, ?, ?, ?)`,
//     [email, contrasenia_hash, id_tipo_usuario, id_referencia]
//   );
//   return result.insertId;
// }

// export async function editarUsuario(id, datos) {
//   const { email, estado } = datos;
//   await db.query(
//     `UPDATE usuario SET email = ?, estado = ? WHERE id = ?`,
//     [email, estado, id]
//   );
// }

// export async function borrarUsuario(id) {
//   await db.query(`DELETE FROM usuario WHERE id = ?`, [id]);
// }


import db from '../config/db.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios (no recomendado devolver contraseñas)
export async function obtenerUsuarios() {
  const [rows] = await db.query(`SELECT id, email, id_tipo_usuario, id_referencia, estado FROM usuario`);
  return rows;
}

// Insertar usuario con contraseña hasheada
export async function insertarUsuario({ email, contrasenia, id_tipo_usuario = 1, id_referencia = null }) {
  const hash = await bcrypt.hash(contrasenia, 10);

  const [result] = await db.query(
    `INSERT INTO usuario (email, contrasenia_hash, id_tipo_usuario, id_referencia) VALUES (?, ?, ?, ?)`,
    [email, hash, id_tipo_usuario, id_referencia]
  );

  return result.insertId;
}

// Buscar usuario por email
export async function buscarUsuarioPorEmail(email) {
  const [rows] = await db.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
  return rows[0];
}

// Buscar usuario por ID
export async function buscarUsuarioPorId(id) {
  const [rows] = await db.query(`SELECT id, email, id_tipo_usuario, id_referencia, estado FROM usuario WHERE id = ?`, [id]);
  return rows[0];
}

// Editar usuario
export async function editarUsuario(id, datos) {
  const { email, estado } = datos;
  await db.query(
    `UPDATE usuario SET email = ?, estado = ? WHERE id = ?`,
    [email, estado, id]
  );
}

// Eliminar usuario
export async function borrarUsuario(id) {
  await db.query(`DELETE FROM usuario WHERE id = ?`, [id]);
}
