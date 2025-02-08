import { Controller, Get } from '@nestjs/common';

@Controller('middlware')
export class MiddlwareController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello from the middlware!';
  }
}
