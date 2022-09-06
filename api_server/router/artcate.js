const express = require('express')
const router = express.Router()

// 导入路由处理函数
const art_routerHandler = require('../router_handler/artcate.js')

//  导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//  导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema } = require('../schema/artcate')


router.get('/cates', art_routerHandler.getartcate) // 获取文章列表
router.post('/addcates',expressJoi(add_cate_schema), art_routerHandler.addArticleCates) // 新增文章分类
router.get('/deletecate/:id',expressJoi(delete_cate_schema),art_routerHandler.deleteCateById) //根据id删除文章

module.exports = router