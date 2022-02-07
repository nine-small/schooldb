const sequelize = require('./db');
require('./relation');
require('./Admin');
require('./Book');
  

sequelize.sync({
    alert: true
}).then(() => { 
    console.log("所有模型同步完成！！！");
})
