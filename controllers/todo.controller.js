const express = require('express');
const { Todos, Users, Likes } = require('../models');
const TodoService = require('../services/todo.service');

class TodoController {
  constructor() {
    this.TodoService = new TodoService();
  }
  createTodo = async (req, res) => {
    try {
      const { title, item, isDone } = req.body;
      const { userId } = res.locals.user;

      const todo = await this.TodoService.createTodo({
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

  updateTodo = async (req, res) => {
    try {
      const { todoId } = req.params;
      const { title, item } = req.body;
      const { userId } = res.locals.user;

      // trouble shooting
      // 인자 순서 맞춥시다......
      const update = await this.TodoService.updateTodo(
        todoId,
        title,
        item,
        userId,
      );
      console.log('update controller: ', update);

      res.status(201).json({ result: update });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };

  doneTodo = async (req, res) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;

      const result = await this.TodoService.doneTodo(todoId, userId);

      if (result) {
        res.status(200).json({ result, message: '완료를 축하합니다' });
      } else {
        res.status(200).json({ result, message: '취소 완료' });
      }
    } catch (error) {
      console.error(error);

      if (error.message === 'NO_EXISTS_TODO') {
        res.status(404).json({ errorMessage: 'todo item이 존재하지 않습니다' });
      } else {
        res.status(500).json({ errorMessage: '알 수 없는 오류 발생' });
      }
    }
  };
}

module.exports = TodoController;
