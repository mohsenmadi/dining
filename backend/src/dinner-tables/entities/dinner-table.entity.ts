import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";
import {ReservationEntity} from "@app/reservations/entities/reservation.entity";

@Entity({name: 'dinner-tables'})
export class DinnerTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @OneToMany(
    () => ReservationEntity,
    (reservation) => reservation.dinnerTable,
    {eager: true}
  )
  reservations: ReservationEntity[];

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.dinnerTables)
  restaurant: RestaurantEntity;
}
