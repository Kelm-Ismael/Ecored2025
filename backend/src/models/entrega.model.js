import db from '../config/db.js';
import { sumarPuntosUsuario } from '../models/usuario.model.js'

export async function obtenerEntregas() {
    const [rows] = await db.query(`
        SELECT 
           e.id,
           e.id_locacion,
           tl.tipo_locacion,
           e.fecha_hora,
           e.id_usuario,
           e.id_receptor
        FROM entrega e
        LEFT JOIN tipo_locacion tl ON e.id_tipo_locacion = tl.id
    `);
    return rows;
}

export async function insertarEntrega(conn, fecha, id_usuario, id_receptor, id_locacion, id_tipo_locacion) {
    const [result] = await conn.query(
        `INSERT INTO entrega 
            (id_locacion, id_tipo_locacion, fecha_hora, id_usuario, id_receptor)
            VALUES (?, ?, ?, ?, ?)`,
        [id_locacion, id_tipo_locacion, fecha, id_usuario, id_receptor]
    );
    return result.insertId;
}

export async function insertarDetalleEntrega(conn, id_entrega, tipo, cantidad, puntos) {
  const [result] = await conn.query(
    `INSERT INTO detalle_entrega 
        (id_entrega, tipo, cantidad, puntos)
        VALUES (?, ?, ?, ?)`,
    [id_entrega, tipo, cantidad, puntos]
  );
  return result.insertId;
}

// verif para redireccion de webQR a webMain
export async function obtenerEntregaPorFechaYUsuarios(fecha, id_usuario, id_receptor) {
    const [rows] = await db.query(
        `SELECT id 
        FROM entrega 
        WHERE fecha_hora = ? AND id_usuario = ? AND id_receptor = ?`,
        [fecha, id_usuario, id_receptor]
    );
    return rows[0];
}
