import { Module } from '@nestjs/common';
import { DinersService } from './diners.service';
import { DinersController } from './diners.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DinerEntity} from "@app/diners/entities/diner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DinerEntity])],
  controllers: [DinersController],
  providers: [DinersService],
})
export class DinersModule {}
