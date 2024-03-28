import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DinnerTableEntity} from "@app/dinner-tables/entities/dinner-table.entity";

@Entity({name: 'restaurants'})
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  dietOfferings: string[];

  @OneToMany(
    () => DinnerTableEntity,
    (dinnerTable) => dinnerTable.restaurant,
    {eager: true})
  dinnerTables: DinnerTableEntity[];
}
