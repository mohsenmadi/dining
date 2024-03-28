import { Injectable } from '@nestjs/common';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';
import {DinnerTableEntity} from "@app/dinner-tables/entities/dinner-table.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";
import {DataSource, Repository} from "typeorm";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Injectable()
export class DinnerTablesService {
  constructor(
    @InjectRepository(DinnerTableEntity)
    private readonly dinnerTableRepo: Repository<DinnerTableEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
    private readonly dataSource: DataSource
  ) {}
  async create(createDinnerTableDto: CreateDinnerTableDto) {

    const restaurant = await this.restaurantRepo.findOne({
      where: {
        id: createDinnerTableDto.restaurantId
      }
    });

    const dinnerTable = new DinnerTableEntity();
    dinnerTable.capacity = createDinnerTableDto.capacity;
    dinnerTable.reservations = [];
    dinnerTable.restaurant = restaurant;
    return await this.dinnerTableRepo.save(dinnerTable);
  }

  async findAll() {
    return await this.dinnerTableRepo.find();
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
