const Class = require('../model/Class');
// 新增
exports.addClass = async (data) => {
    const ins = await Class.create(data);
    return ins.toJSON();
}
// 删除
exports.deleteClass = async (id) => {
    await Class.destroy({
        where: {
            id
        }
    })
}
// 跟新
exports.updateClass = async (id, data) => {
    await Class.update(data, {
        where: {
            id
        }
    })
}
// 通过id查找
exports.getClassById = async (id) => {
    const ins = await Class.findByPk(id, {
        attributes: ['id', 'name', 'buildDate']
    });
    if (ins) {
        return ins.toJSON();
    }
    return null;
}
// 查询全部
exports.getClassAll = async () => {
    const ins = await Class.findAll({
        attributes: ['id', 'name', 'buildDate']
    });
    return JSON.parse(JSON.stringify(ins));
}