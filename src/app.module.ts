import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from './photo/photo.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { RespMiddleware } from './middleware/resp.middleware';
import { ResourceController } from './resource/resource.controller';
import { ResourceModule } from './resource/resource.module';
import { ResourceService } from './resource/resource.service';
@Module({
  imports: [PhotoModule, UserModule, ResourceModule],
  controllers: [
    AppController,
    PhotoController,
    UserController,
    ResourceController,
  ],
  providers: [AppService, PhotoService, UserService, ResourceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RespMiddleware).forRoutes('*');
  }
}
