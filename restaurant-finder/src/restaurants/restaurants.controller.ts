import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseFloatPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { IQueryRestaurantParams } from './types';
import { SkipThrottle } from '@nestjs/throttler';
import { convertMetersToKilometers } from '../helpers/utils';

@SkipThrottle({ default: false })
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  async findAllByParams(
    @Query('city') city: string,
    @Query('latitude', new ParseFloatPipe({ optional: true })) latitude: number,
    @Query('longitude', new ParseFloatPipe({ optional: true }))
    longitude: number,
    @Query('distance', new ParseFloatPipe({ optional: true })) distance: number,
  ) {
    if (!city) {
      throw new HttpException('Not Found: city invalid', HttpStatus.NOT_FOUND);
    }

    const params = { city } as IQueryRestaurantParams;

    if (!latitude || !longitude) {
      throw new HttpException(
        'Bad Request: coordinate(s) invalid',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      params.latitude = latitude;
      params.longitude = longitude;
    }

    if (typeof distance === 'number' || distance > 0) {
      /** Convert distance from metres to miles */
      params.distance = convertMetersToKilometers(distance);
    } else {
      throw new HttpException(
        'Bad Request: distance is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const restaurants = await this.restaurantsService.findAllByParams({
      params,
    });
    return { restaurants };
  }

  @Get('/all')
  async findAll() {
    const restaurants = await this.restaurantsService.findAll();
    return { restaurants };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update({ id, updateRestaurantDto });
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
