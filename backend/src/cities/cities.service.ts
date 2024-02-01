import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import {Repository} from "typeorm";
import {CityEntity} from "@app/cities/entities/city.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CitiesService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly citiesRepository: Repository<CityEntity>) {
  }
  async create(createCityDto: CreateCityDto): Promise<CityEntity> {
    const city = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(city);
  }

  async findAll(): Promise<CityEntity[]> {
    return await this.citiesRepository.find();
  }

  async findOne(id: number): Promise<CityEntity> {
    const city = await this.citiesRepository.findOne({
      where: { id }
    });
    return city;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
