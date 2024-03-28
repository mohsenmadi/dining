import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DinnerTableEntity} from "@app/dinner-tables/entities/dinner-table.entity";
import {DinerEntity} from "@app/diners/entities/diner.entity";

@Entity({name: 'reservations'})
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeStart: number;

  @Column()
  timeEnd: number;

  @OneToMany(
    () => DinerEntity,
    (diners) => diners.reservation,
    {eager: true}
  )
  diners: DinerEntity[];

  @ManyToOne(
    () => DinnerTableEntity,
    (dinnerTable) => dinnerTable.reservations)
  dinnerTable: DinnerTableEntity;
}
