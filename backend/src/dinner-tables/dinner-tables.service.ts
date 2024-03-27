import { Injectable } from '@nestjs/common';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';

@Injectable()
export class DinnerTablesService {
  create(createDinnerTableDto: CreateDinnerTableDto) {
    return 'This action adds a new dinnerTable';
  }

  findAll() {
    return `This action returns all dinnerTables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dinnerTable`;
  }

  update(id: number, updateDinnerTableDto: UpdateDinnerTableDto) {
    return `This action updates a #${id} dinnerTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} dinnerTable`;
  }
}
