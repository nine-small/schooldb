const Mock = require('mockjs');

const { data } = Mock.mock({
    "data|500-700":[
        {
            name:"@cname",
            birthday:"@date",
            "sex|1-2":true,
            phone:/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            "ClassId|1-17":0
        }
    ]
})
require('../model/relation')
const Student = require('../model/Student');
Student.bulkCreate(data);
