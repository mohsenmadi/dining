import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {TaskEntity} from "@app/tasks/entities/task.entity";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly dataSource: DataSource) {
  }
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(completed: string) {
    const queryBuilder =
      this.dataSource.getRepository(TaskEntity)
        .createQueryBuilder('tasks');

    if (completed) {
      queryBuilder.where('completed LIKE :completed', {
        completed
      });
    }

    return await queryBuilder.getMany();  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findTaskWithId(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    await this.findTaskWithId(id);
    return await this.taskRepository.delete(id)
  }

  private async findTaskWithId(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: {
        id
      }
    });

    if (!task) {
      throw new HttpException(
        `*** no task with id ${id}`,
        HttpStatus.BAD_REQUEST
      )
    }

    return task;
  }
}
