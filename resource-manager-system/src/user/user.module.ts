import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [DatabaseModule, TokenModule],
  providers: [...userProviders, UserService, TokenService],
  exports: [...userProviders, UserService, TokenService],
})
export class UserModule {}
