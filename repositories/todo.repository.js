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
}

module.exports = TodoRepository;
