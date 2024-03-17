import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  HttpStatus
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ILike, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SearchPersonDto } from './dto/search-person.dto';

@Injectable()
export class PersonsService {
  private readonly logger = new Logger('PersonsService');
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
    ){}

  async create(createPersonDto: CreatePersonDto, user: User) {
    try {
      const person = this.personRepository.create({
        ...createPersonDto,
        user
      });
      await this.personRepository.save(person);
      return {
        person
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.personRepository.find();
  }

  async findOne(id: number) {
    const user = await this.personRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException(`Persona con id ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personRepository.preload({
      id: id,
      ...updatePersonDto
    });
    if(!person){
      throw new NotFoundException(`Persona con id ${id} no encontrado`)
    }
    try {
      await this.personRepository.save(person);
      return person;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }

  async searchByProperty(property: string,searchPersonDTO: SearchPersonDto) {
    try {
      let whereClause: Record<string, any> = {};
      switch (property) {
        case 'id':
          whereClause = { id: searchPersonDTO.id};
          break;
        case 'nombres':
          whereClause = { nombres: ILike(`%${searchPersonDTO.nombres}%`)};
          break;
        case 'apellidos':
          whereClause = { apellidos: ILike(`%${searchPersonDTO.apellidos}%`)};
          break;
        default:
          throw new Error(`Propiedad no válida`);
      }

      let persons = await this.personRepository.find({ where: whereClause });

      if (persons.length === 0) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Usuario no encontrado',
        });
      }

      let dataPerson: Person[] = persons.filter(person => person.user.estatus === searchPersonDTO.estatus);

      if (dataPerson.length === 0) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Usuario no encontrado',
        });
      }
      return dataPerson;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
