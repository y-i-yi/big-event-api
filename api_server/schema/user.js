// 用户信息验证规则模块
const Joi = require('joi') // 导入 Joi 来定义验证规则

//  定义验证规则
// * string() 值必须是字符串
// * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
// * min(length) 最小长度
// * max(length) 最大长度
// * required() 值是必填项，不能为 undefined
// * pattern(正则表达式) 值必须符合正则表达式的规则
const id = Joi.number().integer().min(1).required()
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()

// 登录注册的验证对象
exports.reg_log_schema = {
  // 校验 req.body 中的数据
  body: {
    username,
    password
  }
}

// 更新用户基本信息的验证对象
exports.update_userinfo_schema = {
  // 校验 req.body 中的数据
  body: {
    id,
    nickname,
    email
  }
}

// 更新用户密码的验证对象
exports.update_password_schema = {
  body:{
    oldPwd: password,
    // joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
  }
}

// 用户更新头像的验证规则对象
exports.update_avatar_schema = {
  body: {
    // dataUri() 指的是如下格式的字符串数据：
    // data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
    avatar: Joi.string().dataUri().required()
  }
}
