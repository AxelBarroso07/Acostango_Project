import { Router } from 'express';
import { getHandleError } from '../controllers/error.controller.js';

const router = Router();

//Handle errors
router.get('/error', getHandleError);

export default router;