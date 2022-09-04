import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from './photo/photo.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [PhotoModule, UserModule],
  controllers: [AppController, PhotoController, UserController],
  providers: [AppService, PhotoService, UserService],
})
export class AppModule {}
