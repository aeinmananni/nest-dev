/* eslint-disable prettier/prettier */

// OnModuleInit : برای ما تنظیماتی رو حین لود شدن ماژول قرار میدهد
/**
 * ومیتوانیم حتی سرویس مربوط به کاربران را  درون ان اینجکت کنیم
 * constructor(private usersService: UsersService)
 *
 *مثال میخواهیم برای اولین بار ماژولی را لود کنیم : 
 
   onModuleInit() {
    console.log("Users Modules initails");
    this.usersService.runningUsers();
  }
 *   میگویند Inject به تزریق ماژول ها در داخل کلاس   
 */

// import { Module, OnModuleInit } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// export class UsersModule implements OnModuleInit {
//   constructor(private usersService: UsersService) {}

//   onModuleInit() {
//     console.log('Users Modules initails');
//     this.usersService?.runningUsers();
//   }
// }

// کردن یک ماژول بتوانیم از قابلیت های ان استفاده کنیم imports  خب حالا اگر بخواهیم بدون
/**
 *  میتوانیم از سرویس های این ماژول بدون اینپورت کردن  Global() با قرار دادن یک دکوریتور بنام
 * استفاده کنیم موارد استفاده در کانفیگ دیتا بیس
 *
 *
 */
// import { Global, Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// @Global()
// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports: [UsersService],
// })
// export class UsersModule {}

import { forwardRef, Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerService1, LoggerService2 } from './log';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'LOGGER1', useClass: LoggerService1 },
    { provide: 'LOGGER2', useClass: LoggerService2 },
  ],
  imports: [forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
