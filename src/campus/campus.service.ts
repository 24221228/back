import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampusService {
  private readonly logger = new Logger('CampusService');
  constructor(
    @InjectRepository(Campus)
    private readonly campusRepository: Repository<Campus>
  ){}

  async create(createCampusDto: CreateCampusDto) {
    try{
      const savedPerson = await this.campusRepository.save(createCampusDto);
      return {savedPerson}
    }catch(error){
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all campus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campus`;
  }

  update(id: number, updateCampusDto: UpdateCampusDto) {
    return `This action updates a #${id} campus`;
  }

  remove(id: number) {
    return `This action removes a #${id} campus`;
  }

  private handleDBExceptions(error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}