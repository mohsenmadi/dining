import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CityEntity} from "@app/cities/entities/city.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity])
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}


// next:
//   - throw 404s for bad data, implement query params
//   - alter response shape
// then: on to Angular
