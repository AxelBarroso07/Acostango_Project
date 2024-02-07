import Router from 'express';

import { getCalendar } from '../controller/calendar.controller.js';

const router = Router();

router.get('/calendar', getCalendar);

export default router