import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { restaurantProviders } from './restaurants.providers';
import { PostgresDatabaseModule } from '../postgres/postgres.module';

@Module({
  imports: [PostgresDatabaseModule],
  controllers: [RestaurantsController],
  providers: [...restaurantProviders, RestaurantsService],
  exports: [...restaurantProviders, RestaurantsService],
})
export class RestaurantsModule {}
