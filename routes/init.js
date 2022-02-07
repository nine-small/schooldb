const express = require('express');
// 创建一个express应用
const app = express();
// console.log(process.env.NODE_ENV);

// 映射public目录中的静态资源
const path = require('path');
const staticRoot = path.resolve(__dirname,"../public");
/**
 * 下面这段代码的作用：
 * 当请求时，会根据请求路径，从指定的陌路中寻找是否存在该文件，如果存在，直接影响响应内容，而不再移交给后续的中间件。
 * 如果不存在文件，则直接移交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
 */
app.use(express.static(staticRoot,{
    index:"index.html"
}))
// 加入cookie-parser 中间件
// 加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie值
// 加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use('/api/admin',require('./tokenMiddleware'))

/**
 * 解析 application/x-www-form-urlencoded 格式的请求体
 */
app.use(express.urlencoded({
    extended:true  // 使用另一种方式来解析body
}))

// 解析 application/json 格式的请求体
app.use(express.json())

// 处理API请求，学生
app.use('/api/student',require('./api/student'))
// 处理api请求，班级
app.use('/api/class',require('./api/class'))
// 处理api请求，书籍
app.use('/api/book',require('./api/book'))
// 处理api请求，admin
app.use('/api/admin',require('./api/admin'))


// 处理错误的中间件
app.use(require("./errorMiddleware"))

const port = 10;
app.listen(port, () => {
    console.log('开始监听端口'+port);
})