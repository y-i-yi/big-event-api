// 使用 exports 对象，分别向外共享路由处理函数

// 导入MySQL模块
const db = require('../db/index.js')

// 导入bcryptjs，对密码进行加密存储
const bcrypt = require('bcryptjs')

// 导入生成token的包
const jwt = require('jsonwebtoken')

// 导入全局配置文件
const config = require('../config')


// 注册
exports.reguser = (req,res) => {
  const userInfo = req.body
  // 对表单数据进行合法性校验
  //  console.log(userInfo)
  // // 判断用户是否提交username password
  // if (!userInfo.username || !userInfo.password ) {
  //   return res.send({ status: 1, message: '用户名或密码不能为空!' })
  // }

  // 2.定义查询用户名是否存在语句
  const sqlstr = `select * from ev_users where username=?`

  db.query(sqlstr, [userInfo.username], (err,results) => {
    if (err) {
      // 执行sql语句失败
      return res.cc(err)
    }
    if (results.length >0){
      // 用户名已被占用
      return res.cc('用户名被占用')
    }
    // 用户名可以使用
    // 3.调用bcrypt.hashSync(明文密码, 随机盐的长度)对密码进行加密后，将数据存入数据库
   userInfo.password = bcrypt.hashSync(userInfo.password, 10)

  //  定义插入新用户的sql语句
   const sql = `insert into ev_users set ?`
   db.query(sql, { username: userInfo.username,password: userInfo.password }, (err,results) => {
    if (err) {
      // 执行sql语句失败
      return res.cc(err)
    }
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.cc('注册用户失败，请稍后再试')
    }
    // 4.注册用户成功
    res.cc('注册用户成功！',0)
   })
})
}

// 登录
exports.login = (req,res) => {
  const userInfo = req.body // 拿到用户的表单数据
  // 2.判断用户名是否存在，根据用户名查询数据
  const sqlstr = `select * from ev_users where username=?`
  
  db.query(sqlstr, userInfo.username, (err,results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err)
    if(results.length !== 1) return res.cc('登录失败')

   // console.log(results) // 登录成功后的返回结果([RowDataPacket {id,username,password,nickname,email,user_pic}])

  // 3.判断该用户输入的密码是否正确
  // 调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码，返回值是布尔值
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if(!compareResult) return res.cc('密码错误，登录失败')
    // 4.登录成功，在服务器端生成token字符串
    if(compareResult) {
      // 4.1 快速剔除 密码 和 头像 的值
      const user = { ...results[0], password: '', user_pic: '' }
      // 4.2 生成 Token 字符串,jwt.sign(加密的东西，密钥，配置对象)
      const token = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: '2h' // token 有效期为 10 个小时
      })
      // 4.3 token响应给客户端
      res.send({
        status: 0,
        message: '登录成功！',
        token:  'Bearer ' + token
      })
    } 
  })
}