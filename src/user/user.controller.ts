import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TokenService } from '../token/token.service';
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  SupUpdateUserDto,
} from './user.dto';
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
    if (!ok) {
      // 密码错误，返回state = 1；
      throw new Error('密码错误，登录失败');
    }
    const token = await this.tokenService.createToken(
      loginDto.uid,
      2 * 60 * 60,
    );
    const user = await this.userService.getUser(loginDto.uid);
    const data = {
      token,
      uid: loginDto.uid,
      name: user.name,
      authority: user.authority,
    };
    return data;
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
    console.log('update', token.uid, updateUserDto.uid);
    if (token.uid !== updateUserDto.uid) {
      throw new Error('账号错误！');
    }
    const data = await this.userService.update(updateUserDto);
    data.password = '';
    return data;
  }

  @Get('/list')
  async findAll(
    @RequestToken() token: Token,
    @Query('skip')
    skip: number,
    @Query('take')
    take: number,
    @Query('keyword')
    keyword: string,
  ): Promise<{ data: User[]; size: number; count: number }> {
    // console.log('skip:', skip, take);
    const [data, count] = await this.userService.getUserList(
      skip,
      take,
      keyword,
    );
    const userInfo = data.map((item) => {
      item.password = '';
      return item;
    });
    return { data: userInfo, size: data.length, count };
  }

  // 设置超级管理员
  @Post('/supUpdate')
  async supUpdate(
    @RequestToken() token: Token,
    @Body() updateUserDto: SupUpdateUserDto,
  ) {
    const user = await this.userService.getUser(token.uid);
    if (user.authority !== '超级管理员') {
      throw new Error('你没有权限！');
    }
    if (
      user.authority === '超级管理员' &&
      updateUserDto.authority !== '超级管理员' &&
      token.uid === updateUserDto.uid
    ) {
      throw new Error('你不能修改自己的权限！');
    }
    console.log('update', token.uid, updateUserDto.uid);
    if (token.uid === updateUserDto.uid && updateUserDto.state === 0) {
      throw new Error('不能删除自己！');
    }
    const data = await this.userService.supUpdate(updateUserDto);
    data.password = '';
    return data;
  }
}
