import db from '../config/db.js';

export async function obtenerDesafios() {
    const [rows] = await db.query(`
        SELECT 
            d.id,
            d.nombre,
            td.tipo,
            d.puntos_a_ganar
        FROM desafio d
        LEFT JOIN tipo_desafio td ON d.tipo = td.id
    `);
    return rows;
}