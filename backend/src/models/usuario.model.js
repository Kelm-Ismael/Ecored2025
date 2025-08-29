import db from '../config/db.js';

export async function obtenerUsuarios() {
  const [rows] = await db.query(`SELECT * FROM usuario`); //consulta sql va entre las comillas
  return rows;
}

export async function insertarUsuario(usuario) {
  const { email, contrasenia_hash, id_tipo_usuario, id_referencia } = usuario;
  const [result] = await db.query(
    `INSERT INTO usuario (email, contrasenia_hash, id_tipo_usuario, id_referencia) VALUES (?, ?, ?, ?)`,
    [email, contrasenia_hash, id_tipo_usuario, id_referencia]
  );
  return result.insertId;
}

export async function editarUsuario(id, datos) {
  const { email, estado } = datos;
  await db.query(
    `UPDATE usuario SET email = ?, estado = ? WHERE id = ?`,
    [email, estado, id]
  );
}

export async function borrarUsuario(id) {
  await db.query(`DELETE FROM usuario WHERE id = ?`, [id]);
}