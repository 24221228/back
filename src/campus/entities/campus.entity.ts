import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Campus {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text',{
        unique: true
    })
    sede: string

    @Column('text')
    departamento: string

    @Column('text')
    provincia: string

    @Column('text')
    distrito: string

    @Column('text')
    direccion: string
}
