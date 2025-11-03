
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('artists')
export class Artist {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    genero: string

    @Column()
    pais: string

}
