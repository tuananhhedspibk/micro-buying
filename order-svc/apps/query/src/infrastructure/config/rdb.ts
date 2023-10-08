import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';

dotenvConfig({ path: '.env' });

const config = {
  type: 'mysql',
  host: `${process.env.QUERY_DATABASE_HOST}`,
  port: `${process.env.QUERY_DATABASE_PORT}`,
  username: `${process.env.QUERY_DATABASE_USERNAME}`,
  password: `${process.env.QUERY_DATABASE_PASSWORD}`,
  database: `${process.env.QUERY_DATABASE_NAME}`,
  entities: [Order, OrderItem],
  migrations: ['./apps/query/src/infrastructure/migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs('rdb', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
