/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt, Min, Max } from 'class-validator';
export class CreateUsersDto {
  @IsInt()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(1)
  @Max(33)
  age: number;
}
