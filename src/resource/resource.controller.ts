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
import { CategoryService } from '../category/category.service';
import { ResourceState } from './resource.enum';

// 只实现业务逻辑
// 列如：验证密码、读取用户表、
@Controller('/resource')
export class ResourceController {
  @Inject()
  private readonly resourceService: ResourceService;

  @Inject()
  private readonly categoryService: CategoryService;

  @Get('/list')
  async findAll(
    @RequestToken() token: Token,
    @Query('skip')
    skip: number,
    @Query('take')
    take: number,
    @Query('keyword')
    keyword: string,
  ): Promise<{ data: Resource[]; size: number; count: number }> {
    // console.log('skip:', skip, take);
    const [data, count] = await this.resourceService.getResourceList(
      skip,
      take,
      keyword,
    );
    const newData = await this.resourceService.fillCategory(data);
    return { data: newData, size: data.length, count };
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

    // 默认审核中
    const state = ResourceState.AUDIT;
    // 插入数据库
    // 需要拿到uid、name、path
    return await this.resourceService.createResource(
      token.uid,
      createResourceDto.cid,
      createResourceDto.name,
      filePath,
      fileName,
      mimeType,
      size,
      state,
    );
  }

  /**
   * @param rid 文件id
   * @param res 响应体
   * @returns 文件内容
   */
  @Get('/download')
  async download(
    @RequestToken() token: Token,
    @Query('rid') rid: number,
    @Res({ passthrough: true }) res: Response,
  ) {
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

  /**
   * 显示审核和未审核列表
   * @param token
   * @param skip
   * @param take
   * @param keyword
   * @returns
   */
  @Get('/listAudit')
  async listAudit(
    @RequestToken() token: Token,
    @Query('skip')
    skip: number,
    @Query('take')
    take: number,
    @Query('keyword')
    keyword: string,
    @Query('state')
    state: number,
  ): Promise<{ data: Resource[]; size: number; count: number }> {
    // console.log('skip:', skip, take);
    let states = [];

    if (state) {
      states = [state];
    } else {
      states = [ResourceState.AUDIT, ResourceState.NORMAL];
    }

    const [data, count] = await this.resourceService.getResourceList(
      skip,
      take,
      keyword,
      states,
    );
    const newData = await this.resourceService.fillCategory(data);
    return { data: newData, size: data.length, count };
  }
  // 文件权限
}
