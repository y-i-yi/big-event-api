// 此为路由模块，只存放客户端的请求与处理函数之间的映射关系
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const routerHandler = require('../router_handler/user.js')

// 注册新用户
router.post('/reguser',routerHandler.reguser)

// 登录新用户
router.post('/login',routerHandler.login)



// 将路由对象共享出去
module.exports = router