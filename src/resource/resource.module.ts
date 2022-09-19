import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { resourceProviders } from './resource.providers';
import { ResourceService } from './resource.service';
import { CategoryModule } from '../category/category.module';
// import { categoryProviders } from '../category/category.providers';
// import { CategoryService } from '../category/category.service';

@Module({
  imports: [DatabaseModule, CategoryModule],
  providers: [...resourceProviders, ResourceService],
  exports: [...resourceProviders, ResourceService],
})
export class ResourceModule {}
