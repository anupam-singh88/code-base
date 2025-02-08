import { Controller, Get, Headers } from "@nestjs/common";

@Controller("users")
export class UsersController {
  // @Example 1: Headers Params Object
  @Get("headers")
  // @Header('Cache-Control','none') //set the header for the request
  // @HttpCode(200)
  getHeaders(@Headers() headers: Record<string, any>) { //retrieving the header from the requeset
    console.log(headers);
    return headers;
  }

  // @Example 2: Extract `User-Agent` header from Headers Object
  @Get("runtime")
  getRuntime(@Headers("User-Agent") ua: string) {
    console.log(ua);
    return { runtime: ua };
  }

  // @Example 3: Extract multiple headers from Headers Object
  @Get("multi-headers")
  getRuntimeAndCache(
    @Headers("User-Agent") ua: string,
    @Headers("Cache-Control") cache: string
  ) {
    return { runtime: ua, cacheControl: cache };
  }
}
