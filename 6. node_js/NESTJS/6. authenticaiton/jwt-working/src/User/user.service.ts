import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      username: 'john',
      password: 'changeme',
      email: 'john@doe.com',
      age: 2,
      role: 'admin',
    },
    {
      username: 'chris',
      password: 'secret',
      email: 'a@gmail.com',
      age: 22,
      role: 'user',
    },
    {
      username: 'lewis',
      password: 'jwt',
      email: 'tws@gmail.com',
      age: 12,
      role: 'user',
    },
  ];

  getUserByName(userName: string): User {
    return this.users.find((user) => user.username === userName);
  }
}
