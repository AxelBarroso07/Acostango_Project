import { Router, json } from 'express';

import { getClasses } from '../controller/classes.controller.js';

const router = Router();

router.get('/classes', getClasses);

export default router