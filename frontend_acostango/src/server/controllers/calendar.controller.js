// import { pool } from '../../../db.js';
// import moment from 'moment';

// export const getCalendar = async (req, res) => {
//     try {
//         let rowsParse = []
//         const [ rows ] = await pool.query(`SELECT id_calendar, title, day, time_start, time_finish, category, workshop FROM calendar ORDER BY CASE
//             WHEN day = 'Sunday' THEN 1
//             WHEN day = 'Monday' THEN 2
//             WHEN day = 'Tuesday' THEN 3
//             WHEN day = 'Wednesday' THEN 4
//             WHEN day = 'Thursday' THEN 5
//             WHEN day = 'Friday' THEN 6
//             WHEN day = 'Saturday' THEN 7
//             END`
//         );

//         console.log("rows: ", rows)

//         if (rows && rows.length > 0) {
//             rowsParse = rows.map(row => {
//                 return {
//                     idCalendar: row.id_calendar,
//                     title: row.title,
//                     day: row.day,
//                     timeStart: row.time_start,
//                     timeFinish: row.time_finish,
//                     time12hrsStart: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
//                     time12hrsFinish: row.time_finish !== null ? moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A') : null,
//                     workshop: row.workshop
//                 };
//             })
//         }

//         console.log("rowsParse:", rowsParse)
//         return res.send({
//             "hi": "0sad"
//         })
//     } catch(error) {
//         console.log(error)
//         return res.status(500).json({
//             "message": "Internal server error"
//         })
//     }
// }