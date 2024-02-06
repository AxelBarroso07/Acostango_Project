export const getHandleError = async (req,res) =>{
    try {
        return res.render('error', { titlePage: 'An error has occurred' })
    } catch (error) {
        console.error(error);
        return res.render('error', { titlePage: 'An error has occurred' });
    }
}