// import pool object for making queries to the database and cbrypt for password encryption
import { pool } from "../../../db.js";
import bcrypt from 'bcrypt';

// export function arrow to render the login page
export const getLogIn = async (req, res) => {
    try {
        if(req.session.user) { // req.session.user set in 'userValidation' route
            return res.redirect('/home'); // if req.session.user is set, the user will be redirected to /home
        }
        return res.render('logIn');
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' }); // if an error occurs, the user will be redirected to an error page
    }
}
// export function arrow to validate the user before login
export const userValidation = async (req, res) => {
    try {
        // console.log(req.body)
        const { username, password } = req.body; // set username and password from the form in the login page
        console.log("username:", username)
        console.log("password:", password)

        const [ rows ] = await pool.query(`SELECT * FROM user WHERE BINARY username = ?`, [username]) // query to the database to get the user with the username from the form
        console.log(rows)
        if (rows.length > 0) { // if the user exists
            const passDB = rows[0].pass_u; // get the password from the database
            console.log(passDB);

            // compare the password text plain from the form with the hashed password from the database
            const passwordMatch = await bcrypt.compare(password, passDB); // this will return true if the password match, else it will return false
            console.log("passwordMatch:", passwordMatch)

        if (passwordMatch) { // if the passwordMatch is true
            req.session.user = { username: username }; // set the session with the username for the authenticated middleware
                return res.redirect('/home'); // redirect to /home
        } else {
                console.log("hash")
                return res.redirect('/login'); // if the passwordMatch is false, the user will be redirected to the login page
        }
        } else {
            console.log("Password incorrect")
             return res.redirect('/login'); // if the user does not exist, the user will be redirected to the login page
        }
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}