import { HttpException } from '@nestjs/common';

export class CustomExc extends HttpException {
  constructor() {
    super('Custom Exception', 404);
  }
}
