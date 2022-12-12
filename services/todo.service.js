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

  updateTodo = async (todoId, title, item) => {
    //todo 게시글이 존재하지 않을 경우 에러 처리
    // const todoExists = await this.TodoRepository.findOne(todoId);
    // console.log('todoExists:', todoExists);
    // if (!todoExists) {
    //   throw new doesntExistError('todo게시글이 존재하지 않습니다');
    // }
    //title, item 미입력시 에러 처리
    // if (!title || !item) {
    //   throw new Error('입력 값이 올바르지 않습니다');
    // }
    console.log('여기에요여기', todoId);
    await this.TodoRepository.updateTodo(todoId, title, item);

    // console.log('update Index: ', update[0]);
    const updateTodoList = await this.TodoRepository.findTodoList({
      todoId,
    });
    console.log('여기에요', updateTodoList);
    return updateTodoList;
  };
}

module.exports = TodoService;
