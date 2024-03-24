import { User } from "src/users/entities/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text')
    nombres: string

    @Column('text')
    apellidos: string

    @Column('text')
    tipo_documento: string

    @Column('int')
    numero_documento: number

    @Column('text')
    genero: string

    @Column('date')
    fecha_nacimiento: Date

    @Column('text')
    direccion: string

    @Column('int')
    numero_telefono: number

    @Column('text')
    correo_electronico: string

    @Column('text', {
        array: true
    })
    contacto_emergencia: string[];

    @Column('text', {
        array: true
    })
    informacion_medica: string[];

    @ManyToOne(
        () => User,
        (user) => user.patient,
        { eager: true }
    )
    user: User;
}
