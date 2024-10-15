import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception-fillter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting Up Global Exception Handling
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors();

  //is used to set a global prefix for all routes in your application
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
