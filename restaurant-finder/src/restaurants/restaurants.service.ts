import { Inject, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IQueryRestaurantParams } from './types';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject('RESTAURANT_REPOSITORY')
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  static toModel(createDto: CreateRestaurantDto): Restaurant {
    const data = instanceToPlain(createDto);
    return plainToInstance(Restaurant, data);
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const response = await this.restaurantRepository.save(createRestaurantDto);
    return response;
  }

  async findAllByParams__01({ params }: { params: IQueryRestaurantParams }) {
    const response = await this.restaurantRepository.find({
      select: ['address', 'id', 'latitude', 'longitude', 'name'],
      where: {
        city: params.city,
      },
    });
    return response;
  }

  async findAllByParams({ params }: { params: IQueryRestaurantParams }) {
    // const currentPositionLattitude = params.latitude;
    // const currentPositionLongitude = params.longitude;
    // const maxDistance = params.distance;
    // const city = params.city;

    const currentPositionLattitude = '?';
    const currentPositionLongitude = '?';
    const maxDistance = '?';
    const city = '?';

    const calculatedDistance = `(6371 * acos( cos( radians(${currentPositionLattitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${currentPositionLongitude}) ) + sin( radians(${currentPositionLattitude}) ) * sin( radians( latitude ) ) ) )`;

    const sql = `SELECT *, ${calculatedDistance} AS distance FROM restaurants WHERE ${calculatedDistance} <= ${maxDistance} AND city = ${city} ORDER BY distance;`;

    const response = await this.restaurantRepository.query(sql, [
      params.latitude,
      params.longitude,
      params.latitude,
      //
      params.latitude,
      params.longitude,
      params.latitude,
      //
      params.distance,
      params.city,
    ]);
    return response;
  }

  async findAll() {
    const response = await this.restaurantRepository.find({
      select: ['address', 'id', 'latitude', 'longitude', 'name'],
      take: 20,
    });
    return response;
  }

  async findOne(id: string) {
    const response = await this.restaurantRepository.findOneBy({ id });
    return response;
  }

  async update({
    id,
    updateRestaurantDto,
  }: {
    id: string;
    updateRestaurantDto: UpdateRestaurantDto;
  }) {
    const response = await this.restaurantRepository.update(
      id,
      updateRestaurantDto,
    );
    return response;
  }

  async remove(id: string) {
    const dataInDb = await this.restaurantRepository.findOneBy({ id });
    await this.restaurantRepository.remove(dataInDb);
    return { response: 'restaurant deleted' };
  }
}
