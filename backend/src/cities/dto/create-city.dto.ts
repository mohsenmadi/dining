import {IsNotEmpty} from "class-validator";

export class CreateCityDto {
  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  readonly active: boolean;
}
