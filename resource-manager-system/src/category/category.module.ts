import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService],
  exports: [...categoryProviders, CategoryService],
})
export class CategoryModule {}
