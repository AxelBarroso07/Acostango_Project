// index.routes.js
import { Router, json } from 'express';
import multer from 'multer';
import path, { join } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { getIndex, getConfig, getCalendar, postEditClass, deleteClass, postNewClass } from '../controllers/index.controller.js';
// uploadImage, uploadHandler

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/uploads')
    },
    filename: (req, file, callback) => {
        const fileName = path.parse(file.originalname).name
        // console.log("fileName:", fileName)
        // console.log("file.originalname:", file.originalname)
        // console.log("path.parse(file.originalname).name:", path.parse(file.originalname).name)
        const currentDate = new Date()
        const formattedDate = currentDate.toISOString().slice(0, 10)
        const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, '')
        const fileExtension = path.extname(file.originalname)

        const finalNameFile = `${fileName}_${formattedDate}_${formattedTime}${fileExtension}`
        callback(null, finalNameFile)
    }
});

export const compressedStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/images');
    },
    filename: (req, file, callback) => {
        const fileName = path.parse(file.originalname).name;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, '');
        const fileExtension = path.extname(file.originalname);
        const finalNameFile = `${fileName}_compressed_${formattedDate}_${formattedTime}${fileExtension}`;
        callback(null, finalNameFile);
    }
});

export const uploadNormalImage = multer({
    storage: storage,
    limits: {
        files: 1
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png/;
        const mime = types.test(file.mimetype);
        const ext = types.test(path.extname(file.originalname));

        if (mime && ext){
            return cb(null, true);
        }
        cb("Error: invalid image type")
    }
}).single('image')

export const uploadCompressedImage = multer({
    storage: compressedStorage,
    limits: {
        files: 1
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png/;
        const mime = types.test(file.mimetype);
        const ext = types.test(path.extname(file.originalname));

        if (mime && ext) {
            return cb(null, true);
        }
        cb("Error: invalid image type");
    }
}).single('image');

export const compressAndUploadImage = async (req, res) => {
    try {
        // Subir la imagen original
        uploadNormalImage(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const fileUpload = req.file.path;
            const fileExtension = path.extname(fileUpload).toLowerCase();

            try {
                let fileImage = sharp(fileUpload);
                if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
                    fileImage = fileImage.jpeg({ quality: 20 });
                } else if (fileExtension === '.png') {
                    fileImage = fileImage.png({ quality: 20 });
                }

                // Construir la ruta para la imagen comprimida
                const compressedFileName = path.basename(fileUpload, path.extname(fileUpload)) + "_compressed" + fileExtension;
                const compressedFilePath = path.join('src/public/images', compressedFileName);

                // Guardar la imagen comprimida en el directorio de imágenes comprimidas
                await fileImage.toFile(compressedFilePath);

                // Puedes eliminar la línea que sube la imagen original, ya que ya fue subida antes

                res.json({ message: 'Image compressed and saved successfully' });
            } catch (err) {
                console.error("Error compressing image", err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error("Error in compressAndUploadImage:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




//Compress image
// export const compressImage = async (req, res) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(400).json({ error: err.message });
//             }

//             const fileUpload = req.file.path;
//             const fileExtension = path.extname(fileUpload).toLowerCase();
//             // console.log("fileUpload:", fileUpload)
//             console.log("req.file:", req.file.filename)

//             try {
//                 let fileImage = sharp(fileUpload);
//                 if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
//                     fileImage = fileImage.jpeg({ quality: 20 });
//                 } else if (fileExtension === '.png') {
//                     fileImage = fileImage.png({ quality: 20 });
//                 }
//                 const fileName = path.parse(req.file.filename).name
//                 console.log("fileName in sharp:", fileName)
//                 await fileImage.toFile(fileName + "_compressed" + fileExtension);
//                 // console.log("fileImage:", fileImage)
//                 res.json({ message: 'Image compressed successfully' });
//             } catch (err) {
//                 console.error("Error compressing image", err);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }
//         });
//     } catch (error) {
//         console.error("Error in compressImage:", error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

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
