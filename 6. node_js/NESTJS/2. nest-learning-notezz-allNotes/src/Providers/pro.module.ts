import { Module } from '@nestjs/common';
import { ProController } from './pro.controller';
import { ProService } from './pro.service';

@Module({
  imports: [],
  controllers: [ProController],
  providers: [
    ProService,
    {
      provide: 'HELLO',
      useValue: 'Hello Worlds!',
    },
  ],
})
export class ProviderModule {}
