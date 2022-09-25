import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ResourceController } from './resource/resource.controller';
import { ResourceModule } from './resource/resource.module';
import { ResourceService } from './resource/resource.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { AdminResourceController } from './resource/admin-resource.controller';
@Module({
  imports: [UserModule, ResourceModule, CategoryModule],
  controllers: [
    AppController,
    UserController,
    ResourceController,
    CategoryController,
    AdminResourceController,
  ],
  providers: [AppService, UserService, ResourceService, CategoryService],
})
export class AppModule {}
