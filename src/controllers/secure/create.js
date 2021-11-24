var Room = require('../../models').Room;
var Reserve = require('../../models').Reserve;
var sendError = require('../../utils/sendError');
var validator = require('../../utils/validator');

// set reservation
const createReservation = (res, data) => {
    Reserve.create({
        name: data.name,
        room_id: data.roomId,
        user_id: data.userInfo.id,
        start_at: data.startAt,
        end_at: data.endAt,
        type: data.type
    })    .then((v) => {
        return res.json({success: true});
    }, (e) => {
        sendError("create reservation error", e);
    });
}

module.exports = (req, res) => {
    let validatorMessage = validator.params(req.body, ["roomId", "startAt", "endAt", "name", "discription"]);
    if (validatorMessage) {
        return sendError(res, validatorMessage, validatorMessage);
    }
    
    // roomId is room?
    Room.findByPk(req.body.roomId).then((val) =>{
        createReservation(res, req.body);
    }, (err) => {
        sendError(res, "create reservation error", err);
    });
}
