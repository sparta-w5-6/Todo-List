const express = require('express');
const { Todos } = require('../models');
const router = express.Router();
const TodoController = require('../controllers/todo.controller');

const todoController = new TodoController();

router.post('/', todoController.createTodo);
module.exports = router;
