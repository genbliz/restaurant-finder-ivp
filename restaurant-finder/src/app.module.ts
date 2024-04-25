import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PostgresDatabaseModule } from './postgres/postgres.module';
import { RestaurantsService } from './restaurants/restaurants.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    PostgresDatabaseModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
    AppService,
    RestaurantsService,
  ],
})
export class AppModule {}
