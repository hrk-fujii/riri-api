'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reserve.belongsTo(models.User, {
        foreignKey: "user_id"
      });
      Reserve.belongsTo(models.Room, {
        foreignKey: "room_id"
      });
    }
  };
  Reserve.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    start_at: DataTypes.DATE,
    end_at: DataTypes.DATE,
    type: DataTypes.INTEGER,
    discription: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reserve',
  });
  
    return Reserve;
};