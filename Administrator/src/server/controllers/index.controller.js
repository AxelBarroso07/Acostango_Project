import { pool } from "../../../db.js";
import moment from 'moment';

export const getIndex = async (req, res) => {
    try {
        res.render("index")
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}