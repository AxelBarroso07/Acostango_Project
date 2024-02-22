// import pool object for making queries to the database and moment for date and time manipulation
import { pool } from "../../../db.js";
import moment from 'moment';

export const getHome = async (req, res) => {
    try {
        let rowsParse = [] // this will store the parsed rows from the database
        const dayFreeCheck = '' // this will store the day that is free
        const dayFreeIs = true // this will store if the day is free or not
        const classesPerDay = {}; // this will store the classes for each day
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

        // query to the database to get the classes from the calendar table and order them by the day of the week
        const [ rows ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted FROM calendar ORDER BY CASE
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
            rowsParse = rows.map(row => { // we will replace and parse the rows from the database to the rowsParse array
                const dayKey = row.day.toLowerCase(); // set the day of row to lowercace and store it in dayKey

                if (!classesPerDay[dayKey]) { // if the day is not in the classesPerDay object, we will set it to 1
                    classesPerDay[dayKey] = 1;
                } else if (classesPerDay[dayKey] < 3) { // if the day is in the classesPerDay object and is less than 3, we will add 1
                    classesPerDay[dayKey] += 1;
                } else { // if the day is in the classesPerDay object and is equal to 3, we will set the day to full
                    if (!fullDays[dayKey]) {
                        fullDays[dayKey] = {
                            day: row.day,
                            classes: [row],
                        };
                    } else { // if the day is in the fullDays object, we will add the row to the classes array
                        fullDays[dayKey].classes.push(row);
                    }
                }

                // store the image path in 'imageParse'
                const imageParse = '../public/images/' + row.image
                // console.log("imageParse:", imageParse)

                // for the end we will return the parsed rows
                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    image: imageParse,
                    day: row.day,
                    date: row.date_formatted,
                    location: row.location,
                    price: row.price,
                    block: row.block,
                    timeStartParse: row.time_start,
                    timeFinishParse: row.time_finish,
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'), // we will format the time_start to 12hrs
                    time12hrsFinishFormat: row.time_finish !== null ? moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A') : null, // if time_finish is not null, we will format it to 12hrs
                    workshop: row.workshop,
                    category: row.category
                };
            })
        }

        // return to the home and send the variables with the content of schedule and parsed rows
        return res.render("home", {
            weekDay,
            rowsParse,
            dayFreeCheck,
            dayFreeIs
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}