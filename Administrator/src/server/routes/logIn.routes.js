import { Router } from 'express';
import { getLogIn, userValidation } from '../controllers/logIn.controller.js';

const router = Router();

//Index / Login
router.get('/', getLogIn);

router.post('/userValidation', userValidation);

export default router;