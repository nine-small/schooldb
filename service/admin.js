const Admin = require('../model/Admin')
const md5 = require('md5')
// 新增
exports.addAdmin = async (data) => {
    data.loginPwd = md5(data.loginPwd)
    const ins = await Admin.create(data);
    return ins.toJSON();
};
// 删除
exports.deleteAdmin = async (id) => {
    await Admin.destroy({
        where: {
            id
        }
    })
};
// 跟新
exports.updateAdmin = async (id, data) => {
    if (data.loginPwd) {
        data.loginPwd = md5(data.loginPwd)
    }
    await Admin.update(data, {
        where: {
            id
        }
    })
};
// 查一个 做登录
exports.login = async (loginId, loginPwd) => {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    });
    if (result && result.loginId === loginId) {
        return result.toJSON(); 
    }
    return null;
}
// 通过主键查询
exports.getAdminById = async (id) => {
    const result = await Admin.findByPk(id);
    if (result) {
        return result.toJSON()
    }
    return null;
}

// 查看所有数据
exports.getAdminAll = async () => {
    const ins = await Admin.findAll();
    if (ins) {
        return JSON.parse(JSON.stringify(ins));
    }
    return null;
}