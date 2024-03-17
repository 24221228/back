import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto
} from './dto/index'
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, Auth } from './decorators/index';
import { IncomingHttpHeaders } from 'http';
import { ValidRoles } from './interfaces';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(ValidRoles.user)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('private')
  @Auth(ValidRoles.especialista)
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('correo_electronico') userCorreoElectronico: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ) {
    return{
      ok: true,
      user,
      userCorreoElectronico,
      rawHeaders,
      headers
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('informacion')
  findAllWithPerson(){
    return this.usersService.getUsersWithPersons();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto){
    return this.usersService.login(loginUserDto);
  }

  @Post('createAccount')
  async createAccount(@Body() createAccountDto: CreateAccountDto){
    return this.usersService.createAccount(createAccountDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.especialista, ValidRoles.paciente)
  profileUser(@Param('profile') id: string) {
    return this.usersService.findOne(+id);
  }
  
}
