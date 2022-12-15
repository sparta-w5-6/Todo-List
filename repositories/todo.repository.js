class TodoRepository {
  constructor(TodoModel) {
    this.todoModel = TodoModel;
  }
  createTodo = async ({ title, item, isDone, userId }) => {
    const todo = await this.todoModel.create({
      title,
      item,
      isDone,
      userId,
    });
    return todo;
  };
  findAllTodoList = async () => {
    const findAllTodoList = await this.todoModel.findAll({});
    return findAllTodoList;
  };
  findTodoList = async (todoId, userId) => {
    const todo = await this.todoModel.findOne({ where: { todoId, userId } });
    console.log('todo repo: ', todo);

    return todo;
  };

  updateTodo = async (todoId, title, userId, item) => {
    const update = await this.todoModel.update(
      { title, item },
      {
        where: { todoId, userId },
      },
    );

    return update;
  };
  deleteTodoList = async (todoId, userId) => {
    const remove = await this.todoModel.destroy({ where: { todoId, userId } });
    return remove;
  };

  //   doneTodo = async (todoId, userId) => {
  //     const todo = await Todos.findOne({ where: { todoId, userId } });

  //     if (!todo) {
  //       throw new Error('NO_EXISTS_TODO');
  //     }

  //     todo.isDone = !todo.isDone;
  //     todo.updatedAt = new Date();

  //     await todo.save();

  //     return todo.isDone;
  //   };

  //   setLikeCount = async (todoId, userId, count) => {
  //     const todo = await Todos.findOne({ where: { todoId, userId } });

  //     if (!todo) {
  //       throw new Error('NO_EXISTS_TODO');
  //     }

  //     todo.likeCount = count;
  //     todo.updatedAT = new Date();

  //     await todo.save();
  //   };
}

module.exports = TodoRepository;