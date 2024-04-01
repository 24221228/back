import { IsNotEmpty } from "class-validator";

export class HorasDisponibilidad {
    @IsNotEmpty({ message: 'El campo dia no puede estar vacío.' })
    dia: string;

    @IsNotEmpty({ message: 'El campo hora_inicio no puede estar vacío.' })
    start: string;

    @IsNotEmpty({ message: 'El campo hora_final no puede estar vacío.' })
    end: string;
}
