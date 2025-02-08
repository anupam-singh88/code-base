import { Module } from '@nestjs/common';
import { ContController } from './cont.controller';

@Module({
  imports: [],
  controllers: [ContController],
  providers: [],
})
export class ContModule {}
