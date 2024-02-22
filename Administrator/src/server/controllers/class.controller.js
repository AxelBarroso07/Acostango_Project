import { pool } from "../../../db.js"; // import pool to make queries to the database
import moment from 'moment'; // import moment for date and time manipulation

// create class
export const getCreateClass = async (req, res) => {
    try {
        const fullDays = {}; // this will store the full days with 3 classes
        // array with the days of the week
        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const [rows] = await pool.query(`SELECT * FROM calendar WHERE category = 'class'`); // query to the database to get the classes from the calendar table

        if (rows && rows.length > 0) { // if the query returns rows from db
            rows.forEach(row => { // we will replace and parse the rows from the database to the rowsParse array
                const dayKey = row.day.toLowerCase(); // set the day of row to lowercace and store it in dayKey

                if (!fullDays[dayKey]) { // if the day is not in the classesPerDay object, we will set it to 1
                    fullDays[dayKey] = {
                        day: row.day,
                        classes: 1,
                    };
                } else if (fullDays[dayKey].classes < 3) {
                    fullDays[dayKey].classes += 1;
                }
                // console.log('FullDays:', fullDays);
            });
        }

        // console.log("fullDays to createClass:", fullDays);
        
        res.render("createClass", { // render the createClass page
            weekDay, // send the weekDay array to the createClass page
            fullDays // send the fullDays object to the createClass page
        })
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

// confirm create class
export const postConfirmCreateClass = async (req, res) => {
    try {
        const reqBody = req.body // get the body of the request

        const data = { // this will store the data from the request
            title: reqBody.title,
            description: reqBody.description,
            day: reqBody.day,
            price: reqBody.price,
            block: reqBody.block,
            time_start: reqBody.time_start,
            time_finish: reqBody.time_finish,
            category: 'class', // set the category to class
            workshop: reqBody.workshop === 'true' ? true : false // if the workshop is true, set it to true, else set it to false
        };

        const [ rows ] = await pool.query("INSERT INTO calendar SET title = ?, description = ?, image = null, day = ?, price = ?, block = ?,  date = ?, location = null,  time_start = ?, time_finish = ?, category = ?, workshop = ?", [data.title, data.description, data.day, data.price, data.block, data.date, data.time_start, data.time_finish, data.category, data.workshop]) // query to the database to insert the data to the calendar table

        // console.log(rows)

        if(rows.affectedRows > 0) { // if the query returns rows from db
            return res.redirect("home") // redirect to /home
        } else {
            res.render('error', { titlePage: 'An error has occurred' }); // if an error occurs, the user will be redirected to an error page
        }
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

// edit class
export const getEditClass = async (req,res) =>{
    try {
        let data = [] // this will store the data from the request
        const id = parseInt(req.params.idCalendar); // get the idCalendar from the request

        const classesPerDay = {}; // this will store the classes per day
        const fullDays = {}; // this will store the full days with 3 classes

        const weekDay = [ // array with the days of the week
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const [ rows ] = await pool.query("SELECT * FROM calendar WHERE id_calendar = ?", [id]) // query to the database to get the class from the calendar table

        // query to the database to get the classes from the calendar table and order them by the day of the week, with the date formatted to 'dd/mm/yyyy'
        const [ rowsFullDay ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted FROM calendar ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`
        );

        if (rows && rows.length > 0) { // if the query returns rows from db
            rowsFullDay.map(row => { // we will replace and parse the rows from the database to the rowsParse array
                const dayKey = row.day.toLowerCase(); // set the day of row to lowercace and store it in dayKey
        
                if (!classesPerDay[dayKey]) { // if the day is not in the classesPerDay object, we will set it to 1
                    classesPerDay[dayKey] = 1;
                } else if (classesPerDay[dayKey] < 3) {
                    classesPerDay[dayKey] += 1;
                } else { // if the day is in the classesPerDay object and is equal to 3, we will set the day to full
                    if (!fullDays[dayKey]) {
                        fullDays[dayKey] = {
                            day: row.day,
                            classes: [row],
                        };
                    } else {
                        fullDays[dayKey].classes.push(row); // if the day is in the fullDays object, we will add the row to the classes array
                    }
                }
            });

            data = rows.map(row => { // we will replace and parse the rows from the database to the rowsParse array
                return {
                    id_calendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    day: row.day,
                    price: row.price,
                    block: row.block,
                    time_start: moment(row.time_start, 'HH:mm:ss').format('HH:mm'), // store the time_start in 'HH:mm' format
                    time_finish: moment(row.time_finish, 'hh:mm:ss').format('HH:mm'), // store the time_finish in 'HH:mm' format
                    category: row.category,
                    workshop: row.workshop
                }
            })
        }

        // console.log("rows editClass:", rows)
        // console.log("data editClass:", data)

        return res.status(200).render("editClass", { // render the editClass page
            data: data[0], // send the data to the editClass page
            weekDay, // send the weekDay array to the editClass page
            fullDays // send the fullDays object to the editClass page
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

// confirm edit class
export const putConfirmEditClass = async (req, res) =>{
    try {
        const idCalendar = parseInt(req.params.idCalendar); // get the idCalendar from the request
        const reqBody = req.body.data; // get the body of the request

        const data = { // this will store the data from the request
            title: reqBody.title,
            description: reqBody.description,
            day: reqBody.day,
            price: reqBody.price,
            block: reqBody.block,
            timeStart: reqBody.timeStart,
            timeFinish: reqBody.timeFinish,
            workshop: reqBody.workshop === 'true' ? true : false // if the workshop is true, set it to true, else set it to false
        }

        const [ result ] = await pool.query("UPDATE calendar SET title = ?, description = ?, day = ?, price = ?, block = ?, time_start = ?, time_finish = ?, workshop = ? WHERE id_calendar = ?", [data.title, data.description, data.day, data.price, data.block, data.timeStart, data.timeFinish, data.workshop, idCalendar]); // query to the database to update the class from the calendar table

        if(result.affectedRows === 0) {
            return res.status(404).json({
                isUpdateRegister: false // if the query returns 0 rows, the isUpdateRegister will be false, this means that the class was not updated
            })
        } else {
            return res.status(200).json({
                isUpdateRegister: true // if the query returns rows, the isUpdateRegister will be true, this means that the class was updated
            })
        }
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

// delete class
export const deleteClass = async (req, res) => {
    try {
        const idCalendar = parseInt(req.params.idCalendar); // get the idCalendar from the request

        const [ rows ] = await pool.query("DELETE FROM calendar WHERE id_calendar = ?", [idCalendar]) // query to the database to delete the class from the calendar table

        if(rows.affectedRows > 0) { // if the query returns rows from db
            return res.status(204).json({
                'message': 'Class deleted successfuly' // if the class was deleted, the message will be 'Class deleted successfuly'
            })
        }
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}