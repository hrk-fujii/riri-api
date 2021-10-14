'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_confirmation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_confirmation.init({
    user_id: DataTypes.INTEGER,
    confirmation_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_confirmation',
  });
  return User_confirmation;
};