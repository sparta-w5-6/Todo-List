import { Model } from 'sequelize';
import { TodoRepository, TodoInput } from '../repositories/todo.repository';
import { LikeRepository } from '../repositories/like.repository';
const {
  InvalidParamsError,
  NotFoundError,
} = require('../exception/index.exception');

export class TodoService {
  private readonly TodoRepository = new TodoRepository();
  private readonly LikeRepository = new LikeRepository();

  public async createTodo(todoInput: TodoInput): Promise<unknown> {
    const { title, item, isDone, userId } = todoInput;

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
  }

  public async updateTodo(
    todoId: number,
    title: string,
    item: string,
    userId: number,
  ): Promise<unknown> {
    // console.log('todoId:', todoId);
    //todo 게시글이 존재하지 않을 경우 에러 처리
    const todoExists = await this.TodoRepository.findTodoList(todoId, userId);

    if (!todoExists) {
      throw new NotFoundError('todo게시글이 존재하지 않습니다');
    }
    //title, item 미입력시 에러 처리
    if (!title || !item) {
      throw new InvalidParamsError('입력 값이 올바르지 않습니다');
    }
    await this.TodoRepository.updateTodo(todoId, title, userId, item);
    const updateTodoList = await this.TodoRepository.findTodoList(
      todoId,
      userId,
    );
    return updateTodoList;
  }

  public async doneTodo(todoId: number, userId: number): Promise<unknown> {
    return this.TodoRepository.doneTodo(todoId, userId);
  }

  public async likeTodo(todoId: number, userId: number): Promise<unknown> {
    const like = <Model & { isLike: boolean }>(
      await this.LikeRepository.toggleLike(todoId, userId)
    );
    const likeCount = await this.LikeRepository.getLikeCount(todoId);

    await this.TodoRepository.setLikeCount(todoId, userId, likeCount);

    return like.isLike;
  }

  public async findAllTodoList(): Promise<unknown> {
    const findAllTodoList = await this.TodoRepository.findAllTodoList();
    (<{ createdAt: Date }[]>findAllTodoList).sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return findAllTodoList;
  }

  public async findTodoList(todoId: number, userId: number): Promise<unknown> {
    const findTodoList = await this.TodoRepository.findTodoList(todoId, userId);
    // console.log('findTodoList service: ', findTodoList);
    return findTodoList;
  }

  public async deleteTodoList(
    todoId: number,
    userId: number,
  ): Promise<unknown> {
    //todo 게시글이 존재하지 않을 경우 에러 처리
    const todoExists = await this.TodoRepository.findTodoList(todoId, userId);

    if (!todoExists) {
      throw new NotFoundError('todo게시글이 존재하지 않습니다');
    }
    await this.TodoRepository.deleteTodoList(todoId, userId);
    return this.deleteTodoList;
  }
}
