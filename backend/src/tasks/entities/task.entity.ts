import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn, TreeChildren,
  UpdateDateColumn
} from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  completed: boolean;

  @Column({nullable: true})
  parentId: number;

  @TreeChildren()
  children: TaskEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
