import { IsString, IsEmail, MinLength, Matches, IsArray, ArrayNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    correo_electronico: string;

    @IsString()
    @MinLength(7)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'La contraseña debe tener una letra Mayúscula, Minúscula y un número'
    })
    contraseña: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    roles?: string[] = ['paciente'];
}
