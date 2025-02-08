import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareClass implements NestMiddleware {
  constructor() {}
  use(req: any, res: any, next: (error?: any) => void) {
    console.log(
      'this is class based middleware used for specific miodule or controller or route',
    );
    // throw new Error('Method not implemented.');
    next();
  }
}
