import { Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

// 只实现业务逻辑
// 列如：验证密码、读取用户表、
@Controller('/photo')
export class PhotoController {
  @Inject()
  private readonly photoService: PhotoService;

  @Get('/list')
  async findAll(@Query('page') page: string): Promise<Photo[]> {
    return await this.photoService.findAll();
  }

  @Post('/create')
  create(): string {
    return 'This action adds a new cat';
  }
}
