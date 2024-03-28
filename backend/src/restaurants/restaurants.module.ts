import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
