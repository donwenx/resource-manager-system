import { Controller, Get, Inject } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Controller('/photo')
export class PhotoController {

  @Inject()
  private readonly photoService: PhotoService;
  
  @Get('/list')
  async findAll(): Promise<Photo[]> {
    return await this.photoService.findAll();
  }
}
