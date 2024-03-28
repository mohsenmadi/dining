import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = new RestaurantEntity();
    Object.assign(restaurant, createRestaurantDto);
    return this.restaurantRepo.save(restaurant);
  }

  async findAll() {
    return await this.restaurantRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
