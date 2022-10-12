import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Resource } from './resource.entity';
import { ResourceState } from './resource.enum';
import { RequestToken } from '../common/user.decorator';
import { ListAuditResourceDto, UpdateResourceDto } from './resource.dto';
import { Token } from '../token/token.entity';
import { ResourceService } from './resource.service';

@Controller('/resource/admin')
export class AdminResourceController {
  constructor(private readonly resourceService: ResourceService) {}

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
  @Get('/list')
  async listAudit(
    @RequestToken() token: Token,
    @Query() listAuditResourceDto: ListAuditResourceDto,
  ): Promise<{ data: Resource[]; size: number; count: number }> {
    const { state, skip, take, keyword } = listAuditResourceDto;
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
}
