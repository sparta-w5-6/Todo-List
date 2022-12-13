const express = require('express');
const { Todos } = require('../models');
const router = express.Router();
const TodoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const todoController = new TodoController();

router.post('/', authMiddleware, todoController.createTodo);
router.put('/:todoId', authMiddleware, todoController.updateTodo);
router.put('/:todoId/done', authMiddleware, todoController.doneTodo);
router.put('/:todoId/like', authMiddleware, todoController.likeTodo);
module.exports = router;
