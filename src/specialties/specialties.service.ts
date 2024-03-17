import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtiesService {
  private readonly logger = new Logger('SpecialtiesService');
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>
  ){}
  async create(createSpecialtyDto: CreateSpecialtyDto) {
    try {
      const savedSpecialty = this.specialtyRepository.create(createSpecialtyDto);
      await this.specialtyRepository.save(savedSpecialty);
      return {
        savedSpecialty
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all specialties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialty`;
  }

  update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return `This action updates a #${id} specialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }

  private handleDBExceptions(error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
