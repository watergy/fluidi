export class HTTPError extends Error {
  statusCode: number;
  errorType: string;
  userMessage: string;

  constructor(message: string, statusCode: number, errorType: string, userMessage?: string) {
    super(message);
    Object.setPrototypeOf(this, HTTPError.prototype);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.userMessage = userMessage
      ? userMessage
      : 'The system was unable to complete your request.';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequest extends HTTPError {
  constructor(message?: string, userMessage?: string) {
    const errMsg = message || 'The server could not understand the request due to invalid syntax.';
    super(errMsg, 400, 'Bad Request', userMessage);
  }
}

export class NotFound extends HTTPError {
  constructor(message?: string, userMessage?: string) {
    const errMsg = message || 'Entity not found.';
    super(errMsg, 404, 'Not Found', userMessage);
  }
}
