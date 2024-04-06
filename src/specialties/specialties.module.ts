import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Campus } from 'src/campus/entities/campus.entity';
import { CampusModule } from 'src/campus/campus.module';

@Module({
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  imports:[
    TypeOrmModule.forFeature([Specialty, Campus]),
    UsersModule,
    CampusModule
  ]
})
export class SpecialtiesModule {}
