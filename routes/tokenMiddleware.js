const {
   getErr
} = require('./getSendResult')
// 用于解析cookie
module.exports = (req, res, next) => {
   let token = req.cookies.token;
   console.log(req.cookies);
   if (!token) {
      // 跨终端
      token = req.header.authorization
   }
   if (!token) {
      // 说明没有token
      handlerNonToken(req, res, next);
      return;
   }
   // 验证token
   next();
}

function handlerNonToken(req, res, next) {
   res.status(403).send(getErr("no token"))
}