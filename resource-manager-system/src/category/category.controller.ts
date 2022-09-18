import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { Token } from '../token/token.entity';
import { RequestToken } from '../common/user.decorator';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { UserService } from '../user/user.service';

@Controller('/category')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Inject()
  private readonly userService: UserService;

  @Post('/create')
  async addCategory(
    @Body('name')
    name: string,
    @RequestToken()
    token: Token,
  ) {
    return this.categoryService.create(token.uid, name);
  }

  /**
   * 更新分类
   * @param cid 分类id
   * @param name 分类名
   * @param state 状态
   * @param token token
   * @returns 分类信息
   */
  @Post('/update')
  async update(
    @Body('cid')
    cid: number,
    @Body('name')
    name: string,
    @Body('state')
    state: number,
    @RequestToken()
    token: Token,
  ) {
    const user = await this.userService.getUser(token.uid);
    if (user.authority !== '超级管理员') {
      throw new Error('只能超级管理员修改分类！');
    }
    // const uid = token.uid;
    // const category = await this.categoryService.getById(cid);
    // if (uid !== category.uid) {
    //   throw new Error('只能修改自己的分类！');
    // }

    const data = { cid, name, state };
    return await this.categoryService.update(data);
  }

  @Get('/list')
  async findAll(
    @RequestToken() token: Token,
    @Query('skip')
    skip: number,
    @Query('take')
    take: number,
    @Query('keyword')
    keyword: string,
  ) {
    const [data, count] = await this.categoryService.getList(
      skip,
      take,
      keyword,
    );
    return { data, count };
  }
}
