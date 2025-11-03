import { Album } from './../../album/entities/album.entity';
import { Artist } from "src/artist/entities/artist.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm"

@Entity('tracks')
export class Track {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    duration: number

    @OneToOne(() => Artist)// es decir 1 cancion 1 artista
    @JoinColumn()
    artist: Artist

    @ManyToOne(()=>Album, album => album.tracks)
    @JoinColumn()
    idAlbum: number
}