// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import { fileURLToPath } from 'url';
// import proxy from 'http-proxy-middleware';

// import { PORT_VITE } from '../../config.js';
// import calendarRoutes from './routes/calendar.routes.js';

// const app = express()

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// console.log("__filename:", __filename)
// console.log("__dirname:", __dirname)

// app.use(
//     '/public',
//     express.static(path.join(__dirname)),
//     proxy({ target: 'http://localhost:5175', changeOrigin: true })
// );

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(calendarRoutes)

// app.use((req, res, next) => {
//     res.redirect('/')
// })

// app.listen(PORT_VITE, () => {
//     console.log(`Server listen on port ${PORT_VITE}`)
// })