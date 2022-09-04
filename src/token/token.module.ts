import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tokenProviders } from './token.providers';
import { TokenService } from './token.service';

@Module({
  imports: [DatabaseModule],
  providers: [...tokenProviders, TokenService],
  exports: [...tokenProviders, TokenService],
})
export class TokenModule {}
