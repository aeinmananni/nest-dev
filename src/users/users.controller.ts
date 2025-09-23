/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
/**
 * به این صورت عمل کنیم userService میتوانیم برای دسترسی به متد های
 * ( constructor(private readonly usersService: UsersService) {} )
 *
 *
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getUsers() {
    return this.usersService.getUsers();
  }
}
