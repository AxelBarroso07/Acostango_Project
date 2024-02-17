import { PORT, DB_HOST } from '../../../config.js';

export const getConfig = async (req, res) => {
    try {
        const config = {
            PORT,
            DB_HOST
        }
        res.json(config)
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}