import { PORT, DB_HOST, PROTOCOL } from '../../../config.js';

export const getConfig = async (req, res) => {
    try {
        const config = { // this will store the configuration of the server
            PORT,
            DB_HOST,
            PROTOCOL
        }
        res.json(config) // return the configuration of the server
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}