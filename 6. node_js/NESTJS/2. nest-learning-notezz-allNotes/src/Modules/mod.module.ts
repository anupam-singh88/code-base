import { Module } from '@nestjs/common';
import { ModController } from './mod.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [ModController],
  providers: [],
})
export class ModModule {
  constructor(private readonly configService: ConfigService) {
    console.log(configService.get('PORT'));
  }
}
