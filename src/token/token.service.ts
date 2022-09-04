import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
// 用于数据处理操作、或者创建token可以在这里实现
// token: 1.根据uid创建token 2.根据token查询uid 3.过期token
@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private readonly tokenRepository: Repository<Token>,
  ) {}

  /**
   * 生成token
   *
   * @returns
   */
  createNonceStr(length: number) {
    const chars =
      '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let nums = '';
    for (let i = 0; i < length; i++) {
      // 这里是几位就要在这里不改变
      const id = parseInt((Math.random() * chars.length).toString());
      nums += chars[id];
    }
    return nums;
  }

  /**
   * 1.根据uid创建token
   */
  async createToken(uid: number, expire: number) {
    const data = new Token();
    data.uid = uid;
    data.loginTime = Math.floor(Date.now() / 1000);
    data.expire = data.loginTime + expire;
    data.token = this.createNonceStr(32);
    data.state = 1;
    await this.tokenRepository.save(data);
    return data.token;
  }
}
