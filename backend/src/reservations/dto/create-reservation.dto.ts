import {IsNotEmpty} from "class-validator";

export class CreateReservationDto {
  @IsNotEmpty()
  readonly timeStart: number;

  @IsNotEmpty()
  readonly timeEnd: number;

  @IsNotEmpty()
  readonly restaurantId: number;

  @IsNotEmpty()
  readonly dinerIds: number[];
}
