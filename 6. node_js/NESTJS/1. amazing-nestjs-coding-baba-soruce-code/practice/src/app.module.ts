import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    // `string` value provider
    {
      provide: 'DATABASE_NAME',
      useValue: 'moon_knight',
    },

    // `number` value provider
    {
      provide: 'API_VERSION',
      useValue: 2,
    },

    // `array` value provider
    {
      provide: 'MAIL',
      useValue: ['admin@domain.com', 'replay@domain.com'],
    },

    // `object` value provider
    {
      provide: 'CRON_CONFIG',
      useValue: {
        max: 11,
        runOn: 'start',
      },
    },
    AppService,

    // `object` value provider

    // NOTE: injection token can be `class`, `string`, or `symbol`
    // here we are using class as token
    // {
    //   provide: EnvConfig,
    //   // NOTE: we are providing the `EnvConfig` dependency with a value that is an object literal
    //   useValue: {
    //     env: "DEV",
    //     node: "17",
    //   },
    // },
  ],
})
export class AppModule {}
