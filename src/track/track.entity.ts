import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("tracks")
export class Track {

    @PrimaryGeneratedColumn()
    private id: number
    @Column()
    private title: string
    @Column()
    private duration: string
    @Column()
    private artist: string
    @Column()
    private album: string
    @Column()
    private year: number
    @Column()
    private genre: string

    constructor(title: string, duration: string, artist: string, album: string, year: number, genre: string) {
        this.title = title
        this.duration = duration
        this.artist = artist
        this.album = album
        this.year = year
        this.genre = genre
    }

    
}