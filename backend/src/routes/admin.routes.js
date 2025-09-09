// src/routes/admin.routes.js
import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';
import { requireAdmin, requireSuperAdmin } from '../middleware/roles.js';
import {
  getUsers,
  putUserRole,
  putUserStatus,
  putUserSuper,
  getSettings,
  putSettings,
} from '../controllers/admin.controller.js';
import { crearUsuario } from '../controllers/usuario.controller.js';

const r = Router();

// Todas requieren autenticación y admin
r.use('/api/admin', verificarToken, requireAdmin);

// Usuarios
r.get('/api/admin/users', getUsers);
r.post('/api/admin/users', crearUsuario);
r.put('/api/admin/users/:id/role', putUserRole);
r.put('/api/admin/users/:id/status', putUserStatus);

// Solo super admin
r.put('/api/admin/users/:id/super', requireSuperAdmin, putUserSuper);

// Settings
r.get('/api/admin/settings', getSettings);
r.put('/api/admin/settings', requireSuperAdmin, putSettings);

export default r;
