export class LoginDto {
  readonly uid: number;
  readonly password: string;
}

export class CreateUserDto {
  readonly name: string;
  readonly password: string;
}
