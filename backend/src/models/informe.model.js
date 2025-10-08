import db from '../config/db.js';

export async function informeEntregasPorFechas(fechaInicio, fechaFin) {
    const [rows] = await db.query(`
        SELECT 
            e.id,
            ep.nombre AS locacion,
            tl.tipo_locacion AS tipo,
            e.fecha_hora,
            e.id_usuario AS usuario,
            CONCAT(pu.nombre, ' ', pu.apellido) as nombre_usuario,
            e.id_receptor as receptor,
            CONCAT(pr.nombre, ' ', pr.apellido) as nombre_receptor
        FROM entrega e
        JOIN ecopunto ep ON e.id_locacion = ep.id
        JOIN tipo_locacion tl ON e.id_locacion = tl.id
        JOIN usuario u ON e.id_usuario = u.id
        JOIN persona pu ON u.id_referencia = pu.id
        JOIN usuario r ON e.id_receptor = r.id
        JOIN persona pr ON r.id_referencia = pr.id
        WHERE e.fecha_hora BETWEEN ? AND ?
        ORDER BY e.fecha_hora;`,
        [fechaInicio, fechaFin]
    );
    return rows;
}
