import { Injectable, Inject, Res } from '@nestjs/common';
import { getTimeStamp } from '../util/function';
import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { Resource } from './resource.entity';
import { UpdateResourceDto } from './resource.dto';
import { ResourceState } from './resource.enum';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ResourceService {
  @Inject('RESOURCE_REPOSITORY')
  private readonly resourceRepository: Repository<Resource>;

  @Inject()
  private readonly categoryService: CategoryService;

  /**
   * 创建资源表
   * @param uid 用户id
   * @param name 资源名称
   * @param path 上传路径
   * @returns 创建成功
   */
  async createResource(
    uid: number,
    cid: number,
    name: string,
    path: string,
    originalName: string,
    mimeType: string,
    size: number,
    state: number,
  ) {
    const data = new Resource();
    data.uid = uid;
    data.cid = cid;
    data.name = name;
    data.time = getTimeStamp();
    data.path = path;
    data.originalName = originalName;
    data.mimeType = mimeType;
    data.size = size;
    data.state = state;
    return await this.resourceRepository.save(data);
  }

  /**
   * @param rid 文件id
   * @returns 文件
   */
  async getByRid(rid: number) {
    const data = await this.resourceRepository.findOneBy({ rid });
    return data;
  }

  /**
   * 更新下载量
   * @param rid 资源id
   */
  async updateDownloadCount(rid: number) {
    const data = await this.resourceRepository.findOneBy({ rid });
    data.downloads += 1;
    await this.resourceRepository.save(data);
  }

  /**
   * 按列表查询
   * @param skip 开始页
   * @param take 到第几页
   * @returns 返回一个资源数组
   */
  async getResourceList(
    skip: number,
    take: number,
    keyword: string,
    states: ResourceState[] = [ResourceState.NORMAL],
  ) {
    const rule = [
      {
        name: Like(`%${keyword}%`),
        state: In(states),
      },
      {
        keywords: Like(`%${keyword}%`),
        state: In(states),
      },
    ];
    const find: FindManyOptions<Resource> = {
      skip,
      take,
    };
    find.where = [{ state: In(states) }];

    if (keyword) {
      find.where = rule;
    }
    // console.log(find, keyword, keyword, keyword?.length !== 0);
    const data = await this.resourceRepository.findAndCount(find);
    return data;
  }

  async getResourceListCount() {
    const count = await this.resourceRepository.count({ where: { state: 1 } });
    return count;
  }

  async update(data: UpdateResourceDto) {
    const resource = await this.resourceRepository.findOneBy({ rid: data.rid });
    if (data.name) {
      resource.name = data.name;
    }
    if (data.img) {
      resource.img = data.img;
    }
    if (data.state !== undefined) {
      resource.state = data.state;
    }
    if (data.keywords) {
      resource.keywords = data.keywords;
    }
    // console.log('resource:', data, resource);
    return await this.resourceRepository.save(resource);
  }

  async getDownloadCount() {
    const manager = this.resourceRepository.manager;
    const { sum } = await manager
      .createQueryBuilder()
      .select('SUM(resource.downloads)', 'sum')
      .from(Resource, 'resource')
      .where('resource.state = :state', { state: 1 })
      .getRawOne();
    return sum;
  }

  async getFileSizeCount() {
    const manager = this.resourceRepository.manager;
    const { sum } = await manager
      .createQueryBuilder()
      .select('SUM(resource.size)', 'sum')
      .from(Resource, 'resource')
      .where('resource.state = :state', { state: 1 })
      .getRawOne();
    return sum;
  }

  // 填充分类
  async fillCategory(data) {
    const cidArray = data.map((item) => {
      return item.cid;
    });
    const categoryArray = await this.categoryService.getByCidArray(cidArray);
    return data.map((item) => {
      const category = categoryArray.find((category) => {
        return category.cid === item.cid;
      });
      return { ...item, category };
    });
  }
}
