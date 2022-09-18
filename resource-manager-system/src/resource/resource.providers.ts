import { Connection, DataSource, Repository } from 'typeorm';
import { Resource } from './resource.entity';

export const resourceProviders = [
  {
    provide: 'RESOURCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Resource),
    inject: ['DATABASE_CONNECTION'],
  },
];
