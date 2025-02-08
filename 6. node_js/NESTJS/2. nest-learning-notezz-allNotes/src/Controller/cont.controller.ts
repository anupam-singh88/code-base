import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookCusExFil } from 'src/Exceptions/book.exception.filter';
import { CustomClassExc } from 'src/Exceptions/custom.exceoption ';
import { CustomExc } from 'src/Exceptions/httpExce.exceptions';
import { BookGuard } from 'src/guards/book.guard';
import { Intercptr } from 'src/interceptors/intercptr.interceptor';

@Controller('cont')
export class ContController {
  private userArr = [
    {
      id: 1,
      name: 'anupam',
      age: 23,
    },
  ];
  constructor() {}

  // @UseInterceptors(Intercptr)
  @UseInterceptors(new Intercptr())
  @Get('all')
  getAllUsers(@Req() req, @Res({ passthrough: true }) res): any {
    // console.log('get all users');
    // return this.userArr;
    // return res.json(req.body);
    return req.body;
  }

  // @UseGuards(new BookGuard()) enabled globally
  @Post('all')
  async postAllUsers(@Body() userBody: any) {
    await this.userArr.push(userBody);
    return this.userArr;
  }

  @Patch('all/:id')
  // @UseFilters(BookCusExFil)
  patchAllUsers(@Body() userBody: any, @Param('id') id: string) {
    // await this.userArr.map((user) => {
    //   if (user.id === +id) {
    //     user.name = userBody.name;
    //     user.age = userBody.age;
    //   }
    //   console.log(typeof id);
    // });
    if (userBody.id < 5) {
      // throw new CustomExc();
      throw new CustomClassExc();
    }
    return id;
  }

  @Delete('all/:id')
  @Redirect()
  deleteUser(@Param('id') id: string) {
    this.userArr = this.userArr.filter((user) => user.id !== +id);
    if (this.userArr) {
      return { url: '/cont/all', statusCode: 302 };
    }
    return this.userArr;
  }
}
