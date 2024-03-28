import {IsNotEmpty} from "class-validator";

export class CreateDinnerTableDto {
  @IsNotEmpty()
  readonly capacity: number;

  @IsNotEmpty()
  readonly restaurantId: number;
}
