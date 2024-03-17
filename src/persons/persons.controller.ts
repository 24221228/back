import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Auth, GetUser } from 'src/users/decorators';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from 'src/users/interfaces';
import { SearchPersonDto } from './dto/search-person.dto';

@Controller('personas')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @Auth(ValidRoles.especialista, ValidRoles.paciente, ValidRoles.admin)
  create(
    @Body() createPersonDto: CreatePersonDto,
    @GetUser() user: User
    ) {
    return this.personsService.create(createPersonDto, user);
  }

  @Post('search')
  async searchByProperty(@Query('property') property: string, @Body() searchPersonDTO: SearchPersonDto) {
    const result = await this.personsService.searchByProperty(property, searchPersonDTO);
    return result;
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }

}
