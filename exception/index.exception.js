// 유효하지 않은 파라미터 전달 시
class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = 'InvalidParamsError';
    if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
  }
}

// 유효성 에러 , 이메일, pw 등 유효하지 않은 에러 발생시
class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.name = 'ValidationError';
  }
}

module.exports = { InvalidParamsError, ValidationError };
