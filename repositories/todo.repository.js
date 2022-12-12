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
}

module.exports = TodoRepository;
