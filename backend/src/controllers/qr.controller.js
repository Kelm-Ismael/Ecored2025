// src/controllers/qr.controller.js
import { existeQrToken, insertarBeneficioReciclaje } from '../models/beneficio_reciclaje.model.js';
import { sumarPuntosUsuario, obtenerPerfilDetallado } from '../models/usuario.model.js';
import { obtenerEcopuntoPorId } from '../models/ecopunto.model.js';

const FACTOR_PUNTOS_POR_KG = 5;   // ajustá a tu regla
const PUNTOS_FIJOS = 15;

export async function postScan(req, res) {
  try {
    const userId = req.user.id;
    const {
      code,                // OBLIGATORIO: token del QR
      id_ecopunto = null,  // opcional
      tipo_material = '',  // opcional
      peso = null,         // opcional (kg)
      fecha = null         // opcional (YYYY-MM-DD)
    } = req.body || {};

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Falta code (string)' });
    }

    // evitar reuso de QR
    const ya = await existeQrToken(code);
    if (ya) return res.status(409).json({ error: 'Este QR ya fue utilizado' });

    // calcular puntos
    let puntos_obtenidos = PUNTOS_FIJOS;
    if (peso != null && !Number.isNaN(Number(peso))) {
      puntos_obtenidos = Math.max(1, Math.round(Number(peso) * FACTOR_PUNTOS_POR_KG));
    }

    // insertar registro de reciclaje
    await insertarBeneficioReciclaje({
      id_usuario: userId,
      id_ecopunto,
      tipo_material: String(tipo_material || ''),
      peso: peso != null ? Number(peso) : null,
      puntos_obtenidos,
      fecha: fecha || null,
      qr_token: code,
    });

    // sumar puntos al usuario
    await sumarPuntosUsuario(userId, puntos_obtenidos);

    // total actualizado
    const perfil = await obtenerPerfilDetallado(userId);

    // nombre de ecopunto (si vino id)
    let ecopunto_nombre = null;
    if (id_ecopunto) {
      const eco = await obtenerEcopuntoPorId(id_ecopunto);
      ecopunto_nombre = eco?.nombre || null;
    }

    return res.json({
      ok: true,
      titulo: 'Depósito registrado',
      mensaje: 'Escaneo validado correctamente.',
      puntos: puntos_obtenidos,
      total_actual: perfil?.puntos_acumulados ?? null,
      detalle: { id_ecopunto, ecopunto_nombre, tipo_material, peso, code }
    });
  } catch (err) {
    console.error('QR postScan error:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
