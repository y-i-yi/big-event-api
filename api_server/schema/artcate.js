const Joi = require('joi') // 导入 Joi 来定义验证规则

// 定义 分类名称 和 分类别名 的校验规则
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()

exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}