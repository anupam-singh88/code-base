import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   jwtFromRequest: (req) => {
      //     let token = null;
      //     if (req && req.headers) {
      //       token = req.headers.authorization;
      //     }
      //     return token;
      //   },
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  validate(payload: any): any {
    return payload;
  }
}
