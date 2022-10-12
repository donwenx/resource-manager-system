import { IsNotEmpty, IsNumber, Length, IsIn, isNumber } from 'class-validator';
import { UserState } from './user.enum';

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @IsNotEmpty()
  @Length(6, 255)
  password: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 255)
  name: string;

  @IsNotEmpty()
  @Length(6, 255)
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @Length(6, 255)
  name?: string;

  @IsIn(['未知', '女', '男'])
  sex?: string;

  avatar?: string;

  @IsNumber()
  @IsIn([UserState.NORMAL, UserState.DELETE])
  state?: number;

  @Length(6, 255)
  password?: string;
}

export class SupUpdateUserDto {
  uid: number;
  name?: string;
  sex?: string;
  avatar?: string;
  state?: number;
  password?: string;
  authority?: string;
}
