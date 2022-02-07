const sequelize = require('./db');
const {
    DataTypes
} = require('sequelize');

module.exports = sequelize.define("Class", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buildDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    paranoid: true
}) 