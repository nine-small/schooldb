const sequelize = require('./db');
const {
    DataTypes
} = require('sequelize');
const moment = require('moment')

module.exports = sequelize.define("Student", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        get(){
            return this.getDataValue("birthday").getTime();
        }
    },
    sex: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type:DataTypes.VIRTUAL,
        get(){
            const now = moment.utc();
            const birth = moment.utc(this.birthday);
            return now.diff(birth,"y")
        }
    } 
}, { 
    paranoid: true
})