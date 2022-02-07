const sequelize = require('./db');
const {
    DataTypes
} = require('sequelize'); 
module.exports = sequelize.define("Admin", {
    // 账号
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 密码
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 姓名
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // 该配置为true表示这条数据不能真正的删除，而是记录删除时间。
    paranoid: true,
    // 下面这两个配置表示是否需要创建时间和更新时间，默认情况下为true，一般情况下也是带着的。
    // createdAt:false,
    // updatedAt:false  
})
   