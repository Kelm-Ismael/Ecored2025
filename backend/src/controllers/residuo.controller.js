import {
    obtenerResiduos
} from '../models/residuo.model.js'

export async function getResiduos(req, res) {
    try {
        const residuos = await obtenerResiduos();
        res.json(residuos);
    } catch (err) {
        console.error('Error al obtener residuos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}