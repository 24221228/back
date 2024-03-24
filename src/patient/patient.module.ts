import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports:[
    TypeOrmModule.forFeature([Patient]),
    UsersModule
  ]
})
export class PatientModule {}
