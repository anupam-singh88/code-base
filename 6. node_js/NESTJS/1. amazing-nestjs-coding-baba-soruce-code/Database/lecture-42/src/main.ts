import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); // This will transform the incoming data to the DTO type and also it will remove the extra fields from the incoming data.
  await app.listen(3000);
}
bootstrap();
