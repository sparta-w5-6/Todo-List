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
  findTodoList = async (todoId, userId) => {
    const todo = await Todos.findOne({ where: { todoId, userId } });
    console.log('todo repo: ', todo);

    return todo;
  };
  /* DB에 업데이트는 되는데 400 error가 뜬다. 
  Error: WHERE parameter "userId" has invalid "undefined" value
  * */
  updateTodo = async (todoId, title, userId, item) => {
    const update = await Todos.update(
      { title, item },
      {
        where: { todoId, userId },
      },
    );
    // console.log('update: ', update);

    return update;
  };
  deleteTodoList = async (todoId, userId) => {
    const remove = await Todos.destroy({ where: { todoId, userId } });
    return remove;
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
