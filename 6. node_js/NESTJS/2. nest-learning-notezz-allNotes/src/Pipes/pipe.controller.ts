import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserPipe } from './customPipe/user.pipe';

@Controller('pipe')
export class PipeController {
  constructor() {}

  // Get all mods
  @Get('all')
  getAll() {
    return 'Get all mods';
  }

  @Post('post')
  postAll(@Body(new ValidationPipe()) book: UserDto) {
    return 'Post all mods';
  }

  @Post('post/custom')
  postAlls(@Body(new UserPipe()) book: any) {
    return 'Post all mods';
  }

  @Patch('patch/:id')
  update(@Param('id', ParseIntPipe) id: number) {
    return {
      id: id,
    };
  }

  //here validation failed user can pass alpha values also
  @Patch('patches/:id')
  updateFn(
    @Param('id')
    id: number,
  ) {
    return {
      id: id,
    };
  }
}
