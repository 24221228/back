import { Campus } from "src/campus/entities/campus.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specialty {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text',{
        unique: true
    })
    nombre: string

    @Column('text')
    descripcion: string

    @Column('decimal')
    costo: number

    @Column('int')
    idSede: number

    @Column('text', {
        array: true
    })
    disponibilidad_dias: string[]

    @Column('text', {
        array: true
    })
    disponibilidad_horas: string[];
}
