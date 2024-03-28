import {Module} from '@nestjs/common';
import {ReservationsService} from './reservations.service';
import {ReservationsController} from './reservations.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservationEntity} from "@app/reservations/entities/reservation.entity";
import {DinerEntity} from "@app/diners/entities/diner.entity";
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";
import {DinnerTableEntity} from "@app/dinner-tables/entities/dinner-table.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    ReservationEntity, DinerEntity,
    DinnerTableEntity, RestaurantEntity])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {
}
