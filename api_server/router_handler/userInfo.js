// 导入数据库操作模块
const db = require('../db/index')

// 导入处理密码模块
const bcrypt = require('bcryptjs')


// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 除password以外，根据用户的 id，查询用户的基本信息（token里保存了用户id）
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
  // req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件就会帮我们挂载上去
  db.query(sql,req.user.id,(err,results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err)
    // 查询结果为空
    if (results.length !==1) return res.cc('获取用户信息失败')

    res.send({
      status:0,
      message: '获取用户基本信息成功！',
      data: results[0]
    })
})
}

// 更新用户基本数据
exports.updateUserInfo = (req,res) => {

  const sql = `update ev_users set ? where id=?`

  db.query(sql, [req.body, req.body.id], (err,results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('修改用户信息失败！')
    return res.cc('修改用户信息成功！', 0)
  })
}

// 更新密码
exports.updatePassword = (req,res) => {
  const sql = `select * from ev_users where id=?`
  // 查询用户是否存在
  db.query(sql, req.user.id, (err, results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在')
    //  用户存在，判断旧密码是否正确


    // 调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码，返回值是布尔值
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)

    if(!compareResult) return res.cc('原密码错误')

    // 原密码正确
    // 调用bcrypt.hashSync(明文密码, 随机盐的长度)对密码进行加密后，将数据存入数据库
    const newpassword= bcrypt.hashSync(req.body.newPwd, 10) // 新密码加密

    const sqlstr = `update ev_users set password=? where id=?`

    db.query(sqlstr, [ newpassword, req.user.id ], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('修改用户密码失败！')
      return res.cc('更新密码成功！',0)
    })
  })
}

// 更新头像
exports.updateAvatar = (req, res) => {
  const sql = `select * from ev_users where id=?`
  // 查询用户是否存在
  db.query(sql, req.user.id, (err, results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在')

    const sqlstr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlstr, [req.body.avatar, req.user.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
    
      // 执行 SQL 语句成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新头像失败！')
    
      // 更新用户头像成功
      return res.cc('更新头像成功！', 0)
    })
  })
}