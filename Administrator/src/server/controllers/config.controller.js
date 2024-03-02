import { PORT, DOMAIN_ADMIN, PROTOCOL } from '../../../config.js';

export const getConfig = async (req, res) => {
    try {
        const config = { // this will store the configuration of the server
            PORT,
            DOMAIN_ADMIN,
            PROTOCOL
        }
        res.json(config) // return the configuration of the server
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}