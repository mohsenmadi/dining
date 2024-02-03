import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateContactDto} from './dto/create-contact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';
import {DataSource, DeleteResult, Repository} from "typeorm";
import {ContactEntity} from "@app/contacts/entities/contact.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    private readonly dataSource: DataSource) {
  }

  async create(createContactDto: CreateContactDto): Promise<ContactEntity> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }

  async findAll(areaCode: string): Promise<ContactEntity[]> {
    const queryBuilder =
      this.dataSource.getRepository(ContactEntity)
        .createQueryBuilder('contacts');

    if (areaCode) {
      queryBuilder.where('phone LIKE :areaCode', {
        areaCode: `${areaCode}-%`
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<ContactEntity> {
    return this.findContactWithId(id);
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<ContactEntity> {
    const contact = await this.findContactWithId(id);
    Object.assign(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<DeleteResult> {
    const contact = await this.findContactWithId(id);
    return await this.contactRepository.delete(id)
  }

  private async findContactWithId(id: number): Promise<ContactEntity> {
    const contact = await this.contactRepository.findOne({
      where: {
        id
      }
    });

    if (!contact) {
      throw new HttpException(
        `*** no contact with id ${id}`,
        HttpStatus.BAD_REQUEST
      )
    }

    return contact;
  }
}
