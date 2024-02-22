import { pool } from "../../../db.js";
import bcrypt from 'bcrypt';
import randomeToken from 'random-token'
import { SESSION_SECRET } from "../../../config.js";

export const getLogIn = async (req, res) => {
    try {
        if(req.session.user) {
            return res.redirect('/home');
        }
        const error = req.query.error ? req.query.error : null;
        return res.render('logIn', { error: error });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const userValidation = async (req, res) => {
    try {
        // console.log(req.body)
        const { username, password } = req.body;
        // console.log("username:", username)
        // console.log("password:", password)

        const [ rows ] = await pool.query(`SELECT * FROM user WHERE BINARY username = ?`, [username])
        // console.log(rows)
        if (rows.length > 0) {
            const passDB = rows[0].pass_u;
            // console.log(passDB);
            
            const passwordMatch = await bcrypt.compare(password, passDB);
            console.log("passwordMatch:", passwordMatch)
            
            if (passwordMatch) {
                req.session.user = { username: username };
                return res.redirect('/home');
            } else {
                console.log("Password incorrect")
                return res.redirect('/login?error=IncorrectPassword');
            }
        } else {
            console.log("Password incorrect")
            return res.redirect('/login?error=IncorrectPassword');
        }
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}