import { Router, json } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { getClasses } from '../controller/classes.controller.js';

const router = Router();

router.get('/classes', getClasses);

export default router