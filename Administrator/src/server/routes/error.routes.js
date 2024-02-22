import { Router } from 'express';
import { getHandleError } from '../controllers/error.controller.js';

const router = Router();

// error route
router.get('/error', getHandleError);

export default router;