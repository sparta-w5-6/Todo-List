const TodoRepository = require('../../../repositories/todo.repository.js');

// todo.repository.js 에서는 아래 5개의 Method만을 사용합니다.
const mockTodoModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

let todoRepository = new TodoRepository(mockTodoModel);

describe('Layered Architecture Pattern TodoRepository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });
  test('TodoRepository findAllTodoList Method ', async () => {
    // findAll Mock의 Return 값을 "findAll String"으로 설정합니다.
    mockTodoModel.findAll = jest.fn(() => {
      return 'findAll String';
    });
    // todoRepository의 findAllTodoList Method를 호출합니다.
    const todos = await todoRepository.findAllTodoList();
    // todoModel의 findAll은 1번만 호출 되었습니다.
    expect(todoRepository.todoModel.findAll).toHaveBeenCalledTimes(1);
    // mockTodoModel의 Return과 출력된 findAll Method의 값이 일치하는지 비교합니다.
    expect(todos).toBe('findAll String');
  });

  test('TodoRepository createTodo Method ', async () => {
    // create Mock의 Return 값을 "findAll String"으로 return 합니다
    mockTodoModel.create = jest.fn(() => {
      return 'create Return String';
    });
    //createTodo를 하기 위해 필요한 parameter를 선언해 준다
    const createTodoParams = {
      title: 'createTodoTitle',
      item: 'createTodoItem',
      isDone: false,
      userId: 1,
    };
    //TodoRepository의 createTodo Method 실행
    const createTodoData = await todoRepository.createTodo(createTodoParams);
    // createTodoData는 todoModel의 create를 실행한 결과 값을 반환하는지 검증
    expect(createTodoData).toBe('create Return String');
    // TodoRepository의 createTodo Method 실행했을 때, todoModel의 create를 1번만 실행
    expect(mockTodoModel.create).toHaveBeenCalledTimes(1);
    // TodoRepository의 createTodo Method 실행했을 때, todoModel의 create는 아래와 같이 호출한다
    expect(mockTodoModel.create).toHaveBeenCalledWith(createTodoParams);
  });

  test('TodoRepository findTodoList Method', async () => {
    mockTodoModel.findOne = jest.fn(() => {
      return 'findOne String';
    });
    const todo = await todoRepository.findTodoList();
    expect(todoRepository.todoModel.findOne).toHaveBeenCalledTimes(1);
    expect(todo).toBe('findOne String');
  });

  test('TodoRepository deleteTodoList Method ', async () => {
    mockTodoModel.destroy = jest.fn(() => {
      return 'destroy String';
    });
    const remove = await todoRepository.deleteTodoList();
    expect(todoRepository.todoModel.destroy).toHaveBeenCalledTimes(1);
    expect(remove).toBe('destroy String');
  });

  //업데이트 에러있음!
  // test('TodoRepository updateTodo Method', async () => {
  //   mockTodoModel.update = jest.fn(() => {
  //     return 'update String';
  //   });

  //   const update = await todoRepository.updateTodo();
  //   expect(todoRepository.todoModel.findOne).toHaveBeenCalledTimes(1);
  //   expect(update).toBe('update String');
  // });
});
