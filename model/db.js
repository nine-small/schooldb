const {
    Sequelize
} = require('sequelize');

/**
 * 连接数据库
 * 数据库名称  用户  密码  配置对象
 */
const sequelize = new Sequelize('schooldb', 'root', '2022woaijj', {
    host: 'localhost',
    dialect: 'mysql',
    logging:null
});

// 测试是否成功连接
async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// test();

module.exports = sequelize;