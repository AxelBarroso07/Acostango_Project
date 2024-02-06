import { Router } from 'express';
import { getConfig } from '../controllers/config.controller.js';

const router = Router();

//Get ENV variables
router.get('/config', getConfig);

export default router;