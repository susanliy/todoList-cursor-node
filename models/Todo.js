// 导入 mongoose
const mongoose = require('mongoose');

// 定义待办事项的数据模式
const todoSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true, // 设置为必填项
        trim: true     // 自动删除首尾空格
    },
    isCompleted: {
        type: Boolean,
        default: false // 设置默认值为 false
    }
}, {
    timestamps: true   // 自动添加 createdAt 和 updatedAt 字段
});

// 创建并导出 Todo 模型
module.exports = mongoose.model('Todo', todoSchema); 