import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ReservationEntity} from "@app/reservations/entities/reservation.entity";

@Entity({name: 'diners'})
export class DinerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('simple-array')
  dietRestrictions: string[];

  @ManyToOne(
    () => ReservationEntity,
    (reservation) => reservation.diners
  )
  reservation: ReservationEntity;
}
