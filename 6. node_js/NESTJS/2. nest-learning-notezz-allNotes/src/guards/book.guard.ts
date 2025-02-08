import { CanActivate, ExecutionContext } from '@nestjs/common';

export class BookGuard implements CanActivate {
  public key: string = 'anupam';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers);
    if (request.headers.key !== this.key) {
      console.log('Must have the header key : anupam');
      return false;
    }

    return true;
  }
}
