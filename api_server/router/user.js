// 此为路由模块，只存放客户端的请求与处理函数之间的映射关系
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const routerHandler = require('../router_handler/user.js')

//  导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//  导入需要的验证规则对象
const { reg_log_schema } = require('../schema/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_log_schema), routerHandler.reguser)

// 登录新用户
router.post('/login', routerHandler.login)



// 将路由对象共享出去
module.exports = router