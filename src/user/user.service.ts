import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// 用于数据处理操作、或者创建token可以在这里实现
// token: 1.根据uid创建token 2.根据token查询uid 3.过期token
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 注册用户
   * @param name 用户名
   * @param password 密码
   */
  async createUser(name: string, password: string) {
    const data = new User();
    data.name = name;
    data.password = password;
    return await this.userRepository.save(data);
  }

  /**
   * 检查用户密码是否正确
   * @param uid 用户id
   * @param password 用户密码
   * @returns 检查是否成功
   */
  async checkPassword(uid: number, password: string) {
    const user = await this.userRepository.findOneBy({ uid });
    if (user.password === password) {
      return true;
    }
    return false;
  }
}
