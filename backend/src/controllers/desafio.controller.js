import {
  listarDesafiosDisponibles,
  listarDesafiosUsuario,
  inscribirDesafio,
  confirmarEntregaDesafio
} from '../models/desafio.model.js';

export async function getDesafios(req, res) {
  try {
    const rows = await listarDesafiosDisponibles();
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al listar desafíos' });
  }
}

export async function getMisDesafios(req, res) {
  try {
    const rows = await listarDesafiosUsuario(req.user.id);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al listar mis desafíos' });
  }
}

export async function postInscribir(req, res) {
  try {
    const { id } = req.params;
    const idRel = await inscribirDesafio({ idUsuario: req.user.id, idDesafio: id });
    res.status(201).json({ id_usuario_desafio: idRel });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'No se pudo inscribir' });
  }
}

export async function postConfirmar(req, res) {
  try {
    const { id } = req.params; // id_usuario_desafio
    const result = await confirmarEntregaDesafio({ idUsuarioDesafio: id });
    res.json(result);
  } catch (e) {
    console.error(e);
    if (e.message === 'REL_NO_ENCONTRADA') return res.status(404).json({ error: 'Desafío no encontrado' });
    if (e.message === 'YA_COMPLETADO') return res.status(400).json({ error: 'Ya está completado' });
    res.status(500).json({ error: 'No se pudo confirmar' });
  }
}
