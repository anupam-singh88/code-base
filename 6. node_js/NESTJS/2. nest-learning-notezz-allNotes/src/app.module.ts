import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ModModule } from './Modules/mod.module';
import { PipeModule } from './Pipes/pipe.module';
import { ContModule } from './Controller/cont.module';
import { ProviderModule } from './Providers/pro.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { GuardsModule } from './guards/guards.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ModModule,
    PipeModule,
    ContModule,
    ProviderModule,
    MiddlewareModule,
    GuardsModule,
    InterceptorsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', //import the .env file
    }), //import the ConfigModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
