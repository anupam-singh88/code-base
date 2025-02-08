import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
    // console.log('object');
  }

  validate(username: string, password: string): User {
    console.log('🚀 ~ PassportLocalStrategy ~ validate ~ username:');
    console.log('🚀 ~ PassportLocalStrategy ~ validate ~ password:', password);
    const user = this.userService.getUserByName(username);
    if (user === undefined) throw new BadGatewayException();

    if (!user !== undefined && user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException('asd');
    }
  }
}
