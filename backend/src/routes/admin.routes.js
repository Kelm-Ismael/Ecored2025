// src/routes/admin.routes.js
import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';
import { requireAdmin, requireSuperAdmin } from '../middleware/roles.js';
import {
  getUsers,        // GET    /api/admin/users
  putUserRole,     // PUT    /api/admin/users/:id/role
  putUserStatus,   // PUT    /api/admin/users/:id/status
  putUserSuper,    // PUT    /api/admin/users/:id/super   (solo super)
  getSettings,     // GET    /api/admin/settings
  putSettings,     // PUT    /api/admin/settings          (solo super)
} from '../controllers/admin.controller.js';

const r = Router();

// Todo admin debe estar autenticado y ser admin
r.use('/api/admin', verificarToken, requireAdmin);

// Usuarios
r.get('/api/admin/users', getUsers);
r.put('/api/admin/users/:id/role', putUserRole);
r.put('/api/admin/users/:id/status', putUserStatus);

// Solo super admin
r.put('/api/admin/users/:id/super', requireSuperAdmin, putUserSuper);

// Settings
r.get('/api/admin/settings', getSettings);
r.put('/api/admin/settings', requireSuperAdmin, putSettings);

export default r;
