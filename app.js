// 导入必要的模块
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 导入路由
const todoRoutes = require('./routes/todoRoutes');

// 创建 Express 应用实例
const app = express();

// 中间件配置
app.use(cors({
    exposedHeaders: ['X-Icon-Type']  // 允许前端访问自定义头部
}));                          // 启用 CORS
app.use(express.json());                  // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 连接数据库
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'todolist',  // 指定数据库名称
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('数据库连接成功'))
.catch((err) => console.error('数据库连接失败:', err));

// 注册路由
app.use('/api', todoRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '服务器内部错误', error: err.message });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
}); 