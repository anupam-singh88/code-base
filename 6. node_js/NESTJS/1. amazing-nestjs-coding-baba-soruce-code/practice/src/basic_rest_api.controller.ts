import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  },
];

@Controller('users')
export class AppController {
  constructor() {}

  @Get('/')
  getRootRoute() {
    return USERS;
  }

  @Get('/search')
  searchUsersByName(@Query('name') name: string) {
    const user = USERS.filter((user) => user.name.includes(name));

    return {
      message: 'User found',
      user,
    };
  }
  @Get('/:id')
  findById(@Param('id') id: string) {
    //console.log(id);
    let user = USERS.find((user) => {
      return user.id === +id;
    });
    //console.log(user);
    return {
      user: user ? user : 'No user founda',
    };
  }

  @Post()
  createNewUser(@Body() body: any) {
    USERS.push(body);
    return {
      message: 'User created successfully',
      user: body,
    };
  }

  @Put('/:id')
  updateUser(@Body() body: any, @Param('id') id: string) {
    const user = USERS.findIndex((user) => user.id === parseInt(id));

    USERS[user] = body;

    return {
      message: `User ${USERS[user].name} updated successfully`,
      user: USERS,
    };
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    USERS.filter((user) => user.id !== parseInt(id));

    return {
      message: 'User deleted successfully',
      users: USERS,
    };
  }
}
