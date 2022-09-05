import { Injectable, Inject } from '@nestjs/common';
import { getTimeStamp } from '../util/function';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @Inject('RESOURCE_REPOSITORY')
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  /**
   * 创建资源表
   * @param uid 用户id
   * @param name 资源名称
   * @param path 上传路径
   * @returns 创建成功
   */
  async createResource(uid: number, name: string, path: string) {
    const data = new Resource();
    data.uid = uid;
    data.name = name;
    data.time = getTimeStamp();
    data.path = path;
    return await this.resourceRepository.save(data);
  }
}