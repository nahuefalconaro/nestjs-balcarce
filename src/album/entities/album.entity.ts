import { Artist } from "src/artist/entities/artist.entity"
import { Track } from "src/track/entities/track.entity"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('albums')
export class Album {

    @PrimaryGeneratedColumn('uuid')
    album_id: string

    @Column({ type: "varchar", length: 255 })
    title: string

    @Column({ type: 'int' })
    releaseYear: number

    @Column({ type: 'varchar', length: 50 })
    genre: string

    @Column({ type: 'text', nullable: true })
    coverUrl: string

    @Column({ type: 'text', nullable: true })
    description: string

    @ManyToMany(() => Artist, (artist) => artist.albums, {
        eager: true // carga automáticamente el artista o artistas junto con el álbum
    })
    @JoinTable({
        name: 'album_artists',
        joinColumn: { name: 'album_id', referencedColumnName: 'album_id' },
        inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'artist_id' }
    })
    artists: Artist[]

    @OneToMany(() => Track, track => track.album)
    tracks: Track[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
