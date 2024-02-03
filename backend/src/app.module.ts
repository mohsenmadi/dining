import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import ormconfig from "@app/ormconfig";
import {AppService} from "@app/app.service";
import { CitiesModule } from './cities/cities.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CitiesModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
