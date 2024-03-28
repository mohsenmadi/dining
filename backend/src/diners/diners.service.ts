import { Injectable } from '@nestjs/common';
import { CreateDinerDto } from './dto/create-diner.dto';
import { UpdateDinerDto } from './dto/update-diner.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DinerEntity} from "@app/diners/entities/diner.entity";
import {Repository} from "typeorm";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Injectable()
export class DinersService {

  constructor(
    @InjectRepository(DinerEntity)
    private readonly dinerRepo: Repository<DinerEntity>
  ) {}

  async create(createDinerDto: CreateDinerDto) {
    const diner = new DinerEntity();
    Object.assign(diner, createDinerDto);
    return await this.dinerRepo.save(diner);
  }

  async findAll() {
    return await this.dinerRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} diner`;
  }

  update(id: number, updateDinerDto: UpdateDinerDto) {
    return `This action updates a #${id} diner`;
  }

  remove(id: number) {
    return `This action removes a #${id} diner`;
  }
}
