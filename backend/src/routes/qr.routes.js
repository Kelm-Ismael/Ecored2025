import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';
import { postScan } from '../controllers/qr.controller.js';

const router = Router();

// POST /api/qr/scan
router.post('/scan', verificarToken, postScan);

export default router;
