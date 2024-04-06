import { IsNotEmpty, IsString } from "class-validator";

export class CreateCampusDto {
    @IsString()
    @IsNotEmpty({message: 'El campo sede no puede estar vacío.'})
    sede: string

    @IsString()
    @IsNotEmpty({message: 'El campo departamento no puede estar vacío.'})
    departamento: string

    @IsString()
    @IsNotEmpty({message: 'El campo provincia no puede estar vacío.'})
    provincia: string

    @IsString()
    @IsNotEmpty({message: 'El campo distrito no puede estar vacío.'})
    distrito: string

    @IsString()
    @IsNotEmpty({message: 'El campo direccion no puede estar vacío.'})
    direccion: string
}
