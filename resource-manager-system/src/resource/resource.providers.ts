import { Connection, Repository } from 'typeorm';
import { Resource } from './resource.entity';

export const resourceProviders = [
  {
    provide: 'RESOURCE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Resource),
    inject: ['DATABASE_CONNECTION'],
  },
];
