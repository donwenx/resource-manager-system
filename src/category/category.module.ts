import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [...categoryProviders, CategoryService, UserService],
  exports: [...categoryProviders, CategoryService, UserService],
})
export class CategoryModule {}
