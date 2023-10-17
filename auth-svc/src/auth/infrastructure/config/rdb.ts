import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User } from '../entity/user.entity';

dotenvConfig({ path: '.env' });

export const config = {
  type: 'mysql',
  host: `${process.env.QUERY_DATABASE_HOST}`,
  port: `${process.env.QUERY_DATABASE_PORT}`,
  username: `${process.env.QUERY_DATABASE_USERNAME}`,
  password: `${process.env.QUERY_DATABASE_PASSWORD}`,
  database: `${process.env.QUERY_DATABASE_NAME}`,
  entities: [User],
  migrations: ['./src/auth/infrastructure/migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const connectionSource = new DataSource(config as DataSourceOptions);
