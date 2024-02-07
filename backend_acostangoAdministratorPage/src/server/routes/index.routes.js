import { Router } from 'express';
import { getIndex } from '../controllers/index.controller.js';

const router = Router();

//Home
router.get('/', getIndex);

export default router;