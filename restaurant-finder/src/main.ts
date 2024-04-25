import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envConfig } from './config/env';
import { HttpExceptionErrorFilter } from './helpers/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionErrorFilter());

  await app.listen(envConfig.PORT, () => {
    console.log(`Server Listening on http://localhost:${envConfig.PORT}`);
  });
}
bootstrap();
