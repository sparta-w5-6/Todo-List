const CommentController = require('../../../controllers/comment.controller');

// comment.service.js 에서는 아래 5개의 Method만을 사용합니다.
let mockCommentService = {
  findAllComment: jest.fn(),
  createComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let commentController = new CommentController();
// commentController의 Service를 Mock Service로 변경합니다.
commentController.commentService = mockCommentService;

describe('Layered Architecture Pattern Comment Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Comment Controller createComment Method by Success', async () => {
    // commentController의 createComment Method가 실행되기 위한 Body 입력 인자들입니다.
    const createCommentRequestBodyParams = {
      comment: 'Comment_Success',
      userId: 1,
      todoId: 1,
    };

    // 입력 인자를 createComment Method를 실행할 때 삽입하지않고, mockRequest의 body를 createCommentRequestBodyParams 변수로 설정합니다.
    mockRequest.body = createCommentRequestBodyParams;

    // CommentService의 createComment Return 값을 설정하는 변수입니다.
    const createCommentReturnValue = {
      commentId: 1,
      userId: 1,
      comment: 'Comment_Success',
      editCheck: 'false',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    // CommentService.createComment Method의 Return 값을 createCommentReturnValue 변수로 설정합니다.
    mockCommentService.createComment = jest.fn(() => createCommentReturnValue);

    // PostsController의 createComment Method를 실행합니다.
    await commentController.createComment(mockRequest, mockResponse);

    /** CommentController.createComment 성공 케이스 **/
    // 1. req.body에 들어있는 값을 바탕으로 CommentService.creteComment가 호출됩니다.
    // 2. res.status는 1번 호출되고, 201의 값으로 호출됩니다.
    // 3. CommentService.creteComment에서 반환된 createCommentData 변수를 이용해 res.json Method가 호출됩니다.

    // 1. req.body에 들어있는 값을 바탕으로 CommentService.creteComment가 호출됩니다.
    expect(mockCommentService.createComment).toHaveBeenCalledTimes(1);
    expect(mockCommentService.createComment).toHaveBeenCalledWith(
      createCommentRequestBodyParams.comment,
      createCommentRequestBodyParams.userId,
      createCommentRequestBodyParams.todoId,
    );

    // 2. res.status는 1번 호출되고, 201의 값으로 호출됩니다.
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. CommentService.creteComment에서 반환된 createCommentData 변수를 이용해 res.json Method가 호출됩니다.
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createCommentReturnValue,
    });
  });
});