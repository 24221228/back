import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/persons/entities/person.entity';
import { Repository } from 'typeorm';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.personRepository
    .createQueryBuilder('person')
    .innerJoinAndSelect('person.user', 'user')
    .where(':roles = ANY(user.roles)', {roles: 'paciente'})
    .getMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
