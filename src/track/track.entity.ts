import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('tracks')
export class Track {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    duration: number
    @Column()
    artist: string

}