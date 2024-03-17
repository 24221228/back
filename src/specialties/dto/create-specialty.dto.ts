import { IsDecimal, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateSpecialtyDto {
    @IsString()
    @IsNotEmpty({message: 'El campo nombre no puede estar vacío.'})
    @MinLength(5)
    nombre: string

    @IsString()
    @IsNotEmpty({message: 'El campo descripcion no puede estar vacío.'})
    descripcion: string

    @IsDecimal()
    @IsNotEmpty({message: 'El campo descripcion no puede estar vacío.'})
    costo: number

    @IsNumber()
    @IsNotEmpty({message: 'El campo sede no puede estar vacío.'})
    idSede: number

    @IsString({ each: true })
    @IsNotEmpty({ message: 'El campo disponibilidad dias no puede estar vacío.' })
    disponibilidad_dias: string[];

    @IsString({ each: true })
    @IsNotEmpty({ message: 'El campo disponibilidad horas no puede estar vacío.' })
    disponibilidad_horas: string[];
}
