import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ResourceController } from './resource/resource.controller';
import { ResourceModule } from './resource/resource.module';
import { ResourceService } from './resource/resource.service';
@Module({
  imports: [UserModule, ResourceModule],
  controllers: [
    AppController,
    UserController,
    ResourceController,
  ],
  providers: [AppService, UserService, ResourceService],
})
export class AppModule {}
