import { pool } from "../../../db.js";
import moment from 'moment';

export const getClasses = async (req, res) => {
    try {
        let data = []

        const [ rows ] = await pool.query(`SELECT id_calendar, title, description, day, price, block, time_start, time_finish, category,
        block, type_class,
        FORMAT(block, 2) AS block_formatted,
        FORMAT(price, 2) AS price_formatted
        FROM calendar
        WHERE type_class = 'class' OR type_class = 'workshop'
        ORDER BY CASE
            WHEN day = 'Monday' THEN 1
            WHEN day = 'Tuesday' THEN 2
            WHEN day = 'Wednesday' THEN 3
            WHEN day = 'Thursday' THEN 4
            WHEN day = 'Friday' THEN 5
            WHEN day = 'Saturday' THEN 6
            WHEN day = 'Sunday' THEN 7
            END`
        );
        // console.log("rows from /:", rows)

        if (rows && rows.length > 0) {
            data = rows.map(row => {
                const price = rows[0].price_formatted.replace(/\.00$/, '') + '€'
                const block = row.block_formatted !== null ? row.block_formatted.replace(/\.00$/, '') + '€' : null
                // console.log("price:", price)
                // console.log("block:", block)

                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    day: row.day,
                    price,
                    block,
                    timeStartParse: row.time_start,
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    timeFinishParse: row.time_finish,
                    time12hrsFinishFormat: moment(row.time_finish, 'hh:mm A').format('hh:mm A'),
                    type_class: row.type_class,
                    category: row.category
                };
            })
        }

        // console.log("data to classes:", data)

        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error. We are working to solve it",
        });
    }
}