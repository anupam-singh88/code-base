import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      // process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://127.0.0.1:27017/myDatabase',
      }),
      inject: [ConfigService],
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
