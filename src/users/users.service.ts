import { Injectable } from '@nestjs/common';
import { UsersType } from './users.types';

@Injectable() // این ختصیت باعث میشود بتوانیم از سرویس در سر تاسر پروژه استفاده کنیم
export class UsersService {
  private readonly users: UsersType[] = [];

  create(user: UsersType) {
    this.users.push(user);
  }
  getUsers(): UsersType[] {
    return this.users;
  }
}
