// 导入数据库操作模块
const db = require('../db/index')


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
