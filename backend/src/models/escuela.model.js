import db from '../config/db.js';

export async function obtenerEscuelas() {
  const [rows] = await db.query(`
    SELECT 
        e.id,
        e.nombre,
        e.cuit_cuil,
        u.puntos_acumulados
    FROM institucion e 
    JOIN usuario u 
    ON e.id = u.id_referencia AND u.id_tipo_usuario = 5
    WHERE e.id_tipo_institucion = 1 
    `);
  return rows;
}

export async function obtenerSolicitudesPorEscuela(id_escuela, estado) {
  const [rows] = await db.query(`
    SELECT 
        s.id,
        s.id_usuario,
        CONCAT(p.nombre, ' ', p.apellido) AS nombre_usuario,
        s.id_institucion,
        i.nombre,
        s.estado,
        s.fecha_solicitud,
        s.fecha_verificacion,
        s.notas
    FROM solicitud_link_institucion s
    INNER JOIN usuario up ON s.id_usuario = up.id
    INNER JOIN persona p ON up.id_referencia = p.id
    INNER JOIN institucion i ON s.id_institucion = i.id
    WHERE s.id_institucion = ? AND s.estado = ?
    `, [id_escuela, estado]);
  return rows;
}

export async function obtenerSolicitudesPendientesPorEscuela(id_escuela) {
  const [rows] = await db.query(`
    SELECT 
        s.id,
        s.id_usuario,
        CONCAT(p.nombre, ' ', p.apellido) AS nombre_usuario,
        s.id_institucion,
        i.nombre,
        s.estado,
        s.fecha_solicitud,
        s.fecha_verificacion,
        s.notas
    FROM solicitud_link_institucion s
    INNER JOIN usuario up ON s.id_usuario = up.id
    INNER JOIN persona p ON up.id_referencia = p.id
    INNER JOIN institucion i ON s.id_institucion = i.id
    WHERE s.id_institucion = ? AND s.estado = 'pendiente'
    `, [id_escuela]);
  return rows;
}

export async function obtenerSolicitudesVerificadasPorEscuela(id_escuela, estado) {
  const [rows] = await db.query(`
    SELECT 
        s.id,
        s.id_usuario,
        CONCAT(p.nombre, ' ', p.apellido) AS nombre_usuario,
        s.id_institucion,
        i.nombre,
        s.estado,
        s.fecha_solicitud,
        s.fecha_verificacion,
        s.notas
    FROM solicitud_link_institucion s
    INNER JOIN usuario up ON s.id_usuario = up.id
    INNER JOIN persona p ON up.id_referencia = p.id
    INNER JOIN institucion i ON s.id_institucion = i.id
    WHERE s.id_institucion = ? AND s.estado = ?
    `, [id_escuela, estado]);
  return rows;
}

export async function verificarSolicitud(id_usuario) {
    const [rows] = await db.query(
        `SELECT * FROM solicitud_link_institucion WHERE id_usuario = ?`,
        [id_usuario]
    )
    return rows.length > 0;
}

export async function solicitarAsociacion(solicitud) {
    const { id_usuario, id_institucion } = solicitud;
    const [result] = await db.query(
        `INSERT INTO solicitud_link_institucion 
            (id_usuario, id_institucion) 
        VALUES (?, ?)`,
        [id_usuario, id_institucion]
    );
    return result.insertId;
}

export async function responderSolicitud(respuesta) {
    const { id_usuario, id_institucion, estado, notas = '' } = respuesta
    const [result] = await db.query(
        `UPDATE solicitud_link_institucion
        SET estado = ?, notas = ?, fecha_verificacion = NOW()
        WHERE id_usuario = ? AND id_institucion = ?`,
        [estado, notas, id_usuario, id_institucion]
    );
    return result;
}