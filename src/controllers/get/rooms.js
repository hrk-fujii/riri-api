var Room = require('../../models').Room;
var sendError = require('../../utils/sendError');

// get rooms
module.exports = (req, res) => {
    Room.findAll().then((val) =>{
        res.json({'rooms': val});
    }, (err) => {
        sendError(res, "unknown error", err);
    });
}
