import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class SearchPersonDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsOptional()
    @IsString()
    nombres?: string

    @IsOptional()
    @IsString()
    apellidos?: string

    @IsOptional()
    @IsBoolean()
    estatus?: boolean
}
