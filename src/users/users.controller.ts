/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  Req,
  Post,
  Body,
  Put,
  ParseIntPipe,
  HttpStatus,
  // UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request, Response } from 'express';
import { CreateUsersDto } from './dto/index.dto';
import { ValidationUserPipe } from './pipe/user-validation.pipe';
// import { HttpExceptionFilter } from 'src/error/exception_filter.error';
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
  // @Redirect('https://google.com')
  getUsers() {
    return this.usersService.getAllUsers();
  }
  @Get('single/:id')
  // @UseFilters(new HttpExceptionFilter())
  getOneUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const result = this.usersService.getOneUsers(id);
    // if (!result) {
    //   throw new HttpException('Access denine !', HttpStatus.FORBIDDEN);
    // }

    // try {
    //   const result = this.usersService.getOneUsers(id);
    //   return result;
    // } catch (error) {
    //   // throw new HttpException(
    //   //   { statusbar: HttpStatus.FORBIDDEN, error: 'in file no Person' },
    //   //   HttpStatus.FORBIDDEN,
    //   //   { cause: error },
    //   // );
    //   throw new BadRequestException('Something bad happend', {
    //     cause: error,
    //     description: 'not find user in file',
    //   });
    // }

    return result;
  }
  @Get('query')
  getOneUserWithQuery(
    @Query('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = this.usersService.getOneUsers(Number(id));
    res.status(201).send(result);
  }

  @Post('/POST/Add')
  addUsersInfo(
    @Body(new ValidationUserPipe()) body: CreateUsersDto,
    @Res() res: Response,
  ) {
    const result = this.usersService.addUser(body);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(result);
  }

  @Put('/PUT/Edit')
  editUser(@Body() data: CreateUsersDto, @Res() response: Response) {
    const result = this.usersService.editUser(data);
    response.status(200).send(result);
  }
}
