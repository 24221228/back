import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { 
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto
} from './dto/index'
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Person } from 'src/persons/entities/person.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreatePersonDto } from 'src/persons/dto/create-person.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Person)
    private personRepository: Repository<Person>
  ){}

  async createAccount(createAccountDto: CreateAccountDto){
    try{
      const { correo_electronico, contraseña, nombres, apellidos} = createAccountDto;
      let createPersonDto: CreatePersonDto = {
        nombres: nombres,
        apellidos: apellidos,
        genero: createAccountDto?.genero || '',
        documento_tipo: createAccountDto?.documento_tipo || '',
        documento_numero: createAccountDto?.documento_numero || 0,
        fecha_nacimiento: createAccountDto?.fecha_nacimiento || '',
        direccion_completa: createAccountDto?.direccion_completa || '',
        ciudad: createAccountDto?.ciudad || '',
        pais: createAccountDto?.pais || '',
        numero_telefono: createAccountDto?.numero_telefono || 0
      }
      const savedUser = await this.userRepository.save({
        correo_electronico: correo_electronico,
        contraseña: bcrypt.hashSync(contraseña, 10),
        roles: createAccountDto?.roles || ['paciente']
      }); 

      const person = this.personRepository.create({
        ...createPersonDto,
        user: savedUser
      });
      const savedPerson = await this.personRepository.save(person);
      return { ...savedUser, person: savedPerson };
    }catch(error){
      this.handleDBExceptions(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try{
      const { contraseña, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        contraseña: bcrypt.hashSync(contraseña, 10)
      });
      await this.userRepository.save(user);

      return {
        user,
        token: this.getJwtToken({id: user.id})
      };
    }catch(error){
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.userRepository.find(
      {
        where:{
          estatus: true
        }
      }
    );
  }

  async getUsersWithPersons(): Promise<User[]>{
    return this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.person', 'person')
    .getMany();
  }

  async login(loginUserDto: LoginUserDto){
    const { contraseña, correo_electronico } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {correo_electronico},
      select: {correo_electronico: true, contraseña: true, id: true, roles: true}
    });
    if(!user){
      console.log('Las credenciales no son válidas (correo electrónico)');
      throw new UnauthorizedException('Las credenciales no son válidas');
    }
    if(!bcrypt.compareSync(contraseña, user.contraseña)){
      console.log('Las credenciales no son válidas (contraseña)');
      throw new UnauthorizedException('Las credenciales no son válidas');
    }
    const person = await this.userRepository
                        .createQueryBuilder('user')
                        .leftJoinAndSelect('user.person', 'person')
                        .where('user.id = :userId', { userId: user.id })
                        .getOne();
    if(!person){
      throw new NotFoundException(`Persona con id ${user.id} no encontrado`);
    }
    return {
      ...user,
      token: this.getJwtToken({id: user.id}),
      person: person.person
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });
    if(!user){
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBExceptions(error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
