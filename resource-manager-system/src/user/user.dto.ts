export class LoginDto {
  readonly uid: number;
  readonly name: string;
  readonly password: string;
}

export class CreateUserDto {
  readonly name: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly uid: number;
  readonly name?: string;
  readonly sex?: string;
  readonly avatar?: string;
  readonly state?: number;
  readonly password?: string;
}
