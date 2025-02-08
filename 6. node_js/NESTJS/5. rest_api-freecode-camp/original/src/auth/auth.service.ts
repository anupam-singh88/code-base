import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { AuthDto } from './dto';
// import { User, Bookmark } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private congif: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    //save the user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },

        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });
      //send back the user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
          // return { msg: 'User already exists' };
        }
        throw new Error('An error occurred');
      }
    }
  }
  async signIn(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user  does not exist throw an error
    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }
    //compare the password
    const pwMatches = await argon.verify(user.hash, dto.password);
    //if password is incorrect throw an error
    if (!pwMatches) {
      throw new ForbiddenException('Invalid Credentials');
    }

    //send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.congif.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
