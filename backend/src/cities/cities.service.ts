import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCityDto} from './dto/create-city.dto';
import {UpdateCityDto} from './dto/update-city.dto';
import {DataSource, DeleteResult, Repository} from "typeorm";
import {CityEntity} from "@app/cities/entities/city.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CitiesService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly citiesRepository: Repository<CityEntity>,
    private readonly dataSource: DataSource) {
  }

  async create(createCityDto: CreateCityDto): Promise<CityEntity> {
    const city = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(city);
  }

  async findAll(params: any): Promise<CityEntity[]> {
    const queryBuilder = this.dataSource
      .getRepository(CityEntity)
      .createQueryBuilder('cities')
    if (params.active) {
      queryBuilder.where('active = :active', {
        active: params.active
      })
    }
    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<CityEntity> {
    return await this.getCityWithId(id);
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<CityEntity> {
    const city = await this.getCityWithId(id);
    Object.assign(city, updateCityDto);
    return await this.citiesRepository.save(city);
  }

  async remove(id: number): Promise<DeleteResult> {
    const city = await this.getCityWithId(id);
    return await this.citiesRepository.delete(id);
  }

  private async getCityWithId(id: number): Promise<CityEntity> {
    const city = await this.citiesRepository.findOne({
      where: {id}
    });
    if (!city) {
      throw new HttpException(
        '*** you sure about the city id?',
        HttpStatus.BAD_REQUEST,
      );
    }
    return city;
  }
}
