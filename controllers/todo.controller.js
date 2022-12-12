const express = require('express');
const { Todos, Users, Likes } = require('../models');
const TodoService = require('../services/todo.service');

class TodoController {
  constructor() {
    this.TodoService = new TodoService();
  }
  createTodo = async (req, res) => {
    try {
      const { title, item, isDone, userId } = req.body;

      const todo = await this.ToService.createTodo({
        title,
        item,
        isDone,
        userId,
      });
      res.status(201).json({ result: todo });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = TodoController;
