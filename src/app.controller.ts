import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PhotoService } from './photo/photo.service';

@Controller()
export class AppController {

  // @Inject('PhotoService')
  // private readonly photo: PhotoService;
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
