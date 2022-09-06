// 1.导入express
const express = require('express')
const app = express() // 创建express实例对象

const Joi = require('joi')

// 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({extended:false}))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


// 在路由之前封装res.cc函数
app.use((req, res, next) => {
    // status默认值为1，表示失败，err可能为错误对象也可能为描述错误的字符串
    res.cc = (err,status=1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})


// 在路由之前解析 token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config') // 导入配置文件

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 2.导入并使用路由模块
const userRouter = require('./router/user') // 用户路由
const userinfoRouter = require('./router/userinfo.js') // 用户信息路由
const artcateRouter = require('./router/artcate') // 文章分类
const articleRouter = require('./router/article') // 导入并使用文章路由模块


app.use('/api',userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article',artcateRouter)
app.use('/my/article', articleRouter) // 为文章的路由挂载统一的访问前缀 /my/article

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof Joi.ValidationError)  return res.cc(err)

    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

    // 未知错误
    res.cc(err)
  })


// 3.启动服务器
app.listen(3007,() => {
    console.log('服务器正在http://127.0.0.1:3007运行')
})