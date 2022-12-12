const express = require('express');
const { Users, Todos, Likes } = require('../models');
const TodoRepository = require('../repositories/todo.repository');

class TodoService {
  constructor() {
    this.TodoRepository = new TodoRepository();
  }
  createTodo = async ({ title, item, isDone, userId }) => {
    //title, item 미입력시 에러 처리
    if (!title || !item) {
      throw new Error('입력 값이 올바르지 않습니다');
    }
    const todo = await this.TodoRepository.createTodo({
      title,
      item,
      isDone,
      userId,
    });
    return todo;
  };
}

module.exports = TodoService;
