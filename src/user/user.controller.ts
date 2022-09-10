import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.dto';
import { Token } from '../token/token.entity';
import { RequestToken } from '../common/user.decorator';

// 只实现业务逻辑
// 列如：验证密码、读取用户表、
@Controller('/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly tokenService: TokenService;

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<number> {
    const data = await this.userService.createUser(
      createUserDto.name,
      createUserDto.password,
    );

    return data.uid;
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const ok = await this.userService.checkPassword(
      loginDto.uid,
      loginDto.password,
    );
    if (ok) {
      return this.tokenService.createToken(loginDto.uid, 2 * 60 * 60);
    }
    // 密码错误，返回state = 1；
    throw new Error('密码错误，登录失败');
  }

  @Post('/logout')
  async logout(@RequestToken() token: Token) {
    await this.tokenService.setTokenOutLog(token.token);
  }

  @Post('/update')
  async update(
    @RequestToken() token: Token,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (token.uid !== updateUserDto.uid) {
      throw new Error('账号错误！');
    }
    const data = await this.userService.update(updateUserDto);
    data.password = '';
    return data;
  }

  // 设置超级管理员
}
