var Op = require("sequelize").Op;

var Reserve = require('../../models').Reserve;
var sendError = require('../../utils/sendError');
var validator = require('../../utils/validator');

// get rooms
module.exports = (req, res) => {
    //param validate
    let validatorMessage = validator.params(res.query, ["roomId",]);
    if (validatorMessage) {
        return sendError(res, validatorMessage, validatorMessage);
    }

    let dayStart = new Date(req.query.date);
    dayStart.setHours(0);
    dayStart.setMinutes(0);
    dayStart.setHours(dayStart.getHours() - 9);
    let dayEnd = new Date(req.query.date);
    dayEnd.setHours(23);
    dayEnd.setMinutes(59);
    dayEnd.setSeconds(59.999);
    dayEnd.setHours(dayEnd.getHours() - 9);
    Reserve.findAll({
        "where": {
            "room_id": req.query.roomId,
            start_at: {
                [Op.between]: [dayStart, dayEnd]
            }
        }
    }).then((val) =>{
        res.json({'reservations': val});
    }, (err) => {
        sendError(res, "unknown error", err);
    });
}
