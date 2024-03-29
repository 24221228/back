import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports:[
    TypeOrmModule.forFeature([Person]),
    UsersModule
  ],
  exports: [
    TypeOrmModule.forFeature([Person])
  ]
})
export class PersonsModule {}
