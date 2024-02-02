import { Router, json } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { getCalendar } from '../controller/calendar.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get('/calendar', getCalendar);

export default router