import { Controller, Get, Ip } from "@nestjs/common";

@Controller({
  path: "users",
  // host: 'app.domain.com'
})
export class UsersController {
  @Get("ip")
  findIp(@Ip() ip: string,
    //  @HostParam() params: any
  ) {
    return { ip };
  }
}
