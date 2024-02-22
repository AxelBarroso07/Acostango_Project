import { Router } from 'express';
// import initial routes of login and user validation
import { getLogIn, userValidation } from '../controllers/logIn.controller.js';

const router = Router();

// login route
router.get('/', getLogIn);
// user validation route before login
router.post('/userValidation', userValidation);

export default router;