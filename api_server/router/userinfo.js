const express = require('express')
const router = express.Router()

//  导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema } = require('../schema/user.js')

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户信息路由
router.get('/userinfo',userinfo_handler.getUserInfo)

// 更新用户信息路由
router.post('/userinfo',expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

module.exports = router