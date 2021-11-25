const Op = require("Sequelize").Op;
var Room = require('../../models').Room;
var Reserve = require('../../models').Reserve;
var sendError = require('../../utils/sendError');
var validator = require('../../utils/validator');

// set reservation
const createReservation = (res, data) => {
    Reserve.findOrCreate({
        where: {
            [Op.or]: [{
                [Op.and]: {
                    start_at: {
                        [Op.gte]: data.startAt
                    },
                    end_at: {
                        [Op.lte]: data.endAt
                    }
                }},
                {[Op.and]: {
                    start_at: {
                        [Op.lte]: data.startAt
                    },
                    end_at: {
                        [Op.gt]: data.startAt
                    }
                }},
                {[Op.and]: {
                    start_at: {
                        [Op.lt]: data.endAt
                    },
                    end_at: {
                        [Op.gte]: data.endAt
                    }
                }
            }]
        },
        defaults: {
            name: data.name,
            room_id: data.roomId,
            user_id: data.userInfo.id,
            start_at: data.startAt,
            end_at: data.endAt,
            type: data.type
        },
        logging: console.log
    }).then(([val, created]) => {
        if (created) {
            return res.json({success: true});
        } else {
            return sendError(res, "reserve conflice", "reserve conflice");
        }
    }, (e) => {
        sendError(res, "create reservation error", e);
    });
}

module.exports = (req, res) => {
    let validatorMessage = validator.params(req.body, ["roomId", "startAt", "endAt", "name", "discription"]);
    if (validatorMessage) {
        return sendError(res, validatorMessage, validatorMessage);
    }
    
    // roomId is room?
    Room.findByPk(req.body.roomId).then((val) =>{
        return createReservation(res, req.body);
    }, (err) => {
        return sendError(res, "create reservation error", err);
    });
}
