import { PartialType } from '@nestjs/mapped-types';
import { CreateDinerDto } from './create-diner.dto';

export class UpdateDinerDto extends PartialType(CreateDinerDto) {}
