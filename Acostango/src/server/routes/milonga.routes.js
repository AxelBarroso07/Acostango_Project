import Router from 'express';

import { getMilonga } from '../controller/milonga.controller.js';

const router = Router();

router.get('/milonga', getMilonga);

export default router