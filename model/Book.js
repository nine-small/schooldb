const sequelize = require('./db');
const {
    DataTypes
} = require('sequelize');

module.exports = sequelize.define("Book", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING
    },
    buildDate: {
        type: DataTypes.DATE,
    },
    author: {
        type: DataTypes.STRING
    }
}, {
    paranoid: true
})