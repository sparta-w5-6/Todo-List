// 유효하지 않은 파라미터 전달 시
class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = 'InvalidParamsError';
    if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
  }
}

//
class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.name = 'ValidationError';
  }
}
// 400
class BadRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'BadRequestError';
  }
}

// 인증에러 401
class AuthorizationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 401;
    this.name = 'AutorizationError';
  }
}

//없는 게시글
class NotFoundError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 404;
    this.name = 'DoesntExistError';
  }
}

module.exports = {
  InvalidParamsError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  BadRequestError,
};
