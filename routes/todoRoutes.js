const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 获取所有待办事项
router.get('/get-todo', async (req, res) => {
    try {
        // 添加图标标识
        res.setHeader('X-Icon-Type', 'list');  // 列表图标
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: '获取待办事项失败', error: error.message });
    }
});

// 添加新的待办事项
router.post('/add-todo', async (req, res) => {
    try {
        // 添加图标标识
        res.setHeader('X-Icon-Type', 'plus');  // 添加图标
        const { value, isCompleted } = req.body;
        const newTodo = new Todo({
            value,
            isCompleted: isCompleted || false
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: '添加待办事项失败', error: error.message });
    }
});

// 更新待办事项状态
router.post('/update-todo/:id', async (req, res) => {
    try {
        // 添加图标标识
        res.setHeader('X-Icon-Type', 'edit');  // 编辑图标
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: '待办事项不存在' });
        }
        todo.isCompleted = !todo.isCompleted;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: '更新待办事项失败', error: error.message });
    }
});

// 删除待办事项
router.post('/del-todo/:id', async (req, res) => {
    try {
        // 添加图标标识
        res.setHeader('X-Icon-Type', 'delete');  // 删除图标
        const result = await Todo.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: '待办事项不存在' });
        }
        res.json({ message: '删除成功', deletedTodo: result });
    } catch (error) {
        res.status(400).json({ message: '删除待办事项失败', error: error.message });
    }
});

module.exports = router; 