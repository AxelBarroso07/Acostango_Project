import { Router } from 'express';
// import home route
import { getHome } from '../controllers/home.controller.js';

const router = Router();

// home route
router.get('/home', getHome);

export default router;