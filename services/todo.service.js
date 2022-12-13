const express = require('express');
const { Users, Todos, Likes } = require('../models');
const TodoRepository = require('../repositories/todo.repository');
const {
  DoesntExistError,
  InvalidParamsError,
} = require('../exception/index.exception');
const LikeRepository = require('../repositories/like.repository');

class TodoService {
  constructor() {
    TodoRepository = new TodoRepository();
    LikeRepository = new LikeRepository();
  }
  createTodo = async ({ title, item, isDone, userId }) => {
    //title, item 미입력시 에러 처리
    if (!title || !item) {
      throw new InvalidParamsError('입력 값이 올바르지 않습니다');
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
    // console.log('todoId:', todoId);
    //todo 게시글이 존재하지 않을 경우 에러 처리
    const todoExists = await this.TodoRepository.findTodoList(todoId);

    if (todoExists.todoId !== parseInt(todoId)) {
      throw new DoesntExistError('todo게시글이 존재하지 않습니다');
    }
    //title, item 미입력시 에러 처리
    if (!title || !item) {
      throw new InvalidParamsError('입력 값이 올바르지 않습니다');
    }
    await this.TodoRepository.updateTodo(todoId, title, item);
    const updateTodoList = await this.TodoRepository.findTodoList(todoId);
    return updateTodoList;
  };
  doneTodo = async (todoId, userId) => {
    return this.TodoRepository.doneTodo(todoId, userId);
  };
  likeTodo = async (todoId, userId) => {
    const like = await this.LikeRepository.toggleLike(todoId, userId);
    const likeCount = await this.LikeRepository.getLikeCount(todoId);

    await this.TodoRepository.setLikeCount(todoId, userId, likeCount);

    return like.isLike;
  };

  findAllTodoList = async ({}) => {
    const findAllTodoList = await this.TodoRepository.findAllTodoList({});
    findAllTodoList.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return findAllTodoList;
  };
  findTodoList = async (todoId, userId) => {
    // console.log('todoId service: ', todoId);

    const findTodoList = await this.TodoRepository.findTodoList(todoId, userId);
    // console.log('findTodoList service: ', findTodoList);
    return findTodoList;
  };
}

module.exports = TodoService;
