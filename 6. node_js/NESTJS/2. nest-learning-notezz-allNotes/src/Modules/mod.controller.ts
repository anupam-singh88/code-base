import { Controller, Get, Post } from '@nestjs/common';

@Controller('mods')
export class ModController {
  constructor() {}

  // Get all mods
  @Get('all')
  getAll() {
    return 'Get all mods';
  }

  @Post('post')
  postAll() {
    return 'Post all mods';
  }
}
