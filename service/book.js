const Book = require('../model/Book');
const {
    Op
} = require('sequelize')
// 新增
exports.addBook = async (data) => {
    const ins = await Book.create(data);
    return ins.toJSON();
}
// 删除
exports.deleteBook = async (id) => {
    await Book.destroy({
        where: {
            id
        }
    })
}
// 跟新
exports.updateBook = async (id, data) => {
    await Book.update(data, {
        where: {
            id
        }
    })
}
// 根据id查询
exports.getBookById = async (id) => {
    const ins = await Book.findByPk(id, {
        attributes: ['id', 'name', 'img', 'buildDate', 'author']
    })
    if (ins) {
        return ins.toJSON()
    }
    return null;
}
// 分页查询加模糊查询
exports.getBooks = async (page = 1, limit = 10, search = '') => {
    let where = {};
    if (search) {
        where = {
            [Op.or]: [{
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    author: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    }
    const {
        count: total,
        rows: data
    } = await Book.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        where,
        attributes: ['id', 'name', 'img', 'buildDate', 'author']
    })
    return {
        total,
        datas: JSON.parse(JSON.stringify(data))
    }
}