// 导入express
const express = require('express')
// 创建express实例对象
const app = express()

// 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({extended:false}))

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

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)


// 启动服务器
app.listen(3007,() => {
    console.log('服务器正在http://127.0.0.1:3007运行')
})