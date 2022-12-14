const CommentRepository = require('../../../repositories/comment.repository.js');

// comment.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockCommentModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

let commentRepository = new CommentRepository(mockCommentModel);

describe('Layered Architecture Pattern Comment Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('Comment Repository findAllComment Method', async () => {
    // findAll Mock의 Return 값을 "findAll String"으로 설정합니다.
    mockCommentModel.findAll = jest.fn(() => {
      return 'findAll String';
    });

    // commentRepository의 findAllComment Method를 호출합니다.
    const comments = await commentRepository.findAllComment();

    // commentsModel의 findAll은 1번만 호출 되었습니다.
    expect(commentRepository.commentsModel.findAll).toHaveBeenCalledTimes(1);

    // mockPostsModel의 Return과 출력된 findAll Method의 값이 일치하는지 비교합니다.
    expect(comments).toBe('findAll String');
  });

    test('Comment Repository createComment Method', async () => {

      // create Mock의 Return 값을 "findAll String"으로 설정합니다.
      mockCommentModel.create = jest.fn(() => {
        return "create Return String"
      });

      // createComment Method를 실행하기 위해 필요한 Params 입니다.
      const createCommentParams = {
        comment: "createCommentComment",
        userId: "createCommentUserId",
        todoId: "createCommentTodoId"
      }

      // postRepository의 createComment Method를 실행합니다.
      const createCommentData = await commentRepository.createComment(
        createCommentParams.comment,
        createCommentParams.userId,
        createCommentParams.todoId,
      );

      // createCommentData는 commentModel의 create를 실행한 결과값을 바로 반환한 값인지 테스트합니다.
      expect(createCommentData).toBe("create Return String");

      // postRepository의 createPost Method를 실행했을 때, postsModel의 create를 1번 실행합니다.
      expect(mockCommentModel.create).toHaveBeenCalledTimes(1);

      // postRepository의 createPost Method를 실행했을 때, postsModel의 create를 아래와 같은 값으로 호출합니다.
      expect(mockCommentModel.create).toHaveBeenCalledWith({
        comment: createCommentParams.comment,
        userId: createCommentParams.userId,
        todoId: createCommentParams.todoId,
      });
    });
});
