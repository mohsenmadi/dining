import { Module } from '@nestjs/common';
import { DinnerTablesService } from './dinner-tables.service';
import { DinnerTablesController } from './dinner-tables.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DinnerTableEntity} from "@app/dinner-tables/entities/dinner-table.entity";
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DinnerTableEntity, RestaurantEntity])],
  controllers: [DinnerTablesController],
  providers: [DinnerTablesService],
})
export class DinnerTablesModule {}
