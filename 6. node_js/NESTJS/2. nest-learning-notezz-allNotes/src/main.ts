import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BookGuard } from './guards/book.guard';

const globalMiddleware = (req, res, next) => {
  console.log('This is the global middlware');
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global middlware works only with function based middleware
  // app.use(globalMiddleware);

  app.useGlobalGuards(new BookGuard());
  // app.useGlobalPipes()
  // app.useGlobalFilters()
  // app.useGlobalInterceptors()
  await app.listen(3000);
}
bootstrap();
