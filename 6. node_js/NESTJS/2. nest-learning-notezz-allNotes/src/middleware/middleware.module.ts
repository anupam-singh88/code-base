import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';
import { MiddlwareController } from './middlware.controller';
import { MiddlewareClass } from './middleware.middleware';

@Module({
  controllers: [MiddlwareController],
  providers: [MiddlewareService],
})

//module based middlewares
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // throw new Error('Method not implemented.');
    consumer.apply(MiddlewareClass).forRoutes(MiddlwareController);
  }
}

/*  
function based middleware 

import {Reqeust , Response , NextFunction} from 'express';

export function logger(req: Request , res: Response , next: NextFunction){
    console.log('Logger midleware');
    console.log(`Request method : ${req.method}`);
    console.log(`Request url : ${req.url}`);
    next();
}


class based

import { Injectable , NestMiddleware }
import { Request , Response , NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request , res: Response , next: NextFunction){
        console.log('Logger midleware');
        console.log(`Request method : ${req.method}`);
        console.log(`Request url : ${req.url}`);
        next();
    }
}


*/
