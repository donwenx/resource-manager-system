import { Injectable, Inject } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Category } from './category.entity';

export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly repository: Repository<Category>,
  ) { }

  /**
   * 创建分类表
   * @param uid 用户id
   * @param name 分类名
   * @returns 创建成功
   */
  async create(uid: number, name: string) {
    const data = new Category();
    data.uid = uid;
    data.name = name;
    return await this.repository.save(data);
  }

  /**
   * 查找分类信息
   * @param cid 分类id
   * @returns 分类信息
   */
  async getById(cid: number) {
    const data = await this.repository.findOneBy({ cid });
    return data;
  }

  /**
   * @param data 分类信息：
   * @returns
   */
  async update(data: { cid: number; name: string; state: number }) {
    const category = await this.repository.findOneBy({ cid: data.cid });
    if (data.name) {
      category.name = data.name;
    }
    if (data.state) {
      category.state = data.state;
    }
    return await this.repository.save(category);
  }

  /**
   * @param skip 开始位置
   * @param take 取多少条
   * @param keyword 搜索关键字搜索
   * @returns 分类列表
   */
  async getList(skip: number, take: number, keyword: string) {
    const rule = [
      {
        name: Like(`%${keyword}%`),
        state: 1,
      },
    ];
    const find: FindManyOptions<Category> = {
      skip,
      take,
    };
    find.where = [{ state: 1 }];

    if (keyword) {
      find.where = rule;
    }

    return await this.repository.findAndCount(find);
  }
}
