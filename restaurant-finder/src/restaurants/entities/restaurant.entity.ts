import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index()
  @Column()
  city: string;

  @Column('text')
  address: string;

  @Column('float', { nullable: true })
  rating: number;

  @Column('float', { nullable: true })
  price_range_from: number;

  @Column('float', { nullable: true })
  price_range_to: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | string;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date | string;
}
