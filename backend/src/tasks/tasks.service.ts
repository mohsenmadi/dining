import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TaskEntity} from "@app/tasks/entities/task.entity";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>) {
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll() {
    const taskEntities = await this.taskRepository.find();
    return this.buildTree(taskEntities);
  }

  buildTree(jsonData: TaskEntity[]): TaskEntity[] {
    const map: { [key: number]: TaskEntity } = {};

    jsonData.forEach(nodeData => {
      const {id, parentId} = nodeData;
      map[id] = nodeData;
      if (parentId) {
        if (!map[parentId].children) {
          map[parentId].children = [];
        }
        map[parentId]?.children?.push(map[id]);
      }
    });

    const roots: TaskEntity[] = [];

    jsonData.forEach((nodeData) => {
      const {id, parentId} = nodeData;
      if (!parentId) {
        delete map[id].parentId;
        roots.push(map[id]);
      }
    });

    return roots;
  }

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
        HttpStatus.NOT_FOUND
      )
    }

    return task;
  }
}
