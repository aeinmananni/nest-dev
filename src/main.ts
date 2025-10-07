/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

import { LoggerMiddelWare2 } from './middelWares/logger2.middel';
import { AllExceptionsFilter } from './error/exception_filter.error';
// استفادهبه صورت سرتاسری در پروژه

// -----------------------------------------------------
// main.ts  در این فایل ما میتوانیم میدلویر ها را به صورت سرتاسری در پروژه استفاده کنیم
// -----------------------------------------------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddelWare2);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
