export const getHandleError = async (req,res) =>{
    try {
        return res.render('error', { titlePage: 'An error has occurred' }) // if an error occurs, the user will be redirected to an error page
    } catch (error) {
        console.error(error);
        return res.render('error', { titlePage: 'An error has occurred' });
    }
}