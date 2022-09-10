import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { AppException } from './exception';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  @Inject()
  private tokenService: TokenService;

  async transform(value: string, metadata: ArgumentMetadata) {
    // console.log('token:', value);
    const data = await this.tokenService.getTokenInfo(value);
    // console.log('uid:', data);

    if (data === null) {
      throw new AppException(1, '用户未登录！');
    }
    return data;
  }
}
