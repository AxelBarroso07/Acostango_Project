import { Router } from 'express';
import { getConfig } from '../controllers/config.controller.js';

const router = Router();

// get ENV variables route
router.get('/config', getConfig);

export default router;