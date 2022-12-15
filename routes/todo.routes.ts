import { Router } from 'express';

import { TodoController } from '../controllers/todo.controller';

const authMiddleware = require('../middlewares/authMiddleware');

const todoController = new TodoController();

export const todoRouter = Router();

todoRouter.get('/', todoController.findAllTodoList);
todoRouter.post('/', authMiddleware, todoController.createTodo);
todoRouter.put('/:todoId', authMiddleware, todoController.updateTodo);
todoRouter.put('/:todoId/done', authMiddleware, todoController.doneTodo);
todoRouter.put('/:todoId/like', authMiddleware, todoController.likeTodo);
todoRouter.get('/:todoId', authMiddleware, todoController.findTodoList);
todoRouter.delete('/:todoId', authMiddleware, todoController.deleteTodoList);