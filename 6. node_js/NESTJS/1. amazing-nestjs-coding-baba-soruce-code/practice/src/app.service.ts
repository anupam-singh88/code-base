import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  postHello() {
    //   throw new Error('Method not implemented.');
    return 'nothing';
  }
  private name = 'NestJS';

  getHello(): string {
    return 'This is a nestjs';
  }
}
