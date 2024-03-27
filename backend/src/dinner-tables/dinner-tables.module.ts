import { Module } from '@nestjs/common';
import { DinnerTablesService } from './dinner-tables.service';
import { DinnerTablesController } from './dinner-tables.controller';

@Module({
  controllers: [DinnerTablesController],
  providers: [DinnerTablesService],
})
export class DinnerTablesModule {}
