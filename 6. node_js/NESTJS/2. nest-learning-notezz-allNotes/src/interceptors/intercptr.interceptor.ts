import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class Intercptr implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // throw new Error('Method not implemented.');
    // console.log('This is the interceptor');

    const req = context.switchToHttp().getRequest();
    // console.log('This is the interceptor', req.url);

    // return next.handle().pipe(() => {
    //   console.log('This is the interceptor');
    //   return next.handle();
    // });

    // req.body.name = 'anupam';
    req.body.number = '706169819';

    // return next.handle().pipe(
    //   map((data) => {
    //     data = 'This is the interceptor';

    //     return data;
    //   }),
    // );

    console.log('running an interceptor');
    return next.handle();
  }
}
