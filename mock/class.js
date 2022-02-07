const Mock = require("mockjs");
const {
    addClass
} = require("../service/class")
const {
    data
} = Mock.mock({
    "data|17": [{
        "n|+1": 1,
        "name": " @n 班",
        buildDate: "@date"
    }]
})

const arr = data.map(ele => {
    return {
        name: ele.name,
        buildDate: ele.buildDate
    }
})

// arr.forEach(ele => {
//     addClass(ele)
// })

// 可以批量向数据库中加入数据
const Class = require('../model/Class');
Class.bulkCreate(arr);