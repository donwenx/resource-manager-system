import {
  IsNotEmpty,
  IsNumber,
  Length,
  IsIn,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { UserState, UserSex, UserAuthority } from './user.enum';

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

  @Length(2, 255)
  @IsOptional()
  name?: string;

  @IsIn([UserSex.UNKNOWN, UserSex.WOMEN, UserSex.MAN])
  @IsOptional()
  sex?: string;

  @IsOptional()
  avatar?: string;

  @IsNumber()
  @IsIn([UserState.NORMAL, UserState.DELETE])
  @IsOptional()
  state?: number;

  @Length(6, 255)
  @IsOptional()
  password?: string;
}

export class ListUserDto {
  @IsNumber()
  @Min(0)
  skip: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  take: number;

  keyword: string;
}

export class SupUpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @Length(2, 255)
  @IsOptional()
  name?: string;

  @IsIn([UserSex.UNKNOWN, UserSex.WOMEN, UserSex.MAN])
  @IsOptional()
  sex?: string;

  @IsOptional()
  avatar?: string;

  @IsNumber()
  @IsIn([UserState.NORMAL, UserState.DELETE])
  @IsOptional()
  state?: number;

  @Length(6, 255)
  @IsOptional()
  password?: string;

  @IsIn([UserAuthority.ADMIN, UserAuthority.USER])
  @IsOptional()
  authority?: string;
}
