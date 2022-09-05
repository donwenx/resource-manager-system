import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  @Inject()
  private tokenService: TokenService;

  async transform(value: string, metadata: ArgumentMetadata) {
    console.log('token:', value);
    const data = await this.tokenService.getTokenInfo(value);
    console.log('uid:', data);
    return data;
  }
}
