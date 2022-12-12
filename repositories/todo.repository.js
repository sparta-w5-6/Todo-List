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
  findOne = async (todoId, userId) => {
    const find = await Todos.findOne({ where: { todoId, userId } });
    return find;
  };

  updateTodo = async (todoId, title, item, userId) => {
    const update = await Todos.update(
      { title, item },
      { where: { todoId, userId } },
    );
    console.log('update: ', update);

    return update;
  };

  doneTodo = async (todoId, userId) => {
    const todo = await Todos.findOne({ where: { todoId, userId } });

    if (!todo) {
      throw new Error('todo item이 존재하지 않습니다');
    }

    todo.isDone = !todo.isDone;
    todo.updatedAt = new Date();

    await todo.save();

    return todo.isDone;
  }
}

module.exports = TodoRepository;
