const CommentService = require('../../../services/comment.service.js');

let mockCommentRepository = {
  findAllComment: jest.fn(),
  createComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

let commentService = new CommentService();
// commentService의 Repository를 Mock Repository로 변경합니다.
commentService.commentRepository = mockCommentRepository;

describe('Layered Architecture Pattern Comment Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('Comment Service findAllComment Method', async () => {
     // findAllComment Method를 실행했을 때, Return 값 입니다.
     const findAllCommentReturnValue = [
        {
          postId: 1,
          nickname: "Nickname_1",
          title: "Title_1",
          createdAt: new Date('06 October 2011 15:50 UTC'),
          updatedAt: new Date('06 October 2011 15:50 UTC'),
        },
        {
          postId: 2,
          nickname: "Nickname_2",
          title: "Title_2",
          createdAt: new Date('07 October 2011 15:50 UTC'),
          updatedAt: new Date('07 October 2011 15:50 UTC'),
        },
      ]
  
      // Repository의 findAllComment Method를 Mocking하고, findAllCommentReturnValue를 Return 값으로 변경합니다.
      mockCommentRepository.findAllComment = jest.fn(() => {
        return findAllCommentReturnValue;
      })
  
      // CommentService의 findAllComment Method를 실행합니다.
      const allComment = await commentService.findAllComment();
  
      // allComment의 값이 commentRepository의 findAllComment Method 결과값을 내림차순으로 정렬한 것이 맞는지 검증합니다.
      expect(allComment).toEqual(
        findAllCommentReturnValue.sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
      );
  
      // CommentRepository의 findAllComment Method는 1번 호출되었는지 검증합니다.
      expect(mockCommentRepository.findAllComment).toHaveBeenCalledTimes(1);
  
    });
  });
