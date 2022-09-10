import { Injectable, Inject } from '@nestjs/common';
import { getuid } from 'process';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { createNonceStr, getTimeStamp } from '../util/function';
// 用于数据处理操作、或者创建token可以在这里实现
// token: 1.根据uid创建token 2.根据token查询uid 3.过期token
@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private readonly tokenRepository: Repository<Token>,
  ) {}

  /**
   * 1.根据uid创建token
   * @param uid 用户id
   * @param expire 过期时间
   * @returns token信息
   */
  async createToken(uid: number, expire: number) {
    const data = new Token();
    data.uid = uid;
    data.loginTime = getTimeStamp();
    data.expire = data.loginTime + expire;
    data.token = createNonceStr(32);
    data.state = 1;
    await this.tokenRepository.save(data);
    return data.token;
  }

  /**
   * 3.查询token是否过期
   * @param token 用户
   * @returns 如果未过期，返回token
   */
  async getTokenInfo(token: string) {
    const data = await this.tokenRepository.findOneBy({ token });
    const time = getTimeStamp();
    if (time >= data.expire) {
      // 过期时间
      return null;
    }
    if (data.state === 0) {
      // 用户主动登出
      return null;
    }
    return data;
  }

  /**
   * 设置用户token过期
   * @param token 用户token
   */
  async setTokenOutLog(token: string) {
    const data = await this.tokenRepository.findOneBy({ token });
    data.state = 0;
    await this.tokenRepository.save(data);
  }
}
