import {Injectable} from '@nestjs/common';
import {CreateReservationDto} from './dto/create-reservation.dto';
import {UpdateReservationDto} from './dto/update-reservation.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DinerEntity} from "@app/diners/entities/diner.entity";
import {Repository} from "typeorm";
import {ReservationEntity} from "@app/reservations/entities/reservation.entity";
import {RestaurantEntity} from "@app/restaurants/entities/restaurant.entity";
import {DinnerTableEntity} from "@app/dinner-tables/entities/dinner-table.entity";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
    @InjectRepository(DinerEntity)
    private readonly dinerRepo: Repository<DinerEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(DinnerTableEntity)
    private readonly dinnerTableRepo: Repository<DinnerTableEntity>,
  ) {
  }

  async create(createReservationDto: CreateReservationDto) {
    const diners = await this.findDiners(createReservationDto.dinerIds);
    const restaurant = await this.findRestaurant(createReservationDto.restaurantId);
    const dinnerTable =
      this.getAvailableDinnerTable(
        restaurant, diners.length,
        createReservationDto.timeStart, createReservationDto.timeEnd);

    const reservation = new ReservationEntity();
    reservation.timeStart = createReservationDto.timeStart;
    reservation.timeEnd = createReservationDto.timeEnd;
    reservation.diners = diners;
    reservation.dinnerTable = dinnerTable;

    // dinnerTable.reservations.push(reservation);
    // await this.dinnerTableRepo.save(dinnerTable);

    // for (const diner of diners) {
    //   diner.reservation = reservation;
    //   await this.dinerRepo.save(diner);
    // }

    return await this.reservationRepo.save(reservation);
    // return 'not there yet'
  }

  getAvailableDinnerTable(
    restaurant: RestaurantEntity,
    capacity: number,
    timeStart: number,
    timeEnd: number)
  {
    const dinnerTables = restaurant.dinnerTables.filter(
      dinnerTable => dinnerTable.capacity === capacity);

    // here, a algo to see if timeStart-timeEnd are available for each table
    // for now, return [0]
    return dinnerTables[0];
  }

  async findDiners(dinerIds: number[]): Promise<DinerEntity[]> {
    const diners: DinerEntity[] = [];

    for (const dinerId of dinerIds) {
      const diner = this.dinerRepo.findOne({
        where: {
          id: dinerId
        }
      })
      diners.push(await diner)
    }
    return diners;
  }

  async findRestaurant(id: number) {
    return await this.restaurantRepo.findOne({
      where: {id}
    })
  }

  async findAll() {
    return await this.reservationRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
