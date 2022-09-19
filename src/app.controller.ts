import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestToken } from './common/user.decorator';
import { Token } from './token/token.entity';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/statistics')
  async getStatistics(@RequestToken() token: Token) {
    return await this.appService.getStatistics();
  }
}
