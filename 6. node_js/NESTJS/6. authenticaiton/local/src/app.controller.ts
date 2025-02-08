import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  getHello(@Request() req): string {
    return req.user;
    // return this.appService.getHello();
  }
}
