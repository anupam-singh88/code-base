import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log("[main.ts]: Global ValidationPipe");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transform input data to DTO instance (class-validator)
     
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw error if non-whitelisted property is present
      
      // stopAtFirstError: true, // stop validation on first error
    })
  );
  await app.listen(3000);
}
bootstrap();
