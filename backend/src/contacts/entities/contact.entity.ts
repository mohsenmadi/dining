import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'contacts'})
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({unique: true})
  email: string;
}
