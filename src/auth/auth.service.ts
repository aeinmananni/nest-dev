/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singIn(id: number) {
    const result = await this.usersService.getOneUsers(id);
    if (!result) {
      throw new UnauthorizedException();
    }

    const pyload = {
      userId: result.id,
      firstName: result.firstName,
      roles: result.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(pyload),
    };
  }
}
