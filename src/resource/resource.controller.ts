import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Resource } from './resource.entity';
import { ResourceService } from './resource.service';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { createFilePath, createNonceStr } from '../util/function';
import { CreateResourceDto } from './resource.dto';
import { User } from '../common/user.decorator';
import { Token } from '../token/token.entity';
import { request } from 'http';
import type { Response } from 'express';

// 只实现业务逻辑
// 列如：验证密码、读取用户表、
@Controller('/resource')
export class ResourceController {
  @Inject()
  private readonly resourceService: ResourceService;

  @Get('/list')
  async findAll(@Query('page') page: string): Promise<Resource[]> {
    return [];
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async addResource(
    @UploadedFile() file,
    @Body() createResourceDto: CreateResourceDto,
    @User() token: Token,
  ) {
    console.log(file);
    const fileName = Date.now() + createNonceStr(8);
    const filePath = `${fileName}-${file.originalname}`;
    const fileFull = createFilePath(filePath);
    const writeImage = createWriteStream(fileFull);
    writeImage.write(file.buffer);
    // return '上传成功';

    // 插入数据库
    // 需要拿到uid、name、path
    return await this.resourceService.createResource(
      token.uid,
      createResourceDto.name,
      filePath,
    );
  }

  /**
   * @param rid 文件id
   * @param res 响应体
   * @returns 文件内容
   */
  @Get('/download')
  async download(
    @Query() rid: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    // if(){
    //   throw new Error('当前账号未登录，需登录后下载！')
    // }

    console.log('rid', rid);
    const data = await this.resourceService.getPathByRid(rid);

    if (data.state === 0) {
      throw new Error('文件不存在！');
    }
    const path = data.path;
    const filePath = createFilePath(path);
    const file = createReadStream(filePath);
    res.set({
      'Content-Disposition': `attachment; filename= "${path}"`,
    });
    await this.resourceService.updateDownloadCount(rid);
    return new StreamableFile(file);
  }

  // 更新文件信息

  // 删除文件state = 0；
}
