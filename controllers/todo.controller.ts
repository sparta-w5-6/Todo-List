import { Request, Response } from 'express';

import { TodoService } from '../services/todo.service';

export class TodoController {
  private readonly TodoService = new TodoService();

  public async createTodo(req: Request, res: Response): Promise<void> {
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
      res.status(400).json({ errorMessage: (<Error>error).message });
    }
  }

  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { todoId } = req.params;
      const { title, item } = req.body;
      const { userId } = res.locals.user;
      console.log('controller userId: ', userId);

      const update = await this.TodoService.updateTodo(
        Number(todoId),
        title,
        item,
        Number(userId),
      );
      // console.log('update controller: ', update);

      res.status(201).json({ result: 'todo 게시글 수정 완료' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: (<Error>error).message });
    }
  }

  public async doneTodo(req: Request, res: Response): Promise<void> {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;

      const result = await this.TodoService.doneTodo(Number(todoId), Number(userId));

      if (result) {
        res.status(200).json({ result, message: '완료를 축하합니다' });
      } else {
        res.status(200).json({ result, message: '취소 완료' });
      }
    } catch (error) {
      console.error(error);

      if ((<Error>error).message === 'NO_EXISTS_TODO') {
        res.status(404).json({ errorMessage: 'todo item이 존재하지 않습니다' });
      } else {
        res.status(500).json({ errorMessage: '알 수 없는 오류 발생' });
      }
    }
  }

  public async likeTodo(req: Request, res: Response): Promise<void> {
    const { todoId } = req.params;
    const { userId } = res.locals.user;

    try {
      const result = await this.TodoService.likeTodo(Number(todoId), Number(userId));

      res.status(200).json({ result });
    } catch (error) {
      console.error(error);

      if ((<Error>error).message === 'NO_TODO') {
        res.status(404).json({ errorMessage: 'todo가 존재하지 않아요.' });
      } else {
        res.status(500).json({ errorMessage: '알 수 없는 오류 발생' });
      }
    }
  }

  public async findAllTodoList(req: Request, res: Response): Promise<void> {
    try {
      const findAllTodoList = await this.TodoService.findAllTodoList();
      res.status(200).json({ result: findAllTodoList });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: (<Error>error).message });
    }
  }

  public async findTodoList(req: Request, res: Response): Promise<void> {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      const findTodoList = await this.TodoService.findTodoList(Number(todoId), Number(userId));
      res.status(200).json({ result: findTodoList });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: (<Error>error).message });
    }
  }

  public async deleteTodoList(req: Request, res: Response): Promise<void> {
    try {
      const { todoId } = req.params;
      const { userId } = res.locals.user;
      const deleteTodoList = await this.TodoService.deleteTodoList(
        Number(todoId),
        Number(userId),
      );
      res.status(200).json({ result: 'todo 게시글 삭제 완료' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: (<Error>error).message });
    }
  }
}
