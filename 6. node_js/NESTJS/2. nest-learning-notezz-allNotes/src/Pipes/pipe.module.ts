import { Module } from '@nestjs/common';
import { PipeController } from './pipe.controller';

@Module({
  imports: [],
  controllers: [PipeController],
  providers: [],
})
export class PipeModule {}
