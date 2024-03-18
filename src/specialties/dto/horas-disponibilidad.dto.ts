import { IsNotEmpty } from "class-validator";

export class HorasDisponibilidad {
    @IsNotEmpty({ message: 'El campo id no puede estar vacío.' })
    id: string;

    @IsNotEmpty({ message: 'El campo dia no puede estar vacío.' })
    dia: string;

    @IsNotEmpty({ message: 'El campo hora_inicio no puede estar vacío.' })
    hora_inicio: string;

    @IsNotEmpty({ message: 'El campo hora_final no puede estar vacío.' })
    hora_final: string;
}
