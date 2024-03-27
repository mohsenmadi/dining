import { Injectable } from '@nestjs/common';
import { CreateDinerDto } from './dto/create-diner.dto';
import { UpdateDinerDto } from './dto/update-diner.dto';

@Injectable()
export class DinersService {
  create(createDinerDto: CreateDinerDto) {
    return 'This action adds a new diner';
  }

  findAll() {
    return `This action returns all diners`;
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
