import { PartialType } from '@nestjs/mapped-types';
import { CreateDinnerTableDto } from './create-dinner-table.dto';

export class UpdateDinnerTableDto extends PartialType(CreateDinnerTableDto) {}
