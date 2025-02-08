import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user[data];
    return request.user;
  },
);

// export const GetUser = (request: Request) => {
//   try{
//     return request.user;
//   }catch(e){
//     return null;
//   }
// };
