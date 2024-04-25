import { DataSource } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Provider } from '@nestjs/common';

export const restaurantProviders: Provider[] = [
  {
    provide: 'RESTAURANT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Restaurant),
    inject: ['DATA_SOURCE'],
  },
];
