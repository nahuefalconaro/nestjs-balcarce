
import { Album } from "src/album/entities/album.entity"
import { Track } from "src/track/entities/track.entity"
import { Column, CreateDateColumn, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('artists')
export class Artist {

    @PrimaryGeneratedColumn('uuid')
    artist_id: string

    @Column({ type: "varchar", length: 255, unique: true })
    name: string

    @Column({ type: 'text', nullable: true })
    bio: string

    @Column({ type: "varchar", length: 100, nullable: true })
    country: string //esto apuntaría a tabla países en un sistema real

    @Column({ type: 'text', nullable: true })
    imageURL: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    genre: string //esto debería apuntar a tabla géneros en un sistema real

    @ManyToMany(() => Track, (track) => track.artists, {
        onDelete: 'RESTRICT' //Evita eliminar un artista con tracks
    })
    tracks: Track[]

    @ManyToMany(() => Album, (album) => album.artists, {
        onDelete: 'RESTRICT' //Evita eliminar un artista con tracks
    })
    albums: Album[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}
