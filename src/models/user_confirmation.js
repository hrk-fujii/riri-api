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
      User_confirmation.belongsTo(models.user, {
        foreignKey: user_id
      })
    }
  };
  User_confirmation.init({
    confirmation_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_confirmation',
  });
  return User_confirmation;
};