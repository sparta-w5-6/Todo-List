const express = require('express');
const { Todos, Users, Likes } = require('../models');
const { Op } = require('sequelize');

class TodoRepository {
  createTodo = async ({ title, item, isDone, userId }) => {
    const todo = await Todos.create({
      title,
      item,
      isDone,
      userId,
    });
    return todo;
  };
  findAllTodoList = async ({}) => {
    const findAllTodoList = await Todos.findAll({});
    return findAllTodoList;
  };
  findTodoList = async (todoId) => {
    const todo = await Todos.findOne({ where: { todoId } });
    console.log('todo: ', todo);

    return todo;
  };
  updateTodo = async (todoId, title, item) => {
    const update = await Todos.update({ title, item }, { where: { todoId } });
    console.log('update: ', update);

    return update;
  };

  doneTodo = async (todoId, userId) => {
    const todo = await Todos.findOne({ where: { todoId, userId } });

    if (!todo) {
      throw new Error('NO_EXISTS_TODO');
    }

    todo.isDone = !todo.isDone;
    todo.updatedAt = new Date();

    await todo.save();

    return todo.isDone;
  };

  setLikeCount = async (todoId, userId, count) => {
    const todo = await Todos.findOne({ where: { todoId, userId } });

    if (!todo) {
      throw new Error('NO_EXISTS_TODO');
    }

    todo.likeCount = count;
    todo.updatedAT = new Date();

    await todo.save();
  };
}

module.exports = TodoRepository;
