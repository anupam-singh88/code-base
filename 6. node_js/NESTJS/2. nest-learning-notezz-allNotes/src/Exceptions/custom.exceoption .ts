import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomClassExc extends HttpException {
  constructor() {
    super('Custom class Exception', HttpStatus.BAD_REQUEST);
  }
}
