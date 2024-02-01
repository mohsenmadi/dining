import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'cities'})
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;
}
