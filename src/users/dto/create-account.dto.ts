import { IsString, IsEmail, MinLength, Matches, IsNotEmpty, IsOptional, IsNumber, IsArray } from "class-validator";

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty({message: 'El campo nombres no puede estar vacío.'})
    nombres: string

    @IsString()
    @IsNotEmpty({message: 'El campo apellidos no puede estar vacío.'})
    apellidos: string

    @IsOptional()
    @IsString()
    genero?: string;

    @IsOptional()
    @IsString()
    documento_tipo?: string;

    @IsOptional()
    @IsNumber()
    documento_numero?: number;

    @IsOptional()
    @IsString()
    fecha_nacimiento?: string;

    @IsOptional()
    @IsString()
    direccion_completa?: string;

    @IsOptional()
    @IsNumber()
    numero_telefono?: number;

    @IsOptional()
    @IsString()
    ciudad?: string;

    @IsOptional()
    @IsString()
    pais?: string;

    @IsNotEmpty({message: 'El campo correo electronico no puede estar vacío.'})
    @IsString()
    @IsEmail({}, { message: 'Ingrese un correo electrónico válido.' })
    correo_electronico: string;

    @IsString()
    @MinLength(7, { message: 'La contraseña debe tener al menos 7 caracteres.' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'La contraseña debe tener una letra Mayúscula, Minúscula y un número'
    })
    contraseña: string;

    @IsOptional({ message: 'La lista de roles no puede estar vacía.' })
    @IsArray({ message: 'La lista de roles debe ser un arreglo.' })
    roles: string[]
}
