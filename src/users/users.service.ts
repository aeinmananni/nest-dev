/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, Optional, Inject } from '@nestjs/common';
import { UsersType } from './users.types';
import { LoggerService1, LoggerService2 } from './log';

/**
 * @Injectable() :
 *                 میشود UsersService  اضافه کردن این دکوریتور باعث قابل تزریق بودن این کلاس
 *                 که بتوانیم در سرتاسر جاهای دیگر برنامه
 *                  از ان استفاده کنیم
 * ---------------------------------------------
 *
 * private readonly users : ارایه ای از کاربر ها است
 * ------------------------------------------------
 * Dependency Injection : تزریق وابستگی
 *
 * userModule بعد از اینکه سرویس های خود را تعریف کریم در بخش
 *  قرار دهیمproviders: [UsersService], مربوط به Dependency باید ان را در
 * ------------------------------------------------------------------
 * اگر قرار است سرویس ما به سرویس دیگری وابسطه باشد نباید نمونه سازی
 * را داخل خوده کلاس انجام دهیم
 * مشکل زمانی ایجاد مشود که مثال بخواهیم به غیر از این سرویس
 * از سرویس دیگری استفاده کنیم
 * خب حالا کاری که ما انجام میدهیم میخواهیم کلاس خود را از این
 * وابسطگی ها خلاص کنیم
 * به صورتی که استفاده کردیم سرویس ما قادر خواهد بود از چند سرویس لاگ استفاده کند
 *
 *--------------------------------------------------------------------------
 * میتوانیم سرویس های خود را به صورت اپشنال تنظیم کنیم
 *
 * @Optional() @Inject("") private httpClient : string
 * به این صورت میتوانیم اپشنال تعریف کنیم
 *   نام ان سرویسی که میخواهیم تزریق کنیم@Inject("") در
 *   و اپشنال هست رااضافه میکنیم
 *
 * ---------------------------------------------------
 * خب ما اینجکشن هایی که انجام دادیم به صورت کانترکتور اینجکشن بوده است
 * ما میتوانیم روی پراپرتی هم دپیندنسی اینجکشن را انجام دهیم
 * -------------------------------------------------------------
 * نمیکند extend زمانی که کلاس ما از کلاس دیگری
 *  استفاده کنیمcontructorBaseInjection بهتر است از
 *
 *
 *
 */

type Servive = {
  log: (message: string) => void;
};

@Injectable() // این خاصیت باعث میشود بتوانیم از سرویس در سر تاسر پروژه استفاده کنیم
export class UsersService {
  private readonly users: UsersType[] = [];
  constructor(
    private logger: Servive,
    @Optional() @Inject('') private httpClient?: string,
  ) {}

  create(user: UsersType) {
    this.users.push(user);
  }
  getUsers(): UsersType[] {
    return this.users;
  }

  loggerMethods() {
    this.logger.log('Hello Nest');
  }
}

const userService1 = new UsersService(new LoggerService1());
const userService2 = new UsersService(new LoggerService2());

// -------------------------------------------------------------------
@Injectable()
export class HttpService<T> {
  @Inject('')
  private readonly httpClient: T;
}
