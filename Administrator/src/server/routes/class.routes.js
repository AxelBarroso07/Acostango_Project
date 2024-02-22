import { Router } from 'express';
import { getCreateClass, postConfirmCreateClass, getEditClass, putConfirmEditClass, deleteClass } from '../controllers/class.controller.js';

const router = Router();

// create class routes
router.get('/createClass', getCreateClass);
router.post('/confirmCreateClass', postConfirmCreateClass);

// edit class routes
router.get('/editClass/:idCalendar', getEditClass);
router.put('/confirmEditClass/:idCalendar', putConfirmEditClass);

// delete class routes
router.delete('/deleteClass/:idCalendar', deleteClass);

export default router;