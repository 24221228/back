import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    @IsString()
    nombres?: string;

    @IsString()
    apellidos?: string;

    @IsString()
    direccion_completa?: string;

    @IsString()
    ciudad?: string;

    @IsString()
    pais?: string;

    @IsNumber()
    numero_telefono?: number;
}
