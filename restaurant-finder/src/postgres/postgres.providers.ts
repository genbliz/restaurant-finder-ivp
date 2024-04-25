import { DataSource } from 'typeorm';
import { envConfig } from '../config/env';

export const postgresDatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: envConfig.PG_DB_HOST,
        port: envConfig.PG_DB_PORT,
        username: envConfig.PG_DB_USER,
        password: envConfig.PG_DB_PASS,
        database: envConfig.PG_DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
