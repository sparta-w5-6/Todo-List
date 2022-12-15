const {Todos} = require('../models');
const TodoRepository = require('../repositories/todo.repository');
const {
  InvalidParamsError,
  NotFoundError,
} = require('../exception/index.exception');

// const LikeRepository = require('../repositories/like.repository');
class TodoService {
  todoRepository = new TodoRepository(Todos);
  // LikeRepository = new LikeRepository();
  createTodo = async (title, item, isDone, userId) => {
    //title, item 미입력시 에러 처리
    if (!title || !item) {
      throw new InvalidParamsError('입력 값이 올바르지 않습니다');
    }
    const todo = await this.todoRepository.createTodo({
      title,
      item,
      isDone,
      userId,
    });
    return todo;
  };
  updateTodo = async (todoId, title, item, userId) => {
    //todo 게시글이 존재하지 않을 경우 에러 처리
    const todoExists = await this.todoRepository.findTodoList(todoId, userId);
    if (!todoExists) {
      throw new NotFoundError('todo게시글이 존재하지 않습니다');
    }
    //title, item 미입력시 에러 처리
    if (!title || !item) {
      throw new InvalidParamsError('입력 값이 올바르지 않습니다');
    }
    await this.TodoRepository.updateTodo(todoId, title, item, userId);
    const updateTodoList = await this.todoRepository.findTodoList(
      todoId,
      userId,
    );
    return updateTodoList;
  };
  // doneTodo = async (todoId, userId) => {
  //   return this.TodoRepository.doneTodo(todoId, userId);
  // };
  // likeTodo = async (todoId, userId) => {
  //   const like = await this.LikeRepository.toggleLike(todoId, userId);
  //   const likeCount = await this.LikeRepository.getLikeCount(todoId);
  //   await this.TodoRepository.setLikeCount(todoId, userId, likeCount);
  //   return like.isLike;
  // };
  findAllTodoList = async () => {
    const findAllTodoList = await this.todoRepository.findAllTodoList({});
    findAllTodoList.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return findAllTodoList;
  };
  findTodoList = async (todoId, userId) => {
    const findTodoList = await this.todoRepository.findTodoList(todoId, userId);
    return findTodoList;
  };
  deleteTodoList = async (todoId, userId) => {
    //todo 게시글이 존재하지 않을 경우 에러 처리
    const todoExists = await this.todoRepository.findTodoList(todoId, userId);
    if (!todoExists) {
      throw new NotFoundError('todo게시글이 존재하지 않습니다');
    }
    await this.todoRepository.deleteTodoList(todoId, userId);
    return this.deleteTodoList;
  };
}
module.exports = TodoService;
