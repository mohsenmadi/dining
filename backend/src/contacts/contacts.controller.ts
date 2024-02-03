import {Controller, Get, Post, Body, Param, Delete, Put, Query} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {ContactEntity} from "@app/contacts/entities/contact.entity";
import {DeleteResult} from "typeorm";

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto): Promise<ContactEntity> {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll(
    @Query('areaCode') areaCode: string
  ): Promise<ContactEntity[]> {
    return this.contactsService.findAll(areaCode);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContactEntity> {
    return this.contactsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto): Promise<ContactEntity> {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.contactsService.remove(+id);
  }
}
