import db from '../config/db.js';

export async function obtenerResiduos() {
    const [rows] = await db.query(`
        SELECT 
            r.id,
            r.nombre,
            r.unidad,
            r.medida,
            r.pts_x_medida
        FROM tipo_residuo r
    `);
    return rows;
}