import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from './photo/photo.service';

@Module({
  imports: [PhotoModule],
  controllers: [AppController, PhotoController],
  providers: [AppService, PhotoService],
})
export class AppModule { }
