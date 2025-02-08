import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public user: User[] = [
    {
      username: 'user1',
      password: 'password1',
      email: 'user1@gmail.com',
    },
    {
      username: 'user2',
      password: 'password2',
      email: 'user2@gmail.com',
    },
    {
      username: 'user3',
      password: 'password3',
      email: 'user3@gmail.com',
    },
    {
      username: 'user4',
      password: 'password4',
      email: 'user4@gmail.com',
    },
  ];

  getUserByName(userName: string): User {
    return this.user.find((user) => {
      return user.username === userName;
    });
  }
}
