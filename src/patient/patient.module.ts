import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { UsersModule } from 'src/users/users.module';
import { Person } from 'src/persons/entities/person.entity';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports:[
    TypeOrmModule.forFeature([Patient, Person]),
    UsersModule
  ]
})
export class PatientModule {}
