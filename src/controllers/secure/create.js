var room = require('../../models').room;
var reserve = require('../../models').reserve;
var sendError = require('../../utils/sendError');
var validator = require('../../utils/validator');

// set reservation
const createReservation = (data) => {
    reserve.create({
        name: data.name,
        room_id: data.roomId,
        user_id: data.userInfo.id,
        start_at: data.startAt,
        end_at: endAt,
        type: data.type
    })    .then((v) => {
        return res.json({success: true});
    }, (e) => {
        sendError("create reservation error", e);
    });
}

module.exports = (req, res) => {
    let validatorMessage = validator.param(res.data, ["roomId", "startAt", "endAt", "name", "discription"]);
    if (validatorMessage) {
        return sendError(res, validatorMessage, validatorMessage);
    }
    
    // roomId is room?
    room.findByPk(res.data.roomId).then((val) =>{
        createReservation(req.data);
    }, (err) => {
        sendError(res, "create reservation error", err);
    });
}
