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
    Reserve.findAll({
        "where": {
            "room_id": req.query.roomId,
            start_at: {
                [Op.between]: [req.query.date + " 00:00:00", req.query.date + " 23:59:59"]
            }
        }
    }).then((val) =>{
        res.json({'reservations': val});
    }, (err) => {
        sendError(res, "unknown error", err);
    });
}
