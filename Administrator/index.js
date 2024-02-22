// NPM packages
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import session from 'express-session';
// ENV variables
import { PORT, SESSION_SECRET } from './config.js';
// Middleware
import { isAuthenticated } from './src/server/middleware/isAuthenticated.js';
// Routes
import logIn from './src/server/routes/logIn.routes.js';
import configRoutes from './src/server/routes/config.routes.js';
import classRoutes from './src/server/routes/class.routes.js';
import eventRoutes from './src/server/routes/event.routes.js';
import homeRoutes from './src/server/routes/home.routes.js';
import errorRoutes from './src/server/routes/error.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Settings
app.set('view engine', 'ejs') // set the view engine to ejs
app.set('views', path.join(__dirname, '/src/views')) // set the views directory

//Middlewares
app.use(session({
    secret: SESSION_SECRET, // authorized cookie signature
    resave: false, // prevents saving the session to session storage if there have been no changes during the current request
    saveUninitialized: false, // avoid saving empty or unmodified sessions in session storage
    cookie: {
        secure: false, // true just for HTTPS
        httpOnly: true, // no acces with js in client
        maxAge: 60000 // 7 * 24 * 60 * 60 * 1000 // cookie expiration time in milliseconds (7 days)
    }
}));
app.use('/public', express.static(path.join(__dirname, 'src/public'))) // set the public folder for static files
app.use(express.static('./src/views')) // set the views folder for static files of views
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parsed for forms that use 'application/x-www-form-urlencoded'

//Routes
app.use(logIn);
app.use(errorRoutes);
app.use(isAuthenticated);
app.use(homeRoutes);
app.use(configRoutes);
app.use(classRoutes);
app.use(eventRoutes);

//Redirect to home if the route is not found
app.use((req, res, next) => {
    res.redirect('/');
});

//Server
app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});