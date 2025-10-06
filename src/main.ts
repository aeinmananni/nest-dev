/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

import { LoggerMiddelWare2 } from './middelWares/logger2.middel';
import { HttpExceptionFilter } from './error/exception_filter.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddelWare2);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
