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
            fileCompress2 = fileCompress2.jpeg({ quality: 20 }) // Compress image to 20% quality
        } else if (fileExtension2 === 'png') {
            fileCompress2 = fileCompress2.png({ quality: 20 })
        } 
        await fileCompress2.toFile(compressedImagePath2); // Save the compressed image
        
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
            workshop: null // event has no workshop
        }

        const [ rows ] = await pool.query("INSERT INTO calendar(title, description, image, day, date, location, price, time_start, time_finish, category, workshop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.time_start, data.time_finish, data.category, data.workshop]) // Insert the data in the database

        return res.redirect('home') // Redirect to home page
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

// edit event
export const getEditEvent = async (req,res) =>{
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        console.log(__dirname)
        console.log('/editEvent/:idCalendar', parseInt(req.params.idCalendar))
        const id = parseInt(req.params.idCalendar); // Get the id from the url param
        console.log("id:", id)
        const [ rows ] = await pool.query("SELECT * FROM calendar WHERE id_calendar = ?", [id]) // Get the event data from the database
        // console.log(rows)

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
    
        // Format date to YYYY-MM-DD
        const formatDate = new Date(rows[0].date).toISOString().split('T')[0]; // Format date to YYYY-MM-DD

        return res.status(200).render("editEvent", { // Render the editEvent page with the event data
            data: rows[0],
            date_formatted: formatDate, // Send the formatted date
            weekDay
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const putConfirmEditEvent = async (req,res) =>{
    try {
        const idCalendar = parseInt(req.params.idCalendar); // get the id from the url param
        const reqBody = req.body; // get the form data

        if (!req.file) { // if there is no file uploaded, return error and redirect to error page
            res.render('error', { titlePage: 'An error has occurred' });
        }
        console.log("req.file:", req.file)
        // Compress image
        const imagePath = req.file.path; // image original name

        const compressedPath = 'src/public/images/' // directory Path for compressed images

        const compressedImagePath = compressedPath + req.file.filename; // path for compressed images

        const fileExtension = req.file.filename.split('.').pop().toLowerCase(); // file extension

        let fileCompress = sharp(imagePath); // image to compress

        if (fileExtension === 'jpg' || fileExtension === 'jpeg') { // if the file extension is jpg or jpeg, compress the image to 20% quality
            fileCompress = fileCompress.jpeg({ quality: 20 })
        } else if (fileExtension === 'png') {
            fileCompress = fileCompress.png({ quality: 20 })

        } 
        await fileCompress.toFile(compressedImagePath); // save the compressed image
        
        const dirFolder = '../public/images/' // directory Path for compressed images
        const fileCompressedImage = req.file.filename // compressed image name
        const dirPhotoCompressed = `${dirFolder}${fileCompressedImage}` // compressed image path

        const data = { // set the data to update in the database
            title: reqBody.title,
            description: reqBody.description,
            image: dirPhotoCompressed,
            day: reqBody.day,
            date: new Date(reqBody.date), // format date to YYYY-MM-DD
            location: reqBody.location,
            price: reqBody.price,
            timeStart: reqBody.timeStart,
            timeFinish: null, // event has no time_finish
            workshop: null // event has no workshop
        }

        const [ result ] = await pool.query("UPDATE calendar SET title = ?, description = ?, image = ?, day = ?, date = ?, location = ?, price = ?, time_start = ?, time_finish = ?, workshop = ? WHERE id_calendar = ?", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.timeStart, data.timeFinish, data.workshop, idCalendar]); // update the data in the database

        if(result.affectedRows === 0) {
            return res.status(404).json({
                isUpdateRegister: false // if the row is not updated, return false, this will be used in the front-end to show a message
            })
        } else {
            console.log("Row updated")
            return res.status(200).json({
                isUpdateRegister: true // if the row is updated, return true, this will be used in the front-end to show a message
            })
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

