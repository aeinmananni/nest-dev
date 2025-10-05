/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

import { LoggerMiddelWare2 } from './middelWares/logger2.middel';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddelWare2);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
