import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsNumber()
  price_range_from: number;

  @IsOptional()
  @IsNumber()
  price_range_to: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
