import { Track } from "src/track/entities/track.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('albums')
export class Album {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    releaseDate: Date

    @OneToMany(() => Track, track => track.idAlbum)
    tracks: Track[]
}
