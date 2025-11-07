import { Album } from './../../album/entities/album.entity'
import { Artist } from "src/artist/entities/artist.entity"
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('tracks')
export class Track {

    @PrimaryGeneratedColumn('uuid')
    track_id: string

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'int', nullable: true })
    trackNumber: number // si es null, es un single que no forma parte de un álbum

    @Column({ type: 'int' })
    duration: number //duración en segundos

    @Column({ type: 'varchar', length: 50 })
    genre: string

    @Column({ type: 'text', nullable: true })
    audioUrl: string

    @ManyToOne(() => Album, album => album.tracks, {
        nullable: true, // Permite tracks sin álbum (singles)
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'album_id' })
    album: Album

    @ManyToMany(() => Artist, (artist) => artist.tracks, {
        eager: true, //carga automáticamente los artistas del track (hace JOIN sin tener que indicarlo en el servicio)
        onDelete: 'RESTRICT' // Evita eliminar el track si tiene artistas vinculados (porque no queremos borrar los artistas)
    })
    @JoinTable({
        name: 'track_artists',
        joinColumn: { name: 'track_id', referencedColumnName: 'track_id' },
        inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'artist_id' }
    })
    artists: Artist[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}