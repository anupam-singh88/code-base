import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { PassportLocalStrategy } from './passport.local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [],
  providers: [PassportLocalStrategy],
  exports: [],
})
export class AuthModule {}
