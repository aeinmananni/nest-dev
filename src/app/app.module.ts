/* eslint-disable prettier/prettier */
// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { CoreModule } from '../core/core.module';
import { LoggerMiddelWare1 } from 'src/middelWares/logger1.middel';
import { LoggerMiddelWare2 } from 'src/middelWares/logger2.middel';

/**
 * از این میدلویر استفاده نکند admins میتوانیم بگوییم مسیری مثلا با نام
 *
 * consumer.apply(LoggerMiddelWare1, LoggerMiddelWare2).exclude("admin").forRoutes('users');
 *----------------------------------------------------------
    دارند  Get میتوانیم بگوییم برای مثال برای مسیر های یوزر و انهایی که درخواست  
     configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddelWare1, LoggerMiddelWare2)
      .forRoutes({ path: 'users', method: RequestMethod.GET });

      اگر بخواهیم میلدوری را بدون قید و شرط برای تمام برنامه اعمل کنیم
     main.ts  وارد پوشه اصلی پروژه یعنی 
     میشویم و این را تنظیم میکنیم
     
 */
@Module({
  imports: [
    DatabaseModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest_db',
    }),
    UsersModule,
    CommonModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// برای ادد کردن میدلویر
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddelWare1, LoggerMiddelWare2).forRoutes('users');
  }
}
