const {
    addAdmin,
    deleteAdmin,
    updateAdmin,
    login,
    getAdminById,
    getAdminAll
} = require('./admin');
const {
    addStudent,
    deleteStudent,
    updateStudent,
    getStudents,
    getStudentById
} = require("./student");
const {
    addClass,
    updateClass,
    deleteClass,
    findClassAll,
    findClassById
} = require('./class')

const {getBooks,getBookById} = require('./book')

// 业务逻辑层初始化
const validate = require('validate.js');
const moment = require("moment")
validate.extend(validate.validators.datetime,{
    /**
     * 该函数会自动用于日期格式转换
     * 它会在验证时自动触发，他需要将任何数据转换为时间戳返回
     * @param {*} value 传入要转换的值
     * @param {*} options 针对某个属性的验证配置
     */
    parse(value,options){
        let formats = ["YYYY-MM-DD HH:mm:ss","YYYY-M-D H:m:s","x"];
        if(options.dateOnly){
            formats = ["YYYY-MM-DD","YYYY-M-D"]
        }
        return +moment.utc(value,formats,true)
    },
    format(value,options){
        let format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return +moment.utc(value).format(format);
    }
})


// addStudent({
//     name:"ccc",
//     birthday:"3000-01-01",
//     sex:true,
//     phone:"12312312312",
//     ClassId:"133",
//     a:1,
//     b:2
// }).catch(err=>{
//     console.log(err);
// })
// getStudentById(3).then(ele=>{
//     console.log(ele);
// })


