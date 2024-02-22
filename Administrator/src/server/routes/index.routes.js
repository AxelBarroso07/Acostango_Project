import { Router } from 'express';
import { getIndex } from '../controllers/index.controller.js';

const router = Router();

//Index / Login
router.get('/', getIndex);

export default router;