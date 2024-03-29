import { Module } from '@nestjs/common';
import { SpecialistsService } from './specialists.service';
import { SpecialistsController } from './specialists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/persons/entities/person.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [SpecialistsController],
  providers: [
    SpecialistsService
  ],
  imports:[
    TypeOrmModule.forFeature([Person, User]),
  ]
})
export class SpecialistsModule {}
