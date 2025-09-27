/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request, Response } from 'express';
/**
 * به این صورت عمل کنیم userService میتوانیم برای دسترسی به متد های
 * ( constructor(private readonly usersService: UsersService) {} )
 * ------------------------------------------------------------
 * زمانی که میخواهیم حالت ریسپانس سفارسی داشته باشم
 * @Res({passthrough:true})
 *
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
  @Get('single/:id')
  getOneUser(@Param() params: { id: number }) {
    const { id } = params;
    return this.usersService.getOneUsers(Number(id));
  }
  @Get('query')
  getOneUserWithQuery(
    @Query('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('REQ : ', req);
    const result = this.usersService.getOneUsers(Number(id));
    res.status(201).send(result);
  }
}
