import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { resourceProviders } from './resource.providers';
import { ResourceService } from './resource.service';

@Module({
  imports: [DatabaseModule],
  providers: [...resourceProviders, ResourceService],
  exports: [...resourceProviders, ResourceService],
})
export class ResourceModule {}
