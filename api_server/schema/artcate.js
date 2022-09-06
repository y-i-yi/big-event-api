const Joi = require('joi') // 导入 Joi 来定义验证规则

// 定义 分类名称 和 分类别名 的校验规则
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()
// 定义 分类Id 的校验规则
const id = Joi.number().integer().min(1).required()


// 新增文章分类的规则对象
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}

// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
  params: {
    id,
  },
}