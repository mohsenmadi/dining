import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DinnerTablesService } from './dinner-tables.service';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';

@Controller('dinner-tables')
export class DinnerTablesController {
  constructor(private readonly dinnerTablesService: DinnerTablesService) {}

  @Post()
  create(@Body() createDinnerTableDto: CreateDinnerTableDto) {
    return this.dinnerTablesService.create(createDinnerTableDto);
  }

  @Get()
  findAll() {
    return this.dinnerTablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dinnerTablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDinnerTableDto: UpdateDinnerTableDto) {
    return this.dinnerTablesService.update(+id, updateDinnerTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dinnerTablesService.remove(+id);
  }
}
