// response error
module.exports = (res, message) => {
    if (process.env.NODE_ENV === 'development'){
        console.log(message);
    }
    res.status(500);
    res.json({'success': false, 'message': message});
}
