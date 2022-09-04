// 使用 exports 对象，分别向外共享路由处理函数
exports.reguser = (req,res) => {
  res.send('reguser ok!')
}

exports.login = (req,res) => {
  res.send('login ok!')
}