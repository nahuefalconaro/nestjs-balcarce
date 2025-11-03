import { IsString, IsNumber } from 'class-validator'
import { Artist } from 'src/artist/entities/artist.entity'
export class TrackDTO {
    @IsString()
    title: string
    @IsNumber()
    duration: number
    artist: Artist

}