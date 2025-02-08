import { Injectable } from '@nestjs/common';

@Injectable()
export class ProService {
  getHello(): string {
    return 'Hello World!';
  }
}
