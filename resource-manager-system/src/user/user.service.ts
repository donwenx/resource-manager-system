import { Injectable, Inject } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
// 用于数据处理操作、或者创建token可以在这里实现
// token: 1.根据uid创建token 2.根据token查询uid 3.过期token
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) { }

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

  /**
   * 通过uid获取用户name
   * @param uid 获取用户id
   * @returns 用户name
   */
  async getUserName(uid: number) {
    const user = await this.userRepository.findOneBy({ uid });
    return user.name;
  }

  /**
   * 更新用户信息
   * @param data 用户需要修改的信息
   * @returns 修改后结果
   */
  async update(data: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ uid: data.uid });
    if (data.name) {
      user.name = data.name;
    }
    if (data.sex) {
      user.sex = data.sex;
    }
    if (data.avatar) {
      user.avatar = data.avatar;
    }
    if (data.state) {
      user.state = data.state;
    }
    if (data.password) {
      user.password = data.password;
    }
    return await this.userRepository.save(user);
  }

  async getUserList(skip: number, take: number, keyword: string) {
    const rule = [
      {
        name: Like(`%${keyword}%`),
        state: 1,
      },
    ];
    const find: FindManyOptions<User> = {
      skip,
      take,
    };
    find.where = [{ state: 1 }];

    if (keyword) {
      find.where = rule;
    }
    const data = await this.userRepository.findAndCount(find);
    return data;
  }
}
