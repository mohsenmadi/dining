import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import ormconfig from "@app/ormconfig";
import {AppService} from "@app/app.service";
import { CitiesModule } from './cities/cities.module';
import { ContactsModule } from './contacts/contacts.module';
import { TasksModule } from './tasks/tasks.module';
import { DinersModule } from './diners/diners.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DinnerTablesModule } from './dinner-tables/dinner-tables.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CitiesModule, ContactsModule, TasksModule, DinersModule, RestaurantsModule, DinnerTablesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
 * generate new contacts res
 *
 * - nest g res contacts
 *   - using this command, we get stubs of entity, controller, service,
 *     dto/ ... and a module to tie these components together
 *
 * - modify entity
 *   - annotate with entity
 *   - modify name (end with Entity)
 *   - add properties (@PrimaryGeneratedColumn, ....., make one unique)
 *
 * - import entity as a feature in ContactsModule
 *   - imports: [TypeOrmModule.forFeature([ContactEntity])]
 *   - see how module ties all together, this module is also imported into
 *     main app.module for routing REST reqs
 *
 * REST API reqs
 *
 * - setup postman
 *   - create a stubbed one
 *   - do contacts one, see already we're getting a response
 *
 * - see how main methods are stubbed in controller and service
 * - @GET findAll
   - in service, see how it's Injectable...
     - add constructor and inject repo
       @InjectRepository(ContactEntity)
       private readonly contactRepository: Repository<ContactEntity>
       - implement async findAll

       - type both methods' signatures in controller and service
         Promise<ContactsEntity[]>

* - @POST create
    - create a few with postman after all done
    *
*
* - @GET one
    - finished? pull one, but show what happens when bad 'id'
    * setup postman for find one
    * fix that with a throw clause like:
    * throw new HttpException(
        `*** no contact with id ${id}`,
        HttpStatus.BAD_REQUEST
      )
      *
*
* - @Put
    * nestjs gives Patch, change into Put (handles both)
    * see method signature with @Param and @Body! convenient
      * Params for path params, @Query for query params
      * could do one for findAll (do it below)
    * setup postman with /:id
    * since we're needing to find a contact with id:
      * refactor code in findOne into findContactWithId
      * test
      * implement 3 lines: findContactWithId, Object.assign(), return ...save()
      *
* - @Delete
  * should be quick
  *
* to finish, implement findAll with Query
  * implement a query param for areacode (get all contacts with areacode = ...)
    * inside, do with areaCode, notice how case-sensitive things are
    * sql is like: WHERE phone LIKE '123-%'
      * try in pg first
      * write code step by step by:
        * create a queryBuilder with dataSource and attach 'where' for testing
        * then, split 'where' to be by itself
        *       queryBuilder.where('phone LIKE :areaCode', {
                  areaCode: `${areaCode}-%`
                });
        * return await queryBuilder.getMany()
        * test with postman
 */
