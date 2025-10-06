/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  Optional,
  Inject,
  NotFoundException,
} from '@nestjs/common';
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

@Injectable()
export class UsersService {
  private readonly users: UsersType[] = [
    { id: 1, firstName: 'hadi', lastName: 'yonsei', age: 24 },
    { id: 2, firstName: 'sara', lastName: 'kamali', age: 29 },
    { id: 3, firstName: 'rasol', lastName: 'hossini', age: 23 },
    { id: 4, firstName: 'kaveh', lastName: 'ahmadi', age: 48 },
  ];

  constructor(
    @Inject('LOGGER1') private logger1: Servive,
    @Inject('LOGGER2') private logger2: Servive,
    @Optional() @Inject('HTTP_CLIENT') private httpClient?: string, // اگه خواستی بعداً برای HttpClient چیزی تزریق کنی
  ) {}

  create(user: UsersType) {
    this.users.push(user);
  }

  getAllUsers(): UsersType[] {
    return this.users;
  }
  getOneUsers(id: number): UsersType | undefined {
    const result = this.users.find?.((it) => it.id === id);
    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return result;
  }
  loggerMethods() {
    this.logger1.log('Hello from Logger1');
    this.logger2.log('Hello from Logger2');
  }

  addUser(data: UsersType) {
    this.users.push(data);
    return true;
  }

  editUser(data: UsersType) {
    const findIndex = this.users.findIndex((it) => it.id === data.id);
    this.users[findIndex] = data;

    return true;
  }
}

// -------------------------------------------------------------------
@Injectable()
export class HttpService<T> {
  @Inject('')
  private readonly httpClient: T;
}
