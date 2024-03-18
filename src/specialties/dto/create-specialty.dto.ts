import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { HorasDisponibilidad } from "./horas-disponibilidad.dto";

export class CreateSpecialtyDto {
    @IsString()
    @IsNotEmpty({message: 'El campo nombre no puede estar vacío.'})
    @MinLength(5)
    nombre: string

    @IsString()
    @IsNotEmpty({message: 'El campo descripcion no puede estar vacío.'})
    descripcion: string

    @IsNumber()
    @IsNotEmpty({message: 'El campo costo no puede estar vacío.'})
    costo: number

    @IsNumber()
    @IsNotEmpty({message: 'El campo sede no puede estar vacío.'})
    idSede: number

    @IsString({ each: true })
    @IsNotEmpty({ message: 'El campo disponibilidad dias no puede estar vacío.' })
    disponibilidad_dias: string[];

    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => HorasDisponibilidad)
    disponibilidad_horas: [];
}
