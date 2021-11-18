'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reserve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reserve.belongsTo(models.user, {
        foreignKey: user_id
      });
      reserve.belongsTo(models.room, {
        foreignKey: room_id
      });
    }
  };
  reserve.init({
    name: DataTypes.STRING,
    start_at: DataTypes.DATE,
    end_at: DataTypes.DATE,
    type: DataTypes.INTEGER,
    discription: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'reserve',
  });
  
  reserve.prototype.checkConflict = async function(valie) {
    const res = await reserve.findAll({
      where: {
        start_at: {
          [Op.lte]: value
        },
        end_at: {
          [Op.gte]: value
        }
      }
    });
    if (res) {
      throw new Error("time conflict");
    }
  }
  return reserve;
};