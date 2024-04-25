import { Module } from '@nestjs/common';
import { postgresDatabaseProviders } from './postgres.providers';

@Module({
  providers: [...postgresDatabaseProviders],
  exports: [...postgresDatabaseProviders],
})
export class PostgresDatabaseModule {}
