import { pool } from "../../../db.js";
import path from "path";
import { fileURLToPath } from "url";
import moment from 'moment';

export const getEvents = async (req, res) => {
    try {
        let rowsParse = []
        const dayFreeCheck = ''
        const dayFreeIs = true
        const classesPerDay = {};

        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const currentDate = new Date();
        const currentDay = weekDay[currentDate.getDay()];

        const [ rows ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted,
        FORMAT(price, 2) AS price_formatted FROM calendar
        WHERE category = 'event'
        ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`
        );
        console.log("rows from /:", rows)

        if (rows && rows.length > 0) {

            const image = '../../../../../backend_acostangoAdministratorPage/src/public/' + rows[0].image
            const price = rows[0].price_formatted.replace(/\.00$/, '') + '€'
            // console.log(image)
            // console.log("price:", price)

            rowsParse = rows.map(row => {
                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    image,
                    day: row.day,
                    date: row.date_formatted,
                    location: row.location,
                    price,
                    timeStartParse: row.time_start,
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    category: row.category
                };
            })
        }

        console.log("rowsParse to events:", rowsParse)

        // return res.status(200).render("calendar", {
        //     positonMonth,
        //     weekDay,
        //     hourClassesArray,
        //     rowsParse,
        //     hourClassesArrayFormat,
        //     uniqueSortedArray
        // });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error. We are working to solve it",
        });
    }
}