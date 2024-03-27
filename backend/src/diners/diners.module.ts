import { Module } from '@nestjs/common';
import { DinersService } from './diners.service';
import { DinersController } from './diners.controller';

@Module({
  controllers: [DinersController],
  providers: [DinersService],
})
export class DinersModule {}
