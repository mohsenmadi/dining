import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {CitiesService} from './cities.service';
import {CreateCityDto} from './dto/create-city.dto';
import {UpdateCityDto} from './dto/update-city.dto';
import {CityEntity} from "@app/cities/entities/city.entity";
import {DeleteResult} from "typeorm";
import {CitiesResponseInterface} from "@app/cities/types/citiesResponse.interface";

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<CityEntity> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll(
    @Query() params: any
  ): Promise<CitiesResponseInterface> {
    const cities = await this.citiesService.findAll(params);
    return this.buildCitiesResponse(cities);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CityEntity> {
    return this.citiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.citiesService.remove(+id);
  }

  private buildCitiesResponse(cities: CityEntity[]): CitiesResponseInterface {
    return { cities };
  }
}
