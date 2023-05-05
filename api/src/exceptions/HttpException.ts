class HttpException extends Error {
  status: number;
  message: string;
  constructor(code: number, message: string) {
    super(message);
    this.status = code;
    this.message = message;
  }
}

export default HttpException;
