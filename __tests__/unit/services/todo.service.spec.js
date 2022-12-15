const {
  InvalidParamsError,
  NotFoundError,
} = require('../../../exception/index.exception');
const TodoService = require('../../../services/todo.service.js');

let mockTodoRepository = {
  findAllTodoList: jest.fn(),
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodoList: jest.fn(),
};

let todoService = new TodoService();
// todoService의 Repository를 Mock Repository로 변경합니다.
todoService.todoRepository = mockTodoRepository;
describe('Layered Architecture Pattern Todo Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  //   it('throws error with invalid params', async () => {
  //     expect(() => InvalidParamsError(null)).toThrow(Error);
  //   });
  //   test('Todo Service createTodo Method', async () => {
  //     const createTodoParams = await {
  //       title: 'user3',
  //       item: 'test3',
  //       isDone: false,
  //     };

  //     const createTodoParamsReturnValue = {
  //       todId: 3,
  //       userId: 3,
  //       title: 'user3',
  //       item: 'test3',
  //       isDone: false,
  //       createdAt: new Date().toString,
  //       updatedAt: new Date().toString,
  //     };
  //     mockTodoRepository.createTodo = jest.fn(() => {
  //       return createTodoParamsReturnValue;
  //     });
  //     const createTodo = await todoService.createTodo();
  //     expect(createTodo).toEqual(createTodoParamsReturnValue);

  //   });

  test('Todo Service findAll Method', async () => {
    const findAllTodoListReturnValue = await [
      {
        todoId: 2,
        userId: 2,
        title: 'user2',
        item: 'test2',
        likeCount: null,
        isDone: false,
        createdAt: '2022-12-13T12:08:13.000Z',
        updatedAt: '2022-12-13T12:08:13.000Z',
      },
      {
        todoId: 1,
        userId: 1,
        title: 'user1',
        item: 'test1',
        likeCount: null,
        isDone: false,
        createdAt: '2022-12-13T09:43:24.000Z',
        updatedAt: '2022-12-13T12:01:19.000Z',
      },
    ];
    // Repository의 findAllTodoList Method를 Mocking하고, findAllTodoListReturnValue를 Return 값으로 변경합니다.
    mockTodoRepository.findAllTodoList = jest.fn(() => {
      return findAllTodoListReturnValue;
    });

    // TodoService의 findAllTodoList Method를 실행합니다.
    const allTodos = await todoService.findAllTodoList();

    // allTodos의 값이 todoRepository의 findAllTodoList Method 결과값을 내림차순으로 정렬한 것이 맞는지 검증합니다.
    expect(allTodos).toEqual(
      findAllTodoListReturnValue.sort((a, b) => {
        return b.createdAt - a.createdAt;
      }),
    );

    // PostRepository의 findAllPost Method는 1번 호출되었는지 검증합니다.
    expect(mockTodoRepository.findAllTodoList).toHaveBeenCalledTimes(1);
  });
  test('Todo Service findTodoList Method', async () => {
    const findTodoListReturnValue = await [
      {
        todoId: 1,
        userId: 1,
        title: 'user1',
        item: 'test1',
        likeCount: null,
        isDone: false,
        createdAt: '2022-12-13T09:43:24.000Z',
        updatedAt: '2022-12-13T12:01:19.000Z',
      },
    ];
    // Repository의 findTodoList Method를 Mocking하고, findTodoListReturnValue를 Return 값으로 변경합니다.
    mockTodoRepository.findTodoList = jest.fn(() => {
      return findTodoListReturnValue;
    });

    // TodoService의 findTodoList Method를 실행합니다.
    const todo = await todoService.findTodoList();

    // todo의 값이 todoRepository의 findTodoList Method 결과값인지 검증합니다.
    expect(todo).toEqual(findTodoListReturnValue);

    // PostRepository의 findAllPost Method는 1번 호출되었는지 검증합니다.
    expect(mockTodoRepository.findTodoList).toHaveBeenCalledTimes(1);
  });
  //   it('throws error with  NotFound Error', async () => {
  //     expect(() => NotFoundError(null, 'bar')).toThrow(Error);
  //   });

  //   test('Todo Service deleteTodoList Method', async () => {
  //     /** deleteTodoList 성공케이스 비지니스 로직 **/
  //     //1. todoId, userId로 게시글을 찾고 (TodoRepository.findTodoList)
  //     //2. todoId, uderId 로 게시글 삭제 (TodoRepository.deleteTodoList)
  //     const findTodoListReturnValue = await [
  //       {
  //         todoId: 1,
  //         userId: 1,
  //         title: 'user1',
  //         item: 'test1',
  //         likeCount: null,
  //         isDone: false,
  //         createdAt: '2022-12-13T09:43:24.000Z',
  //         updatedAt: '2022-12-13T12:01:19.000Z',
  //       },
  //     ];
  //     mockTodoRepository.findTodoList = jest.fn(() => {
  //       return findTodoListReturnValue;
  //     });
  //     const remove = await todoService.deleteTodoList(1, 1);

  //     // expect(mockTodoRepository.findTodoList).toHaveBeenCalledTimes(1);
  //     // expect(mockTodoRepository.findTodoList).toHaveBeenCalledWith(
  //     //   findTodoListReturnValue.todoId,
  //     //   findTodoListReturnValue.userId,
  //     // );
  //     expect(mockTodoRepository.deleteTodoList).toHaveBeenCalledTimes(1);
  //     expect(mockTodoRepository.deleteTodoList).toHaveBeenCalledWith(
  //       findTodoListReturnValue.todoId,
  //       findTodoListReturnValue.todoId,
  //     );
  //     expect(deleteTodoList).toEqual(findTodoListReturnValue);
  //   });
});
