import { Controller, Get, Inject } from '@nestjs/common';
import { ProService } from './pro.service';

@Controller('user')
export class ProController {
  constructor(
    @Inject('HELLO') private hello,
    private proService: ProService,
  ) {}

  @Get('all')
  getUser() {
    console.log(this.hello);
    return this.proService.getHello();
  }
}
