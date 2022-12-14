const { Todos } = require('../models');

export interface TodoInput {
  title: string;
  item: string;
  isDone: boolean;
  userId: number;
}

export class TodoRepository {
  public async createTodo(todoInput: TodoInput): Promise<unknown> {
    const { title, item, isDone, userId } = todoInput;

    const todo = await Todos.create({
      title,
      item,
      isDone,
      userId,
    });
    return todo;
  }

  public async findAllTodoList(): Promise<unknown> {
    const findAllTodoList = await Todos.findAll({});
    return findAllTodoList;
  }

  public async findTodoList(todoId: number, userId: number): Promise<unknown> {
    const todo = await Todos.findOne({ where: { todoId, userId } });
    console.log('todo repo: ', todo);

    return todo;
  }

  /* DB에 업데이트는 되는데 400 error가 뜬다. 
  Error: WHERE parameter "userId" has invalid "undefined" value
  * */
  public async updateTodo(
    todoId: number,
    title: string,
    userId: number,
    item: string,
  ): Promise<unknown> {
    const update = await Todos.update(
      { title, item },
      {
        where: { todoId, userId },
      },
    );
    // console.log('update: ', update);

    return update;
  }

  public async deleteTodoList(todoId: number, userId: number): Promise<unknown> {
    const remove = await Todos.destroy({ where: { todoId, userId } });
    return remove;
  }

  public async doneTodo(todoId: number, userId: number): Promise<unknown> {
    const todo = await Todos.findOne({ where: { todoId, userId } });

    if (!todo) {
      throw new Error('NO_EXISTS_TODO');
    }

    todo.isDone = !todo.isDone;
    todo.updatedAt = new Date();

    await todo.save();

    return todo.isDone;
  }

  public async setLikeCount(todoId: number, userId: number, count: number): Promise<void> {
    const todo = await Todos.findOne({ where: { todoId, userId } });

    if (!todo) {
      throw new Error('NO_EXISTS_TODO');
    }

    todo.likeCount = count;
    todo.updatedAT = new Date();

    await todo.save();
  }
}
