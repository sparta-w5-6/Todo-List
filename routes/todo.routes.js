const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo.controller')
const authMiddleware = require('../middlewares/authMiddleware');

const todoController = new TodoController();


router.get('/', todoController.findAllTodoList);
router.post('/', authMiddleware, todoController.createTodo);
router.put('/:todoId', authMiddleware, todoController.updateTodo);
router.put('/:todoId/done', authMiddleware, todoController.doneTodo);
router.put('/:todoId/like', authMiddleware, todoController.likeTodo);
router.get('/:todoId', authMiddleware, todoController.findTodoList);
router.delete('/:todoId', authMiddleware, todoController.deleteTodoList);

module.exports = router;
