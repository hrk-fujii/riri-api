// response error
module.exports = (res, message, devMessage) => {
    res.status(400);
    if (process.env.NODE_ENV === 'development'){
        console.log(message);
        return res.json({'error': devMessage});
    }
    res.json({'error': message});
}
