// src/controllers/admin.controller.js
import {
  listarUsuariosPaginado,
  actualizarTipoEstadoUsuario,
  setSuperAdmin,
} from '../models/usuario.model.js';

import {
  getAppSettings,
  updateAppSettings,
} from '../models/settings.model.js';

// GET /api/admin/users
export async function getUsers(req, res) {
  try {
    const { q = '', page = 1, pageSize = 20, tipo = '', estado = '' } = req.query;
    const data = await listarUsuariosPaginado({
      q,
      page,
      pageSize,
      tipo: tipo ? Number(tipo) : null,
      estado: estado !== '' ? Number(estado) : null,
    });
    res.json(data);
  } catch (e) {
    console.error('getUsers', e);
    res.status(500).json({ error: 'Error interno' });
  }
}

// PUT /api/admin/users/:id/role
export async function putUserRole(req, res) {
  try {
    const { id } = req.params;
    const { id_tipo_usuario } = req.body;
    if (![1,2,3,4,5].includes(Number(id_tipo_usuario))) {
      return res.status(400).json({ error: 'id_tipo_usuario inválido' });
    }
    await actualizarTipoEstadoUsuario(id, { id_tipo_usuario });
    res.json({ ok: true });
  } catch (e) {
    console.error('putUserRole', e);
    res.status(500).json({ error: 'Error interno' });
  }
}

// PUT /api/admin/users/:id/status
export async function putUserStatus(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body; // 1 activo, 0 inactivo
    if (![0,1].includes(Number(estado))) {
      return res.status(400).json({ error: 'estado inválido' });
    }
    await actualizarTipoEstadoUsuario(id, { estado });
    res.json({ ok: true });
  } catch (e) {
    console.error('putUserStatus', e);
    res.status(500).json({ error: 'Error interno' });
  }
}

// PUT /api/admin/users/:id/super  (solo super admin)
export async function putUserSuper(req, res) {
  try {
    const { id } = req.params;
    const { is_super_admin } = req.body;
    await setSuperAdmin(id, !!is_super_admin);
    res.json({ ok: true });
  } catch (e) {
    console.error('putUserSuper', e);
    res.status(500).json({ error: 'Error interno' });
  }
}

// GET /api/admin/settings
export async function getSettings(req, res) {
  try {
    const s = await getAppSettings();
    res.json(s);
  } catch (e) {
    console.error('getSettings', e);
    res.status(500).json({ error: 'Error interno' });
  }
}

// PUT /api/admin/settings  (solo super admin)
export async function putSettings(req, res) {
  try {
    const { allow_admin_self_signup } = req.body;
    const saved = await updateAppSettings({ allow_admin_self_signup: !!allow_admin_self_signup });
    res.json(saved);
  } catch (e) {
    console.error('putSettings', e);
    res.status(500).json({ error: 'Error interno' });
  }
}
