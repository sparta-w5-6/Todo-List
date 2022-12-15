import { Router } from 'express';

import { TodoController } from '../controllers/todo.controller';

const authMiddleware = require('../middlewares/authMiddleware');

const todoController = new TodoController();

export const todoRouter = Router();

todoRouter.get('/', (req, res) => todoController.findAllTodoList(req, res));
todoRouter.post('/', authMiddleware, (req, res) => todoController.createTodo(req, res));
todoRouter.put('/:todoId', authMiddleware, (req, res) => todoController.updateTodo(req, res));
todoRouter.put('/:todoId/done', authMiddleware, (req, res) => todoController.doneTodo(req, res));
todoRouter.put('/:todoId/like', authMiddleware, (req, res) => todoController.likeTodo(req, res));
todoRouter.get('/:todoId', authMiddleware, (req, res) => todoController.findTodoList(req, res));
todoRouter.delete('/:todoId', authMiddleware, (req, res) => todoController.deleteTodoList(req, res));
