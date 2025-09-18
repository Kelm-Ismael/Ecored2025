import express from 'express';
import {
    getResiduos
} from '../controllers/residuo.controller.js'

const router = express.Router();

router.get('/todos', getResiduos);

export default router;