var reserve = require('../../models').reserve;
var sendError = require('../../utils/sendError');
var validator = require('../../utils/validator');

// get rooms
module.exports = (req, res) => {
    //param validate
    let validatorMessage = validator.params(res.query, ["roomId",]);
    if (validatorMessage) {
        return sendError(res, validatorMessage, validatorMessage);
    }
    reserve.find({
        "where": {
            "room_id": res.query.roomId
        }
    }).then((val) =>{
        res.json({'reservations': val});
    }, (err) => {
        sendError(res, "unknown error", err);
    });
}