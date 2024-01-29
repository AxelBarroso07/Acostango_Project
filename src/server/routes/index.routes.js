// index.routes.js
import { Router, json } from 'express';
import multer from 'multer';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { getIndex, getConfig, getCalendar, postEditClass, deleteClass, postNewClass } from '../controllers/index.controller.js';
// uploadImage, uploadHandler

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/uploads')
        
    },
    filename: (req, file, callback) => {
        const fileName = path.parse(file.originalname).name
        const currentDate = new Date()
        const formattedDate = currentDate.toISOString().slice(0, 10)
        const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, '')
        const fileExtension = path.extname(file.originalname)

        const finalNameFile = `${fileName}_${formattedDate}_${formattedTime}${fileExtension}`
        callback(null, finalNameFile)
    }
});

export const upload = multer({
    storage: storage,
    limits: {
        files: 1
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg | jpg | png/;
        const mime = types.test(file.mimetype);
        const ext = types.test(path.extname(file.originalname));

        if (mime && ext){
            return cb(null, true);
        }
        cb("Error: invalid image type")
    }
}).single('image')

const router = Router();

// router.use(upload.single('image'), json());

router.get('/get', getIndex);

router.get('/config', getConfig);

router.get('/calendar', getCalendar);

router.post('/editClass/:idCalendar', postEditClass);

router.delete('/deleteClass/:idCalendar', deleteClass);

router.post('/newClass', postNewClass);

// router.post('/uploadImage', uploadHandler, uploadImage);

export default router;
