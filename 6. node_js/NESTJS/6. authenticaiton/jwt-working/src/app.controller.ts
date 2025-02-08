import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    //authenticaition

    //need to authorize
    return this.authService.generateToken(req.user);
  }

  @Get('/admin')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
  admin(@Req() req) {
    return 'this is admin data' + JSON.stringify(req.user);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
  user(@Req() req) {
    return 'this is user data' + JSON.stringify(req.user);
  }
}
