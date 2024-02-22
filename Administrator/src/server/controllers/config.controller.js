import { PORT, DB_HOST } from '../../../config.js';

export const getConfig = async (req, res) => {
    try {
        const config = { // this will store the configuration of the server
            PORT,
            DB_HOST
        }
        res.json(config) // return the configuration of the server
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}