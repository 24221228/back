import { ArrayNotEmpty, IsArray, IsEmail, IsNumber, IsString } from "class-validator"

export class CreateSpecialistDto {
    @IsString()
    @IsEmail()
    correo_electronico: string;

    @IsArray()
    @ArrayNotEmpty()
    roles: string[];

    @IsString()
    nombres: string

    @IsString()
    apellidos: string

    @IsString()
    genero: string

    @IsString()
    documento_tipo: string

    @IsNumber()
    documento_numero: number

    @IsString()
    fecha_nacimiento: string

    @IsString()
    direccion_completa: string

    @IsString()
    ciudad: string

    @IsString()
    pais: string

    @IsNumber()
    numero_telefono: number
}
