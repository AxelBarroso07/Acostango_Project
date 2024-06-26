import { pool } from "../../../db.js"; // import pool to make queries to the database
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs'; // import fs to use unlink function
import { promisify } from 'util'; // import promisify to use async/await with fs functions
import sharp from "sharp"; // import sharp to compress images

// create event
export const getCreateEvent = async(req, res) => {
    try {
        // Array with the days of the week
        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        
        // Render the createEvent page for the day select
        return res.render("createEvent", {
            weekDay
        })
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}
// confirm create event
export const postConfirmCreateEvent = async(req, res) => {
    try {
        const reqBody = req.body // Get the form data
        const category = 'event' // Set the category to event

        if (!req.file) { // If there is no file uploaded, return error and redirect to error page
            console.error(error);
            res.render('error', { titlePage: 'An error has occurred' });
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Compress image
        const imagePath = req.file.path; // Image original name
        const compressedPath = 'src/public/images/' // Directory Path for compressed images
        const compressedImagePath = compressedPath + req.file.filename; // Path for compressed images
        const fileExtension = req.file.filename.split('.').pop().toLowerCase(); // File extension
        let fileCompress = sharp(imagePath); // Image to compress
        if (fileExtension === 'jpg' || fileExtension === 'jpeg') { // if the file extension is jpg or jpeg, compress the image to 50% quality
            fileCompress = fileCompress.jpeg({ quality: 50 })
        } else if (fileExtension === 'png') {
            fileCompress = fileCompress.png({ quality: 50 })
        } 
        await fileCompress.toFile(compressedImagePath); // Save the compressed image

        const fileCompressedImage = req.file.filename // Compressed image name
        const dirPhotoCompressed = `${fileCompressedImage}` // Compressed image path
        // console.log("dirPhotoCompressed:", dirPhotoCompressed)
        
        // Compress image for Acostango folder
        const imagePath2 = req.file.path.replace(/\s/g, '_'); // Image original name
        // console.log("imagePath2:", imagePath2)
        const compressedPath2 = __dirname + '/../../../../Acostango/src/assets/imageEvents/' // Directory Path for compressed images
        const compressedImagePath2 = compressedPath2 + req.file.filename; // Path for compressed images
        const fileExtension2 = req.file.filename.split('.').pop().toLowerCase(); // File extension 
        let fileCompress2 = sharp(imagePath2); // Image to compress
        if (fileExtension2 === 'jpg' || fileExtension2 === 'jpeg') {
            fileCompress2 = fileCompress2.jpeg({ quality: 50 }) // Compress image to 50% quality
        } else if (fileExtension2 === 'png') {
            fileCompress2 = fileCompress2.png({ quality: 50 })
        } 
        await fileCompress2.toFile(compressedImagePath2); // Save the compressed image

        // Compress image for dist folder
        const imagePath3 = req.file.path.replace(/\s/g, '_'); // Image original name
        const compressedPath3 = __dirname + '/../../../../Acostango/dist/assets/imageEvents/' // Directory Path for compressed images
        const compressedImagePath3 = compressedPath3 + req.file.filename; // Path for compressed images
        const fileExtension3 = req.file.filename.split('.').pop().toLowerCase(); // File extension 
        let fileCompress3 = sharp(imagePath3); // Image to compress
        if (fileExtension3 === 'jpg' || fileExtension3 === 'jpeg') {
            fileCompress2 = fileCompress3.jpeg({ quality: 50 }) // Compress image to 50% quality
        } else if (fileExtension3 === 'png') {
            fileCompress3 = fileCompress3.png({ quality: 50 })
        } 
        await fileCompress3.toFile(compressedImagePath3); // Save the compressed image
        
        const data = { // Set the data to insert in the database
            title: reqBody.title,
            description: reqBody.description,
            image: dirPhotoCompressed,
            day: reqBody.day,
            date: new Date(reqBody.date), // Format date to YYYY-MM-DD
            location: reqBody.location,
            price: reqBody.price,
            time_start: reqBody.time_start,
            time_finish: null, // event has no time_finish
            category: category,
            type_class: 'null' // event has no workshop
        }

        const [ rows ] = await pool.query("INSERT INTO calendar(title, description, image, day, date, location, price, time_start, time_finish, category, type_class) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.time_start, data.time_finish, data.category, data.type_class]) // Insert the data in the database
        console.log(rows)
        return res.redirect('home') // Redirect to home page
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

// edit event
export const getEditEvent = async (req,res) =>{
    try {
        console.log("req.params.idCalendar:", req.params.idCalendar)
        console.log("req.params:", req.params)
        const id = parseInt(req.params.idCalendar);
        const [ rows ] = await pool.query("SELECT * FROM calendar  WHERE id_calendar = ?", [id])
        console.log("rows:", rows)
        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
    
        // Format date to YYYY-MM-DD
        const formatDate = new Date(rows[0].date).toISOString().split('T')[0];

        return res.status(200).render("editEvent", {
            data: rows[0],
            date_formatted: formatDate,
            weekDay
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const putConfirmEditEvent = async (req,res) =>{
    try {
        const idCalendar = parseInt(req.params.idCalendar);
        const reqBody = req.body;
        console.log("reqBody:", reqBody)
        console.log("req.file:", req.file)

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Compress image
        const imagePath = req.file && req.file.path !== undefined ? req.file.path : reqBody.image.replaceAll('../public/images/', ''); //Image original name
        const imagePath2 = req.file && req.file.path !== undefined ? req.file.path.replace(/\s/g, '_') : reqBody.image.replace(/\s/g, '_'); //Image original name
        const imagePath3 = req.file && req.file.path !== undefined ? req.file.path.replace(/\s/g, '_') : reqBody.image.replace(/\s/g, '_'); //Image original name
        let dirPhotoCompressed = ''

        const compressedPath = 'src/public/images/'//Directory Path for compressed images
        if(req.file && req.file.path && req.file !== undefined) {
            // compress image 1
            const compressedImagePath = compressedPath + req.file.filename;//Path for compressed images

            const fileExtension = req.file.filename.split('.').pop().toLowerCase();//File extension
    
            let fileCompress = sharp(imagePath);//Image to compress
    
            if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                fileCompress = fileCompress.jpeg({ quality: 50 })
            } else if (fileExtension === 'png') {
                fileCompress = fileCompress.png({ quality: 50 })
            } 
            await fileCompress.toFile(compressedImagePath);
            
            const fileCompressedImage = req.file.filename
            dirPhotoCompressed = `${fileCompressedImage}`

            // compress image 2
            // console.log("imagePath2:", imagePath2)
            const compressedPath2 = __dirname + '/../../../../Acostango/src/assets/imageEvents/'//Directory Path for compressed images
            const compressedImagePath2 = compressedPath2 + req.file.filename;//Path for compressed images
            const fileExtension2 = req.file.filename.split('.').pop().toLowerCase();//File extension
            let fileCompress2 = sharp(imagePath2);//Image to compress
            if (fileExtension2 === 'jpg' || fileExtension2 === 'jpeg') {
                fileCompress2 = fileCompress2.jpeg({ quality: 50 })
            } else if (fileExtension2 === 'png') {
                fileCompress2 = fileCompress2.png({ quality: 50 })
            } 
            await fileCompress2.toFile(compressedImagePath2);

            // compress image to dist folder
            const compressedPath3 = __dirname + '/../../../../Acostango/dist/assets/imageEvents/'//Directory Path for compressed images
            const compressedImagePath3 = compressedPath3 + req.file.filename;//Path for compressed images
            const fileExtension3 = req.file.filename.split('.').pop().toLowerCase();//File extension
            let fileCompress3 = sharp(imagePath3);//Image to compress
            if (fileExtension3 === 'jpg' || fileExtension3 === 'jpeg') {
                fileCompress3 = fileCompress3.jpeg({ quality: 50 })
            } else if (fileExtension3 === 'png') {
                fileCompress3 = fileCompress3.png({ quality: 50 })
            } 
            await fileCompress3.toFile(compressedImagePath3);
        } else {
            const fileCompressedImage = reqBody.image
            dirPhotoCompressed = `${fileCompressedImage}`
        }
        const data = {
            title: reqBody.title,
            description: reqBody.description,
            image: dirPhotoCompressed,
            day: reqBody.day,
            date: new Date(reqBody.date),
            location: reqBody.location,
            price: reqBody.price,
            timeStart: reqBody.timeStart,
            timeFinish: null,
            type_class: 'null'
        }
        // console.log("data:", data)

        const [ result ] = await pool.query("UPDATE calendar SET title = ?, description = ?, image = ?, day = ?, date = ?, location = ?, price = ?, time_start = ?, time_finish = ?, type_class = ? WHERE id_calendar = ?", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.timeStart, data.timeFinish, data.type_class, idCalendar]);
        
        if (result.affectedRows === 0) {
            return res.status(404).send({ isUpdateRegister: false, redirectTo: '/error' });
        } else {
            return res.status(200).send({ isUpdateRegister: true, redirectTo: '/home' });
        }
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

//Delete event
export const deleteEvent = async (req, res) => {
    try {
        const idCalendar = parseInt(req.params.idCalendar); // get the id from the url param

        const __filename = fileURLToPath(import.meta.url); // get the filename
        const __dirname = dirname(__filename); // get the directory name

        const unlinkAsync = promisify(fs.unlink); // promisify the unlink function

        const [imageData] = await pool.query("SELECT image FROM calendar WHERE id_calendar = ?", [idCalendar]); // get the image name from the database where the id is the same as the idCalendar

        const imageFileCompressPathAdminPage = path.join(__dirname, '../../../src/public/images', imageData[0].image) // get the image path for the Administrator Page
        // console.log(imageFileCompressPathAdminPage)
        //
        const imageFileCompressPathPrincipalPage = path.join(__dirname, '../../../../Acostango/src/assets/imageEvents', imageData[0].image) // get the image path for the principal Acostango page
        // console.log(imageFileCompressPathPrincipalPage)

        const [ rows ] = await pool.query("DELETE FROM calendar WHERE id_calendar = ?", [idCalendar]) // delete the event from the database

        if(rows.affectedRows > 0) { // if the row is deleted
            try {
                await fs.promises.access(imageFileCompressPathAdminPage); // check if the image exists
                await unlinkAsync(imageFileCompressPathAdminPage); // delete the image for the Administrator Page
                //
                await fs.promises.access(imageFileCompressPathPrincipalPage); // check if the image exists
                await unlinkAsync(imageFileCompressPathPrincipalPage); // delete the image for the principal Acostango page
            } catch(error) {
                console.log("error unlinking image:", error.message)
                // console.error(error)
            }

            return res.status(204).json({
                'message': 'Event deleted successfuly' // if the event is deleted, return a message
            })
        }
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

