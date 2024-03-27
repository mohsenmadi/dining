import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DinersService } from './diners.service';
import { CreateDinerDto } from './dto/create-diner.dto';
import { UpdateDinerDto } from './dto/update-diner.dto';

@Controller('diners')
export class DinersController {
  constructor(private readonly dinersService: DinersService) {}

  @Post()
  create(@Body() createDinerDto: CreateDinerDto) {
    return this.dinersService.create(createDinerDto);
  }

  @Get()
  findAll() {
    return this.dinersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dinersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDinerDto: UpdateDinerDto) {
    return this.dinersService.update(+id, updateDinerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dinersService.remove(+id);
  }
}
