// index.routes.js
import { Router, json } from 'express';
import multer from 'multer';
import { getIndex, postIndex, updIndex, delIndex, getConfig, getCalendar, postEditClass, deleteClass, postNewClass, uploadImage, uploadHandler } from '../controllers/index.controller.js';

console.log('Importando upload en index.routes.js');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

console.log('Importación exitosa');

const router = Router();

// router.use(upload.single('image'), json());

router.get('/get', getIndex);

router.post('/post', postIndex);

router.put('/put', updIndex);

router.delete('/delete', delIndex);

router.get('/config', getConfig);

router.get('/calendar', getCalendar);

router.post('/editClass/:idCalendar', postEditClass);

router.delete('/deleteClass/:idCalendar', deleteClass);

// router.post('/newClass', upload.single('image'), postNewClass);

router.post('/uploadImage', uploadHandler, uploadImage);

export default router;
