import { Router, json } from 'express';
import { getIndex, postIndex, updIndex, delIndex } from '../controllers/index.controller.js';

const router = Router();

router.use(json());

router.get('/get', getIndex);

router.post('/post', postIndex);

router.put('/put', updIndex);

router.delete('/delete', delIndex);

export default router;