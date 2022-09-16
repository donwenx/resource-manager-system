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
import { FileInterceptor } from '@nestjs/platform-express';
import { createFilePath, sha256 } from '../util/function';
import { CreateResourceDto, UpdateResourceDto } from './resource.dto';
import { RequestToken } from '../common/user.decorator';
import { Token } from '../token/token.entity';
import type { Response } from 'express';

// 只实现业务逻辑
// 列如：验证密码、读取用户表、
@Controller('/resource')
export class ResourceController {
  @Inject()
  private readonly resourceService: ResourceService;

  @Get('/list')
  async findAll(
    @RequestToken() token: Token,
    @Query('skip')
    skip: number,
    @Query('take')
    take: number,
    @Query('keyword')
    keyword: string,
  ): Promise<{ data: Resource[]; size: number, count: number }> {
    // console.log('skip:', skip, take);
    const data = await this.resourceService.getResourceList(
      skip,
      take,
      keyword,
    );
    const count = await this.resourceService.getResourceListCount();
    return { data, size: data.length, count: count };
  }

  /**
   * 上传文件
   * @param file 上传的文件
   * @param createResourceDto 属性
   * @param token token
   * @returns 资源信息
   */
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async addResource(
    @UploadedFile() file: Express.Multer.File,
    @Body() createResourceDto: CreateResourceDto,
    @RequestToken() token: Token,
  ) {
    // console.log(file);
    const fileName = file.originalname;
    const filePath = sha256(file.buffer);
    const fileFull = createFilePath(filePath);
    const mimeType = file.mimetype;
    const size = file.size;
    const writeImage = createWriteStream(fileFull);
    writeImage.write(file.buffer);
    // return '上传成功';

    // 插入数据库
    // 需要拿到uid、name、path
    return await this.resourceService.createResource(
      token.uid,
      createResourceDto.name,
      filePath,
      fileName,
      mimeType,
      size,
    );
  }

  /**
   * @param rid 文件id
   * @param res 响应体
   * @returns 文件内容
   */
  @Get('/download')
  async download(
    @Query('rid') rid: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    // if(){
    //   throw new Error('当前账号未登录，需登录后下载！')
    // }

    // console.log('rid', rid);
    const data = await this.resourceService.getByRid(rid);

    if (data.state === 0) {
      throw new Error('文件不存在！');
    }
    const path = data.path;
    const filePath = createFilePath(path);
    const file = createReadStream(filePath);
    res.set({
      'Content-Disposition': `attachment; filename= "${data.originalName}"`,
      'Content-Type': data.mimeType,
    });
    await this.resourceService.updateDownloadCount(rid);
    return new StreamableFile(file);
  }

  /**
   * 更新文件信息
   * @param token token信息
   * @param updateResourceDto 修改的参数
   * @returns 修改的信息
   */
  @Post('/update')
  async update(
    @RequestToken() token: Token,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    const resource = await this.resourceService.getByRid(updateResourceDto.rid);
    if (token.uid !== resource.uid) {
      throw new Error('不能修改单前文件！');
    }
    const data = await this.resourceService.update(updateResourceDto);
    return data;
  }

  // 文件权限
}
