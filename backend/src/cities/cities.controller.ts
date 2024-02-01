import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import {CityEntity} from "@app/cities/entities/city.entity";

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<CityEntity> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll(): Promise<CityEntity[]> {
    return this.citiesService.findAll();
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
  remove(@Param('id') id: string) {
    return this.citiesService.remove(+id);
  }
}
