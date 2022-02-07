const Student = require('../model/Student');
const {
    Op
} = require("sequelize");
const Class = require("../model/Class");
const validate = require('validate.js');
const moment = require('moment')
const {pick} = require('../util/propertyHelp')
// 新增
exports.addStudent = async (data) => {
    data = pick(data,'name','sex','birthday','phone','ClassId')
    validate.validators.classExits = async (value) => {
        const ins = await Class.findByPk(value)
        if (ins) {
            return;
        }
        return "班级不存在"
    }
    const rule = {
        // 验证规则
        name: {
            presence: {
                allowEmpty: false
            },
            type: "string",
            length: {
                minimum: 1, // 最小长度
                maximum: 100 // 最大长度
            }
        },
        birthday: {
            presence: true,
            datetime: {
                dateOnly: true, // 只需要日期，不需要小时
                earliest: +moment.utc().subtract(100, 'y'),
                latest: +moment.utc().subtract(5, 'y')
            }
        },
        sex: {
            presence: {
                allowEmpty: false
            },
            type: "boolean"
        },
        phone: {
            presence: {
                allowEmpty: false
            },
            format: /^1\d{10,10}/
        },
        ClassId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false
            },
            classExits: true
        }
    }
    await validate.async(data, rule)
    const ins = await Student.create(data);
    return ins.toJSON();
};
// 删除
exports.deleteStudent = async (id) => {
    await Student.destroy({
        where: {
            id
        }
    })
};
// 更新
exports.updateStudent = async (id, data) => {
    await Student.update(data, {
        where: {
            id
        }
    })
};
// 分页查询学生
// exports.getStudents = async (page = 1, limit = 10) => {
//     const ins = await Student.findAll({
//         offset: (page - 1) * limit,
//         limit: +limit
//     })
//     const total = await Student.count();
//     const datas = JSON.parse(JSON.stringify(ins))
//     return {
//         total,
//         datas
//     }
// }
// 分页查询学生
exports.getStudents = async (page = 1, limit = 10, sex = -1, name = "") => {
    const where = {};
    if (sex != -1) {
        where.sex = !!sex;
    }
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }
    const {
        count: total,
        rows
    } = await Student.findAndCountAll({
        where,
        attributes: ['name', 'id', 'sex', 'birthday', 'phone', 'ClassId','age'],
        include: [Class],
        offset: (page - 1) * limit,
        limit: +limit
    })
    const datas = JSON.parse(JSON.stringify(rows))
    return {
        total,
        datas
    }
}

// 根据id查询
exports.getStudentById = async (id) => {
    const ins = await Student.findByPk(id, {
        attributes: ['name', 'id', 'sex', 'birthday', 'phone', 'ClassId','age']
    })
    if (ins) {
        return ins.toJSON()
    }
    return null;
}