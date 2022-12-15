const express = require('expres');
const { Todos, Users, Likes } = require('../models');
const TodoService = require('../services/todo.service');
class TodoController {
  TodoService = new TodoService();
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
      console.log('controller userId:', userId);
      // trouble shooting
      // 인자 순서 맞춥시다......
      const update = await this.TodoService.updateTodo(
        todoId,
        title,
        item,
        userId,
      );
      // console.log('update controller: ', update);
      res.status(201).json({ result: 'todo 게시글 수정 완료' });
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
  likeTodo = async (req, res) => {
    const { todoId } = req.params;
    const { userId } = res.locals.user;
    try {
      const result = await this.TodoService.likeTodo(todoId, userId);
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      if (error.message === 'NO_TODO') {
        res.status(404).json({ errorMessage: 'todo가 존재하지 않아요.' });
      } else {
        res.status(500).json({ errorMessage: '알 수 없는 오류 발생' });
      }
    }
  };
  findAllTodoList = async (req, res) => {
    try {
      const findAllTodoList = await this.TodoService.findAllTodoList({});
      return res.status(200).json({ result: findAllTodoList });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
  findTodoList = async (req, res) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      const findTodoList = await this.TodoService.findTodoList(todoId, userId);
      return res.status(200).json({ result: findTodoList });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
  deleteTodoList = async (req, res) => {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      const deleteTodoList = await this.TodoService.deleteTodoList(
        todoId,
        userId,
      );
      return res.status(200).json({ result: 'todo 게시글 삭제 완료' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}
module.exports = TodoController;
