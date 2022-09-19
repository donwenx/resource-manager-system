import { Inject, Injectable } from '@nestjs/common';
import { ResourceService } from './resource/resource.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  @Inject()
  private readonly resourceService: ResourceService;

  @Inject()
  private readonly userService: UserService;
  getHello(): string {
    return 'Hello World! 小玟';
  }

  async getStatistics() {
    const download = await this.resourceService.getDownloadCount();
    const user = await this.userService.getUserCount();
    const file = await this.resourceService.getFileSizeCount();
    return { download, user, file };
  }
}
