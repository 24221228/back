import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialistsService } from './specialists.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { Person } from 'src/persons/entities/person.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Controller('specialists')
export class SpecialistsController {
  constructor(
    private readonly specialistsService: SpecialistsService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  @Post()
  async create(@Body() createSpecialistDto: CreateSpecialistDto) {
    let user = {
      correo_electronico: createSpecialistDto.correo_electronico,
      roles: createSpecialistDto.roles,
      contraseña: bcrypt.hashSync(createSpecialistDto.documento_numero.toString(), 10)
    };
    const savedUser = await this.userRepository.save(user);
    const person = this.personRepository.create({
      nombres: createSpecialistDto.nombres,
      apellidos: createSpecialistDto.apellidos,
      genero: createSpecialistDto.genero,
      documento_tipo: createSpecialistDto.documento_tipo,
      documento_numero: createSpecialistDto.documento_numero,
      fecha_nacimiento: createSpecialistDto.fecha_nacimiento,
      direccion_completa: createSpecialistDto.direccion_completa,
      numero_telefono: createSpecialistDto.numero_telefono,
      ciudad: createSpecialistDto.ciudad,
      pais: createSpecialistDto.pais,
      user: savedUser
    });
    const savedPerson = await this.personRepository.save(person);
    return { ...savedUser, person: savedPerson };
  }

  @Get()
  findAll() {
    return this.personRepository
    .createQueryBuilder('person')
    .innerJoinAndSelect('person.user', 'user')
    .where(':roles = ANY(user.roles)', {roles: 'especialista'})
    .getMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialistDto: UpdateSpecialistDto) {
    return this.specialistsService.update(+id, updateSpecialistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialistsService.remove(+id);
  }
}
