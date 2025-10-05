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

export async function ultimasEntregasPorUsuarioID(id_usuario) {
    const [rows] = await db.query(
        `SELECT 
            e.id,
            e.id_locacion,
            ep.nombre as 'nombre_locacion',
            e.id_tipo_locacion,
            tl.tipo_locacion,
            e.fecha_hora,
            e.id_usuario,
            CONCAT(p.nombre, ' ', p.apellido) as 'nombre_usuario',
            e.id_receptor,
            CONCAT(pr.nombre, ' ', pr.apellido) as 'nombre_receptor'
        FROM entrega e 
        LEFT JOIN ecopunto ep ON e.id_locacion = ep.id
        LEFT JOIN tipo_locacion tl ON e.id_tipo_locacion = tl.id
        LEFT JOIN usuario u ON e.id_usuario = u.id
        LEFT JOIN persona p ON u.id_referencia = p.id
        LEFT JOIN usuario r ON e.id_receptor = r.id
        LEFT JOIN persona pr ON r.id_referencia = pr.id
        WHERE e.id_usuario = ?
        ORDER BY e.fecha_hora DESC
        LIMIT 5`,
        [id_usuario]
    );
    return rows;
}

export async function ultimasEntregasPorLocacionID(id_locacion) {
    const [rows] = await db.query(
        `SELECT e.id,
            e.id_locacion,
            ep.nombre as 'nombre_locacion',
            e.id_tipo_locacion,
            tl.tipo_locacion,
            e.fecha_hora,
            e.id_usuario,
            CONCAT(p.nombre, ' ', p.apellido) as 'nombre_usuario',
            e.id_receptor,
            CONCAT(pr.nombre, ' ', pr.apellido) as 'nombre_receptor'
        FROM entrega e 
        LEFT JOIN ecopunto ep ON e.id_locacion = ep.id
        LEFT JOIN tipo_locacion tl ON e.id_tipo_locacion = tl.id
        LEFT JOIN usuario u ON e.id_usuario = u.id
        LEFT JOIN persona p ON u.id_referencia = p.id
        LEFT JOIN usuario r ON e.id_receptor = r.id
        LEFT JOIN persona pr ON r.id_referencia = pr.id
        WHERE e.id_locacion = ?
        ORDER BY e.fecha_hora DESC`,
        [id_locacion]
    );
    return rows;
}

export async function detallePorIdEntrega(id_entrega) {
    const[rows] = await db.query(
        `SELECT 
            de.id,
            tr.nombre,
            de.cantidad,
            tr.unidad,
            de.puntos
        FROM detalle_entrega de 
        LEFT JOIN tipo_residuo tr ON de.tipo = tr.id
        WHERE de.id_entrega = ?`,
        [id_entrega]
    );
    return rows;
}