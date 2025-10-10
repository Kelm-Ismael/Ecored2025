import db from '../config/db.js';

export async function obtenerTiposInstitucion() {
  const [rows] = await db.query(`SELECT * FROM tipo_institucion`);
  return rows;
}

export async function insertarInstitucion(conn, institucion) {
  const { nombre, id_tipo_institucion, cuit_cuil } = institucion;
  const [result] = await conn.query(
    `INSERT INTO institucion 
        (nombre, id_tipo_institucion, cuit_cuil) 
      VALUES (?, ?, ?)`,
    [nombre, id_tipo_institucion, cuit_cuil]
  );
  return result.insertId;
}

export async function buscarInstitucionPorCuitCuil(conn, cuit_cuil) {
  const [rows] = await conn.query(
    `SELECT * FROM institucion WHERE cuit_cuil = ?`,
    [cuit_cuil]
  );
  return rows[0] || null;
}