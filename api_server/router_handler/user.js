// 使用 exports 对象，分别向外共享路由处理函数

// 导入MySQL模块
const db = require('../db/index.js')

// 导入bcryptjs
const bcrypt = require('bcryptjs')

// 注册
exports.reguser = (req,res) => {
  const userInfo = req.body
  // 对表单数据进行合法性校验
  //  console.log(userInfo)
  // 判断用户是否提交username password
  if (!userInfo.username || !userInfo.password ) {
    return res.send({ status: 1, message: '用户名或密码不能为空！'})
  }

  // 定义查询用户名是否存在语句
  const sqlstr = `select * from ev_users where username=?`

  db.query(sqlstr, [userInfo.username], (err,results) => {
    if (err) {
      // 执行sql语句失败
      return res.send({ status: 1, message: err.message})
    }
    if (results.length >0){
      // 用户名已被占用
      return res.send({ status: 1, message: '用户名被占用'})
    }
    // 用户名可以使用
    // 调用bcrypt.hashSync(明文密码, 随机盐的长度)对密码进行加密
   userInfo.password = bcrypt.hashSync(userInfo.password, 10)

  //  定义插入新用户的sql语句
   const sql = `insert into ev_users set ?`
   db.query(sql, {username: userInfo.username,password: userInfo.password}, (err,results) => {
    if (err) {
      // 执行sql语句失败
      return res.send({ sataus: 1, message: err.message})
    }
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.send({ sataus: 1, message: '注册用户失败，请稍后再试'})
    }
    // 注册用户成功
    res.send({ sataus: 0, message: '注册用户成功！'})
   })
})
  // res.send('reguser ok!')
}

exports.login = (req,res) => {
  res.send('login ok!')
}