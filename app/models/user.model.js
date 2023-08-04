const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const User = sequelize.define('User', {
    // Define los atributos del modelo
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return User;
};