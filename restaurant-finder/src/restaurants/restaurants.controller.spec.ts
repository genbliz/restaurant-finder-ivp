import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsModule } from './restaurants.module';
import { restaurantProviders } from './restaurants.providers';
import { PostgresDatabaseModule } from '../postgres/postgres.module';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [...restaurantProviders, RestaurantsService],
      imports: [RestaurantsModule, PostgresDatabaseModule],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
