import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';

@Module({
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  imports:[
    TypeOrmModule.forFeature([Specialty]),
    UsersModule]
})
export class SpecialtiesModule {}
