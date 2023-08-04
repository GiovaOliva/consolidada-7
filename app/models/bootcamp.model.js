const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const Bootcamp = sequelize.define('Bootcamp', {
    // Define los atributos del modelo
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Bootcamp;
};