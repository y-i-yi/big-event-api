// 用户信息验证规则模块
const Joi = require('joi') // 导入 Joi 来定义验证规则

//  定义验证规则
// * string() 值必须是字符串
// * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
// * min(length) 最小长度
// * max(length) 最大长度
// * required() 值是必填项，不能为 undefined
// * pattern(正则表达式) 值必须符合正则表达式的规则

exports.reg_log_schema = {
  // 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(1).max(10).required(),
    password: Joi.string().pattern(/^[\S]{6,15}$/).required()
  }
}